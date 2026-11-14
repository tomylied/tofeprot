# Tarea 03 — Implementación visual de las dos iglesias TOFEPROT

**Rol de Gemini:** integrador frontend.  
**Dirección artística y recursos:** definidos por ChatGPT y aprobados por el propietario.  
**Referencia visual obligatoria:** `docs/brand/ART_DIRECTION_CHURCH_UNIVERSE.md`.  
**Contexto del proyecto:** `TOFEPROT_PROJECT_CONTEXT.md`.

## Filosofía que no se debe alterar

La iglesia es el centro del universo visual de cada bando.

- **Berserker:** una catedral oscura con grandes ventanales góticos y vitrales púrpura. Su mística representa desenvolver el poder interior y desbloquear el potencial propio. Debe transmitir misterio, intensidad, introspección y despertar.
- **Iluminado:** una iglesia/santuario de mármol marfil y oro, con grandes ventanales, rosetones y luz solar dorada. Representa glorificación, elevación y búsqueda de una mejor versión de uno mismo.

No convertir estas ideas en una tienda de gimnasio genérica. No reemplazar la arquitectura por culturistas, personajes aleatorios, fondos abstractos, rayos genéricos o fotos de gimnasio.

## Recursos visuales que entrega el propietario/ChatGPT

Antes de editar, confirmar que estos archivos de fondo estén copiados dentro de `assets/images/` desde el paquete visual corregido:

- `hero-cathedral-berserker.webp`
- `hero-cathedral-iluminado.webp`

Los logos ya existentes en el repositorio son los originales aprobados y deben permanecer exactamente como están:

- Berserker: `logo-wordmark-oscuridad.png`
- Iluminado: `logo-wordmark-luz.png`

**Decisión expresa del propietario:** no le gustaron los emblemas genéricos añadidos por encima de los logos. No utilizar `logo-lockup-berserker.png`, `logo-lockup-iluminado.png`, `faction-emblem-berserker.svg` ni `faction-emblem-iluminado.svg`. No agregar ningún símbolo, corona, halo, aro, laurel o icono adicional sobre los wordmarks.

Importante: el motivo de corona/espinas que ya forma parte del wordmark original de Iluminado debe conservarse intacto; es parte del diseño original, no un añadido nuevo. No alterar letras, colores, proporciones ni el subtítulo “SUPLEMENTOS DEPORTIVOS”.

## Archivos a inspeccionar y posibles cambios

- `index.html`: Hero, imagen de fondo, video de fondo, logo principal y una sección editorial que explique la filosofía de los dos caminos.
- `js/app.js`: función `applySideTheme(side)`. Actualmente cambia tema, título, descripción y rutas de fondo/logo; actualizar únicamente esas referencias necesarias.
- `css/styles.css`: estilos del Hero, capas de fondo/overlay, proporciones de logo, responsive y la nueva sección de filosofía.
- No cambiar lógica de carrito, SAFE_MODE, productos, precios, stock, formularios, pagos, autenticación ni promociones.

## Implementación solicitada

### 1. Fondos del Hero
- Para `theme-dark`, usar `assets/images/hero-cathedral-berserker.webp`.
- Para `theme-light`, usar `assets/images/hero-cathedral-iluminado.webp`.
- La imagen debe ser la capa visual principal, con `background-size: cover` o equivalente y punto focal ajustado a desktop/móvil.
- Revisar la capa `.hero-video-bg`: evitar que un video antiguo cubra o contradiga los nuevos fondos. Se puede desactivar en el Hero si no se adapta a ambas iglesias; no inventar un nuevo video.
- Mantener overlays sutiles para legibilidad; no oscurecer tanto que desaparezcan los vitrales ni aclarar tanto que se pierda la arquitectura.
- En móvil, ajustar la posición del recorte para conservar grandes ventanales y altar.

### 2. Logos principales
- Mantener las rutas actuales de los wordmarks originales: `logo-wordmark-oscuridad.png` para Berserker y `logo-wordmark-luz.png` para Iluminado.
- No reemplazar los archivos por lockups nuevos.
- No sumar emblemas arriba, abajo ni alrededor.
- No modificar el arte original; solo ajustar el tamaño responsive en CSS, con proporción preservada y `object-fit: contain`.
- Verificar que la animación de cambio de bando siga funcionando con las imágenes originales.

