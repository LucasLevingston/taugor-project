import { DataTable, Colunas } from './Colunas';
import Header from '@/components/Header';
import { getFuncionarios } from '@/hooks/getFuncionariosHooks';

export default function GetFuncionarios() {
	const funcionarios = getFuncionarios();

	return (
		<div>
			<Header></Header>
			<DataTable columns={Colunas} data={funcionarios} />
		</div>
	);
}
