import type { Route } from "next";

/**
 * Central, editable site content.
 *
 * EDITORIAL RULES
 * ---------------
 * 1. Everything outside an `internal` block is public copy and is rendered to
 *    visitors. Keep it factually true. If something is not yet true, leave the
 *    field `null` rather than inventing a placeholder.
 * 2. Everything inside an `internal` block is for the site owner only. It is
 *    never rendered. Use it for notes, open questions, and verification state.
 * 3. `id` values are stable. They are used as React keys and as anchor targets
 *    (e.g. /services#ai-agents), so rename titles freely but keep the ids.
 *
 * THINGS THIS SITE DELIBERATELY DOES NOT CLAIM
 * --------------------------------------------
 * No client names or logos, no testimonials, no case studies, no customer or
 * revenue numbers, no performance statistics, no pricing, no team biographies
 * or credentials, no funding, no certifications, no delivery timelines, and no
 * response-time or uptime promises. This is an early-stage company; the site
 * describes what it builds and how it works, not results it has not yet earned.
 * Add any of the above only once it is true and verifiable.
 */

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type NavItem = {
  label: string;
  href: Route;
};

/** Owner-only metadata. Never rendered to visitors. */
export type InternalNotes = {
  /** Free-form notes, open questions, and to-dos for the site owner. */
  notes: string;
  /** Set to true once the public fields on this item have been confirmed. */
  verified: boolean;
};

/** Icon key, mapped to a lucide icon in `src/components/capability-icon.tsx`. */
export type IconKey = "agent" | "automation" | "analysis" | "custom";

export type Capability = {
  id: string;
  name: string;
  icon: IconKey;
  /** One line, used on cards and in the nav summary. */
  summary: string;
  /** Longer explanation, used on the services page. */
  body: string[];
  /**
   * Illustrative applications. These are examples of what could be built, not
   * descriptions of delivered work, and the page labels them that way.
   */
  examples: string[];
  featured: boolean;
  internal: InternalNotes;
};

export type Audience = {
  id: string;
  name: string;
  body: string;
};

export type ProcessStep = {
  id: string;
  name: string;
  body: string;
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
};

/* -------------------------------------------------------------------------- */
/*  Brand                                                                      */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "Bianca Wind",
  tagline: "AI software, built to fit the way you work.",
  /**
   * Canonical production URL. Leave `null` until a custom domain is live; the
   * app falls back to the Vercel deployment URL. See `src/lib/site-url.ts`.
   */
  url: null as string | null,
  description:
    "Bianca Wind develops AI software — agents, automation tools, data analysis tools, and custom AI solutions for individuals and businesses.",
  /** Short descriptor used in the footer and on cards. */
  shortDescription:
    "AI agents, automation, data analysis, and custom AI solutions.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "What we build", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  ...mainNav,
  { label: "Privacy", href: "/privacy" },
];

/* -------------------------------------------------------------------------- */
/*  Company                                                                    */
/* -------------------------------------------------------------------------- */

