import { useMemo, useState, useEffect } from 'react';
import { useSortBy, useTable } from 'react-table';

//helpers
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setSelectedManagers, setPage } from 'services/redux/Slices/staffs';

//components
import { managerHeaders } from './headers';
import Checkbox from '@material-ui/core/Checkbox';
import { NewPagination } from 'components/Custom/NewPagination';

//styles
import {
	Tbody,
	Td,
	Th,
	Container,
	MTable,
	Thead,
	UpIcon,
	MCheckbox,
	TRow,
	ManagerTd,
	DefaultLogo,
	ManagerLogo,
	WrapPag,
	WrapIcon,
	ImgDiv,
	Img,
} from './style';

//types
import { HeadersType, IProps } from './types';

//icons
import managerDefault from 'assets/images/defaultGreen.png';
import { formatPagination } from 'services/utils/formatPagination';

const ManagerTable = ({ managers }: IProps) => {
	const dispatch = useAppDispatch();
	const allManager = useAppSelector((state) => state.staffs.allManagers);
	const { managersTotal, totalCount, page } = useAppSelector(
		(state) => state.staffs
	);
	const selectedManagers = useAppSelector(
		(state) => state.staffs.selectedManagers
	);
	const [headers, setHeaders] = useState<HeadersType[]>(managerHeaders);

	const columns: any = useMemo(() => {
		return headers.map((header) => {
			if (header.label === 'firstName') {
				return {
					Header: header.value,
					accessor: header.label,
					Cell: (props: any) => {
						return (
							<WrapIcon>
								<ImgDiv>
									<Img
										src={
											props.cell.row.original.logo === ''
												? managerDefault
												: props.cell.row.original.logo
										}
										alt='coupon'
										effect='blur'
										width='100%'
										height='100%'
									/>
								</ImgDiv>
								<p>{props.value}</p>
							</WrapIcon>
						);
					},
				};
			}
			return {
				Header: header.value,
				accessor: header.label,
			};
		});
	}, [headers]);

	const handleAddClientByClick = (e: any, row: any) => {
		e.stopPropagation();
		const isAdded = selectedManagers?.some(
			(el: any) => el.id === row.original.id
		);
		if (!isAdded) {
			dispatch(setSelectedManagers(selectedManagers.concat(row.original)));
		} else {
			let filteredItem = selectedManagers?.filter(
				(item: any) => item.id !== row.original.id
			);
			dispatch(setSelectedManagers(filteredItem));
		}
	};

	const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } =
		useTable({ data: managers, columns: columns }, useSortBy);

	useEffect(() => {
		return () => {
			dispatch(setSelectedManagers([]));
		};
	}, []);

	const handleChangePage = (int: number) => {
		dispatch(setPage({ type: 'managers', page: int }));
	};

	return (
		<div>
			<Container>
				<MTable {...getTableProps()}>
					<Thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								<Th>
									<MCheckbox>
										<Checkbox
											checked={selectedManagers?.length === allManager?.length}
											onChange={(e) => {
												if (e.target.checked) {
													dispatch(setSelectedManagers(allManager));
												} else {
													dispatch(setSelectedManagers([]));
												}
											}}
										/>
									</MCheckbox>
								</Th>
								{headerGroup.headers.map((column: any) => (
									<Th
										active={column.isSorted}
										{...column.getHeaderProps(column.getSortByToggleProps())}
									>
										{column.render('Header')}
										<UpIcon up={column.isSortedDesc} active={column.isSorted} />
									</Th>
								))}
							</tr>
						))}
					</Thead>
					<Tbody {...getTableBodyProps()}>
						{rows.map((row: any) => {
							prepareRow(row);
							return (
								<TRow
									checked={
										selectedManagers?.some(
											(item: any) => item?.id === row?.original?.id
										) || selectedManagers?.length === allManager?.length
									}
									onClick={(e) => handleAddClientByClick(e, row)}
									{...row.getRowProps()}
								>
									<Td>
										<MCheckbox>
											<Checkbox
												checked={
													selectedManagers?.some(
														(item: any) => item?.id === row?.original?.id
													) || selectedManagers?.length === allManager?.length
												}
											/>
										</MCheckbox>
									</Td>
									{row.cells.map((cell: any) => {
										return (
											<Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
										);
									})}
								</TRow>
							);
						})}
					</Tbody>
				</MTable>
			</Container>
			<WrapPag>
				<p>
					Показано
					<span>
						{formatPagination({
							page: page.managers,
							perPage: 10,
							total: totalCount,
						})}
					</span>
					из <span>{totalCount}</span>
					{totalCount === 1 ? 'кассира' : 'кассиров'}
				</p>
				<p></p>
				{/* <b>
						{1 + (page - 1) * 10}-
						{(page - 1) * 10 + (totalCount > 10 ? 10 : totalCount)}
					</b>{' '}
					из <b>{totalCount}</b>
				</p>*/}
				<NewPagination
					onChange={handleChangePage}
					currentPage={page.managers}
					totalCount={managersTotal}
				/>
			</WrapPag>
		</div>
	);
};

export default ManagerTable;
