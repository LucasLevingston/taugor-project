export function getLabelByFormName(name: string): string {
  switch (name) {
    case 'name':
      return 'Nome Completo'
    case 'displayName':
      return 'Nome Completo'
    case 'email':
      return 'Email'
    case 'password':
      return 'Senha'
    case 'confirmPassword':
      return 'Confirmar senha'
    case 'cpf':
      return 'CPF'
    case 'imageUrl':
      return 'URL da Imagem'
    case 'birthDate':
      return 'Data de Nascimento'
    case 'phone':
      return 'Telefone'
    case 'gender':
      return 'Sexo'
    case 'zipCode':
      return 'CEP'
    case 'street':
      return 'Rua'
    case 'number':
      return 'Número'
    case 'city':
      return 'Cidade'
    case 'state':
      return 'Estado'
    case 'profilePictureFile':
      return 'Foto de Perfil'
    case 'action':
      return 'Ação'
    case 'objective':
      return 'Objetivo'
    case 'product':
      return 'Produto'
    case 'unity':
      return 'Unidade'
    case 'predictedValue':
      return 'Valor Previsto'
    case 'status':
      return 'Status'
    case 'predictedStartsDate':
      return 'Início Previsto'
    case 'predictedEndDate':
      return 'Término Previsto'
    case 'registrationNumber':
      return 'Número de Matrícula'
    case 'pisNumber':
      return 'Número PIS'
    case 'hireDate':
      return 'Data de Contratação'
    case 'terminationDate':
      return 'Data de Demissão'
    case 'jobPositionId':
      return 'Cargo'
    case 'departmentId':
      return 'Departamento'
    case 'salary':
      return 'Salário'
    case 'emergencyContactName':
      return 'Contato de Emergência'
    case 'emergencyContactPhone':
      return 'Telefone de Emergência'
    case 'title':
      return 'Título'
    case 'description':
      return 'Descrição'
    case 'contactEmail':
      return 'Email de Contato'
    case 'contactPhone':
      return 'Telefone de Contato'
    case 'location':
      return 'Localização'
    case 'budget':
      return 'Orçamento'
    case 'headOfDepartmentId':
      return 'Chefe do Departamento'
    case 'contractNumber':
      return 'Número do Contrato'
    case 'value':
      return 'Valor'
    case 'startDate':
      return 'Data de Início'
    case 'endDate':
      return 'Data de Término'
    case 'partiesInvolved':
      return 'Partes Envolvidas'
    case 'type':
      return 'Tipo'
    case 'unit':
      return 'Unidade de Medida'
    case 'targetValue':
      return 'Valor Alvo'
    case 'actualValue':
      return 'Valor Atual'
    case 'measurementFrequency':
      return 'Frequência de Medição'
    case 'dataSource':
      return 'Fonte de Dados'
    default:
      return name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim()
  }
}
