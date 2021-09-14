import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';

interface Props {
  twoheader?: boolean;
}
export const Container = styled.div`
  height: fit-content;
  width: 100%;
  user-select: none;
  padding-bottom: ${({ twoheader }: Props) =>
    twoheader ? '10px !important' : null};
  background-color: ${({ twoheader }: Props) =>
    twoheader ? 'white !important' : null};
  border-radius: ${({ twoheader }: Props) =>
    twoheader ? '14px !important' : null};
  .MuiDataGrid-columnsContainer {
    border-bottom: none !important;
  }
  .MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
  .MuiDataGrid-root .MuiDataGrid-cell:focus {
    outline: none !important;
  }

  .MuiDataGrid-root {
    border-color: transparent !important;
    .MuiDataGrid-columnsContainer {
      border-radius: 14px 14px 0px 0px;
    }
  }
  .MuiDataGrid-main {
    border-radius: 14px !important;
  }

  .MuiDataGrid-columnSeparator {
    display: none;
  }
  .MuiDataGrid-columnHeaderWrapper {
    color: #a5a5a5;
    border-radius: 14px 14px 0px 0px !important;

    div {
      background-color: white;
    }
  }
  .Mui-even {
    background: rgba(96, 110, 234, 0.1);

    color: #223367;
    :hover {
      background-color: rgba(96, 110, 234, 0.1) !important;
    }
  }
  .Mui-odd {
    background: white;
    color: #223367;
    :hover {
      background-color: white !important;
    }
  }

  .MuiDataGrid-window {
    height: fit-content;
    overflow: hidden !important;
    &:hover {
      overflow-x: scroll !important;
    }
    ::-webkit-scrollbar {
      height: 10px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: lightgray;
      border-radius: 30px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: lightgray;
    }
  }

  .MuiDataGrid-cell {
    border-bottom: none !important;
  }
  .MuiDataGrid-withBorder {
    border-right: none !important;
  }
  .MuiDataGrid-viewport {
    border-radius: 0px 0px 14px 14px !important;
  }
  .MuiDataGrid-columnHeader {
    height: ${({ twoheader }: Props) => (twoheader ? '60px !important' : null)};
  }

  .MuiDataGrid-columnHeaderWrapper {
    border-bottom: ${({ twoheader }: Props) =>
      twoheader ? '1px solid rgba(96, 110, 234, 0.3) !important' : null};
    position: relative;
  }
`;

export const StyledPagination = styled(Pagination)`
  display: flex;
  align-items: flex-start;
  height: 100%;
  margin-top: 20px;
  .MuiPagination-ul > li {
    margin-left: 0px;
    margin-right: 0px;
    width: 46px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #c2c2c2;
  }
  .MuiPagination-ul > li > button {
    font-size: 18px;
    font-weight: 500;
  }
  .MuiPagination-ul > li:nth-child(n + 3) {
    border-width: 1px 0px;
  }
  .MuiPagination-ul > li:nth-child(2) {
    border-width: 1px 0 1px 1px;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
  }
  .MuiPagination-ul > li:nth-last-child(-n + 2) {
    border-width: 1px 1px 1px 0px;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
  }
  .MuiPagination-ul > li:nth-last-child(-n + 1) {
    border-width: 1px;
  }
  .MuiPagination-ul > li:first-child {
    margin-right: 5px;
    color: #606eea;
    stroke: #606eea;
    border-radius: 14px;
  }
  .MuiPagination-ul > li:last-child {
    margin-left: 5px;
    color: #606eea;
    stroke: #606eea;
    border-radius: 14px;
  }
  .MuiPagination-ul {
    display: flex;
    width: fit-content;
    float: right;
    align-self: flex-start;
  }
  .MuiPaginationItem-page.Mui-selected {
    border-radius: 14px;
    width: 48px;
    height: 48px;
    font-weight: 900;
    background-color: #606eea;
    box-shadow: 0px 7px 16px rgba(0, 0, 0, 0.14);
    color: white;
    margin: 0px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Info = styled.div`
  color: #223367;
  font-size: 18px;
  span {
    font-weight: 900;
    margin: 0px 5px;
    font-size: 18px;
  }
`;

export const Wrap = styled.div`
  height: fit-content;
`;
