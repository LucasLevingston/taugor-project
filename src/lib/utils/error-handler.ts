import { toast } from 'sonner'

export interface FirebaseAuthError {
  code: string
  message: string
}

// Mapeamento completo de erros do Firebase Auth para mensagens em português
const errorMessages: Record<string, string> = {
  // Erros de autenticação
  'auth/user-not-found': 'Usuário não encontrado. Verifique o email informado.',
  'auth/wrong-password': 'Senha incorreta. Tente novamente.',
  'auth/invalid-email': 'Email inválido. Verifique o formato do email.',
  'auth/user-disabled':
    'Esta conta foi desabilitada. Entre em contato com o suporte.',
  'auth/invalid-credential': 'Credenciais inválidas. Verifique email e senha.',
  'auth/invalid-login-credentials':
    'Credenciais de login inválidas. Verifique email e senha.',

  // Erros de criação de conta
  'auth/email-already-in-use':
    'Este email já está sendo usado por outra conta.',
  'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
  'auth/operation-not-allowed':
    'Operação não permitida. Entre em contato com o suporte.',

  // Erros de reset de senha
  'auth/expired-action-code':
    'O código de redefinição de senha expirou. Solicite um novo.',
  'auth/invalid-action-code':
    'Código de redefinição inválido. Solicite um novo.',
  'auth/user-token-expired': 'Sua sessão expirou. Faça login novamente.',

  // Erros de rede e conexão
  'auth/network-request-failed':
    'Erro de conexão. Verifique sua internet e tente novamente.',
  'auth/timeout': 'A operação demorou muito para responder. Tente novamente.',
  'auth/too-many-requests':
    'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.',

  // Erros do Google Sign-In
  'auth/popup-closed-by-user': 'Login cancelado pelo usuário.',
  'auth/popup-blocked':
    'Pop-up bloqueado pelo navegador. Permita pop-ups e tente novamente.',
  'auth/cancelled-popup-request': 'Solicitação de pop-up cancelada.',
  'auth/unauthorized-domain': 'Domínio não autorizado para esta operação.',

  // Erros de token e sessão
  'auth/id-token-expired':
    'Token de autenticação expirado. Faça login novamente.',
  'auth/id-token-revoked':
    'Token de autenticação revogado. Faça login novamente.',
  'auth/insufficient-permission':
    'Permissões insuficientes para esta operação.',

  // Erros de validação
  'auth/missing-email': 'Email é obrigatório.',
  'auth/missing-password': 'Senha é obrigatória.',
  'auth/invalid-phone-number': 'Número de telefone inválido.',
  'auth/missing-phone-number': 'Número de telefone é obrigatório.',

  // Erros de quota e limites
  'auth/quota-exceeded': 'Cota excedida. Tente novamente mais tarde.',
  'auth/project-not-found': 'Projeto não encontrado. Verifique a configuração.',
  'auth/invalid-api-key': 'Chave de API inválida. Verifique a configuração.',

  // Erros de multi-fator
  'auth/multi-factor-auth-required': 'Autenticação de dois fatores necessária.',
  'auth/maximum-second-factor-count-exceeded':
    'Número máximo de fatores secundários excedido.',

  // Erros de provider
  'auth/provider-already-linked':
    'Esta conta já está vinculada a outro provedor.',
  'auth/no-such-provider': 'Provedor de autenticação não encontrado.',
  'auth/invalid-provider-id': 'ID do provedor inválido.',

  // Erros de verificação de email
  'auth/invalid-verification-code': 'Código de verificação inválido.',
  'auth/invalid-verification-id': 'ID de verificação inválido.',
  'auth/missing-verification-code': 'Código de verificação é obrigatório.',
  'auth/missing-verification-id': 'ID de verificação é obrigatório.',

  // Erros de configuração
  'auth/app-deleted': 'Aplicação foi deletada.',
  'auth/app-not-authorized': 'Aplicação não autorizada.',
  'auth/argument-error': 'Argumento inválido fornecido.',
  'auth/invalid-app-credential': 'Credencial da aplicação inválida.',
  'auth/invalid-app-id': 'ID da aplicação inválido.',

  // Erros de CORS e domínio
  'auth/cors-unsupported': 'CORS não suportado neste navegador.',
  'auth/dynamic-link-not-activated': 'Link dinâmico não ativado.',
  'auth/invalid-domain': 'Domínio inválido.',

  // Erros de tenant
  'auth/invalid-tenant-id': 'ID do tenant inválido.',
  'auth/tenant-id-mismatch': 'ID do tenant não corresponde.',

  // Erros de reCAPTCHA
  'auth/recaptcha-not-enabled': 'reCAPTCHA não habilitado.',
  'auth/missing-recaptcha-token': 'Token reCAPTCHA ausente.',
  'auth/invalid-recaptcha-token': 'Token reCAPTCHA inválido.',
  'auth/invalid-recaptcha-action': 'Ação reCAPTCHA inválida.',

  // Erros de custom token
  'auth/custom-token-mismatch': 'Token customizado não corresponde.',
  'auth/invalid-custom-token': 'Token customizado inválido.',

  // Erros gerais
  'auth/internal-error':
    'Erro interno do servidor. Tente novamente mais tarde.',
  'auth/invalid-user-token': 'Token do usuário inválido. Faça login novamente.',
  'auth/user-mismatch': 'Usuário não corresponde ao esperado.',
  'auth/requires-recent-login':
    'Esta operação requer login recente. Faça login novamente.',

  // Erros de Firestore
  'firestore/permission-denied': 'Permissão negada para acessar os dados.',
  'firestore/unavailable':
    'Serviço temporariamente indisponível. Tente novamente.',
  'firestore/deadline-exceeded': 'Operação demorou muito para responder.',
  'firestore/not-found': 'Documento não encontrado.',
  'firestore/already-exists': 'Documento já existe.',
  'firestore/resource-exhausted':
    'Recursos esgotados. Tente novamente mais tarde.',
  'firestore/failed-precondition': 'Condição prévia falhou.',
  'firestore/aborted': 'Operação foi abortada.',
  'firestore/out-of-range': 'Valor fora do intervalo permitido.',
  'firestore/unimplemented': 'Operação não implementada.',
  'firestore/data-loss': 'Perda de dados detectada.',
  'firestore/unauthenticated': 'Usuário não autenticado.',
}

