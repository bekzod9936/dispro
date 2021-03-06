import styled from "styled-components";
import { ReactComponent as Pink } from "assets/icons/StatistisPage/app.svg";
import { device } from "styles/device";
export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 5px 0;
  margin-top: 15px;
  & > div:nth-child(2n-1) {
    background-color: #eff0fd;
  }
  & > div:nth-child(2n) {
    background-color: white;
  }
`;

export const PinkIcon = styled(Pink)``;

export const Data = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const FullName = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #223367;
`;

export const Title = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
`;

export const Amount = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #223367;
  margin-left: 5px;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const Header = styled.header`
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

export const ModalContent = styled.div`
  padding: 15px;
`;

export const WrapBox = styled.div`
  padding: 25px 10px;
`;
export const WrapBoxDetail = styled.div`
  padding: 0px 10px;
`;
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
export const MobileContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const BoxInfo = styled.div`
  font-weight: 500;
  font-size: 14px;
  padding-right: 20px;
  color: rgb(34, 51, 103);
  p {
    white-space: pre-wrap;
    word-break: break-all;
    font-weight: 400;
    line-height:16px;
    font-size:14px;
  }
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;
export const BoxinfoDetail = styled.div`
  font-weight: 300;
  font-size: 14px;

  color: #223367;
  padding: 5px 0px;
`;
interface MProps {
  isAvatar?: boolean;
}

export const WrapMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ isAvatar }: MProps) => (isAvatar ? "15px" : "0")};
`;

export const WrapIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapAvatar = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 15px;
  span {
    font-weight: 300;
    font-size: 14px;
    color: #223367;
  }
  p {
    white-space: pre-wrap;
    word-break: break-all;
    font-size: 16px;
    color: #223367;
    font-weight: 500;
  }
`;

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
  @media (max-width: ${device.mobile}) {
    padding: 20px 30px 20px 30px;
  }
`;
