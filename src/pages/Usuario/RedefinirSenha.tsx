import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/firebase';
import { ReloadIcon } from '@radix-ui/react-icons';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

export default function RedefinirSenha() {
	const [emailNaoDigitado, setEmailNaoDigitado] = useState(false);
	const [email, setEmail] = useState('');
	const [sendPasswordResetEmail, enviando, error] =
		useSendPasswordResetEmail(auth);

	async function verificarEmail() {
		if (
			await sendPasswordResetEmail(email, {
				url: 'http://localhost:5173/login',
			})
		) {
			toast.success('Email enviado com sucesso');
			setTimeout(() => {
				window.location.href = '/';
			}, 2000);
		}
		toast.error('Erro ao enviar email');
		setTimeout(() => {
			window.location.href = '/';
		}, 2000);
	}

	return (
		<div>
			<Toaster richColors position="top-right" />
			<Header />
			<div className="flex h-full w-full items-center justify-center pt-10">
				<Tabs defaultValue="account" className="w-[400px]">
					<TabsList className="grid w-full">
						<TabsTrigger value="account" className=" text-2xl">
							Recuperação de Senha
						</TabsTrigger>
					</TabsList>
					<TabsContent value="account">
						<Card>
							<CardHeader>
								<CardTitle>Recuperar Senha</CardTitle>
								<CardDescription></CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="space-y-3">
									<Label htmlFor="email">
										Digite o email para recuperar a senha.
									</Label>
									<Input
										id="email"
										required
										onChange={(e) => setEmail(e.target.value)}
									/>
									{emailNaoDigitado ? (
										<div className="text-xs font-bold text-vermelho">
											Digite um email.
										</div>
									) : null}
									<div className="flex justify-between">
										<Button
											className="flex w-[25%] space-x-1"
											variant="outline"
										>
											{' '}
											<Link to="/login" className="flex items-center">
												<IoArrowBackOutline />
												<span>Voltar</span>
											</Link>
										</Button>
										{error ? (
											<Button disabled>{error.message}</Button>
										) : (
											<Button
												variant="outline"
												onClick={() => {
													if (!email) {
														setEmailNaoDigitado(true);
													} else {
														verificarEmail();
													}
												}}
												disabled={enviando}
											>
												{enviando ? (
													<>
														<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
														Carregando...
													</>
												) : (
													'Recuperar'
												)}
											</Button>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
