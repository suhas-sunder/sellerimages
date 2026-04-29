import type { Metadata } from "next";
import { ImagePackWorkflowUploader } from "../components/utility/ImagePackWorkflowUploader";

export const metadata: Metadata = {
  title: "SellerImages | Image Pack Automation for Sellers and Creators",
  description:
    "Upload once and export clean image packs for ecommerce listings, real estate listings, local business promos, creator campaigns, websites, and ads.",
  keywords: [
    "seller images",
    "image pack generator",
    "marketplace image automation",
    "product image resizer",
    "Amazon image checker",
    "Etsy thumbnail preview",
    "eBay photo resizer",
    "Shopify product image optimizer",
    "real estate listing image pack",
    "MLS image resizer",
    "local business image pack",
    "creator image pack",
    "image compressor",
    "image converter",
    "background cleanup",
    "thumbnail preview",
    "product photo compliance",
  ],
  openGraph: {
    title: "SellerImages | Image Pack Automation for Sellers and Creators",
    description:
      "Upload once, preview outputs, and export clean image folders for listings, campaigns, websites, ads, and client handoff.",
    url: "https://www.sellerimages.com",
    siteName: "SellerImages",
    type: "website",
  },
  alternates: {
    canonical: "https://www.sellerimages.com",
  },
};

const packTypes = [
  "Ecommerce",
  "Real estate",
  "Local business",
  "Creators",
  "Websites",
  "Ads",
];

const checks = [
  {
    title: "Preflight image checks",
    description:
      "Catch common issues like low resolution, poor framing, risky crops, heavy files, blurry uploads, and format mismatches.",
  },
  {
    title: "Pack previews",
    description:
      "Preview how one image can work across listings, social posts, thumbnails, websites, ads, and business promos.",
  },
  {
    title: "Batch export packs",
    description:
      "Generate organized folders with upload-ready images instead of resizing, renaming, compressing, and sorting files manually.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Upload your images",
    description:
      "Add product photos, property photos, campaign assets, local business images, or creator visuals.",
  },
  {
    step: "02",
    title: "Choose an image pack",
    description:
      "Pick ecommerce, real estate, local business, creator campaign, website, ad, or custom export workflows.",
  },
  {
    step: "03",
    title: "Preview and export",
    description:
      "Download clean image folders with resized, compressed, converted, and platform-ready files.",
  },
];

const features = [
  {
    title: "Ecommerce image packs",
    description:
      "Create Amazon, Etsy, eBay, Shopify, and Google Shopping image versions from one upload.",
  },
  {
    title: "Real estate listing packs",
    description:
      "Prepare property images for listing galleries, website heroes, social posts, ads, and open-house promos.",
  },
  {
    title: "Creator campaign packs",
    description:
      "Repurpose images for YouTube thumbnails, Instagram posts, TikTok covers, Pinterest pins, and X images.",
  },
  {
    title: "ZIP export workflow",
    description:
      "Download structured folders so your files are ready to upload, send, save, or hand off to a client.",
  },
  {
    title: "Quality warnings",
    description:
      "Flag blur, poor resolution, awkward crops, borders, text overlays, compression issues, and format mismatches.",
  },
  {
    title: "AI-assisted cleanup",
    description:
      "Use AI where it helps, such as background cleanup, image issue explanations, alt text, image ordering, and smart recommendations.",
  },
];

const tools = [
  {
    title: "Image Resizer",
    description:
      "Resize images for listings, thumbnails, websites, social posts, ads, and custom dimensions.",
  },
  {
    title: "Image Compressor",
    description:
      "Reduce file size for faster websites, email delivery, marketplace uploads, and client handoff.",
  },
  {
    title: "Image Converter",
    description:
      "Convert JPG, PNG, and WebP files depending on platform, website, marketplace, or sharing needs.",
  },
  {
    title: "Crop and Pad Tool",
    description:
      "Create square, portrait, landscape, and safe-crop versions without stretching or distorting images.",
  },
  {
    title: "Background Cleanup",
    description:
      "Clean product, listing, and promo images where a neutral, white, or transparent background is needed.",
  },
  {
    title: "Thumbnail Preview",
    description:
      "Preview how images may appear as listing thumbnails, social previews, cards, grids, and campaign assets.",
  },
];

