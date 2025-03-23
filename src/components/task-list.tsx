import type React from "react"

import { useState } from "react"
import { clientDelete, patch } from "../../utils/apiClient"

type Task = {
  id: number
  nombre: string
  descripcion: string
  estado: string
}

interface TaskListProps {
  tasks: Task[]
  onTaskUpdate?: (updatedTask: Task) => void
  onTaskDelete?: (taskId: number) => void
}

export default function TaskListComponent({ tasks = [], onTaskUpdate = () => {}, onTaskDelete = () => {} }: TaskListProps) {
  const [viewTask, setViewTask] = useState<Task | null>(null)
  const [editTask, setEditTask] = useState<Task | null>(null)  
  const [status, setStatus] = useState<string>("")

  const [editedTask, setEditedTask] = useState<Task | null>(null)
  const idUsuario = sessionStorage.getItem("idUsuario")

  const handleViewTask = (task: Task) => {
    setViewTask(task)
  }

  const handleEditTask = async (task: Task) => {
    setEditTask(task);
    setEditedTask({ ...task });
  };
  

  const handleSaveTask = async () => {
    if (editedTask) {
      onTaskUpdate(editedTask)
      setEditTask(null)
        
      const estadoMap: Record<string, number> = {
        "Pendiente": 1,
        "En proceso": 2,
        "Completada": 3,
      }
    
      const parsedStatus = estadoMap[status] ?? 4; 
    
      try {
        await patch(
          `/api/Tareas/patch?idUsuario=${idUsuario}&idTarea=${editedTask.id}&nombreTarea=${encodeURIComponent(editedTask.nombre)}&tDescripcion=${encodeURIComponent(editedTask.descripcion)}&estado=${parsedStatus}`
        );
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  }

  // Handle deleting a task
  const handleDeleteTask = async (taskId: number) => {
    await clientDelete(`/api/Tareas/delete/${idUsuario}/${taskId}`)
    location.reload()
    onTaskDelete(taskId)
  }

  // Handle input changes when editing a task
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editedTask) {
      setEditedTask({
        ...editedTask,
        [e.target.name]: e.target.value,
      })
    }
  }

  // Handle select changes when editing a task
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editedTask) {
      setEditedTask({
        ...editedTask,
        estado: e.target.value,
      })
      setStatus(e.target.value)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Lista de Tareas</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No hay tareas disponibles.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div key={task.id} className="border rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-medium truncate">{task.nombre}</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 truncate">{task.descripcion}</p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.estado === "Completada"
                        ? "bg-green-100 text-green-800"
                        : task.estado === "En proceso"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.estado}
                  </span>
                </div>
              </div>
              <div className="p-4 border-t flex justify-between">
                <button
                  className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 hover:cursor-pointer transition-colors"
                  onClick={() => handleViewTask(task)}
                >
                  👁️ Ver
                </button>
                <button
                  className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 hover:cursor-pointer transition-colors"
                  onClick={() => handleEditTask(task)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 hover:cursor-pointer transition-colors"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Task Modal */}
      {viewTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">{viewTask.nombre}</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium">Descripción:</h4>
                <p className="mt-1">{viewTask.descripcion}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Estado:</h4>
                <p className="mt-1">{viewTask.estado}</p>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                onClick={() => setViewTask(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editTask && editedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Editar Tarea</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="block text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editedTask.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="descripcion" className="block text-sm font-medium">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editedTask.descripcion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="estado" className="block text-sm font-medium">
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editedTask.estado}
                  onChange={handleSelectChange}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>

                </select>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                onClick={() => setEditTask(null)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleSaveTask}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

