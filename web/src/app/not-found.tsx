import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="max-w-md w-full  rounded-lg border border-gray-200 p-8 text-center">
        <AlertTriangle className="mx-auto h-8 w-8 text-red-500" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          Página não encontrada
        </h2>
        <p className="mt-2 mb-6 text-gray-500">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link href="/" className="inline-block">
          <button className="px-4 py-2 border border-gray-300 font-medium rounded-md hover:bg-gray-50 transition cursor-alias">
            Voltar para a página inicial
          </button>
        </Link>
      </div>
    </div>
  )
}
