'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">😕</div>
        
        <h1 className="text-4xl font-black text-white mb-4">
          ¡Ups! Algo salió mal
        </h1>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          No pudimos cargar el contenido. Por favor, intenta nuevamente.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-900 border border-red-900 rounded-lg p-4 mb-6 text-left">
            <p className="text-red-500 text-sm font-mono break-all">
              {error.message}
            </p>
          </div>
        )}
        
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={reset}
            className="bg-red-600 text-white px-6 py-3 rounded font-bold hover:bg-red-700 transition"
          >
            Intentar nuevamente
          </button>
          
          <Link
            href="/"
            className="bg-gray-700 text-white px-6 py-3 rounded font-bold hover:bg-gray-600 transition"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}