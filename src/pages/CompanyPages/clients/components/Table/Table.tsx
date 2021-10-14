import CheckBox from 'components/Custom/CheckBox'
import React from 'react'
import { useAppSelector } from 'services/redux/hooks'
import { AddColumnButton } from './AddColumnBtn/AddColumnButton'
import { AddButton, TableBlock, TableHeader, TableWrapper, TBody, Td, Th, THead, Title, TRow } from './style'

export const Table = () => {
    const { clients, addedHeaders, visibleClients } = useAppSelector(state => state.clients)



    return (
            <TableWrapper>
                <TableHeader>
                    <Title>Клиенты</Title>
                    <AddColumnButton />
                </TableHeader>
                <TableBlock>
                    <THead>
                        <TRow>
                            <Th><CheckBox /></Th>
                            {addedHeaders.map((header, index) => (
                                <Th key={index}>{header.value}</Th>
                            ))}
                        </TRow>
                    </THead>
                    <TBody>
                        {visibleClients.map((client, index: any) => (
                            <TRow background={index % 2}>
                                <Td><CheckBox /></Td>
                                {Object.keys(client).map((el, i) => {
                                    if(addedHeaders.some(e => e.label === String(el))) {
                                        return <Td key={i}>{client[el]}</Td>
                                    }
                                })}
                            </TRow>
                        ))}
                    </TBody>
                </TableBlock>
            </TableWrapper>
        
    )
}
