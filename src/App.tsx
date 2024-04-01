import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GetFuncionario from './pages/GetFuncionario';
import Login from './pages/Login';
import GetTodosFuncionarios from './pages/GetTodosFuncionarios/GetTodosFuncionarios';
import AlterarDadosFuncionario from './actions/AlterarDadosFuncionario';
import CadastroFuncionario1 from './pages/cadastro/Funcionario/CadastroFuncionario';
import CadastroUsuario from './pages/cadastro/Usuario/CadastroUsuario';
import RedefinirSenha from './pages/cadastro/Usuario/RedefinirSenha';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={`/get-funcionario/:id`} element={<GetFuncionario />} />
				<Route path="/cadastro-usuario" element={<CadastroUsuario />} />
				<Route
					path={`/alterar-dados-funcionario/:id`}
					element={<AlterarDadosFuncionario />}
				/>
				<Route path="/redefinir-senha" element={<RedefinirSenha />} />
				<Route
					path="/cadastro-funcionario"
					element={<CadastroFuncionario1 />}
				/>
				<Route path="/get-funcionarios" element={<GetTodosFuncionarios />} />
				<Route
					path="/get-funcionario"
					element={<Navigate to="/get-funcionarios" />}
				/>
				<Route path="/login" element={<Login />} caseSensitive={false} />
				<Route path="/" element={<Navigate to="/get-funcionarios" />} />
			</Routes>
		</BrowserRouter>
	);
}
