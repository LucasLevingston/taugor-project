import React, { useState } from 'react';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog';
import { LuPencil } from 'react-icons/lu';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
	FuncionarioType,
	alterarDadoFuncionario,
} from '@/hooks/funcionarios.hooks';
import {
	cargoOpcoes,
	estadosBrasileiros,
	formatarDataParaNumeros,
	setorOpcoes,
	sexoOpcoes,
} from '@/estatico';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from './ui/command';
import InputMask from 'react-input-mask';

export default function BotaoAlterarDado({
	funcionario,
	field,
	novoValor,
	antigoValor,
	handleChange,
}: {
	funcionario: FuncionarioType;
	field: string;
	novoValor: string;
	antigoValor: string | Number;
	handleChange: (field: string, value: string) => void;
}) {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenDialog = () => {
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleContinue = async () => {
		handleChange(field, novoValor);
		handleCloseDialog();
		if (funcionario.id) {
			if (await alterarDadoFuncionario(funcionario.id, field, novoValor)) {
				window.location.reload();
			}
		}
	};
	function opcoesSelecionar(field: string) {
		if (field === 'setor') return setorOpcoes;
		if (field === 'cargo') return cargoOpcoes;
		if (field === 'sexo') return sexoOpcoes;
	}
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('');
	return (
		<>
			<AlertDialog open={isOpen}>
				<AlertDialogTrigger
					asChild
					className="flex items-center justify-center"
				>
					<Button variant="ghost" onClick={handleOpenDialog}>
						<LuPencil />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="bg-cinza">
					<AlertDialogHeader>
						<AlertDialogTitle className="border-cinza ">
							Alterar dado{' '}
						</AlertDialogTitle>
						<AlertDialogDescription>
							Atual: {String(antigoValor)}
						</AlertDialogDescription>
						{field === 'nascimento' || field === 'dataAdmissao' ? (
							<Input
								type="date"
								className="w-[50%] border-[2px] bg-cinza "
								placeholder="Selecione a data"
								onChange={(event) =>
									handleChange(
										field,
										formatarDataParaNumeros(event.target.value)
									)
								}
							/>
						) : field === 'endereco.2' ? (
							<div className="flex-col border-preto bg-cinza  p-3">
								<InputMask
									mask="999999-99"
									placeholder="Digite o CEP"
									className="rounded bg-branco p-2"
									onChange={(event) => {
										handleChange(field, event.target.value);
									}}
								/>
							</div>
						) : field === 'endereco.4' ? (
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger
									asChild
									className="border-[2px] border-mainColor"
								>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={open}
										className={cn('w-[200px] justify-between border-preto ')}
									>
										{value
											? estadosBrasileiros.find(
													(estado) => estado.value === value
												)?.label
											: 'Selecione o estado'}
										<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] bg-branco p-0 text-preto">
									<Command>
										<CommandInput placeholder="Selecione o estado" />
										<CommandEmpty>Estado nao encontrado</CommandEmpty>
										<CommandList className="">
											<CommandGroup className="bg-branco font-bold text-preto ">
												{estadosBrasileiros.map((estado) => (
													<CommandItem
														className="font-bold text-preto "
														value={estado.value}
														key={estado.value}
														onSelect={(e) => {
															setValue(e);
															handleChange(field, e);
															setOpen(false);
														}}
													>
														<Check
															className={cn(
																'mr-2 h-4 w-4',
																estado.value === antigoValor
																	? 'opacity-100'
																	: 'opacity-0'
															)}
														/>
														{estado.label}
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						) : field === 'telefone' ? (
							<div className="flex-col border-preto bg-cinza  p-3">
								<InputMask
									mask="(99)99999-9999"
									placeholder="Digite o número de celular"
									className="w-[50%]  rounded bg-branco p-2"
									onChange={(event) => {
										handleChange(field, event.target.value);
									}}
								/>
							</div>
						) : field === 'sexo' || field === 'setor' || field === 'cargo' ? (
							<Select
								onValueChange={(value) => handleChange(field, value)}
								defaultValue={novoValor}
							>
								<SelectTrigger className="w-[180px] border-[2px]  ">
									<SelectValue placeholder="Selecionar" />
								</SelectTrigger>
								<SelectContent className="bg-branco text-preto ">
									{opcoesSelecionar(field)?.map((opcao) => (
										<SelectItem key={opcao.id} value={opcao.id}>
											{opcao.opcao}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : (
							<Input
								placeholder="Digite o novo valor"
								onChange={(event) => {
									handleChange(field, event.target.value);
								}}
								type={
									field === 'salario' || field === 'endereco.2'
										? 'Number'
										: 'text'
								}
							/>
						)}
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel
							className="border-transparent"
							onClick={handleCloseDialog}
						>
							Cancel
						</AlertDialogCancel>
						<Button
							variant="outline"
							className="border-preto"
							onClick={handleContinue}
						>
							Continue
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
