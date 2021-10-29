import { useMemo } from "react";
import { IProps } from "./types";
import {
  Container,
  MTable,
  Thead,
  Th,
  MCheckbox,
  UpIcon,
  Tbody,
  TRow,
  Td,
} from "./style";
import Checkbox from "@material-ui/core/Checkbox";
import { useTable, useSortBy } from "react-table";
import { useTranslation } from "react-i18next";

const RoleTable = ({}: IProps) => {
  const { t } = useTranslation();
  const headers = [
    {
      value: "statistics",
      label: "statistics",
    },
  ];

  const roles: any = [];

  const columns: any = useMemo(() => {
    return headers.map((header) => {
      return {
        Header: header.value,
        accessor: header.label,
      };
    });
  }, [headers]);

  const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } =
    useTable({ data: roles, columns: columns }, useSortBy);

  const handleAddClientByClick = (e: any, row: any) => {
    e.stopPropagation();
    // const isAdded = selectedCashiers?.some(
    //   (el: any) => el.id === row.original.id
    // );

    // if (!isAdded) {
    //   dispatch(setSelectedCashiers(selectedCashiers.concat(row.original)));
    // } else {
    //   let filteredItem = selectedCashiers?.filter(
    //     (item: any) => item.id !== row.original.id
    //   );
    //   dispatch(setSelectedCashiers(filteredItem));
    // }
  };
  return (
    <Container>
      <MTable {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <Th>
                  <MCheckbox>
                    <Checkbox
                      //   checked={selectedCashiers?.length === allCashier?.length}
                      onChange={(e) => {
                        // setChecked(e.target.checked);
                        if (e.target.checked) {
                          //   dispatch(setSelectedCashiers(allCashier));
                        } else {
                          //   dispatch(setSelectedCashiers([]));
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
                    {column.render("Header")}
                    <UpIcon up={column.isSortedDesc} active={column.isSorted} />
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
                // checked={
                //   selectedCashiers?.some(
                //     (item: any) => item?.id === row?.original?.id
                //   ) || selectedCashiers?.length === allCashier?.length
                // }
                onClick={(e) => handleAddClientByClick(e, row)}
                {...row.getRowProps()}
              >
                <Td>
                  <MCheckbox>
                    <Checkbox
                    //   checked={
                    //     selectedCashiers?.some(
                    //       (item: any) => item?.id === row?.original?.id
                    //     ) || selectedCashiers?.length === allCashier?.length
                    //   }
                    />
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
      Salom
    </Container>
  );
};

export default RoleTable;
