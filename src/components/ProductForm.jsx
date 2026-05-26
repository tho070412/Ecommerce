import { useState, useEffect } from 'react'

const CATEGORIAS = ['Ropa', 'Electrónica', 'Hogar', 'Deportes', 'Juguetes', 'Otros']

const EMPTY = {
  nombre: '',
  precio: '',
  categoria: 'Ropa',
  stock: '',
  imagen: '',
}

export default function ProductForm({ initial = null, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) {
      setForm({
        nombre: initial.nombre || '',
        precio: initial.precio || '',
        categoria: initial.categoria || 'Ropa',
        stock: initial.stock ?? '',
        imagen: initial.imagen || '',
      })
    } else {
      setForm(EMPTY)
    }
    setErrors({})
  }, [initial])

  const validate = () => {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio.'
    if (form.precio === '' || Number(form.precio) < 0)
      errs.precio = 'Ingresa un precio válido (mayor o igual a 0).'
    if (form.stock === '' || Number(form.stock) < 0)
      errs.stock = 'Ingresa un stock válido (mayor o igual a 0).'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit({
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Nombre */}
      <div>
        <label className="block text-xs font-semibold text-dark mb-1.5">Nombre *</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ej: Camiseta Nike Dri-FIT"
          className="input-field"
          autoFocus
        />
        {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
      </div>

      {/* Precio + Stock */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-dark mb-1.5">Precio (COP) *</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            min="0"
            placeholder="Ej: 89000"
            className="input-field"
          />
          {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-dark mb-1.5">Stock *</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min="0"
            placeholder="Ej: 25"
            className="input-field"
          />
          {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
        </div>
      </div>

      {/* Categoria */}
      <div>
        <label className="block text-xs font-semibold text-dark mb-1.5">Categoría</label>
        <select name="categoria" value={form.categoria} onChange={handleChange} className="input-field">
          {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Imagen URL */}
      <div>
        <label className="block text-xs font-semibold text-dark mb-1.5">URL de imagen</label>
        <input
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          placeholder="https://... (opcional)"
          className="input-field"
        />
        <p className="text-muted text-xs mt-1">Deja vacío para usar imagen placeholder.</p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Guardando...' : initial ? 'Actualizar producto' : 'Agregar producto'}
        </button>
      </div>
    </form>
  )
}
