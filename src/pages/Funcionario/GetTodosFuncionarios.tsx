import {
	TabelaUsuarios,
	Colunas,
} from '../../components/ColunasTodosFuncionarios';
import Header from '@/components/Header';
import {
	getFuncionariosAtivos,
	FuncionarioType,
} from '@/hooks/funcionarios.hooks';
import { Button } from '@/components/ui/button';
import { useAuntenticacao } from '@/hooks/usuarios.hooks';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export default function GetFuncionarios(): JSX.Element {
	const funcionarios: FuncionarioType[] = getFuncionariosAtivos();
	const { carregando, usuario } = useAuntenticacao();

	return (
		<div>
			<Header />
			{carregando ? (
				<div className="flex h-full w-full flex-col items-center justify-center space-y-5">
					<div>Carregando...</div>
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
				</div>
			) : usuario ? (
				<TabelaUsuarios columns={Colunas} data={funcionarios} />
			) : (
				<div className="flex items-center justify-center space-x-5 ">
					<div>Faça o login para Continuar </div>
					<Button variant="outline">
						<Link to="/login">Fazer login</Link>
					</Button>
				</div>
			)}
		</div>
	);
}