export const handleAuthError = (error: any): FirebaseAuthError => {
  console.error('Auth Error:', error)

  const errorCode = error?.code || 'unknown'
  const customMessage = errorMessages[errorCode]

  const authError: FirebaseAuthError = {
    code: errorCode,
    message:
      customMessage ||
      error?.message ||
      'Ocorreu um erro inesperado. Tente novamente.',
  }

  // Mostrar toast de erro
  toast.error('Erro de Autenticação', {
    description: authError.message,
    duration: 5000,
    action: {
      label: 'Fechar',
      onClick: () => toast.dismiss(),
    },
  })

  return authError
}

export const handleFirestoreError = (error: any): void => {
  console.error('Firestore Error:', error)

  const errorCode = error?.code || 'unknown'
  const customMessage = errorMessages[errorCode]

  const message =
    customMessage || error?.message || 'Erro ao acessar dados. Tente novamente.'

  toast.error('Erro de Dados', {
    description: message,
    duration: 5000,
    action: {
      label: 'Fechar',
      onClick: () => toast.dismiss(),
    },
  })
}

export const handleGenericError = (error: any, title = 'Erro'): void => {
  console.error('Generic Error:', error)

  const message =
    error?.message || 'Ocorreu um erro inesperado. Tente novamente.'

  toast.error(title, {
    description: message,
    duration: 5000,
    action: {
      label: 'Fechar',
      onClick: () => toast.dismiss(),
    },
  })
}

// Função para mostrar toast de sucesso
export const showSuccessToast = (title: string, description?: string): void => {
  toast.success(title, {
    description,
    duration: 4000,
  })
}

// Função para mostrar toast de informação
export const showInfoToast = (title: string, description?: string): void => {
  toast.info(title, {
    description,
    duration: 4000,
  })
}

// Função para mostrar toast de aviso
export const showWarningToast = (title: string, description?: string): void => {
  toast.warning(title, {
    description,
    duration: 4000,
  })
}

// Função para mostrar toast de loading
export const showLoadingToast = (title: string, description?: string) => {
  return toast.loading(title, {
    description,
  })
}

// Função para atualizar toast de loading
export const updateLoadingToast = (
  toastId: string,
  type: 'success' | 'error' | 'info' | 'warning',
  title: string,
  description?: string
): void => {
  toast[type](title, {
    id: toastId,
    description,
    duration: 4000,
  })
}
