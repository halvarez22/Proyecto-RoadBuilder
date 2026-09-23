# Plan APO revisado — RoadBuilder (post-auditoría forense)

**Estado:** pendiente de aprobación — evidencia forense adjuntada  
**Superficie de trabajo oleadas 0–4:** `rb-app/`  
**Marco:** ISO/IEC 27034-1 · SQA · MCP · harness `.cursor/rules/roadbuilder-harness.mdc`  
**Fecha evidencia:** 2026-09-23

---

## 0. Limitaciones de evidencia (transparencia)

| Afirmación previa | Estado forense |
|-------------------|----------------|
| Secreto en disco | **DEMOSTRADO** (archivo + `gsk_` + `deploy-app/.env.local`) |
| Secreto en historial git | **DEMOSTRADO AUSENTE** en repo padre (`git log` vacío; archivo `??` untracked) |
| Form fake + UI éxito | **DEMOSTRADO** (código `onSubmit` + UI `formik.status`) |
| Hero 6.29 MB PNG + CSS bg | **DEMOSTRADO** (stat + signature PNG + `Hero.tsx`) |
| LCP runtime (Lighthouse) | **NO MEDIDO** — gap aceptado; oleada 2 incluye medición Lighthouse post-fix |
| Catálogo duplicado + drift desc | **DEMOSTRADO** (mismos títulos/imgs; `desc` distinto) |
| Lint no operable | **DEMOSTRADO** (`npm run lint` falla ESLint 9 sin config) |
| 3 superficies | **DEMOSTRADO** (raíz HTML, `rb-app`, `deploy-app` +953 líneas vs rb-app) |

---

## 1. Inventario ASC de terceros (`rb-app` actual)

| ID ASC | Tercero | Origen / evidencia | Datos que recibe | Riesgo | Control planificado |
|--------|---------|--------------------|------------------|--------|---------------------|
| T1 | Google Fonts | **Self-host** Outfit en `/fonts/*.woff2` (oleada 2.1) | — | Bajo | Sin request a Google Fonts |
| T2 | Google Maps Embed | `Contact.tsx` iframe → `google.com/maps?...output=embed` | IP, referrer, ubicación consultada | Tercero / tracking | CSP `frame-src` allowlist |
| T3 | Formspree | `submitContact` → `https://formspree.io/f/maenjadv` (env `VITE_FORMSPREE_ENDPOINT`) | PII: name, email, phone, message | PII en tránsito | HTTPS; Yup + Tool; disable submit; CSP `connect-src` |
| T4 | Analytics | **Ausente** en `rb-app/src` | — | — | No añadir sin ASC + aprobación |
| T5 | Groq / chatbot | Proxy Vite `/api/chat` (key solo servidor `.env.local`) | Mensajes chat (no PII de form a Groq salvo lo que el usuario escriba) | Secreto / PII en prompt | Key no en bundle; rotación pendiente (deuda dueño) |

**CSP actual:** inyectada por `server/cspPlugin.ts` en `index.html` (dev + build).

---

## 2. Auditoría Anti-Data-Leak / idempotencia (código actual)

| Control | Evidencia | Resultado |
|---------|-----------|-----------|
| `console.log` PII en Contact | `grep console.` → **sin matches** | OK hoy |
| Analytics PII | grep vacío | OK hoy |
| UI éxito sin envío | `setStatus('Gracias…')` + reset | **VIOLACIÓN integridad comercial** |
| `isSubmitting` / `disabled` | grep vacío | **VIOLACIÓN idempotencia** (relevante al cablear destino) |
| Destino servidor | `fetch\|formspree\|mailto` en `src/` → **vacío** | Zero Trust incompleto |

---

## 3. Diagnóstico (semáforos — validados)

| Pilar | Semáforo | Base forense |
|-------|----------|--------------|
| ISO 27034-1 | Rojo | G1 disco; G2 fake; sin CSP; terceros sin inventario previo |
| SQA | Rojo | lint falla; 0 tests app; 3 superficies |
| MCP | Rojo | sin Tool/Resource |
| Performance | Rojo | peso disco + carga CSS (LCP runtime TBD) |
| UX | Ámbar | CTAs OK; lead falso; nav `hidden sm:flex` |
| Modularidad | Ámbar | `cards` + `PRODUCTS` + Benefits copy |

