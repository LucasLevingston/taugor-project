// Em CadastroFuncionario1.js
import Header from '@/components/Header';
import Formulario from './Formulario';
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';

export default function CadastroFuncionario1() {
	const [progresso, setProgresso] = useState(0);

	const handleProgressChange = (newProgress: number) => {
		setProgresso(Math.floor(newProgress));
	};

	React.useEffect(() => {
		const timer = setTimeout(() => setProgresso(0), 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			<Header progresso={progresso} />
			<Progress value={progresso} className="w-[60%]" />
			<Formulario onChangeProgresso={handleProgressChange} />
		</div>
	);
}
