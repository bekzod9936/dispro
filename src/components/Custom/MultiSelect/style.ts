import styled from "styled-components";
import { Props } from "./index";
import Select from "react-select";
import { InputLabel } from "@material-ui/core";
import { device } from "../../../styles/device";
import { ReactComponent as Down } from "../../../assets/icons/IconsInfo/arrowdown.svg";

export const Container = styled.div`
  width: ${({ width }: Props) =>
    width?.width ? width?.width : "100%"} !important;
  min-width: ${({ width }: Props) => `${width?.minwidth}px`} !important;
  max-width: ${({ width }: Props) => `${width?.maxwidth}px`} !important;
  margin: ${({ margin }: Props) => margin?.laptop} !important;
  @media (max-width: ${device.mobile}) {
    margin: ${({ margin }: Props) => margin?.mobile} !important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    margin: ${({ margin }: Props) => margin?.planshet} !important;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    margin: ${({ margin }: Props) => margin?.laptop} !important;
  }
  @media (min-width: ${device.laptop}) {
    margin: ${({ margin }: Props) => margin?.desktop} !important;
  }
  position: relative;
`;

export const NewSelect = styled(Select)`
  /* .css-26l3qy-menu{

  } */

  /* .css-4ljt47-MenuList {
    z-index: 999999999999 !important;

    .css-cgjitr-option {
      z-index: 99999999999 !important;
    }
  } */
  .css-1ss0qri-control {
    background-color: ${({ selectStyle }: Props) =>
      selectStyle?.bgcolor ? selectStyle?.bgcolor : "white"} !important;
  }
  .css-xb97g8:hover {
    background-color: #ddd !important;
  }
  .css-xb97g8 {
    background-color: ${({ selectStyle }: Props) =>
      selectStyle?.deleteBgColor
        ? selectStyle?.deleteBgColor
        : "transparent"} !important;
  }
  .css-1okebmr-indicatorSeparator {
    width: 0 !important;
  }

  .css-1pahdxg-control {
    border: none !important;
  }
  .css-1rhbuit-multiValue {
    background-color: ${({ selectStyle }: Props) =>
      selectStyle?.valuebgcolor
        ? selectStyle?.valuebgcolor
        : "transparent"} !important;
  }
  .css-1wa3eu0-placeholder {
    color: ${({ selectStyle }: Props) =>
      selectStyle?.placeholdercolor
        ? selectStyle?.placeholdercolor
        : "#AAAAAA"} !important;
  }

  [class$="ValueContainer"],
  [class$="-control"] {
    min-height: ${({ selectStyle }: Props) =>
      selectStyle?.height?.laptop
        ? `${selectStyle?.height?.laptop}px`
        : "50px"} !important;
    @media (max-width: ${device.mobile}) {
      min-height: ${({ selectStyle }: Props) =>
        selectStyle?.height?.mobile
          ? `${selectStyle?.height?.mobile}px`
          : "45px"} !important;
    }
    @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
      min-height: ${({ selectStyle }: Props) =>
        selectStyle?.height?.planshet
          ? `${selectStyle?.height?.planshet}px`
          : "45px"} !important;
    }
    @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
      min-height: ${({ selectStyle }: Props) =>
        selectStyle?.height?.laptop
          ? `${selectStyle?.height?.laptop}px`
          : "50px"} !important;
    }
    @media (min-width: ${device.laptop}) {
      min-height: ${({ selectStyle }: Props) =>
        selectStyle?.height?.desktop
          ? `${selectStyle?.height?.desktop}px`
          : "60px"} !important;
    }
  }

  .css-1uccc91-singleValue,
  .css-12jo7m5 {
    color: ${({ selectStyle }: Props) =>
      selectStyle?.color ? selectStyle?.color : "#223367"}!important;
    font-size: ${({ selectStyle }: Props) =>
      selectStyle?.fontSize?.laptop
        ? `${selectStyle?.fontSize?.laptop}px`
        : "16px"} !important;
    font-weight: ${({ selectStyle }: Props) =>
      selectStyle?.weight ? selectStyle?.weight : "500"} !important;
    @media (max-width: ${device.mobile}) {
      font-size: ${({ selectStyle }: Props) =>
        selectStyle?.fontSize?.mobile
          ? `${selectStyle?.fontSize?.mobile}px`
          : "14px"} !important;
    }
    @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
      font-size: ${({ selectStyle }: Props) =>
        selectStyle?.fontSize?.planshet
          ? `${selectStyle?.fontSize?.planshet}px`
          : "14px"} !important;
    }
    @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
      font-size: ${({ selectStyle }: Props) =>
        selectStyle?.fontSize?.laptop
          ? `${selectStyle?.fontSize?.laptop}px`
          : "15px"} !important;
    }
    @media (min-width: ${device.laptop}) {
      font-size: ${({ selectStyle }: Props) =>
        selectStyle?.fontSize?.desktop
          ? `${selectStyle?.fontSize?.desktop}px`
          : "16px"} !important;
    }
  }
  [class$="-indicatorContainer"] {
    padding: 0 !important;
  }
  .css-g1d714-ValueContainer {
    padding: ${({ selectStyle }: Props) =>
      selectStyle?.inpadding ? selectStyle?.inpadding : "2px 20px"}!important;
  }
  .css-xb97g8 {
    & > svg {
      & > path {
        fill: ${({ selectStyle }: Props) =>
          selectStyle?.deleteColor
            ? selectStyle?.deleteColor
            : "#3492ff"} !important;
      }
    }
  }
`;