---

## 4. Oleadas revisadas (controles harness incluidos)

### Oleada 0 — Secretos (ISO ASC org) | S
**Acciones**
1. **Usuario rota** clave GROQ en consola Groq **antes** de borrar archivos (Cursor no puede rotar la cuenta).
2. Eliminar `API KEY GROQ_ROAD BUILDER CHAT BOT.txt` del workspace.
3. Ampliar `.gitignore` raíz: patrón explícito para `*API KEY*`, `*GROQ*`, `*.pem` (`.env*` ya existe L10–12).
4. `deploy-app/.env.local`: ya ignorado por `deploy-app/.gitignore`; tras rotación, regenerar env local sin commitear.

**Verificación explícita**
- [ ] `git log --all --full-history -- "**/API KEY GROQ*.txt"` sigue vacío
- [ ] `rg gsk_` en repo → 0 hits (o solo docs redactados)
- [ ] `git status` sin el `.txt`
- [ ] Confirmación usuario: clave rotada en Groq

**Nota forense:** historial git padre **no** contiene el secreto → repo no comprometido vía commits; rotar sigue siendo obligatorio por exposición en disco/workspaces.

### Oleada 1 — Contacto Tool + Zero Trust + CSP base | M
**Depende de decisión usuario:** Formspree (ID) | otro | mailto temporal.

**Acciones**
1. Resource/Tool: `rb-app/src/lib/submitContact.ts` — inputs tipados, `Result<ok|error>`, **cero** log de PII.
2. Validación:
   - Cliente: Yup (ya existe).
   - Destino: documentar que el proveedor revalida (Formspree: validación servidor + rate limit propios).
   - Fallback UI: error tipado si red/4xx/5xx; **nunca** éxito si `!ok`.
3. Contact UI: `isSubmitting`, `disabled`, `htmlFor`/`id`, `role="alert"`, `tel:` (número aprobado).
4. **CSP meta o headers de hosting** (mínimo):
   - `default-src 'self'`
   - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` (o self-host)
   - `font-src 'self' https://fonts.gstatic.com`
   - `frame-src https://www.google.com`
   - `connect-src 'self' https://formspree.io` (si aplica)
   - `img-src 'self' data: https:` (ajustar)
5. Actualizar inventario ASC (T3 activo).

**Verificación**
- [x] Envío de prueba real recibido en bandeja/Formspree (2026-09-23)
- [x] Doble clic → un solo request / botón disabled (`isSubmitting`)
- [x] Fallo → mensaje error tipado, sin “Gracias” si `!ok`
- [x] `console` limpio de PII en DevTools (sin logs de payload)
- [x] CSP presente vía `cspPlugin` (Maps `frame-src`, Formspree `connect-src`, fonts self)

### Oleada 2 — Performance (peso + LCP medido) | M
1. Hero ≤400 KB WebP/AVIF; `<picture>`/`img` + `fetchpriority="high"` + preload; quitar `background-image` PNG.
2. Product images WebP/JPEG bajo presupuesto.
3. Videos: `preload="none"` (+ lazy viewport opcional).
4. **Medición:** Lighthouse (mobile) pre/post — registrar LCP ms y peso transferido del LCP element.

**Verificación**
- [ ] Archivo hero ≤400 KB en disco
- [ ] Lighthouse LCP reportado en el PR/plan (evidencia runtime)
- [ ] Smoke visual Home
- [ ] Videos no disparan descarga completa al load (Network panel)

### Oleada 3 — Resource productos MCP | M
1. `src/data/products.ts` única fuente (listado + detalle).
2. Benefits puede referenciar IDs del Resource (no redefinir catálogo).
3. Slug inválido → no-encontrado (no fallback TSW).

