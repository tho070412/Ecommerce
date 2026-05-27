# AdminShop — Panel Administrativo de E-Commerce

Dashboard administrativo desarrollado en React para gestionar el catálogo de productos de una tienda en línea, con control de inventario, stock y precios.

## 🚀 Demo en producción
https://ecommerce-two-phi-87.vercel.app/

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| react-router-dom v6 | Enrutamiento SPA |
| Tailwind CSS v3 | Estilos |
| SweetAlert2 | Alertas y confirmaciones |
| Axios | Peticiones HTTP |
| JSON Server | API REST simulada |
| LocalStorage | Persistencia de sesión |

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductForm.jsx
│   ├── ProtectedRoute.jsx
│   ├── SearchBar.jsx
│   ├── Spinner.jsx
│   └── StatsBar.jsx
├── hooks/
│   └── useProductos.js
├── layouts/
│   └── DashboardLayout.jsx
├── pages/
│   ├── LoginPage.jsx
│   └── ProductosPage.jsx
├── services/
│   └── productosService.js
└── utils/
    ├── auth.js
    └── helpers.js
```

## ⚙️ Instalación local

### 1. Clonar e instalar
```bash
https://github.com/tho070412/Ecommerce.git
cd ecommerce-admin
npm install
```

### 2. Instalar JSON Server
```bash
npm install -g json-server
```


```

### 4. Correr la app (Terminal 2)
```bash
npm run dev
```

## ✨ Funcionalidades

- 🔐 Login con usuario + PIN (LocalStorage)
- 🛡️ Rutas protegidas
- 📦 Grid de productos con imágenes
- ➕ Crear producto con validación (precio y stock ≥ 0)
- ✏️ Editar cualquier campo del producto
- 🗑️ Eliminar con confirmación SweetAlert2 + alerta de éxito
- 📊 Estadísticas: total, sin stock, stock bajo, valor del inventario
- 🔍 Buscador por nombre + filtro por categoría
- 📈 Barra visual de stock por producto
- ⏳ Spinner durante peticiones HTTP
- 📱 Diseño responsivo (2 col móvil, 4 col escritorio)

## 🌿 GitFlow

```
main → develop → feature/auth-system
                → feature/product-card
                → feature/api-integration
                → feature/search-filter
```

## 👤 Autor

Thomas Rodriguez Londoño
