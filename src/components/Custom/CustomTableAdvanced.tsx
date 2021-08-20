import { Checkbox, Hidden, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { PaginationItem } from '@material-ui/lab'
import React, { useRef, useState } from 'react';
import { makeStyles } from "@material-ui/core"
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../services/redux/hooks';
import { Text } from "../../styles/CustomStyles"
import { PuzzleIcon } from '../../assets/icons/ClientsPageIcons/ClientIcons';
import { Flex } from '../../styles/BuildingBlocks';
import DropDown from './DropDown';
import { StyledPagination } from '../../styles/Elements';
import { FONT_SIZE, FONT_WEIGHT } from '../../services/Types/enums';

interface IProps {
    rows: any,
    headers: any,
    listItems: any,
    totalCount: number,
    handlePageChange: (page: number) => void,
    page: number,
    handleClientClick: (id: number) => void,
    checked?: boolean,
    handleAllCheck?: any,
}

const useStyles = makeStyles({
    table: {
        maxWidth: "100%",
        background: "white",
        borderRadius: "12px",

    },
    pagination: {
        border: "1px solid black"
    },
    tableHead: {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
        position: "relative",
        zIndex: 10,
    },
    tableHeadCell: {
        fontSize: '15px',
        fontWeight: 400,
        color: "#A5A5A5",
        border: "none",


    },
    container: {
        paddingBottom: "8px",
        background: "white",
        borderRadius: "12px",
        width: "95%"
    },
    cell: {
        border: "none"
    },
    tableRow: {
        '&:nth-of-type(odd)': {
            background: "#F0F1FD",
            //opacity: "0.92",


        },
        '&:nth-of-type(even)': {
            backgroundColor: "white"
        },

    }
})
const CustomTableAdvanced: React.FC<IProps> = ({ handleAllCheck, handleClientClick, rows, headers, listItems, totalCount, handlePageChange, page, checked }) => {

    const { t } = useTranslation();
    const classes = useStyles();
    const anchorRef = useRef(null);
    const headersAllowed = useAppSelector(state => state.clients.clientsHeaders);
    const filteredHeaders = headers.filter((item: any) => headersAllowed.includes(item));
    const [openDrop, setOpenDrop] = useState<boolean>(false);
    const filteredRows = rows.map((item: any) => {
        let filteredRow: any = {
            data: {}
        };
        for (let key in item.data) {
            if (headersAllowed.includes(key)) {
                filteredRow.data[key] = item.data[key]
            }
        }
        filteredRow.id = item.id;
        return filteredRow;
    })
    console.log(filteredRows);

    return (
        <>
            <TableContainer className={classes.container}>
                <Flex justifyContent="space-between" alignItems="center" width="100%" padding="18px 40px" >
                    <div>
                        <Text fontSize="16.5px" fontWeight={500} marginLeft="0px" marginRight="0px">
                            {t("clients")}
                        </Text>
                    </div>



                    <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                        <span ref={anchorRef} onClick={() => { setOpenDrop(!openDrop) }}>
                            <Text marginRight="10px" marginLeft="0px" fontSize="16.5px" fontWeight={500}
                                color="#606EEA"
                            >{t("addColumn")}</Text>
                            <PuzzleIcon />
                        </span>

                        <DropDown open={openDrop} ref={anchorRef} >
                            <Flex flexDirection="column" justifyContent="space-between" padding="25px 18px" width="315px" alignItems="flex-start" >
                                {listItems}
                            </Flex>
                        </DropDown>
                    </div>




                </Flex>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        {filteredHeaders.map((item: any) => {
                            if (item === "check") {
                                return <TableCell className={classes.tableHeadCell}>
                                    <Checkbox onChange={handleAllCheck} />
                                </TableCell>
                            }
                            return <TableCell className={classes.tableHeadCell}>{t(item)}</TableCell>
                        })}
                    </TableHead>
                    <TableBody>
                        {filteredRows.map((item: any) => {
                            return (
                                <TableRow onClick={() => handleClientClick(item.id)} className={classes.tableRow}>
                                    {Object.values(item.data).map((value: any, index) => {
                                        return (
                                            <TableCell className={classes.cell}>{value}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    {`Показано ${(page > 1 ? (page * 6 - 6) + " - " : "") + ((page * 6) <= totalCount ? (page * 6) : (totalCount))} из ${totalCount} клиентов`}
                </div>
                <StyledPagination page={page} count={Math.ceil(totalCount / 6)} boundaryCount={4} onChange={(e, page) => handlePageChange(page)} />
            </div>

        </>

    );
}

export default CustomTableAdvanced;
