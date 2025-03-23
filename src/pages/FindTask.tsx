"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { get } from "../../utils/apiClient"

function FindTask() {
  const navigate = useNavigate()
  const [idUsuario, setIdUsuario] = useState<number | null>(null)
  const [taskId, setTaskId] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")
  const [foundTask, setFoundTask] = useState<any>(null)

  const statusMap: Record<number, { label: string; color: string }> = {
    1: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
    2: { label: "En proceso", color: "bg-blue-100 text-blue-800" },
    3: { label: "Completada", color: "bg-green-100 text-green-800" },
    4: { label: "Cancelada", color: "bg-red-100 text-red-800" },
  }

  useEffect(() => {
    const idUsuario = sessionStorage.getItem("idUsuario")
    if (!idUsuario) {
      navigate("/login")
      return
    }
    setIdUsuario(parseInt(idUsuario))
  }, [navigate])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFoundTask(null)

    const taskIdNum = parseInt(taskId.trim())
    if (isNaN(taskIdNum)) {
      setError("El ID de la tarea debe ser un número")
      return
    }

    setIsSearching(true)

    try {
      const result = await get(`/api/Tareas/${idUsuario}/${taskIdNum}`)
      if (!result) {
        setError("Tarea no encontrada")
      } else {
        setFoundTask(result)
      }
    } catch (err: any) {
      console.error("Error buscando la tarea:", err)
      setError("Búsqueda de tarea fallida")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">ToDoApp</h2>
          <p className="mt-2 text-sm text-gray-600">Encuentra una tarea específica</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900">Buscar Tarea</h3>
            <p className="mt-1 text-sm text-gray-600">Ingrese el ID de la tarea</p>
          </div>

          <div className="p-6 pt-0">
            <form className="space-y-4" onSubmit={handleSearch}>
              <div className="space-y-2">
                <label htmlFor="taskId" className="block text-sm font-medium text-gray-700">
                  Task ID <span className="text-red-500">*</span>
                </label>
                <input
                  id="taskId"
                  name="taskId"
                  type="text"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                >
                  {isSearching ? "Buscando..." : "Buscar tarea"}
                </button>
              </div>
            </form>
          </div>

          {error && (
            <div className="mx-6 mb-6 rounded-md bg-red-50 p-4 text-sm text-red-800">
              ⚠️ {error}
            </div>
          )}

          {foundTask && (
            <div className="mx-6 mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="px-4 py-5 bg-gray-50">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Detalles de la Tarea</h3>
                <p className="text-sm text-gray-500">Tarea ID: {foundTask.id}</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5">
                <p><strong>Nombre:</strong> {foundTask.nombre}</p>
                <p><strong>Descripción:</strong> {foundTask.descripcion || "No contiene descripción"}</p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusMap[foundTask.estado]?.color || "bg-gray-200 text-gray-800"}`}>
                    {foundTask.estado}
                  </span>
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-4 border-t border-gray-200 text-right">
                <Link
                  to="/task-list"
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  Volver a la lista
                </Link>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 p-6 flex justify-between">
            <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Volver al dashboard
            </Link>
            <Link to="/task-list" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Ver todas las tareas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindTask