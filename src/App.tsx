import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GetFuncionario from './actions/GetFuncionario';
import Login from './pages/Login';
import GetTodosFuncionarios from './actions/GetTodosFuncionarios';
import CadastroFuncionario1 from './pages/cadastro/Funcionario/CadastroFuncionario1';
import CadastroFuncionario2 from './pages/cadastro/Funcionario/CadastroFuncionario2';
import CadastroFuncionario3 from './pages/cadastro/Funcionario/CadastroFuncionario3';
import CadastroFuncionario4 from './pages/cadastro/Funcionario/CadastroFuncionario4';
import CadastroUsuario from './pages/cadastro/Usuario/CadastroUsuario';
import RedefinirSenha from './pages/cadastro/RedefinirSenha';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={`/GetFuncionario/:id`} element={<GetFuncionario />} />
				<Route path="/cadastroUsuario" element={<CadastroUsuario />} />
				<Route path="/redefinirSenha" element={<RedefinirSenha />} />
				<Route path="/cadastro/1" element={<CadastroFuncionario1 />} />
				<Route path="/cadastro/2" element={<CadastroFuncionario2 />} />
				<Route path="/cadastro/3" element={<CadastroFuncionario3 />} />
				<Route path="/cadastro/4" element={<CadastroFuncionario4 />} />
				<Route path="/GetFuncionarios" element={<GetTodosFuncionarios />} />
				<Route path="/login" element={<Login />} caseSensitive={false} />
				{/* <Route path="/" element={< />} caseSensitive={false} /> */}
			</Routes>
		</BrowserRouter>
	);
}
