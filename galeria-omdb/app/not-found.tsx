import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Número 404 gigante */}
        <div className="text-[150px] md:text-[200px] font-black leading-none mb-4" style={{
          color: 'transparent',
          WebkitTextStroke: '3px rgba(255, 255, 255, 0.2)',
          textStroke: '3px rgba(255, 255, 255, 0.2)'
        }}>
          404
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
          Página no encontrada
        </h1>
        
        <p className="text-gray-400 mb-8 text-base md:text-lg leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          ¿Qué tal si exploramos algo de contenido nuevo?
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="bg-white text-black px-6 md:px-8 py-3 rounded font-bold hover:bg-gray-200 transition flex items-center gap-2"
          >
            🏠 Ir al inicio
          </Link>
          
          <Link
            href="/search"
            className="bg-gray-700 text-white px-6 md:px-8 py-3 rounded font-bold hover:bg-gray-600 transition flex items-center gap-2"
          >
            🔍 Buscar contenido
          </Link>
        </div>

        <div className="mt-12 text-4xl md:text-6xl opacity-50">
          🎬 🍿 📽️
        </div>
      </div>
    </div>
  )
}