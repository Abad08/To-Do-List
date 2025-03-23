import { useEffect, useState } from "react"
import { send } from "../../utils/apiClient"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await send(
          `/api/Usuario/register?username=${formData.username}&password=${formData.password}`,
          {}
        )

        if (typeof response === "string" && response.includes("Ya existe")) {
          alert(response); 
          return;
        }
        
        alert("¡Usuario registrado exitosamente!");
        window.location.href = "/login";
        
      } catch (error) {
        console.error("Error al registrar:", error)
        alert("Error al registrar. Puede que el nombre de usuario ya exista.")
      }
    } else {
      setErrors(validationErrors)
    }
  }
  useEffect(() => {
    const isthereAnyUser = sessionStorage.getItem("idUsuario")
    if(isthereAnyUser){
      navigate("/dashboard")
    }
  }, [])
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">ToDoApp</h2>
          <p className="mt-2 text-sm text-gray-600">Crea tu cuenta</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900">Registro</h3>
            <p className="mt-1 text-sm text-gray-600">Elige un nombre de usuario y una contraseña</p>
          </div>

          <div className="p-6 pt-0">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Username */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="Nombre único"
                  className={`block w-full rounded-md border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`block w-full rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`block w-full rounded-md border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Crear cuenta
                </button>
              </div>
            </form>
          </div>

          <div className="border-t border-gray-200 p-6 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
