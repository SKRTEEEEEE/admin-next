# To Do
## Key points
- [ ] Actualizar documentación
  - [ ] Sobretodo: test.md, README.md
  - ¿Eliminar? droid-resumen.md
- [ ] Comprobar test
  - Mirar/cambiar nombres de test
  - Mejorar test (para que comprueben lo que les toca por cat)
- [ ] Añadir LICENSE.md
- [ ] Añadir los otros apartador 'default' de Github
- [ ] Mejorar scripts
  - Actualmente están todos por ahi sueltos
  - Buscar un enfoque de carpetas en scripts, donde en la raíz haya un padre que los llame
- [ ] Mejorar archivos config
  - [ ] Agrupar los que no se usen de normal, fuera de la raíz
- [ ] PARA TERMINAR: crear AGENTS.md perfecto, con foque 'template' (para terminar una vez se copie el template)
### README.md
Cosas min
- ENV VAR
- Banner with shield.io + minimalist desc
- Caracteristicas ppales
- Stack
- ¿Scripts?
- Enlace a test.md
- Estructura
- Sistema temas + log-ui-ts + etc..

### test.md
- [ ] Definir que hace cada cat
- [ ] Flujo recomendado (ahora esta en README.md)
- Hay que reducir el TEST.md actual

---
# droid-resumen
## Proceso seguido
- Reemplacé los contenidos `ceo.json` por `admin.json` en todos los locales y actualicé el loader i18n para servir sólo el nuevo template.
- Añadí los seis presets de temas (`light/dark/neon/emerald/sunset/terminal`), expuse el selector en `ModeToggle` y actualicé los tests component/pages.
- Simplifiqué el routing/i18n (solo `/` y `/gradients`), ajusté `manageRoot` para redirigir a la landing admin y mantuve robots/sitemap.
- Actualicé AGENTS.md y README.md para describir el blueprint; dejé un mínimo de pruebas por carpeta y añadí `tests/component/admin-components.spec.ts`.
- Ejecuté `npm run lint`, `npm run test:unit`, `npm run build`, arranqué `npm run start` + `npx wait-on` y luego `npm run test:server` (todo en verde).

## Estado actual
- Lint, unit/api y server tests pasan tras levantar `npm run start` y ejecutar `npm run test:server` con `wait-on`.
- La landing admin (`/[locale]`) ya contiene hero, status grid, diagnósticos y quick links con contenido traducible en `admin.json`.
- Los tests tienen al menos un ejemplo por carpeta; `tests/component/*` usan los nuevos selectores `.admin-*` y el API test consume `app/api/admin/status`.


## Key points
- Cambia toda referencia a ceo, ya que esto se refería a antiguos componentes del apartado 'profile', el cual ahora sera otro micro-frontend -> cambia toda referencia de 'ceo' a 'admin', si acaso, aunque es redundante ya que ahora es un micro-frontend
- Recuerda que hay muchos test/código, heredado de la copia que hemos hecho de ./profile-page, recuerda eliminar estas partes
- Para el navbar, has de inspirar-te en ./agora-next o ./profile-page(el apartado de /admin y /academia)
- Para los seis tipos de estilos(next-themes), has de inspirar-te en ./agora-next o ./profile-page(el apartado de /admin y /academia)
- Tienes un servidor levantado en modo dev, en el puerto :3000
- [ ] Crear un template funcional, con Next, Shadcn/ui, Github Actions (actuales), i18n, next-themes(6 tipos), SEO focus, fondos gradients variables(no obligatorio)
- [ ] Asegurarte de que los test pasen y de que haya como mínimo un test de ejemplo en cada carpeta.
- [ ] Intentar mantener el mínimo de librerías para este ejemplo (preguntar las librerías que vas a eliminar)
- [ ] Asegura-te de tener el mismo Navbar que en ./agora-next (pero sin la funcionalidad de iniciar sesión, por ahora)
- [ ] Asegura-te de tener los mismos estilos(next-themes), que ./agora-next
- [x] Optimizar el AGENTS.md 'de cero' para este template
- [x] Optimizar el README.md 'de cero' para este template