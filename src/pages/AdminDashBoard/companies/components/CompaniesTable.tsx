import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import { useRecoilValue } from "recoil";
import { companiesM } from "services/atoms/admin_companies";
import { headers } from "./constants";
import {
  Container,
  MTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  UpIcon,
  ImgDiv,
  Img,
} from "./style";
import LogoDef from "assets/icons/SideBar/logodefault.png";

const CompaniesTable = () => {
  const companies = useRecoilValue(companiesM);
  const columns: any = useMemo(() => {
    return headers.map((header) => {
      if (header.label === "logo") {
        return {
          width: 150,
          Header: header.value,
          accessor: header.label,
          Cell: (props: any) => {
            return (
              <ImgDiv>
                <Img
                  src={
                    props.cell.row.original.logo === ""
                      ? LogoDef
                      : props.cell.row.original.logo
                  }
                  alt="coupon"
                  effect="blur"
                  width="100%"
                  height="100%"
                />
              </ImgDiv>
            );
          },
        };
      }
      return {
        Header: header.value,
        accessor: header.label,
        width: 150,
      };
    });
  }, [headers]);

  const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } =
    useTable({ data: companies, columns: columns }, useSortBy);

  return (
    <Container>
      <MTable {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup: any) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  active={column.isSorted}
                >
                  {column.render("Header")}
                  <UpIcon up={column.isSortedDesc} active={column.isSorted} />
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
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

export default CompaniesTable;
