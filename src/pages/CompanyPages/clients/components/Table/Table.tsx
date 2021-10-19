import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import { useSortBy, useTable } from 'react-table';
import { ActionType, ActionTypes, IClient, IVisibleClient } from '../../utils/reducerTypes';
import { AddColumnButton } from './components/AddColumnBtn/AddColumnButton';
import { addedHeaders } from './headers';
import { TableHeader, Tbody, Td, Th, Title, Container, MTable, Thead, UpIcon, MCheckbox, TRow } from './style';
export type HeadersType = {
	value: string,
	label: string
}

interface IProps {
	visibleClients: IVisibleClient[],
	selectedClients: IClient[],
	dispatch: (arg: ActionType) => void
}


export const Table = ({ visibleClients, selectedClients, dispatch }: IProps) => {
	const [ headers, setHeaders ] = React.useState<HeadersType[]>(addedHeaders);

	const columns: any = React.useMemo(
		() => {
			return headers.map((header) => ({
				Header: header.value,
				accessor: header.label,
			}));
		},
		[ headers ],
	);

	const handleAddClientByClick = (e: any, id: number) => {
		e.stopPropagation()
		const isAdded = selectedClients.some((el: IClient) => el.id === id)
		
		if (!isAdded) {
			dispatch({type: ActionTypes.ADD_CLIENT, payload: id});
		} else {
			dispatch({type: ActionTypes.REMOVE_CLIENT, payload: id})
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
											checked={!!visibleClients.length && selectedClients.length === visibleClients.length}
											onChange={(e) => dispatch({ type: ActionTypes.SELECT_ALL, payload: e.target.checked })}
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
								<TRow checked={selectedClients.some((client: IClient) => client.id === row.original.id)} onClick={(e) => handleAddClientByClick(e, row.original.id)} {...row.getRowProps()}>
									<Td>
										<MCheckbox>
											<Checkbox
												checked={selectedClients.some((el: IClient) => el.id === row.original.id)}
											/>
										</MCheckbox>
									</Td>
									{row.cells.map((cell: any) => {
										return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
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


