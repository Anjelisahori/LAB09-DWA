import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Galería de Películas y Series - OMDb',
  description: 'Aplicación SSR y CSR con OMDb API',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black min-h-screen antialiased">
        {/* Navbar estilo Netflix */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent">
          <div className="px-4 md:px-12 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="text-red-600 text-2xl md:text-3xl font-black tracking-tighter group-hover:scale-110 transition-transform">
                OMDB
              </div>
            </Link>

            {/* Menu */}
            <div className="flex items-center gap-4 md:gap-8">
              <Link 
                href="/" 
                className="text-white hover:text-gray-300 transition font-semibold text-sm md:text-base"
              >
                Inicio
              </Link>
              <Link 
                href="/search" 
                className="text-white hover:text-gray-300 transition font-semibold flex items-center gap-2 text-sm md:text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar
              </Link>
            </div>

            {/* User icon */}
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="pt-16">{children}</main>

        {/* Footer */}
        <footer className="bg-black border-t border-gray-900 py-8 px-4 md:px-12 mt-20">
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">© 2025 Galería OMDb - Proyecto Educativo</p>
            <p>Desarrollado con Next.js, TypeScript y Tailwind CSS</p>
          </div>
        </footer>
      </body>
    </html>
  )
}