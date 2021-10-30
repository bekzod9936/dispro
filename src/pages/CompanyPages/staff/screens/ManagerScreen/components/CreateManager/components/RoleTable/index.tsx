import { IProps } from "./types";
import useRoles from "./useRoles";
import {
  Container,
  MTable,
  Thead,
  Th,
  MCheckbox,
  Tbody,
  TRow,
  Td,
  Text,
} from "./style";
import Checkbox from "@material-ui/core/Checkbox";
import { useTable } from "react-table";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import { setSelectedRole } from "services/redux/Slices/staffs/index";

const RoleTable = ({}: IProps) => {
  const dispatch = useAppDispatch();
  const { roles, columns } = useRoles();
  const { t } = useTranslation();
  const permissions = useAppSelector((state) => state.staffs.permissions);
  const selectedRole = useAppSelector((state) => state.staffs.selectedRole);

  const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } =
    useTable({ data: roles, columns: columns });

  const handleAddClientByClick = (e: any, row: any) => {
    e.stopPropagation();
    const isAdded = selectedRole?.some(
      (el: any) => el?.value === row.original?.value
    );

    if (!isAdded) {
      dispatch(setSelectedRole(selectedRole.concat(row?.original)));
    } else {
      let filteredItem = selectedRole?.filter(
        (item: any) => item.value !== row.original.value
      );
      dispatch(setSelectedRole(filteredItem));
    }
  };

  console.log(permissions, "selected Role");

  return (
    <Container>
      <MTable {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <Th> </Th>
                ))}
                <Th>
                  <MCheckbox>
                    <Text>Полный доступ</Text>
                    <Checkbox
                      checked={selectedRole?.length === roles?.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          dispatch(setSelectedRole(roles));
                        } else {
                          dispatch(setSelectedRole([]));
                        }
                      }}
                    />
                  </MCheckbox>
                </Th>
              </tr>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <TRow
                onClick={(e) => handleAddClientByClick(e, row)}
                {...row.getRowProps()}
              >
                {row.cells.map((cell: any) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
                <Td>
                  <MCheckbox>
                    <Checkbox
                      checked={
                        selectedRole?.some(
                          (item: any) => item?.value === row?.original?.value
                        ) || selectedRole?.length === roles?.length
                      }
                    />
                  </MCheckbox>
                </Td>
              </TRow>
            );
          })}
        </Tbody>
      </MTable>
    </Container>
  );
};

export default RoleTable;
