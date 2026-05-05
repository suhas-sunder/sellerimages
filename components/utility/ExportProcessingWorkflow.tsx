"use client";

import JSZip from "jszip";
import { useEffect, useMemo, useState } from "react";

type FitMode = "contain" | "cover";
type BackgroundMode = "white" | "soft" | "transparent";
type OutputFormat = "jpg" | "png" | "webp";

export type ExportOutputSettings = {
  fitMode: FitMode;
  backgroundMode: BackgroundMode;
  outputFormat: OutputFormat;
};

export type PlatformBaseSettings = {
  enabled: boolean;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  fitMode: FitMode;
  backgroundMode: BackgroundMode;
};

export type ExportOutput = {
  id: string;
  name: string;
  dimensions: string;
  ratio: string;
  fileName: string;
  settings: ExportOutputSettings;
};

export type PlatformExportPlan = {
  workflowId: string;
  workflowLabel: string;
  platformId: string;
  platformLabel: string;
  folderName: string;
  baseSettings?: PlatformBaseSettings;
  outputs: ExportOutput[];
};

type ProcessStatus = "waiting" | "processing" | "done" | "error";

type ProcessItem = {
  id: string;
  label: string;
  details: string;
  status: ProcessStatus;
  error?: string;
};

type ProcessedImage = {
  id: string;
  name: string;
  fileName: string;
  dimensions: string;
  url: string;
  platformLabel: string;
  blob: Blob;
};

type ExportProcessingWorkflowProps = {
  imageUrl: string;
  sourceFileName: string;
  folderName: string;
  platformExports: PlatformExportPlan[];
  onBackToEdit: () => void;
  onStartOver: () => void;
};

const friendlySteps: ProcessItem[] = [
  {
    id: "prepare",
    label: "Preparing your image",
    details: "Checking the upload and export plan.",
    status: "waiting",
  },
  {
    id: "base",
    label: "Preparing platform bases",
    details: "Applying any platform-level base size and offset changes.",
    status: "waiting",
  },
  {
    id: "generate",
    label: "Creating image versions",
    details: "Building each selected output at the correct size and layout.",
    status: "waiting",
  },
  {
    id: "package",
    label: "Packaging files",
    details: "Adding finished images and the report into a ZIP folder.",
    status: "waiting",
  },
  {
    id: "complete",
    label: "Ready to download",
    details: "Your image pack is ready to preview and save.",
    status: "waiting",
  },
];

