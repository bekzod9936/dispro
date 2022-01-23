import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 35px 35px 30px 35px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 35px;
    h5 {
        font-size: 22px;
        color: #223367;
        line-height: 25.5px;
        margin-right: 15px;
    }
    svg {
        cursor: pointer;
    }
`

export const Preview = styled.div`
    max-width: 240px;
    width: 100%;
    position: relative;
    height: max-content;
    overflow: hidden;
`
export const ImageIphone = styled.img`
    width: 100%;
    z-index: 12;
    position: relative;
`

export const PreviewContent = styled.div`
    z-index: 15;
    position: absolute;
    top: 148px;
    border-radius: 20px;
    left: 10px;
    right: 10px;
    bottom: 130px;
    background-color: #eef0f2;
    padding: 15px 0 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        border-radius: 50%;
        height: 35px;
        width: 35px;
        margin-bottom: 10px;
    }
    span {
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 15px;
        color: #223367;
    }
    b {
        font-size: 15px;
        font-weight: 700;
        color: #223367;
        margin-bottom: 10px;
    }
    h4 {
        font-size: 15px;
        color: #223367;
        display: flex;
        align-items: center;
        span {
            font-size: 25px;
            font-weight: 700;
            margin-bottom: 0;
            margin-right: 8px;
        }
    }
`

export const MoreInfo = styled.div`
    width: 100%;
    padding: 0 8px;
    div {
        display: flex;
        &:not(:last-child) {
            margin-bottom: 10px;

        }
        align-items: center;
        justify-content: space-between;
        width: 100%;
        span {
            font-size: 12px;
            color: #223367;
            margin-bottom: 0;
        }
        b {
            margin-bottom: 0;
            font-size: 13px;
        }
    }
`

export const ImagePreview = styled.img`
    position: absolute;
    top: 8px;
    border-radius: 30px 30px 0 0;
    left: 10px;
    width: 225px;
    height: 155px;
    /* right: 10px; */
`