"use client";

import {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  ReactNode,
  RefObject,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ExportOutput,
  ExportProcessingWorkflow,
  PlatformBaseSettings,
  PlatformExportPlan,
} from "./ExportProcessingWorkflow";
import { ImageWorkflowHeader } from "./ImageWorkflowHeader";

type FitMode = "contain" | "cover";
type BackgroundMode = "white" | "soft" | "transparent";
type OutputFormat = "jpg" | "png" | "webp";

type OutputSettings = {
  fitMode: FitMode;
  backgroundMode: BackgroundMode;
  outputFormat: OutputFormat;
};

type PlatformPreset = {
  id: string;
  label: string;
  description: string;
  sizes: {
    id: string;
    name: string;
    dimensions: string;
    ratio: string;
    fileName: string;
  }[];
};

type Workflow = {
  id: string;
  label: string;
  description: string;
  platforms: PlatformPreset[];
};

const MAX_FILE_SIZE_MB = 25;
const MAX_MEGAPIXELS = 60;
const RECOMMENDED_LONG_EDGE = 2500;
const RECOMMENDED_SHORT_EDGE = 1600;

const acceptedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
];

const formatLabels = ["JPEG", "JPG", "PNG", "WebP", "AVIF", "GIF", "SVG"];

const defaultOutputSettings: OutputSettings = {
  fitMode: "contain",
  backgroundMode: "white",
  outputFormat: "jpg",
};

