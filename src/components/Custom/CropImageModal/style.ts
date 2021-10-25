import styled from "styled-components"
import cropbackground from 'assets/images/CropRename.png';

export const Image = styled.img`
position: absolute;
left: 13px;
right: 10px;
width: 272px;
top: 13px;
height: 175px;
border-radius: 30px 30px 0 0;
`

export const Wrapper = styled.div`
    padding: 35px 45px 30px 45px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    z-index: 100;
`


export const Right = styled.div`
    width: 565px;
    border-radius: 14px;
    overflow: hidden;
    height: 375px;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: contain;
    background-image: url(${cropbackground});
    margin-right: 50px;

`
export const Colka = styled.div`
    width: 150px;
    height: 20px;
    background-color: #f4f0ec;
    border-radius: 0 0 14px 14px;
    position: relative;
    z-index: 20;
`

export const Left = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    height: 375px;
    overflow: hidden;

    h4 {
        font-size: 16px;
        color: #C7C7C7;
        margin-bottom: 20px;
        line-height: 18.75px;
        text-align: center;
    }
    border-bottom: 1px solid rgba(96, 110, 234, 0.3);
    /* box-shadow: 0px -1px 5px rgba(96, 110, 234, 0.25); */
    `

export const PreviewDiv = styled.div`
    position: relative;
    width: max-content;
    overflow: hidden;
    border-radius: 50px 50px 0 0;
`

export const PreviewBg = styled.img`
    position: absolute;
    top: 13px;
    left: 5px;
    right: 13px;
    width: 285px;
    height: 180px !important;
    /* object-fit: fill; */
    /* border-radius: 30px; */
`

export const Preview = styled.div`
    position: relative;
    overflow: hidden;
 
    img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 280px;
        z-index: 1;
    }
    width: 300px;
    height: 335px;
    border-radius: 50px 50px 0 0;
    border: 10px solid #f4f0ec;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(96, 110, 234, 0.3);
    box-shadow: 0px -1px 5px rgba(96, 110, 234, 0.25);;
    
`


export const Bottom = styled.div`
    width: 100%;
    height: 180px;
    border-radius: 14px 14px 0 0;
    background-color: #ffffff;
    z-index: 20;
    position: relative;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
        font-size: 22px;
        color: #223367;
        line-height: 26px;

    }
    margin-bottom: 40px;
    svg {
        cursor: pointer;
    }
`


export const PreviewContent = styled.div`
    position: absolute;
    bottom: 0;
    /* width: 100%; */
    left: 13px;
    right: 13px;
    height: 150px;
    border-radius: 20px 20px 0 0;
    background-color: #eef0f2;
    z-index: 30;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    padding: 25px 0 0 10px;
    img {
        border-radius: 50%;
        width: 45px;
        height: 45px;
        margin-bottom: 5px;
    }
    p {
        font-size: 13px;
        font-weight: 500;
        color: #223367;
        margin-bottom: 15px;
    }
    span {
        font-size: 16px;
        font-weight: 700;
        color: #223367;
        margin-bottom: 10px;
    }

`