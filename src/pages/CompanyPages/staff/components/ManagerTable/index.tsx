import { useMemo, useState, useEffect } from 'react';
import { useSortBy, useTable } from 'react-table';
import Checkbox from '@material-ui/core/Checkbox';
import { HeadersType, IProps } from './types';
import {
	TableHeader,
	Tbody,
	Td,
	Th,
	Title,
	Container,
	MTable,
	Thead,
	UpIcon,
	MCheckbox,
	TRow,
	ManagerTd,
	DefaultLogo,
	ManagerLogo,
} from './style';
import { managerHeaders } from './headers';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setSelectedManagers } from 'services/redux/Slices/staffs';
import managerDefault from 'assets/images/staff_default.png';

const ManagerTable = ({ managers }: IProps) => {
	const dispatch = useAppDispatch();
	const allManager = useAppSelector((state) => state.staffs.allManagers);

	const selectedManagers = useAppSelector(
		(state) => state.staffs.selectedManagers
	);
	const [headers, setHeaders] = useState<HeadersType[]>(managerHeaders);

	const columns: any = useMemo(() => {
		return headers.map((header) => ({
			Header: header.value,
			accessor: header.label,
		}));
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

	return (
		<div>
			<TableHeader>
				<Title>Менеджеры</Title>
				{/* <AddColumnButton addedHeaders={headers} setAddedHeaders={setHeaders} /> */}
			</TableHeader>
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
										if (cell.column.Header === 'Менеджер') {
											let src = cell?.row?.original?.logo;
											return (
												<Td {...cell.getCellProps()}>
													<ManagerTd>
														{src ? (
															<ManagerLogo
																src={src}
																onError={(e: any) => {
																	e.target.onerror = null;
																	e.target.src = managerDefault;
																}}
															/>
														) : (
															<DefaultLogo />
														)}
														{cell.render('Cell')}
													</ManagerTd>
												</Td>
											);
										} else {
											return (
												<Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
											);
										}
									})}
								</TRow>
							);
						})}
					</Tbody>
				</MTable>
			</Container>
		</div>
	);
};

export default ManagerTable;
