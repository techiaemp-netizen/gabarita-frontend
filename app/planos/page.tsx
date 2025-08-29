'use client'

import { useEffect, useState } from 'react'
import { planService, paymentService } from '@/services/api'

interface Plan {
  id: string
  nome: string
  preco: number
  descricao: string
  recursos: string[]
  popular?: boolean
}

export default function PlanosPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [processingPayment, setProcessingPayment] = useState<string | null>(null)

  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = async () => {
    try {
      const response = await planService.getPlans()
      if (response.success) {
        setPlans(response.data)
      }
    } catch (error) {
      console.error('Erro ao carregar planos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async (planId: string) => {
    setProcessingPayment(planId)
    
    try {
      // Criar pagamento no Mercado Pago
      const paymentResponse = await paymentService.createPayment(planId)
      
      if (paymentResponse.success && paymentResponse.data.init_point) {
        // Redirecionar para o Mercado Pago
        window.location.href = paymentResponse.data.init_point
      } else {
        alert('Erro ao processar pagamento. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setProcessingPayment(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Escolha seu Plano
        </h1>
        <p className="text-xl text-gray-600">
          Selecione o plano ideal para seus estudos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`card relative ${
              plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {plan.nome}
              </h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {plan.preco === 0 ? 'Grátis' : `R$ ${plan.preco.toFixed(2)}`}
                {plan.preco > 0 && (
                  <span className="text-sm text-gray-500 font-normal">/mês</span>
                )}
              </div>
              <p className="text-gray-600">{plan.descricao}</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              {plan.recursos.map((recurso, index) => (
                <li key={index} className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {recurso}
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={processingPayment === plan.id}
              className={`w-full py-2 px-4 rounded font-medium transition-colors ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {processingPayment === plan.id ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processando...
                </div>
              ) : plan.preco === 0 ? (
                'Começar Grátis'
              ) : (
                'Assinar Plano'
              )}
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Todos os planos incluem suporte técnico e atualizações gratuitas
        </p>
        <p className="text-sm text-gray-500">
          Pagamentos processados com segurança pelo Mercado Pago
        </p>
      </div>
    </div>
  )
}
