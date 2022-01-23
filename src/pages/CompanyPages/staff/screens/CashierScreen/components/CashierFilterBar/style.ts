import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Delete } from "assets/icons/IconsInfo/delete.svg";
import { ReactComponent as Search } from 'assets/icons/SideBar/search.svg';

export interface ICashierRow {
  justifyContent?: "space-between" | "center";
}

export interface IBreakH {
  width?: number;
  height?: number;
}

interface NProps {
	fontSize?: number;
	mobile?: boolean;
  }

export const BarContainer = styled.div`
  height: 100%;
  position: relative;
  box-shadow: -5px 2px 20px rgba(0, 0, 0, 0.06);
`;

export const CashierCard = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const CashierRow = styled.div`
	margin-top: auto;
	margin-bottom: 10%;
  display: flex;
  flex-direction: column;
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

export const FilterTitle = styled.h2`
	font-family: Roboto;
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 21px;
	margin: 0;
	
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

export const SearchIcon = styled(Search)`
  @media (max-width: ${device.laptop}) {
    width: 24px;
    height: 24px;
  }
  @media (min-width: ${device.mobile}) {
    display: ${({ mobile }: NProps) => mobile && 'none'};
  }
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
    & > path {
      fill: ${({ mobile }: NProps) => mobile && '#A5A5A5'};
    }
  }
`;

export const FilterInputWrap = styled.div`
	background: rgba(96, 110, 234, 0.1);
	border-radius: 0px;
	padding-top: 18%;
	padding-bottom: 8%;
	padding-left: 5%;
	padding-right: 5%;
	
`;
export const HeaderWrap = styled.div`
	display: flex;
	align-items: center;
  	justify-content: space-between;
	  margin-bottom: 21px;
`;

export  interface Props {
	title?: string;
	list?: { value?: string | number; label?: string | number | any | HTMLElement }[];
	onChange?: (e: any) => void;
	value?: any;
	required?: boolean;
	name?: string;
	id?: string;
	icon?: any;
	disableRipple?: boolean;
	disabled?: boolean;
	checkedIcon?: any;
	checked?: boolean;
	defaultValue?: string | number;
	labelPlacement?: "bottom" | "end" | "start" | "top";
	flexDirection: "row" | "column";
	marginlabel?: string;
  }

  export interface RProps {
	flexDirection: "row" | "column";
  }

export const FilterList = styled.div`
	padding: 10% 5% 0 5%;	
	  span.MuiRadio-colorSecondary.Mui-checked {
		color: #3492ff !important ;
	  }
	  span.MuiRadio-colorSecondary {
		color: #a5a5a5 !important ;
	  }
	  legend.MuiFormLabel-root {
		color: #c7c7c7 !important ;
		font-weight: bold !important ;
		font-size: 14px !important ;
	  }
	  span.MuiTypography-body1 {
		font-family: Roboto;
font-style: normal;
font-weight: 300!important;
font-size: 14px!important ;
line-height: 16px;
		color: #223367 !important ;
		text-transform: capitalize;
	  }
	  .MuiFormControl-root {
		display: flex !important ;
		
	  @media (min-width: ${device.laptop}) {
		legend.MuiFormLabel-root {
			font-family: Roboto;
			font-style: normal;
			font-weight: 300!important;
			font-size: 14px!important ;
			line-height: 16px;
		}
		span.MuiTypography-body1 {
			font-family: Roboto;
			font-style: normal;
			font-weight: 300!important;
			font-size: 14px!important ;
			line-height: 16px;
		}
	  }
	  @media (max-width: ${device.planshet}) {
		legend.MuiFormLabel-root {
			font-family: Roboto;
			font-style: normal;
			font-weight: 300!important;
			font-size: 14px!important ;
			line-height: 16px;
		}
		span.MuiTypography-body1 {
			font-family: Roboto;
			font-style: normal;
			font-weight: 300!important;
			font-size: 14px!important ;
			line-height: 16px;
		}
	  }
	`;
	