# TOFEPROT — Tarea 03C: Rediseño de portada cinematográfica integrada

**Estado:** nueva especificación correctiva. Reemplaza la solución visual de tarjetas de la Tarea 03B.  
**Referencia prioritaria:** imagen aportada por el propietario con el nombre “TOFEPROT — Forjá tu evolución” (1672 × 941 px), adjunta en la conversación del 15/11/2026.  
**Objetivo:** acercar la portada real a esa composición y riqueza visual, evitando el diseño genérico de dos cards.

## 0. Diagnóstico del intento anterior — NO repetir

El resultado actual no está aprobado. Problemas observados en las capturas:
- El selector se repite: header/SAFE MODE, hint “TOCÁ EL LOGO”, título de marca, badge “BANDO ACTIVO / CAMINO DISPONIBLE” y botones “ELEGIR…”.
- Dos cards con bordes redondeados y fondos opacos se leen como una plantilla genérica de selección de personajes.
- El logo queda en una cápsula y parece aislado del entorno.
- La arquitectura está de fondo pero no forma una escena integrada.
- No hay suficiente profundidad ni detalles ornamentales, estatuarios y cinematográficos.
- Las animaciones se sienten planas y no aportan una transformación visual memorable.

**No realizar más retoques incrementales sobre esas cards. Cambiar el concepto de composición.**

## 1. Decisiones innegociables del propietario

- Conservar los dos fondos de iglesia actuales:
  - Berserker: `assets/images/hero-cathedral-berserker.webp`
  - Iluminado: `assets/images/hero-cathedral-iluminado.webp`
- No regenerar ni reemplazar esos fondos.
- Conservar exactamente los logos originales:
  - Berserker: `assets/images/logo-wordmark-oscuridad.png`
  - Iluminado: `assets/images/logo-wordmark-luz.png`
- No agregar emblemas, coronas, halos, laurel, iconos u ornamentos a los logos.
- La imagen de referencia es una guía de composición y densidad visual; no se debe usar como imagen de fondo ni copiar sus logos, claims o datos.
- El diseño debe ser elaborado por dirección artística de ChatGPT; Gemini en Antigravity es responsable de integrarlo técnicamente.
- Trabajar paso a paso, con capturas antes de publicar.
- SAFE_MODE sigue activo.

## 2. Nuevo concepto: una sola escena, no un selector de cards

Diseñar un Hero panorámico continuo, como una gran catedral de dos órdenes:
- Lado izquierdo: iglesia Berserker.
- Lado derecho: iglesia Iluminado.
- Unión en el centro: nave, pasillo, altar o punto de fuga compartido. La transición debe ser arquitectónica y lumínica, no una línea vertical o una separación de cards.
- Las dos iglesias deben estar visibles simultáneamente en desktop.
- La arquitectura, vitrales, columnas, rosetones, piedra, mármol, estandartes, braseros, escalones y perspectiva constituyen el diseño. La UI debe integrarse en esa escena y no dominarla.

### 2.1 Profundidad y riqueza visual

Usar los fondos existentes como capas base y añadir capas visuales decorativas, sin reemplazarlos:
- elementos escultóricos monumentales a los extremos, uno por facción, inspirados en el lenguaje de la referencia (estatua de piedra oscura con energía violeta en Berserker; escultura clásica de mármol marfil y luz dorada en Iluminado);
- estandartes verticales y detalles de heráldica arquitectónica en columnas (sin modificar los wordmarks);
- pedestales, braseros o puntos de luz integrados en los laterales;
- neblina atmosférica y haces de luz en capas;
- piso de piedra con reflejo discreto y un altar/escala central;
- bordes ornamentales sutiles, biseles y metal oscuro/dorado en las placas de facción.

No usar culturistas, personajes aleatorios de stock, demonios, monstruos ni estética gamer genérica. Las esculturas deben leerse como obras integradas en una catedral, no como PNGs flotantes o stickers.

Si ChatGPT no entregó un recurso decorativo real, no fingir que existe ni sustituirlo con una ilustración improvisada. Gemini puede preparar placeholders de layout, pero debe pedir el arte requerido antes de simularlo.

