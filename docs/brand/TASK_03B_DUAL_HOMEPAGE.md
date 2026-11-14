# TOFEPROT — Tarea 03B: Portada dual permanente

**Estado:** especificación visual aprobada para implementación local, pendiente de revisión del propietario.  
**Referencia:** imagen compartida por el propietario “TOFEPROT — Forjá tu evolución”.  
**Objetivo:** trasladar su composición a la web real usando las iglesias y logos existentes, sin copiar los logos/emblemas genéricos que aparecen en la referencia.

## 1. Decisión artística

El propietario confirmó:
- Le gustan los fondos de iglesia actuales y quiere conservarlos.
- No quiere nuevos fondos ni regeneraciones para esta tarea.
- Los wordmarks originales deben permanecer exactamente como son.
- Quiere una portada que muestre simultáneamente Berserker e Iluminado, inspirada en la referencia compartida.
- Quiere cambiar la animación del logo central para que el intercambio de facción sea más elegante y claramente perceptible.
- Quiere avanzar paso a paso, revisando capturas antes de publicar.

## 2. Recursos aprobados

Usar únicamente estos fondos actuales:
- Berserker: `assets/images/hero-cathedral-berserker.webp`
- Iluminado: `assets/images/hero-cathedral-iluminado.webp`

Usar únicamente estos wordmarks originales:
- Berserker: `assets/images/logo-wordmark-oscuridad.png`
- Iluminado: `assets/images/logo-wordmark-luz.png`

No reemplazar, redibujar, recolorear, recortar ni deformar los logos. No agregarles coronas, halos, laureles, insignias, símbolos, aros ni ornamentos. No utilizar lockups o emblemas descartados.

No usar la imagen de referencia del propietario como background ni como screenshot de página; es una guía de composición, no un asset web.

## 3. Composición deseada: portada dual

Reorganizar la primera impresión de la página para que las dos iglesias estén visibles al mismo tiempo en una portada integrada.

### Header
- Mantener navegación y acceso al menú existentes.
- Mantener un estado/aviso discreto de SAFE MODE y pedidos online pausados.
- Mantener accesos actuales de usuario y lista de consulta, sin insinuar que hay cuentas o checkout reales.
- No colocar un logo genérico ni símbolo añadido en el header.

### Hero dual (desktop)
- Dividir el Hero en dos grandes paneles de igual importancia.
- Izquierda: fondo Berserker actual, con vitrales violetas, piedra oscura y atmósfera mística.
- Derecha: fondo Iluminado actual, con mármol marfil, vitrales dorados y luz elevada.
- Mantener la línea arquitectónica visible y equilibrada; usar una transición central suave, no una división rígida de plantilla.
- Colocar en la zona central/superior la identidad de marca usando el wordmark original correspondiente al bando activo. La imagen del logo puede cambiar entre los dos wordmarks originales.
- Debajo del logo, colocar:
  - “FORJÁ TU PROPIA EVOLUCIÓN”
  - “DOS CAMINOS. UNA MISMA DETERMINACIÓN.”
- En cada lado mostrar copy y CTA:
  - Berserker: “BERSERKER”, “DESATÁ TU FUERZA”, descripción breve sobre descubrir y liberar el potencial interior, botón “ELEGIR BERSERKER”.
  - Iluminado: “ILUMINADO”, “DOMINÁ TU DISCIPLINA”, descripción breve sobre constancia, glorificación y búsqueda de una mejor versión, botón “ELEGIR ILUMINADO”.
- Los CTAs deben tener igual peso visual, con acentos violeta y dorado respectivamente.
- No permitir que el logo o el bloque central tapen las ventanas o las fachadas principales.
- El contenido debe ser HTML real, no texto incrustado en una imagen.

### Franja de información bajo el Hero
Usar mensajes veraces y compatibles con SAFE_MODE. Preferidos:
- “DOS CAMINOS · UNA MISMA MARCA”
- “CATÁLOGO DISPONIBLE EN MODO CONSULTA”
- “PEDIDOS ONLINE TEMPORALMENTE PAUSADOS”
- “SUPLEMENTACIÓN DEPORTIVA”

No utilizar afirmaciones no verificadas como “compra segura”, “calidad garantizada”, “envíos a todo el país”, “garantía 30 días”, “cuotas sin interés”, “productos certificados” o promesas sobre resultados.

### Catálogo debajo
- Mantener el catálogo actual debajo de la franja.
- No copiar productos, precios ni envases inventados de la imagen de referencia.
- Mantener los nombres, imágenes y precios actuales del código, sin alterarlos.
- Mantener la acción “Agregar a consulta” y las restricciones SAFE_MODE.

## 4. Comportamiento de la selección de facción

La portada dual debe permanecer visible después de la elección; no debe ocultarse como un modal o gateway independiente.

