export function getLabelByFormName(name: string): string {
  switch (name) {
    case 'name':
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
    case 'title': // For HumanResources, Contracts, Indicators
      return 'Título'
    case 'description': // For HumanResources, Departments, Indicators
      return 'Descrição'
    case 'contactEmail': // For Departments, HumanResources
      return 'Email de Contato'
    case 'contactPhone': // For Departments, HumanResources
      return 'Telefone de Contato'
    case 'location': // For Departments, HumanResources
      return 'Localização'
    case 'budget': // For Departments, HumanResources
      return 'Orçamento'
    case 'headOfDepartmentId': // For Departments, HumanResources
      return 'Chefe do Departamento'
    case 'contractNumber': // For Contracts
      return 'Número do Contrato'
    case 'value': // For Contracts
      return 'Valor'
    case 'startDate': // For Contracts
      return 'Data de Início'
    case 'endDate': // For Contracts
      return 'Data de Término'
    case 'partiesInvolved': // For Contracts
      return 'Partes Envolvidas'
    case 'type': // For Contracts
      return 'Tipo'
    case 'unit': // For Indicators
      return 'Unidade de Medida'
    case 'targetValue': // For Indicators
      return 'Valor Alvo'
    case 'actualValue': // For Indicators
      return 'Valor Atual'
    case 'measurementFrequency': // For Indicators
      return 'Frequência de Medição'
    case 'dataSource': // For Indicators
      return 'Fonte de Dados'
    default:
      return name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim()
  }
}
