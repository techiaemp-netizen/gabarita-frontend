'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface PlanProtectionProps {
  children: React.ReactNode
  requiredPlan: 'gratuito' | 'basico' | 'premium' | 'vip'
  fallbackMessage?: string
}

const planHierarchy = {
  gratuito: 0,
  basico: 1,
  premium: 2,
  vip: 3
}

export default function PlanProtection({ 
  children, 
  requiredPlan, 
  fallbackMessage = 'Você precisa de um plano superior para acessar este conteúdo.' 
}: PlanProtectionProps) {
  const router = useRouter()
  const [userPlan, setUserPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    checkUserPlan()
  }, [])

  const checkUserPlan = async () => {
    try {
      // Simular verificação do plano do usuário
      // Em produção, isso viria da API ou contexto de autenticação
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        // Usuário não autenticado - redirecionar para login
        router.push('/login')
        return
      }

      // Simular chamada para API para obter plano do usuário
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuario/plano`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        const currentPlan = data.plano || 'gratuito'
        setUserPlan(currentPlan)
        
        // Verificar se o usuário tem acesso baseado na hierarquia de planos
        const userPlanLevel = planHierarchy[currentPlan as keyof typeof planHierarchy] || 0
        const requiredPlanLevel = planHierarchy[requiredPlan]
        
        setHasAccess(userPlanLevel >= requiredPlanLevel)
      } else {
        // Erro na API - assumir plano gratuito
        setUserPlan('gratuito')
        setHasAccess(planHierarchy.gratuito >= planHierarchy[requiredPlan])
      }
    } catch (error) {
      console.error('Erro ao verificar plano do usuário:', error)
      // Em caso de erro, assumir plano gratuito
      setUserPlan('gratuito')
      setHasAccess(planHierarchy.gratuito >= planHierarchy[requiredPlan])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            Acesso Restrito
          </h3>
          <p className="text-yellow-700 mb-6">
            {fallbackMessage}
          </p>
          <p className="text-sm text-yellow-600 mb-6">
            Seu plano atual: <span className="font-semibold capitalize">{userPlan}</span><br/>
            Plano necessário: <span className="font-semibold capitalize">{requiredPlan}</span>
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/planos')}
              className="btn-primary"
            >
              Fazer Upgrade do Plano
            </button>
            <br/>
            <button
              onClick={() => router.push('/')}
              className="btn-secondary"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
