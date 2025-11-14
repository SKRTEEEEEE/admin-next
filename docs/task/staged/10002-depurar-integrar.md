# Depurar e integrar 'log ui'
## Contexto
Ahora mismo me encuentro en el proceso de migracion/creacion de mi template para mis micro-frontends, la idea esque tengo todas las funcionalidades compartidas (navbar-inicio sesion-stylos-etc..) en una 'libreria' (que realmente es solo un submodule de github) en ./log-ui-ts. Esta carpeta esta inspirada en ../agora-next, que es un micro-frontend ya desarrollado(completamente migrado).
- La app consume un backend que esta corriendo en el servidor :3001
- La app esta corriendo con un servidor en modo watch/dev en el puerto :3000
## Key points
1. [ ] Depurar error de uso de libreria i18n
2. [ ] Integrar navbar de ./log-ui, tal como esta en ../agora-next

## Error Actual
```
Laptop@DESKTOP-98ULTRB MINGW64 ~/code/profile-migration/admin-next (11-second-template)
$ npm run dev

> admin-next@0.0.1 dev
> next dev --turbopack

   ▲ Next.js 16.0.0 (Turbopack)
   - Local:        http://localhost:3000
   - Network:      http://100.85.85.67:3000
   - Experiments (use with caution):
     · optimizePackageImports

 ✓ Starting...
 ✓ Ready in 2.7s
 ○ Compiling /[locale] ...
Error: Route "/[locale]" used `params.locale`. `params` is a Promise and must be unwrapped with `await` or `React.use()` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    at AdminHome (src\app\[locale]\page.tsx:25:47)
  23 | export default async function AdminHome({ params }: AdminHomeProps) {
  24 |   const t = await getTranslations("admin");
> 25 |   const projects = await fetchLandingProjects(params?.locale);
     |                                               ^
  26 |
  27 |   return (
  28 |     <main className="admin-shell relative isolate min-h-dvh overflow-hidden bg-background text-foreground">
 GET /es 200 in 8.9s (compile: 7.2s, proxy.ts: 23ms, render: 1656ms)
```