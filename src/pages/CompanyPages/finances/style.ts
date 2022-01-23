import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Deposit } from "assets/icons/SideBar/deposit.svg";
import { ReactComponent as Shield } from "assets/icons/SideBar/shield.svg";

interface Props {
  open?: boolean;
  marginTop?: string;
}

export const DepositIcon = styled(Deposit)`
  width: 24px;
  height: 24px;
  & path {
    fill: #606eea;
  }
`;

export const ShieldIcon = styled(Shield)`
  width: 24px;
  height: 24px;
  & path {
    fill: #606eea;
  }
`;

export const MainLimit = styled.div`
  display: none;
  @media (max-width: ${device.mobile}) {
    display: flex;
    flex: 1;
    width: 100%;
    grid-gap: 10px;
    padding-right: 15px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const TitleLimit = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: #223367;
  margin-left: 10px;
`;

export const TextLimit = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #606eea;
  white-space: nowrap;
`;

export const WrapLimit = styled.div`
  width: 50%;
  display: flex;
  flex: 1;
  background-color: #e3e7f5;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  height: 60px;
  max-height: 60px;
  min-width: fit-content;
`;

export const MainWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  flex: 1;
  padding: 25px 0 0 25px;
  @media (max-width: ${device.mobile}) {
    padding: 15px 0 0 15px;
  }
`;

export const Wrap = styled.div`
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
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
`;

export const WrapTotalSum = styled.div`
  @media (max-width: ${device.planshet}) {
    width: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    margin-right: 50px;
  }
`;

export const TotalSum = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  font-weight: bold;
  font-size: 22px;
  color: #606eea;
  width: fit-content;
  height: 45px;
  margin: 7px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 200px;
  padding-left: 20px;
  @media (min-width: ${device.laptop}) {
    height: 50px;
    font-size: 28px;
  }
  @media (max-width: ${device.planshet}) {
    background: transparent;
    box-shadow: none;
    border-radius: 0;
    margin: 0;
    padding-left: 0;
    height: fit-content;
    font-size: 16px;
    width: fit-content;
    min-width: unset;
  }
`;

export const Label = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
  @media (max-width: ${device.planshet}) {
    font-weight: 500;
    color: #223367;
    width: fit-content;
  }
`;

export const WrapTotal = styled.div`
  margin-top: 15px;
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    display: flex;
    width: fit-content;
    margin-top: ${({ marginTop }: Props) => (marginTop ? marginTop : "15px")};
  }
  @media (max-width: ${device.mobile}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    align-items: center;
    width: 100%;
  }
`;

export const WrapHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const RightHeader = styled.div`
  position: absolute;
  right: 25px;
  top: -20px;
  @media (max-width: ${device.planshet}) {
    display: none;
  }
`;

export const LeftHeader = styled.div`
  overflow: hidden;
`;

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  @media (max-width: ${device.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

export const Info = styled.div`
  color: #223367;
  font-size: 18px;
  span {
    font-weight: 900;
    margin: 0px 5px;
    font-size: 18px;
  }
  @media (max-width: ${device.mobile}) {
    margin-bottom: 15px;
    font-size: 16px;
    span {
      font-size: 16px;
    }
  }
`;

export const WrapSum = styled.div`
  @media (max-width: ${device.planshet}) {
    margin-left: 10px;
    white-space: nowrap;
  }
`;

export const WrapDef = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Img = styled.img`
  min-width: 90px;
  max-width: 120px;
  min-height: 180px;
  max-height: 250px;
  width: 8%;
  height: 12%;
  margin: 5% 0 2% 0;
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    min-width: 140px;
    max-width: 160px;
    min-height: 300px;
    max-height: 340px;
    width: 20%;
    height: 50%;
    margin: 15% 0 2% 0;
  }
  @media (max-width: ${device.mobile}) {
    margin: 10% 0 5% 0;
  }
`;

export const TitleDef = styled.div`
  color: #223367;
  font-weight: normal;
  font-size: 18px;
  @media (max-width: ${device.mobile}) {
    font-size: 15px;
    display: flex;
    width: 50%;
    word-wrap: break-word;
    text-align: center;
  }
`;

export const SideDrawer = styled.div`
  position: fixed;
  top: 65px;
  right: 0;
  bottom: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  max-width: 370px;
  width: 100%;
  height: calc(100% - 65px);
  background-color: #ffffff;
  z-index: 20;
  transition: 500ms all;
  box-shadow: -5px 2px 20px rgba(0, 0, 0, 0.06);
  transform: ${({ open }: Props) =>
    open ? "translateX(0)" : "translateX(100%)"};
  padding: 15px 0 40px;
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    max-width: 300px;
  }
  @media (min-width: ${device.laptop}) {
    top: 90px;
    height: calc(100% - 90px);
  }
`;
