'use client'

import PlanProtection from '@/components/PlanProtection'
import { useEffect, useState } from 'react'
import { userService, paymentService } from '@/services/api'

interface UserProfile {
  nome: string
  email: string
  plano: string
  data_cadastro: string
}

export default function PainelPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('perfil')

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      const response = await userService.getProfile()
      if (response.success) {
        setProfile(response.data)
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
    } finally {
      setLoading(false)
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
    <PlanProtection requiredPlan="gratuito">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel de Controle
          </h1>
          <p className="text-gray-600">
            Gerencie sua conta e configurações
          </p>
        </div>
        
        {/* Navegação por Abas */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'perfil', nome: 'Perfil' },
              { id: 'plano', nome: 'Meu Plano' },
              { id: 'historico', nome: 'Histórico' },
              { id: 'configuracoes', nome: 'Configurações' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.nome}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Conteúdo das Abas */}
        {activeTab === 'perfil' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input 
                    type="text" 
                    value={profile?.nome || ''} 
                    className="input-field"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    value={profile?.email || ''} 
                    className="input-field"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Cadastro
                  </label>
                  <input 
                    type="text" 
                    value={profile?.data_cadastro || ''} 
                    className="input-field"
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Estatísticas Rápidas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Plano Atual</span>
                  <span className="text-sm text-blue-600 font-semibold capitalize">
                    {profile?.plano || 'Gratuito'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Simulados Realizados</span>
                  <span className="text-sm font-semibold">15</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Questões Respondidas</span>
                  <span className="text-sm font-semibold">247</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Taxa de Acertos</span>
                  <span className="text-sm font-semibold text-green-600">78%</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'plano' && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Informações do Plano</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-blue-900 capitalize">
                    Plano {profile?.plano || 'Gratuito'}
                  </h4>
                  <p className="text-blue-700">
                    {profile?.plano === 'gratuito' 
                      ? 'Acesso limitado aos recursos básicos'
                      : 'Acesso completo a todos os recursos'
                    }
                  </p>
                </div>
                <button 
                  onClick={() => window.location.href = '/planos'}
                  className="btn-primary"
                >
                  {profile?.plano === 'gratuito' ? 'Fazer Upgrade' : 'Gerenciar Plano'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">∞</div>
                  <div className="text-sm text-blue-700">Simulados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">24/7</div>
                  <div className="text-sm text-blue-700">Suporte</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">✓</div>
                  <div className="text-sm text-blue-700">Relatórios</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'historico' && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Histórico de Atividades</h3>
            <div className="space-y-4">
              {[
                { data: '2024-01-15', atividade: 'Simulado de Matemática', resultado: '85% - 17/20 acertos', status: 'Concluído' },
                { data: '2024-01-14', atividade: 'Questões de Português', resultado: '12 questões respondidas', status: 'Concluído' },
                { data: '2024-01-13', atividade: 'Simulado de História', resultado: '70% - 14/20 acertos', status: 'Concluído' },
                { data: '2024-01-12', atividade: 'Simulado de Geografia', resultado: 'Interrompido', status: 'Incompleto' },
              ].map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.atividade}</h4>
                      <p className="text-sm text-gray-600">{item.resultado}</p>
                      <p className="text-xs text-gray-500">{item.data}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Concluído' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'configuracoes' && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Configurações da Conta</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Notificações</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Receber emails sobre novos simulados</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Notificações de progresso semanal</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Lembretes de estudo diário</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Privacidade</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Permitir aparecer no ranking público</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Compartilhar estatísticas com outros usuários</span>
                  </label>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <button className="btn-primary mr-4">Salvar Configurações</button>
                <button className="btn-secondary">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PlanProtection>
  )
}
