import { BsJournalText } from 'react-icons/bs'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { formatarDataHistorico } from '@/estatico'
import { EmployeeType } from '@/types/employee-type'

export default function HistoricButton({
  employee,
}: {
  employee: EmployeeType
}) {
  return (
    <div className="rounded-lg border">
      <Sheet>
        <SheetTrigger className="text-xm flex items-center justify-center space-x-2 p-2 px-3">
          <div>Ver Histórico</div>
          <BsJournalText />
        </SheetTrigger>
        <SheetContent className="bg-cinza">
          <SheetHeader>
            <SheetTitle>Histórico</SheetTitle>
            <SheetDescription className="max-h-[90vh] overflow-y-auto">
              {employee.history.map(({ action, date }) => (
                <div className="space-y-1 border-b py-2" key={date}>
                  <p>Ocorrido: {action}</p>
                  <p>Data: {formatarDataHistorico(date)}</p>
                </div>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
