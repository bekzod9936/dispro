import Spinner from 'components/Helpers/Spinner'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useTable } from 'react-table'
import { fetchClientTableData } from 'services/queries/clientsQuery'
import { useAppSelector } from 'services/redux/hooks'
import { EmptyTable } from '../../EmptyTable'
import { pointsHeaders } from '../Operations/constants'
import { Footer, MobileTable, MTRow, Table, Tbody, Td, Th, THead, TRow } from '../Operations/style'
import pointsImage from "assets/images/coinsImage.png"
import { getPointsForMobile, tablePointsHelper } from 'pages/CompanyPages/clients/utils/getSelectedFilters'
import Pagination from 'components/Custom/Pagination'
import useWindowWidth from 'services/hooks/useWindowWidth'
const Points = () => {
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const { currentClient, period } = useAppSelector(state => state.clients)
    const [totalCount, setTotalCount] = useState(1)
    const [mobilePoints, setMobilePoints] = useState<any>(null)
    const { width } = useWindowWidth()
    const [points, setPoints] = useState<any[]>([])
    const { isLoading, isFetching } = useQuery(["fetchPoints", page], () => fetchClientTableData("points", {
        id: currentClient?.clientInfo.id,
        startDate: period.startDate,
        endDate: period.endDate,
        page
    }), {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setMobilePoints(getPointsForMobile(data.data.data.clientCardPoints));
            setPoints(tablePointsHelper(data.data.data.clientCardPoints))
            let res = Math.ceil(data.data.data.totalCount / 10);
            setTotalCount(res)
        }
    })





    const headers: any = useMemo(() => pointsHeaders.map(header => (
        {
            Header: t(header),
            accessor: header
        }
    )), [pointsHeaders])

    const columns = useMemo(() => points, [points])

    const { getTableBodyProps, getTableProps, prepareRow, rows, headerGroups } = useTable({ columns: headers, data: columns })

    if (isFetching) {
        return (
            <Spinner />
        )
    }
    if (!isFetching && points.length === 0) {
        return (
            <EmptyTable image={pointsImage} text={"Тут будут отображаться все операции, связанные с баллами клиента"} />
        )
    }
    return (
        <>
            {width > 600 ?
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
                </Table> :
                <MobileTable>
                    {Object.keys(mobilePoints).map((date: any, index: any) => (
                        <MTRow isEven={!!((index + 1) % 2)}>
                            <div className="date">{date}</div>
                            {mobilePoints[date].map((el: any) =>
                                <div className="content">
                                    <div className="left">
                                        <p className="type">{el.action}</p>
                                        <p className="value">{el.amount} Б.</p>
                                    </div>
                                    <span className="time">{el.time}</span>
                                </div>
                            )}
                        </MTRow>
                    ))}
                </MobileTable>}
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

export default Points