Al elegir un CTA:
- Berserker aplica el estado `dark`.
- Iluminado aplica el estado `light`.
- Persistir el bando seleccionado mediante la clave existente `tofeprot_side`.
- Resaltar el panel seleccionado (borde, iluminación, ligera elevación/contraste).
- Actualizar el wordmark central a la versión original de ese bando.
- Actualizar los acentos temáticos del resto de la interfaz.
- Mantener ambos fondos de iglesia visibles en la portada dual.
- No recargar la página.
- Si ya existe un bando guardado, mostrar ambos lados de todos modos y reflejar el bando activo en el highlight y en el wordmark.

Los dos CTAs deben elegir explícitamente la facción correspondiente; no deben funcionar como un simple toggle.

## 5. Nueva animación del logo principal

Rediseñar la animación existente de `heroLogoStage` / `triggerLogoSideSwitch(event)`.

### Movimiento propuesto
1. El logo activo reduce levemente su escala y se desvanece.
2. Una línea/sweep de energía cruza el espacio del wordmark.
3. El segundo wordmark original aparece mediante un reveal/crossfade breve.
4. La iluminación del contorno cambia de violeta a dorado o de dorado a violeta según el destino.
5. El fondo mantiene sus dos iglesias; puede acompañar con un pulso lumínico muy sutil en la división central.
6. La animación debe terminar con el logo perfectamente nítido y sin glow excesivo.

Duración orientativa: 500–800 ms. La animación no debe deformar el archivo del logo, rasterizarlo de nuevo ni añadir símbolos. Reutilizar las dos capas de imagen si es apropiado. Evitar relámpagos fractales excesivos que compitan con el wordmark; simplificar o sustituir el efecto actual por una transición elegante de energía.

### Interacción
- El logo central sigue siendo clickeable y alterna al otro bando.
- El botón Berserker selecciona siempre Berserker.
- El botón Iluminado selecciona siempre Iluminado.
- Evitar que dos acciones rápidas disparen transiciones superpuestas.
- Mantener accesibilidad de teclado, etiqueta aria actualizada y foco visible.
- Respetar `prefers-reduced-motion`: hacer un cambio inmediato o un crossfade mínimo sin efectos.

## 6. Responsive

### Tablet
- Mantener una composición dual con división equilibrada cuando haya ancho suficiente.
- Reducir el bloque central y los titulares sin tapar vitrales.

### Móvil
- No comprimir ambos lados en dos columnas angostas.
- Mostrar el bloque central de marca primero, seguido por dos paneles apilados o una disposición vertical equivalente.
- Ambos paneles deben ser visibles al desplazarse; cada uno conserva su propio CTA y ambiente.
- Usar el recorte de fondo que mejor conserve los grandes vitrales y el altar.
- Evitar alturas excesivas, botones cortados, solapamientos y overflow horizontal.
- El cambio del wordmark debe seguir funcionando en móvil.

## 7. Alcance de esta tanda (no ampliar)

- Modificar únicamente lo necesario en `index.html`, `css/styles.css` y `js/app.js`.
- Se puede refactorizar el markup de gateway/hero para convertirlo en una sola portada dual persistente.
- Evitar duplicar dos heroes y evitar que el antiguo gateway quede como una segunda pantalla de selección antes de la nueva portada.
- Mantener intactos la sección de filosofía existente, catálogo, productos, precios, lista de consulta, FAQ y footer salvo ajustes estrictamente necesarios de anclas.
- No rediseñar todavía las tarjetas de productos.
- No modificar el backend ni Supabase.
- No modificar SAFE_MODE, pagos, WhatsApp, login, promociones o administración.
- No agregar información comercial o promesas no verificadas.

## 8. Criterios de aceptación

1. Desktop muestra simultáneamente las dos iglesias con composición equilibrada.
2. El logo central utiliza solamente los wordmarks originales y cambia entre ellos con una animación limpia.
3. Los CTAs seleccionan la facción correcta sin ocultar el Hero dual.
4. El bando activo queda visualmente identificado y persiste al recargar.
5. El resto de la página adapta sus acentos al bando activo sin cambiar los fondos duales.
6. Móvil muestra ambas facciones sin apretarlas en dos columnas ni crear overflow.
7. La franja informativa solo muestra mensajes veraces compatibles con SAFE_MODE.
8. El catálogo conserva los datos y acciones de consulta existentes.
9. No hay errores JavaScript ni interacciones duplicadas.
10. Se prueban escritorio 1440 px, tablet y móvil.
11. Se entregan capturas de Berserker activo, Iluminado activo, desktop y mobile.
12. No se hace push ni publicación hasta aprobación expresa del propietario.

## 9. Flujo de trabajo

El propietario usa `main` para la vista previa de GitHub Pages. Mantener este flujo cuando se publique una tanda aprobada.

Antes de modificar:
- Ejecutar `git status`.
- Confirmar que el árbol local está limpio o reportar cambios pendientes.
- Sincronizar los documentos/commits aprobados de `origin/main` sin sobrescribir cambios locales.
- Confirmar que los dos fondos WebP y los dos wordmarks originales existen.

Primero trabajar localmente y enseñar capturas. No crear commit ni hacer push hasta que el propietario apruebe la composición.
