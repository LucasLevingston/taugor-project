import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GetFuncionario from './pages/GetFuncionario';
import Login from './pages/Login';
import GetTodosFuncionarios from './pages/GetTodosFuncionarios/GetTodosFuncionarios';
import CadastroFuncionario1 from './pages/cadastro/Funcionario/CadastroFuncionario';
import CadastroUsuario from './pages/cadastro/Usuario/CadastroUsuario';
import RedefinirSenha from './pages/cadastro/Usuario/RedefinirSenha';
import GerarPDF from './components/PDF/GerarPDF';
import { useAuntenticacao } from './hooks/usuarios.hooks';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function App() {
	const { carregando, usuario } = useAuntenticacao();

	return (
		<BrowserRouter>
			{carregando ? (
				<div className="flex h-full w-full flex-col items-center justify-center space-y-5">
					<div>Carregando...</div>
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
				</div>
			) : usuario ? (
				<Routes>
					<Route path={`/get-funcionario/:id`} element={<GetFuncionario />} />
					<Route
						path="/cadastro-funcionario"
						element={<CadastroFuncionario1 />}
					/>
					<Route path="/get-funcionarios" element={<GetTodosFuncionarios />} />
					<Route path="/gerar-pdf/:id" element={<GerarPDF />} />
					<Route
						path="/get-funcionario"
						element={<Navigate to="/get-funcionarios" />}
					/>
				</Routes>
			) : (
				<Routes>
					<Route
						path={`/get-funcionario/:id`}
						element={<Navigate to="/login" />}
					/>
					<Route
						path="/cadastro-funcionario"
						element={<Navigate to="/login" />}
					/>
					<Route path="/get-funcionarios" element={<Navigate to="/login" />} />
					<Route path="/gerar-pdf/:id" element={<Navigate to="/login" />} />
					<Route path="/get-funcionario" element={<Navigate to="/login" />} />
				</Routes>
			)}
			<Routes>
				<Route path="/cadastro-usuario" element={<CadastroUsuario />} />
				<Route path="/redefinir-senha" element={<RedefinirSenha />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Navigate to="/get-funcionarios" />} />
			</Routes>
		</BrowserRouter>
	);
}
