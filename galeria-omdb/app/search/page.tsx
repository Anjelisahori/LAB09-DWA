'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

export default function SearchPage() {
  const [query, setQuery] = useState('spider-man')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    if (!query.trim()) {
      setMovies([])
      return
    }

    const fetchMovies = async () => {
      setLoading(true)
      try {
        const apiKey = 'f1def80d'
        // En el navegador no necesitamos httpsAgent
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
        
        if (response.data.Response === 'True') {
          setMovies(response.data.Search || [])
          setTotalResults(parseInt(response.data.totalResults) || 0)
        } else {
          setMovies([])
          setTotalResults(0)
        }
      } catch (error) {
        console.error('Error fetching movies:', error)
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchMovies, 500)
    return () => clearTimeout(debounceTimer)
  }, [query])

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen pb-20">
      <div className="relative bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm sticky top-0 z-30 border-b border-gray-800">
        <div className="px-4 md:px-12 py-6 md:py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">🔍 Buscar películas y series</h1>
          
          <div className="relative max-w-3xl">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Títulos, géneros, actores..."
              className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-800/80 text-white rounded-lg border-2 border-gray-700 
                       focus:border-red-600 focus:outline-none focus:bg-gray-800 transition-all
                       placeholder-gray-500 text-base md:text-lg"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {loading ? (
                <div className="animate-spin h-5 w-5 md:h-6 md:w-6 border-2 border-red-600 border-t-transparent rounded-full" />
              ) : (
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          </div>

          {totalResults > 0 && (
            <p className="text-gray-400 mt-4 text-sm md:text-base">
              Se encontraron <span className="text-white font-semibold">{totalResults}</span> resultados
            </p>
          )}
        </div>
      </div>

      <div className="px-4 md:px-12 mt-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full mb-4" />
            <p className="text-gray-400 text-lg">Buscando...</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map(movie => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : query.trim() ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold text-white mb-2">No se encontraron resultados</h3>
            <p className="text-gray-400">Intenta con otro término de búsqueda</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-white mb-2">Comienza a buscar</h3>
            <p className="text-gray-400">Escribe el título de una película o serie</p>
          </div>
        )}
      </div>

      <div className="px-4 md:px-12 mt-12 border-t border-gray-800 pt-8">
        <p className="text-gray-500 text-sm">
          💡 <strong>CSR (Client-Side Rendering):</strong> Esta página se renderiza en el navegador. 
          Los resultados se actualizan en tiempo real sin recargar la página.
        </p>
      </div>
    </div>
  )
}