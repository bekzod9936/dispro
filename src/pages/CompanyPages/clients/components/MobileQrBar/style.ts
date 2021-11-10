import styled from "styled-components";
interface IProps {
    isOpen: boolean
}
export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: white;
    transition: 200ms all;
    transform: ${({ isOpen }: IProps) => isOpen ? "translateX(0)" : "translateX(100%)"};
    z-index: 2002;
    padding: 20px 15px 25px 15px;
`
export const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 55px;
    h6 {
        font-size: 16px;
        line-height: 18.75px;
        color: #223367;

    }
`
export const FakeQrCode = styled.div`
    width: 146px;
    height: 146px;
    background-color: #223367;
    margin-bottom: 15px;
`

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    p {
        color: #223367;
        font-size: 22px;
        line-height: 25.78px;
        font-weight: 500;
        margin-bottom: 50px;
    }
`

export const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`