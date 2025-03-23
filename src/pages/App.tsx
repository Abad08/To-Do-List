import { Link } from "react-router-dom"

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">ToDoApp</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Organiza tus tareas</span>
              <span className="block text-blue-600">con ToDoApp</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
              La manera simple y efectiva de manejar tus tareas diarias. Mantente organizado, enfocado, y productivo con nuestra
              aplicación de ToDo List.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Registrate - Es gratis
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Inicia sesión con tu cuenta
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 flex justify-center">
            <div className="bg-white p-5 rounded-lg shadow-xl border border-gray-200 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Mis tareas</h2>
                <span className="text-sm text-gray-500">Hoy</span>
              </div>
              {/* Sample Todo Items */}
              {[
                { id: 1, text: "Completar propuesta de proyecto", completed: true },
                { id: 2, text: "Reunión con el equipo de diseño", completed: false },
                { id: 3, text: "Trabajo de investigación", completed: false },
                { id: 4, text: "Actualizar mi LinkedIn", completed: false },
              ].map((todo) => (
                <div key={todo.id} className="flex items-center py-2">
                  <div
                    className={`w-5 h-5 rounded-full border ${todo.completed ? "bg-blue-500 border-blue-500" : "border-gray-300"} mr-3 flex items-center justify-center`}
                  >
                    {todo.completed && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                    {todo.text}
                  </span>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border border-gray-300 mr-3"></div>
                  <span className="text-gray-400">Añade una nueva tarea...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">¿Por qué elegir ToDoApp?</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Simple, poderosa y diseñada para la productividad.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Fácil de usar",
                  description: "interfaz intuitiva que convierte el administrar tareas simple y sencillo.",
                },
                {
                  title: "Mantente organizado",
                  description: "Nombra tus tareas, coloca prioridades, Y nunca más olvides una fecha límite.",
                },
                {
                  title: "Accede desde tu dispositivo",
                  description: "Con una base de datos SQL, te permite acceder desde tu dispotivo de preferencia",
                },
              ].map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <span className="h-6 w-6 text-white">{index + 1}</span>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Listo para iniciar?</span>
            <span className="block text-blue-200">Crea tu cuenta de manera gratuita ahora.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Regístrate
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
              >
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default Landing