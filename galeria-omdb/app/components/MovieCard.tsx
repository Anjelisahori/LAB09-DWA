'use client'

import { useState } from 'react'
import MovieModal from './MovieModal'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

interface MovieCardProps {
  movie: Movie
  ranking?: number
  showBadge?: boolean
}

export default function MovieCard({ movie, ranking, showBadge = false }: MovieCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative cursor-pointer group"
      >
        {/* Ranking número gigante */}
        {ranking && (
          <div className="absolute -left-4 bottom-0 z-10 text-[120px] md:text-[180px] font-black leading-none text-stroke pointer-events-none select-none">
            {ranking}
          </div>
        )}

        {/* Tarjeta principal */}
        <div className={`
          relative rounded-lg overflow-hidden shadow-2xl
          transition-all duration-300 ease-out
          ${isHovered ? 'scale-110 z-20 shadow-black/50' : 'scale-100'}
          ${ranking ? 'ml-6 md:ml-8' : ''}
        `}>
          {/* Badge TOP 10 o NUEVOS EPISODIOS */}
          {showBadge && (
            <div className="absolute top-2 left-2 z-20">
              <div className="bg-red-600 text-white text-xs font-bold px-2 md:px-3 py-1 rounded">
                {Math.random() > 0.5 ? 'NUEVO' : 'TOP 10'}
              </div>
            </div>
          )}

          {/* Imagen */}
          <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Sin+Imagen'}
              alt={movie.Title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay gradient on hover */}
            <div className={`
              absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent
              transition-opacity duration-300
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <h3 className="font-bold text-white text-sm md:text-lg mb-1 line-clamp-2">
                  {movie.Title}
                </h3>
                <div className="flex items-center gap-2 text-xs md:text-sm flex-wrap">
                  <span className="text-green-400 font-semibold">95% Match</span>
                  <span className="border border-gray-400 text-gray-300 px-1 text-xs">
                    {movie.Year}
                  </span>
                  <span className="text-gray-300 capitalize text-xs">{movie.Type}</span>
                </div>
                <button className="mt-2 md:mt-3 bg-white text-black px-3 md:px-4 py-1.5 md:py-2 rounded font-semibold hover:bg-gray-200 transition text-xs md:text-sm flex items-center gap-2">
                  ▶ Ver ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <MovieModal imdbID={movie.imdbID} onClose={() => setShowModal(false)} />}
    </>
  )
}