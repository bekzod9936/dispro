import styled from "styled-components";
import { device } from "styles/device";

export const QrCard = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 19px 22px;
  width: 90%;
  margin: 10px 10px 10px 0px;
  border-radius: 14px;
  background: white;

  @media (max-width: ${device.mobile}) {
    margin: 0;
    width: 100%;
    margin-bottom: 16px;
    padding: 15px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    margin: 0;
    width: 100%;
    margin-bottom: 16px;
    padding: 15px;
  }
`;

export const QrRow = styled.div`
  display: flex;
  margin: 10px 10px 10px 0px;
  justify-content: space-between;
  width: 100%;

  @media (max-width: ${device.mobile}) {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }
`;

export const QrImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const QeaderHeaderRow = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const QrContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 15px;

  @media (max-width: ${device.mobile}) {
    margin-left: 0;
    align-items: center;
    margin-top: 20px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    margin-left: 0;
    align-items: center;
    margin-top: 20px;
  }
`;

export const OptionDiv = styled.div`
  width: 100%;
`;

//modal
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 40px 25px 40px;
  width: 520px;
`;

interface IRow {
  jContent: "space-between" | "center" | "space-around";
}

export const ModalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ jContent = "space-between" }: IRow) => jContent};
  align-items: flex-start;
`;

export const ModalTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: #223367;
`;

export const ModalText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #223367;
`;

interface IBreak {
  height?: number;
}

export const Break = styled.div`
  height: ${({ height = 25 }: IBreak) => height + "px"};
`;
