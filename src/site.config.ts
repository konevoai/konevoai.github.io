// ============================================================================
// SITE CONFIG — the single place to edit all company content.
// Every component imports from here. Change the name, tagline, email,
// booking link, or founder bios ONLY in this file — nothing else needs touching.
//
// Anything wrapped in [BRACKETS] is a placeholder you must replace before launch.
// ============================================================================

export const siteConfig = {
  /** Wordmark — shown in the nav and footer logo. All caps by design; change once, updates everywhere. */
  companyName: "KONEVO",

  /** Mixed-case form of the name, used in prose: page <title>, meta description, og:site_name. */
  displayName: "Konevo",

  /** The story behind the name — shown as a small, subtle line in the footer. */
  nameMeaning: "kone (machine) + evo (evolution)",

  /** Short line used in <title> and OG title. */
  tagline: "AI-powered robots for the physical world",

  /** Full meta description for SEO + Open Graph. */
  metaDescription:
    "Konevo builds AI-powered robots that bring modern AI off the screen and into factories, ships, plants and pipelines — robots that see, decide and do real work in the real world.",

  /** Canonical site URL — used for OG tags and canonical link. Update if the domain ever changes. */
  siteUrl: "https://konevoai.github.io",

  /**
   * Social share image. A placeholder lives at public/og-image.svg so the
   * meta tag isn't broken out of the box. Replace it with a real 1200x630
   * .jpg or .png at public/og-image.jpg and update this path before launch —
   * most social platforms render OG images poorly (or not at all) as SVG.
   */
  ogImage: "/og-image.svg",

  /**
   * Contact / CTA configuration.
   * Set `method` to "mailto" or "calendly" to control what every
   * "Book 20 minutes" button on the site links to.
   */
  contact: {
    method: "mailto" as "mailto" | "calendly",
    email: "ulhaqi12@gmail.com",
    /** CC'd on every mailto CTA so both founders receive it. Leave "" to send to just `email`. */
    ccEmail: "tommi.lundell@gmail.com",
    emailSubject: "Let's talk — 20 minutes",
    calendlyUrl: "[CALENDLY_URL]",
    linkedin: "[LINKEDIN_COMPANY_URL]",
  },

  nav: {
    links: [
      { label: "Vision", href: "#vision" },
      { label: "What we do", href: "#what-we-do" },
      { label: "Team", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
    ctaLabel: "Let's talk",
  },

  hero: {
    eyebrow: "AI FOR THE PHYSICAL WORLD",
    headline: "AI has mastered the digital world. The physical one is next.",
    subline:
      "We build AI-powered robots that see, decide, and do real work in the real world.",
    clarifier:
      "Put simply: robots, powered by modern AI, for the world's hardest physical work.",
    ctaLabel: "Book 20 minutes",
    /** Alt text for the hero image at src/assets/hero-robot.jpg. Update if the photo changes. */
    imageAlt:
      "A wheeled inspection robot with an articulated sensor mast and rugged all-terrain wheels, photographed in an industrial facility.",
  },

  vision: {
    heading: "Vision",
    body: "AI can already write, design and predict. But the world that feeds, moves and powers us — factories, ships, plants, pipelines — still runs on human hands and hours. We bring modern AI off the screen and onto the ground — as robots that inspect, operate and maintain the physical world, where and when people can't.",
  },

  /** Capabilities — concrete actions the robots perform, each with a one-line real-world example. */
  whatWeDo: {
    heading: "What our robots do",
    items: [
      {
        icon: "eye",
        title: "Inspect",
        description:
          "Enter tanks, hulls, silos and pipes and check them from the inside — no human entry, no shutdown.",
      },
      {
        icon: "activity",
        title: "Monitor",
        description:
          "Read the atmosphere and equipment around the clock: gas, temperature, corrosion, wear.",
      },
      {
        icon: "wrench",
        title: "Clean & maintain",
        description: "Remove sludge and scale and handle routine upkeep in place.",
      },
      {
        icon: "move",
        title: "Handle & operate",
        description:
          "Move materials and run repetitive physical tasks through hazardous or hard-to-reach routes.",
      },
    ],
  },

  /** Benefits — the old capability cards, condensed into a slim supporting strip below the capabilities. */
  benefits: {
    heading: "Why it matters",
    items: [
      { icon: "shield", label: "Safer", caption: "Goes where humans can't" },
      {
        icon: "trending-down",
        label: "Cheaper",
        caption: "Less downtime, fewer hours, lower risk",
      },
      { icon: "clock", label: "Always on", caption: "24/7, any conditions" },
      { icon: "cpu", label: "Automated", caption: "Does, not just thinks" },
    ],
  },

  whereWeStart: {
    heading: "Where we start",
    body: "First stop: maritime, energy and process industry across the Helsinki region — where the physical world is hardest, and the payoff is biggest.",
  },

  team: {
    heading: "Who we are",
    founders: [
      {
        name: "Tommi Lundell",
        role: "Co-Founder",
        /** Short focus tag shown next to the role — reflects each founder's primary domain. */
        focus: "Hardware",
        photo: "tommi-lundell",
        bio: "Our hardware lead. Nearly 30 years at Nokia — from HW/FPGA engineer to leading software and ML infrastructure teams, now managing GPU and Kubernetes platforms for machine learning at scale. Background in leadership, innovation, and hands-on hardware and mechanical design.",
        linkedin: "https://www.linkedin.com/in/tommi-lundell-28b6597",
        /** Optional personal site link, shown next to LinkedIn if set. Leave "" to omit. */
        portfolio: "",
      },
      {
        name: "Ikram Ul Haq",
        role: "Co-Founder",
        focus: "AI",
        photo: "ikram-ul-haq",
        bio: "Our AI lead. ML Engineer at Smartly, previously AI Tech Lead at Nokia leading a team building a production-grade GenAI platform — RAG pipelines, agentic workflows, and distributed LLM training on private Kubernetes clusters. Erasmus Mundus dual Master's, specialised in computer vision.",
        linkedin: "https://www.linkedin.com/in/ulhaqi12",
        portfolio: "https://ulhaqi12.github.io/",
      },
    ],
  },

  ctaBand: {
    heading: "The physical world is the next frontier for AI.",
    subheading: "We're choosing a few partners to build it with.",
    ctaLabel: "Book 20 minutes",
  },

  /** Light credibility strip near the bottom of the page — keeps the site from feeling purely aspirational. */
  credibility: {
    line: "Based in Helsinki — building with the region's heavy industry.",
  },

  footer: {
    tagline: "AI-powered robots for the physical world.",
  },
};

export type SiteConfig = typeof siteConfig;

/** Builds the mailto: link (to `email`, cc'd to `ccEmail` if set) — always a mailto, regardless of `contact.method`. */
export function getMailtoHref(config: SiteConfig = siteConfig): string {
  const subject = encodeURIComponent(config.contact.emailSubject);
  const cc = config.contact.ccEmail ? `&cc=${encodeURIComponent(config.contact.ccEmail)}` : "";
  return `mailto:${config.contact.email}?subject=${subject}${cc}`;
}

/** Resolves the single CTA link used by every "Book 20 minutes" / "Let's talk" button. */
export function getCtaHref(config: SiteConfig = siteConfig): string {
  if (config.contact.method === "calendly") {
    return config.contact.calendlyUrl;
  }
  return getMailtoHref(config);
}
