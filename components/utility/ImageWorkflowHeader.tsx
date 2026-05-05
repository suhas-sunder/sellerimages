"use client";

type ImageWorkflowHeaderProps = {
  fileName: string;
  fileMeta: string;
  imageDimensions: string;
  imageWarning: string;
  onReplaceImage: () => void;
  onStartOver: () => void;
};

export function ImageWorkflowHeader({
  fileName,
  fileMeta,
  imageDimensions,
  imageWarning,
  onReplaceImage,
  onStartOver,
}: ImageWorkflowHeaderProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
            Uploaded image
          </p>
          <h2 className="mt-1 truncate text-lg font-bold text-sky-950">
            {fileName}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-600">
            {fileMeta}
            {imageDimensions ? ` · ${imageDimensions}` : ""}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={onReplaceImage}
            className="cursor-pointer rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
          >
            Replace image
          </button>
          <button
            type="button"
            onClick={onStartOver}
            className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-100"
          >
            Start over
          </button>
        </div>
      </div>

      {imageWarning && (
        <div
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-medium ring-1 ${
            imageWarning.startsWith("Good")
              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
              : "bg-amber-50 text-amber-800 ring-amber-200"
          }`}
        >
          {imageWarning}
        </div>
      )}
    </div>
  );
}
