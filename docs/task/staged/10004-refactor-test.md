# Refactor test
## Objetivo
Terminar correctamente los test para el nuevo enfoque
## Contexto
Tienes un servidor de backend en :3001, y una no del frontend :3000. Por lo que puedes ejecutar test que requieren servidor sin problema (npm run test --individuales)
- No ejecutes npm run test 'completo', ya que este tarda casi 20/30 mins
- Tambien puedes fijarte en los ./docs/test-result para ver la ultima ejecucción
## Key points
- [ ] Asegurar-se que pasan todos los test, se pueden eliminar los mas conflictivos y bajar el coverage para empezar
- [ ] Mejorar el tiempo de ejecucción de los test
- Ahora mismo no es importante que pase lighthouse CI, o podemos relajar las reglas si el problema es solo ese
- Ahora mismo no es importante tener mucho test, sino uno como minimo por carpeta, el resto que esten dando problemas los puedes eliminar
- Tienes acceso al MCP de playwright
## Test que no pasan - antes de cambios

```bash
  24 failed
    [component] › tests\component\admin-components.spec.ts:5:7 › Admin diagnostics › renders the diagnostics cards
    [component] › tests\component\admin-components.spec.ts:11:7 › Admin diagnostics › quick links navigate to the right destinations
    [component] › tests\component\admin-hero.spec.ts:5:7 › Admin hero composition › renders badge, title and description
    [component] › tests\component\admin-hero.spec.ts:14:7 › Admin hero composition › shows both primary actions
    [component] › tests\component\admin-theming.spec.ts:5:7 › Admin theming › renders a static glow background
    [component] › tests\component\admin-theming.spec.ts:11:7 › Admin theming › theme selector syncs the html data attribute
    [component] › tests\component\mode-toggle.spec.ts:5:7 › Theme popover › lists palette presets for both modes
    [component] › tests\component\mode-toggle.spec.ts:18:7 › Theme popover › writes the selected preset in the html data-theme attribute
    [component] › tests\component\navbar.spec.ts:5:7 › Admin navbar › exposes brand, apps trigger and gradient link
    [component] › tests\component\navbar.spec.ts:14:7 › Admin navbar › shows external icons and theme popover
    [pages] › tests\pages\portafolio.spec.ts:4:7 › Admin root localized › Catalan locale uses translated text
    [pages] › tests\pages\portafolio.spec.ts:10:7 › Admin root localized › German locale keeps diagnostics visible
    [integration] › tests\integration\accessibility.spec.ts:7:9 › Accessibility smoke tests › main landmarks for es
    [integration] › tests\integration\accessibility.spec.ts:7:9 › Accessibility smoke tests › main landmarks for en
    [integration] › tests\integration\accessibility.spec.ts:7:9 › Accessibility smoke tests › main landmarks for ca
    [integration] › tests\integration\accessibility.spec.ts:7:9 › Accessibility smoke tests › main landmarks for de
    [integration] › tests\integration\accessibility.spec.ts:16:7 › Accessibility smoke tests › theme popover is keyboard accessible
    [e2e] › tests\e2e\performance\gradients-page.spec.ts:66:7 › E2E Performance - Gradients Page › Gradients page metrics with theme switching
    [e2e] › tests\e2e\performance\homepage.spec.ts:66:7 › Next.js Performance + JS Coverage › Home page metrics and coverage
    [performance] › tests\performance\bundle-budgets.spec.ts:11:9 › Performance - Bundle Budgets › Homepage (ES) - Resource size budgets
    [performance] › tests\performance\bundle-budgets.spec.ts:11:9 › Performance - Bundle Budgets › Info Page (EN) - Resource size budgets
    [performance] › tests\performance\bundle-budgets.spec.ts:11:9 › Performance - Bundle Budgets › Gradients (DE) - Resource size budgets
    [performance] › tests\performance\bundle-budgets.spec.ts:77:7 › Performance - Bundle Budgets › Main bundle chunks are optimized
    [performance] › tests\performance\lighthouse-ci.spec.ts:10:7 › Performance - Lighthouse CI › Run Lighthouse CI and validate thresholds
  9 flaky
    [component] › tests\component\slider-techs.spec.ts:5:7 › Status cards › render three micro frontend cards
    [integration] › tests\integration\pages\proyectos-id.spec.ts:7:9 › Locale routing › /es responds with hero
    [integration] › tests\integration\pages\proyectos-id.spec.ts:7:9 › Locale routing › /de responds with hero
    [integration] › tests\integration\seo-metadata-enhanced.spec.ts:4:7 › Enhanced SEO metadata › keywords include Barcelona references
    [integration] › tests\integration\seo-metadata.spec.ts:7:9 › SEO metadata for admin page › has title and description for es
    [integration] › tests\integration\seo-metadata.spec.ts:15:9 › SEO metadata for admin page › exposes Open Graph tags for en
    [integration] › tests\integration\usecases.spec.ts:4:7 › Admin status use cases › UI consumes the status snapshot
    [e2e] › tests\e2e\performance\info-page.spec.ts:66:7 › E2E Performance - Info Page › Info page metrics with scroll interaction
    [performance] › tests\performance\web-vitals-pure.spec.ts:11:9 › Performance - Web Vitals (Pure Load) › Info Page (EN) - Core Web Vitals without interaction
  87 passed (14.2m)
```
## Test de npm run test:server que no pasan - despues de los ultimos cambios
```bash
 19 failed
    [component] › tests\component\admin-components.spec.ts:4:7 › Admin diagnostics › renders the diagnostics cards
    [component] › tests\component\admin-components.spec.ts:10:7 › Admin diagnostics › quick links navigate to the right destinations
    [component] › tests\component\admin-hero.spec.ts:4:7 › Admin hero composition › renders badge, title and description
    [component] › tests\component\admin-hero.spec.ts:13:7 › Admin hero composition › shows both primary actions
    [component] › tests\component\admin-theming.spec.ts:4:7 › Admin theming › renders a static glow background
    [component] › tests\component\admin-theming.spec.ts:10:7 › Admin theming › theme selector syncs the html data attribute
    [component] › tests\component\mode-toggle.spec.ts:4:7 › Theme popover › lists palette presets for both modes
    [component] › tests\component\mode-toggle.spec.ts:20:7 › Theme popover › writes the selected preset in the html data-theme attribute
    [component] › tests\component\navbar.spec.ts:4:7 › Admin navbar › exposes navigation elements and links
    [component] › tests\component\navbar.spec.ts:14:7 › Admin navbar › shows external icons and theme popover
    [pages] › tests\pages\info.spec.ts:4:7 › Admin root page › renders hero text in Spanish locale ─
    [pages] › tests\pages\info.spec.ts:10:7 › Admin root page › shows quick action links ───────────
    [pages] › tests\pages\portafolio.spec.ts:4:7 › Admin root localized › Catalan locale uses translated text
    [integration] › tests\integration\accessibility.spec.ts:7:9 › Accessibility smoke tests › main landmarks for es
    [integration] › tests\integration\accessibility.spec.ts:18:7 › Accessibility smoke tests › theme popover is keyboard accessible
    [integration] › tests\integration\pages\proyectos-id.spec.ts:7:9 › Locale routing › /es responds with hero
    [integration] › tests\integration\seo-metadata-enhanced.spec.ts:4:7 › Enhanced SEO metadata › keywords include Barcelona references
    [integration] › tests\integration\seo-metadata.spec.ts:7:9 › SEO metadata for admin page › has title and description for es
    [integration] › tests\integration\usecases.spec.ts:4:7 › Admin status use cases › UI consumes the status snapshot
  2 flaky
    [integration] › tests\integration\accessibility.spec.ts:7:9 › Accessibility smoke tests › main landmarks for en
    [integration] › tests\integration\seo-metadata-enhanced.spec.ts:10:7 › Enhanced SEO metadata › structured data scripts are present

```