# Smoke checklist — RoadBuilder (`rb-app`)

Ejecutar en local (`npm run dev`) o preview (`npm run build && npm run preview`) antes de publicar.

## Navegación
- [ ] Home carga; hero visible; marca RoadBuilder clara
- [ ] Menú desktop: Inicio, Beneficios, Productos, Videos, Contacto
- [ ] Menú móvil (viewport &lt; 1024px): hamburger abre/cierra; Escape cierra; links llegan a anclas
- [ ] En DevTools: elegir iPhone / ancho ≤ 390 (si el ancho es ~1080 verás menú de escritorio)
- [ ] Banderas ES/EN cambian copy (Home, nav, contacto)
- [ ] Responsive: sin scroll horizontal en 360px / 768px / 1280px; hero y CTAs legibles; chat panel usable en móvil

## Productos
- [ ] Grid `#productos` muestra 4: TSW, TSB, SX Prime, SX Fog
- [ ] Cada ficha `/product/tsw|tsb|sx-prime|sx-fog` carga y hace scroll al top
- [ ] `/product/foo` muestra no encontrado (no fallback TSW)
- [ ] “Back to Products” / volver a productos funciona

## Medios
- [ ] Videos: no descargan completo al load (`preload` metadata/none); posters visibles
- [ ] Hero WebP/JPEG; sin PNG hero pesado

## Contacto
- [ ] `#contacto`: formulario envía a Formspree; éxito solo si OK
- [ ] Doble clic no duplica (botón disabled al enviar)
- [ ] Mapa Red Oak TX visible
- [ ] `tel:` y WhatsApp abren acciones correctas

## Chat
- [ ] Botón RB abre chat; responde sobre productos sin inventar
- [ ] Pregunta de precio → no da precio; ofrece ventas + formulario lead
- [ ] Lead: nombre, teléfono, correo → mensaje de confirmación
- [ ] Origin no permitido → 403 (probar solo en API); rate limit no deja spam infinito

## Seguridad rápida
- [ ] DevTools: sin `console` con PII del formulario
- [ ] View source / Network: CSP meta presente; Formspree y Maps permitidos
- [ ] Sin API keys en el bundle cliente (`gsk_` no en assets JS)
- [ ] `server/chatHandlers.ts` no contiene `process.env`

## Build
- [ ] `npm run lint` exit 0
- [ ] `npm run build` exit 0

## Oleada 5 (Strangler) — local DoD
- [ ] App canónica en raíz; sin HTML estático rival en `main`
- [ ] Rama local `archive/static-legacy` existe (no push hasta orden)
- [ ] README documenta env Vercel para chat
- [ ] `/api/chat` responde en local con Origin válido
- [ ] Formulario contacto sigue OK
- [ ] **Push GitHub:** solo tras OK explícito del dueño