**Verificación**
- [ ] Un solo módulo define slugs/títulos/imgs
- [ ] Paridad 4 productos; checklist ARO firmado en PR
- [ ] `/product/foo` no muestra TSW

### Oleada 4 — SQA higiene + UX | S–M
1. ESLint flat config; `npm run lint` exit 0.
2. Remover `leaflet` / `react-leaflet`.
3. Navbar móvil; SEO meta básicos; flags huérfanos fuera si no hay i18n.
4. Checklist smoke documentado en repo (`docs/smoke.md` o sección plan).

**Verificación**
- [x] lint verde (`eslint.config.js` flat + `npm run lint`)
- [x] `rg leaflet` en src/package = 0; deps removidas
- [x] Navbar móvil hamburger + Escape; SEO meta/OG en `index.html`
- [x] Smoke: `rb-app/docs/smoke.md`
- [x] Smoke rutas: Home, 4 fichas, anclas, contacto, nav móvil (checklist)

### Oleada 5 — Strangler (plan hijo) | L
Decisión explícita del usuario sobre estático + `deploy-app` (deprecar / migrar features / mantener legacy).  
**Prohibido** big-bang en el mismo PR que 0–4.

> **Plan APO completo (2026-09-23):** ver **§10** abajo. Ejecución **solo local** hasta aprobación de push a GitHub.

---

## 5. Zero Trust — documentación Formspree (si se elige)

| Capa | Qué hace | Evidencia a citar en DoD |
|------|----------|---------------------------|
| Cliente | Yup + tipos Tool | Contact.tsx + submitContact.ts |
| Tránsito | HTTPS a Formspree | Network tab |
| Servidor Formspree | Validación de campos, spam/rate limits del SaaS | Docs Formspree + prueba de payload inválido rechazado o no-éxito local |
| App | No marcar éxito si response no OK; errores tipados; disable submit | Código + prueba manual |
| Fallback | Si Formspree cae: mensaje “no se pudo enviar, intente o llame `tel:`” | UI |

`mailto:` temporal: documentar como **degradación** (abre cliente de correo; no garantiza entrega ni rate limit); aún así prohibido éxito falso.

---

## 6. Orden de oleadas (respuesta a auditoría)

- **0+1 juntas en prioridad seguridad** (pueden ejecutarse en secuencia inmediata en la misma sesión tras aprobación).
- **2 (performance) antes que 4 (lint)** porque LCP/peso es defecto de producción visible; lint es higiene SQA — **no sustituye** 0+1.
- Harness: seguridad primero → luego calidad estructural; performance es ASC de disponibilidad/experiencia pero no antecede a secretos/PII.

---

## 7. Decisiones del propietario (2026-09-23)

| # | Tema | Decisión | Impacto en plan |
|---|------|----------|-----------------|
| 1 | GROQ | **Se conserva para pruebas** — no rotar/eliminar en esta fase | Oleada 0 **DIFERIDA** (excepción explícita del dueño; riesgo ISO aceptado temporalmente) |
| 2 | Formulario / mails | **Dejar como está** — se resolverá después | Oleada 1 (Tool + destino real) **DIFERIDA** |
| 3 | Teléfonos | **Se quedan** los del sitio estático: `+524747421030`, `+524747421031` | Autorizados para `tel:` cuando se toque Contact/Footer |
| 4 | Canónica | **SPA Vite en raíz de `Proyecto-RoadBuilder` + Vercel** (confirmación Oleada 5) | Estático HTML y `deploy-app` = legacy; no compiten en producción |
| 5 | Baseline Lighthouse | Pendiente | Requerido antes/durante oleada 2 |

**Estado ejecución:** Oleada 0+1 completa **DIFERIDA**.  
**Mitigación mínima (2026-09-23):** EJECUTADA — eliminado `.txt` de API key en raíz; mensaje de form sin éxito falso; `tel:` en Contact + Footer; `.gitignore` reforzado. Clave en `deploy-app/.env.local` se conserva para pruebas (decisión del dueño).  
**Oleada 2 Performance (2026-09-23):** EJECUTADA (assets) — ver §8.  
**Sub-oleada 2.1 LCP (2026-09-23):** EJECUTADA — ver §8.1. Lighthouse **simulado** móvil LCP **2.7 s** (meta &lt;2.5 s pendiente ~0.2 s); **observed** LCP **80 ms** en el mismo run.

**Nota ISO 27034:** conservar clave GROQ en `.env.local` contradice ASC org ideal; queda como deuda aceptada hasta nueva orden.


---

## 8. Evidencia Oleada 2 — Performance

### Baseline disco (pre)
| Asset | KB |
|-------|-----|
| roadbuilder_7.png (hero) | 6437.5 |
| Top-Seal White (TSW).png | 5871.7 |
| SX Fog / Prime PNG | 962.7 / 414.5 |
| public/ total | **56.68 MB** |
| Lighthouse pre | **No ejecutado** (optimización sobre baseline de disco; gap declarado) |

### Post (medido)
| Asset | KB | Budget |
|-------|-----|--------|
| media/hero.webp | **98.5** | ≤400 ✅ |
| media/hero-768.webp | **36.4** | móvil ✅ |
| media/tsw.webp | 44.4 | ✅ |
| media/sx-fog.webp | 64.8 | ✅ |
| media/sx-prime.webp | 13.1 | ✅ |
| media/tsb.webp | 26.3 | ✅ |
| public/ total | **43.49 MB** (videos siguen ≈43 MB; imágenes LCP/catálogo reducidas) | |

### Código
- Hero: `<picture>` + `fetchPriority="high"` (sin `background-image` PNG)
- `index.html`: preload `/media/hero.webp`
- Products + ProductDetail → `/media/*.webp`
- Videos: `preload="none"`
- PNG/JPG foto originales pesados eliminados de `public/`

### Lighthouse mobile post (`npx lighthouse` → `rb-app/lighthouse-post.json`)
| Métrica | Valor |
|---------|--------|
| Performance score | 82 |
| LCP | 4059 ms (4.1 s) |
| CLS | 0 |
| FCP | 2434 ms |
| Total byte weight | 540.5 KB |

**Nota:** LCP simulado aún alto por JS/fonts/throttling; el asset LCP cumple presupuesto de peso. Mejora adicional (self-host fonts, code-split) = oleada futura.

---

## 8.1 Sub-oleada 2.1 — Reducción LCP (evidencia)

### Baseline pre (documentado)
| Fuente | Valor |
|--------|--------|
| Lighthouse pre Oleada 2 | **No existía** (gap declarado) |
| Lighthouse post Oleada 2 (pre-2.1) | LCP simulado **4059 ms**, score 82 (`lighthouse-post.json`) |
| Estimación pre-assets | Hero 6437 KB ≈ 6.29 MB; a ~1.6 Mbps (lab móvil) solo descarga del PNG ≈ **31 s** teórica → LCP pre-assets mucho peor que 4.1 s |

### Acciones 2.1
1. Self-host Outfit (`public/fonts/*.woff2`) — **0** requests a `fonts.googleapis.com` / `gstatic`
2. Lazy `Benefits` / `Products` / `Videos` / `Contact` / `ProductDetail` — main JS **170 KB** (gzip ~56 KB) vs ~373 KB previo
3. Shell HTML `#lcp-shell` con `<picture>` hero (LCP sin esperar React)
4. Fallback JPEG en `<picture>`; logo WebP 14 KB
5. Framer Motion fuera del Hero (solo chunks below-fold)
6. Preload hero responsive (`media=`) + font 900

### Lighthouse mobile post-2.1 (`lighthouse-post-2.1.json`)
| Métrica | Simulado (lab) | Observed (mismo run) |
|---------|----------------|----------------------|
| Performance | **94** | — |
| LCP | **2747 ms (2.7 s)** | **80 ms** |
| FCP | 1603 ms | 53 ms |
| CLS | 0.077 | 0.077 |
| Bytes | ~382 KB | — |
| Google Fonts | **0** | **0** |

