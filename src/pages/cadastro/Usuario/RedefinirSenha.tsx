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
import { auth } from '../../../Firebase/firebase';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function RedefinirSenha(): any {
	const [email, setEmail] = useState('');
	const [sendPasswordResetEmail, enviando, error] =
		useSendPasswordResetEmail(auth);

	async function verificarEmail() {
		const success = await sendPasswordResetEmail(email, {
			url: 'http://localhost:5173/login',
		});
		if (success) {
			alert('Email enviado.');
		}
	}

	return (
		<div>
			<Header />
			<div className="flex h-full w-full items-center justify-center pt-10">
				<Tabs defaultValue="account" className="w-[400px]">
					<TabsList className="grid w-full">
						<TabsTrigger value="account" className="text-2xl">
							Recuperacao de senha
						</TabsTrigger>
					</TabsList>
					<TabsContent value="account">
						<Card>
							<CardHeader>
								<CardTitle>Recuperar senha</CardTitle>
								<CardDescription></CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="space-y-1">
									<Label htmlFor="email">
										Digite o Email para recuperar a senha
									</Label>
									<Input
										id="email"
										required
										onChange={(e) => setEmail(e.target.value)}
									/>
									{error ? (
										<Button disabled>{error.message}</Button>
									) : (
										<Button
											variant="outline"
											onClick={() => {
												verificarEmail();
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
							</CardContent>
							{/* <div className="flex justify-start"> */}
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
