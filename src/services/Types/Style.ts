export interface IText {
  lineHeight?: string;
  fontSize?: string;
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  color?: string;
  marginLeft?: string;
  marginRight?: string;
  marginBottom?: string;
  fontFamily?: string;
}

export interface IFlex {
  maxWidth?: string;
  justifyContent?:
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "start"
    | "center"
    | "stretch"
    | "end"
    | "flex-start";
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  flexGrow?: string;
  width?: string;
  height?: string;
  margin?: string;
  flexDirection?: "column" | "row" | "row-reverse" | "column-reverse";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  padding?: string;
  background?: string;
  overflowY?: string;
}

export interface ISidebarMenuItem {
  text: string;
}
export interface IGridContainer {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  justifyContent?:
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "start"
    | "center";
  alignContent?:
    | "center"
    | "space-evenly"
    | "space-around"
    | "space-between"
    | "start"
    | "end";
  width?: string;
  height?: string;
  gridGap?: string;
  gridColumnGap?: string;
  gridRowGap?: string;
}
export interface IGridItem {
  gridCoulumn?: string;
  gridRow?: string;
  gridArea?: string;
  background?: string;
}

export interface IDropdownTitle {
  index: number;
}

export interface ICustomButton {
  background?: string;
}
export interface ICustomModal {
  padding?: string;
  position?: "relative" | "fixed" | "static" | "absolute" | "sticky";
  justifyContent?: string;
  height?: string;
}
export interface IUndersectionButton {
  margin?: string;
  zIndex?: number;
  width?: string;
}

export interface IFlexiblePanel {
  padding?: string;
  width?: string;
  height?: string;
}
export interface IMessageElement {
  chatType: any;
}

export interface ILoginPanelWrapper {
  width?: string;
}
