import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Task } from "../../types/tasks"
import { get, clientDelete } from "../../utils/apiClient"
import TaskListComponent from "../components/task-list"

export default function TaskList() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [activeTab, setActiveTab] = useState<string>("Todos")

  const fetchTasks = async () => {
    const idUsuario = sessionStorage.getItem("idUsuario")
    if (!idUsuario) return navigate("/login")

    const response = await get(`/api/Tareas?idUsuario=${idUsuario}`)
    if (response) {
      setTasks(response)
      filterTasks(response, activeTab)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const filterTasks = (allTasks: Task[], estado: string) => {
    if (estado === "Todos") {
      setFilteredTasks(allTasks)
    } else {
      const filtradas = allTasks.filter((task) => task.estado === estado)
      setFilteredTasks(filtradas)
    }
  }

  const handleTabClick = (estado: string) => {
    setActiveTab(estado)
    filterTasks(tasks, estado)
  }

  const handleDelete = async (id: number) => {
    const idUsuario = sessionStorage.getItem("idUsuario")
    await clientDelete(`/api/Tareas/delete/${idUsuario}/${id}`)
    await fetchTasks() 
  }

  const handleUpdate = (updatedTask: Task) => {
    const updated = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
    setTasks(updated)
    filterTasks(updated, activeTab)
  }

  const tabs = ["Todos", "Pendiente", "En proceso", "Completada", "Cancelada"]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Tareas</h1>
        <div className="flex gap-4">
          <Link
            to="/create-task"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + Nueva tarea
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400"
          >
            Volver al Dashboard
          </Link>
        </div>
      </div>

      <div className="flex gap-4 mb-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`text-sm font-medium px-3 py-1 rounded-full transition-colors border 
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <TaskListComponent
        tasks={filteredTasks}
        onTaskUpdate={handleUpdate}
        onTaskDelete={handleDelete}
      />
    </div>
  )
}