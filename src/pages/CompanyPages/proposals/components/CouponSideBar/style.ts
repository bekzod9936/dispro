import styled from "styled-components"

export const DeleteModal = styled.div`
    padding: 40px 55px 35px 55px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    h5 {
        font-size: 18px;
        line-height: 21px;
        font-weight: 500;
        color: #223367;
        margin-bottom: 20px;
    }
    p {
        font-size: 14px;
        line-height: 16.5px;
        color: #223367;
        font-weight: 300;
        margin-bottom: 30px;
    }
`
export const Wrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 15px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Header = styled.div`
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    h6 {
        font-size: 18px;
        color: #223367;
        line-height: 21px;
    }
`

export const Content = styled.div`
    margin: 40px 0 35px 0;

    h5 {
        font-size: 16px;
        color: #C7C7C7;
        line-height: 19px;
        margin-bottom: 10px;
    }
    p {
        font-size: 14px;
        line-height: 16px;
        font-weight: 300;
        color: #223367;
        &:not(:last-child) {
            margin-bottom: 9px;
        }
    }
`