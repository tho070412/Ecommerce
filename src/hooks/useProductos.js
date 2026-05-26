import { useState, useEffect, useCallback } from 'react'
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/productosService'
import Swal from 'sweetalert2'

export function useProductos() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProductos()
      setProductos(data)
    } catch {
      setError('No se pudo conectar con la API. ¿Está corriendo JSON Server?')
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'Asegúrate de correr: json-server --watch db.json --port 3004',
        confirmButtonColor: '#4f46e5',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const addProducto = async (payload) => {
    try {
      const nuevo = await createProducto(payload)
      setProductos((prev) => [...prev, nuevo])
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al crear el producto.' }
    }
  }

  const editProducto = async (id, payload) => {
    try {
      const actualizado = await updateProducto(id, payload)
      setProductos((prev) => prev.map((p) => (p.id === id ? actualizado : p)))
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al actualizar el producto.' }
    }
  }

  const removeProducto = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Este producto será removido del catálogo permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
    })

    if (!result.isConfirmed) return { ok: false, cancelled: true }

    try {
      await deleteProducto(id)
      setProductos((prev) => prev.filter((p) => p.id !== id))
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'El producto fue removido del catálogo.',
        confirmButtonColor: '#4f46e5',
        timer: 2000,
        showConfirmButton: false,
      })
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al eliminar el producto.' }
    }
  }

  return { productos, loading, error, fetchAll, addProducto, editProducto, removeProducto }
}
    