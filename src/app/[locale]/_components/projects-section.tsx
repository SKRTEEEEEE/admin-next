import { getProjectsForLandingUC } from "@/core/application/usecases/entities/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { analyzeError } from "@log-ui/lib/error-serialization";
import { SectionFallbackProvider } from "@log-ui/components/section-fallback-provider";

type ProjectsSectionProps = {
  locale: string;
};
async function ProjectSectionSkeleton () {
  const t = await getTranslations("admin");
  return (
        <div className="rounded-xl border border-border/40 bg-card/30 px-6 py-8 text-sm text-muted-foreground">
          {t("projects.empty")}
        </div>
      );
}

/**
 * Server Component que obtiene proyectos del backend
 * Maneja errores mostrando toast + fallback (no rompe la UI)
 */
export async function ProjectsSection({ locale }: ProjectsSectionProps) {
  const t = await getTranslations("admin");
  
  try {
    const projects = await getProjectsForLandingUC(locale);
    
    // Si no hay proyectos (pero no hubo error), mostrar empty state sin toast
    if (projects.length === 0) {
      return (
        <ProjectSectionSkeleton/>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
        <Card
          key={project.id}
          className="admin-project border-border/30 bg-card/40 backdrop-blur"
        >
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              {project.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {project.summary}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            {project.keys.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/70">
                  {t("projects.keysLabel")}
                </p>
                <ul className="mt-2 space-y-1">
                  {project.keys.slice(0, 3).map((keyTitle, index) => (
                    <li
                      key={`${project.id}-key-${index}`}
                      className="text-foreground/80"
                    >
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
                  {project.techBadges
                    .slice(0, 6)
                    .map((badge, index) => (
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
    );
  } catch (error) {
    // analyzeError lanza si: no es DomainError o friendlyDesc === undefined
    // Override del título para contexto específico
    const serializedError = analyzeError(
      error,
      {
        es: "Ups, Error cargando proyectos",
        en: "Ups, Error loading projects",
        ca: "Ups, Error carregant projectes",
        de: "Ups, Fehler beim Laden der Projekte"
      }
    );
    
    // Si description === 'd' → Silencioso (solo empty state, sin toast)
    if (serializedError.description.es === 'd') {
      return (
        <ProjectSectionSkeleton/>
      );
    }
    
    // Fallback con toast + empty state usando SectionFallbackProvider
    return (
      <SectionFallbackProvider error={serializedError}>
        <ProjectSectionSkeleton/>
      </SectionFallbackProvider>
    );
  }
}

/**
 * Skeleton de la grid de proyectos (3 cards con animación pulse)
 */
export function ProjectsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className="admin-project border-border/30 bg-card/40 backdrop-blur"
        >
          <CardHeader>
            <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="h-3 w-16 bg-muted animate-pulse rounded" />
              <div className="mt-2 space-y-1">
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
              </div>
            </div>
            <div>
              <div className="h-3 w-20 bg-muted animate-pulse rounded" />
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
                <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
                <div className="h-6 w-14 bg-muted animate-pulse rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
