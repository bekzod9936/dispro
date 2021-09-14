import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useAppSelector } from '../../services/redux/hooks';
import { StyledPagination } from '../../styles/Elements';

interface IProps {
  headers: any;
  rows: any;
  withPagination?: boolean;
  totalCount?: number;
  handlePageChange?: (page: number) => void;
  page?: number;
  rowsFontSize?: number;
  handleRowClick: (id: number) => void;
  selectedRow: number;
}
const useStyles = makeStyles({
  table: {
    width: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  cell: {
    borderBottom: 'none',
    '&:first-child': {
      paddingLeft: '35px',
    },

    '&:last-child': {
      paddingRight: '25px',
    },
    maxWidth: '350px',
  },
  container: {
    paddingBottom: '8px',
    background: 'white',
    width: '96%',
    borderRadius: '12px',
  },

  header: {
    boxShadow: '4px 4px 4px #2f3cc9',
    padding: '0px 25px',
  },
  headRow: {
    background: 'white',
    color: '#A5A5A5',
    '&:first-child': {
      paddingLeft: '35px',
    },
    maxWidth: '350px',

    '&:last-child': {
      paddingRight: '25px',
    },
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      background: '#F0F1FD',
      opacity: '0.92',
    },
    padding: '0px 25px',

    '&:nth-of-type(even)': {
      backgroundColor: 'white',
    },
  },
});

const CustomReusableTable: React.FC<IProps> = ({
  selectedRow,
  rowsFontSize,
  headers,
  rows,
  withPagination,
  totalCount,
  page,
  handlePageChange,
  handleRowClick,
}) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer className={classes.container}>
        <Table className={classes.table}>
          <TableHead className={classes.header}>
            {headers?.map((item: any) => {
              return <TableCell className={classes.headRow}>{item}</TableCell>;
            })}
          </TableHead>
          <TableBody style={{ fontSize: `${rowsFontSize}px` || '16px' }}>
            {rows?.map((item: any, rowIndex: any) => {
              return (
                <TableRow
                  style={
                    selectedRow > 0
                      ? {
                          background:
                            selectedRow === item.id ? '#A3ABEB' : undefined,
                        }
                      : {}
                  }
                  className={classes.tableRow}
                  onClick={() => handleRowClick(item?.id)}
                >
                  {Object.entries(item).map((value: any, index) => {
                    if (value[0] == 'id') {
                      return null;
                    }
                    return (
                      <TableCell className={classes.cell}>{value[1]}</TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {withPagination && totalCount && page && handlePageChange && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {`Показано ${
              (page > 1 ? page * 6 - 6 + ' - ' : '') +
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
      )}
    </>
  );
};

export default CustomReusableTable;
