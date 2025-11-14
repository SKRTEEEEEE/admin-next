# Mejorar test
## Contexto
Ahora mismo me encuentro en el proceso de migracion/creacion de mi template para mis micro-frontends, la idea esque tengo todas las funcionalidades compartidas (navbar-inicio sesion-stylos-etc..) en una 'libreria' (que realmente es solo un submodule de github) en ./log-ui-ts. Esta carpeta esta inspirada en ../agora-next, que es un micro-frontend ya desarrollado(completamente migrado).
- La app consume un backend que esta corriendo en el servidor :3001
- La app esta corriendo con un servidor en modo watch/dev en el puerto :3000

## Objetivo
Mejorar el test actual. Para ello quiero tener un enfoque centrado en la performance de la pagina. Osea me gustaría crear una buena estructura de test para el actual template, de forma que se mida la performance de alguna manera analitica y restrictiva (como se hace con nyc y el coverage). Para ello lo ideal, seria poder tener un 'coverage' de performance, y si no se pasan ciertos parámetros que no pase dicho coverage. Piensa en como entrara lighthouse en estas limitaciones, y como integrar-lo todo de manera fácil. (Idealmente tener un comando para esto + incluirlo en pre-commit 'quizás')
## Key points
1. [ ] Busca un enfoque para mejorar el test, teniendo un enfoque especifico en performance aparte del enfoque clásico-actual
2. [ ] Explicar-me y preguntar-me si hay que aplicar-lo