import { Button } from '@/components/ui/button';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const win: Window = window;
export default function Paginacao() {
	let currentPage = parseInt(win.location.pathname.split('/').pop() || '1', 10);

	const handlePrevious = () => {
		currentPage = Math.max(currentPage - 1, 1);
		win.location.href = `/cadastro/${currentPage}`;
	};

	const handleNext = () => {
		currentPage++;
		win.location.href = `/cadastro/${currentPage}`;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					{currentPage === 1 ? (
						<Button disabled className="gap-1 pl-2.5">
							{' '}
							<ChevronLeft className="h-4 w-4" />
							Voltar{' '}
						</Button>
					) : (
						<PaginationPrevious href={`/cadastro/1`} />
					)}
				</PaginationItem>
				<PaginationItem>
					{currentPage === 1 ? (
						<PaginationLink href="/cadastro/1" isActive>
							1
						</PaginationLink>
					) : (
						<PaginationLink href="/cadastro/1">1</PaginationLink>
					)}
				</PaginationItem>
				<PaginationItem>
					{currentPage === 2 ? (
						<PaginationLink href="/cadastro/2" isActive>
							2
						</PaginationLink>
					) : (
						<PaginationLink href="/cadastro/2">2</PaginationLink>
					)}
				</PaginationItem>

				<PaginationItem>
					{currentPage === 2 ? (
						<Button disabled className="gap-1 pl-2.5">
							{' '}
							Proximo
							<ChevronRight className="h-4 w-4" />
						</Button>
					) : (
						<PaginationNext href={`/cadastro/2`} />
					)}
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
