import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GetFuncionario from './actions/GetFuncionario';
import Login from './pages/Login';
import CadastrarFuncionario from './actions/CadastrasFuncionarios';
import GetTodosFuncionarios from './actions/GetTodosFuncionarios';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={`/GetFuncionario/:id`} element={<GetFuncionario />} />
				<Route
					path="/CadastrarFuncionario"
					element={<CadastrarFuncionario />}
				/>
				<Route path="/GetFuncionarios" element={<GetTodosFuncionarios />} />
				<Route path="/login" element={<Login />} caseSensitive={false} />
				{/* <Route path="/" element={< />} caseSensitive={false} /> */}
			</Routes>
		</BrowserRouter>
	);
}
