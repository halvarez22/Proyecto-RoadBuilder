import type { Plugin } from 'vite'

/**
 * ASC: CSP base (ISO 27034-1).
 * Dev: relaja script/connect para HMR de Vite.
 * Prod: allowlist estricta (self, Formspree, Maps embed).
 * Nota: frame-ancestors solo aplica como header HTTP de hosting; en meta el resto sí.
 */
export function cspPlugin(): Plugin {
  return {
    name: 'roadbuilder-csp',
    transformIndexHtml(html, ctx) {
      const isDev = Boolean(ctx.server)
      const directives = [
        "default-src 'self'",
        isDev ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'" : "script-src 'self'",
        "style-src 'self' 'unsafe-inline'",
        "font-src 'self'",
        "img-src 'self' data: blob:",
        "media-src 'self'",
        isDev
          ? "connect-src 'self' https://formspree.io ws: wss:"
          : "connect-src 'self' https://formspree.io",
        "frame-src https://www.google.com https://maps.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self' https://formspree.io",
        'upgrade-insecure-requests',
      ]
      const meta = `<meta http-equiv="Content-Security-Policy" content="${directives.join('; ')}" />`
      if (html.includes('http-equiv="Content-Security-Policy"')) return html
      return html.replace(/<head>/i, `<head>\n    ${meta}`)
    },
  }
}
