import axios from 'axios'
import MovieCard from './components/MovieCard'
import Link from 'next/link'
import https from 'https'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

// Configuración de axios para ignorar certificados SSL
const axiosConfig = {
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
}

async function fetchPopularMovies(): Promise<Movie[]> {
  const apiKey = 'f1def80d'
  const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=marvel`, axiosConfig)
  return response.data.Search || []
}

async function fetchTrendingMovies(): Promise<Movie[]> {
  const apiKey = 'f1def80d'
  const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=star wars`, axiosConfig)
  return response.data.Search || []
}

export default async function HomePage() {
  const popularMovies = await fetchPopularMovies()
  const trendingMovies = await fetchTrendingMovies()
  const top10 = popularMovies.slice(0, 10)

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[70vh] mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 z-20 p-6 md:p-12 max-w-2xl">
          <h1 className="text-3xl md:text-6xl font-black text-white mb-4">
            Bienvenido a tu Galería
          </h1>
          <p className="text-base md:text-xl text-gray-300 mb-6">
            Explora miles de películas y series. Encuentra tu próxima obsesión.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link 
              href="/search"
              className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-200 transition flex items-center gap-2 text-sm md:text-base"
            >
              🔍 Buscar ahora
            </Link>
            <button className="bg-gray-600/80 text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-600 transition text-sm md:text-base">
              ℹ️ Más información
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Top 10 Populares */}
      <section className="px-4 md:px-12 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
          🏆 Las 10 más populares hoy
        </h2>
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
            {top10.map((movie, index) => (
              <div key={movie.imdbID} className="flex-shrink-0 w-48 md:w-64">
                <MovieCard movie={movie} ranking={index + 1} showBadge={index < 3} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Películas Marvel */}
      <section className="px-4 md:px-12 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          🎬 Películas Marvel
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {popularMovies.slice(0, 12).map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </section>

      {/* Tendencias */}
      <section className="px-4 md:px-12 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          🔥 Tendencias
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {trendingMovies.slice(0, 12).map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </section>

      {/* Nota técnica */}
      <div className="px-4 md:px-12 mt-12 border-t border-gray-800 pt-8">
        <p className="text-gray-500 text-sm">
          💡 <strong>SSR (Server-Side Rendering):</strong> Esta página se renderiza en el servidor. 
          Los datos se cargan antes de enviar el HTML al navegador, optimizando SEO y velocidad inicial.
        </p>
      </div>
    </div>
  )
}