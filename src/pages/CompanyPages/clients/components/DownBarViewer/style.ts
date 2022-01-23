import styled from "styled-components";
interface IProps {
    open: boolean
}
export const Wrapper = styled.div`
    position: fixed;
    height: 46px;
    border-radius: 12px 12px 0 0;
    padding: 5px 15px;
    width: 100%;
    left: 0;
    right: 0;
    bottom: ${({ open }: IProps) => open ? "0" : "-46px"};
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 200ms all;
    p {
        font-size: 14px;
        font-weight: 300;
        line-height: 16.41px;
        color: #223367;
    }
`