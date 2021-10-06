import React, { useRef, useState } from "react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../services/redux/hooks";
import { Text } from "../../../styles/CustomStyles";
import { PuzzleIcon } from "../../../assets/icons/ClientsPageIcons/ClientIcons";
import { Flex } from "../../../styles/BuildingBlocks";
import DropDown from "../DropDown";
import { StyledPagination } from "../../../styles/Elements";
import { TableDiv, TableLoader, useStyles } from "./style";
import Spinner from "src/components/Helpers/Spinner";

interface IProps {
  rows: any;
  headers: any;
  listItems: any;
  totalCount: number;
  handlePageChange: (page: number) => void;
  page: number;
  handleClientClick: (id: number) => void;
  checked?: boolean;
  handleAllCheck?: any;
  loading?: boolean;
}

const CustomTableAdvanced: React.FC<IProps> = ({
  handleAllCheck,
  handleClientClick,
  rows,
  headers,
  listItems,
  totalCount,
  handlePageChange,
  page,
  loading = false,
  checked,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const anchorRef = useRef(null);
  const headersAllowed = useAppSelector(
    (state) => state.clients.clientsHeaders
  );
  const filteredHeaders = headers?.filter((item: any) =>
    headersAllowed.includes(item)
  );
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const filteredRows = rows?.map((item: any) => {
    let filteredRow: any = {
      data: {},
    };
    for (let key in item.data) {
      if (headersAllowed.includes(key)) {
        filteredRow.data[key] = item.data[key];
      }
    }
    filteredRow.id = item.id;
    return filteredRow;
  });

  return (
    <>
      <TableDiv>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          padding="18px 40px"
        >
          <div>
            <Text
              fontSize="16.5px"
              fontWeight={500}
              marginLeft="0px"
              marginRight="0px"
            >
              {t("clients")}
            </Text>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              position: "absolute",
              right: "20px",
              top: "15px",
            }}
          >
            <span
              ref={anchorRef}
              onClick={() => {
                setOpenDrop(!openDrop);
              }}
            >
              <Text
                marginRight="10px"
                marginLeft="0px"
                fontSize="16.5px"
                fontWeight={500}
                color="#606EEA"
              >
                {t("addColumn")}
              </Text>
              <PuzzleIcon />
            </span>

            <DropDown open={openDrop} ref={anchorRef}>
              <Flex
                flexDirection="column"
                justifyContent="space-between"
                padding="25px 18px"
                width="315px"
                alignItems="flex-start"
              >
                {listItems}
              </Flex>
            </DropDown>
          </div>
        </Flex>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            {filteredHeaders.map((item: any) => {
              if (item === "check") {
                return (
                  <TableCell className={classes.tableHeadCell}>
                    <Checkbox onChange={handleAllCheck} />
                  </TableCell>
                );
              }
              return (
                <TableCell className={classes.tableHeadCell}>
                  {t(item)}
                </TableCell>
              );
            })}
          </TableHead>
          <TableBody>
            {filteredRows?.map((item: any) => {
              return (
                <TableRow
                  onClick={() => handleClientClick(item.id)}
                  className={classes.tableRow}
                >
                  {Object.values(item.data).map((value: any, index) => {
                    return (
                      <TableCell className={classes.cell}>{value}</TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* Table Loader  */}
        {loading && (
          <TableLoader>
            <Spinner />
          </TableLoader>
        )}
      </TableDiv>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          {`Показано ${
            (page > 1 ? page * 6 - 6 + " - " : "") +
            (page * 6 <= totalCount ? page * 6 : totalCount)
          } из ${totalCount} клиентов`}
        </div>
        <StyledPagination
          page={page}
          count={Math.ceil(totalCount / 6)}
          boundaryCount={4}
          onChange={(e, page) => handlePageChange(page)}
        />
      </div>
    </>
  );
};

export default CustomTableAdvanced;
