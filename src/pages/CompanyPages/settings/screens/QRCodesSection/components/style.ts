import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as SaveIc } from "assets/icons/save_ic.svg";
import { ReactComponent as RightArrowIc } from "assets/icons/right_arrow_ic.svg";
import { ReactComponent as ScrapperIc } from "assets/icons/scrapper_ic.svg";

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

  @media (max-width: ${device.mobile}) {
    width: 90%;
    padding: 20px 15px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    width: 420px;
    padding: 20px 15px;
  }
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

  @media (max-width: ${device.mobile}) {
    font-size: 16px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: 16px;
  }
`;

export const ActMaxDiv = styled.div`
  max-width: 380px;
`;

export const ModalText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #223367;
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: 14px;
  }
`;

interface IBreak {
  height?: number;
  mHeight?: number;
}

export const Break = styled.div`
  height: ${({ height = 25 }: IBreak) => height + "px"};

  @media (max-width: ${device.mobile}) {
    height: ${({ mHeight = 20 }: IBreak) => mHeight + "px"};
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    height: ${({ mHeight = 20 }: IBreak) => mHeight + "px"};
  }
`;

export const MContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 40px 25px 40px;
  width: 520px;

  @media (max-width: ${device.mobile}) {
    width: 100%;
    padding: 20px 15px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    width: 100px;
    padding: 20px 15px;
  }
`;

export const ModalCText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #223367;
  @media (max-width: ${device.planshet}) {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
  }
`;

export const DownloadDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
`;

//icons
export const SaveIcon = styled(SaveIc)`
  width: 23px;
  height: 25px;
  @media (max-width: ${device.planshet}) {
    width: 15px;
    height: 18px;
  }
`;

export const RightArrIcon = styled(RightArrowIc)`
  width: 23px;
  height: 25px;
  @media (max-width: ${device.planshet}) {
    width: 15px;
    height: 18px;
  }
`;

export const ScrapperIcon = styled(ScrapperIc)`
  width: 23px;
  height: 25px;
  @media (max-width: ${device.planshet}) {
    width: 15px;
    height: 18px;
  }
`;
