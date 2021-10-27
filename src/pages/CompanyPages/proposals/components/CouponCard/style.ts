import styled from "styled-components"
interface IProps {
    isSelected?: boolean
}
export const Container = styled.div`
    transition: 200ms all;
    padding: 18px 20px;
    background: ${({ isSelected }: IProps) => isSelected ? "rgba(96, 110, 234, 0.1);" : "#ffffff"};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 860px;
    width: 100%;
    margin-bottom: 15px;
    cursor: pointer;

`

export const ImageBlock = styled.div`
    width: 32%;
    
    img {
        border-radius: 14px;
        width: 200px;
        display: block;
        height: 120px;
    }
`

export const Main = styled.div`
    /* margin-right: 60pxf; */
    width: 32%;
    @media (max-width: 1210px) {
        width: 49%;
    }
    div {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        h6 {
            font-size : 14px;
            font-weight: 400;
            color: #223367;
        }
        p {
            color: #8F8F8F;
            font-size: 14px;
            line-height: 16px;
            font-weight: 500;
            margin-left: 30px;
        }
    }
    p {
        font-size: 14px;
        line-height: 16px;
        font-weight: 300;
        color: #223367;
    }
    h4 {
        font-size: 18px;
        line-height: 21px;
        color: #223367;
        margin-bottom: 10px;
    }
`

export const Submain = styled.div`
    width: 32%;
    @media (max-width: 1210px) {
        display: none;
    }
    p {
        color: #223367;
        font-size: 14px;
        font-weight: 300;
        line-height: 16.5px;
        &:not(:last-child) {
            margin-bottom: 9px;
        }
    }
`