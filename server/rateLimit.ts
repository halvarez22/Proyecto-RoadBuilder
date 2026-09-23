/** Rate limiter en memoria — puro (sin process.env). Una instancia por proceso serverless. */

export type RateLimiter = {
  /** @returns true si permitido; false si excedió */
  check: (key: string) => boolean
}

export function createMemoryRateLimiter(opts: {
  windowMs: number
  max: number
}): RateLimiter {
  const hits = new Map<string, number[]>()

  return {
    check(key: string) {
      const now = Date.now()
      const windowStart = now - opts.windowMs
      const prev = (hits.get(key) || []).filter((t) => t > windowStart)
      if (prev.length >= opts.max) {
        hits.set(key, prev)
        return false
      }
      prev.push(now)
      hits.set(key, prev)
      return true
    },
  }
}
