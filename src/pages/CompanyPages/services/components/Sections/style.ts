import styled from "styled-components";

interface IProps {
    isSelected?: boolean;
    isChild?: boolean
}

export const Item = styled.div`
    border-radius: 14px;
    background-color: ${({isSelected}: IProps) => isSelected ? '#606EEA' : '#fff'};
    max-width: 300px;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    margin-left: ${({isChild}: IProps) => isChild ? '20px' : ''};
    margin-bottom: 10px;
    cursor: pointer;

    h4 {
        color: ${({isSelected}: IProps) => isSelected ? '#fff' : '#223367'};
        font-weight: 400;
        font-size: 18px;
        line-height: 21.09px;

    }
`