# Resumen de sesión Droid

## Prompt original
Hola droid, fijate en mi carpeta/proyecto en ./admin-next, si te fijas este es una copia de
   profile-next. La question de este proyecto esque estoy migrando de un frontend/backend nextjs
   (profile-page), a una estructura de backend monolitico (profile-nest) y frontends micro (admin,
   profile, agora). - En el issue de ahora, debes centrarte en la parte de admin-next, ya que ahora tiene
    muchas partes del proyecto que se ha copiado original, sobretodo muchos test que no aportaran nada al
    proyecto. Empieza por limpiar todos estos test y dejar una sola pagina raiz, donde diga admin page
   pero tenga todos las clases de test(no eliminar ninguna carpeta) y test adaptados a esta nueva pagina,
    que tenga el fondo gradiente cambiante, y que mantenga las funcionalidades de robots.txt, shadcnui,
   i18n, github-actions, etc... pero elimina el resto de librerias como por ejemplo particles-ts. Puedes
   ir pidiendo feedback ya que estare atento

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
