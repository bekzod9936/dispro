import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Delete } from "assets/icons/IconsInfo/delete.svg";
export interface ICashierRow {
  justifyContent?: "space-between" | "center";
}

export interface IBreakH {
  width?: number;
  height?: number;
}

export const BarContainer = styled.div`
  height: 100%;
  position: relative;
`;

export const CashierCard = styled.div`
  padding-top: 15%;
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const CashierRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent = "space-between" }: ICashierRow) =>
    justifyContent};
  align-items: center;
`;

export const CashierCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ImgDiv = styled.div`
  height: 40px;
  width: 40px;
  overflow: hidden;
`;

export const Img = styled(LazyLoadImage)`
  object-fit: contain;
`;

export const BarTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  color: #223367;
`;

export const BarText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  color: #223367;
`;

export const BarSecondText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  color: #223367;
`;

export const BarNormalText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  color: #223367;
`;

export const CountText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 33px;
  /* identical to box height */

  color: #606eea;
`;

export const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 24px;
  /* identical to box height */

  color: #223367;
`;

export const Break = styled.div`
  height: ${({ height = 50 }: IBreakH) => height + "px"};
`;

export const BreakH = styled.div`
  width: ${({ width }: IBreakH) => width + "px"};
`;

export const UpSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 6;
`;

export const DownSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 1;
`;

interface ButtonProps {
	mobile?: boolean;
	color?: string;
  }
  
export const DeleteIc = styled(Delete)`
  & > path {
    fill: ${({ color }: ButtonProps) => (color ? color : null)};
  }
`;

export const ButtonKeyWord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c4c4c4;
  border-radius: 46px;
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  padding: 0 5px 0 15px;
  margin: 10px 10px 0 0;
  height: 35px;
  .MuiIconButton-root {
    padding: 6px !important;
    margin-left: 5px;
  }
  @media (max-width: ${device.mobile}) {
    height: 25px;
    font-weight: 300;
    font-size: 12px;
    color: #223367;
  }
`;