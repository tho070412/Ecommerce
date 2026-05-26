import { formatPrice } from '../utils/helpers'

export default function StatsBar({ productos }) {
  const total = productos.length
  const sinStock = productos.filter((p) => p.stock === 0).length
  const stockBajo = productos.filter((p) => p.stock > 0 && p.stock <= 5).length
  const valorTotal = productos.reduce((acc, p) => acc + (p.precio * p.stock || 0), 0)

  const stats = [
    { label: 'Productos', value: total, icon: '📦', color: 'text-dark' },
    { label: 'Sin stock', value: sinStock, icon: '🚫', color: 'text-danger' },
    { label: 'Stock bajo', value: stockBajo, icon: '⚠️', color: 'text-warning' },
    { label: 'Valor inventario', value: formatPrice(valorTotal), icon: '💰', color: 'text-success', wide: true },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-surface border border-border rounded-2xl px-4 py-3 shadow-card">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-base">{s.icon}</span>
            <p className="text-muted text-xs font-medium">{s.label}</p>
          </div>
          <p className={`font-bold text-xl ${s.color} ${s.wide ? 'text-lg' : 'text-2xl'}`}>
            {s.value}
          </p>
        </div>
      ))}
    </div>
  )
}
