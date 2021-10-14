import styled from "styled-components";
import { ITRow } from "../../style/types";

export const TableWrapper = styled.div`
    max-width: 1270px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 14px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    margin-bottom: 20px;
`
export const TableHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 45px;
    border-bottom: 1px solid rgba(96, 110, 234, 0.1);
`

export const Title = styled.h2`
    color: #223367;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
`

export const AddButton = styled.button`
    outline: 0;
    cursor: pointer;
    border: none;
    color: #606EEA;
    font-size: 18px;
    line-height: 21px;
    font-weight: 500;
    background-color: transparent;
    font-family: 'Roboto', sans-serif;
    margin-right: 10px;
`

export const TableBlock = styled.table`
    width: 100%;
    overflow: hidden;
`

export const THead = styled.thead`
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
`
export const Th = styled.th`
    text-align: start;
    padding: 20px;
    color: #A5A5A5;
    border: none;
    font-size: 16px;
`
export const Td = styled.td`
    font-size: 16px;
    padding: 20px;
    border: none;
    color: #223367;
`

export const TBody = styled.tbody`
    width: 100%;
    overflow: hidden;
    border-radius: 0 0 14px 14px;
`
export const TRow = styled.tr`
    border: none;
    background: ${({ background }: ITRow) => background ? "rgba(96, 110, 234, 0.1)" : "transparent"};
`