// Forzar que todas las rutas API sean dinámicas
export const dynamic = 'force-dynamic'

// No usar el runtime edge ya que necesitamos Prisma
export const runtime = 'nodejs'

// Asegurarnos de que no se cacheen las respuestas
export const fetchCache = 'force-no-store'
export const revalidate = 0

// Configurar el tiempo máximo de ejecución (en segundos)
export const maxDuration = 5