export function ExportProcessingWorkflow({
  imageUrl,
  sourceFileName,
  folderName,
  platformExports,
  onBackToEdit,
  onStartOver,
}: ExportProcessingWorkflowProps) {
  const allOutputs = useMemo(
    () =>
      platformExports.flatMap((platform) =>
        platform.outputs.map((output) => ({
          ...output,
          platformLabel: platform.platformLabel,
          workflowLabel: platform.workflowLabel,
          platformId: platform.platformId,
        })),
      ),
    [platformExports],
  );

  const [overallStatus, setOverallStatus] = useState<
    "processing" | "complete" | "error"
  >("processing");

  const [stepItems, setStepItems] = useState<ProcessItem[]>(
    friendlySteps.map((step, index) => ({
      ...step,
      status: index === 0 ? "processing" : "waiting",
    })),
  );

  const [outputItems, setOutputItems] = useState<ProcessItem[]>(
    allOutputs.map((output) => ({
      id: `${output.platformId}-${output.id}`,
      label: `${output.platformLabel}: ${output.name}`,
      details: `${output.dimensions} · ${output.settings.outputFormat.toUpperCase()}`,
      status: "waiting",
    })),
  );

  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [zipUrl, setZipUrl] = useState("");
  const [zipFileName, setZipFileName] = useState("");
  const [mainError, setMainError] = useState("");

  const completedCount = useMemo(
    () => outputItems.filter((item) => item.status === "done").length,
    [outputItems],
  );

  const failedCount = useMemo(
    () => outputItems.filter((item) => item.status === "error").length,
    [outputItems],
  );

  useEffect(() => {
    let cancelled = false;
    let generatedZipUrl = "";
    const generatedPreviewUrls: string[] = [];
    const failedOutputLabels: string[] = [];

    const updateStepStatus = (id: string, status: ProcessStatus) => {
      setStepItems((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item,
        ),
      );
    };

    const updateOutputStatus = (
      id: string,
      status: ProcessStatus,
      error?: string,
    ) => {
      setOutputItems((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
                error,
              }
            : item,
        ),
      );
    };

    async function processExport() {
      try {
        setOverallStatus("processing");
        setMainError("");

        updateStepStatus("prepare", "processing");
        await delay(200);

        const sourceImage = await loadImage(imageUrl);

        if (cancelled) return;

        updateStepStatus("prepare", "done");
        updateStepStatus("base", "processing");

        const zip = new JSZip();
        const rootFolder = zip.folder(folderName);
        const successfulImages: ProcessedImage[] = [];

        if (!rootFolder) {
          throw new Error("Could not create the export folder.");
        }

        for (const platformPlan of platformExports) {
          if (cancelled) return;

          const platformFolder = rootFolder.folder(
            `${platformPlan.workflowId}-${platformPlan.platformId}`,
          );

          if (!platformFolder) {
            throw new Error(
              `Could not create ${platformPlan.platformLabel} folder.`,
            );
          }

          const baseSource = await renderPlatformBaseImage(
            sourceImage,
            platformPlan.baseSettings,
          );

          if (cancelled) return;

          updateStepStatus("base", "done");
          updateStepStatus("generate", "processing");

          for (const output of platformPlan.outputs) {
            if (cancelled) return;

            const outputItemId = `${platformPlan.platformId}-${output.id}`;

            updateOutputStatus(outputItemId, "processing");
            await delay(120);

            try {
              const blob = await renderOutputImage(baseSource, output);
              const previewUrl = URL.createObjectURL(blob);
              generatedPreviewUrls.push(previewUrl);

              const fileName = replaceExtension(
                output.fileName,
                output.settings.outputFormat,
              );

              platformFolder.file(fileName, blob);

              const processedImage: ProcessedImage = {
                id: outputItemId,
                name: output.name,
                fileName,
                dimensions: output.dimensions,
                url: previewUrl,
                platformLabel: platformPlan.platformLabel,
                blob,
              };

              successfulImages.push(processedImage);
              setProcessedImages([...successfulImages]);
              updateOutputStatus(outputItemId, "done");
            } catch (error) {
              failedOutputLabels.push(
                `${platformPlan.platformLabel}: ${output.name}`,
              );

              updateOutputStatus(
                outputItemId,
                "error",
                error instanceof Error
                  ? error.message
                  : "This image version could not be created.",
              );
            }
          }
        }

        if (cancelled) return;

        updateStepStatus("generate", "done");

        if (successfulImages.length === 0) {
          throw new Error(
            "None of the selected image versions could be generated.",
          );
        }

        updateStepStatus("package", "processing");

        rootFolder.file(
          "image-pack-report.txt",
          buildReport({
            sourceFileName,
            platformExports,
            successfulFiles: successfulImages.map(
              (image) => `${image.platformLabel}/${image.fileName}`,
            ),
            failedOutputs: failedOutputLabels,
          }),
        );

        await delay(200);

        const zipBlob = await zip.generateAsync({ type: "blob" });

        if (cancelled) return;

        generatedZipUrl = URL.createObjectURL(zipBlob);
        setZipUrl(generatedZipUrl);
        setZipFileName(`${folderName}.zip`);

        updateStepStatus("package", "done");
        updateStepStatus("complete", "done");
        setOverallStatus("complete");
      } catch (error) {
        if (cancelled) return;

        setOverallStatus("error");
        setMainError(
          error instanceof Error
            ? error.message
            : "The export could not be completed.",
        );
      }
    }

    processExport();

    return () => {
      cancelled = true;

      if (generatedZipUrl) {
        URL.revokeObjectURL(generatedZipUrl);
      }

      generatedPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [folderName, imageUrl, platformExports, sourceFileName]);

  return (
    <div
      id="upload"
      className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl"
    >
      <div className="rounded-[1.5rem] border border-dashed border-sky-300 bg-sky-50/70 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
              Export workflow
            </p>
            <h2 className="mt-2 text-2xl font-bold text-sky-950">
              {overallStatus === "complete"
                ? "Your image pack is ready."
                : overallStatus === "error"
                  ? "Export needs attention."
                  : "Creating your selected image packs."}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
              {platformExports.length} platform
              {platformExports.length === 1 ? "" : "s"} selected ·{" "}
              {completedCount} of {allOutputs.length} image versions completed
              {failedCount > 0 ? ` · ${failedCount} issue(s)` : ""}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onBackToEdit}
              disabled={overallStatus === "processing"}
              className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back to edit
            </button>
            <button
              type="button"
              onClick={onStartOver}
              disabled={overallStatus === "processing"}
              className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Start over
            </button>
          </div>
        </div>

        {mainError && (
          <div className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">
            {mainError}
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-bold text-sky-950">Progress</h3>
              <div className="mt-4 space-y-3">
                {stepItems.map((item) => (
                  <ProgressRow key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-bold text-sky-950">Image versions</h3>
              <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-1">
                {outputItems.map((item) => (
                  <ProgressRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-sky-950">
                  Final preview
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Review generated files before downloading the ZIP.
                </p>
              </div>

              {overallStatus === "complete" && zipUrl && (
                <a
                  href={zipUrl}
                  download={zipFileName}
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
                >
                  Download ZIP
                </a>
              )}
            </div>

            {processedImages.length === 0 ? (
              <div className="mt-4 flex min-h-72 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <div>
                  <p className="text-sm font-bold text-slate-700">
                    Processing previews
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Generated images will appear here as they finish.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 grid max-h-[620px] gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
                {processedImages.map((image) => (
                  <article
                    key={image.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="flex min-h-48 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <img
                        src={image.url}
                        alt={`${image.name} final preview`}
                        className="max-h-72 w-full object-contain"
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
                        {image.platformLabel}
                      </p>
                      <h4 className="mt-1 text-sm font-bold text-slate-900">
                        {image.name}
                      </h4>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {image.dimensions}
                      </p>
                      <p className="mt-1 truncate font-mono text-xs text-slate-500">
                        {image.fileName}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {overallStatus === "complete" && zipUrl && (
              <a
                href={zipUrl}
                download={zipFileName}
                className="mt-6 flex w-full cursor-pointer items-center justify-center rounded-2xl bg-sky-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
              >
                Download image pack ZIP
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressRow({ item }: { item: ProcessItem }) {
  const statusLabel =
    item.status === "waiting"
      ? "Waiting"
      : item.status === "processing"
        ? "Working"
        : item.status === "done"
          ? "Done"
          : "Issue";

  const statusClass =
    item.status === "done"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : item.status === "processing"
        ? "bg-sky-50 text-sky-700 ring-sky-200"
        : item.status === "error"
          ? "bg-rose-50 text-rose-700 ring-rose-200"
          : "bg-slate-50 text-slate-500 ring-slate-200";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-800">{item.label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {item.error ?? item.details}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusClass}`}
        >
          {statusLabel}
        </span>
      </div>
    </div>
  );
}

async function renderPlatformBaseImage(
  sourceImage: HTMLImageElement,
  baseSettings?: PlatformBaseSettings,
): Promise<HTMLImageElement | HTMLCanvasElement> {
  if (!baseSettings?.enabled) {
    return sourceImage;
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(baseSettings.width));
  canvas.height = Math.max(1, Math.round(baseSettings.height));

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not prepare the platform base image.");
  }

  paintBackground(
    context,
    canvas.width,
    canvas.height,
    baseSettings.backgroundMode,
    "png",
  );

  drawImageToCanvas({
    context,
    source: sourceImage,
    sourceWidth: sourceImage.naturalWidth || sourceImage.width,
    sourceHeight: sourceImage.naturalHeight || sourceImage.height,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    fitMode: baseSettings.fitMode,
    offsetX: baseSettings.offsetX,
    offsetY: baseSettings.offsetY,
  });

  return canvas;
}

async function renderOutputImage(
  source: HTMLImageElement | HTMLCanvasElement,
  output: ExportOutput,
): Promise<Blob> {
  const dimensions = parseDimensions(output.dimensions);

  if (!dimensions) {
    throw new Error("Could not read output size.");
  }

  const canvas = document.createElement("canvas");
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create image canvas.");
  }

  paintBackground(
    context,
    dimensions.width,
    dimensions.height,
    output.settings.backgroundMode,
    output.settings.outputFormat,
  );

  const sourceWidth =
    source instanceof HTMLImageElement
      ? source.naturalWidth || source.width
      : source.width;
  const sourceHeight =
    source instanceof HTMLImageElement
      ? source.naturalHeight || source.height
      : source.height;

  drawImageToCanvas({
    context,
    source,
    sourceWidth,
    sourceHeight,
    canvasWidth: dimensions.width,
    canvasHeight: dimensions.height,
    fitMode: output.settings.fitMode,
    offsetX: 0,
    offsetY: 0,
  });

  const mimeType = getMimeType(output.settings.outputFormat);

  return canvasToBlob(canvas, mimeType);
}

function drawImageToCanvas({
  context,
  source,
  sourceWidth,
  sourceHeight,
  canvasWidth,
  canvasHeight,
  fitMode,
  offsetX,
  offsetY,
}: {
  context: CanvasRenderingContext2D;
  source: HTMLImageElement | HTMLCanvasElement;
  sourceWidth: number;
  sourceHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  fitMode: FitMode;
  offsetX: number;
  offsetY: number;
}) {
  if (!sourceWidth || !sourceHeight) {
    throw new Error("Could not read the uploaded image size.");
  }

  const scale =
    fitMode === "cover"
      ? Math.max(canvasWidth / sourceWidth, canvasHeight / sourceHeight)
      : Math.min(canvasWidth / sourceWidth, canvasHeight / sourceHeight);

  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const drawX = (canvasWidth - drawWidth) / 2 + offsetX;
  const drawY = (canvasHeight - drawHeight) / 2 + offsetY;

  context.drawImage(source, drawX, drawY, drawWidth, drawHeight);
}

function paintBackground(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  backgroundMode: BackgroundMode,
  outputFormat: OutputFormat,
) {
  if (backgroundMode === "transparent" && outputFormat !== "jpg") {
    return;
  }

  if (backgroundMode === "soft") {
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f8fafc");
    gradient.addColorStop(1, "#e0f2fe");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    return;
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
}

function parseDimensions(dimensions: string) {
  const match = dimensions.match(/(\d+)\s*[×x]\s*(\d+)/i);

  if (!match) {
    return null;
  }

  return {
    width: Number(match[1]),
    height: Number(match[2]),
  };
}

function getMimeType(format: OutputFormat) {
  if (format === "png") return "image/png";
  if (format === "webp") return "image/webp";
  return "image/jpeg";
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not export this image version."));
          return;
        }

        resolve(blob);
      },
      mimeType,
      0.92,
    );
  });
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load uploaded image."));
    image.src = url;
  });
}

function replaceExtension(fileName: string, format: OutputFormat) {
  return fileName.replace(/\.[^.]+$/, `.${format}`);
}

function buildReport({
  sourceFileName,
  platformExports,
  successfulFiles,
  failedOutputs,
}: {
  sourceFileName: string;
  platformExports: PlatformExportPlan[];
  successfulFiles: string[];
  failedOutputs: string[];
}) {
  const lines = [
    "SellerImages Export Report",
    "",
    `Source file: ${sourceFileName}`,
    `Selected platforms: ${platformExports.length}`,
    `Generated files: ${successfulFiles.length}`,
    "",
    "Platform exports:",
    ...platformExports.map(
      (plan) =>
        `- ${plan.workflowLabel} / ${plan.platformLabel}: ${plan.outputs.length} output(s)${
          plan.baseSettings?.enabled ? " with custom platform base" : ""
        }`,
    ),
    "",
    "Generated files:",
    ...successfulFiles.map((file) => `- ${file}`),
  ];

  if (failedOutputs.length > 0) {
    lines.push("", "Issues:", ...failedOutputs.map((file) => `- ${file}`));
  }

  lines.push(
    "",
    "Note: This preview export was generated in the browser. Advanced cleanup, background removal, and large batch processing may require server-side processing later.",
  );

  return lines.join("\n");
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
