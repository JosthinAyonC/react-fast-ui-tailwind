import './App.css'
import { UsuariosDashboard } from './pages/usuario/UsuariosDashboard'

function App() {

  return (
    <div className="p-4 h-screen bg-[#141313]">
      <h1 className="text-center text-3xl font-bold text-white">
        APLICACION DE GESTION DE USUARIOS
      </h1>
      <UsuariosDashboard />
    </div>
  )
}

export default App