### Cumplimiento meta &lt;2.5 s
- Lab simulado: **NO** (2.7 s; faltan ~0.2 s; mejora vs 4.1 s = **−32%**)
- Observed: **SÍ** (80 ms)

### Picture fallback (verificación)
`Hero` / `#lcp-shell`: `source` WebP + `source` JPEG + `<img src="/media/hero.jpg">`.

---

## 9. Oleada 3 — Resource productos (ARO + evidencia)

### ARO (antes de consolidar)
| Ítem | Detalle |
|------|---------|
| Firma legacy | `cards[]` en `Products.tsx`; `PRODUCTS` Record en `ProductDetail.tsx`; fallback `PRODUCTS['tsw']` |
| Dependencias | Rutas `/`, `/product/:slug`; Links “Saber más”; imgs `/media/*.webp` |
| Efectos secundarios | Benefits.tsx menciona productos en copy de marketing — **no** es catálogo; se deja fuera del Resource |
| Riesgo | Drift de copy al editar un solo lado; SEO falso por fallback TSW |
| Paridad objetivo | Mismos 4 slugs, títulos, imgs WebP; `cardDesc` = antiguos resúmenes de tarjeta; detalle = antiguo `PRODUCTS` |

### Cambios
- **Nuevo Resource:** `rb-app/src/data/products.ts` (`PRODUCTS`, `listProducts`, `getProduct`, `PRODUCT_ORDER`)
- `Products.tsx` → `listProducts()`
- `ProductDetail.tsx` → `getProduct(slug)`; slug inválido → UI **404** (sin fallback TSW)

### Checklist paridad
- [x] tsw, tsb, sx-prime, sx-fog
- [x] Títulos idénticos a legacy
- [x] Imágenes `/media/*.webp`
- [x] cardDesc = textos cortos del grid Home
- [x] Secciones/bullets del detalle preservados


---

### 10.0 Aprobación del dueño + blindaje forense (2026-09-23)

**Estado ejecución:** APROBADO — D1–D6 confirmados + 3 exigencias forenses.  
**Push GitHub:** prohibido hasta orden explícita post–DoD local (D6).

| Decisión | Valor |
|---------|--------|
| D1 Canónica SPA+Vercel | Sí |
| D2 Archive HTML estático | Sí (`archive/static-legacy`) |
| D3 Deprecar deploy-app | Sí |
| D4 Brochures fuera del código app | Sí (`docs/assets` y/o rama archive) |
| D5 Chat en Vercel | Sí |
| D6 Push solo post-DoD local | Sí |

**Exigencias forenses no negociables (obligatorias en 5.2 / 5.4):**

1. **Anti-abuso `/api/chat`:** Origin/Referer allowlist **y** rate limit en memoria por IP (ventana corta). Ambos en adaptadores; lógica de límite en módulo puro inyectable.
2. **`server/chatHandlers.ts` puro:** TypeScript agnóstico; **no** lee `process.env`. `apiKey`, `model`, orígenes y persistencia de lead se inyectan desde el adaptador (Vite o Vercel).
3. **Sanitización archive:** Antes/al crear `archive/static-legacy`, verificar ausencia de `API KEY*.txt`, `.env.local` y blobs `gsk_` reales (menciones documentales `gsk_` en markdown OK). Evidencia en §10.10.

---

### 10.1 Contexto forense (hoy)

| Superficie | Dónde está | Rol |
|------------|------------|-----|
| **SPA canónica** | Disco + `origin/main` + Vercel (`proyecto-road-builder.vercel.app`) — app en **raíz** (`src/`, `package.json`, `server/`) | Producción / desarrollo activo |
| **Monorepo legacy** | Solo historial git rama `backup/rb-app-improved` (`index.html`, `tsw.html`, `main.js`, `rb-app/`, brochures, presentacion…) | Archivo; **no** debe volver a competir en `main` |
| **`deploy-app/`** | Ausente en disco actual (era untracked; no está en GitHub canónico) | Legacy muerto salvo recuperación explícita |
| **Carpeta `rb-app/` residual** | Puede existir en disco (p.ej. `node_modules` huérfanos) | Limpiar; no es la app canónica |

