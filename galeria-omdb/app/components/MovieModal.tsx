'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface MovieDetail {
  Title: string
  Year: string
  Genre: string
  Plot: string
  Poster: string
  Director: string
  Actors: string
  imdbRating: string
  Runtime: string
  Released: string
  Writer: string
}

export default function MovieModal({ imdbID, onClose }: { imdbID: string, onClose: () => void }) {
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const apiKey = 'f1def80d'
        // En el navegador no necesitamos httpsAgent
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
        setMovie(response.data)
      } catch (error) {
        console.error('Error fetching movie details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [imdbID])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        onClick={e => e.stopPropagation()}
        className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-slideUp"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full mb-4" />
            <p className="text-gray-400">Cargando detalles...</p>
          </div>
        ) : movie ? (
          <>
            <div className="relative h-64 md:h-96">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/800x600/1f2937/ffffff?text=Sin+Imagen'}
                alt={movie.Title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-2">
                  {movie.Title}
                </h2>
                <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm flex-wrap">
                  <span className="text-green-400 font-bold text-base md:text-lg">
                    ⭐ {movie.imdbRating}
                  </span>
                  <span className="text-gray-300">{movie.Year}</span>
                  <span className="text-gray-300">{movie.Runtime}</span>
                  <span className="border border-gray-500 text-gray-300 px-2 py-0.5 rounded text-xs">
                    HD
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex gap-3 mb-6 flex-wrap">
                <button className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-200 transition text-sm md:text-base flex items-center gap-2">
                  ▶ Reproducir
                </button>
                <button className="bg-gray-700 text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-600 transition text-sm md:text-base flex items-center gap-2">
                  ➕ Mi lista
                </button>
                <button className="bg-gray-700 text-white w-10 h-10 md:w-12 md:h-12 rounded-full hover:bg-gray-600 transition flex items-center justify-center text-sm md:text-base">
                  👍
                </button>
              </div>

              <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
                {movie.Plot}
              </p>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500">Género: </span>
                    <span className="text-white">{movie.Genre}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Director: </span>
                    <span className="text-white">{movie.Director}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Guionista: </span>
                    <span className="text-white">{movie.Writer}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500">Reparto: </span>
                    <span className="text-white">{movie.Actors}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Estreno: </span>
                    <span className="text-white">{movie.Released}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Duración: </span>
                    <span className="text-white">{movie.Runtime}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            No se pudieron cargar los detalles
          </div>
        )}
      </div>
    </div>
  )
}