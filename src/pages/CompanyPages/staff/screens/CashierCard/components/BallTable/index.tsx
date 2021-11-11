import { useMemo } from 'react';
import { useTable } from 'react-table';
import {
	Container,
	Tbody,
	Td,
	Th,
	MTable,
	Thead,
	UpIcon,
	TRow,
	NoData,
	NoDataText,
} from './style';
import { headers } from './headers';
import { ReactComponent as CashierDataPoints } from 'assets/images/cashierDataPoints.svg';

const BallTable = () => {
	const columns: any = useMemo(() => {
		return headers.map((header) => {
			return {
				Header: header.value,
				accessor: header.label,
			};
		});
	}, [headers]);

	const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } =
		useTable({ data: [], columns: columns });

	return (
		<>
			{rows?.length === 0 ? (
				<NoData>
					<CashierDataPoints />
					<NoDataText>
						Подробная информация о баллах кассира будет хранится тут
					</NoDataText>
				</NoData>
			) : (
				<Container>
					<MTable {...getTableProps()}>
						<Thead>
							{headerGroups.map((headerGroup) => {
								return (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map((column: any) => (
											<Th
												active={column.isSorted}
												// {...column.getHeaderProps(column.getSortByToggleProps())}
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
									<TRow {...row.getRowProps()}>
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
			)}
		</>
	);
};

export default BallTable;