const useCases = [
  {
    title: "Ecommerce sellers",
    description:
      "Prepare listing-ready images, gallery assets, product thumbnails, and launch visuals without rebuilding each size manually.",
  },
  {
    title: "Real estate teams",
    description:
      "Turn property photos into listing galleries, website images, social posts, open-house promos, and ad crops.",
  },
  {
    title: "Local businesses",
    description:
      "Create images for Google Business, Yelp, Facebook, Instagram, websites, email promos, and ads.",
  },
  {
    title: "Creators and marketers",
    description:
      "Repurpose visuals into thumbnails, posts, stories, pins, banners, covers, and campaign assets.",
  },
  {
    title: "VAs and agencies",
    description:
      "Deliver clean client-ready image folders and QA reports instead of loose files and manual resizing work.",
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    description: "For testing images and using basic tools.",
    features: [
      "Single-image previews",
      "Basic resize and crop tools",
      "Limited image checks",
      "Manual downloads",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$12",
    description: "For sellers and creators preparing image packs regularly.",
    features: [
      "Image pack exports",
      "Ecommerce and creator templates",
      "ZIP downloads",
      "Saved export settings",
    ],
    cta: "Choose Starter",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$49",
    description: "For VAs, freelancers, real estate teams, and agencies.",
    features: [
      "Batch processing",
      "Client-ready folders",
      "QA reports",
      "Higher monthly limits",
    ],
    cta: "Choose Agency",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Is SellerImages just another image resizer?",
    answer:
      "No. Resizing, compression, conversion, and cropping are useful secondary tools. The main product is image pack automation: upload once, choose a workflow, preview the outputs, and export organized files.",
  },
  {
    question: "Who is this for?",
    answer:
      "It is for ecommerce sellers, real estate agents, property managers, creators, local businesses, virtual assistants, freelancers, and agencies that prepare images repeatedly.",
  },
  {
    question: "What problem does it solve?",
    answer:
      "It reduces the manual work of resizing files, checking image requirements, previewing crops, compressing images, renaming files, and creating separate upload-ready folders.",
  },
  {
    question: "Where should AI be used?",
    answer:
      "AI should support the workflow, not dominate it. Useful AI features include background cleanup, image issue explanations, alt text, image ordering, and smart recommendations. Resizing, compression, conversion, and folder generation should stay deterministic.",
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
              Image pack automation
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
          <a className="transition hover:text-sky-700" href="#tools">
            Tools
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
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Built for sellers, creators, real estate, and business teams
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-sky-950 sm:text-5xl lg:text-6xl">
            Turn images into ready-to-use image packs.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            Upload once, preview the outputs, and export clean image folders for
            ecommerce listings, real estate listings, local business promos,
            creator campaigns, websites, and ads.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {packTypes.map((packType) => (
              <span
                key={packType}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
              >
                {packType}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <ImagePackWorkflowUploader />
        </div>
      </div>
    </section>
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
          title="A cleaner way to prepare business images"
          description="The goal is simple: upload once, preview outputs, and export files that are ready to upload, send, save, publish, or hand off."
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
          title="Built around image packs, not generic editing"
          description="Canva, Adobe, and social resizers are broad creative tools. SellerImages should focus on finished image deliverables, organized folders, and practical workflow speed."
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
            Give users files they can use immediately.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            The strongest product value is not another editing canvas. It is an
            organized output that saves time and reduces upload, publishing, and
            client handoff mistakes.
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
            <p>├── ecommerce</p>
            <p>│ ├── amazon-main.jpg</p>
            <p>│ ├── etsy-listing-photo.jpg</p>
            <p>│ └── shopify-product.webp</p>
            <p>├── real-estate</p>
            <p>│ ├── listing-gallery.jpg</p>
            <p>│ ├── website-hero.webp</p>
            <p>│ └── open-house-story.jpg</p>
            <p>├── campaign</p>
            <p>│ ├── instagram-square.jpg</p>
            <p>│ ├── youtube-thumbnail.jpg</p>
            <p>│ └── facebook-ad.jpg</p>
            <p>└── image-pack-report.pdf</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section id="tools" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Secondary tools"
          title="Useful individual tools when users do not need a full pack"
          description="Standalone tools can help with SEO and quick tasks, but they should support the main workflow instead of replacing it."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article
              key={tool.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200"
            >
              <div className="mb-5 h-11 w-11 rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 ring-1 ring-sky-100" />
              <h3 className="text-lg font-bold text-sky-950">{tool.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">
                {tool.description}
              </p>
              <a
                href="#upload"
                className="mt-5 inline-flex cursor-pointer text-sm font-bold text-sky-700 transition hover:text-sky-900"
              >
                Try tool
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Use cases"
          title="Made for people who need finished image deliverables"
          description="The best users are not just editing images for fun. They need files that are ready to upload, publish, save, send, or hand off."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {useCases.map((useCase) => (
            <article
              key={useCase.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <h3 className="text-lg font-bold text-sky-950">
                {useCase.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {useCase.description}
              </p>
            </article>
          ))}
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
          title="Simple pricing for sellers, creators, and small teams"
          description="Use free tools for acquisition, affordable image pack exports for regular users, and agency tiers for repeated client work."
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
          title="Questions users will ask before trusting the workflow"
          description="The product should feel practical, credible, and specific."
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
          Stop rebuilding the same image files for every platform.
        </h2>
        <p className="mt-5 text-lg leading-8 text-sky-100/80">
          Upload an image set, choose a workflow, and export clean image folders
          for listings, campaigns, websites, ads, and client handoff.
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
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-sm font-bold text-white">
              SI
            </div>
            <div>
              <p className="font-bold text-sky-950">SellerImages</p>
              <p className="text-sm text-slate-500">Image pack automation</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            A workflow-first image platform for sellers, real estate teams,
            local businesses, creators, freelancers, and agencies that need
            upload-ready files.
          </p>
        </div>

        <FooterColumn
          title="Workflows"
          links={[
            "Ecommerce packs",
            "Real estate packs",
            "Local business packs",
            "Creator campaign packs",
          ]}
        />

        <FooterColumn
          title="Tools"
          links={[
            "Image Resizer",
            "Image Compressor",
            "Image Converter",
            "Thumbnail Preview",
          ]}
        />

        <FooterColumn
          title="Product"
          links={["Workflow", "Features", "Pricing", "FAQ"]}
        />
      </div>

      <div className="border-t border-slate-200 px-6 py-6">
        <p className="mx-auto max-w-7xl text-sm text-slate-500">
          © {new Date().getFullYear()} SellerImages. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        {links.map((link) => (
          <a
            key={link}
            className="block transition hover:text-sky-700"
            href="#upload"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
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
      "SellerImages helps users upload images once and export organized image packs for ecommerce listings, real estate listings, local business promotions, creator campaigns, websites, and ads.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    audience: {
      "@type": "Audience",
      audienceType:
        "Ecommerce sellers, real estate agents, property managers, local businesses, creators, freelancers, virtual assistants, and agencies",
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
          <ToolsSection />
          <UseCases />
          <PricingPreview />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
