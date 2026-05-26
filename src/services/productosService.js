import axios from 'axios'


const BASE_URL = 'https://ecommerce-api-7o63.onrender.com/productos'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export async function getProductos() {
  const { data } = await api.get('/')
  return data
}

export async function createProducto(payload) {
  const { data } = await api.post('/', payload)
  return data
}

export async function updateProducto(id, payload) {
  const { data } = await api.put(`/${id}`, payload)
  return data
}

export async function deleteProducto(id) {
  const { data } = await api.delete(`/${id}`)
  return data
}
