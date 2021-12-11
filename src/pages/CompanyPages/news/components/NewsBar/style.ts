import styled from "styled-components";
import { device } from "styles/device";

export const DeleteModal = styled.div`
  padding: 40px 55px 35px 55px;
  background: #ffffff;
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
`;

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 25px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1000) {
    width: 320px;
  }
  /* justify-content: space-between; */
`;

export const Header = styled.div`
  width: 100%;

  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-top: 25px;
  h6 {
    font-weight: 700;
    font-size: 18px;
    color: #223367;

    line-height: 21px;
  }
`;

export const ContentInfo = styled.div`
  margin: 20px 0px;

  h5 {
    font-size: 16px;
    color: #c7c7c7;
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
`;
export const ContentButton = styled.div``;

export const ButtonView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
`;
export const ContentSideBar = styled.div`
  flex: 1;
  height: 80%;
  width: 100%;
  padding: 5px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Preview = styled.div`
  position: relative;
  z-index: 12;
  height: 45%;
  overflow: hidden;
  /* @media (max-height: 900px) {
        display: none;
    } */
  img.couponImg {
    position: absolute;
    left: 10px;
    right: 10px;
    border-radius: 30px 30px 0 0;
    max-width: 275px;
    width: 100%;
    top: 10px;
    min-height: 185px;
  }
  img.iphoneImg {
    max-width: 300px;
    width: 100%;
    position: relative;
    /* z-index: 12; */
  }
`;
export const PreviewDivNews = styled.div`
  position: relative;
  width: max-content;
  overflow: hidden;
  border-radius: 8px;
  min-width: 320px;
  border: 1px solid white;
`;
export const LeftRound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 275px;
  overflow: hidden;

  h4 {
    font-size: 16px;
    color: #c7c7c7;
    margin-bottom: 20px;
    line-height: 18.75px;
    text-align: center;
  }
  h5 {
    font-size: 16px;
    width: 280px;

    padding: 8px 0px 4px 1px;
    line-height: 16px;
    color: #223367;
  }
  p {
    font-size: 14px;
    padding: 2px 1px;

    width: 280px;
    line-height: 16px;
    color: #223367;
  }
  background: #ffffff;
  box-shadow: -5px 2px 20px rgba(0, 0, 0, 0.06);
`;
export const PreviewBgNews = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  min-width: 320px;
  height: 180px !important;
  border-radius: 5px solid black;
  border: 5px;
`;
export const PreviewContent = styled.div`
  position: absolute;
  bottom: 0;
  background-color: #eef0f2;
  height: 50%;
  left: 10px;
  right: 10px;
  border-radius: 30px 30px 0 0;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  span {
    font-weight: 500;
    font-size: 14px;
    color: #223367;
    margin-bottom: 15px;
  }
  p {
    font-weight: 700;
    color: #223367;
    font-size: 18px;
    margin-bottom: 15px;
  }
  h5 {
    font-size: 15px;
    color: #223367;
    display: flex;
    align-items: center;
    span {
      font-size: 20px !important;
      font-weight: 700;
      margin-right: 10px;
      margin-bottom: 0;
    }
  }
`;
export const Img = styled.img`
  display: none;
  width: 200px;
  border-radius: 14px;
  @media (max-height: 900px) {
    display: block;
  }
  @media (max-width: ${device.laptop}) {
    display: block;
  }
`;
export const CloseButton = styled.div`
  position: absolute;
  right: 25px;
  top: 15px;
  cursor: pointer;
`;

export const WrapperModal = styled.div`
  padding: 20px 45px;
  min-width: 530px;
  position: relative;
  a {
    text-decoration: none;
  }
  h3 {
    font-size: 22px;
    line-height: 26px;
    margin-bottom: 10px;
    color: #223367;
  }
  p {
    font-size: 18px;
    font-weight: 300;
    color: #223367;
    margin-bottom: 25px;
  }
  @media (max-width: ${device.mobile}) {
    width: 100%;
    position: relative;
    padding: 0;
    justify-content: initial;
    align-items: center;
    min-height: none;
    height: 100%;
    border-radius: 0;

    h3 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 15px;
    }
    p {
      display: none;
    }
  }
`;

export const WrapAvatar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  grid-gap: 15px;
  & > span {
    font-weight: 500;
    font-size: 16px;
    color: #223367;
  }
`;

export const WrapIcon = styled.div`
  display: flex;
  align-items: center;
`;
export const TitleSideBar = styled.div`
  display: "block";

  p {
    white-space: pre-wrap;
    word-break: break-all;
    font-size: 16px;
    color: #223367 !important;
    font-weight: 500;
  }
  span {
    font-size: 14px;
    color: #223367;
  }
  @media (max-width: ${device.planshet}) {
    h4 {
      white-space: pre-wrap;
      word-break: break-all;
      font-size: 14px;
      color: #223367 !important;
      font-weight: 400;
      line-height:16px !important;
      margin-bottom: 20px;
    }
  }
`;

export const WrapBoxDetail = styled.div`
  padding: 0px 0px;
`;
export const Box = styled.div`
  /* border-bottom: 1px solid rgba(96, 110, 234, 0.3); */
  padding: 10px 0 10px 0px;
`;
export const BoxinfoDetail = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  padding: 5px 0px;
`;
