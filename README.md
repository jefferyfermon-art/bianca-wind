# Bianca Wind

Company website for Bianca Wind — artificial intelligence software: AI agents,
automation tools, data analysis tools, and custom AI solutions for individuals
and businesses.

Built with Next.js (App Router), TypeScript, and Tailwind CSS, and deployed on
Vercel.

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

```bash
npm run build   # production build
npm start       # serve the production build
npx eslint .    # lint
```

## Pages

| Route       | Purpose                                                           |
| ----------- | ----------------------------------------------------------------- |
| `/`         | Positioning, the four capabilities, how a project runs, who it's for |
| `/services` | Each capability in depth, with anchors (`/services#ai-agents`)    |
| `/about`    | What the company is, how it works, and an honest stage statement  |
| `/contact`  | Enquiry form (see below) and what's useful to include             |
| `/privacy`  | What the website does and does not collect                        |

## Editing the content

**Almost everything you will want to change lives in one file:
[`src/content/site.ts`](src/content/site.ts).** Brand name and tagline,
navigation, company copy, the four capabilities, audiences, process steps,
social links, and the contact address are all defined there, and the pages read
from it.

Three rules that keep the site honest:

1. **Public fields are rendered; `internal` blocks are not.** Every capability
   has an `internal` object for private notes and a `verified` flag. It is never
   shown to visitors — use it freely for reminders and open questions.
2. **Leave a field `null` rather than inventing something.** That applies to
   `contact.email` and `brand.url`.
3. **`id` values are stable.** They are React keys *and* anchor targets, so
   `/services#ai-agents` breaks if you rename an id. Rename the `name` freely.

### What this site deliberately does not claim

No client names or logos, no testimonials, no case studies, no customer or
revenue numbers, no performance statistics, no pricing, no team biographies or
credentials, no funding, no certifications, no delivery timelines, and no
response-time or uptime promises.

This is a young company, and a site that claims otherwise is both dishonest and
easy to see through. The `examples` on each capability are explicitly labelled
as illustrations of what a project *could* involve — on the page itself, not
just in a comment. **When real work exists, do not quietly upgrade those
examples into implied case studies.** Add a proper section for them, with the
client's permission.

The header at the top of `site.ts` restates all of this, so it stays visible to
whoever edits the file next.

## Turning on the contact form

The contact page ships with the form switched **off**, because there is no real
inbox to send to yet. Visitors see a short, honest note instead of a form that
goes nowhere.

To switch it on, set three environment variables — locally in `.env.local`, and
in the Vercel project settings for deployments:

| Variable         | Meaning                                              |
| ---------------- | ---------------------------------------------------- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com)        |
| `CONTACT_INBOX`  | Address that receives enquiries                      |
| `CONTACT_FROM`   | Verified sender, e.g. `Bianca Wind <hi@example.com>` |

With all three set, the form renders and submits through a server action
(`src/app/contact/actions.ts`), which validates the input, drops honeypot
submissions, and emails the message. The privacy page also grows a section
describing what the form collects — it only claims that when the form is live.

If you would rather publish an email address than run a form, set
`contact.email` in `site.ts` instead and the page shows a mailto button.

See `.env.example` for a template.

## Deploying to Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). The defaults
are correct — no build configuration needed.

Absolute URLs for metadata, `sitemap.xml`, and `robots.txt` resolve in this
order (see `src/lib/site-url.ts`):

1. `brand.url` in `site.ts` — set this once a custom domain is live
2. `NEXT_PUBLIC_SITE_URL`
3. `VERCEL_PROJECT_PRODUCTION_URL` — set automatically by Vercel
4. `http://localhost:3000`

So deployments work with no configuration, and pointing a custom domain at the
site is a one-line change in `site.ts`.

## Project structure

```
src/
  app/
    layout.tsx          root layout, fonts, metadata, header/footer
    page.tsx            home
    services|about|contact|privacy/
    contact/actions.ts  contact form server action
    sitemap.ts robots.ts icon.svg
  components/
    site-header.tsx site-footer.tsx page-header.tsx
    section-heading.tsx capability-card.tsx capability-icon.tsx
    nav/     desktop and mobile navigation
    art/     wind-lines.tsx  (hand-drawn SVG, no images)
    ui/      button, card, tag, container, section
  content/site.ts       all editable copy
  lib/                  cn(), site URL, contact config, active-route matching
```

Pages are React Server Components. Only the navigation and the contact form are
client components, because they need interaction.

### Design notes

The palette, fonts, paper texture, and motion are defined as tokens at the top
of [`src/app/globals.css`](src/app/globals.css).

- Ivory `#F7F3EC`, ink `#17252A`, teal `#406B70`, mist `#E5ECE9`, gold `#A88750`
- Gold is decorative only — rules, dots, frames. It is never used for text: at
  3.04:1 on ivory it would fail contrast requirements.
- Body text sits at `ink/70` or darker, which clears WCAG AA (4.5:1) on both
  ivory and mist.
- The artwork is inline SVG, drawn in `art/wind-lines.tsx`. Its drift animation
  is disabled under `prefers-reduced-motion`.
- No stock photography anywhere on the site.

Overriding a button's colours? Go through `cn()`:
`cn(buttonVariants({ variant: "inverse" }), "mt-9")`. Passing `className` inside
`buttonVariants({ … })` concatenates rather than merges, which leaves two
conflicting Tailwind colour classes on the element and lets source order pick
the winner.

### Adding a capability

Append to `capabilities` in `src/content/site.ts`:

```ts
{
  id: "a-stable-id",
  name: "The name",
  icon: "agent",                 // agent | automation | analysis | custom
  summary: "One line.",
  body: ["A paragraph.", "Another."],
  examples: ["Illustrative application"],
  featured: true,                // true also shows it on the home page
  internal: { notes: "", verified: false },
}
```

It appears on `/services` with its own anchor, and in the home page grid. To add
a new `icon` key, extend `IconKey` in `site.ts` and the map in
`src/components/capability-icon.tsx` — TypeScript will flag the missing entry.
