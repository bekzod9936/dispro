import styled from "styled-components";

interface IProps {
    isSelected?: boolean;
    isChild?: boolean;
}

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: 300px;
    width: 100%;
`

export const Item = styled.div`
    border-radius: 14px;
    background-color: ${({isSelected}: IProps) => isSelected ? '#606EEA' : '#fff'};
    max-width: ${({isChild}: IProps) => isChild ? '280px' : '300px'};
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    margin-bottom: 10px;
    cursor: pointer;
    box-shadow: ${({isSelected}: IProps) => isSelected ? '0px 4px 9px rgba(96, 110, 234, 0.46)' : '0px 4px 4px rgba(0, 0, 0, 0.04)'};

    h4 {
        color: ${({isSelected}: IProps) => isSelected ? '#fff' : '#223367'};
        font-weight: 400;
        font-size: 18px;
        line-height: 21.09px;
    }
`