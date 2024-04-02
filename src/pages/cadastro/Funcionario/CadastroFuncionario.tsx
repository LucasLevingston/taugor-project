// Em CadastroFuncionario1.js
import Header from '@/components/Header';
import Formulario from '../../../components/Formulario';
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { useAuntenticacao } from '@/hooks/usuarios.hooks';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { win } from '@/estatico';

export default function CadastroFuncionario1() {
	const [progresso, setProgresso] = useState(0);

	const handleProgressChange = (newProgress: number) => {
		setProgresso(Math.floor(newProgress));
	};

	React.useEffect(() => {
		const timer = setTimeout(() => setProgresso(0), 500);
		return () => clearTimeout(timer);
	}, []);
	const { carregando, usuario } = useAuntenticacao();

	return (
		<div>
			<Header progresso={progresso} />
			{carregando ? (
				<div className="flex h-full w-full flex-col items-center justify-center space-y-5">
					<div>Carregando...</div>
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
				</div>
			) : usuario ? (
				<div>
					<Progress value={progresso} className="w-[60%]" />
					<Formulario onChangeProgresso={handleProgressChange} />
				</div>
			) : (
				<div className="flex items-center justify-center space-x-5 ">
					<div>Faça o login para Continuar </div>
					<Button
						variant="outline"
						onClick={() => {
							win.location = '/login';
						}}
					>
						Fazer login
					</Button>
				</div>
			)}
		</div>
	);
}
