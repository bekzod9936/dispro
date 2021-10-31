import { useMemo } from "react";
import { useTable } from "react-table";
import {
  Container,
  Tbody,
  Td,
  Th,
  MTable,
  Thead,
  UpIcon,
  TRow,
  EmptyDiv,
} from "./style";
import { headers } from "./headers";

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
                    {column.render("Header")}
                    <UpIcon up={column.isSortedDesc} active={column.isSorted} />
                  </Th>
                ))}
              </tr>
            );
          })}
        </Thead>
        {rows?.length === 0 ? (
          <EmptyDiv>Здесь не хватаеть данные</EmptyDiv>
        ) : (
          <Tbody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);
              return (
                <TRow {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </TRow>
              );
            })}
          </Tbody>
        )}
      </MTable>
    </Container>
  );
};

export default BallTable;
