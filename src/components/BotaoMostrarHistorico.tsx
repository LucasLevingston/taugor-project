import { FuncionarioType } from '@/hooks/funcionarios.hooks';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { BsJournalText } from 'react-icons/bs';
import { formatarDataHistorico } from '@/estatico';
export default function BotaoMostrarHistorico({
	funcionario,
}: {
	funcionario: FuncionarioType;
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
							{funcionario.historico.map((acontecimento, index) => (
								<div key={index} className="space-y-1 border-b py-2">
									<p>Ocorrido: {acontecimento.ocorrido}</p>
									<p>Data: {formatarDataHistorico(acontecimento.data)}</p>
								</div>
							))}
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	);
}
