import { useState, useMemo } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { useProductos } from '../hooks/useProductos'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'
import SearchBar from '../components/SearchBar'
import StatsBar from '../components/StatsBar'
import Swal from 'sweetalert2'

export default function ProductosPage() {
  const { productos, loading, error, fetchAll, addProducto, editProducto, removeProducto } = useProductos()

  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  const filtered = useMemo(() => {
    return productos.filter((p) => {
      const bySearch = p.nombre?.toLowerCase().includes(search.toLowerCase())
      const byCategoria = categoria === 'Todas' || p.categoria === categoria
      return bySearch && byCategoria
    })
  }, [productos, search, categoria])

  const openCreate = () => { setEditTarget(null); setShowModal(true) }
  const openEdit = (producto) => { setEditTarget(producto); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setEditTarget(null) }

  const handleSubmit = async (formData) => {
    setSaving(true)
    const result = editTarget
      ? await editProducto(editTarget.id, formData)
      : await addProducto(formData)
    setSaving(false)

    if (result.ok) {
      closeModal()
      Swal.fire({
        icon: 'success',
        title: editTarget ? 'Producto actualizado' : '¡Producto agregado!',
        timer: 1800,
        showConfirmButton: false,
        confirmButtonColor: '#4f46e5',
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.message,
        confirmButtonColor: '#4f46e5',
      })
    }
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-extrabold text-dark text-xl tracking-tight">Catálogo de productos</h1>
          <p className="text-muted text-sm mt-0.5">Gestiona el inventario de la tienda</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchAll} className="btn-ghost text-xs">↻ Actualizar</button>
          <button onClick={openCreate} className="btn-primary">+ Nuevo producto</button>
        </div>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div className="mb-6">
          <StatsBar productos={productos} />
        </div>
      )}

      {/* Search & Filter */}
      {!loading && !error && productos.length > 0 && (
        <div className="mb-5">
          <SearchBar
            search={search}
            onSearch={setSearch}
            categoria={categoria}
            onCategoria={setCategoria}
            total={filtered.length}
          />
        </div>
      )}

      {/* Content */}
      {loading && <Spinner label="Cargando productos..." />}

      {!loading && error && (
        <div className="text-center py-16 border-2 border-dashed border-red-200 rounded-2xl">
          <p className="text-danger text-sm mb-2 font-medium">{error}</p>
          <p className="text-muted text-xs mb-4">
            Ejecuta: <code className="bg-bg px-2 py-0.5 rounded text-dark">json-server --watch db.json --port 3004</code>
          </p>
          <button onClick={fetchAll} className="btn-ghost">Reintentar</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl">
          <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-muted text-sm mb-1">
            {productos.length === 0
              ? 'No hay productos en el catálogo.'
              : 'Ningún producto coincide con la búsqueda.'}
          </p>
          {productos.length === 0 && (
            <button onClick={openCreate} className="btn-primary mt-4">
              Agregar primer producto
            </button>
          )}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onEdit={openEdit}
              onDelete={removeProducto}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal
          title={editTarget ? 'Editar producto' : 'Nuevo producto'}
          onClose={closeModal}
        >
          <ProductForm
            initial={editTarget}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            loading={saving}
          />
        </Modal>
      )}
    </DashboardLayout>
  )
}
