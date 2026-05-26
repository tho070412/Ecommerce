import { useNavigate } from 'react-router-dom'
import { getSession, clearSession } from '../utils/auth'
import Swal from 'sweetalert2'

export default function Navbar() {
  const navigate = useNavigate()
  const session = getSession()

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#6b7280',
    })
    if (result.isConfirmed) {
      clearSession()
      navigate('/login')
    }
  }

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-dark text-base leading-none">Admin</span>
            <span className="font-bold text-primary text-base leading-none">Shop</span>
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-dark font-semibold text-sm leading-tight">{session?.usuario}</span>
            <span className="text-muted text-xs">Administrador</span>
          </div>
          <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-sm">
              {session?.usuario?.[0]?.toUpperCase()}
            </span>
          </div>
          <button onClick={handleLogout} className="btn-ghost text-xs py-1.5 px-3">
            Salir
          </button>
        </div>
      </div>
    </nav>
  )
}
