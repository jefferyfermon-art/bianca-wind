"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { mainNav } from "@/content/site";
import { isActiveRoute } from "@/lib/nav";
import { cn } from "@/lib/utils";

const PANEL_ID = "mobile-nav-panel";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever navigation completes, including on back/forward.
  // Adjusting state during render avoids a second render pass.
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex size-10 items-center justify-center rounded-md text-fg transition-colors hover:bg-panel/70"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      <div
        id={PANEL_ID}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-fg/10 bg-canvas shadow-[0_22px_50px_-28px_rgba(0,0,0,0.8)]"
      >
        <nav aria-label="Main" className="px-6 py-4 sm:px-8">
          <ul className="flex flex-col">
            {mainNav.map((item) => {
              const active = isActiveRoute(pathname, item.href);

              return (
                <li key={item.href} className="border-b border-fg/8 last:border-b-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 py-3.5 font-display text-xl transition-colors",
                      active ? "text-fg" : "text-fg/65",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-px w-5 transition-colors",
                        active ? "bg-gold" : "bg-fg/20",
                      )}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
