"use client";

import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react";

const acceptedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
];

const formatLabels = ["JPEG", "JPG", "PNG", "WebP", "AVIF", "GIF", "SVG"];

const workflows = [
  {
    value: "ecommerce",
    label: "Ecommerce",
    outputs: [
      { label: "Marketplace", sublabel: "Product listing", tone: "slate" },
      { label: "Shopify", sublabel: "Product page", tone: "green" },
      { label: "Creator", sublabel: "Social crop", tone: "amber" },
      { label: "Website", sublabel: "Web export", tone: "blue" },
    ],
    files: [
      "amazon-main.jpg",
      "etsy-listing-photo.jpg",
      "shopify-product.webp",
      "instagram-square.jpg",
    ],
  },
  {
    value: "real-estate",
    label: "Real estate",
    outputs: [
      { label: "MLS", sublabel: "Gallery image", tone: "slate" },
      { label: "Website", sublabel: "Hero image", tone: "blue" },
      { label: "Instagram", sublabel: "Carousel crop", tone: "amber" },
      { label: "Facebook", sublabel: "Ad crop", tone: "green" },
    ],
    files: [
      "mls-gallery.jpg",
      "website-hero.webp",
      "instagram-carousel.jpg",
      "facebook-ad.jpg",
    ],
  },
  {
    value: "local-business",
    label: "Local business",
    outputs: [
      { label: "Google", sublabel: "Business post", tone: "green" },
      { label: "Facebook", sublabel: "Promo image", tone: "blue" },
      { label: "Website", sublabel: "Banner image", tone: "slate" },
      { label: "Email", sublabel: "Header image", tone: "amber" },
    ],
    files: [
      "google-business-post.jpg",
      "facebook-promo.jpg",
      "website-banner.webp",
      "email-header.jpg",
    ],
  },
  {
    value: "creator",
    label: "Creator",
    outputs: [
      { label: "YouTube", sublabel: "Thumbnail", tone: "amber" },
      { label: "Instagram", sublabel: "Square post", tone: "green" },
      { label: "TikTok", sublabel: "Cover crop", tone: "blue" },
      { label: "Pinterest", sublabel: "Pin image", tone: "slate" },
    ],
    files: [
      "youtube-thumbnail.jpg",
      "instagram-square.jpg",
      "tiktok-cover.jpg",
      "pinterest-pin.jpg",
    ],
  },
];

type PreviewTone = "slate" | "green" | "amber" | "blue";

type WorkflowOutput = {
  label: string;
  sublabel: string;
  tone: string;
};

