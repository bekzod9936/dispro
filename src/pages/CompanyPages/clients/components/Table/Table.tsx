import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import { useSortBy, useTable } from 'react-table';
import styled from 'styled-components';
import { device } from 'styles/device';
import { AddColumnButton } from './components/AddColumnBtn/AddColumnButton';
import { addedHeaders } from './headers';
import { TableHeader, Tbody, Td, Th, Title, Container, MTable, Thead, UpIcon, MCheckbox, TRow } from './style';

export const Table = ({ visibleClients, selectedClients, dispatch }: any) => {
	const [ headers, setHeaders ] = React.useState(addedHeaders);

	const columns = React.useMemo(
		() => {
			return headers.map((header) => ({
				Header: header.value,
				accessor: header.label,
			}));
		},
		[ headers ],
	);

		
	// const handleAddClient = (e: any, value: boolean, id: any) => {
	// 	e.stopPropagation()
	// 	if (value) {
	// 		dispatch({ type: 'addClient', payload: id });
	// 	} else {
	// 		dispatch({ type: 'removeClient', payload: id });
	// 	}
	// };
	const handleAddClientByClick = (e: any, id: any) => {
		e.stopPropagation()
		const isAdded = selectedClients.some((el: any) => el.id === id)
		if (!isAdded) {
			dispatch({type: "addClient", payload: id});
		} else {
			dispatch({type: "removeClient", payload: id})
		}
	}

	const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } = useTable(
		{ data: visibleClients, columns: columns },
		useSortBy,
	);
	return (
		<div>
			<TableHeader>
				<Title>Клиенты</Title>
				<AddColumnButton
					setHeaders={setHeaders}
					addedHeaders={headers}
					setAddedHeaders={setHeaders}
				/>
			</TableHeader>
			<Container>
				<MTable {...getTableProps()}>
					<Thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								<Th>
									<MCheckbox>
										<Checkbox
											checked={visibleClients.length && selectedClients.length === visibleClients.length}
											onChange={(e) => dispatch({ type: 'selectAll', payload: e.target.checked })}
										/>
									</MCheckbox>
								</Th>
								{headerGroup.headers.map((column: any) => (
									<Th active={column.isSorted}
									 {...column.getHeaderProps(column.getSortByToggleProps())}>
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
								<TRow checked={selectedClients.some((client: any) => client.id === row.original.id)} onClick={(e) => handleAddClientByClick(e, row.original.id)} {...row.getRowProps()}>
									<Td>
										<MCheckbox>
											<Checkbox
												checked={selectedClients.some((el: any) => el.id === row.original.id)}
											/>
										</MCheckbox>
									</Td>
									{row.cells.map((cell: any) => {
										return <Td
										
										 {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
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

