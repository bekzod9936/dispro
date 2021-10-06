import styled from "styled-components";
import { TableContainer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

export const TableDiv = styled(TableContainer)`
  position: relative;
  overflow: auto;
  padding-bottom: 8px;
  background: #fff;
  border-radius: 12px;
  width: 97%;
`;

export const TableLoader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.14);
`;

// Material UI Styles
export const useStyles = makeStyles({
  table: {
    maxWidth: "100%",
    background: "white",
    borderRadius: "12px",
  },
  pagination: {
    border: "1px solid black",
  },
  tableHead: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
    position: "relative",
    zIndex: 10,
  },
  tableHeadCell: {
    fontSize: "15px",
    fontWeight: 400,
    color: "#A5A5A5",
    border: "none",
  },
  cell: {
    border: "none",
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      background: "#F0F1FD",
      //opacity: "0.92",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "white",
    },
  },
});
