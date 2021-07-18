import styled from "styled-components";
import { IFlex, IGridContainer, IGridItem } from "../services/Types/Style";

export const Flex = styled.div<IFlex>`
display: flex;
position: relative;
flex-grow : ${(props: IFlex) => props.flexGrow ? props.flexGrow : 0};
justify-content: ${(props: IFlex) => props.justifyContent ? props.justifyContent : "space-between"};
align-items: ${(props: IFlex) => props.alignItems ? props.alignItems : "center"};
width: ${(props: IFlex) => props.width ? props.width : "auto"};
height: ${(props: IFlex) => props.height ? props.height : "auto"};
flex-direction: ${(props: IFlex) => props.flexDirection ? props.flexDirection : "row"};
max-height: ${(props: IFlex) => props.height || "auto"};
margin :  ${(props: IFlex) => props.margin || "auto"};
padding:  ${(props: IFlex) => props.padding || "0px"};
box-sizing: border-box;
background-color: ${(props: IFlex) => props.background || "transparent"} ;

/* overflow-y: hidden; */
`
export const GridContainer = styled.div<IGridContainer>`
display: grid;
grid-template-columns: ${(props: IGridContainer) => props.gridTemplateColumns || "1fr"};
grid-template-rows: ${(props: IGridContainer) => props.gridTemplateRows || "1fr"};
width: ${(props: IGridContainer) => props.width || "auto"};
height: ${(props: IGridContainer) => props.height || "auto"};
justify-content: ${(props: IGridContainer) => props.justifyContent || "start"};
align-content: ${(props: IGridContainer) => props.alignContent || "start"};
grid-gap: ${(props: IGridContainer) => props.gridGap || "0px 0px"};
grid-column-gap:${(props: IGridContainer) => props.gridColumnGap || "0px"} ;
grid-Row-gap:${(props: IGridContainer) => props.gridRowGap || "0px"} ;
`

export const GridItem = styled.div<IGridItem>`
grid-column: ${(props: IGridItem) => props.gridCoulumn || "1/1"};
grid-row: ${(props: IGridItem) => props.gridRow || "1/1"};
grid-area: ${(props: IGridItem) => props.gridArea || "auto"};
background-color: ${(props: IGridItem) => props.background || "auto"};
`

export const WrapperOnActiveSection = styled.div`
box-shadow: 3px 2px 3px rgba(96, 110, 234, 0.46);
background: #606EEA ; 
border-radius: 14px;
color: #FFFFFF;
padding: 0 14px;
width: auto;
height: 45px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
/* &:hover{
    background: rgba(96, 110, 234, 0.1);
    box-shadow: none;
} */
`
export const SectionItem = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 0 14px;
&:hover {
border-radius: 14px;
cursor: pointer;
color: #000000;

width: auto;
height: 45px;
background: rgba(96, 110, 234, 0.1);
box-shadow: none;
}
`