# Bianca Wind

Company website for Bianca Wind, a company building artificial intelligence
software: AI agents, voice agents for music and language training, automation
tools, data analysis tools, and custom AI solutions for individuals and
businesses.

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
| `/`         | Positioning, the five capabilities, how a project runs, who it's for |
| `/services` | Each capability in depth, with anchors (`/services#ai-agents`)    |
| `/about`    | What the company is, how it works, and an honest stage statement  |
| `/contact`  | Enquiry form (see below) and what's useful to include             |
| `/privacy`  | What the website does and does not collect                        |

## Editing the content

**Almost everything you will want to change lives in one file:
[`src/content/site.ts`](src/content/site.ts).** Brand name and tagline,
navigation, company copy, the five capabilities, audiences, process steps,
social links, and the contact address are all defined there, and the pages read
from it.

Three rules that keep the site honest:

1. **Public fields are rendered; `internal` blocks are not.** Every capability
   has an `internal` object for private notes and a `verified` flag. It is never
   shown to visitors. Use it freely for reminders and open questions.
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
as illustrations of what a project *could* involve, on the page itself and not
just in a comment. **When real work exists, do not quietly upgrade those
examples into implied case studies.** Add a proper section for them, with the
client's permission.

The header at the top of `site.ts` restates all of this, so it stays visible to
whoever edits the file next.

## Turning on the contact form

The contact page ships with the form switched **off**, because there is no real
inbox to send to yet. Visitors see a short, honest note instead of a form that
goes nowhere.

To switch it on, set three environment variables, locally in `.env.local` and
in the Vercel project settings for deployments:

| Variable         | Meaning                                              |
| ---------------- | ---------------------------------------------------- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com)        |
| `CONTACT_INBOX`  | Address that receives enquiries                      |
| `CONTACT_FROM`   | Verified sender, e.g. `Bianca Wind <hi@example.com>` |

With all three set, the form renders and submits through a server action
(`src/app/contact/actions.ts`), which validates the input, drops honeypot
submissions, and emails the message. The privacy page also grows a section
describing what the form collects. It only claims that when the form is live.

If you would rather publish an email address than run a form, set
`contact.email` in `site.ts` instead and the page shows a mailto button.

See `.env.example` for a template.

## SMS relay (private)

A pass-through relay for SMS forwarded from an iOS Shortcuts automation. It is
not part of the public site: not linked from the navigation, excluded from
`sitemap.xml`, `noindex`, and behind HTTP Basic Auth.

**Nothing is stored.** No database, no Redis, no file, no in-memory cache, no
browser storage. A message arrives at the webhook, is published straight to
Pusher, and is dropped. The page keeps the current message in React state only,
so reloading clears it and only the latest message is ever held.

| Piece              | Path                  | Protected by                     |
| ------------------ | --------------------- | -------------------------------- |
| Webhook            | `POST /api/sms-webhook` | `X-Webhook-Secret` header      |
| Channel authoriser | `POST /api/pusher-auth` | Basic Auth, via `src/proxy.ts` |
| Live page          | `GET /sms`              | Basic Auth, via `src/proxy.ts` |

Basic Auth lives in `src/proxy.ts`. Note that `middleware.ts` is deprecated in
this version of Next.js and `proxy.ts` is the current convention. It **fails
closed**: if `SMS_PAGE_USER` or `SMS_PAGE_PASSWORD` is missing the relay
returns 503 rather than falling open.

