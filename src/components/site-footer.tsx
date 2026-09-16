import Link from "next/link";

import { Container } from "@/components/ui/container";
import { brand, footerNav, socialLinks } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-mist/40">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="font-serif text-xl text-ink">
              {brand.name}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              {brand.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3 md:flex md:flex-wrap md:items-center md:gap-x-8">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink/65 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {socialLinks.length > 0 ? (
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {socialLinks.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink/65 transition-colors hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink/70">
            &copy; {year} {brand.name}. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="text-xs text-ink/70 transition-colors hover:text-ink"
          >
            Privacy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
