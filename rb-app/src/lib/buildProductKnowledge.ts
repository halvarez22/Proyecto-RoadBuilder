import { listProducts } from '../data/products'

/** Resource textual para grounding del agente (anti-alucinación). */
export function buildProductKnowledge(): string {
  const products = listProducts()
  return products
    .map((p) => {
      const sectionsEs = p.sections
        .map((s) => {
          const items = s.items?.map((i) => `    - ${i}`).join('\n') ?? ''
          return `  ## ${s.title}\n  ${s.body}\n${items}`
        })
        .join('\n')
      const sectionsEn = p.sectionsEn
        .map((s) => {
          const items = s.items?.map((i) => `    - ${i}`).join('\n') ?? ''
          return `  ## ${s.title}\n  ${s.body}\n${items}`
        })
        .join('\n')
      return [
        `# ${p.title} (slug: ${p.slug})`,
        `ES subtitle: ${p.subtitle}`,
        `EN subtitle: ${p.subtitleEn}`,
        `ES summary: ${p.cardDesc}`,
        `EN summary: ${p.cardDescEn}`,
        `ES description: ${p.desc}`,
        `EN description: ${p.descEn}`,
        `ES bullets: ${p.bullets.join('; ')}`,
        `EN bullets: ${p.bulletsEn.join('; ')}`,
        `Sections ES:\n${sectionsEs}`,
        `Sections EN:\n${sectionsEn}`,
      ].join('\n')
    })
    .join('\n\n---\n\n')
}

export function buildSystemPrompt(lang: 'es' | 'en'): string {
  const knowledge = buildProductKnowledge()
  const isEn = lang === 'en'

  return [
    isEn
      ? 'You are RoadBuilder Technical Advisor, a chatbot for SX Systems / RoadBuilder ecological road products.'
      : 'Eres el Asesor Técnico RoadBuilder, chatbot de SX Systems / RoadBuilder (productos ecológicos para caminos).',
    '',
    'STRICT RULES (ISO security / no hallucinations):',
    '1. Answer ONLY using the PRODUCT KNOWLEDGE below. If unknown, say you do not have that data and offer sales contact.',
    '2. NEVER invent specifications, dosages, certifications, case studies, or performance numbers not in the knowledge.',
    '3. NEVER give prices, quotes, discounts, budgets, or commercial terms. If asked about price/cost/quote: refuse pricing and treat as a qualified lead.',
    '4. Qualified lead signals: price/quote requests, project intent, purchase intent, volume, "want to buy", "need a proposal", detailed project questions needing commercial follow-up.',
    '5. When you detect a qualified lead: offer to connect with sales staff. Ask for full name, phone, and email. Say sales will contact them shortly after they provide the data.',
    '6. When you need the user to fill contact fields in the UI, end your message with the exact token: [[COLLECT_LEAD]]',
    '7. Do not ask for credit cards or passwords. Do not discuss competitors unless briefly and only if in knowledge (usually not).',
    '8. Reply in the same language as the user (Spanish or English). Keep answers concise and professional (B2B).',
    '9. WhatsApp sales line: +52 614 704 1000. Office address: 101 Vintage Drive, Red Oak, TX 75154, USA. Phones: +52 474 742 1030 / 1031.',
    '',
    'PRODUCT KNOWLEDGE:',
    knowledge,
  ].join('\n')
}
