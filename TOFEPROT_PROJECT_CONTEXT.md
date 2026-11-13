# TOFEPROT — Project Context

> Documento maestro de contexto para ChatGPT, Gemini en Antigravity y Codex.  
> Objetivo: mantener una dirección de marca y de producto coherente mientras el proyecto sigue desarrollándose en su entorno actual.

- **Proyecto:** TOFEPROT
- **Sitio publicado:** https://tomylied.github.io/tofeprot/
- **Repositorio:** https://github.com/tomylied/tofeprot
- **Rama principal:** `main`
- **Idioma principal:** español (Argentina)
- **Estado de este documento:** base inicial; actualizar cuando se validen decisiones o cambie la implementación.

---

## 1. Qué es TOFEPROT

TOFEPROT es una marca de suplementación deportiva que busca diferenciarse mediante una identidad visual propia y un universo narrativo de dos facciones: **Berserker** e **Iluminado**.

La marca debe sentirse deportiva, intensa, memorable y visualmente consistente. La fantasía y la estética gamer/anime funcionan como recursos de identidad, pero el producto, la información comercial y la confianza deben seguir siendo claros.

**Idea rectora de marca (propuesta):**  
**TOFEPROT — Forjá tu propia evolución.**  
Dos caminos. Una misma determinación.

Esta frase es una dirección creativa acordada para explorar; no debe reemplazar automáticamente textos del sitio sin revisar su ubicación y función.

## 2. Arquitectura de marca

### Marca madre: TOFEPROT
- Es la identidad principal y el nombre que debe tener mayor reconocimiento.
- El logotipo maestro debe conservarse como referencia central.
- Berserker e Iluminado son dos expresiones de TOFEPROT, no marcas independientes.
- Las dos facciones deben compartir estructura, jerarquía tipográfica, proporciones y legibilidad.
- No redibujar, deformar ni reemplazar los logos originales sin una instrucción explícita.

### Berserker
- **Personalidad:** fuerza, intensidad, desafío, energía y superación personal.
- **Dirección cromática:** negro, violeta y púrpura; blanco/metal como contraste.
- **Lenguaje visual:** energía, metal, roca, texturas ásperas, iluminación dramática y formas angulares.
- **Tono verbal:** directo, enérgico y desafiante; evitar promesas fisiológicas no verificadas.
- **Frase de campaña exploratoria:** “Desatá tu fuerza”.

### Iluminado
- **Personalidad:** disciplina, constancia, precisión, equilibrio y evolución.
- **Dirección cromática:** blanco, marfil y dorado; negro como contraste.
- **Lenguaje visual:** mármol, luz, metal dorado, arquitectura monumental y composición elegante.
- **Tono verbal:** sereno, aspiracional y seguro; evitar mensajes que sugieran resultados garantizados.
- **Frase de campaña exploratoria:** “Dominá tu disciplina”.

### Coherencia entre facciones
- Ambas deben sentirse parte de la misma familia visual.
- Usar el mismo sistema de composición y jerarquía para piezas equivalentes.
- Mantener equivalentes la información, precios, condiciones y especificaciones de producto en ambas experiencias.
- La elección de facción puede modificar la ambientación, los colores y los mensajes; no debe ocultar ni alterar información comercial esencial.

## 3. Logos y recursos visuales existentes

En el repositorio ya existen recursos oficiales en `assets/images/`, entre ellos:

- `logo-wordmark-oscuridad.png`
- `logo-wordmark-luz.png`
- `logo-oscuridad.png`
- `logo-luz.png`
- `logo-tp-oscuridad.png`
- `logo-tp-luz.png`

**Regla:** tomar estos archivos como originales de referencia. Antes de incorporar variantes nuevas, comparar con los originales y conservar una copia intacta. No sustituir assets existentes ni cambiar sus nombres/rutas sin revisar todas sus referencias.

Los logos compartidos por el propietario muestran una tipografía deportiva de pincelada/agresiva, con letras claras y acentos violeta para Berserker y oro para Iluminado. La intención es armonizar ambas versiones sin perder ese carácter.

## 4. Estado técnico conocido del repositorio

La inspección inicial de la rama `main` encontró esta estructura:

- `index.html`: página principal y estructura del sitio.
- `admin.html`: página de administración.
- `css/styles.css`: hoja de estilos principal.
- `js/app.js`: lógica principal de la tienda.
- `js/admin.js`: lógica de administración.
- `assets/images/`: logos, imágenes de producto, fondos y otros recursos.
- `assets/videos/`: recursos de video.

La implementación visible es actualmente una web basada en HTML, CSS y JavaScript. No se identificó un framework de frontend ni un proceso de compilación en la estructura raíz consultada; volver a comprobar antes de asumirlo.

### Funcionalidades identificadas en el HTML
- Selector inicial de facción (Berserker/Iluminado).
- Persistencia de la selección mediante `localStorage` con la clave `tofeprot_side`.
- Transición visual al cambiar de facción.
- Logotipo interactivo en el hero.
- Navegación lateral, buscador y carrito.
- Perfil de usuario/EXP y modales promocionales.
- Sección promocional vinculada a Psychotic.

La presencia de elementos en el HTML no demuestra por sí sola que todos los flujos estén completos o conectados a servicios reales. Probarlos antes de describirlos como operativos.

## 5. Dirección de marketing

El branding debe apoyar objetivos comerciales concretos sin convertir el sitio en una sucesión de efectos visuales.

