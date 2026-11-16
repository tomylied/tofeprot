# TOFEPROT — Flujo de trabajo local primero, publicación autorizada

## Objetivo
Mantener GitHub Pages (`https://tomylied.github.io/tofeprot/`) como enlace público de visualización de la última versión aprobada, mientras todos los cambios se desarrollan primero en la copia local de Antigravity.

## Entornos
- **Desarrollo:** copia local `/Users/Tomy/Documents/Antigravity/Tofeprot/`.
- **Previsualización de trabajo:** servidor local (`http://localhost:8000/`) para ver cambios todavía no aprobados.
- **Versión publicada / referencia:** GitHub Pages en `https://tomylied.github.io/tofeprot/`, que muestra la última versión enviada a `main` y desplegada por GitHub Pages.
- **Rama de publicación:** `main`.

## Regla principal de autorización
Gemini, Codex o ChatGPT pueden inspeccionar y modificar archivos locales dentro del alcance de una tarea aprobada. Ningún agente puede hacer `git commit`, `git push`, merge ni despliegue a `main` sin autorización explícita del propietario para esa versión concreta.

La autorización para diseñar o modificar localmente NO equivale a autorización para publicar.

## Flujo para cada tarea
1. **Sincronizar antes de empezar:** ejecutar `git status` y comprobar que no haya cambios locales que puedan perderse. Si el árbol está limpio, `git pull origin main` para partir de la última versión publicada. Si hay cambios, no hacer pull/reset/stash automáticamente: informar y acordar cómo preservarlos.
2. **Trabajar localmente:** Gemini implementa en la copia local. ChatGPT define dirección artística, produce recursos gráficos, revisa capturas/código y prepara correcciones.
3. **Previsualizar sin publicar:** iniciar desde la raíz del proyecto `python3 -m http.server 8000` y abrir `http://localhost:8000/`. Probar escritorio y móvil. La web pública no cambia durante esta fase.
4. **Revisión del propietario:** entregar resumen de archivos modificados, pruebas y capturas. No publicar hasta recibir autorización explícita.
5. **Preparar publicación tras aprobación:** ejecutar `git diff`, revisar que solo estén los cambios aprobados, comprobar SAFE_MODE y los flujos afectados. Crear commit local con mensaje claro.
6. **Publicar tras aprobación explícita:** hacer `git push origin main`. GitHub Pages actualizará el enlace público cuando termine el despliegue.
7. **Verificar:** abrir `https://tomylied.github.io/tofeprot/` con recarga forzada y comprobar que corresponde al commit aprobado.

## Qué significa el enlace de GitHub Pages
El enlace público no muestra automáticamente los cambios que están solo en el disco local. Muestra el último contenido publicado desde `main`. Por lo tanto:
- Antes de aprobar: revisar borradores en `localhost`.
- Después de aprobar y publicar: revisar la versión aprobada en GitHub Pages.
- Quien tenga el enlace puede ver la página pública; no es una previsualización privada.

## Roles
- **Propietario:** decide prioridades, revisa los borradores y autoriza o rechaza cada publicación.
- **ChatGPT:** dirección artística, conceptos, ilustraciones, recursos visuales, UX y revisión.
- **Gemini en Antigravity:** implementación técnica local, HTML/CSS/JS, responsive, pruebas y capturas.
- **Codex (opcional):** tareas técnicas delimitadas y revisión de código.

## Instrucciones obligatorias para agentes
- No publicar cambios sin autorización explícita.
- No hacer push automático al terminar una tarea.
- No usar `git reset --hard`, `git checkout --`, `git clean`, `git stash` ni sobrescribir archivos locales sin autorización.
- No alterar logos originales ni assets aprobados sin instrucción explícita.
- Mantener `SAFE_MODE = true` hasta que el propietario autorice una tarea específica para reemplazarlo con sistemas comerciales reales.
- No inventar precios, stock, teléfonos, CUIT, CBU, testimonios, garantías ni afirmaciones técnicas.
- Antes de cada tarea, leer `TOFEPROT_PROJECT_CONTEXT.md` y la especificación aplicable en `docs/brand/`.
- Al terminar, entregar: archivos modificados, resumen, pruebas, capturas desktop/móvil, riesgos pendientes y estado Git.

## Mensaje corto de inicio para Gemini
“Trabajá localmente según `TOFEPROT_LOCAL_FIRST_WORKFLOW.md`. Antes de editar, revisá `git status` y protegé cambios existentes. Implementá y probá en localhost. No hagas commit ni push. Mostrame capturas y un resumen para mi aprobación. Solo después de mi autorización explícita se prepara el commit y se publica en `main`.”
