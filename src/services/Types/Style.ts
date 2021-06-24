export interface IText {
	lineHeight?: string;
	fontSize?: string;
	fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
	color?: string;
	marginLeft?: string;
	marginRight?: string;
}

export interface IFlex {
	justifyContent?:
		| "space-between"
		| "space-around"
		| "space-evenly"
		| "start"
		| "center";
	alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
	width?: string;
	height?: string;
	margin?: string;
	flexDirection?: "column" | "row";
	flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
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
