import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Container, MTable, Thead, Tr, Th, Tbody, Td, UpIcon,TitleData,DefaultImage} from './style';

interface Props {
    columns?: any;
    data?: any;
    header2?: any;
  }
  
  const Table = ({ columns, data, header2 }: Props) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data }, useSortBy);
    return (
      <Container>
        <MTable {...getTableProps()}>
          <Thead header2={header2 ? true : false}>
            {headerGroups.map((headerGroup: any) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    active={column.isSorted}
                  >
                    {column.render('Header')}
                    <UpIcon up={column.isSortedDesc} active={column.isSorted} />
                  </Th>
                ))}
              </Tr>
            ))}
            {header2 ? header2 : null}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </MTable>
      </Container>
    );
  };
  
  export default Table;