
import { Drawer, Menu, NativeSelect, Select } from "@material-ui/core"
import { type } from "os"
import styled from "styled-components"
import { IDropdownTitle, ISidebarMenuItem, IText } from "../services/Types/Style"



export const CustomDrawer = styled.div`
//width: 272px;
display: flex;
flex-direction: column;
height: 100vh;
height: 100vh;
box-sizing: border-box;
//overflow-y: auto;

/* padding-left: 20px; */
padding-top: 25px;
padding-bottom: 25px;
justify-content: space-between;
box-shadow: 5px 0 20px 0 rgba(0,0,0,0.06);
position: relative;
`
export const CustomMenu = styled.div`
//width: 272px;
display: flex;
flex-direction: column;
justify-content: space-between;

`
export const SideBarMenuItem = styled.div<ISidebarMenuItem>`
width: 100%;
box-sizing: border-box;
padding-left:${(props: ISidebarMenuItem) => (props?.text === "Dis - count" ? "15px" : "25px")}; 
height: 49px;
display: flex;
justify-content: flex-start;
align-items: center;
&:hover{
    background-color: rgba(96, 110, 234, 0.1);
}

`

export const Text = styled.span<IText>`
font-size:${(props: IText) => (props.fontSize ? props.fontSize : "16px")};
font-family: "Roboto";
margin-right:${(props: IText) => (props.marginRight ? props.marginRight : "23px")};
color: ${(props: IText) => (props.color || "#223367")};
//position: relative;
margin-left:${(props: IText) => (props.marginLeft ? props.marginLeft : "23px")};
font-weight: ${(props: IText) => (props.fontWeight ? props.fontWeight : 700)};
`
export const Header = styled.div`
display:  flex;
width: 100%;
justify-content: space-between;
flex-wrap: wrap;
align-items: center;
padding : 0 25px;
float: left;
position: relative;
height: 80px;
box-sizing: border-box;
`
export const CustomSearchInput = styled.input`

outline: none;
border : none;
height: 54px;
box-sizing: border-box;
width: 100%;
border-radius: 35px;
font-size: 16px;
background: "#AAAAAA";
padding-left: 25px;
padding-right: 25px;
&::placeholder{
 color: "#888888";
}
`
export const CustomSelect = styled(Select)`
    width: 100%;

    .MuiSelect-root{
        margin-left: 15px;
        width: 100%;
    }
	.MuiSelect-select{
        width: 100%;
        height: 50px; 
        outline: none;
        border: 1px solid #F0F0F0;
        border-radius: 41px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    .MuiSelect-icon {
        
        margin-right: 10px;
    }
    

`
export const DropDownTitle = styled.div`
height: 45px;
padding: 10px 15px;
background: ${(props: IDropdownTitle) => props.index % 2 !== 0 ? "#F0F1FD" : "white"};
font-size: 14px;
font-weight: 400;
font-family: "Roboto";
color: rgb(34, 51, 103);
width: 400px;
box-sizing: border-box;
z-index : 90;

`
export const UnderSectionButton = styled.div`
padding: 15px 20px;
border-radius: 12px;
background: white;
display: flex;
justify-content: space-around;
align-items: center;
margin-bottom: 20px;
margin-right: 20px;
height: 62px;
box-sizing: border-box;
`
export const SectionWrapper = styled.div`
position: relative;
height: 100%;
overflow-y: scroll;
overflow-x: hidden;
&::-webkit-scrollbar {
    -webkit-appearance : none;
    display:none;
}

`
// export const CustomDatePicker = styled(DatePicker)`

// `
export const CustomInput = styled.input`
padding: 12px 15px;
width: 90%;
align-self: center;
border-radius: 12px;
border: 1px solid #C2C2C2;
box-sizing: border-box;
outline: none;
margin-top: 10px;
margin-bottom: 10px;
font-size: 13px;
 
`
export const UnderFilter = styled.div`
height: 80px;
padding: 20px 15px;
width: 400px;
background-color: white;
display: flex;
justify-content: space-between;
align-items: center;
box-sizing: border-box;

`
export const CustomButton = styled.button`
display: flex;
border: none;
justify-content: center;
align-items: center;
padding: 10px 15px;
box-sizing: border-box;
background-color: #606EEA;
border-radius: 12px;
`
export const InlineFilterWrapper = styled.div`
border: 1px solid grey;
border-radius: 18px;
/* position: absolute; */
display: flex;
align-items: center;
justify-content: center;
height: 25px;
padding-right: 4px;
`
export const PageWrapper = styled.div`
padding: 20px 0px 0px 30px; 
overflow: auto;
height: 100%;
width: 100%;

`