import { PRODUCTS, PRODUCT_ORDER, listProducts, getProduct } from '../src/data/products.ts'

const list = listProducts()
console.log('COUNT', list.length)
console.log('ORDER', PRODUCT_ORDER.join(','))
for (const p of list) {
  console.log([p.slug, p.title, p.img, 'cardDesc=' + p.cardDesc.length, 'sections=' + p.sections.length].join(' | '))
}
console.log('invalid_foo', getProduct('foo'))
console.log(
  'keys_match_order',
  Object.keys(PRODUCTS).sort().join(',') === [...PRODUCT_ORDER].sort().join(','),
)
