import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} caseSensitive={false} />
				{/* <Route path="/projetos" element={<Projects />} caseSensitive={false} />
				<Route path="/" element={<Home />} caseSensitive={false} /> */}
			</Routes>
		</BrowserRouter>
	);
}
