import generatePDF from 'react-to-pdf';
import { Button } from '../ui/button';
import { getFuncionarioPeloId } from '@/hooks/funcionarios.hooks';
import ConteudoPDF from './ConteudoPDF';
import { Link, useParams } from 'react-router-dom';
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
						<Button variant="outline">
							<Link to={`/get-funcionario/${id}`} className="flex items-center">
								{' '}
								<ChevronLeft className="h-4 w-4" />
								Voltar
							</Link>
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
