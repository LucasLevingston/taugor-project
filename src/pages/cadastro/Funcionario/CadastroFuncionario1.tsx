import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '../../../components/Header';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { IoEyeOutline, IoEyeSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function CadastroFuncionario1() {
	const [passwordShow, setPasswordShow] = useState(false);
	const toggleShowPassword = () => {
		setPasswordShow(!passwordShow);
	};
	return (
		<div>
			<Header />
			<div className="flex h-full w-full items-center justify-center pt-10">
				<Tabs defaultValue="account" className="w-[400px]">
					<TabsList className="grid w-full ">
						<TabsTrigger value="account" className="text-2xl">
							Cadastrar
						</TabsTrigger>
					</TabsList>
					<TabsContent value="account">
						<Card>
							<CardHeader>
								<CardTitle>Login</CardTitle>
								<CardDescription></CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="space-y-1">
									<Label htmlFor="email">Email</Label>
									<Input id="email" required defaultValue="" />
								</div>
								<div className="space-y-1">
									<Label htmlFor="senha">Senha</Label>
									<div className="flex">
										<Input
											id="senha"
											type={passwordShow ? 'text' : 'password'}
											required
											minLength={8}
										/>
										<button
											onClick={toggleShowPassword}
											className="pl-3"
											type="button"
										>
											{passwordShow ? (
												<IoEyeOutline className="h-7 w-7" />
											) : (
												<IoEyeSharp className="h-7 w-7" />
											)}
										</button>
									</div>
								</div>
							</CardContent>
							<CardFooter className="flex flex-col items-center justify-center">
								<Button>Continuar</Button>
								<Link
									to="/recuperar-senha"
									className="text-[12px] text-mainColor"
								>
									Esqueceu a senha?
								</Link>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

export default CadastroFuncionario1;
