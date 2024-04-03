import {
	DataFormatada,
	formatarDataHistorico,
	formatarDataParaNumeros,
	formatarTelefone,
} from '@/estatico';
import { UseFormReturn } from 'react-hook-form';

interface VerPDFProps {
	form: UseFormReturn<
		{
			nome: string;
			email: string;
			sexo: string;
			rua: string;
			numero: string;
			cep: string;
			cidade: string;
			fotoPerfil: undefined;
			estado: string;
			telefone: string;
			nascimento: string;
			setor: string;
			cargo: string;
			dataAdmissao: string;
			salario: number;
		},
		any,
		undefined
	>;
}

export const VerPDF: React.FC<VerPDFProps> = ({ form }) => {
	{
		return (
			<div className="m-24 w-[40%] space-y-16 rounded border-2 p-3">
				<div className="w-full ">
					<div className="pb-7 text-3xl font-bold">Informações de Contato</div>
					<div className="flex">
						<div className="flex w-[60%] flex-col ">
							<div className="w-full space-y-5">
								<div className="h-13 p-2 ">
									<h1 className="text-xl font-bold">Nome</h1>
									<h2 className="text-2xl">{form.getValues('nome')}</h2>
								</div>
								<div className="h-13 p-2 ">
									<h1 className="text-xl font-bold">Email</h1>
									<h2 className="text-2xl">{form.getValues('email')}</h2>
								</div>
								<div className="flex space-x-10 ">
									<div className="h-13  p-2">
										<h1 className="text-xl font-bold">Rua</h1>
										<h2 className="text-2xl">{form.getValues('rua')}</h2>
									</div>
									<div className="h-13 p-2 ">
										<h1 className="text-xl font-bold">Número</h1>
										<h2 className="text-2xl">{form.getValues('numero')}</h2>
									</div>
								</div>
								<div className="h-13  p-2 ">
									<h1 className="text-xl font-bold">CEP</h1>
									<h2 className="text-2xl">{form.getValues('cep')}</h2>
								</div>
								<div className="flex space-x-10">
									<div className="h-13 w-[40%] p-2">
										<h1 className="text-xl font-bold">Cidade</h1>
										<h2 className="text-2xl">{form.getValues('cidade')}</h2>
									</div>
									<div className="h-13  p-2 ">
										<h1 className="text-xl font-bold">Estado</h1>
										<h2 className="text-2xl">{form.getValues('estado')}</h2>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col space-y-5  p-2">
							<div className="p-2">
								<h1 className="text-xl font-bold">Sexo</h1>
								<h2 className="text-2xl">{form.getValues('sexo')}</h2>
							</div>
							<div className="p-2">
								<h1 className="text-xl font-bold">Número de Celular</h1>
								<h2 className="text-2xl">
									{formatarTelefone(form.getValues('telefone'))}
								</h2>
							</div>
							<div className="p-2">
								<h1 className="text-xl font-bold">Data de Aniversário</h1>
								<h2 className="text-2xl">
									{formatarDataParaNumeros(
										DataFormatada(form.getValues('nascimento'))
									)}
								</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full">
					<div className="pb-7 text-3xl font-bold">
						Informações de Funcionário
					</div>
					<div className="flex w-full">
						<div className=" w-[60%] space-y-5 ">
							<div className="h-13  p-2 ">
								<h1 className="text-xl font-bold">Setor</h1>
								<h2 className="text-2xl">{form.getValues('setor')}</h2>
							</div>
							<div className="h-13  p-2 ">
								<h1 className="text-xl font-bold">Cargo</h1>

								<h2 className="text-2xl">{form.getValues('cargo')}</h2>
							</div>
						</div>
						<div className="space-y-5">
							<div className="h-13  p-2 ">
								<h1 className="text-xl font-bold">Salário</h1>
								<h2 className="text-2xl">R$ {form.getValues('salario')}</h2>
							</div>
							<div className="h-13  p-2 ">
								<h1 className="text-xl font-bold">Data de Admissão</h1>
								<h2 className="text-2xl">
									{formatarDataParaNumeros(
										DataFormatada(form.getValues('dataAdmissao'))
									)}
								</h2>
							</div>
						</div>
					</div>
				</div>
				<div className=" flex flex-col space-y-5 p-2">
					<div className="pb-7 text-3xl font-bold">Histórico:</div>
					<h1 className="text-2xl font-bold">
						Ocorrido:{' '}
						<span className="font-normal">Funcionario adicionado</span>
					</h1>
					<h2 className=" py-10  text-2xl font-bold">
						Data:{' '}
						<span className="font-normal">
							{formatarDataHistorico(new Date().toISOString())}
						</span>
					</h2>
				</div>
			</div>
		);
	}
};
