import { useState } from "react"
import { send } from "../utils/apiClient"
function Login() {
    //   AQUI
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const response = await send(`/api/Usuario/login?username=${user}&password=${password}`,{})
    if (response.idUsuario){
        localStorage.setItem(
            "idUsuario",
            response.idUsuario
        )
        setError("")
        return
    }
    setError(response)
    console.log(response)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">ToDo List App</h2>
          <p className="mt-2 text-sm text-gray-600">Inicia sesión con tu cuenta</p>
        </div>
        {
            error && 
            <h1>
                {error}
            </h1>
        }
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900">Login</h3>
            <p className="mt-1 text-sm text-gray-600">Ingresa tu usuario y contraseña para acceder a tu ToDo List</p>
          </div>

          <div className="p-6 pt-0">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Usuario
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"

                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>

          <div className="border-t border-gray-200 p-6">
            <div className="text-center text-sm">
              ¿Aún no tienes una cuenta?{" "}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Regístrate
              </a>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Login
