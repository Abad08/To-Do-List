import { send } from "../../utils/apiClient"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Task } from "../../types/tasks"

function CreateTask() {
  const navigate = useNavigate()
  const [idUsuario, setIdUsuario] = useState<number | null>(null)
  const [formData, setFormData] = useState<Task>({
    id: 0,
    nombre: "",
    descripcion: "",
    estado: "1", 
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const statusOptions = [
    { value: "1", label: "Pendiente" },
    { value: "2", label: "En proceso" },
    { value: "3", label: "Completada" },
    { value: "4", label: "Cancelada" },
  ]

  useEffect(() => {
    const id = sessionStorage.getItem("idUsuario")
    if (!id) {
      navigate("/login")
      return
    }
    setIdUsuario(Number.parseInt(id, 10))
  }, [navigate])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre de la tarea es requerido"
    } else if (formData.nombre.length > 50) {
      newErrors.nombre = "El nombre de la tarea debe tener menos de 50 caracteres"
    }

    if (formData.descripcion && formData.descripcion.length > 100) {
      newErrors.descripcion = "La descripción de la tarea debe tener menos de 100 caracteres"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)

      try {
        const taskData = {
          idUsuario,
          nombreTarea: formData.nombre,
          tDescripcion: formData.descripcion,
          estado: formData.estado,
        }

        const response = await send(
          `/api/Tareas/post?idUsuario=${taskData.idUsuario}&nombreTarea=${taskData.nombreTarea}&tDescripcion=${taskData.tDescripcion}&estado=${taskData.estado}`,
          {}
        )
        
        console.log("Respuesta del servidor:", response); 
        
        if (response?.message) {
          alert(response.message)
          navigate("/dashboard")
        } else {
          alert("No se pudo crear la tarea")
        }

      } catch (error) {
        console.error("Error creando la tarea:", error)
        alert("Error al crear la tarea. Inténtalo de nuevo.")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">ToDoApp</h2>
          <p className="mt-2 text-sm text-gray-600">Crear una nueva tarea</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900">Nueva Tarea</h3>
            <p className="mt-1 text-sm text-gray-600">Llena los campos para crear una nueva tarea</p>
          </div>

          <div className="p-6 pt-0">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre de la tarea <span className="text-red-500">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  placeholder="Enter task name"
                  className={`block w-full rounded-md border ${
                    errors.nombre ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={formData.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows={4}
                  placeholder="Enter task description (optional)"
                  className={`block w-full rounded-md border ${
                    errors.descripcion ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={formData.descripcion}
                  onChange={handleChange}
                />
                {errors.descripcion && <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                >
                  {isSubmitting ? "Creando tarea..." : "Crear Tarea"}
                </button>
              </div>
            </form>
          </div>

          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between">
              <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Volver al Dashboard
              </Link>
              <Link to="/task-list" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Ver todas las tareas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTask

