import Pagination from 'components/Custom/Pagination'
import Spinner from 'components/Helpers/Spinner'
import operationsImage from "assets/images/operations.png"
import { tableDataHelper } from 'pages/CompanyPages/clients/utils/getSelectedFilters'
import { useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useTable } from 'react-table'
import { fetchClientTableData } from 'services/queries/clientsQuery'
import { useAppSelector } from 'services/redux/hooks'
import { EmptyTable } from '../../EmptyTable'
import { operationsHeaders } from './constants'
import { Footer, Table, Tbody, Td, Th, THead, TRow } from './style'
interface IOperation {
    cashier: string,
    points: number,
    date: string,
    UZS: number,
    cashbackSum: number,
    sale: number,
    type: string,

}
const Operations = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [operations, setOperations] = useState<IOperation[]>([])
    const { currentClient, period } = useAppSelector(state => state.clients);

    const { isFetching } = useQuery(["fetchOperations", page], () => fetchClientTableData("operations", {
        id: currentClient?.clientInfo.id,
        startDate: period.startDate || "",
        endDate: period.endDate || "",
        page
    }), {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setOperations(tableDataHelper(data.data.data.clientCardOperations));
            let res = Math.ceil(data.data.data.totalCount / 10)
            setTotalCount(res)
        }
    })





    const headers: any = useMemo(() => operationsHeaders.map(el => (
        {
            Header: t(el),
            accessor: el
        }
    )), [operationsHeaders])

    const data = useMemo(() => operations, [operations])
    const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } = useTable({ columns: headers, data: data })
    if (isFetching) {
        return (
            <Spinner />
        )
    }
    if (!isFetching && operations.length === 0) {
        return (
            <EmptyTable image={operationsImage} text={"Тут будут отображаться все операции клиента"} />
        )
    }
    return (
        <>
            <Table {...getTableProps()}>
                <THead>
                    {headerGroups.map(headerGroup => (
                        <tr style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)" }} {...headerGroup.getHeaderGroupProps}>
                            {headerGroup.headers.map(column => (
                                <Th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </Th>
                            ))}
                        </tr>
                    ))}
                </THead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <TRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <Td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </Td>
                                    )
                                })}
                            </TRow>
                        )
                    })}

                </Tbody>
            </Table>
            <Footer>
                <Pagination
                    defaultPage={page}
                    onChange={(e: any) => setPage(e)}
                    count={totalCount}
                />
            </Footer>
        </>
    )
}

export default Operations