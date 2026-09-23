/**
 * Guard de origen — puro. El adaptador pasa la allowlist (no process.env aquí).
 */

export function isAllowedOrigin(
  origin: string | undefined,
  referer: string | undefined,
  allowedOrigins: string[],
): boolean {
  const o = (origin || '').trim()
  const r = (referer || '').trim()
  if (!o && !r) return false
  return allowedOrigins.some((base) => {
    const b = base.replace(/\/$/, '')
    return (o && (o === b || o.startsWith(b + '/'))) || (r && r.startsWith(b))
  })
}

/** Orígenes por defecto RoadBuilder (inyectar desde adaptador; lista editable vía env en adaptador). */
export const DEFAULT_ALLOWED_ORIGINS = [
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'http://127.0.0.1:4173',
  'http://localhost:4173',
  'https://proyecto-road-builder.vercel.app',
]
