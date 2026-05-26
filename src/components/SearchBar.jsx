const CATEGORIAS = ['Todas', 'Ropa', 'Electrónica', 'Hogar', 'Deportes', 'Juguetes', 'Otros']

export default function SearchBar({ search, onSearch, categoria, onCategoria, total }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar por nombre..."
            className="input-field pl-9"
          />
        </div>

        {/* Category filter */}
        <select
          value={categoria}
          onChange={(e) => onCategoria(e.target.value)}
          className="input-field w-full sm:w-44"
        >
          {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <span className="text-muted text-sm whitespace-nowrap">
        {total} producto{total !== 1 ? 's' : ''}
      </span>
    </div>
  )
}