## 3. Jerarquía exacta del Hero

### Header
- Altura contenida, una sola línea.
- Izquierda: menú y navegación (Inicio, Productos, Filosofía/FAQ).
- Derecha: indicador SAFE MODE / “Pedidos temporalmente pausados” y accesos de usuario/lista de consulta.
- No repetir “Elegir bando” en el header.
- Evitar logo adicional en header si el wordmark grande ya ocupa el centro del Hero.

### Identidad central
- Un único wordmark grande en el eje central/alto del Hero.
- Usar el wordmark original del bando activo.
- Debajo, una sola vez:
  - “FORJÁ TU PROPIA EVOLUCIÓN”
  - “DOS CAMINOS. UNA MISMA DETERMINACIÓN.”
- No añadir el texto “TOCÁ EL LOGO PARA CAMBIAR DE BANDO”. El logo puede seguir siendo interactivo, pero la affordance se comunica con cursor, foco, tooltip accesible discreto o microanimación de hover; no una cápsula más.

### Presentación de las facciones
- Una placa ornamental amplia para Berserker integrada en la escena del lado izquierdo.
- Una placa ornamental amplia para Iluminado integrada en el lado derecho.
- Las placas deben parecer inscripciones/relieves sobre piedra y metal, no tarjetas rectangulares independientes.
- Cada placa contiene solo:
  - nombre de facción;
  - su lema corto (“DESATÁ TU FUERZA” / “DOMINÁ TU DISCIPLINA”).
- La placa completa funciona como control seleccionable. No agregar otro botón “ELEGIR…”.
- No agregar chips “BANDO ACTIVO”, “CAMINO DISPONIBLE” o equivalentes. El estado activo se comunica únicamente mediante una luz de borde/halo, contraste y profundidad en la placa seleccionada.
- No mostrar más de un CTA por facción.

### Franja inferior
- Una franja arquitectónica o placa editorial con mensajes veraces:
  - “DOS CAMINOS · UNA MISMA MARCA”
  - “CATÁLOGO DISPONIBLE EN MODO CONSULTA”
  - “PEDIDOS ONLINE TEMPORALMENTE PAUSADOS”
- No incluir “calidad verificada”, “garantía”, “envíos”, “productos certificados”, “compra segura”, cuotas u otras promesas no validadas.
- La franja lleva al catálogo de forma natural mediante el scroll, no más botones de selección.

## 4. Interacción: una sola elección clara

Hay solo dos formas de cambiar facción:
1. Clic en la placa Berserker o Iluminado (selección explícita).
2. Clic en el wordmark central para alternar al lado opuesto, usando la animación descrita abajo.

No debe existir:
- Gateway separado que vuelva a pedir la elección.
- Hint visible “tocá el logo”.
- CTA extra “elegir bando” debajo de una tarjeta.
- badge de estado repetido.
- otro selector en el header.

Al elegir una facción:
- Mantener siempre visible la portada dual y ambos fondos.
- Guardar el estado en `localStorage.tofeprot_side`.
- Actualizar el wordmark activo.
- Iluminar la placa correspondiente.
- Cambiar los acentos globales de la interfaz.
- No cambiar de página ni recargar.

## 5. Nueva animación del wordmark central

Reemplazar el efecto anterior de rayos fractales / hints por una transición cinematográfica refinada:
1. El wordmark actual baja a 94–96% de escala y se atenúa.
2. Un sweep fino de energía cruza el eje central de la composición.
3. El wordmark del bando elegido aparece mediante reveal + crossfade, no una rotación 3D exagerada.
4. El borde del divisor/altar pulsa una vez con el color del nuevo bando.
5. La placa del nuevo camino se enciende progresivamente; la otra baja ligeramente su intensidad.
6. El logo termina nítido, estable y sin glow excesivo.

Duración objetivo: 650–900 ms. Sin partículas sobre las letras. No deformar, tintar, recortar ni rasterizar el archivo del logo. Respetar `prefers-reduced-motion`.

## 6. Animaciones ambientales y profundidad

