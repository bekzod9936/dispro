import styled from "styled-components";
import { ReactComponent as MenuSvg } from 'assets/icons/FeedBack/dots.svg'
import { device } from "styles/device";

interface IProps {
    isSelected?: boolean;
    isChild?: boolean;
}

export const Wrapper = styled.div`
    max-width: 310px;
    width: 100%;
    min-height: 200px;
    height: calc(100vh - 41%);
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 2px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #606eea;
        border-radius: 14px 0px 0px 14px;
    }

    @media (max-height: 820px) and (min-width: ${device.laptop}) {
        height: calc(100vh - 51%);
    }

    @media (max-width: ${device.laptop}) and (min-height: 700px) {
        height: calc(100vh - 35%);
    }

    @media (max-width: ${device.laptop}) {
        max-width: 285px;
    }

`

export const ItemWrapper = styled.div`
    max-width: 300px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media (max-width: ${device.laptop}) {
        max-width: 270px;
    }

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
        text-overflow: ellipsis;
        max-width: 225px;
        width: 100%;
        overflow-x: hidden;
        white-space: nowrap;

    }

    svg {
        circle {
            fill: ${({ isSelected }: IProps) => isSelected ? '#fff' : '#223367'}
        }
    }

    @media (max-width: ${device.laptop}) {
        max-width: ${({isChild}: IProps) => isChild ? '250px' : '270px'};
        height: 45px;

        h4 {
            font-size: 16px;
            line-height: 18.75px;
            max-width: 200px;
        }
    }
`

//icons
export const MenuIcon = styled(MenuSvg)``


