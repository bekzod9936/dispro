import Checkbox from "@material-ui/core/Checkbox";
import { CustomList } from "components/Custom/CustomList";
import React from "react";
import { useSortBy, useTable } from "react-table";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { selectAll, setClient } from "services/redux/Slices/clients";
import { RootState } from "services/redux/store";
import { useWindowSize } from "../../hooks/useWindowSize";
import { getListFromClients } from "../../utils/getSelectedFilters";
import {
  ActionType,
  ActionTypes,
  IClient,
  IVisibleClient,
} from "../../utils/reducerTypes";
import { AddColumnButton } from "./components/AddColumnBtn/AddColumnButton";
import { addedHeaders } from "./headers";
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
export type HeadersType = {
  value: string;
  label: string;
};

interface IProps {
  visibleClients: IVisibleClient[];
  selectedClients: IClient[];
  dispatch: (arg: ActionType) => void;
  clients: IClient[]
}

export const Table = ({

}: IProps) => {
  const [headers, setHeaders] = React.useState<HeadersType[]>(addedHeaders);
  const { visibleClients, selectedClients, clients } = useAppSelector((state: RootState) => state.clients)
  const dispatch = useAppDispatch()
  const columns: any = React.useMemo(() => {
    return headers.map((header) => ({
      Header: header.value,
      accessor: header.label,
    }));
  }, [headers]);

  const handleAddClientByClick = (e: any, id: number) => {
    e.stopPropagation();
    dispatch(setClient(id))
  };

  const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } =
    useTable({ data: visibleClients, columns: columns }, useSortBy);

  return (
    <div>
      <TableHeader>
        <Title>Клиенты</Title>
        <AddColumnButton addedHeaders={headers} setAddedHeaders={setHeaders} />
      </TableHeader><Container>
        <MTable {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <Th>
                  <MCheckbox>
                    <Checkbox
                      checked={!!visibleClients.length &&
                        selectedClients.length === visibleClients.length}
                      onChange={(e) => dispatch(selectAll(e.target.checked))} />
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
                  checked={selectedClients.some(
                    (client: IClient) => client.id === row.original.id
                  )}
                  onClick={(e) => handleAddClientByClick(e, row.original.id)}
                  {...row.getRowProps()}
                >
                  <Td>
                    <MCheckbox>
                      <Checkbox
                        checked={selectedClients.some(
                          (el: IClient) => el.id === row.original.id
                        )} />
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

