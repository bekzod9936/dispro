import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useTable } from 'react-table'
import { operationsColumns, operationsHeaders } from './constants'
import { Table, Tbody, Td, Th, THead, TRow } from './style'

const Operations = () => {
    const { t } = useTranslation()
    const headers: any = useMemo(() => operationsHeaders.map(el => (
        {
            Header: t(el),
            accessor: el
        }
    )), [operationsHeaders])

    const data = useMemo(() => operationsColumns, [operationsColumns])
    const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } = useTable({ columns: headers, data: data })
    return (
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
    )
}

export default Operations