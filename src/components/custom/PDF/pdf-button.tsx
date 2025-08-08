'use client'

import { jsPDF } from 'jspdf'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmployeeType } from '@/types/employee-type'

export function PDFButton({ employee }: { employee: EmployeeType }) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleGeneratePDF = () => {
    const doc = new jsPDF()

    let yPos = 20

    doc.setFontSize(22)
    doc.text('Relatório de Dados do Funcionário', 105, yPos, {
      align: 'center',
    })
    yPos += 20

    doc.setFontSize(16)
    doc.text('Informações Pessoais', 20, yPos)
    yPos += 10
    doc.setFontSize(12)
    doc.text(`Nome: ${employee.name}`, 20, yPos)
    doc.text(`Email: ${employee.email}`, 110, yPos)
    yPos += 7
    doc.text(`Telefone: ${employee.phone}`, 20, yPos)
    doc.text(`Data de Nascimento: ${formatDate(employee.birthDate)}`, 110, yPos)
    yPos += 7
    doc.text(`Gênero: ${employee.gender}`, 20, yPos)
    yPos += 15

    doc.setFontSize(16)
    doc.text('Informações de Endereço', 20, yPos)
    yPos += 10
    doc.setFontSize(12)
    doc.text(`Rua: ${employee.street}, ${employee.number}`, 20, yPos)
    doc.text(`CEP: ${employee.zipCode}`, 110, yPos)
    yPos += 7
    doc.text(`Cidade: ${employee.city}`, 20, yPos)
    doc.text(`Estado: ${employee.state}`, 110, yPos)
    yPos += 15

    doc.setFontSize(16)
    doc.text('Detalhes do Emprego', 20, yPos)
    yPos += 10
    doc.setFontSize(12)
    doc.text(`Departamento: ${employee.department}`, 20, yPos)
    doc.text(`Cargo: ${employee.position}`, 110, yPos)
    yPos += 7
    doc.text(`Salário: ${formatCurrency(employee.salary)}`, 20, yPos)
    doc.text(
      `Data de Admissão: ${formatDate(employee.admissionDate)}`,
      110,
      yPos
    )
    yPos += 7
    doc.text(`Status: ${employee.isActive ? 'Ativo' : 'Inativo'}`, 20, yPos)
    yPos += 15

    if (employee.history && employee.history.length > 0) {
      doc.setFontSize(16)
      doc.text('Histórico', 20, yPos)
      yPos += 10
      doc.setFontSize(12)
      employee.history.forEach((item, index) => {
        if (yPos > 280) {
          doc.addPage()
          yPos = 20
        }
        doc.text(`Ação: ${item.action}`, 20, yPos)
        yPos += 7
        doc.text(`Data: ${formatDate(item.date)}`, 20, yPos)
        yPos += 7
        if (item.details) {
          doc.text(`Detalhes: ${item.details}`, 20, yPos)
          yPos += 7
        }
        if (index < employee.history.length - 1) {
          yPos += 5
        }
      })
    }

    if (yPos > 280) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(10)
    doc.text(`Gerado em: ${formatDate(new Date())}`, 105, 290, {
      align: 'center',
    })

    doc.save(`relatorio-${employee.name.replace(/\s/g, '-')}.pdf`)
  }

  return (
    <Button
      className="flex gap-2"
      onClick={handleGeneratePDF}
      variant="default"
    >
      <div>Gerar PDF do Funcionário</div>
      <FileText className="h-4 w-4" />
    </Button>
  )
}
