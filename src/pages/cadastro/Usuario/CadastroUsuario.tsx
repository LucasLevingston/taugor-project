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
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/Firebase/firebase';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function CadastroUsuario() {
	const [passwordShow, setPasswordShow] = useState(false);
	const toggleShowPassword = () => {
		setPasswordShow(!passwordShow);
	};

	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [confirmarSenha, setConfirmarSenha] = useState('');
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	function validarSenha() {
		if (!/[A-Z]/.test(senha[0]) || !/[A-Z]/.test(confirmarSenha[0])) {
			return false;
		}
		if (senha.length < 8 || confirmarSenha.length < 8) {
			return false;
		}
		if (
			!/[!@#$%^&*(),.?":{}|<>]/.test(senha) ||
			!/[!@#$%^&*(),.?":{}|<>]/.test(confirmarSenha)
		) {
			return false;
		}
		if (senha !== confirmarSenha) {
			return false;
		}
		return true;
	}
	if (error) {
		return (
			<div>
				<p>Error: {error.message}</p>
			</div>
		);
	}
	if (user) {
		return (
			<div>
				<p>Usuario cadastrado!</p>
			</div>
		);
	}
	return (
		<div>
			<Header />
			<div className="flex h-full w-full items-center justify-center pt-10">
				<Tabs defaultValue="account" className="w-[400px]">
					<TabsList className="grid w-full ">
						<TabsTrigger value="account" className="text-2xl">
							Criar conta
						</TabsTrigger>
					</TabsList>
					<TabsContent value="account">
						<Card>
							<CardHeader>
								<CardTitle>Cadastro</CardTitle>
								<CardDescription></CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="space-y-1">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										required
										defaultValue=""
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="space-y-1">
									<Label htmlFor="senha">Senha</Label>
									<div className="flex">
										<Input
											id="senha"
											type={passwordShow ? 'text' : 'password'}
											required
											minLength={8}
											onChange={(e) => setSenha(e.target.value)}
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
								<div className="space-y-1">
									<Label htmlFor="senha">Confirmar senha</Label>
									<div className="flex">
										<Input
											id="senha"
											type={passwordShow ? 'text' : 'password'}
											required
											minLength={8}
											value={confirmarSenha}
											onChange={(e) => setConfirmarSenha(e.target.value)}
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
									{!validarSenha() && (
										<p className="text-vermelho text-xs">
											As senhas devem ser iguais e ter no minimo 8 caracteres,
											sendo uma maiuscula e uma especial.
										</p>
									)}
								</div>
							</CardContent>
							<CardFooter className="flex flex-col items-center justify-center">
								{loading ? (
									<Button disabled>
										<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
										Carregando...
									</Button>
								) : validarSenha() ? (
									<Button
										variant="outline"
										onClick={() => createUserWithEmailAndPassword(email, senha)}
									>
										Cadastrar
									</Button>
								) : (
									<Button disabled variant="destructive">
										Senha invalida.
									</Button>
								)}
								<br />
								<p className="text-sm">Ja possui cadastro?</p>
								<Link to="/login" className="text-[12px] text-mainColor">
									Faca o Login aqui
								</Link>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
