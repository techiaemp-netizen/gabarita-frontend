'use client'

import PlanProtection from '@/components/PlanProtection'
import { useEffect, useState } from 'react'
import { dashboardService } from '@/services/api'

interface DashboardStats {
  simulados_realizados: number
  questoes_respondidas: number
  acertos: number
  media_geral: number
  tempo_estudo: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const response = await dashboardService.getStats()
      if (response.success) {
        setStats(response.data)
      }
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
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
    <PlanProtection requiredPlan="basico">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard de Estudos
          </h1>
          <p className="text-gray-600">
            Acompanhe seu progresso e estatísticas de desempenho
          </p>
        </div>
        
        {/* Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Simulados Realizados</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.simulados_realizados || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Questões Respondidas</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.questoes_respondidas || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Taxa de Acertos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.questoes_respondidas ? Math.round((stats.acertos / stats.questoes_respondidas) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tempo de Estudo</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.tempo_estudo || 0}h</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gráficos e Progresso */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Progresso por Matéria</h3>
            <div className="space-y-4">
              {[
                { materia: 'Matemática', progresso: 75, cor: 'bg-blue-500' },
                { materia: 'Português', progresso: 60, cor: 'bg-green-500' },
                { materia: 'História', progresso: 45, cor: 'bg-yellow-500' },
                { materia: 'Geografia', progresso: 80, cor: 'bg-purple-500' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.materia}</span>
                    <span>{item.progresso}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.cor} h-2 rounded-full`} 
                      style={{width: `${item.progresso}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
            <div className="space-y-3">
              {[
                { acao: 'Simulado de Matemática concluído', tempo: '2 horas atrás', resultado: '85% de acertos' },
                { acao: 'Questões de Português respondidas', tempo: '1 dia atrás', resultado: '12 questões' },
                { acao: 'Simulado de História iniciado', tempo: '2 dias atrás', resultado: 'Em andamento' },
              ].map((atividade, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium text-sm">{atividade.acao}</p>
                  <p className="text-xs text-gray-600">{atividade.tempo}</p>
                  <p className="text-xs text-blue-600">{atividade.resultado}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PlanProtection>
  )
}
