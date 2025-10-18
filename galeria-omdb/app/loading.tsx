export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
          Cargando...
        </h2>
        <p className="text-gray-500">Preparando tu contenido</p>
      </div>
    </div>
  )
}