**Gap producción conocido:** chat `/api/chat` y `/api/lead` viven en plugin Vite (`server/chatProxyPlugin.ts`) → **404 en Vercel**. Formspree (contacto) sí funciona en prod. Esto entra en Oleada 5 como **paridad prod** del strangler, no como feature nueva de marketing.

### 10.2 Objetivo de negocio (no técnico)

Una sola web oficial. Nada de “tres RoadBuilders”. Lo viejo se archiva. Lo nuevo (Vercel) debe poder hacer lo mismo que local en lo crítico (incluido el chatbot, con claves solo en servidor).

### 10.3 Decisiones a confirmar (dueño) — checklist de aprobación APO

Antes de código, el dueño confirma:

| # | Pregunta | Propuesta por defecto (recomendada) |
|---|----------|-------------------------------------|
| D1 | ¿La canónica es la SPA en raíz + Vercel? | **Sí** |
| D2 | ¿El HTML estático (`tsw.html`, `main.js`, etc.) se archiva y no se publica? | **Sí** — conservar solo en rama `archive/static-legacy` o tag; no en `main` |
| D3 | ¿`deploy-app` se declara deprecado sin recuperar? | **Sí**, salvo que el dueño pida recuperar algo concreto |
| D4 | ¿Brochures/PDF/PPT del monorepo se mueven a carpeta `docs/assets` o repo aparte? | **Fuera de `main` app** o `docs/` read-only; no bloquean strangler |
| D5 | ¿Chatbot debe funcionar en Vercel en esta oleada? | **Sí** (paridad local↔prod) |
| D6 | ¿Push a GitHub solo al cerrar DoD local? | **Sí** (orden del dueño 2026-09-23) |

### 10.4 Amenazas / ASC (ISO 27034-1)

| Amenaza | ASC |
|---------|-----|
| Publicar legacy por error (HTML viejo o `deploy-app`) | Una sola superficie en `main`; rama archive aislada; README “canónica = Vercel SPA” |
| Exponer `GROQ_API_KEY` en cliente o en git | Solo env de Vercel / `.env.local`; cero `VITE_` para Groq; rotación sigue deuda aceptada |
| PII de leads en logs de serverless | Mismo Anti-Data-Leak: no `console` de PII; lead a archivo/servicio acotado o Formspree |
| Drift de copy entre archive y SPA | Archive = read-only; Resource `src/data/products.ts` única fuente viva |
| `/api/*` abierto a abuso | Rate limit básico + validación Zero Trust en handler serverless |

### 10.5 ARO — Chat en producción (si D5 = sí)

| Ítem | Detalle |
|------|---------|
| Firma local hoy | `POST /api/chat`, `POST /api/lead` vía middleware Vite |
| Dependencias | `GROQ_API_KEY`, `buildSystemPrompt` / products Resource, `submitChat`/`submitLead` clientes |
| Efecto secundario | Vercel no ejecuta `configureServer` de Vite → 404 |
| Paridad objetivo | Mismos contratos JSON; mismos tokens `[[COLLECT_LEAD]]`; Formspree contacto intacto |
| Riesgo | Duplicar lógica; secretos en edge mal configurados |

**Enfoque Strangler (atómico):**

1. Extraer handlers a módulo compartido `server/chatHandlers.ts` (o `api/_lib/`) consumible por Vite plugin **y** por funciones Vercel.  
2. Añadir `api/chat.ts` + `api/lead.ts` (Vercel Serverless) sin borrar el plugin local hasta smoke verde.  
3. Configurar en Vercel (UI): `GROQ_API_KEY`, `GROQ_MODEL`, `VITE_FORMSPREE_ENDPOINT` (este último ya build-time).  
4. Actualizar CSP `connect-src` si el origen de API cambia (mismo origen en Vercel → `'self'` basta).  
5. Smoke local (`vite`) + `vercel dev` o deploy preview **antes** de push a `main` si el dueño lo pide; si trabajo es 100% local primero: smoke `vite` + checklist, push, verificar prod.

