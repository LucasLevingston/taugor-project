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
export default function BotaoMostrarHistorico({
	funcionario,
}: {
	funcionario: FuncionarioType;
}) {
	function formatarDataHistorico(data: string): string {
		const dataObj = new Date(data);

		const dia = dataObj.getDate().toString().padStart(2, '0');
		const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
		const ano = dataObj.getFullYear().toString();
		const hora = dataObj.getHours().toString().padStart(2, '0');
		const minuto = dataObj.getMinutes().toString().padStart(2, '0');
		const segundo = dataObj.getSeconds().toString().padStart(2, '0');

		const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;

		return dataFormatada;
	}

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
