import Link from "next/link";

import { DesktopNav } from "@/components/nav/desktop-nav";
import { MobileNav } from "@/components/nav/mobile-nav";
import { Container } from "@/components/ui/container";
import { brand } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-ivory/85 backdrop-blur-md">
      <Container className="relative flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.02em] text-ink sm:text-[1.375rem]"
        >
          {brand.name}
        </Link>

        <DesktopNav />
        <MobileNav />
      </Container>
    </header>
  );
}
