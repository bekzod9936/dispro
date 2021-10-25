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
  WrapIcon,
  Img,
  ImgDiv,
} from "./style";
import { cashierHeaders } from "./headers";
import LogoDef from "assets/icons/SideBar/logodefault.png";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { setSelectedCashiers } from "services/redux/Slices/staffs";

const CashierTable = ({ cashiers }: IProps) => {
  const dispatch = useAppDispatch();
  const allCashier = useAppSelector((state) => state.staffs.allCashiers);
  const selectedCashiers = useAppSelector(
    (state) => state.staffs.selectedCashiers
  );
  // const [selectedCashiers, setSelectedCashiers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [headers, setHeaders] = useState<HeadersType[]>(cashierHeaders);

  console.log(selectedCashiers, "all cashier");

  const columns: any = useMemo(() => {
    return headers.map((header) => {
      if (header.label === "firstName") {
        return {
          Header: header.value,
          accessor: header.label,
          Cell: (props: any) => {
            return (
              <WrapIcon>
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
                {props.value}
              </WrapIcon>
            );
          },
        };
      }
      return {
        Header: header.value,
        accessor: header.label,
      };
    });
  }, [headers]);

  const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } =
    useTable({ data: cashiers, columns: columns }, useSortBy);

  const handleAddClientByClick = (e: any, row: any) => {
    e.stopPropagation();
    const isAdded = selectedCashiers?.some(
      (el: any) => el.id === row.original.id
    );

    if (!isAdded) {
      dispatch(setSelectedCashiers(selectedCashiers.concat(row.original)));
    } else {
      let filteredItem = selectedCashiers?.filter(
        (item: any) => item.id !== row.original.id
      );
      dispatch(setSelectedCashiers(filteredItem));
    }
  };

  return (
    <div>
      <TableHeader>
        <Title>Кассиры</Title>
        {/* <AddColumnButton addedHeaders={headers} setAddedHeaders={setHeaders} /> */}
      </TableHeader>
      <Container>
        <MTable {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => {
              return (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  <Th>
                    <MCheckbox>
                      <Checkbox
                        checked={
                          checked &&
                          selectedCashiers.length === allCashier.length
                        }
                        onChange={(e) => {
                          setChecked(e.target.checked);
                          if (e.target.checked) {
                            dispatch(setSelectedCashiers(allCashier));
                          } else {
                            dispatch(setSelectedCashiers([]));
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
                      <UpIcon
                        up={column.isSortedDesc}
                        active={column.isSorted}
                      />
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
                  checked={
                    selectedCashiers.some(
                      (item: any) => item.id === row.original.id
                    ) || selectedCashiers.length === allCashier.length
                  }
                  onClick={(e) => handleAddClientByClick(e, row)}
                  {...row.getRowProps()}
                >
                  <Td>
                    <MCheckbox>
                      <Checkbox
                        checked={
                          selectedCashiers.some(
                            (item: any) => item.id === row.original.id
                          ) || selectedCashiers.length === allCashier.length
                        }
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
      </Container>
    </div>
  );
};

export default CashierTable;
