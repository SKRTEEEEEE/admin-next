# Resumen de sesión Droid
## Ctx
Hola droid, fijate en mi carpeta/proyecto en ./admin-next, si te fijas este es una copia de agora-next/profile-next. La question de este proyecto esque estoy migrando de un frontend/backend nextjs (profile-page), a una estructura de backend monolitico (profile-nest) y frontends micro (admin, profile, agora). 
- Mas info en [./docs/reports/microservices-architecture-analysis.md](../../docs/reports/microservices-architecture-analysis.md) and [./docs/structure-concepts.md](../../docs/structure-concepts.md)
- `admin-next` = template base para nuevos micro-frontend
- En el issue de ahora, debes centrarte en la parte de admin-next, para crear el **template definitivo para los nuevos micro-frontend de este proyecto**
- Ha de haver una pagina raiz, donde diga admin page pero tenga todos las clases de test(no eliminar ninguna carpeta) y test adaptados a esta nueva pagina, que tenga el fondo gradiente cambiante, y que mantenga las funcionalidades de robots.txt, shadcnui, i18n, github-actions, etc... Puedes ir pidiendo feedback ya que estare atento

- Tienes un reporte de los test actuales en http://localhost:9323/ y en los reportes (recien ejecutados)
- Tienes un servidor del backend corriendo en :3001
- Tienes un servidor del frontend (`admin-next`) en :3000
## Objetivo
Aconseguir un buen template para next.js centrado en test rápido y muy completo. Para ello 
## Key points
- De momento mantendremos los test que están funcionando de `playwright` y se harán de nuevo en `vitest` si es necesario y posible
- [ ] Utilizaremos `vitest` para los test regulares 
- [ ] Un enfoque mejor para `playwright` de forma que:
  - no tarde mucho 
  - no consuma tantos recursos en el pc. 
- [ ] Refactor or delete tests que no están funcionando

### Failed test
```bash
 5 failed
    [e2e] › tests\e2e\performance\gradients-page.spec.ts:66:7 › E2E Performance - Gradients Page › Gradients page loads successfully
    [e2e] › tests\e2e\performance\homepage.spec.ts:66:7 › Next.js Performance + JS Coverage › Home page loads successfully
    [e2e] › tests\e2e\performance\info-page.spec.ts:66:7 › E2E Performance - Info Page › Homepage loads successfully
    [performance] › tests\performance\bundle-budgets.spec.ts:4:7 › Performance - Bundle Budgets › Homepage loads with reasonable bundle size
    [performance] › tests\performance\web-vitals-pure.spec.ts:4:7 › Performance - Web Vitals (Pure Load) › Homepage loads with basic vitals
  6 flaky
    [pages] › tests\pages\portafolio.spec.ts:4:7 › Admin root localized › Catalan locale loads successfully
    [integration] › tests\integration\accessibility.spec.ts:4:7 › Accessibility smoke tests › page loads with correct locale
    [integration] › tests\integration\pages\proyectos-id.spec.ts:4:7 › Locale routing › /es route loads successfully
    [integration] › tests\integration\seo-metadata-enhanced.spec.ts:4:7 › Enhanced SEO metadata › page loads successfully
    [integration] › tests\integration\seo-metadata.spec.ts:4:7 › SEO metadata for admin page › page loads successfully
    [integration] › tests\integration\usecases.spec.ts:4:7 › Admin status use cases › page loads successfully
  1 skipped
```