"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/content/site";
import { isActiveRoute } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-8">
        {mainNav.map((item) => {
          const active = isActiveRoute(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm transition-colors duration-200",
                  active
                    ? "text-ink"
                    : "text-ink/70 hover:text-ink",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left bg-gold transition-transform duration-200",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
