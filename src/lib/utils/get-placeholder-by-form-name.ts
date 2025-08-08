export const getPlaceholderByFormName = (name: string) => {
  switch (name) {
    case 'id':
      return 'Identificador'
    case 'name':
      return 'Nome completo'
    case 'displayName':
      return 'Nome completo'
    case 'email':
      return 'Digite seu e-mail'
    case 'password':
      return 'Digite sua senha'
    case 'confirmPassword':
      return 'Confirme sua senha'
    case 'cpf':
      return 'Digite seu CPF'
    case 'googleAccessToken':
      return 'Token de acesso Google'
    case 'imageUrl':
      return 'URL da imagem'
    case 'gender':
      return 'Selecione o gênero'
    case 'role':
      return 'Selecione o cargo'
    case 'isActive':
      return 'Usuário ativo?'
    case 'lastLogin':
      return 'Último login'
    case 'emailVerified':
      return 'E-mail verificado?'
    case 'birthDate':
      return 'Data de nascimento'
    case 'phone':
      return 'Telefone de contato'
    case 'zipCode':
      return 'CEP'
    case 'city':
      return 'Cidade'
    case 'state':
      return 'Estado'
    case 'street':
      return 'Rua'
    case 'number':
      return 'Número'
    case 'createdAt':
      return 'Data de criação'
    case 'updatedAt':
      return 'Última atualização'
    case 'action':
      return 'Nome da ação'
    case 'objective':
      return 'Objetivo da ação'
    case 'status':
      return 'Status atual'
    case 'product':
      return 'Produto'
    case 'unity':
      return 'Unidade de medida'
    case 'predictedValue':
      return 'Valor previsto'
    case 'predictedStartsDate':
      return 'Início previsto'
    case 'predictedEndDate':
      return 'Término previsto'
    case 'programName':
      return 'Nome do programa'
    case 'programType':
      return 'Tipo do programa'
    case 'strategicAxis':
      return 'Eixo estratégico'
    case 'budget':
      return 'Orçamento'
    case 'startDate':
      return 'Data de início'
    case 'endDate':
      return 'Data de término'
    case 'targetAudience':
      return 'Público-alvo'
    case 'prefectureName':
      return 'Nome da prefeitura'
    default:
      return 'Digite um valor'
  }
}
