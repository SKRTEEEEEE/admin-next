"use client";

import { ThemePopover } from "@/components/theme-popover";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { ListItem } from "./list-item";

const siteConfig = {
  name: "Admin Control",
  description: "Micro frontends orchestrator",
  links: {
    github: "https://github.com/SKRTEEEEEE",
    twitter: "https://twitter.com/SKRTEEEEEE",
  },
};

const appLinks = [
  {
    href: "/gradients",
    title: "Gradients",
    description: "Plantillas con fondos animados listos para testear.",
  },
  {
    href: "https://agora.desarrollador.tech",
    title: "Agora",
    description: "Marketplace público para workshops y experiencias.",
  },
  {
    href: "https://profile.desarrollador.tech",
    title: "Profile",
    description: "Landing corporativa con SEO listo y contenido dinámico.",
  },
];

export function Navbar() {
  const Logo = Icons.logo;

  return (
    <header className="admin-navbar sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/" className="admin-navbar__brand flex items-center space-x-2 text-sm font-semibold">
            <Logo className="h-5 w-5" />
            <span>{siteConfig.name}</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs uppercase tracking-[0.3em]">
                  Apps
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[420px] lg:w-[500px] lg:grid-cols-[.75fr,1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden"
                        >
                          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Micro-admin</p>
                          <div className="mt-4 text-lg font-medium">Panel operativo</div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Gestiona status, diagnósticos y accesos compartidos.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {appLinks.map((item) => (
                      <ListItem key={item.title} href={item.href} title={item.title}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/gradients"
            className="admin-navbar__link hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-block"
          >
            Gradients
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "admin-navbar__link hidden md:inline-flex")}
          >
            <Icons.gitHub className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "admin-navbar__link hidden md:inline-flex")}
          >
            <Icons.twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </a>
          <ThemePopover />
        </div>
      </div>
    </header>
  );
}
