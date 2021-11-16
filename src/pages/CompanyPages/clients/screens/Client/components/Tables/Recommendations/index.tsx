import Filter from 'components/Custom/Filter'
import { Label } from 'components/Custom/Input/style'
import { WrapCheck, WrapDate, WrapInputs, WrapStatus } from 'pages/CompanyPages/clients/components/Header/style'
import React, { useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTable } from 'react-table'
import { operationsColumns, operationsHeaders } from '../Operations/constants'
import { Footer, Table, Tbody, Td, Th, THead, TRow } from '../Operations/style'
import Input from "components/Custom/Input"
import { getOneDayPlus } from 'pages/CompanyPages/clients/utils/getSelectedFilters'
import CheckBox from 'components/Custom/CheckBox'
import { useQuery } from 'react-query'
import { fetchReferChilds } from 'services/queries/clientsQuery'
import { useAppSelector } from 'services/redux/hooks'
import Spinner from 'components/Helpers/Spinner'
import { EmptyTable } from '../../EmptyTable'
import recommendations from "assets/images/recomendations.png"
import Pagination from 'components/Custom/Pagination'

const Recommendations = () => {
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const { currentClient, period } = useAppSelector(state => state.clients)
    const [totalCount, setTotalCount] = useState(1)
    const [recomendations, setRecomendations] = useState<any[]>([])
    const [filter, setFilter] = useState<any>({
        status: [{
        }]
    })
    const { isFetching } = useQuery(["fetchRecommends", page], () => fetchReferChilds({
        id: currentClient?.clientInfo.id,
        startDate: period.startDate,
        endDate: period.endDate,
        regDateFrom: "",
        regDateTo: "",
        levelNumbers: [],
        page
    }), {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            console.log(data.data.data);

        }
    })


    const headers: any = useMemo(() => operationsHeaders.map(header => (
        {
            Header: t(header),
            accessor: header
        }
    )), [operationsHeaders])

    const columns = useMemo(() => operationsColumns, [operationsColumns])
    const filterList = [
        {
            title: t("registration_date"),
            content: (
                <WrapInputs>
                    <Label>{t("chose_date")}</Label>
                    <div>
                        <Input
                            type="date"
                            width={{
                                maxwidth: 200,
                            }}
                            IconStart={<WrapDate>{t("from")}</WrapDate>}
                            inputStyle={{
                                inpadding: "0 10px 0 0",
                            }}
                            max={getOneDayPlus(filter?.regDate?.regDateTo, "minus")}
                            value={filter?.regDate?.regDateFrom}
                            onChange={(e) => setFilter((prev: any) => ({
                                ...prev, regDate: {
                                    ...prev["regDate"],
                                    regDateFrom: e.target.value
                                }
                            }))}
                        />
                        <Input
                            type="date"
                            width={{
                                maxwidth: 200,
                            }}
                            min={getOneDayPlus(filter?.regDate?.regDateFrom, "plus")}
                            margin={{ laptop: "0 0 0 15px" }}
                            IconStart={<WrapDate>{t("to")}</WrapDate>}
                            inputStyle={{
                                inpadding: "0 10px 0 0",
                            }}
                            value={filter?.regDate?.regDateTo}
                            onChange={(e) => setFilter((prev: any) => ({
                                ...prev, regDate: {
                                    ...prev["regDate"],
                                    regDateTo: e.target.value
                                }
                            }))}
                        />
                    </div>
                </WrapInputs>
            )
        },
        {
            title: t("status"),
            content: (
                <WrapStatus>
                    <Label>{t('chose_status')}</Label>
                    <WrapCheck>
                        {filter?.status?.map((v: any) => (
                            <CheckBox
                                key={v.label}
                                label={v.label}
                                checked={v?.[v?.name]}
                                name={v.name}
                                onChange={(e: any) => {
                                    const arr = filter?.status?.map((i: any) => {
                                        if (i.name === e.target.name) {
                                            return { ...i, [e.target.name]: e.target.checked };
                                        } else {
                                            return i;
                                        }
                                    });

                                    setFilter((prev: any) => ({ ...prev, status: arr }));
                                }}
                            />
                        ))}
                    </WrapCheck>
                </WrapStatus>
            )
        }
    ]

    const { getTableBodyProps, getTableProps, prepareRow, rows, headerGroups } = useTable({ columns: headers, data: columns })
    if (isFetching) {
        return (
            <Spinner />
        )
    }
    if (!isFetching && recomendations.length === 0) {
        return (
            <EmptyTable image={recommendations} text={"Тут будут отображаться все рекомендации клиента"} />
        )
    }
    return (
        <>
            <div style={{ margin: "0 0 10px 0" }}>
                <Filter list={filterList} />
            </div>
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
                    defaultPage={1}
                    onChange={(e: number) => setPage(e)}
                    count={totalCount}
                />
            </Footer>
        </>
    )
}
export default Recommendations