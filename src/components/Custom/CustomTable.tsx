import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React from 'react';

interface IProps {
    headers: any[] | [],
    rows: any[] | []
}
const useStyles = makeStyles({
    table: {
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",

    },
    cell: {
        borderBottom: "none",
    },
    container: {
        paddingBottom: "8px",
        background: "white",
        width: "90%",
        borderRadius: "12px"
    },

    header: {
        boxShadow: "4px 4px 4px #2f3cc9"
    },
    headRow: {
        background: "white",
        color: "#A5A5A5"
    },
    tableRow: {
        '&:nth-of-type(odd)': {
            background: "#F0F1FD",
            opacity: "0.92",


        },
        '&:nth-of-type(even)': {
            backgroundColor: "white"
        },


    }

}
)

const CustomTable: React.FC<IProps> = ({ headers, rows }) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.container}>
            <Table className={classes.table}>
                <TableHead className={classes.header}>
                    {headers.map((item: string) => {
                        return <TableCell className={classes.headRow}>{item}</TableCell>
                    })}
                </TableHead>
                <TableBody>
                    {rows.map((item: any) => {
                        return <TableRow className={classes.tableRow}>
                            {item.map((value: any) => {
                                return <TableCell className={classes.cell}>{value}</TableCell>
                            })}</TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable;
