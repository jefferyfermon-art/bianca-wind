# Bianca Wind

The author-and-artist website for Bianca Wind — writing, music, and future
creative projects under one name.

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

## Editing the content

**Almost everything you will want to change lives in one file:
[`src/content/site.ts`](src/content/site.ts).** Brand name and tagline,
navigation, the About text, writing projects, music tracks, social links, and
the contact address are all defined there, and the pages read from it.

Three rules that keep the site honest:

1. **Public fields are rendered; `internal` blocks are not.** Every project and
   track has an `internal` object for private notes and a `verified` flag. It
   is never shown to visitors — use it freely for reminders and open questions.
2. **Leave a field `null` rather than inventing something.** A writing project
   with `summary: null` renders a short "no synopsis yet" line instead of
   invented copy. The same applies to `contact.email` and `brand.url`.
3. **`id` values are stable.** They are used as React keys. Rename a title
   whenever you like, but keep the id.

Titles that are not final carry `titleStatus: "working"`, which is what makes
the "Working title" / "Title to be confirmed" tags appear.

### Things deliberately not on the site

There are no books listed as published, no sales figures, no testimonials, no
press logos, no newsletter signup, and no shop. There are no social links yet —
add real ones to `socialLinks` in `site.ts` and the footer will render them.

## Turning on the contact form

The contact page ships with the form switched **off**, because there is no real
inbox to send to yet. Visitors see a short, honest note instead of a form that
goes nowhere.

To switch it on, set three environment variables — locally in `.env.local`, and
in the Vercel project settings for deployments:

| Variable         | Meaning                                              |
| ---------------- | ---------------------------------------------------- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com)        |
| `CONTACT_INBOX`  | Address that receives messages                       |
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
    about|writing|music|contact|privacy/
    contact/actions.ts  contact form server action
    sitemap.ts robots.ts icon.svg
  components/
    site-header.tsx site-footer.tsx page-header.tsx
    section-heading.tsx content-card.tsx
    nav/     desktop and mobile navigation
    art/     wind-lines.tsx, concept-cover.tsx  (hand-drawn SVG, no images)
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
- The wind artwork is inline SVG, drawn in `art/wind-lines.tsx`. Its drift
  animation is disabled under `prefers-reduced-motion`.
- There is no author portrait and no stock photography anywhere on the site.

### Adding a new writing project

Append to `writingProjects` in `src/content/site.ts`:

```ts
{
  id: "a-stable-id",
  title: "The Title",
  titleStatus: "working",        // or "confirmed"
  statusLabel: "Work in progress",
  summary: null,                 // real copy, or null
  featured: false,               // true puts it on the home page
  internal: { notes: "", verified: false },
}
```

It appears on `/writing` immediately, with a generated concept cover.
