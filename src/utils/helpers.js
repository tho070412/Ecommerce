export function getCategoryBadge(categoria) {
  const map = {
    Ropa: 'badge-ropa',
    Electrónica: 'badge-electronica',
    Hogar: 'badge-hogar',
  }
  return map[categoria] || 'badge-default'
}

export function getStockClass(stock) {
  if (stock === 0) return 'stock-out'
  if (stock <= 5) return 'stock-low'
  return 'stock-ok'
}

export function getStockLabel(stock) {
  if (stock === 0) return 'Sin stock'
  if (stock <= 5) return `${stock} — Stock bajo`
  return String(stock)
}

export function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price)
}