const workflows: Workflow[] = [
  {
    id: "ecommerce",
    label: "Ecommerce",
    description:
      "Product listing, marketplace, storefront, and social outputs.",
    platforms: [
      {
        id: "amazon",
        label: "Amazon",
        description: "Main image, gallery image, and listing-safe exports.",
        sizes: [
          {
            id: "amazon-main",
            name: "Main image",
            dimensions: "2000 × 2000",
            ratio: "1 / 1",
            fileName: "amazon-main.jpg",
          },
          {
            id: "amazon-gallery",
            name: "Gallery image",
            dimensions: "2000 × 2000",
            ratio: "1 / 1",
            fileName: "amazon-gallery.jpg",
          },
          {
            id: "amazon-lifestyle",
            name: "Lifestyle image",
            dimensions: "2000 × 1600",
            ratio: "5 / 4",
            fileName: "amazon-lifestyle.jpg",
          },
        ],
      },
      {
        id: "etsy",
        label: "Etsy",
        description: "Listing photo, thumbnail, and shop-cover style outputs.",
        sizes: [
          {
            id: "etsy-listing",
            name: "Listing photo",
            dimensions: "2000 × 2500",
            ratio: "4 / 5",
            fileName: "etsy-listing-photo.jpg",
          },
          {
            id: "etsy-thumbnail",
            name: "Thumbnail",
            dimensions: "570 × 456",
            ratio: "5 / 4",
            fileName: "etsy-thumbnail.jpg",
          },
          {
            id: "etsy-cover",
            name: "Cover photo",
            dimensions: "3360 × 840",
            ratio: "4 / 1",
            fileName: "etsy-cover.jpg",
          },
        ],
      },
      {
        id: "shopify",
        label: "Shopify",
        description:
          "Product image, collection thumbnail, and web banner exports.",
        sizes: [
          {
            id: "shopify-product",
            name: "Product image",
            dimensions: "2048 × 2048",
            ratio: "1 / 1",
            fileName: "shopify-product.webp",
          },
          {
            id: "shopify-collection",
            name: "Collection thumb",
            dimensions: "1024 × 1024",
            ratio: "1 / 1",
            fileName: "shopify-collection.webp",
          },
          {
            id: "shopify-banner",
            name: "Store banner",
            dimensions: "2048 × 800",
            ratio: "128 / 50",
            fileName: "shopify-banner.webp",
          },
        ],
      },
    ],
  },
  {
    id: "real-estate",
    label: "Real estate",
    description: "Listing gallery, website, social, and ad outputs.",
    platforms: [
      {
        id: "listing",
        label: "Listing pack",
        description: "Property gallery and listing presentation outputs.",
        sizes: [
          {
            id: "listing-gallery",
            name: "Listing gallery",
            dimensions: "1600 × 1200",
            ratio: "4 / 3",
            fileName: "listing-gallery.jpg",
          },
          {
            id: "property-hero",
            name: "Website hero",
            dimensions: "1920 × 1080",
            ratio: "16 / 9",
            fileName: "property-hero.webp",
          },
          {
            id: "open-house-story",
            name: "Vertical story",
            dimensions: "1080 × 1920",
            ratio: "9 / 16",
            fileName: "open-house-story.jpg",
          },
        ],
      },
      {
        id: "facebook-real-estate",
        label: "Facebook",
        description: "Real estate post and ad previews.",
        sizes: [
          {
            id: "facebook-listing-post",
            name: "Feed post",
            dimensions: "1200 × 630",
            ratio: "40 / 21",
            fileName: "facebook-listing-post.jpg",
          },
          {
            id: "facebook-property-ad",
            name: "Square ad",
            dimensions: "1080 × 1080",
            ratio: "1 / 1",
            fileName: "facebook-property-ad.jpg",
          },
          {
            id: "facebook-property-story",
            name: "Story",
            dimensions: "1080 × 1920",
            ratio: "9 / 16",
            fileName: "facebook-property-story.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "local-business",
    label: "Local business",
    description: "Google Business, Facebook, website, and email outputs.",
    platforms: [
      {
        id: "google-business",
        label: "Google Business",
        description: "Business profile, cover, and post image outputs.",
        sizes: [
          {
            id: "google-business-post",
            name: "Post image",
            dimensions: "1200 × 900",
            ratio: "4 / 3",
            fileName: "google-business-post.jpg",
          },
          {
            id: "google-business-cover",
            name: "Cover photo",
            dimensions: "1080 × 608",
            ratio: "135 / 76",
            fileName: "google-business-cover.jpg",
          },
          {
            id: "google-business-logo",
            name: "Logo",
            dimensions: "720 × 720",
            ratio: "1 / 1",
            fileName: "google-business-logo.png",
          },
        ],
      },
      {
        id: "facebook-local",
        label: "Facebook",
        description: "Business post, cover, and ad image outputs.",
        sizes: [
          {
            id: "facebook-post",
            name: "Post image",
            dimensions: "1200 × 630",
            ratio: "40 / 21",
            fileName: "facebook-post.jpg",
          },
          {
            id: "facebook-cover",
            name: "Cover photo",
            dimensions: "820 × 462",
            ratio: "410 / 231",
            fileName: "facebook-cover.jpg",
          },
          {
            id: "facebook-ad",
            name: "Square ad",
            dimensions: "1080 × 1080",
            ratio: "1 / 1",
            fileName: "facebook-ad.jpg",
          },
        ],
      },
      {
        id: "website-local",
        label: "Website",
        description: "Hero, card, and blog-style web exports.",
        sizes: [
          {
            id: "website-hero",
            name: "Hero image",
            dimensions: "1920 × 1080",
            ratio: "16 / 9",
            fileName: "website-hero.webp",
          },
          {
            id: "website-card",
            name: "Feature card",
            dimensions: "1200 × 800",
            ratio: "3 / 2",
            fileName: "website-card.webp",
          },
          {
            id: "website-square",
            name: "Square preview",
            dimensions: "1000 × 1000",
            ratio: "1 / 1",
            fileName: "website-square.webp",
          },
        ],
      },
    ],
  },
  {
    id: "creator",
    label: "Creator",
    description: "YouTube, Instagram, TikTok, Pinterest, and X outputs.",
    platforms: [
      {
        id: "youtube",
        label: "YouTube",
        description: "Thumbnail, Shorts cover, and channel-style outputs.",
        sizes: [
          {
            id: "youtube-thumbnail",
            name: "Thumbnail",
            dimensions: "1280 × 720",
            ratio: "16 / 9",
            fileName: "youtube-thumbnail.jpg",
          },
          {
            id: "youtube-shorts-cover",
            name: "Shorts cover",
            dimensions: "1080 × 1920",
            ratio: "9 / 16",
            fileName: "youtube-shorts-cover.jpg",
          },
          {
            id: "youtube-community-post",
            name: "Community post",
            dimensions: "1080 × 1080",
            ratio: "1 / 1",
            fileName: "youtube-community-post.jpg",
          },
        ],
      },
      {
        id: "instagram",
        label: "Instagram",
        description: "Feed, portrait, story, and reel-cover outputs.",
        sizes: [
          {
            id: "instagram-square",
            name: "Square post",
            dimensions: "1080 × 1080",
            ratio: "1 / 1",
            fileName: "instagram-square.jpg",
          },
          {
            id: "instagram-portrait",
            name: "Portrait post",
            dimensions: "1080 × 1350",
            ratio: "4 / 5",
            fileName: "instagram-portrait.jpg",
          },
          {
            id: "instagram-story",
            name: "Story / Reel",
            dimensions: "1080 × 1920",
            ratio: "9 / 16",
            fileName: "instagram-story.jpg",
          },
        ],
      },
      {
        id: "x-twitter",
        label: "X / Twitter",
        description: "Post, card, and header outputs.",
        sizes: [
          {
            id: "x-post",
            name: "Post image",
            dimensions: "1200 × 675",
            ratio: "16 / 9",
            fileName: "x-post-image.jpg",
          },
          {
            id: "x-card",
            name: "Card image",
            dimensions: "800 × 418",
            ratio: "400 / 209",
            fileName: "x-card-image.jpg",
          },
          {
            id: "x-header",
            name: "Header",
            dimensions: "1500 × 500",
            ratio: "3 / 1",
            fileName: "x-header.jpg",
          },
        ],
      },
    ],
  },
];

const allWorkflowIds = workflows.map((workflow) => workflow.id);
const allPlatformIds = workflows.flatMap((workflow) =>
  workflow.platforms.map((platform) => platform.id),
);

export function ImagePackWorkflowUploader() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileMeta, setFileMeta] = useState("");
  const [imageDimensions, setImageDimensions] = useState("");
  const [imageWarning, setImageWarning] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [baseEditorPlatformId, setBaseEditorPlatformId] = useState<
    string | null
  >(null);

  const [selectedWorkflowIds, setSelectedWorkflowIds] =
    useState<string[]>(allWorkflowIds);
  const [selectedPlatformIds, setSelectedPlatformIds] =
    useState<string[]>(allPlatformIds);

  const [activeWorkflowId, setActiveWorkflowId] = useState(workflows[0].id);
  const [activePlatformId, setActivePlatformId] = useState(
    workflows[0].platforms[0].id,
  );
  const [expandedOutputId, setExpandedOutputId] = useState(
    workflows[0].platforms[0].sizes[0].id,
  );
  const [outputSettings, setOutputSettings] = useState<
    Record<string, OutputSettings>
  >({});
  const [platformBaseSettings, setPlatformBaseSettings] = useState<
    Record<string, PlatformBaseSettings>
  >({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeWorkflow = useMemo(() => {
    return (
      workflows.find((workflow) => workflow.id === activeWorkflowId) ??
      workflows[0]
    );
  }, [activeWorkflowId]);

  const activePlatform = useMemo(() => {
    return (
      activeWorkflow.platforms.find(
        (platform) => platform.id === activePlatformId,
      ) ?? activeWorkflow.platforms[0]
    );
  }, [activePlatformId, activeWorkflow]);

  const selectedPlatformCount = selectedPlatformIds.filter((platformId) =>
    selectedWorkflowIds.some((workflowId) =>
      workflows
        .find((workflow) => workflow.id === workflowId)
        ?.platforms.some((platform) => platform.id === platformId),
    ),
  ).length;

  const canExport = selectedWorkflowIds.length > 0 && selectedPlatformCount > 0;

  function getOutputSettings(outputId: string): OutputSettings {
    return outputSettings[outputId] ?? defaultOutputSettings;
  }

  function updateOutputSetting<K extends keyof OutputSettings>(
    outputId: string,
    key: K,
    value: OutputSettings[K],
  ) {
    setOutputSettings((current) => ({
      ...current,
      [outputId]: {
        ...defaultOutputSettings,
        ...current[outputId],
        [key]: value,
      },
    }));
  }

  function getDefaultBaseSettings(
    platform: PlatformPreset,
  ): PlatformBaseSettings {
    const dimensions = parseDimensions(platform.sizes[0]?.dimensions ?? "");

    return {
      enabled: true,
      width: dimensions?.width ?? 2000,
      height: dimensions?.height ?? 2000,
      offsetX: 0,
      offsetY: 0,
      fitMode: "contain",
      backgroundMode: "white",
    };
  }

  function getPlatformBaseSettings(
    platform: PlatformPreset,
  ): PlatformBaseSettings {
    return (
      platformBaseSettings[platform.id] ?? getDefaultBaseSettings(platform)
    );
  }

  function savePlatformBaseSettings(
    platformId: string,
    settings: PlatformBaseSettings,
  ) {
    setPlatformBaseSettings((current) => ({
      ...current,
      [platformId]: settings,
    }));
  }

  function clearPlatformBaseSettings(platformId: string) {
    setPlatformBaseSettings((current) => {
      const next = { ...current };
      delete next[platformId];
      return next;
    });
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024 * 1024) {
      return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function setActivePlatform(workflow: Workflow, platform: PlatformPreset) {
    setActiveWorkflowId(workflow.id);
    setActivePlatformId(platform.id);
    setExpandedOutputId(platform.sizes[0].id);
    setBaseEditorPlatformId(null);
    setIsExporting(false);
  }

  function toggleWorkflow(workflow: Workflow) {
    const workflowPlatformIds = workflow.platforms.map(
      (platform) => platform.id,
    );
    const isSelected = selectedWorkflowIds.includes(workflow.id);

    const nextWorkflowIds = isSelected
      ? selectedWorkflowIds.filter((id) => id !== workflow.id)
      : [...selectedWorkflowIds, workflow.id];

    const nextPlatformIds = isSelected
      ? selectedPlatformIds.filter((id) => !workflowPlatformIds.includes(id))
      : Array.from(new Set([...selectedPlatformIds, ...workflowPlatformIds]));

    setSelectedWorkflowIds(nextWorkflowIds);
    setSelectedPlatformIds(nextPlatformIds);

    const nextActive = findFirstSelectedPlatform(
      nextWorkflowIds,
      nextPlatformIds,
    );

    if (nextActive) {
      setActivePlatform(nextActive.workflow, nextActive.platform);
    }

    setIsExporting(false);
  }

  function togglePlatform(workflow: Workflow, platform: PlatformPreset) {
    const isSelected = selectedPlatformIds.includes(platform.id);

    const nextPlatformIds = isSelected
      ? selectedPlatformIds.filter((id) => id !== platform.id)
      : [...selectedPlatformIds, platform.id];

    const nextWorkflowIds = selectedWorkflowIds.includes(workflow.id)
      ? selectedWorkflowIds
      : [...selectedWorkflowIds, workflow.id];

    setSelectedWorkflowIds(nextWorkflowIds);
    setSelectedPlatformIds(nextPlatformIds);

    if (!isSelected) {
      setActivePlatform(workflow, platform);
      return;
    }

    if (activePlatformId === platform.id) {
      const nextActive = findFirstSelectedPlatform(
        nextWorkflowIds,
        nextPlatformIds,
      );

      if (nextActive) {
        setActivePlatform(nextActive.workflow, nextActive.platform);
      }
    }

    setIsExporting(false);
  }

  function findFirstSelectedPlatform(
    workflowIds: string[],
    platformIds: string[],
  ) {
    for (const workflow of workflows) {
      if (!workflowIds.includes(workflow.id)) continue;

      for (const platform of workflow.platforms) {
        if (platformIds.includes(platform.id)) {
          return { workflow, platform };
        }
      }
    }

    return null;
  }

  function handleFile(file: File | undefined) {
    if (!file) return;

    if (!acceptedMimeTypes.includes(file.type)) {
      setError("Upload a JPEG, JPG, PNG, WebP, AVIF, GIF, or SVG image.");
      return;
    }

    const sizeMb = file.size / (1024 * 1024);

    if (sizeMb > MAX_FILE_SIZE_MB) {
      setError(`Upload an image under ${MAX_FILE_SIZE_MB}MB for this preview.`);
      return;
    }

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    const nextImageUrl = URL.createObjectURL(file);

    setError("");
    setImageWarning("");
    setIsExporting(false);
    setBaseEditorPlatformId(null);
    setImageUrl(nextImageUrl);
    setFileName(file.name);
    setFileMeta(
      `${file.type.replace("image/", "").toUpperCase()} · ${formatFileSize(
        file.size,
      )}`,
    );

    const image = new Image();

    image.onload = () => {
      const megapixels = (image.naturalWidth * image.naturalHeight) / 1_000_000;
      const longEdge = Math.max(image.naturalWidth, image.naturalHeight);
      const shortEdge = Math.min(image.naturalWidth, image.naturalHeight);

      setImageDimensions(`${image.naturalWidth} × ${image.naturalHeight}px`);

      if (megapixels > MAX_MEGAPIXELS) {
        setImageWarning(
          `This image is very large (${megapixels.toFixed(
            1,
          )}MP). It may need compression before batch exports.`,
        );
        return;
      }

      if (
        longEdge < RECOMMENDED_LONG_EDGE ||
        shortEdge < RECOMMENDED_SHORT_EDGE
      ) {
        setImageWarning(
          `Best results usually come from images at least ${RECOMMENDED_LONG_EDGE}px on the long edge and ${RECOMMENDED_SHORT_EDGE}px on the short edge.`,
        );
        return;
      }

      setImageWarning("Good source size for most image pack previews.");
    };

    image.onerror = () => {
      setImageDimensions("Dimensions unavailable");
      setImageWarning(
        file.type === "image/svg+xml"
          ? "SVG works best for logos and simple graphics. Photo-style exports may vary."
          : "Could not read image dimensions.",
      );
    };

    image.src = nextImageUrl;
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

  function handleUploadKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fileInputRef.current?.click();
    }
  }

  function removeImage() {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    setImageUrl(null);
    setFileName("");
    setFileMeta("");
    setImageDimensions("");
    setImageWarning("");
    setError("");
    setOutputSettings({});
    setPlatformBaseSettings({});
    setExpandedOutputId(activePlatform.sizes[0].id);
    setIsExporting(false);
    setBaseEditorPlatformId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function buildExportPlans(): PlatformExportPlan[] {
    return workflows.flatMap((workflow) => {
      if (!selectedWorkflowIds.includes(workflow.id)) return [];

      return workflow.platforms.flatMap((platform) => {
        if (!selectedPlatformIds.includes(platform.id)) return [];

        return [
          {
            workflowId: workflow.id,
            workflowLabel: workflow.label,
            platformId: platform.id,
            platformLabel: platform.label,
            folderName: `${workflow.id}-${platform.id}`,
            baseSettings: platformBaseSettings[platform.id],
            outputs: platform.sizes.map((size): ExportOutput => {
              const settings = getOutputSettings(size.id);

              return {
                ...size,
                settings,
              };
            }),
          },
        ];
      });
    });
  }

  function findPlatformById(platformId: string) {
    for (const workflow of workflows) {
      for (const platform of workflow.platforms) {
        if (platform.id === platformId) {
          return { workflow, platform };
        }
      }
    }

    return null;
  }

  if (!imageUrl) {
    return (
      <div
        id="upload"
        className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl"
      >
        <UploadCard
          isDragging={isDragging}
          error={error}
          fileInputRef={fileInputRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onKeyDown={handleUploadKeyDown}
          onInputChange={handleInputChange}
        />
      </div>
    );
  }

  if (isExporting) {
    return (
      <ExportProcessingWorkflow
        imageUrl={imageUrl}
        sourceFileName={fileName}
        folderName="sellerimages-selected-packs"
        platformExports={buildExportPlans()}
        onBackToEdit={() => setIsExporting(false)}
        onStartOver={removeImage}
      />
    );
  }

  const baseEditorPlatform =
    baseEditorPlatformId !== null
      ? (findPlatformById(baseEditorPlatformId)?.platform ?? activePlatform)
      : activePlatform;

  return (
    <div id="upload" className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl">
        <div className="space-y-5 rounded-[1.5rem] border border-dashed border-sky-300 bg-sky-50/60 p-6">
          <ImageWorkflowHeader
            fileName={fileName}
            fileMeta={fileMeta}
            imageDimensions={imageDimensions}
            imageWarning={imageWarning}
            onReplaceImage={() => fileInputRef.current?.click()}
            onStartOver={removeImage}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpeg,.jpg,.png,.webp,.avif,.gif,.svg,image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml"
            onChange={handleInputChange}
            className="hidden"
          />

          {baseEditorPlatformId ? (
            <BaseImagePrepWorkflow
              platform={baseEditorPlatform}
              settings={getPlatformBaseSettings(baseEditorPlatform)}
              onSave={(settings) => {
                savePlatformBaseSettings(baseEditorPlatformId, settings);
                setBaseEditorPlatformId(null);
              }}
              onDisable={() => {
                clearPlatformBaseSettings(baseEditorPlatformId);
                setBaseEditorPlatformId(null);
              }}
              onBack={() => setBaseEditorPlatformId(null)}
            />
          ) : (
            <>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
                  Prepare image
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-sky-950">
                  Choose packs, platforms, and outputs.
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  All packs and platforms are selected by default. Most users
                  can keep the defaults and export immediately.
                </p>
              </div>

              <PackSelectionPanel
                workflows={workflows}
                selectedWorkflowIds={selectedWorkflowIds}
                selectedPlatformIds={selectedPlatformIds}
                activePlatformId={activePlatformId}
                onToggleWorkflow={toggleWorkflow}
                onTogglePlatform={togglePlatform}
                onPreviewPlatform={setActivePlatform}
              />

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div>
                  <p className="text-sm font-bold text-sky-950">
                    Output settings for {activePlatform.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    The first output is open. Other outputs stay collapsed until
                    you choose to edit them.
                  </p>
                </div>

                <AdvancedPlatformPrepCard
                  platform={activePlatform}
                  baseSettings={platformBaseSettings[activePlatform.id]}
                  onConfigure={() => setBaseEditorPlatformId(activePlatform.id)}
                />

                <div className="mt-4 space-y-3">
                  {activePlatform.sizes.map((size, index) => {
                    const isExpanded = expandedOutputId === size.id;
                    const settings = getOutputSettings(size.id);

                    return (
                      <OutputSettingsPanel
                        key={size.id}
                        size={size}
                        index={index}
                        expanded={isExpanded}
                        settings={settings}
                        onToggle={() => setExpandedOutputId(size.id)}
                        onFitModeChange={(value) =>
                          updateOutputSetting(size.id, "fitMode", value)
                        }
                        onBackgroundModeChange={(value) =>
                          updateOutputSetting(size.id, "backgroundMode", value)
                        }
                        onOutputFormatChange={(value) =>
                          updateOutputSetting(size.id, "outputFormat", value)
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <PlatformPreview
        imageUrl={imageUrl}
        activeWorkflow={activeWorkflow}
        activePlatform={activePlatform}
        selectedPlatformCount={selectedPlatformCount}
        canExport={canExport}
        expandedOutputId={expandedOutputId}
        getOutputSettings={getOutputSettings}
        setExpandedOutputId={setExpandedOutputId}
        baseSettings={platformBaseSettings[activePlatform.id]}
        onEditBase={() => setBaseEditorPlatformId(activePlatform.id)}
        onExport={() => setIsExporting(true)}
      />
    </div>
  );
}

function UploadCard({
  isDragging,
  error,
  fileInputRef,
  onDrop,
  onDragOver,
  onDragLeave,
  onKeyDown,
  onInputChange,
}: {
  isDragging: boolean;
  error: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-sky-300 bg-sky-50/60 p-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
          Try the workflow
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-sky-950">
          Upload one image and preview the pack.
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Start with a product, property, promo, or campaign image. Best results
          come from high-quality images at least 2500px on the long edge and
          under 25MB.
        </p>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onKeyDown={onKeyDown}
        className={`mt-6 cursor-pointer rounded-3xl border-2 border-dashed bg-white p-8 text-center transition ${
          isDragging
            ? "border-sky-500 bg-sky-50 ring-4 ring-sky-100"
            : "border-sky-300 hover:border-sky-500 hover:bg-sky-50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpeg,.jpg,.png,.webp,.avif,.gif,.svg,image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml"
          onChange={onInputChange}
          className="hidden"
        />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-600 text-3xl font-bold text-white shadow-sm">
          ↑
        </div>

        <p className="mt-5 text-lg font-bold text-slate-900">
          Drop an image here, or click to upload
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
          Supports common formats used for listings, websites, social posts,
          ads, and client delivery.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {formatLabels.map((format) => (
            <span
              key={format}
              className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200"
            >
              {format}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-2xl rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-slate-600 ring-1 ring-slate-200">
        <strong className="font-bold text-slate-800">Upload guidance:</strong>{" "}
        avoid tiny screenshots, heavily compressed images, or extremely large
        files. Very large or pixel-dense images should be compressed before
        batch export.
      </div>

      {error && (
        <div className="mx-auto mt-5 max-w-md rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">
          {error}
        </div>
      )}
    </div>
  );
}

function PackSelectionPanel({
  workflows,
  selectedWorkflowIds,
  selectedPlatformIds,
  activePlatformId,
  onToggleWorkflow,
  onTogglePlatform,
  onPreviewPlatform,
}: {
  workflows: Workflow[];
  selectedWorkflowIds: string[];
  selectedPlatformIds: string[];
  activePlatformId: string;
  onToggleWorkflow: (workflow: Workflow) => void;
  onTogglePlatform: (workflow: Workflow, platform: PlatformPreset) => void;
  onPreviewPlatform: (workflow: Workflow, platform: PlatformPreset) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedPackCount = selectedWorkflowIds.length;
  const selectedPlatformCount = selectedPlatformIds.filter((platformId) =>
    workflows.some(
      (workflow) =>
        selectedWorkflowIds.includes(workflow.id) &&
        workflow.platforms.some((platform) => platform.id === platformId),
    ),
  ).length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
      >
        <div>
          <p className="text-sm font-bold text-sky-950">Included packs</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {selectedPlatformCount} platform
            {selectedPlatformCount === 1 ? "" : "s"} selected across{" "}
            {selectedPackCount} pack{selectedPackCount === 1 ? "" : "s"}.
          </p>
        </div>

        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 ring-1 ring-sky-100">
          {isOpen ? "Hide" : "Manage"}
        </span>
      </button>

      {!isOpen && (
        <div className="mt-4 flex flex-wrap gap-2">
          {workflows
            .filter((workflow) => selectedWorkflowIds.includes(workflow.id))
            .map((workflow) => (
              <span
                key={workflow.id}
                className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200"
              >
                {workflow.label}
              </span>
            ))}
        </div>
      )}

      {isOpen && (
        <div className="mt-5 space-y-5 border-t border-slate-200 pt-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Packs
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {workflows.map((workflow) => {
                const active = selectedWorkflowIds.includes(workflow.id);

                return (
                  <button
                    key={workflow.id}
                    type="button"
                    onClick={() => onToggleWorkflow(workflow)}
                    className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                      active
                        ? "border-sky-300 bg-sky-50 text-sky-800"
                        : "border-slate-200 bg-white text-slate-500 hover:border-sky-200 hover:bg-sky-50"
                    }`}
                  >
                    {active ? "✓ " : ""}
                    {workflow.label}
                  </button>
                );
              })}
            </div>
          </div>

          {workflows
            .filter((workflow) => selectedWorkflowIds.includes(workflow.id))
            .map((workflow) => (
              <div key={workflow.id}>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  {workflow.label} platforms
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {workflow.platforms.map((platform) => {
                    const selected = selectedPlatformIds.includes(platform.id);
                    const active = activePlatformId === platform.id;

                    return (
                      <div
                        key={platform.id}
                        className={`flex overflow-hidden rounded-full border text-sm font-semibold ${
                          active
                            ? "border-sky-400 ring-2 ring-sky-100"
                            : "border-slate-200"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onTogglePlatform(workflow, platform)}
                          className={`cursor-pointer px-3 py-1.5 transition ${
                            selected
                              ? "bg-sky-50 text-sky-800"
                              : "bg-white text-slate-500 hover:bg-sky-50"
                          }`}
                        >
                          {selected ? "✓ " : ""}
                          {platform.label}
                        </button>

                        {selected && (
                          <button
                            type="button"
                            onClick={() =>
                              onPreviewPlatform(workflow, platform)
                            }
                            className="cursor-pointer border-l border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500 transition hover:bg-sky-50 hover:text-sky-700"
                          >
                            Preview
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function AdvancedPlatformPrepCard({
  platform,
  baseSettings,
  onConfigure,
}: {
  platform: PlatformPreset;
  baseSettings?: PlatformBaseSettings;
  onConfigure: () => void;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-900">
            Advanced platform prep
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Optional. Resize or offset the uploaded image before{" "}
            {platform.label} outputs are generated.
          </p>
        </div>

        <button
          type="button"
          onClick={onConfigure}
          className="w-fit cursor-pointer rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-800 transition hover:bg-sky-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
        >
          Configure
        </button>
      </div>

      {baseSettings?.enabled ? (
        <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
          Custom base active for {platform.label}: {baseSettings.width} ×{" "}
          {baseSettings.height}px, offset {baseSettings.offsetX}px /{" "}
          {baseSettings.offsetY}px.
        </div>
      ) : (
        <div className="mt-3 rounded-xl bg-white px-3 py-2 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
          Using the original uploaded image as the platform base.
        </div>
      )}
    </div>
  );
}

function BaseImagePrepWorkflow({
  platform,
  settings,
  onSave,
  onDisable,
  onBack,
}: {
  platform: PlatformPreset;
  settings: PlatformBaseSettings;
  onSave: (settings: PlatformBaseSettings) => void;
  onDisable: () => void;
  onBack: () => void;
}) {
  const [draft, setDraft] = useState<PlatformBaseSettings>(settings);

  function updateNumber(
    key: "width" | "height" | "offsetX" | "offsetY",
    value: string,
  ) {
    const parsed = Number(value);

    setDraft((current) => ({
      ...current,
      [key]: Number.isFinite(parsed) ? parsed : 0,
    }));
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-5 cursor-pointer text-sm font-bold text-sky-700 transition hover:text-sky-900"
      >
        ← Back to workflow
      </button>

      <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
        Advanced platform prep
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-sky-950">
        Configure base image for {platform.label}.
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Use this only when {platform.label} needs a custom starting canvas
        before the final output sizes are created.
      </p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={draft.enabled}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                enabled: event.target.checked,
              }))
            }
            className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 text-sky-600"
          />
          <span>
            <span className="block text-sm font-bold text-slate-900">
              Use custom base size for {platform.label}
            </span>
            <span className="mt-1 block text-xs leading-5 text-slate-500">
              Example: resize the uploaded image into a 2000 × 1000 platform
              base, then apply output crops afterward.
            </span>
          </span>
        </label>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <FieldGroup label="Base width">
            <input
              type="number"
              value={draft.width}
              min={1}
              onChange={(event) => updateNumber("width", event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </FieldGroup>

          <FieldGroup label="Base height">
            <input
              type="number"
              value={draft.height}
              min={1}
              onChange={(event) => updateNumber("height", event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </FieldGroup>

          <FieldGroup label="Offset X">
            <input
              type="number"
              value={draft.offsetX}
              onChange={(event) => updateNumber("offsetX", event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </FieldGroup>

          <FieldGroup label="Offset Y">
            <input
              type="number"
              value={draft.offsetY}
              onChange={(event) => updateNumber("offsetY", event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </FieldGroup>
        </div>

        <div className="mt-5 grid gap-4">
          <FieldGroup label="Base fit mode">
            <div className="grid grid-cols-2 gap-2">
              <ChoiceButton
                active={draft.fitMode === "contain"}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    fitMode: "contain",
                  }))
                }
              >
                Fit full image
              </ChoiceButton>
              <ChoiceButton
                active={draft.fitMode === "cover"}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    fitMode: "cover",
                  }))
                }
              >
                Fill crop
              </ChoiceButton>
            </div>
          </FieldGroup>

          <FieldGroup label="Base background">
            <div className="grid grid-cols-3 gap-2">
              <ChoiceButton
                active={draft.backgroundMode === "white"}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    backgroundMode: "white",
                  }))
                }
              >
                White
              </ChoiceButton>
              <ChoiceButton
                active={draft.backgroundMode === "soft"}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    backgroundMode: "soft",
                  }))
                }
              >
                Soft
              </ChoiceButton>
              <ChoiceButton
                active={draft.backgroundMode === "transparent"}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    backgroundMode: "transparent",
                  }))
                }
              >
                Clear
              </ChoiceButton>
            </div>
          </FieldGroup>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onSave(draft)}
          className="cursor-pointer rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
        >
          Save base settings
        </button>

        <button
          type="button"
          onClick={onDisable}
          className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-100"
        >
          Disable custom base
        </button>

        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function OutputSettingsPanel({
  size,
  index,
  expanded,
  settings,
  onToggle,
  onFitModeChange,
  onBackgroundModeChange,
  onOutputFormatChange,
}: {
  size: PlatformPreset["sizes"][number];
  index: number;
  expanded: boolean;
  settings: OutputSettings;
  onToggle: () => void;
  onFitModeChange: (value: FitMode) => void;
  onBackgroundModeChange: (value: BackgroundMode) => void;
  onOutputFormatChange: (value: OutputFormat) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-sky-50"
      >
        <div>
          <p className="text-sm font-bold text-slate-900">
            {index + 1}. {size.name}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {size.dimensions} · {size.ratio.replace(" / ", ":")}
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-sky-700 ring-1 ring-sky-100">
          {expanded ? "Open" : "Edit"}
        </span>
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-slate-200 bg-white p-4">
          <FieldGroup label="Fit mode">
            <div className="grid grid-cols-2 gap-2">
              <ChoiceButton
                active={settings.fitMode === "contain"}
                onClick={() => onFitModeChange("contain")}
              >
                Fit full image
              </ChoiceButton>
              <ChoiceButton
                active={settings.fitMode === "cover"}
                onClick={() => onFitModeChange("cover")}
              >
                Fill crop
              </ChoiceButton>
            </div>
          </FieldGroup>

          <FieldGroup label="Background">
            <div className="grid grid-cols-3 gap-2">
              <ChoiceButton
                active={settings.backgroundMode === "white"}
                onClick={() => onBackgroundModeChange("white")}
              >
                White
              </ChoiceButton>
              <ChoiceButton
                active={settings.backgroundMode === "soft"}
                onClick={() => onBackgroundModeChange("soft")}
              >
                Soft
              </ChoiceButton>
              <ChoiceButton
                active={settings.backgroundMode === "transparent"}
                onClick={() => onBackgroundModeChange("transparent")}
              >
                Clear
              </ChoiceButton>
            </div>
          </FieldGroup>

          <FieldGroup label="Export format">
            <div className="grid grid-cols-3 gap-2">
              <ChoiceButton
                active={settings.outputFormat === "jpg"}
                onClick={() => onOutputFormatChange("jpg")}
              >
                JPG
              </ChoiceButton>
              <ChoiceButton
                active={settings.outputFormat === "png"}
                onClick={() => onOutputFormatChange("png")}
              >
                PNG
              </ChoiceButton>
              <ChoiceButton
                active={settings.outputFormat === "webp"}
                onClick={() => onOutputFormatChange("webp")}
              >
                WebP
              </ChoiceButton>
            </div>
          </FieldGroup>
        </div>
      )}
    </div>
  );
}

function PlatformPreview({
  imageUrl,
  activeWorkflow,
  activePlatform,
  selectedPlatformCount,
  canExport,
  expandedOutputId,
  getOutputSettings,
  setExpandedOutputId,
  baseSettings,
  onEditBase,
  onExport,
}: {
  imageUrl: string;
  activeWorkflow: Workflow;
  activePlatform: PlatformPreset;
  selectedPlatformCount: number;
  canExport: boolean;
  expandedOutputId: string;
  getOutputSettings: (outputId: string) => OutputSettings;
  setExpandedOutputId: (outputId: string) => void;
  baseSettings?: PlatformBaseSettings;
  onEditBase: () => void;
  onExport: () => void;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl">
      <div className="rounded-[1.5rem] border border-dashed border-sky-300 bg-sky-50/70 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
              Preview
            </p>
            <h2 className="mt-2 text-2xl font-bold text-sky-950">
              {activePlatform.label} sizes
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
              Previewing {activeWorkflow.label} / {activePlatform.label}. Export
              will process all selected platforms, not just this preview.
            </p>
          </div>
          <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
            {selectedPlatformCount} selected
          </span>
        </div>

        {baseSettings?.enabled && (
          <div className="mt-5 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 ring-1 ring-amber-200">
            Custom base active: {baseSettings.width} × {baseSettings.height}px,
            offset {baseSettings.offsetX}px / {baseSettings.offsetY}px.
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {activePlatform.sizes.map((size) => {
            const settings = getOutputSettings(size.id);
            const selected = expandedOutputId === size.id;
            const wide = getRatioNumber(size.ratio) >= 2;

            return (
              <PreviewOutputCard
                key={size.id}
                imageUrl={imageUrl}
                size={size}
                settings={settings}
                selected={selected}
                wide={wide}
                onSelect={() => setExpandedOutputId(size.id)}
              />
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-slate-900">Export plan</p>
            <button
              type="button"
              onClick={onEditBase}
              className="cursor-pointer rounded-xl border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800 transition hover:bg-sky-100"
            >
              Configure base
            </button>
          </div>

          <div className="space-y-2 font-mono text-xs leading-6 text-slate-600">
            <p className="text-sky-700">
              /sellerimages-selected-packs/{activeWorkflow.id}-
              {activePlatform.id}
            </p>
            {activePlatform.sizes.map((size) => {
              const settings = getOutputSettings(size.id);

              return (
                <p key={size.fileName}>
                  ├── {replaceExtension(size.fileName, settings.outputFormat)}
                </p>
              );
            })}
            <p>└── image-pack-report.txt</p>
          </div>
        </div>

        <button
          type="button"
          disabled={!canExport}
          onClick={onExport}
          className="mt-6 w-full cursor-pointer rounded-2xl bg-sky-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
        >
          {canExport
            ? "Export selected image packs ZIP"
            : "Select at least one platform"}
        </button>
      </div>
    </div>
  );
}

function PreviewOutputCard({
  imageUrl,
  size,
  settings,
  selected,
  wide,
  onSelect,
}: {
  imageUrl: string;
  size: PlatformPreset["sizes"][number];
  settings: OutputSettings;
  selected: boolean;
  wide: boolean;
  onSelect: () => void;
}) {
  const backgroundClass =
    settings.backgroundMode === "white"
      ? "bg-white"
      : settings.backgroundMode === "soft"
        ? "bg-gradient-to-br from-slate-100 to-sky-50"
        : "bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onDoubleClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className={`cursor-pointer rounded-2xl border bg-white p-3 shadow-sm transition hover:border-sky-300 hover:shadow-md ${
        selected ? "border-sky-400 ring-4 ring-sky-100" : "border-slate-200"
      } ${wide ? "sm:col-span-2" : ""}`}
    >
      <div
        className={`relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 ${backgroundClass}`}
        style={{
          aspectRatio: size.ratio,
          maxHeight: wide ? "280px" : "360px",
        }}
      >
        <img
          src={imageUrl}
          alt={`${size.name} preview`}
          className="h-full w-full"
          style={{ objectFit: settings.fitMode }}
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">{size.name}</h3>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {size.dimensions}
          </p>
        </div>
        <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-bold text-sky-700 ring-1 ring-sky-100">
          {size.ratio.replace(" / ", ":")}
        </span>
      </div>
    </article>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </label>
      {children}
    </div>
  );
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-xl border px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-sky-100 ${
        active
          ? "border-sky-300 bg-sky-50 text-sky-800"
          : "border-slate-300 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50"
      }`}
    >
      {children}
    </button>
  );
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

function replaceExtension(fileName: string, format: OutputFormat) {
  return fileName.replace(/\.[^.]+$/, `.${format}`);
}

function getRatioNumber(ratio: string) {
  const [width, height] = ratio.split("/").map((part) => Number(part.trim()));

  if (!width || !height) {
    return 1;
  }

  return width / height;
}
