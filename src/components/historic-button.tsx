import { History } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { formatDate } from '@/lib/dayjs'
import { EmployeeType } from '@/types/employee-type'

export default function HistoricButton({
  employee,
}: {
  employee: EmployeeType
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          <History className="h-4 w-4" />
          Historic
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Employee History
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Detailed history of actions related to {employee.name}.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="py-4 space-y-4">
            {employee.history && employee.history.length > 0 ? (
              employee.history.map((entry, index) => (
                <div
                  className="border rounded-md p-4 bg-card text-card-foreground shadow-sm"
                  key={index}
                >
                  <p className="text-lg font-semibold text-primary">
                    {entry.action}
                  </p>
                  {entry.details && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {entry.details}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Date: {formatDate(entry.date)}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No history available for this employee.
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