### 3. Mensaje del Hero
Copy sugerido:
- Berserker: título **“DESATÁ TU FUERZA”**. Descripción: “La fuerza que buscás también está dentro tuyo. Despertá tu potencial y forjá tu propio camino.”
- Iluminado: título **“DOMINÁ TU DISCIPLINA”**. Descripción: “La evolución se construye con constancia y propósito. Cada día es una oportunidad para elevar tu mejor versión.”

No incluir promesas de resultados deportivos, físicos o fisiológicos.

### 4. Nueva sección editorial de filosofía
Agregar una sección breve, visual y responsive titulada:
**“DOS CAMINOS. UNA MISMA DETERMINACIÓN.”**

Dos paneles equivalentes:
- Berserker — **La catedral del poder interior**. Copy: “Un templo que representa el viaje hacia adentro: enfrentar tus límites, descubrir tu fuerza y liberar el potencial que llevás dentro.”
- Iluminado — **El santuario de la glorificación**. Copy: “Un santuario que representa la elevación constante: disciplina, constancia y la búsqueda consciente de una mejor versión de vos mismo.”

Usar los fondos de iglesia entregados como imagen de ambiente o composición derivada sin texto incrustado. El texto debe ser HTML accesible, no parte de una imagen. No colocar claims comerciales no verificados.

### 5. Selector inicial y transiciones
- Conservar el gateway y la persistencia actual del bando.
- No reconstruir el selector entero ni alterar sus interacciones.
- Asegurar coherencia entre el aspecto del gateway y el Hero después de elegir una facción.
- Mantener la transición de cambio de bando y `prefers-reduced-motion`.

### 6. Catálogo y SAFE_MODE
- Mantener catálogo, imágenes, productos y precios tal como están.
- Mantener la experiencia “Agregar a consulta” y los avisos de pedidos pausados.
- No reactivar promociones, WhatsApp, pagos, usuarios, testimonios ni administrador.
- Los colores de bordes, botones y acentos pueden seguir el bando activo, pero el contenido funcional no debe cambiar.

## Criterios de aceptación

1. La primera impresión de Berserker es una catedral oscura, de escala monumental y grandes vitrales violetas.
2. La primera impresión de Iluminado es un santuario luminoso de mármol y oro, con grandes ventanales y luz de glorificación.
3. El cambio de bando actualiza fondo, logo original, paleta y copy sin recargar la página.
4. Los logos son los originales exactos, sin emblemas añadidos, sin deformación ni cambios en la palabra TOFEPROT o el subtítulo SUPLEMENTOS DEPORTIVOS.
5. La nueva sección explica la filosofía de ambos caminos de forma clara.
6. La navegación y catálogo continúan funcionando.
7. SAFE_MODE permanece activo y ninguna función comercial se reactiva.
8. No aparecen precios, garantías, envíos, reseñas o afirmaciones nuevas.
9. Escritorio, tablet y móvil se ven bien; no hay overflow horizontal ni logos cortados.
10. No hay errores JS nuevos en consola.

## Flujo de trabajo y publicación

El propietario utiliza `main` para previsualizar la web mediante GitHub Pages.

1. Ejecutar `git status` y confirmar que el repositorio local contiene los commits de contexto y dirección artística más recientes.
2. Confirmar la presencia de los dos fondos WebP y verificar que los dos wordmarks originales continúan presentes. Si falta un recurso, no sustituirlo con arte propio: avisar al propietario.
3. El propietario desea continuar trabajando en `main` para visualizar cambios; respetar ese flujo una vez confirmada la copia local correcta.
4. Realizar cambios acotados en `index.html`, `js/app.js` y `css/styles.css`.
5. Probar localmente ambos bandos en desktop y móvil.
6. Mostrar capturas de Berserker e Iluminado y resumir exactamente qué cambió.
7. No ejecutar push ni desplegar sin confirmación explícita del propietario para esta tanda.

## Informe final
Informar archivos modificados, recursos utilizados, pruebas, capturas y cualquier limitación. No afirmar que el sitio está publicado si solo se probó localmente.
