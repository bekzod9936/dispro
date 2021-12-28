import { makeStyles } from "@material-ui/core";
import styled from "styled-components";

export const ErrorMessage = styled.div`
  font-size: 16px;
  color: #ff5e68;
  font-weight: 300;
  margin-top: 5px;
  margin-left: 5px;
`

export const useStyles = makeStyles({
    root: {
      fontSize: "16px !important",
      color: "#223367",
      lineHeight: "18.75px !important",
      fontWeight: "normal",
      marginBottom: 25,
    },
    checkbox: {
        marginRight: 10
    },
    labelIcon: {
        fontSize: 18,
        fontWeight: 500,
        color: '#A5A5A5',
        marginRight: 20,
        lineHeight: '21.09px'
    },
    icon: {
      width: 20,
      height: 20,
      border: "2px solid #A5A5A5",
      borderRadius: 4,
      
    },
    checkedIcon: {
      backgroundColor: "#3492FF",
      borderColor: "#3492FF",
      "&:before": {
        display: "block",
        width: 16,
        height: 18,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
    },
  });

  
export const Fields = styled.div`
  margin-bottom: 25px;
  h4 {
        font-size: 16px;
        color: #C7C7C7;
        line-height: 18.75px;
        margin-bottom: 10px;
    }
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;

  h4 {
      font-size: 16px;
      color: #C7C7C7;
      line-height: 18.75px;
      margin-bottom: 10px;
  }
`