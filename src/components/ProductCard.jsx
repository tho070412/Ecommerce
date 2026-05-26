import { getCategoryBadge, getStockClass, getStockLabel, formatPrice } from '../utils/helpers'

const PLACEHOLDER = 'https://placehold.co/400x300/f4f6fa/9ca3af?text=Producto'

export default function ProductCard({ producto, onEdit, onDelete }) {
  const { nombre, precio, categoria, stock, imagen } = producto

  return (
    <div className="card group animate-slide-up overflow-hidden">
      {/* Image */}
      <div className="relative h-44 bg-bg overflow-hidden">
        <img
          src={imagen || PLACEHOLDER}
          alt={nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
        <div className="absolute top-2.5 left-2.5">
          <span className={getCategoryBadge(categoria)}>{categoria}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-dark text-sm leading-snug mb-1 line-clamp-1">
          {nombre}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-primary text-base">{formatPrice(precio)}</span>
          <span className={`text-xs ${getStockClass(stock)}`}>
            {getStockLabel(stock)}
          </span>
        </div>

        {/* Stock bar */}
        <div className="h-1.5 bg-bg rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              stock === 0 ? 'bg-danger' : stock <= 5 ? 'bg-warning' : 'bg-success'
            }`}
            style={{ width: `${Math.min((stock / 50) * 100, 100)}%` }}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={() => onEdit(producto)} className="btn-ghost text-xs py-1.5 flex-1">
            Editar
          </button>
          <button onClick={() => onDelete(producto.id)} className="btn-danger text-xs py-1.5 flex-1">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
