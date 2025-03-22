import { Link } from "react-router-dom"

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">TodoMaster</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Register
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
              <span className="block">Organize your tasks</span>
              <span className="block text-blue-600">with TodoMaster</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
              The simple, effective way to manage your daily tasks. Stay organized, focused, and productive with our
              intuitive todo list application.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started - It's Free
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Login to Your Account
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 flex justify-center">
            <div className="bg-white p-5 rounded-lg shadow-xl border border-gray-200 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
                <span className="text-sm text-gray-500">Today</span>
              </div>
              {/* Sample Todo Items */}
              {[
                { id: 1, text: "Complete project proposal", completed: true },
                { id: 2, text: "Meeting with design team", completed: false },
                { id: 3, text: "Research new technologies", completed: false },
                { id: 4, text: "Update portfolio website", completed: false },
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
                  <span className="text-gray-400">Add a new task...</span>
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
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose TodoMaster?</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Simple, powerful, and designed for productivity.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Easy to Use",
                  description: "Intuitive interface that makes task management simple and straightforward.",
                },
                {
                  title: "Stay Organized",
                  description: "Categorize tasks, set priorities, and never miss a deadline again.",
                },
                {
                  title: "Access Anywhere",
                  description: "Cloud-based solution that works on all your devices, wherever you are.",
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
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Create your free account today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Register Now
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-bold text-xl">TodoMaster</p>
              <p className="text-gray-400 mt-2">© {new Date().getFullYear()} TodoMaster. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing