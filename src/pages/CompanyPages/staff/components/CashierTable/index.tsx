import { useMemo, useState, useEffect } from 'react';
import { useSortBy, useTable } from 'react-table';
import Checkbox from '@material-ui/core/Checkbox';

//helpers
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
	setOpenFilter,
	setSelectedCashiers,
} from 'services/redux/Slices/staffs';
//components
import { cashierHeaders } from './headers';
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
	WrapIcon,
	Img,
	ImgDiv,
} from './style';
//types
import { HeadersType, IProps } from './types';
//icons
import LogoDef from 'assets/images/staff_default.png';

const CashierTable = ({ cashiers }: IProps) => {
	const dispatch = useAppDispatch();
	const allCashier = useAppSelector((state) => state.staffs.allCashiers);
	const selectedCashiers = useAppSelector(
		(state) => state.staffs.selectedCashiers
	);
	console.log(`cashiers`, cashiers);
	const [checked, setChecked] = useState(false);
	const [headers, setHeaders] = useState<HeadersType[]>(cashierHeaders);

	useEffect(() => {
		return () => {
			dispatch(setSelectedCashiers([]));
		};
	}, []);

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
												? LogoDef
												: props.cell.row.original.logo
										}
										alt='coupon'
										effect='blur'
										width='100%'
										height='100%'
									/>
								</ImgDiv>
								{props.value}
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

	const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } =
		useTable({ data: cashiers, columns: columns }, useSortBy);
	console.log(`rows`, rows);
	const handleAddClientByClick = (e: any, row: any) => {
		e.stopPropagation();
		const isAdded = selectedCashiers?.some(
			(el: any) => el.id === row.original.id
		);
		if (!isAdded) {
			dispatch(setSelectedCashiers(selectedCashiers.concat(row.original)));
		} else {
			let filteredItem = selectedCashiers?.filter(
				(item: any) => item.id !== row.original.id
			);
			dispatch(setSelectedCashiers(filteredItem));
		}
		dispatch(setOpenFilter(false));
	};

	return (
		<div>
			<Container>
				<MTable {...getTableProps()}>
					<Thead>
						{headerGroups.map((headerGroup) => {
							return (
								<tr {...headerGroup.getHeaderGroupProps()}>
									<Th>
										<MCheckbox>
											<Checkbox
												checked={
													selectedCashiers?.length === allCashier?.length
												}
												onChange={(e) => {
													setChecked(e.target.checked);
													if (e.target.checked) {
														dispatch(setSelectedCashiers(allCashier));
													} else {
														dispatch(setSelectedCashiers([]));
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
											<UpIcon
												up={column.isSortedDesc}
												active={column.isSorted}
											/>
										</Th>
									))}
								</tr>
							);
						})}
					</Thead>
					<Tbody {...getTableBodyProps()}>
						{rows.map((row: any) => {
							prepareRow(row);
							return (
								<TRow
									checked={
										selectedCashiers?.some(
											(item: any) => item?.id === row?.original?.id
										) || selectedCashiers?.length === allCashier?.length
									}
									onClick={(e) => handleAddClientByClick(e, row)}
									{...row.getRowProps()}
								>
									<Td>
										<MCheckbox>
											<Checkbox
												checked={
													selectedCashiers?.some(
														(item: any) => item?.id === row?.original?.id
													) || selectedCashiers?.length === allCashier?.length
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
			{/* <Footer>
				<NewPagination
					onChange={handlechangePage}
					currentPage={Number(filterValues.page)}
					totalCount={Number(totalCount)}
				/>
			</Footer> */}
		</div>
	);
};

export default CashierTable;