export const company = {
  /** One-line answer to "what is this?". */
  short:
    "Bianca Wind develops artificial intelligence software — AI agents, automation tools, data analysis tools, and custom solutions built around the way a person or a team already works.",

  /** Home page introduction. */
  intro: [
    "Most software asks people to change how they work in order to use it. We start from the opposite end: look closely at the work that already happens, then build the thing that removes the friction from it.",
    "That might be an agent that handles a multi-step task end to end, a quiet automation that clears out repetitive admin, a tool that answers questions about data you already hold, or something designed from scratch because nothing off the shelf fits.",
  ],

  /** About page. */
  about: [
    "Bianca Wind is a software company working on applied artificial intelligence: agents, automation, data analysis, and custom systems for individuals and for businesses.",
    "The interesting problem in AI right now is rarely the model. It is the fit — the gap between what a capable general system can do and what a specific person or team actually needs on a Tuesday afternoon. Closing that gap is engineering work: understanding a process properly, choosing where automation genuinely helps, and building something people will still want to use in three months.",
    "We work in small, narrow steps for that reason. A prototype aimed at one real task tells you more than a long specification, and it tells you sooner — including when the honest answer is that a simpler tool, or no tool at all, would serve better.",
  ],

  /** Deliberately honest positioning. Shown on the About page. */
  stage: {
    heading: "Where we are",
    body: [
      "Bianca Wind is early. There is no client list, no case-study library, and no pricing table on this site, because publishing those before they are real would tell you nothing useful.",
      "What we can do is talk concretely about a problem you have, and be straight about whether it is one we are well placed to solve. If it is not, saying so early is more valuable to you than a proposal.",
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  What we build                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Shown once on the services page, above the capability sections, so the
 * illustrative nature of the examples is stated plainly and up front.
 */
export const capabilitiesNote =
  "The examples under each heading show the kind of thing a project might involve. They are there to make the categories concrete — not a portfolio of delivered work.";

export const capabilities: Capability[] = [
  {
    id: "ai-agents",
    name: "AI agents",
    icon: "agent",
    summary:
      "Software that carries out multi-step work on your behalf, not just one prompt at a time.",
    body: [
      "An agent is software that can take an objective, work out the steps, use the tools it has been given, and keep going until the job is done — checking its own work along the way.",
      "The engineering that matters here is scope and safety: deciding exactly what an agent is allowed to touch, what it must hand back to a person, and how you can see what it did and why.",
    ],
    examples: [
      "Reading an inbox and drafting replies for a person to approve",
      "Researching a topic across sources and returning a referenced summary",
      "Working through a queue of tickets, resolving the routine ones",
      "Preparing a recurring report by gathering the inputs itself",
    ],
    featured: true,
    internal: {
      notes:
        "Examples are illustrative and labelled as such on the services page. Replace with real delivered work once there is some, and move them under a case-studies section rather than listing them as capabilities.",
      verified: false,
    },
  },
  {
    id: "automation",
    name: "Automation tools",
    icon: "automation",
    summary:
      "Quietly removing the repetitive, rule-shaped work that eats the day.",
    body: [
      "Not everything needs a model behind it. A lot of lost time is ordinary repetition: moving information between systems, reformatting it, chasing it, and doing the same checks every week.",
      "Automation here means finding those loops and closing them — using AI only where judgement is genuinely required, and plain deterministic code everywhere else, because it is cheaper and more predictable.",
    ],
    examples: [
      "Moving data between tools that do not talk to each other",
      "Turning documents and forms into structured records",
      "Routing incoming requests to the right person automatically",
      "Scheduled jobs that produce and distribute routine outputs",
    ],
    featured: true,
    internal: {
      notes: "Illustrative examples only — see note on ai-agents.",
      verified: false,
    },
  },
  {
    id: "data-analysis",
    name: "Data analysis tools",
    icon: "analysis",
    summary:
      "Getting real answers out of the records you already hold.",
    body: [
      "Most organisations are already sitting on the data needed to answer their own questions. What is missing is a way to ask — without exporting three spreadsheets and rebuilding the same pivot table every month.",
      "We build the layer that sits on top: tools that read your existing records, answer questions in plain language, and produce the summaries and reports you would otherwise assemble by hand.",
    ],
    examples: [
      "Asking questions of your own records in plain language",
      "Dashboards and recurring reports that build themselves",
      "Finding patterns and outliers across records too numerous to read",
      "Turning unstructured notes and documents into analysable data",
    ],
    featured: true,
    internal: {
      notes: "Illustrative examples only — see note on ai-agents.",
      verified: false,
    },
  },
  {
    id: "custom-solutions",
    name: "Custom AI solutions",
    icon: "custom",
    summary:
      "When nothing off the shelf fits the shape of the problem.",
    body: [
      "Sometimes the honest answer is that no existing product matches how you work, and bending your process to fit one costs more than it saves.",
      "In that case we design around the constraints that actually apply: your data, your privacy and compliance requirements, the systems you already run, and the people who will use the result every day.",
    ],
    examples: [
      "Internal tools shaped around one team's specific process",
      "AI features built into a product you already operate",
      "Systems with strict constraints on where data may go",
      "Bringing an existing prototype up to something dependable",
    ],
    featured: true,
    internal: {
      notes: "Illustrative examples only — see note on ai-agents.",
      verified: false,
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Who we build for                                                           */
/* -------------------------------------------------------------------------- */

export const audiences: Audience[] = [
  {
    id: "individuals",
    name: "Individuals",
    body: "Solo professionals, freelancers, and small practices who are doing the work of several people and want some of it handled properly rather than hurriedly.",
  },
  {
    id: "businesses",
    name: "Businesses",
    body: "Teams that know exactly which part of their week is being lost to repetition or manual analysis, and want a tool built around that process rather than a platform to migrate into.",
  },
];

/* -------------------------------------------------------------------------- */
/*  How we work                                                                */
/* -------------------------------------------------------------------------- */

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    name: "Understand the work",
    body: "A conversation about what actually takes the time, and where the current process bends. Often this is enough to establish whether software is the right answer at all.",
  },
  {
    id: "prototype",
    name: "Prototype narrowly",
    body: "The smallest useful version, aimed at one real task with real data. Narrow scope means you find out quickly whether it works, rather than at the end.",
  },
  {
    id: "deploy",
    name: "Put it into real use",
    body: "Into the hands of the people who will use it, in the systems they already use, with a clear view of what the software is doing and where a person stays in the loop.",
  },
  {
    id: "iterate",
    name: "Refine or hand over",
    body: "Adjust it against how it behaves in practice. You should end up owning something maintainable — not something that only works while we are holding it.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Contact                                                                    */
/* -------------------------------------------------------------------------- */

export const contact = {
  heading: "Start a conversation",
  invitation:
    "Tell us about the work you are trying to make easier. A short description of the problem is more useful than a specification.",
  /**
   * Public contact address. Leave `null` until a real address exists -- do not
   * invent one. When set, it is shown as a mailto link on the contact page.
   */
  email: null as string | null,
  /** Honest expectation setting. Deliberately promises nothing. */
  note: "Enquiries are read by a person. If what you need is outside what we are well placed to build, we will say so rather than take the work.",
  /** What is genuinely useful to include in a first message. */
  prompts: [
    "The task or process you want to improve, in plain terms",
    "Who does it today, and roughly how often",
    "Any systems or data it already touches",
    "Constraints that matter — privacy, budget, timing",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Social                                                                     */
/* -------------------------------------------------------------------------- */

/** Intentionally empty. Add real profiles only -- never placeholder accounts. */
export const socialLinks: SocialLink[] = [];

/* -------------------------------------------------------------------------- */
/*  Legal                                                                      */
/* -------------------------------------------------------------------------- */

export const legal = {
  /** Update whenever the privacy page text changes. */
  privacyLastUpdated: "15 September 2026",
} as const;

/* -------------------------------------------------------------------------- */
/*  Derived helpers                                                            */
/* -------------------------------------------------------------------------- */

export function getFeaturedCapabilities(): Capability[] {
  return capabilities.filter((capability) => capability.featured);
}
