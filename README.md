# RoadBuilder — Sitio canónico

SPA marketing **SX Systems / RoadBuilder** (React + Vite + Tailwind).

- **Producción:** https://proyecto-road-builder.vercel.app/
- **Repo:** https://github.com/halvarez22/Proyecto-RoadBuilder
- **Canónica:** esta app en la **raíz** del repo (no hay HTML estático paralelo en `main`).

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completar GROQ_API_KEY
npm run dev                  # http://127.0.0.1:5173
```

### Variables (`.env.local` — nunca commitear)

| Variable | Dónde | Uso |
|----------|-------|-----|
| `GROQ_API_KEY` | solo servidor | Chatbot (Vite middleware / Vercel `api/`) |
| `GROQ_MODEL` | servidor | default `openai/gpt-oss-120b` |
| `VITE_FORMSPREE_ENDPOINT` | build cliente | Formulario Contáctenos |
| `FORMSPREE_ENDPOINT` | Vercel (recomendado) | Persistencia de leads del chat en prod |
| `ALLOWED_ORIGINS` | servidor | Orígenes extra (CSV) además de localhost + dominio Vercel |

## Scripts

- `npm run dev` — desarrollo + `/api/chat` y `/api/lead` (plugin Vite)
- `npm run build` / `npm run preview`
- `npm run lint`

## Chat en Vercel

Las rutas `api/chat.ts` y `api/lead.ts` son Serverless. En el dashboard de Vercel configurar al menos:

- `GROQ_API_KEY`
- `FORMSPREE_ENDPOINT` (= mismo form que contacto, p.ej. `https://formspree.io/f/maenjadv`)
- opcional: `GROQ_MODEL`, `ALLOWED_ORIGINS`

Protecciones: allowlist Origin/Referer + rate limit por IP (exigencias forenses Oleada 5).

## Smoke

Checklist: [`docs/smoke.md`](docs/smoke.md)

## Legacy

- HTML estático / monorepo antiguo: rama `archive/static-legacy` (**no desplegar** en Vercel).
- `deploy-app`: **deprecado**; no recuperar.
- Brochures/PDF: ver `docs/assets/` o la rama archive.

Vercel solo debe auto-desplegar **`main`** (`vercel.json` → `git.deploymentEnabled`).

## Seguridad (mínimo)

- Cero secretos en el bundle cliente.
- Handlers de chat puros en `server/chatHandlers.ts` (sin `process.env` interno).
- CSP inyectada en build (`server/cspPlugin.ts`).