export function ImagePackWorkflowUploader() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0].value);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileMeta, setFileMeta] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeWorkflow = useMemo(
    () =>
      workflows.find((workflow) => workflow.value === selectedWorkflow) ??
      workflows[0],
    [selectedWorkflow],
  );

  function clearCurrentImage() {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    setImageUrl(null);
    setFileName("");
    setFileMeta("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024 * 1024) {
      return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function handleFile(file: File | undefined) {
    if (!file) return;

    if (!acceptedMimeTypes.includes(file.type)) {
      setError(
        "Please upload a JPEG, JPG, PNG, WebP, AVIF, GIF, or SVG image.",
      );
      return;
    }

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    setError("");
    setImageUrl(URL.createObjectURL(file));
    setFileName(file.name);
    setFileMeta(
      `${file.type.replace("image/", "").toUpperCase()} · ${formatFileSize(file.size)}`,
    );
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFile(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr]">
      <div>
        <div
          id="upload"
          className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="rounded-[1.25rem] border border-dashed border-sky-300 bg-sky-50/60 p-5">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
                  Try the workflow
                </p>
                <h2 className="mt-2 text-xl font-bold text-sky-950">
                  Upload one image and preview the pack
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                  Drag in a product, property, promo, or campaign image. The
                  preview shows how it can become a clean export pack.
                </p>
              </div>

              <div className="min-w-44">
                <label
                  htmlFor="workflow"
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500"
                >
                  Pack type
                </label>
                <select
                  id="workflow"
                  value={selectedWorkflow}
                  onChange={(event) => setSelectedWorkflow(event.target.value)}
                  className="w-full cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition hover:border-sky-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                >
                  {workflows.map((workflow) => (
                    <option key={workflow.value} value={workflow.value}>
                      {workflow.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  fileInputRef.current?.click();
                }
              }}
              className={`mt-5 cursor-pointer rounded-3xl border-2 border-dashed bg-white p-6 text-center transition ${
                isDragging
                  ? "border-sky-500 bg-sky-50 ring-4 ring-sky-100"
                  : "border-sky-300 hover:border-sky-500 hover:bg-sky-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpeg,.jpg,.png,.webp,.avif,.gif,.svg,image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml"
                onChange={handleInputChange}
                className="hidden"
              />

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-2xl font-bold text-white shadow-sm">
                ↑
              </div>

              <p className="mt-4 text-base font-bold text-slate-900">
                Drop an image here, or click to upload
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Supports common image formats used for listings, websites,
                social posts, ads, and client delivery.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {formatLabels.map((format) => (
                  <span
                    key={format}
                    className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200"
                  >
                    {format}
                  </span>
                ))}
              </div>

              {fileName && (
                <div className="mx-auto mt-5 max-w-md rounded-2xl bg-emerald-50 px-4 py-3 text-left ring-1 ring-emerald-200">
                  <p className="truncate text-sm font-bold text-emerald-800">
                    {fileName}
                  </p>
                  <p className="mt-1 text-xs font-medium text-emerald-700">
                    {fileMeta}
                  </p>
                </div>
              )}

              {error && (
                <div className="mx-auto mt-5 max-w-md rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">
                  {error}
                </div>
              )}
            </div>

            {imageUrl && (
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
                >
                  Replace image
                </button>
                <button
                  type="button"
                  onClick={clearCurrentImage}
                  className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-100"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ImagePackPreview imageUrl={imageUrl} activeWorkflow={activeWorkflow} />
    </div>
  );
}

function ImagePackPreview({
  imageUrl,
  activeWorkflow,
}: {
  imageUrl: string | null;
  activeWorkflow: {
    label: string;
    outputs: WorkflowOutput[];
    files: string[];
  };
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl">
      <div className="rounded-[1.5rem] border border-dashed border-sky-300 bg-sky-50/70 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-sky-950">
              Image pack preview
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {activeWorkflow.label} outputs from one uploaded image.
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
            4 ready
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {activeWorkflow.outputs.map((output) => (
            <PreviewTile
              key={`${output.label}-${output.sublabel}`}
              label={output.label}
              sublabel={output.sublabel}
              tone={output.tone as PreviewTone}
              imageUrl={imageUrl}
            />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-slate-900">Export folder</p>
            <p className="text-xs font-semibold text-slate-500">
              {imageUrl ? "Ready to generate" : "Waiting for image"}
            </p>
          </div>

          <div className="space-y-2 font-mono text-xs leading-6 text-slate-600">
            <p className="text-sky-700">
              /sellerimages-
              {activeWorkflow.label.toLowerCase().replaceAll(" ", "-")}
            </p>
            {activeWorkflow.files.map((file) => (
              <p key={file}>├── {file}</p>
            ))}
            <p>└── image-pack-report.pdf</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <StatusRow
            label="Resize outputs"
            status={imageUrl ? "Pass" : "Waiting"}
            tone="success"
          />
          <StatusRow
            label="Thumbnail crop"
            status={imageUrl ? "Review" : "Preview"}
            tone="warning"
          />
          <StatusRow
            label="File size and format"
            status={imageUrl ? "Pass" : "Waiting"}
            tone="success"
          />
          <StatusRow
            label="Export folders"
            status={imageUrl ? "Ready" : "Waiting"}
            tone="success"
          />
        </div>

        <button className="mt-6 w-full cursor-pointer rounded-2xl bg-sky-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200">
          Export image pack ZIP
        </button>
      </div>
    </div>
  );
}

function PreviewTile({
  label,
  sublabel,
  tone = "slate",
  imageUrl,
}: {
  label: string;
  sublabel: string;
  tone?: PreviewTone;
  imageUrl: string | null;
}) {
  const toneClass =
    tone === "green"
      ? "from-emerald-50 to-sky-100"
      : tone === "amber"
        ? "from-amber-50 to-slate-100"
        : tone === "blue"
          ? "from-sky-100 to-white"
          : "from-slate-100 to-slate-200";

  return (
    <div className="aspect-square rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div
        className={`relative flex h-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${toneClass} px-4 text-center`}
      >
        {imageUrl ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute inset-0 bg-slate-950/20" />
            <div className="relative rounded-xl bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
              <p className="text-sm font-bold text-slate-700">{label}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                {sublabel}
              </p>
            </div>
          </>
        ) : (
          <div>
            <p className="text-sm font-bold text-slate-600">{label}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {sublabel}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusRow({
  label,
  status,
  tone,
}: {
  label: string;
  status: string;
  tone: "success" | "warning";
}) {
  const toneClass =
    tone === "success"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : "bg-amber-50 text-amber-800 ring-amber-200";

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span
        className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${toneClass}`}
      >
        {status}
      </span>
    </div>
  );
}