Pilares editoriales sugeridos:
1. **Universo de marca:** facciones, símbolos, narrativa y campañas.
2. **Producto:** presentación, formatos, ingredientes y datos verificables.
3. **Comunidad:** experiencias reales y autorizadas de clientes/atletas.
4. **Educación:** contenido informativo prudente sobre suplementación.
5. **Comercial:** ofertas, lanzamientos y promociones con condiciones claras.

La experiencia de compra debe priorizar:
- Producto y propuesta de valor comprensibles.
- Precio, presentación, disponibilidad y condiciones visibles.
- Llamadas a la acción claras.
- Confianza, contacto y políticas fáciles de encontrar.
- Buen funcionamiento en móvil y escritorio.

Evitar competir con demasiados descuentos, ruletas o mensajes simultáneos. Las promociones deben tener condiciones, vigencia y restricciones visibles.

## 6. Principios de UX/UI

- Priorizar legibilidad, jerarquía y claridad por encima de efectos.
- Mantener una experiencia móvil cuidada; revisar tamaños táctiles, contraste y carga.
- Las animaciones deben tener propósito, ser fluidas y no impedir la navegación.
- Respetar accesibilidad básica: contraste, etiquetas, foco de teclado, textos alternativos y controles semánticos.
- No usar tipografías, texturas o efectos diferentes entre facciones sin una razón del sistema visual.
- Mantener nombres, rutas y componentes existentes siempre que sea razonable.
- Optimizar imágenes y videos para no perjudicar el tiempo de carga.
- No añadir dependencias innecesarias a una web estática.

## 7. Integridad comercial, contenido y seguridad

Estas reglas son obligatorias:

- No inventar certificaciones, análisis de laboratorio, pureza, composición, registros, resultados, reseñas, testimonios, premios ni alianzas.
- Las afirmaciones sobre composición, efectos, absorción, rendimiento o beneficios deben contar con documentación verificable y revisión regulatoria antes de publicarse.
- No inventar ni modificar CUIT, CBU, datos bancarios, direcciones, teléfono, precios, stock, costos de envío o condiciones de garantía. Confirmarlos con el propietario.
- Los testimonios deben ser reales, autorizados y representativos.
- Verificar que promociones, descuentos, sorteos y muestras cumplan las reglas aplicables antes de activarlos.
- Nunca guardar contraseñas, claves privadas, tokens, credenciales de pago ni secretos en HTML, CSS, JavaScript del navegador o en este documento.
- Una página estática o una validación JavaScript del lado del cliente no constituyen protección suficiente para acciones administrativas ni datos sensibles.
- Revisar `admin.html` y sus integraciones antes de usarlo con pedidos o información personal real. Las operaciones sensibles requieren autenticación y autorización del lado servidor.
- No exponer información personal ni datos reales de clientes en repositorios públicos, logs, capturas o ejemplos.

Este documento no sustituye asesoramiento bromatológico, legal, contable o de seguridad.

## 8. Forma de trabajar con Gemini, ChatGPT y Codex

### Flujo recomendado
1. Leer este archivo antes de proponer cambios relevantes.
2. Inspeccionar el código y los assets relacionados antes de editar.
3. Explicar brevemente el plan y los archivos que se modificarían.
4. Realizar cambios acotados y coherentes con la arquitectura actual.
5. Revisar el diff y comprobar que no se hayan eliminado comportamientos existentes.
6. Probar los flujos afectados en escritorio y móvil.
7. Informar qué se cambió, qué se probó y qué queda pendiente.

### Reglas de colaboración
- **Propietario del proyecto:** decide prioridades, aprueba cambios visuales y comerciales y valida la publicación.
- **Gemini en Antigravity:** entorno principal de desarrollo y ejecución de cambios.
- **ChatGPT:** estrategia de marca, marketing, UX, documentación, análisis y revisión técnica/funcional.
- **Codex:** agente complementario para inspeccionar, implementar o revisar tareas de código delimitadas.
- Evitar que dos agentes editen simultáneamente los mismos archivos.
- Usar Git para registrar cambios y poder volver atrás.
- Para cambios importantes, trabajar en una rama y revisar un Pull Request antes de integrar a `main`.
- No publicar ni alterar producción sin aprobación explícita del propietario.

### Formato sugerido de tarea
Cada tarea de desarrollo debe indicar:
- Objetivo.
- Contexto de marca y experiencia deseada.
- Archivos que probablemente se modificarán.
- Comportamientos que deben conservarse.
- Criterios de aceptación.
- Pruebas realizadas y resultado.
- Riesgos o decisiones que requieren aprobación.

## 9. Backlog inicial por validar

1. Crear un Brand Book práctico con logos, paleta, tipografía, usos y ejemplos de ambas facciones.
2. Auditar la portada y hacer más clara la propuesta de marca sin perder el selector de facción.
3. Revisar consistencia visual de Berserker e Iluminado en todas las secciones.
4. Auditar carrito, checkout, formularios, promociones y contacto.
5. Revisar seguridad y arquitectura de `admin.html` y cualquier almacenamiento de pedidos.
6. Verificar toda la información comercial, técnica y regulatoria antes de operar.
7. Medir experiencia móvil, accesibilidad, velocidad y conversiones.

Priorizar primero la seguridad y la exactitud comercial cuando haya riesgos para clientes; después, las mejoras de marca y conversión.

---

## 10. Cómo actualizar este documento

Actualizarlo cuando el propietario apruebe una decisión nueva de marca, una modificación estructural o una funcionalidad importante. Distinguir siempre:
- **Confirmado:** decisión o comportamiento verificado.
- **Propuesto:** idea en evaluación.
- **Pendiente de validar:** requiere confirmación, prueba o documentación.

No convertir propuestas en hechos confirmados sin aprobación.
