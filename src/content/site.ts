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
 * 3. `id` values are stable. They are used as React keys and anchors, so rename
 *    titles freely but do not change an existing id.
 */

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type NavItem = {
  label: string;
  href: Route;
};

/** Whether a title is final, or a placeholder still under consideration. */
export type TitleStatus = "working" | "confirmed";

/** Owner-only metadata. Never rendered to visitors. */
export type InternalNotes = {
  /** Free-form notes, open questions, and to-dos for the site owner. */
  notes: string;
  /** Set to true once the public fields on this item have been confirmed. */
  verified: boolean;
};

export type WritingProject = {
  id: string;
  title: string;
  titleStatus: TitleStatus;
  /** Short public status, e.g. "Work in progress". */
  statusLabel: string;
  /**
   * Public description. Intentionally `null` until the owner writes one --
   * never auto-fill this with an invented synopsis.
   */
  summary: string | null;
  featured: boolean;
  internal: InternalNotes;
};

export type MusicTrack = {
  id: string;
  /** The label shown to visitors. May be a temporary placeholder. */
  displayTitle: string;
  titleStatus: TitleStatus;
  /** Where the track can be listened to, e.g. "Suno". */
  platform: string;
  url: string;
  featured: boolean;
  internal: InternalNotes;
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
  tagline: "Stories, sound, and worlds in motion.",
  /**
   * Canonical production URL. Leave `null` until a custom domain is live; the
   * app falls back to the Vercel deployment URL. See `src/lib/site-url.ts`.
   */
  url: null as string | null,
  description:
    "Explore the writing and music of Bianca Wind—a creative space where personal experiences and imagination take shape.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
  { label: "Music", href: "/music" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  ...mainNav,
  { label: "Privacy", href: "/privacy" },
];

/* -------------------------------------------------------------------------- */
/*  Author                                                                     */
/* -------------------------------------------------------------------------- */

export const author = {
  /** One-line answer to "who is this?". */
  short:
    "Bianca Wind is an author name — a single place for writing, music, and the projects still taking shape.",
  /** Home page introduction. */
  intro: [
    "Bianca Wind is a creative identity rather than a company or a catalogue. It gathers two kinds of work in one place: stories written from imagination and from lived experience, and songs made from some of that same writing.",
    "This site is the home for both. It is early, and it is meant to grow in public — work appears here as it becomes real, not before.",
  ],
  /** About page. */
  about: [
    "Bianca Wind began as a name to write under. Writing came first: stories, fragments, and pieces drawn from personal experience — some of it invented, some of it remembered, most of it somewhere in between.",
    "Not all of that writing stays on the page. Certain passages ask to be heard rather than read, and those become songs, shaped with AI music tools. The words and the intent come from the writing; the arrangement is built around them.",
    "Wind is the image the name keeps returning to — movement, weather, and atmosphere as ways of describing how stories arrive and change shape. It is a metaphor for the work, and the reason this site looks the way it does.",
    "What you will find here is a working archive rather than a finished body of work: a place to follow projects while they are still in motion.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Writing                                                                    */
/* -------------------------------------------------------------------------- */

export const writingIntro = [
  "Writing is where every project here starts. Some of it stays prose, and some of it becomes something to listen to.",
  "Projects are listed below as they take shape. Titles and descriptions may change while a project is still in progress.",
] as const;

export const writingProjects: WritingProject[] = [
  {
    id: "book-of-zantranite",
    title: "The Book of Zantranite",
    titleStatus: "working",
    statusLabel: "Work in progress",
    summary: null,
    featured: true,
    internal: {
      notes:
        "Working title only. No public synopsis yet -- add one here when Bianca is ready to describe the project in her own words. The cover shown on the site is typographic concept artwork, not a final cover.",
      verified: false,
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Music                                                                      */
/* -------------------------------------------------------------------------- */

export const musicIntro = [
  "Some of the writing here turns into music. A piece of prose or a personal experience becomes lyrics, and a song is built around them using AI music tools.",
  "The words and the intent are Bianca's; the arrangement and production are made with those tools. Tracks are shared here as they are finished.",
] as const;

export const musicTracks: MusicTrack[] = [
  {
    id: "suno-ydiidgju40ixmnqz",
    displayTitle: "A Song by Bianca Wind",
    titleStatus: "working",
    platform: "Suno",
    url: "https://suno.com/s/YDIIdGjU40IXMnQZ",
    featured: true,
    internal: {
      notes:
        "Temporary display label supplied for the initial build -- this is not a confirmed official song title. Replace `displayTitle` with the real title and set titleStatus to 'confirmed' once it is known.",
      verified: false,
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Contact                                                                    */
/* -------------------------------------------------------------------------- */

export const contact = {
  heading: "Start a conversation",
  invitation:
    "If you have a genuine question about the writing or the music, or an idea for a creative collaboration, this is the place to send it.",
  /**
   * Public contact address. Leave `null` until a real address exists -- do not
   * invent one. When set, it is shown as a mailto link on the contact page.
   */
  email: null as string | null,
  /** Honest expectation setting. Deliberately promises nothing. */
  note: "Messages are read personally. This is not a paid-services enquiry form, and a reply is not guaranteed.",
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

export function getFeaturedWriting(): WritingProject | undefined {
  return writingProjects.find((project) => project.featured);
}

export function getFeaturedTrack(): MusicTrack | undefined {
  return musicTracks.find((track) => track.featured);
}
