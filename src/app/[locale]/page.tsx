import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { creatorData } from "@/lib/data";
import { adminSurfaces } from "@/core/admin/surfaces";
import { fetchLandingProjects } from "@/core/application/services/project.service";

type DiagnosticId = "robots" | "i18n" | "themes" | "actions";

const DIAGNOSTIC_ITEMS: DiagnosticId[] = ["robots", "i18n", "themes", "actions"];

const QUICK_LINKS = [
  { key: "github", href: creatorData.githubUrl, external: true },
  { key: "nest", href: "http://localhost:3001", external: true },
  { key: "profile", href: "https://dev.desarrollador.tech", external: true },
];

interface AdminHomeProps {
  params: { locale: string };
}

export default async function AdminHome({ params }: AdminHomeProps) {
  const t = await getTranslations("admin");
  const projects = await fetchLandingProjects(params?.locale);

  return (
    <main className="admin-shell relative isolate min-h-dvh overflow-hidden bg-background text-foreground">
      <div
        className="admin-shell__glow pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(120% 120% at 50% 0%, hsl(var(--primary)) 0%, transparent 55%)",
        }}
      />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16">
        <section className="admin-hero space-y-6 text-center" aria-labelledby="admin-hero-title">
          <p className="admin-hero-badge inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t("hero.badge")}
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          </p>
          <div className="space-y-4">
            <h1 id="admin-hero-title" className="text-4xl font-semibold leading-tight md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">{t("hero.subtitle")}</p>
            <p className="text-base text-muted-foreground/80">{t("hero.description")}</p>
          </div>
          <div className="admin-hero-actions flex flex-wrap items-center justify-center gap-4">
            <Button className="admin-cta" size="lg">
              {t("hero.primary")}
            </Button>
            <Button variant="outline" size="lg" className="admin-cta__secondary border-border/50 text-foreground">
              {t("hero.secondary")}
            </Button>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("hero.sync")}
            </span>
          </div>
        </section>

        <section className="admin-status-grid grid gap-6 md:grid-cols-3" aria-labelledby="admin-status-title">
          <div className="md:col-span-3 text-left">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{t("status.badge")}</p>
            <h2 id="admin-status-title" className="text-2xl font-semibold text-foreground">
              {t("status.title")}
            </h2>
            <p className="text-muted-foreground">{t("status.description")}</p>
          </div>
          {adminSurfaces.map((surface) => (
            <Card key={surface.id} className="admin-card border-border/30 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-foreground">
                  <span>{t(`status.items.${surface.id}.label`)}</span>
                  <span className="text-xs font-normal text-muted-foreground">{surface.endpoint}</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t(`status.items.${surface.id}.detail`)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="rounded-full bg-primary/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-primary-foreground">
                  {t(`status.states.${surface.state}`)}
                </span>
                <span className="text-xs text-muted-foreground">{t("status.realtime")}</span>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="admin-diagnostics grid gap-4 md:grid-cols-2" aria-labelledby="admin-diagnostics-title">
          <div className="md:col-span-2 text-left">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{t("diagnostics.badge")}</p>
            <h2 id="admin-diagnostics-title" className="text-2xl font-semibold text-foreground">
              {t("diagnostics.title")}
            </h2>
            <p className="text-muted-foreground">{t("diagnostics.description")}</p>
          </div>
          {DIAGNOSTIC_ITEMS.map((item) => (
            <Card key={item} className="admin-diagnostic border-border/20 bg-card/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-foreground">{t(`diagnostics.items.${item}.title`)}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t(`diagnostics.items.${item}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm text-foreground/90">
                <span>{t(`diagnostics.items.${item}.status`)}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-label="ok" />
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="admin-projects space-y-6" aria-labelledby="admin-projects-title">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{t("projects.badge")}</p>
            <h2 id="admin-projects-title" className="text-2xl font-semibold text-foreground">
              {t("projects.title")}
            </h2>
            <p className="text-muted-foreground">{t("projects.description")}</p>
          </div>
          {projects.length === 0 ? (
            <div className="rounded-xl border border-border/40 bg-card/30 px-6 py-8 text-sm text-muted-foreground">
              {t("projects.empty")}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <Card key={project.id} className="admin-project border-border/30 bg-card/40 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">{project.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{project.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    {project.keys.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-foreground/70">
                          {t("projects.keysLabel")}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {project.keys.slice(0, 3).map((keyTitle, index) => (
                            <li key={`${project.id}-key-${index}`} className="text-foreground/80">
                              {keyTitle}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.techBadges.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-foreground/70">
                          {t("projects.techsLabel")}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.techBadges.slice(0, 6).map((badge, index) => (
                            <span
                              key={`${project.id}-tech-${index}`}
                              className="rounded-full border border-border/40 px-3 py-1 text-xs text-foreground/80"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section className="admin-actions space-y-6" aria-labelledby="admin-actions-title">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{t("actions.badge")}</p>
            <h2 id="admin-actions-title" className="text-2xl font-semibold text-foreground">
              {t("actions.title")}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="admin-action-link rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
              >
                {t(`actions.links.${link.key}`)}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