Las animaciones no deben ser solo hover o pulsos de botón. Aplicar movimiento sutil a elementos de la escena:
- parallax muy leve por movimiento del puntero en desktop (solo si es barato y accesible);
- movimiento lento de neblina en primer plano;
- pulsación suave de luz en vitrales y braseros;
- partículas de polvo muy discretas en haces de luz;
- hover de placas con relieve, desplazamiento mínimo y recorrido de luz sobre el borde;
- entrada por scroll de la franja y catálogo.

No mover todo a la vez. Priorizar capas independientes y rendimiento. En `prefers-reduced-motion`, detener parallax/partículas y reducir transiciones.

## 7. Catálogo debajo del Hero

- Debe empezar inmediatamente después de la escena, como continuidad del templo.
- Utilizar productos, imágenes, nombres y precios reales del catálogo actual en HTML/JS.
- Se pueden presentar sobre pedestales o plataformas visuales usando CSS; no incrustar productos falsos en imágenes.
- Mantener el orden y el contenido comercial existentes.
- Mantener “Agregar a consulta” y los avisos SAFE_MODE.
- Esta tarea no rediseña las tarjetas del catálogo, salvo una transición visual mínima para conectar la sección con el Hero.

## 8. Mobile

En móvil, no repetir la UI ni comprimir una portada desktop:
- header compacto.
- wordmark central una sola vez.
- ambos mundos siguen presentes, usando composición vertical/diagonal o fondo dual con transición.
- las placas se apilan en el mismo escenario, no dentro de dos cards planas.
- retirar badges “activo/disponible” y hints.
- conservar arquitectura, vitrales y un detalle escultórico reconocible en cada camino.
- una sola acción por facción; botones/plaque completas.
- controlar el recorte y espacio vertical, evitar que safe-mode, logo y CTA se superpongan.
- no dejar una barra o tarjeta flotante por encima del logo.

## 9. Alcance y archivos

Modificar lo necesario en:
- `index.html`
- `css/styles.css`
- `js/app.js`

No tocar:
- catálogo / precios / inventario;
- lógica de consulta/carrito;
- SAFE_MODE;
- WhatsApp;
- autenticación;
- promociones;
- backend;
- logos o fondos originales.

Antes de diseñar capas de escultura/estandarte:
- comprobar los assets existentes.
- no usar imágenes generadas con texto, marcas inventadas, UI falsa, precios ni logos incorrectos.
- pedir a ChatGPT los artes puntuales que falten; no improvisar.

## 10. Criterios de aceptación visual

1. La composición se parece en jerarquía a la referencia del propietario: un gran escenario cinematográfico, no dos cards.
2. Los dos templos se ven simultáneamente y forman una sola arquitectura.
3. El wordmark original es protagonista en el centro y aparece una sola vez.
4. No hay cápsula “tocá el logo”, chips “activo/disponible” ni botones adicionales duplicando la selección.
5. Las placas tienen tratamiento ornamental y están integradas en el escenario.
6. Se percibe profundidad con esculturas/estandartes/altar/braseros/luz y niebla, no solo fondo y tarjetas.
7. La animación del logo es visible, fina y de nivel premium.
8. El sitio mantiene buen rendimiento, legibilidad y accesibilidad.
9. Mobile conserva el lenguaje cinematográfico y no cae en dos tarjetas simples.
10. SAFE_MODE y todos los datos comerciales quedan intactos.
11. Entregar capturas: desktop 1440px, mobile 390px, Berserker activo e Iluminado activo.
12. No push, commit ni publicación hasta aprobación expresa.

## 11. Proceso de implementación

1. Ejecutar `git status` y revisar cambios locales. No descartar ni resetear cambios sin aprobación.
2. Leer este documento completo; **esta Tarea 03C reemplaza la propuesta anterior de dos cards de 03B**.
3. Antes de modificar HTML/CSS/JS, preparar un plan de archivos y una captura/mockup local de la estructura (sin texto/logos inventados).
4. Implementar primero la escena desktop.
5. Probar ambas facciones en desktop.
6. Implementar el responsive móvil.
7. Verificar la animación del logo y selección.
8. Entregar capturas comparables con la referencia y un listado de criterios cubiertos.
9. No hacer commit ni push hasta aprobación.

