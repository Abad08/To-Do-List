import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, PlusCircle, CheckCircle, Clock, List, Home, LogOut, Menu, X } from "lucide-react"
import { Task }  from "../../types/tasks"
import { get } from "../../utils/apiClient"

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  
  function filterTasksByEstado(tasks: Task[], estado: string): Task[] {
    return tasks.filter(task => task.estado === estado);
  }
  
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Encabezado */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button className="md:hidden mr-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold text-gray-900">ToDoApp</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Bienvenido</span>
            <div 
            onClick={() => {
              sessionStorage.removeItem("idUsuario")
              navigate("/login")
            }} 
            className="p-1 rounded-full hover:bg-gray-100">
              <LogOut size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Barra lateral */}
        <aside
          className={`
          bg-white shadow-sm w-64 fixed inset-y-0 pt-16 md:pt-0 md:static 
          transition-transform duration-300 ease-in-out z-10
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        >
          <div className="h-full flex flex-col p-4">
            <div className="space-y-1">
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm rounded-md text-gray-700 bg-gray-100 font-medium">
                <Home size={18} />
                <span>Dashboard</span>
              </button>
              <Link
                to="/task-list"
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
              >
                <List size={18} />
                <span>Mostrar Tareas</span>
              </Link>
              <Link
                to="/create-task"
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
              >
                <PlusCircle size={18} />
                <span>Crear Tarea</span>
              </Link>
              <Link
                to="/find-tasks"
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Search size={18} />
                <span>Buscar Tarea</span>
              </Link>
            </div>

            <div className="mt-8">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado de Tareas</h3>
              <div className="mt-2 space-y-1">
                <Link
                  to="/task-list"
                  className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-yellow-500" />
                    <span>Pendiente</span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                  {filterTasksByEstado(tasks,"Pendiente").length}
                  </span>
                </Link>
                <Link
                  to="/task-list"
                  className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-blue-500" />
                    <span>En proceso</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {filterTasksByEstado(tasks,"En proceso").length}
                  </span>
                </Link>
                <Link
                  to="/task-list"
                  className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={18} className="text-green-500" />
                    <span>Completada</span>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                    {filterTasksByEstado(tasks,"Completada").length}
                  </span>
                </Link>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <Link
                to="/create-task"
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                <PlusCircle size={18} />
                <span>Crear nueva tarea</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600">Maneja tus tareas y mantente organizado</p>
            </div>

            {/* Estadisticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total de tareas</p>
                    <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <List size={20} className="text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pendiente</p>
                    <p className="text-2xl font-bold text-gray-900">{filterTasksByEstado(tasks,"Pendiente").length}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Clock size={20} className="text-yellow-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">En proceso</p>
                    <p className="text-2xl font-bold text-gray-900">{filterTasksByEstado(tasks,"En proceso").length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Clock size={20} className="text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Completada</p>
                    <p className="text-2xl font-bold text-gray-900">{filterTasksByEstado(tasks,"Completada").length}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Cartas de acceso */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/task-list"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <List size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Mostrar Tareas</h3>
                  <p className="text-gray-500 text-sm">Observa y maneja tus tareas en un solo lugar</p>
                </div>
              </Link>

              <Link
                to="/create-task"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-green-100 rounded-full mb-4">
                    <PlusCircle size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Crear Tarea</h3>
                  <p className="text-gray-500 text-sm">Añade nuevas tareas a tu ToDo List</p>
                </div>
              </Link>

              <Link
                to="/find-tasks"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-purple-100 rounded-full mb-4">
                    <Search size={24} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Buscar Tarea</h3>
                  <p className="text-gray-500 text-sm">Busca y filtra tus tareas</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard

