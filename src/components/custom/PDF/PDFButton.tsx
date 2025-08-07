import { ChevronLeft } from 'lucide-react'
import { FaRegFilePdf } from 'react-icons/fa6'
import { Link, useParams } from 'react-router-dom'
import generatePDF from 'react-to-pdf'
import { Button } from '@/components/ui/button'
import { useEmployees } from '@/hooks/use-employee'
import PDFViewer from './PDFViewer'

const getTargetElement = () => document.getElementById('conteudoPDF')

export function PDFButton() {
  const { id } = useParams<{ id: string }>()

  if (!id) throw new Error('Id not defined')

  const { getEmployeeById } = useEmployees()
  const employee = getEmployeeById(id)

  const handleGeneratePDF = async () => {
    await generatePDF(getTargetElement)
  }
  return (
    <div className="p-7">
      {employee ? (
        <div>
          <div className="flex w-full justify-between">
            <Button variant="outline">
              <Link className="flex items-center" to={`/get-employee/${id}`}>
                {' '}
                <ChevronLeft className="h-4 w-4" />
                Voltar
              </Link>
            </Button>
            <Button
              className="flex  w-[8%] justify-center space-x-6"
              onClick={handleGeneratePDF}
              variant="outline"
            >
              <div>Gerar PDF</div>
              <FaRegFilePdf />
            </Button>
          </div>
          <PDFViewer employee={employee} />
        </div>
      ) : null}
    </div>
  )
}
