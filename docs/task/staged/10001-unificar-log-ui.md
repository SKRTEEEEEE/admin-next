# Unificar log ui
## Contexto
Ahora mismo me encuentro en el proceso de migracion/creacion de mi template para mis micro-frontends, la idea esque tengo todas las funcionalidades compartidas (navbar-inicio sesion-stylos-etc..) en una 'libreria' (que realmente es solo un submodule de github) en ./log-ui-ts. Esta carpeta esta inspirada en ../agora-next, que es un micro-frontend ya desarrollado(completamente migrado).
- La app consume un backend que esta corriendo en el servidor :3001
- La app esta corriendo con un servidor en modo watch/dev en el puerto :3000
- Ahora mismo hay muchos errores de importación, puedes verlos ejecutando 'npx tsc --noEmit'
## Objetivo
Terminar de unificar el uso de 'log ui ts'.
Para ello, el objetivo ideal es integrar el actual ./log-ui-ts en la estructura actual, sin modificar el ./log-ui-ts 

- Si has de modificar el log-ui-ts, espera confirmación humana antes de realizar-lo
