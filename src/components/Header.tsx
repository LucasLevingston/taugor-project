import logoTaugor from '../assets/logo-taugor.png';
import { useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { LogOut, Plus, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HiOutlineDotsVertical } from 'react-icons/hi';

export default function Header({ progresso }: { progresso?: number }) {
	const [barraProgresso] = useState(0);

	return (
		<div className="w-full pb-5">
			<div className="m-2 flex justify-start">
				<div className="flex h-full w-full items-center ">
					<div className="flex h-full items-center border-r-[1px] border-r-cinza px-5">
						<img src={logoTaugor} className="" width={180} alt="logo" />
					</div>
					<div className="tex-left h-full  pl-5">
						{barraProgresso > 0 ? (
							<>
								<h1 className="text-[18px] font-bold">
									Informacoes de contato
								</h1>
							</>
						) : (
							<div className="text-[13px] font-bold">Seja bem-vindo!</div>
						)}
					</div>
				</div>

				<div className="flex w-[6%] items-center space-x-2  border-l-[1px] border-l-cinza ">
					<Link to="/" className="flex items-center">
						<MdHome className="ml-8 text-xl text-cinza" />
					</Link>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button>
								<HiOutlineDotsVertical />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56 bg-branco">
							<DropdownMenuLabel>Opções</DropdownMenuLabel>

							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Link to="/get-funcionario" className="flex items-center">
										<Users className="mr-2 h-4 w-4" />
										<span>Ver todos os funcionários</span>
									</Link>
								</DropdownMenuItem>

								<DropdownMenuItem>
									<Link
										to="/cadastro-funcionario"
										className="flex items-center"
									>
										<Plus className="mr-2 h-4 w-4" />
										<span>Cadastrar Funcionario</span>
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />

							<DropdownMenuItem>
								<Link to="/login" className="flex items-center">
									<LogOut className="mr-2 h-4 w-4" />
									<span>Sair da conta</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="flex h-3 w-full   rounded">
				<ProgressBar
					className="h-1 w-full"
					completed={progresso ?? barraProgresso}
					customLabel={`${progresso ?? barraProgresso}%`}
					bgColor="#0073CF"
					animateOnRender={true}
					height={'15px'}
					ariaValuetext={0}
				/>
			</div>
		</div>
	);
}
