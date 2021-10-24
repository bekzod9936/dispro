import { useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";
import Checkbox from "@material-ui/core/Checkbox";
import { HeadersType, IProps } from "./types";
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
} from "./style";
import { cashierHeaders } from "./headers";

const CashierTable = ({ cashiers }: IProps) => {
  const [headers, setHeaders] = useState<HeadersType[]>(cashierHeaders);

  const columns: any = useMemo(() => {
    return headers.map((header) => ({
      Header: header.value,
      accessor: header.label,
    }));
  }, [headers]);

  const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } =
    useTable({ data: cashiers, columns: columns }, useSortBy);

  return (
    <div>
      <TableHeader>
        <Title>Кассиры</Title>
        {/* <AddColumnButton addedHeaders={headers} setAddedHeaders={setHeaders} /> */}
      </TableHeader>
      <Container>
        <MTable {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <Th>
                  <MCheckbox>
                    <Checkbox checked={false} onChange={(e) => {}} />
                  </MCheckbox>
                </Th>
                {headerGroup.headers.map((column: any) => (
                  <Th
                    active={column.isSorted}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
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
                  checked={false}
                  onClick={(e) => {}}
                  {...row.getRowProps()}
                >
                  <Td>
                    <MCheckbox>
                      <Checkbox checked={false} />
                    </MCheckbox>
                  </Td>
                  {row.cells.map((cell: any) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
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

export default CashierTable;
