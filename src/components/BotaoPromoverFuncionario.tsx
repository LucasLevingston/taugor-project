import React from 'react';
import {
	FuncionarioType,
	alterarDadoFuncionario,
} from '@/hooks/funcionarios.hooks';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Navigate } from 'react-router-dom';

interface PromoverFuncionarioProps {
	funcionario: FuncionarioType;
}

function novoValor(funcionario: FuncionarioType) {
	if (funcionario.cargo === 'estagiario') return 'junior';
	if (funcionario.cargo === 'junior') return 'pleno';
	if (funcionario.cargo === 'pleno') return 'senior';
	else {
		return null;
	}
}

async function promover(funcionario: FuncionarioType) {
	const novoCargo = novoValor(funcionario);
	if (funcionario.id && novoCargo) {
		if (await alterarDadoFuncionario(funcionario.id, 'cargo', novoCargo)) {
			<Navigate to="/login" />;
		}
	}
}

export const PromoverFuncionario: React.FC<PromoverFuncionarioProps> = ({
	funcionario,
}) => {
	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger className="rounded-md border-[1px] bg-verde p-2 text-sm font-bold">
					Promover Funcionario
				</AlertDialogTrigger>
				<AlertDialogContent className="bg-cinza">
					<AlertDialogHeader>
						<AlertDialogTitle>Promover funcionário?</AlertDialogTitle>
						<AlertDialogDescription>
							O funcionário será promovido a {novoValor(funcionario)}.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="bg-cinza">
						<AlertDialogCancel className="border-0">Cancelar</AlertDialogCancel>
						<AlertDialogAction
							className="border"
							onClick={() => {
								promover(funcionario);
							}}
						>
							Promover
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};
