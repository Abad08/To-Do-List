export default function NotFound() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-800">
                <span className="text-blue-600">✓</span> TaskMaster
              </h1>
            </div>
          </div>
        </header>
  
        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 sm:p-10">
              <div className="text-center">
                <h2 className="text-9xl font-bold text-blue-600">404</h2>
                <div className="mt-4 mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800">Página no encontrada</h3>
                  <p className="mt-2 text-gray-600">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                  </p>
                </div>
                
                {/* Error Illustration */}
                <div className="my-8 flex justify-center">
                  <div className="w-40 h-40 relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-full opacity-50"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
                      🔍
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => window.location.href = '/'}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  <span className="mr-2">←</span> Volver al inicio
                </button>
              </div>
            </div>
          </div>
        </main>
  
      </div>
    )
  }
  