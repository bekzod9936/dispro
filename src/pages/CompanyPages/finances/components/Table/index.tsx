import { useTable, useSortBy } from 'react-table';
import { Container, MTable, Thead, Tr, Th, Tbody, Td, UpIcon } from './style';

interface Props {
  columns?: any;
  data?: any;
  header2?: any;
  onClickRow?: (e: any) => void;
  idRow?: any;
  cursorRow?: string;
}

const Table = ({
  columns,
  data,
  header2,
  onClickRow = () => {},
  idRow,
  cursorRow,
}: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Container>
      <div>
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
            {rows.map((row: any, i) => {
              prepareRow(row);
              return (
                <Tr
                  {...row.getRowProps()}
                  onClick={() => {
                    onClickRow(row.original);
                  }}
                  bgcolor={
                    idRow === row.original.id &&
                    idRow !== undefined &&
                    row.original.col13 !== ''
                      ? '#cfd3f9'
                      : i % 2 === 0
                      ? 'rgba(96, 110, 234, 0.1)'
                      : 'white'
                  }
                  cursorRow={row.original.col13 !== '' ? cursorRow : 'default'}
                >
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
      </div>
    </Container>
  );
};

export default Table;
