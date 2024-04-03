import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaTrash } from 'react-icons/fa';
import {
	FuncionarioType,
	desativarFuncionario,
} from '@/hooks/funcionarios.hooks';
import { FaUserPlus } from 'react-icons/fa6';
import { GoColumns } from 'react-icons/go';
import { RxAvatar } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { ReloadIcon } from '@radix-ui/react-icons';

export const Colunas: ColumnDef<FuncionarioType>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'fotoPerfilUrl',
		header: '',
		cell: ({ row }) => {
			return (
				<Avatar>
					<AvatarImage src={row.getValue('fotoPerfilUrl')} />
					<AvatarFallback>
						<RxAvatar className="h-full w-full" />
					</AvatarFallback>
				</Avatar>
			);
		},
	},
	{
		accessorKey: 'nome',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Nome
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'cargo',
		header: 'Cargo',
	},
	{
		accessorKey: 'setor',
		header: 'Setor',
	},
	{
		accessorKey: 'salario',
		header: () => <div className="text-right">Salário</div>,
		cell: ({ row }) => {
			const salario = parseFloat(row.getValue('salario'));
			const formatted = new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			}).format(salario);

			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const funcionario = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="bg-preto text-branco">
						<DropdownMenuLabel>Acões</DropdownMenuLabel>

						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link to={`/get-funcionario/${funcionario.id}`}>Ver dados</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="flex font-bold text-vermelho"
							onClick={async () => {
								if (funcionario.id) {
									if (await desativarFuncionario(funcionario.id)) {
										window.location.href = '/';
									}
								}
							}}
						>
							Desativar funcionário
							<FaTrash className="ml-3" />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
interface TabelaUsuariosProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function TabelaUsuarios<TData, TValue>({
	columns,
	data,
}: TabelaUsuariosProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [carregando, setCarregando] = useState(true);
	useEffect(() => {
		if (data) {
			setCarregando(false);
		}
	}, [data]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,

		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="flex justify-center">
			{carregando ? (
				<div className="flex h-full w-full flex-col items-center justify-center space-y-5">
					<div>Carregando...</div>
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
				</div>
			) : (
				<div>
					<div className="flex justify-between py-4">
						<Input
							placeholder="Filtrar por nome"
							value={
								(table.getColumn('nome')?.getFilterValue() as string) ?? ''
							}
							onChange={(event) =>
								table.getColumn('nome')?.setFilterValue(event.target.value)
							}
							className="max-w-sm"
						/>
						<Button variant="outline">
							<Link to="/cadastro-funcionario" className="flex items-center">
								Cadastrar Funcionario
								<FaUserPlus className="ml-2" />
							</Link>
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="">
									Colunas
									<GoColumns className="ml-2" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="bg-preto text-branco">
								{table
									.getAllColumns()
									.filter((column) => column.getCanHide())
									.map((column) => {
										return (
											<div key={column.id}>
												{column.id === 'fotoPerfilUrl' ? null : (
													<DropdownMenuCheckboxItem
														className="capitalize"
														checked={column.getIsVisible()}
														onCheckedChange={(value) =>
															column.toggleVisibility(!!value)
														}
													>
														{column.id}
													</DropdownMenuCheckboxItem>
												)}
											</div>
										);
									})}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="text-muted-foreground flex-1 text-sm">
						{table.getFilteredSelectedRowModel().rows.length} funcionarios
						selecionados.
					</div>
					<div className="rounded-md border border-mainColor">
						<Table className="">
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext()
															)}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && 'selected'}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className="h-24 text-center"
										>
											Nenhum funcionario cadastrado.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					<div className="flex items-center justify-end space-x-2 py-4">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Voltar
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Próximo
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
