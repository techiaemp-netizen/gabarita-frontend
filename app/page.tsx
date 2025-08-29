'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Bem-vindo ao Gabarita AI
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Sua plataforma de simulados e estudos preparatórios com inteligência artificial
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Simulados Personalizados</h3>
            <p className="text-gray-600 mb-4">
              Crie simulados adaptados ao seu nível de conhecimento
            </p>
            <button 
              onClick={() => router.push('/simulado')}
              className="btn-primary w-full"
            >
              Fazer Simulado
            </button>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Dashboard Completo</h3>
            <p className="text-gray-600 mb-4">
              Acompanhe seu progresso e estatísticas detalhadas
            </p>
            <button 
              onClick={() => router.push('/dashboard')}
              className="btn-primary w-full"
            >
              Ver Dashboard
            </button>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Planos Premium</h3>
            <p className="text-gray-600 mb-4">
              Acesse recursos exclusivos e conteúdo avançado
            </p>
            <button 
              onClick={() => router.push('/planos')}
              className="btn-primary w-full"
            >
              Ver Planos
            </button>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pronto para começar?
          </h2>
          <p className="text-gray-600 mb-6">
            Escolha seu plano e comece a estudar com a melhor tecnologia de IA
          </p>
          <button 
            onClick={() => router.push('/planos')}
            className="btn-primary text-lg px-8 py-3"
          >
            Começar Agora
          </button>
        </div>
      </div>
    </div>
  )
}
