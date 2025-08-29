'use client'

import PlanProtection from '@/components/PlanProtection'
import { useEffect, useState } from 'react'
import { simuladoService, questionService } from '@/services/api'

interface SimuladoConfig {
  materia: string
  dificuldade: string
  quantidade: number
  tempo: number
}

export default function SimuladoPage() {
  const [config, setConfig] = useState<SimuladoConfig>({
    materia: 'matematica',
    dificuldade: 'medio',
    quantidade: 10,
    tempo: 60
  })
  const [loading, setLoading] = useState(false)
  const [simulado, setSimulado] = useState<any>(null)

  const handleCreateSimulado = async () => {
    setLoading(true)
    try {
      const response = await simuladoService.createSimulado(config)
      if (response.success) {
        setSimulado(response.data)
      } else {
        alert('Erro ao criar simulado. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao criar simulado:', error)
      alert('Erro ao criar simulado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (simulado) {
    return (
      <PlanProtection requiredPlan="basico">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Simulado em Andamento</h1>
              <div className="text-sm text-gray-600">
                Tempo restante: <span className="font-bold">45:30</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '30%'}}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Questão 3 de 10</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">
                Questão 3: Qual é o resultado de 2x + 5 = 15?
              </h2>
              
              <div className="space-y-3">
                {['x = 5', 'x = 10', 'x = 7.5', 'x = 2.5'].map((opcao, index) => (
                  <label key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="radio" name="resposta" value={opcao} className="mr-3" />
                    <span>{String.fromCharCode(65 + index)}) {opcao}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button className="btn-secondary">
                Questão Anterior
              </button>
              <button className="btn-primary">
                Próxima Questão
              </button>
            </div>
          </div>
        </div>
      </PlanProtection>
    )
  }

  return (
    <PlanProtection requiredPlan="basico">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Criar Novo Simulado
          </h1>
          <p className="text-gray-600">
            Configure seu simulado personalizado
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matéria
              </label>
              <select 
                value={config.materia}
                onChange={(e) => setConfig({...config, materia: e.target.value})}
                className="input-field"
              >
                <option value="matematica">Matemática</option>
                <option value="portugues">Português</option>
                <option value="historia">História</option>
                <option value="geografia">Geografia</option>
                <option value="ciencias">Ciências</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dificuldade
              </label>
              <select 
                value={config.dificuldade}
                onChange={(e) => setConfig({...config, dificuldade: e.target.value})}
                className="input-field"
              >
                <option value="facil">Fácil</option>
                <option value="medio">Médio</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade de Questões
              </label>
              <select 
                value={config.quantidade}
                onChange={(e) => setConfig({...config, quantidade: parseInt(e.target.value)})}
                className="input-field"
              >
                <option value={5}>5 questões</option>
                <option value={10}>10 questões</option>
                <option value={20}>20 questões</option>
                <option value={30}>30 questões</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo Limite (minutos)
              </label>
              <select 
                value={config.tempo}
                onChange={(e) => setConfig({...config, tempo: parseInt(e.target.value)})}
                className="input-field"
              >
                <option value={30}>30 minutos</option>
                <option value={60}>60 minutos</option>
                <option value={90}>90 minutos</option>
                <option value={120}>120 minutos</option>
              </select>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={handleCreateSimulado}
              disabled={loading}
              className="btn-primary text-lg px-8 py-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Criando Simulado...
                </div>
              ) : (
                'Iniciar Simulado'
              )}
            </button>
          </div>
        </div>
      </div>
    </PlanProtection>
  )
}
