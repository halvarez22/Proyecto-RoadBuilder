# ARCHIVE — static legacy (NO PRODUCCIÓN)

Esta rama conserva el monorepo / HTML estático histórico.

**No desplegar.** Canónica = `main` (SPA Vite) → Vercel.

## Verificación forense de secretos (2026-09-23)

- [x] Sin archivos `API KEY*.txt`, `.env.local`, `*GROQ*.txt` en el árbol
- [x] `git grep gsk_` solo menciones documentales (sin blobs de clave)
- [x] Sin `deploy-app/.env.local` versionado
