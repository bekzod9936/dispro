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

export const MainWrapper = styled.div`

  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;

`;
export const Wrapper = styled.div`
  width: 98%;
  height: 100%;
  background-color:#fff;
  border-radius: 15px;
padding-top:50px;
padding-bottom:50px;
padding-left:100px;

`;
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
`;

export const Content = styled.div`
  margin: 20px 0px 20px 300px;
  position: absolute;
  /* top: 50%; */
  top: 0%;
 
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

export const ContentView=styled.div`
    display: flex; 
    justify-content: space-between;
    `;
export const TitleNews=styled.p`
 color: "#223367";
  max-width:500px;
  word-break: break-all;
  margin: 15px 0px 25px 0;
  padding-bottom:10px;
`
export const LongDescriptionNews=styled.div`
    color: #223367;
    font-size: 12px;
    font-weight: 300;
    line-height:16px;
    margin: 15px 0px 25px;
    word-break: break-all;
    max-width: 500px ;
    `;
export const DescriptionNews=styled.p`
  color: #223367;
  font-weight: 300;
  margin: 15px 0px 25px 0;
  line-height:16px;
  word-break: break-all;
  max-width: 600px;
  `;

export const Preview = styled.div`
  position: relative;
  z-index: 12;
  height: 100%;
  width:100%;
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
    object-fit:'cover';
  }
  img.iphoneImg {
    max-width: 300px !important;
    width: 100%;
    height: 100%;
    position: relative;
    object-fit:'cover';
    /* z-index: 12; */
  }
`;

export const PreviewContent = styled.div`
  position: absolute;
  background-color: #eef0f2;
  height: 68%;
  left: 13px;
  right: 10px;
  bottom: 2%;
  width: 274px;
  border-radius: 10px 10px 30px 30px;
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
    font-weight: 300;
    font-size: 14px;
    /* color: #223367; */
    margin-bottom: 15px;
    
  }
  div {
    position: absolute;
    bottom: 10%;
    padding: 8px 30px;
    background-color: #606EEA;
    color: white;
    border-radius: 20px;
  }
  p {
    padding-top: 10px;
    word-break: break-all; 
    font-weight: 700;
    color: #223367;
    font-size: 10px;
    margin-bottom: 10px;
    padding:10px 20px;
  }
  h5 {
    padding:5px 10px;

    color: #223367;
    display: flex;
    align-items: center;
    justify-content:flex-start;
   
    margin-right: 50px;
    span {
      word-break: break-all; 
      font-size: 14px !important;
      font-weight: 700;  
      margin-left: 10px;
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

export const Buttons = styled.div`
	display: flex;
	justify-content: center;
    margin-top: 5px;
    
`
export const ModalContent = styled.div`
  padding: 15px;
`;

export const HeaderLaptop = styled.header`
  display: flex;
  align-items: center;
  margin-left: -10px;
  grid-gap: 15px;
  & > span {
    font-weight: 500;
    font-size: 16px;
    color: #223367;
  }
`;
export const WrapAvatar = styled.div`
  display: flex;
  align-items: center;
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

export const WrapBox = styled.div`
padding:25px 10px;
`;
export const WrapBoxDetail=styled.div`
padding:0px 10px;
`
export const Box = styled.div`
  /* border-bottom: 1px solid rgba(96, 110, 234, 0.3); */
  padding: 10px 0 10px 5px;
`;

export const BoxTitle = styled.div`
  font-weight: normal;
  font-size: 14px;
  color: #a5a5a5;
  margin-bottom: 5px;
`;

export const BoxInfo = styled.div`
  font-weight: 500;
  font-size: 14px;
  padding-right:20px;
  color: #223367;
  
`;
export const BoxinfoDetail=styled.div`
font-weight:300;
font-size:14px;

color: #223367;
padding:5px 0px;
`;

export const WrapperModal = styled.div`
    padding: 20px 45px;
    min-width:530px;
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
`
export const ContentButton=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-top: 2%;
`