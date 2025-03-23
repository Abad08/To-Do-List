import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, PlusCircle, CheckCircle, Clock, List, Home, LogOut, Menu, X, Settings } from "lucide-react"
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
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button className="md:hidden mr-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold text-gray-900">TodoMaster</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome</span>
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
        {/* Sidebar */}
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
                <span>Show Tasks</span>
              </Link>
              <Link
                to="/create-task"
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
              >
                <PlusCircle size={18} />
                <span>Create Task</span>
              </Link>
              <Link
                to="/find-tasks"
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Search size={18} />
                <span>Find Tasks</span>
              </Link>
            </div>

            <div className="mt-8">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Task Status</h3>
              <div className="mt-2 space-y-1">
                <Link
                  to="/tasks?status=pending"
                  className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-yellow-500" />
                    <span>Pending</span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                    {filterTasksByEstado(tasks,"pendiente").length}
                  </span>
                </Link>
                <Link
                  to="/tasks?status=in-progress"
                  className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-blue-500" />
                    <span>In Progress</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {filterTasksByEstado(tasks,"En proceso").length}
                  </span>
                </Link>
                <Link
                  to="/tasks?status=completed"
                  className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={18} className="text-green-500" />
                    <span>Completed</span>
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
                <span>Create New Task</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600">Manage your tasks and stay organized</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Tasks</p>
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
                    <p className="text-sm text-gray-500">Pending</p>
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
                    <p className="text-sm text-gray-500">In Progress</p>
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
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{filterTasksByEstado(tasks,"Completada").length}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick access cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/task-list"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <List size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Show Tasks</h3>
                  <p className="text-gray-500 text-sm">View and manage all your tasks in one place</p>
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Create Task</h3>
                  <p className="text-gray-500 text-sm">Add a new task to your todo list</p>
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Find Tasks</h3>
                  <p className="text-gray-500 text-sm">Search and filter your tasks</p>
                </div>
              </Link>
            </div>

            {/* Recent activity - placeholder */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <Link to="/tasks" className="text-sm text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {[
                    { action: "Created task", task: "Update project documentation", time: "2 hours ago" },
                    { action: "Completed task", task: "Design new logo", time: "Yesterday" },
                    { action: "Updated task", task: "Fix login page bug", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          {activity.action.includes("Created") && (
                            <div className="p-2 bg-blue-100 rounded-full">
                              <PlusCircle size={16} className="text-blue-600" />
                            </div>
                          )}
                          {activity.action.includes("Completed") && (
                            <div className="p-2 bg-green-100 rounded-full">
                              <CheckCircle size={16} className="text-green-600" />
                            </div>
                          )}
                          {activity.action.includes("Updated") && (
                            <div className="p-2 bg-yellow-100 rounded-full">
                              <Settings size={16} className="text-yellow-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action}: <span className="font-normal">{activity.task}</span>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard

