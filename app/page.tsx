import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SellerImages | Marketplace-Ready Product Image Packs",
  description:
    "Check, fix, resize, and export product images for Amazon, Etsy, eBay, Shopify, and Google Shopping. Create upload-ready image packs in one workflow.",
  keywords: [
    "seller images",
    "product image resizer",
    "Amazon image checker",
    "Etsy thumbnail preview",
    "eBay photo resizer",
    "Shopify product image optimizer",
    "marketplace image pack",
    "product photo compliance",
  ],
  openGraph: {
    title: "SellerImages | Marketplace-Ready Product Image Packs",
    description:
      "Upload product photos once and export clean, marketplace-ready image packs for Amazon, Etsy, eBay, Shopify, and Google Shopping.",
    url: "https://www.sellerimages.com",
    siteName: "SellerImages",
    type: "website",
  },
  alternates: {
    canonical: "https://www.sellerimages.com",
  },
};

const marketplaces = ["Amazon", "Etsy", "eBay", "Shopify", "Google Shopping"];

const checks = [
  {
    title: "Main image checks",
    description:
      "Catch common marketplace issues like small image size, weak framing, non-white backgrounds, borders, overlays, and blurry uploads.",
  },
  {
    title: "Smart crop previews",
    description:
      "Preview how product images may appear in listing grids, search results, thumbnails, and storefront layouts before exporting.",
  },
  {
    title: "Batch export packs",
    description:
      "Generate organized folders with upload-ready images for each marketplace instead of resizing and renaming files manually.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Upload product images",
    description:
      "Drop in raw product photos for one item, a full listing, or a small batch of SKUs.",
  },
  {
    step: "02",
    title: "Run marketplace checks",
    description:
      "SellerImages reviews sizing, crop safety, background, format, quality, and export readiness.",
  },
  {
    step: "03",
    title: "Fix and export",
    description:
      "Download clean image folders for Amazon, Etsy, eBay, Shopify, Google Shopping, and social use.",
  },
];

const features = [
  {
    title: "Amazon-ready main images",
    description:
      "Check white background, product framing, minimum size, file format, and visual issues before uploading.",
  },
  {
    title: "Etsy thumbnail previews",
    description:
      "See how your first listing image may crop in grid-style layouts and avoid product cutoffs.",
  },
  {
    title: "Multi-platform resizing",
    description:
      "Create image versions for different marketplace requirements without opening five different tools.",
  },
  {
    title: "ZIP export workflow",
    description:
      "Download structured image folders named by marketplace so your files are ready to upload or send.",
  },
  {
    title: "Quality warnings",
    description:
      "Flag blur, poor resolution, awkward crops, borders, text overlays, and compression issues.",
  },
  {
    title: "AI-assisted cleanup",
    description:
      "Use AI where it actually helps, such as background cleanup, product detection, image ordering, and issue explanations.",
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    description: "For checking a few images before uploading.",
    features: [
      "Single-image checks",
      "Basic marketplace guidance",
      "Preview common image issues",
      "Limited daily usage",
    ],
    cta: "Start checking",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$12",
    description: "For sellers preparing new listings regularly.",
    features: [
      "Marketplace export packs",
      "Amazon and Etsy presets",
      "ZIP downloads",
      "Up to 50 image packs monthly",
    ],
    cta: "Choose Starter",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$49",
    description: "For VAs, freelancers, and small ecommerce teams.",
    features: [
      "Batch processing",
      "Client-ready image folders",
      "QA reports",
      "Higher monthly limits",
    ],
    cta: "Choose Agency",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Is SellerImages an AI image generator?",
    answer:
      "Not mainly. The product is designed as a marketplace image workflow tool. AI helps with cleanup and analysis, but the core value is checking, fixing, resizing, organizing, and exporting seller-ready images.",
  },
  {
    question: "Who is this for?",
    answer:
      "It is for Amazon sellers, Etsy shop owners, eBay sellers, Shopify store owners, virtual assistants, freelancers, and ecommerce agencies that prepare product images repeatedly.",
  },
  {
    question: "What problem does it solve?",
    answer:
      "It reduces the manual work of checking marketplace rules, resizing files, previewing crops, cleaning backgrounds, and creating separate upload-ready folders for each platform.",
  },
  {
    question: "Will it replace Canva or Adobe?",
    answer:
      "No. Canva and Adobe are broad creative tools. SellerImages is focused on seller-specific image preparation, compliance checks, batch exports, and marketplace workflow speed.",
  },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="#"
          className="flex items-center gap-3"
          aria-label="SellerImages home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-sm font-bold text-white shadow-sm">
            SI
          </div>
          <div>
            <p className="text-base font-bold tracking-tight text-sky-950">
              SellerImages
            </p>
            <p className="text-xs font-medium text-slate-500">
              Marketplace image packs
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a className="transition hover:text-sky-700" href="#workflow">
            Workflow
          </a>
          <a className="transition hover:text-sky-700" href="#features">
            Features
          </a>
          <a className="transition hover:text-sky-700" href="#pricing">
            Pricing
          </a>
          <a className="transition hover:text-sky-700" href="#faq">
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            className="hidden cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 md:inline-flex"
          >
            View pricing
          </a>
          <a
            href="#upload"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
          >
            Try free
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-emerald-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Built for sellers, creators, and ecommerce teams
          </div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-sky-950 sm:text-5xl lg:text-6xl">
            Turn product photos into marketplace-ready image packs.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            SellerImages helps you check, fix, resize, crop, and export product
            images for Amazon, Etsy, eBay, Shopify, and Google Shopping without
            manually rebuilding the same files in different tools.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#upload"
              className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-sky-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
            >
              Check product images
            </a>
            <a
              href="#workflow"
              className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-slate-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
            >
              See how it works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {marketplaces.map((marketplace) => (
              <span
                key={marketplace}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
              >
                {marketplace}
              </span>
            ))}
          </div>
        </div>

        <div
          id="upload"
          className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl"
        >
          <div className="rounded-[1.5rem] border border-dashed border-sky-300 bg-sky-50/70 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-sky-950">
                  Image pack preview
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Example workflow for one product listing.
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
                4 ready
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="aspect-square rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-semibold text-slate-500">
                  Main image
                </div>
              </div>
              <div className="aspect-square rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-sky-100 text-sm font-semibold text-slate-500">
                  Thumbnail
                </div>
              </div>
              <div className="aspect-[4/3] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-slate-100 text-sm font-semibold text-slate-500">
                  Etsy crop
                </div>
              </div>
              <div className="aspect-[4/3] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-white text-sm font-semibold text-slate-500">
                  Shopify web
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <StatusRow
                label="Amazon main image"
                status="Pass"
                tone="success"
              />
              <StatusRow
                label="Etsy thumbnail crop"
                status="Review"
                tone="warning"
              />
              <StatusRow
                label="File size and format"
                status="Pass"
                tone="success"
              />
              <StatusRow
                label="Background cleanup"
                status="Fixed"
                tone="success"
              />
            </div>

            <button className="mt-6 w-full cursor-pointer rounded-2xl bg-sky-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200">
              Export marketplace ZIP
            </button>
          </div>
        </div>
      </div>
    </section>
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

function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-3 lg:px-8">
        {checks.map((item) => (
          <div key={item.title} className="flex gap-4">
            <div className="mt-1 h-10 w-10 shrink-0 rounded-2xl bg-sky-50 ring-1 ring-sky-100" />
            <div>
              <h2 className="text-base font-bold text-sky-950">{item.title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section id="workflow" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Workflow"
          title="A cleaner way to prepare seller images"
          description="The goal is simple: upload once, catch issues early, and export files you can actually use."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {workflowSteps.map((item) => (
            <div
              key={item.step}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-sm font-bold text-white">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-sky-950">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="features" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Features"
          title="Built around seller workflow, not generic image editing"
          description="Canva and Adobe are broad creative tools. SellerImages should focus on marketplace checks, batch fixes, and export-ready files."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 h-11 w-11 rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 ring-1 ring-sky-100" />
              <h3 className="text-lg font-bold text-sky-950">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformExport() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">
            Export packs
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-sky-950 sm:text-4xl">
            Give sellers files they can upload immediately.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            The strongest product value is not another editing canvas. It is an
            organized output that saves sellers time and reduces upload
            mistakes.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>

          <div className="space-y-3 font-mono text-sm leading-7 text-slate-300">
            <p className="text-sky-300">/sellerimages-export</p>
            <p>├── amazon</p>
            <p>│ ├── main-image.jpg</p>
            <p>│ ├── detail-shot.jpg</p>
            <p>│ └── lifestyle-image.jpg</p>
            <p>├── etsy</p>
            <p>│ ├── listing-photo-1.jpg</p>
            <p>│ └── thumbnail-preview.jpg</p>
            <p>├── ebay</p>
            <p>│ └── gallery-image.jpg</p>
            <p>├── shopify</p>
            <p>│ ├── product-main.webp</p>
            <p>│ └── collection-thumb.webp</p>
            <p>└── google-shopping</p>
            <p> └── feed-image.jpg</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingPreview() {
  return (
    <section id="pricing" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple pricing for sellers and small teams"
          description="Use one-time exports for casual sellers and subscriptions for sellers, VAs, freelancers, and agencies that process images repeatedly."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article
              key={tier.name}
              className={`rounded-3xl border p-6 shadow-sm ${
                tier.highlighted
                  ? "border-sky-300 bg-white ring-4 ring-sky-100"
                  : "border-slate-200 bg-white"
              }`}
            >
              {tier.highlighted && (
                <div className="mb-4 inline-flex rounded-full bg-sky-50 px-3 py-1 text-sm font-bold text-sky-700 ring-1 ring-sky-200">
                  Best starting point
                </div>
              )}

              <h3 className="text-2xl font-bold text-sky-950">{tier.name}</h3>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-bold text-slate-950">
                  {tier.price}
                </span>
                {tier.price !== "$0" && (
                  <span className="pb-1 text-sm font-medium text-slate-500">
                    /month
                  </span>
                )}
              </div>
              <p className="mt-4 leading-7 text-slate-600">
                {tier.description}
              </p>

              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm text-slate-700"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#upload"
                className={`mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-2xl px-5 py-3 font-semibold transition focus:outline-none focus:ring-4 ${
                  tier.highlighted
                    ? "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-200"
                    : "border border-slate-300 bg-white text-slate-800 hover:border-sky-300 hover:bg-sky-50 focus:ring-sky-100"
                }`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions sellers will ask before trusting the workflow"
          description="Keep the messaging direct. The product should feel practical, credible, and specific."
        />

        <div className="mt-10 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <h3 className="text-lg font-bold text-sky-950">
                  {faq.question}
                </h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600 transition group-open:bg-sky-100 group-open:text-sky-700">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-sky-950 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-sky-100 sm:text-4xl">
          Prepare product images without guessing marketplace rules.
        </h2>
        <p className="mt-5 text-lg leading-8 text-sky-100/80">
          Check images, fix common issues, and export clean marketplace folders
          for your next listing launch.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#upload"
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-white px-6 py-4 text-base font-semibold text-sky-950 transition hover:bg-sky-50 focus:outline-none focus:ring-4 focus:ring-sky-300"
          >
            Start free
          </a>
          <a
            href="#features"
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-sky-700 px-6 py-4 text-base font-semibold text-white transition hover:bg-sky-900 focus:outline-none focus:ring-4 focus:ring-sky-700"
          >
            Review features
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-sm font-bold text-white">
              SI
            </div>
            <div>
              <p className="font-bold text-sky-950">SellerImages</p>
              <p className="text-sm text-slate-500">Marketplace image packs</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            A seller-focused image workflow for checking, fixing, resizing, and
            exporting product images for major marketplaces.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
            Product
          </h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <a className="block transition hover:text-sky-700" href="#workflow">
              Workflow
            </a>
            <a className="block transition hover:text-sky-700" href="#features">
              Features
            </a>
            <a className="block transition hover:text-sky-700" href="#pricing">
              Pricing
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
            Tools
          </h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <a className="block transition hover:text-sky-700" href="#upload">
              Amazon image checker
            </a>
            <a className="block transition hover:text-sky-700" href="#upload">
              Etsy thumbnail preview
            </a>
            <a className="block transition hover:text-sky-700" href="#upload">
              Product image pack generator
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-6">
        <p className="mx-auto max-w-7xl text-sm text-slate-500">
          © {new Date().getFullYear()} SellerImages. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-sky-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-slate-700">{description}</p>
    </div>
  );
}

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SellerImages",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.sellerimages.com",
    description:
      "SellerImages helps ecommerce sellers check, fix, resize, and export marketplace-ready product image packs.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    audience: {
      "@type": "Audience",
      audienceType:
        "Amazon sellers, Etsy shop owners, eBay sellers, Shopify merchants, ecommerce freelancers, and marketplace agencies",
    },
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-slate-50 font-sans text-slate-950">
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <Workflow />
          <FeatureGrid />
          <PlatformExport />
          <PricingPreview />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
