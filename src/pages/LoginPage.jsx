import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveSession, isAuthenticated } from '../utils/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ usuario: '', pin: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPin, setShowPin] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) navigate('/productos', { replace: true })
  }, [navigate])

  const validate = () => {
    const errs = {}
    if (!form.usuario.trim()) errs.usuario = 'Ingresa tu nombre de usuario.'
    if (!form.pin.trim()) errs.pin = 'Ingresa un PIN.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      saveSession({ usuario: form.usuario.trim(), pin: form.pin })
      navigate('/productos', { replace: true })
    }, 500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      {/* Decorative */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl shadow-lg mb-4">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="font-extrabold text-dark text-2xl tracking-tight">
            Admin<span className="text-primary">Shop</span>
          </h1>
          <p className="text-muted text-sm mt-1">Panel de administración de inventario</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-modal">
          <h2 className="font-bold text-dark text-base mb-1">Acceso administrativo</h2>
          <p className="text-muted text-xs mb-5">Ingresa tus credenciales para continuar</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-dark mb-1.5">
                Nombre de usuario
              </label>
              <input
                name="usuario"
                value={form.usuario}
                onChange={handleChange}
                placeholder="Ej: admin"
                autoFocus
                className="input-field"
              />
              {errors.usuario && <p className="text-red-500 text-xs mt-1">{errors.usuario}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-dark mb-1.5">PIN</label>
              <div className="relative">
                <input
                  name="pin"
                  type={showPin ? 'text' : 'password'}
                  value={form.pin}
                  onChange={handleChange}
                  placeholder="Cualquier PIN"
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPin((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark transition-colors"
                >
                  {showPin ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin}</p>}
              <p className="text-muted text-xs mt-1">Puedes ingresar cualquier PIN (es simulación).</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando...
                </>
              ) : 'Ingresar al panel'}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-xs mt-4">
          
        </p>
      </div>
    </div>
  )
}