The webhook is deliberately not behind Basic Auth, because a Shortcut posts to
it directly. It authenticates with its own shared secret, compared in constant
time (`src/lib/safe-compare.ts`, which hashes both values first so the
comparison cannot leak the secret's length).

Only `PUSHER_KEY` and `PUSHER_CLUSTER` reach the browser. They are read in the
server component and passed as props, rather than being given `NEXT_PUBLIC_`
names, so the app id and secret cannot leak. The server never logs the shared
secret or any message content.

### Testing the webhook

With the page open in a browser:

```bash
curl -i -X POST https://YOUR-DOMAIN/api/sms-webhook   -H "Content-Type: application/json"   -H "X-Webhook-Secret: $SMS_WEBHOOK_SECRET"   -d '{"from":"+15551234567","body":"Hello from the shortcut"}'
```

Expect `200` and `{"ok":true}`, and the message to appear on `/sms` at once.
`401` means the secret did not match, `400` means the JSON was malformed or a
field was missing, `503` means an environment variable is unset, and `502`
means Pusher rejected the publish.

### A caveat worth knowing

"Nothing is stored" is true of this application. It is not a claim about
Pusher: message content does travel through Pusher's infrastructure, which is
outside our control. If that matters for the messages being forwarded, the
relay needs a different transport.

## Deploying to Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). The defaults
are correct, and no build configuration is needed.

Absolute URLs for metadata, `sitemap.xml`, and `robots.txt` resolve in this
order (see `src/lib/site-url.ts`):

1. `brand.url` in `site.ts` (set this once a custom domain is live)
2. `NEXT_PUBLIC_SITE_URL`
3. `VERCEL_PROJECT_PRODUCTION_URL` (set automatically by Vercel)
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
    art/     wind-lines.tsx, voice-wave.tsx, interface panels
    image-band.tsx        full-bleed photographic band
    ui/      button, card, tag, container, section
  assets/images/        photography + CREDITS.md
  content/site.ts       all editable copy
  lib/                  cn(), site URL, contact config, active-route matching
```

Pages are React Server Components. Only the navigation and the contact form are
client components, because they need interaction.

### Design notes

The palette, fonts, paper texture, and motion are defined as tokens at the top
of [`src/app/globals.css`](src/app/globals.css).

The site is **dark-first**. Colour tokens are semantic, not named after a
colour, so the whole theme can be re-pitched from the one `@theme` block:

| Token    | Role                  | Value     |
| -------- | --------------------- | --------- |
| `canvas` | page background       | `#0B1214` |
| `panel`  | raised surface        | `#162226` |
| `fg`     | primary text          | `#E9EFED` |
| `chalk`  | inverted "spot" panel | `#F4F1EA` |
| `teal`   | primary accent        | `#5FC9BA` |
| `gold`   | secondary accent      | `#DCB673` |

Use `bg-canvas`, `bg-panel`, `text-fg`, `text-fg/70`, `border-fg/10` and so on.
Because the names are semantic, **re-pitching to a light theme is a change to
those six values plus the accents**, not a sweep through every component. The
accents are deliberately bright: they clear 4.5:1 on `canvas`, and a light
theme would need them darkened again.

- Display face is Space Grotesk (`font-display`), set tight at `-0.03em` and
  `-0.04em` for `h1`. Body text is Inter.
- Text sits at `fg/65` or lighter, which is 7.27:1 on `canvas` and 6.63:1 on
  `panel`. There is a lot of headroom in dark mode; the constraint that
  actually bites is text over photography, below.
- `teal` measures 1.76:1 on `chalk`. **Never put a teal link on a chalk panel.**
  Use `text-canvas` there.
- The `.edge` utility draws a teal-to-gold hairline gradient border, the modern
  substitute for a flat 1px line. `.aura` and `.aurora` are accent glows,
  `.glass` is a frosted dark surface.
- `.voice-bar` animates the waveform with CSS only, no JavaScript and no audio.
  Under `prefers-reduced-motion` the bars freeze at their staggered heights, so
  it still reads as a voice trace rather than collapsing flat.
- Artwork is inline SVG and markup in `components/art/`: `wind-lines.tsx` plus
  five interface panels, one per capability.

Text over a photograph is the one place contrast gets tight, because the
background is no longer a flat token. Both background photographs are *light*
images sitting under dark overlays, so the risk is the overlay being too weak.
Measured worst cases: hero `(33,59,59)`, statement band `(14,34,40)`, page
header `(36,43,42)`, all giving 5.35:1 or better at `fg/65`. **If you swap an
image, measure the rendered pixels rather than assuming**. An earlier light
theme failed this check at 3.84:1 and it was not visible by eye.

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
  icon: "agent",                 // agent | voice | automation | analysis | custom
  summary: "One line.",
  body: ["A paragraph.", "Another."],
  examples: ["Illustrative application"],
  featured: true,                // true also shows it on the home page
  internal: { notes: "", verified: false },
}
```

It appears on `/services` with its own anchor, and in the home page grid. To add
a new `icon` key, extend `IconKey` in `site.ts` and the map in
`src/components/capability-icon.tsx`. TypeScript will flag the missing entry.