export const DownIcon = styled(Down)`
  margin-right: ${({ iconmargin }: Props) =>
    iconmargin ? iconmargin : "15px"};
`;

export const Label = styled(InputLabel)`
  width: fit-content;
  user-select: none;

  color: ${({ labelStyle }: Props) =>
    labelStyle?.color ? labelStyle?.color : "#C7C7C7"} !important;
  font-weight: ${({ labelStyle }: Props) =>
    labelStyle?.weight ? labelStyle?.weight : "bold"} !important;
  font-size: ${({ labelStyle }: Props) =>
    labelStyle?.fontSize?.laptop
      ? `${labelStyle?.fontSize?.laptop}px`
      : "15px"} !important;
  margin-bottom: ${({ lmargin }: Props) =>
    lmargin?.laptop ? `${lmargin?.laptop}px` : "7px"}!important;
  @media (max-width: ${device.mobile}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.mobile
        ? `${labelStyle?.fontSize?.mobile}px`
        : "14px"} !important;
    margin-bottom: ${({ lmargin }: Props) =>
      lmargin?.mobile ? `${lmargin?.mobile}px` : "5px"}!important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.planshet
        ? `${labelStyle?.fontSize?.planshet}px`
        : "14px"} !important;
    margin-bottom: ${({ lmargin }: Props) =>
      lmargin?.planshet ? `${lmargin?.planshet}px` : "6px"}!important;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.laptop
        ? `${labelStyle?.fontSize?.laptop}px`
        : "15px"} !important;
    margin-bottom: ${({ lmargin }: Props) =>
      lmargin?.laptop ? `${lmargin?.laptop}px` : "7px"}!important;
  }
  @media (min-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.desktop
        ? `${labelStyle?.fontSize?.desktop}px`
        : "16px"} !important;
    margin-bottom: ${({ lmargin }: Props) =>
      lmargin?.desktop ? `${lmargin?.desktop}px` : "10px"}!important;
  }
`;

export const Message = styled.div`
  position: absolute;
  top: 100%;
  font-weight: 300;
  color: #ff5e68;
  overflow-wrap: normal;
  display: flex;
  margin-top: 5px;

  font-size: ${({ labelStyle }: Props) =>
    labelStyle?.fontSize?.laptop
      ? `${labelStyle?.fontSize?.laptop}px`
      : "16px"} !important;

  @media (max-width: ${device.mobile}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.mobile
        ? `${labelStyle?.fontSize?.mobile}px`
        : "16px"} !important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.planshet
        ? `${labelStyle?.fontSize?.planshet}px`
        : "16px"} !important;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.laptop
        ? `${labelStyle?.fontSize?.laptop}px`
        : "16px"} !important;
    flex-direction: column;
  }
  @media (min-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.desktop
        ? `${labelStyle?.fontSize?.desktop}px`
        : "16px"} !important;
  }
`;
