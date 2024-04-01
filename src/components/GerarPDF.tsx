import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
import { Button } from './ui/button';
import { FuncionarioType } from '@/hooks/funcionarios.hooks';

function GerarPDF(funcionario: FuncionarioType) {
	return (
		<div>
			<Button>GerarPDF</Button>
		</div>
	);
}

export default GerarPDF;
