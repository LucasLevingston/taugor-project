import { TabelaUsuarios, Colunas } from './Colunas';
import Header from '@/components/Header';
import {
	getFuncionariosAtivos,
	FuncionarioType,
} from '@/hooks/funcionarios.hooks';
import { win } from '@/estatico';
import { Button } from '@/components/ui/button';
import { useAuthentication } from '@/hooks/usuarios.hooks';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function GetFuncionarios(): JSX.Element {
	const funcionarios: FuncionarioType[] = getFuncionariosAtivos();
	const { loading, user } = useAuthentication();

	return (
		<div>
			<Header />
			{loading ? (
				<div className="flex h-full w-full flex-col items-center justify-center space-y-5">
					<div>Carregando...</div>
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
				</div>
			) : user ? (
				<TabelaUsuarios columns={Colunas} data={funcionarios} />
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
