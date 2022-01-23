import Filter from 'components/Custom/Filter'
import { Label } from 'components/Custom/Input/style'
import { WrapCheck, WrapDate, WrapInputs, WrapStatus } from 'pages/CompanyPages/clients/components/Header/style'
import { useRef, useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTable } from 'react-table'
import { operationsColumns, operationsHeaders, recommendsHeaders } from '../Operations/constants'
import { Footer, MobileTable, MTRow, Table, Tbody, Td, Th, THead, TRow, Wrapper } from '../Operations/style'
import Input from "components/Custom/Input"
import { getOneDayPlus, tableRecommendsHelper } from 'pages/CompanyPages/clients/utils/getSelectedFilters'
import CheckBox from 'components/Custom/CheckBox'
import { useQuery } from 'react-query'
import { fetchReferChilds } from 'services/queries/clientsQuery'
import { useAppSelector } from 'services/redux/hooks'
import Spinner from 'components/Helpers/Spinner'
import { EmptyTable } from '../../EmptyTable'
import recommendations from "assets/images/recomendations.png"
import Pagination from 'components/Custom/Pagination'
import { useWindowSize } from 'pages/CompanyPages/clients/hooks/useWindowSize'
import useWindowWidth from 'services/hooks/useWindowWidth'
import { DefaultImg } from 'pages/CompanyPages/clients/components/MobileTable/style'
import clientDefault from "assets/images/staff_default.png"
import { NewPagination } from 'components/Custom/NewPagination'

const Recommendations = () => {
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const parentRef = useRef<null | HTMLDivElement>(null);
    const { height } = useWindowSize()
    const { currentClient, period } = useAppSelector(state => state.clients)
    const [totalCount, setTotalCount] = useState(1)
    const [position, setPosition] = useState(0)
    const [recomendations, setRecomendations] = useState<any[]>([])
    const { width } = useWindowWidth()
    const [filter, setFilter] = useState<any>({
        status: [{
        }]
    })

    const { isFetching } = useQuery(["fetchRecommends", page], () => fetchReferChilds({
        id: currentClient?.clientInfo.userId,
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
            setRecomendations(tableRecommendsHelper(data.data.data.clientCardReferChilds))

        }
    })


    const headers: any = useMemo(() => recommendsHeaders.map(header => (
        {
            Header: t(header),
            accessor: header
        }
    )), [recommendsHeaders])

    const columns = useMemo(() => recomendations, [recomendations])
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
    const handleFilterOpen = () => {
        if (parentRef.current) {
            parentRef.current.scrollIntoView({
                block: "center",
                behavior: "smooth",
                inline: "center"
            })
        }
    }
    const { getTableBodyProps, getTableProps, prepareRow, rows, headerGroups } = useTable({ columns: headers, data: columns })

    console.log(recomendations);


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
            {/* <div ref={parentRef} style={{ margin: "0 0 10px 0" }}>
                <Filter position={position} list={filterList} />
            </div> */}
            {width > 600 ?
                <Wrapper>
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
                            {rows.map((row) => {
                                prepareRow(row)
                                return (
                                    <TRow {...row.getRowProps()}>
                                        {row.cells.map((cell, index) => {
                                            if (index === 0) {
                                                return (
                                                    <Td {...cell.getCellProps()}>
                                                        <div>
                                                            <img src={cell.row?.original?.image}
                                                                onError={(e: any) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = clientDefault
                                                                }} alt="someImage" />
                                                            {cell.render('Cell')}
                                                        </div>
                                                    </Td>
                                                )
                                            }
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
                </Wrapper> :
                <MobileTable>
                    {recomendations.map((el: any, index: number) => (
                        <MTRow>
                            <div className="recRow">
                                {el.image ? <img src={el.image} onError={(e: any) => {
                                    e.target.onerror = null;
                                    e.target.src = clientDefault
                                }} alt="image" /> : <DefaultImg />}
                                <div className="right">
                                    <h3>{el.client}</h3>
                                    <p>{t("level")}: <span>{el.level}</span></p>
                                </div>
                            </div>
                        </MTRow>
                    ))}
                </MobileTable>}
            <Footer>
                <NewPagination
                    currentPage={page}
                    onChange={(e: number) => setPage(e)}
                    totalCount={totalCount}
                />
            </Footer>
        </>
    )
}
export default Recommendations