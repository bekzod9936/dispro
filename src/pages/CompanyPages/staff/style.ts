import { IFlex } from "services/Types/Style";
import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";

export interface IRow {
  light?: boolean;
}

export const MainWrapper = styled.div`
  padding: 25px 0 0 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative !important;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 40px;
`;

export const Flex = styled.div<IFlex>`
  display: flex;
  position: relative;
  max-width: ${(props: any) => props.maxWidth || "none"};
  flex-grow: ${(props: IFlex) => (props.flexGrow ? props.flexGrow : 0)};
  justify-content: ${(props: IFlex) =>
    props.justifyContent ? props.justifyContent : "space-between"};
  align-items: ${(props: IFlex) =>
    props.alignItems ? props.alignItems : "center"};
  width: ${(props: IFlex) => (props.width ? props.width : "auto")};
  height: ${(props: IFlex) => (props.height ? props.height : "auto")};
  flex-direction: ${(props: IFlex) =>
    props.flexDirection ? props.flexDirection : "row"};
  max-height: ${(props: IFlex) => props.height || "auto"};
  margin: ${(props: IFlex) => props.margin || "auto"};
  padding: ${(props: IFlex) => props.padding || "0px"};
  box-sizing: border-box;
  background-color: ${(props: IFlex) => props.background || "transparent"};
  overflow-y: ${(props: IFlex) => props.overflowY || "visible"};
  flex-wrap: ${(props: IFlex) => props.flexWrap || "nowrap"};

  &::-webkit-scrollbar {
    display: none;
    appearance: none;
  }
  /* overflow-y: hidden; */
`;

export const SpinnerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StaffPopover = styled.div`
  border-radius: 14px;
  background-color: white;
  width: 250px;
  padding: 10px 0;
`;

export const PopoverRow = styled(ButtonBase)`
  background: ${({ light }: IRow) =>
    light ? "#fff" : "rgba(96, 110, 234, 0.1)"};
  padding: 15px 25px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