### 10.6 Pasos de ejecución (orden estricto)

| Paso | Concern | Acciones | Verificación |
|------|---------|----------|--------------|
| **5.0** | Aprobación APO | Dueño confirma D1–D6 | Checklist §10.3 marcado |
| **5.1** | Inventario + limpieza disco | Documentar residual `rb-app/`; eliminar huérfanos no trackeados; no tocar secrets | `git status` limpio de basura; app arranca desde raíz |
| **5.2** | Archive legacy | Crear rama `archive/static-legacy` desde `backup/rb-app-improved` (o tag); README en archive: “no usar en prod” | Rama/tag existe; `main` sin HTML estático competidor |
| **5.3** | Documentación canónica | `README.md` raíz: qué es la app, env, smoke, Vercel; apuntar `docs/smoke.md` | README legible no técnico + técnico |
| **5.4** | Chat serverless (D5) | Extracción + `api/chat` + `api/lead`; gemelo de prueba / checklist paridad | Local chat OK; preview/prod `/api/chat` ≠ 404 |
| **5.5** | Env Vercel | Guía en README; dueño pega `GROQ_API_KEY` en dashboard | Chat prod responde; sin key en git |
| **5.6** | Deprecar deploy-app | Nota en plan/README: no mantener; no reintroducir | Sin carpeta en `main` |
| **5.7** | Smoke local DoD | Ejecutar `docs/smoke.md` + chat + form | Checklist firmado en plan |
| **5.8** | Push GitHub | **Solo tras OK del dueño** | `main` en GitHub = local; Vercel redeploy; URL smoke |

### 10.7 Criterios de aceptación (DoD Oleada 5)

- [ ] Una sola app en `main` (SPA raíz); sin HTML estático de marketing paralelo
- [ ] Legacy accesible solo vía `archive/*` o tag (no desplegado)
- [ ] `deploy-app` no forma parte del producto canónico
- [ ] README canónico + smoke actualizado
- [ ] Chat funciona en **local y Vercel** (si D5=sí) sin key en bundle
- [ ] Formspree contacto intacto
- [ ] CSP no rota Maps/Formspree
- [ ] Push a GitHub **explícitamente autorizado** tras DoD local

### 10.8 Fuera de alcance (esta oleada)

- Rotación GROQ (sigue deuda Oleada 0)
- LCP lab &lt; 2.5 s
- Cambiar destinatario Formspree a `avelasco@o3mexico.com` (operativo Formspree, no código)
- Rediseño visual / nuevos productos
- Migrar brochures a CMS

### 10.9 Orden con el dueño (acordado)

1. ~~Aprobar este APO (§10.3)~~ → **HECHO** (D1–D6 + 3 exigencias forenses)
2. ~~Ejecutar 5.1–5.7 **en local**~~ → **HECHO** (código + archive + docs); falta key GROQ del dueño para smoke chat 200
3. Demo / smoke con dueño ← **AQUÍ**
4. **Entonces** commit + push a GitHub / Vercel (D6)

### 10.10 Evidencia ejecución local (2026-09-23)

- [x] Exigencia 1: Origin allowlist + rate limit (Vite + `api/*`); evil Origin → 403
- [x] Exigencia 2: `server/chatHandlers.ts` sin lectura de `process.env` (inyección desde adaptadores)
- [x] Exigencia 3: escaneo `archive/static-legacy` / backup — sin `.env.local` ni `API KEY*.txt`; `gsk_` solo docs
- [x] Rama local `archive/static-legacy` + `ARCHIVE_README.md` en esa rama
- [x] `README.md`, `docs/assets/`, `vercel.json`, `api/chat.ts`, `api/lead.ts`
- [x] Formspree smoke 200
- [ ] Chat 200 local: `.env.local` tiene `GROQ_API_KEY` vacío — **pegar clave y re-probar**
- [ ] Push: **no ejecutado** (esperando orden post-DoD)
