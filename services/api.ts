const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gabarita-ai-backend.onrender.com'

// Função para obter o token de autenticação
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken')
  }
  return null
}

// Função para fazer requisições autenticadas
const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    headers,
  })
}

// Serviços de Autenticação
export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  },

  register: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    return response.json()
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
    }
  },
}

// Serviços de Usuário
export const userService = {
  getProfile: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/usuario/perfil`)
    return response.json()
  },

  updateProfile: async (userData: any) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/usuario/perfil`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
    return response.json()
  },

  getPlan: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/usuario/plano`)
    return response.json()
  },
}

// Serviços de Planos
export const planService = {
  getPlans: async () => {
    const response = await fetch(`${API_BASE_URL}/api/planos`)
    return response.json()
  },

  subscribeToPlan: async (planId: string) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/planos/assinar`, {
      method: 'POST',
      body: JSON.stringify({ plano_id: planId }),
    })
    return response.json()
  },
}

// Serviços de Questões
export const questionService = {
  getQuestions: async (filters: any = {}) => {
    const queryParams = new URLSearchParams(filters).toString()
    const response = await authenticatedFetch(`${API_BASE_URL}/api/questoes?${queryParams}`)
    return response.json()
  },

  getQuestionById: async (id: string) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/questoes/${id}`)
    return response.json()
  },

  submitAnswer: async (questionId: string, answer: string) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/questoes/${questionId}/responder`, {
      method: 'POST',
      body: JSON.stringify({ resposta: answer }),
    })
    return response.json()
  },
}

// Serviços de Simulados
export const simuladoService = {
  createSimulado: async (config: any) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/simulados/criar`, {
      method: 'POST',
      body: JSON.stringify(config),
    })
    return response.json()
  },

  getSimulados: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/simulados`)
    return response.json()
  },

  getSimuladoById: async (id: string) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/simulados/${id}`)
    return response.json()
  },

  submitSimulado: async (simuladoId: string, respostas: any) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/simulados/${simuladoId}/finalizar`, {
      method: 'POST',
      body: JSON.stringify({ respostas }),
    })
    return response.json()
  },
}

// Serviços de Dashboard
export const dashboardService = {
  getStats: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/dashboard/estatisticas`)
    return response.json()
  },

  getProgress: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/dashboard/progresso`)
    return response.json()
  },

  getRecentActivity: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/dashboard/atividades`)
    return response.json()
  },
}

// Serviços de Pagamento
export const paymentService = {
  createPayment: async (planId: string) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/pagamentos/criar`, {
      method: 'POST',
      body: JSON.stringify({ plano_id: planId }),
    })
    return response.json()
  },

  verifyPayment: async (paymentId: string) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/pagamentos/verificar/${paymentId}`)
    return response.json()
  },

  getPaymentHistory: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/pagamentos/historico`)
    return response.json()
  },
}

// Serviços de Redação
export const redacaoService = {
  submitRedacao: async (tema: string, texto: string) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/redacao/enviar`, {
      method: 'POST',
      body: JSON.stringify({ tema, texto }),
    })
    return response.json()
  },

  getRedacoes: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/redacao/historico`)
    return response.json()
  },

  getRedacaoById: async (id: string) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/redacao/${id}`)
    return response.json()
  },
}

// Serviços de Notícias
export const newsService = {
  getNews: async () => {
    const response = await fetch(`${API_BASE_URL}/api/noticias`)
    return response.json()
  },

  getNewsById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/noticias/${id}`)
    return response.json()
  },
}

// Serviços de Ranking
export const rankingService = {
  getRanking: async (type: string = 'geral') => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/ranking/${type}`)
    return response.json()
  },

  getUserRanking: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/ranking/usuario`)
    return response.json()
  },
}

// Serviços de Ajuda
export const helpService = {
  getFAQ: async () => {
    const response = await fetch(`${API_BASE_URL}/api/ajuda/faq`)
    return response.json()
  },

  submitTicket: async (subject: string, message: string) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/ajuda/ticket`, {
      method: 'POST',
      body: JSON.stringify({ assunto: subject, mensagem: message }),
    })
    return response.json()
  },

  getTickets: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/ajuda/tickets`)
    return response.json()
  },
}
