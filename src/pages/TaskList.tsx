
import { useEffect, useState } from "react"
import TaskListComponent from "../components/task-list.tsx"
import { Task } from "../../types/tasks.ts"
import { useNavigate } from "react-router"
import { get } from "../../utils/apiClient.ts"

type Tab = "all" | "pending" | "in-progress" | "completed"

export default function TaskDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("all")
  const [tasks, setTasks] = useState<Task[]>([])
  const navigate = useNavigate()

  useEffect(()=>{
    const getTaskList = async () => {
      const idUsuario = sessionStorage.getItem("idUsuario");

      if (!idUsuario){
        navigate("/login")
        return
      }
      const taskList = await get(`/api/Tareas?idUsuario=${idUsuario}`)

      if (taskList){

        setTasks(
          taskList as unknown as Task[]
        )
      }
    }
    getTaskList()
  },[])

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return task.estado === "Pendiente"
    if (activeTab === "in-progress") return task.estado === "En proceso"
    if (activeTab === "completed") return task.estado === "Completado"
    return true
  })

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  const handleTaskDelete = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                <span className="text-blue-600">✓</span> TaskMaster
              </h1>
              <p className="text-gray-500 mt-1">Gestiona tus tareas de forma eficiente</p>
            </div>
            <button
              onClick={() => {navigate("/create-task")}}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center self-start md:self-center"
            >
              <span className="mr-2">+</span> Nueva Tarea
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === "all" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Todas las Tareas
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === "pending"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setActiveTab("in-progress")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === "in-progress"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              En Proceso
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === "completed"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Completadas
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <TaskListComponent tasks={filteredTasks} onTaskUpdate={handleTaskUpdate} onTaskDelete={handleTaskDelete} />
        </div>
      </main>

    </div>
  )
}

