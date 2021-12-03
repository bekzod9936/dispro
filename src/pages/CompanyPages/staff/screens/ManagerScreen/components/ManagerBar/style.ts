import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Delete } from "assets/icons/IconsInfo/delete.svg";

export interface ICashierRow {
  justifyContent?: "space-between" | "center" | "flex-start" | "flex-end";
}

export interface IBreakH {
  width?: number;
  height?: number;
}

export const BarContainer = styled.div`
  height: 100%;
  position: relative;
  max-width: 450px;
  box-shadow: -5px 2px 20px rgba(0, 0, 0, 0.06);
`;

export const ManagerCard = styled.div`
  padding-top: 15%;
  padding-left: 8%;
  padding-right: 8%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const ManagerCollection = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-height: 400px;
  max-width: 450px;
  overflow-y: scroll;
  margin-top: 15px;
  scroll-behavior: auto;
  padding: 0;
  width: 100%;

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
  /* justify-content: space-between; */
`;

export const ManagerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent = "space-between" }: ICashierRow) =>
    justifyContent};
  align-items: center;
  flex-wrap: nowrap;
`;

export const ManagerCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;



export const Img = styled(LazyLoadImage)`
	object-fit: cover;
	width: 62px;
	height: 62px;
	border-radius: 14px;
	
	overflow: hidden;
`;

export const BarTitle = styled.p`
  font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 21px;
  color: #223367;
  margin-bottom: 5px;
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

export const CommentText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: 1px;

  color: #c7c7c7;
`;

export const CommentContent = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  text-align: left;
  display: flex;
  align-items: center;
  word-break: break-all;
`;

export const CommentDiv = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: flex-start;
  flex: 1;
  flex-wrap: wrap;
  width: 236px;
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

interface ButtonProps {
  mobile?: boolean;
  color?: string;
}

export const DeleteIc = styled(Delete)`
  & > path {
    fill: ${({ color }: ButtonProps) => (color ? color : null)};
  }
`;

export const ImageWrap = styled.div`
 	margin-right: 20px;
`;