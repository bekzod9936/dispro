import styled from "styled-components";
import { device } from "styles/device";

interface PRops {
  isScroll?: boolean;
}

export const Container = styled.div`
  display: flex;
  padding: ${({ isScroll }: PRops) =>
    isScroll ? "5px 20px 0 0" : "5px 20px 25px 0"};
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Form = styled.form`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: ${({ isScroll }: PRops) =>
    isScroll ? "14px 14px 0 0" : "14px"};
  overflow: hidden;
  padding-top: 40px;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: auto;
  padding: 0 40px;

  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
  & > div {
    display: flex;
    flex-direction: column;
    grid-gap: 40px;
  }
`;

export const LeftSide = styled.div`
  width: 31%;
`;

export const RightSide = styled.div`
  width: 62%;

  .rightswitch {
    width: 50%;
  }
  .textswitch {
    width: 45%;
  }
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #223367;
  margin-right: 35px;
  @media (max-width: ${device.mobile}) {
    font-size: 15px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const Text = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  word-break: break-word;
  margin: 10px 0 15px 0;
  width: calc(100% - 50px);
`;

export const WrapSwitch = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Box = styled.div`
  width: 100%;
`;

export const DownSide = styled.div`
  padding: 0 40px;
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    padding: ${({ isScroll }: PRops) => (isScroll ? "25px 0" : "0 0 40px")};
    border-top: ${({ isScroll }: PRops) =>
      isScroll ? "1px solid #d0d4f9" : "none"};
  }
`;

export const WrapperVip = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
`;

export const IconWord = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #c7c7c7;
  padding-right: 20px;
`;

export const WrapDesc = styled.div`
  display: flex;
  align-items: flex-start;
  & > div {
    width: 50%;
  }
`;
