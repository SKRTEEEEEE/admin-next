"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale: string;
}

const NAV_LINKS = [
  { key: "admin", label: "Admin", href: (locale: string) => `/${locale}` },
  {
    key: "profile",
    label: "Profile",
    href: () => "https://profile.desarrollador.tech",
    external: true,
  },
  {
    key: "agora",
    label: "Agora",
    href: () => "https://agora.desarrollador.tech",
    external: true,
  },
];

export function Navbar({ locale }: NavbarProps) {
  return (
    <nav className="admin-navbar flex w-full max-w-6xl items-center justify-between px-4 py-2 text-sm font-semibold">
      <div className="admin-navbar__brand flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
        <span>micro-admin</span>
      </div>

      <div className="admin-navbar__links flex items-center gap-3">
        {NAV_LINKS.map((link) => {
          const href = link.href(locale);
          const isActive = link.key === "admin";

          if (link.external) {
            return (
              <a
                key={link.key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "admin-navbar__link rounded-full px-3 py-1 text-white/70 transition-colors hover:text-white",
                  isActive && "bg-white/10 text-white"
                )}
              >
                {link.label}
              </a>
            );
          }

          return (
            <Link
              key={link.key}
              href={href}
              locale={locale}
              className={cn(
                "admin-navbar__link rounded-full px-3 py-1 transition-colors",
                isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="admin-navbar__toggle ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
