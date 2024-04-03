import generatePDF from 'react-to-pdf';
import { Button } from '../ui/button';
import { getFuncionarioPeloId } from '@/hooks/funcionarios.hooks';
import ConteudoPDF from './ConteudoPDF';
import { useParams } from 'react-router-dom';
import { win } from '@/estatico';
import { ChevronLeft } from 'lucide-react';

const getTargetElement = () => document.getElementById('conteudoPDF');
export default function GerarPDF() {
	const { id } = useParams<{ id: string }>();
	const funcionario = getFuncionarioPeloId(id);

	const handleGerarPDF = async () => {
		await generatePDF(getTargetElement);
	};
	return (
		<div className="p-7">
			{funcionario ? (
				<div>
					<div className="flex w-full justify-between">
						<Button
							onClick={() => (win.location = `/get-funcionario/${id}`)}
							variant="outline"
						>
							{' '}
							<ChevronLeft className="h-4 w-4" />
							Voltar
						</Button>
						<Button onClick={handleGerarPDF} variant="outline">
							Gerar PDF
						</Button>
					</div>
					<ConteudoPDF funcionario={funcionario} />
				</div>
			) : null}
		</div>
	);
}
