import logoTaugor from '../assets/logo-taugor.png';
import { useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Header() {
	const [barraProgresso, setBarraProgresso] = useState(0);
	const [etapa, setEtapa] = useState(0);

	useEffect(() => {
		if (location.pathname == '/cadastro/1') {
			setEtapa(1);
			setBarraProgresso(25);
		} else if (location.pathname == '/cadastro/2') {
			setBarraProgresso(50);
			setEtapa(2);
		} else if (location.pathname == '/cadastro/3') {
			setBarraProgresso(75);
			setEtapa(3);
		} else if (location.pathname == '/cadastro/4') {
			setBarraProgresso(90);
			setEtapa(4);
		} else {
			setBarraProgresso(0);
		}
	}, [location.pathname]);

	return (
		<div className="w-full pb-5">
			<div className="justify-startm-2 flex">
				<div className=" flex h-full w-full items-center">
					<div className="flex h-full items-center px-5">
						<img src={logoTaugor} className="" width={200} alt="logo" />
					</div>
					<div className="tex-left h-full border-l-[1px] border-l-cinza pl-3">
						<p className="text-[13px] font-bold text-cinza">
							PASSO {etapa} DE 6
						</p>
						<h1 className="text-[18px] font-bold">Informacoes de contato</h1>
					</div>
				</div>

				<div className="flex w-[5%] items-center border-l-[1px] border-l-cinza ">
					<Link to="/">
						<MdHome className=" ml-8 text-cinza" />
					</Link>
				</div>
			</div>
			<div className="flex h-3 w-full  rounded">
				<ProgressBar
					className="h-1 w-full"
					completed={barraProgresso}
					customLabel={`${barraProgresso}%`}
					bgColor="#0073CF"
					animateOnRender={true}
					height={'15px'}
					ariaValuetext={0}
				/>{' '}
			</div>
		</div>
	);
}
