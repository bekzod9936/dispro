import Checkbox from "@material-ui/core/Checkbox";
import { MobileTable } from "pages/CompanyPages/clients/components/MobileTable";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSortBy, useTable } from "react-table";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { selectAll, setClient } from "services/redux/Slices/clients";
import { IClient } from "services/redux/Slices/clients/types";
import { RootState } from "services/redux/store";
import { useWindowSize } from "../../hooks/useWindowSize";
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
  ClientTd,
  DefaultImage,
} from "./style";
export type HeadersType = {
  value: string;
  label: string;
};



export const Table = () => {
  const { t } = useTranslation()
  const [headers, setHeaders] = React.useState<HeadersType[]>(addedHeaders);
  const { visibleClients, selectedClients, clients } = useAppSelector((state: RootState) => state.clients)
  const dispatch = useAppDispatch()

  const clientsList = useMemo(() => {
    return clients.map(client => ({
      name: client.firstName + " " + client.lastName,
      image: client.image,
      discountValue: client.personalLoyaltyInfo.percent,
      id: client.id,
      userId: client.userId
    }))
  }, [clients])


  const columns: any = React.useMemo(() => {
    return headers.map((header) => ({
      Header: header.value,
      accessor: header.label,
    }));
  }, [headers]);

  const { width } = useWindowSize()


  const handleAddClientByClick = (e: any, id: number) => {
    e.stopPropagation();
    dispatch(setClient(id))
  };

  const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } =
    useTable({ data: visibleClients, columns: columns }, useSortBy);

  return (
    <div>
      {width > 600 ? <>
        <TableHeader>
          <Title>{t("clients")}</Title>
          <AddColumnButton addedHeaders={headers} setAddedHeaders={setHeaders} />
        </TableHeader>
        <Container>
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
                      if (cell.column.Header === "Клиент") {
                        let src = cell?.row?.original?.image
                        return (
                          <Td {...cell.getCellProps()}>
                            <ClientTd>
                              {src ? <img src={src} /> : <DefaultImage />}
                              {cell.render("Cell")}
                            </ClientTd>
                          </Td>
                        )
                      } else {
                        return (
                          <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                        );
                      }
                    })}
                  </TRow>
                );
              })}
            </Tbody>
          </MTable>
        </Container>
      </> :
        <MobileTable onClick={handleAddClientByClick} array={clientsList} />
      }
    </div>
  );
};

