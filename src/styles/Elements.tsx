import { Pagination } from "@material-ui/lab";
import styled from "styled-components";
import { IMessageElement } from "../services/Types/Style";


export const Arrow = styled.div`
height: 16px;
width: 16px;
background-color: grey;
border: 1px solid black;
z-index: 150;
clip-path: polygon(50% 0, 0 58%, 100% 58%);
`
export const StyledPagination = styled(Pagination)`
.MuiPagination-ul > li{
    margin-left: 0px;
    margin-right: 0px;
    width: 46px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;

    
    border: 1px solid #C2C2C2;
}
.MuiPagination-ul > li >button {
   font-size: 18px;
   font-weight: 500;
}
.MuiPagination-ul > li:nth-child(n+3)
{

    border-width: 1px 0px;

}
.MuiPagination-ul > li:nth-child(2) {
  border-width: 1px 0 1px 1px;
   border-top-left-radius : 14px;
  border-bottom-left-radius : 14px;

}
.MuiPagination-ul >li:nth-last-child(-n+2) {
  border-width: 1px 1px 1px 0px;
  border-top-right-radius : 14px;
  border-bottom-right-radius : 14px;
}
.MuiPagination-ul >li:nth-last-child(-n+1) {
  border-width: 1px;
}
.MuiPagination-ul >li:first-child {
  margin-right: 5px;
    color: #606EEA;
    stroke: #606EEA;
border-radius: 14px;
}
.MuiPagination-ul >li:last-child {
  margin-left: 5px;
  color: #606EEA;
  stroke: #606EEA;
  border-radius: 14px;
  margin-right: 60px;
}
.MuiPagination-ul  {
    display: flex;
    width: auto;
    float: right;
    margin-top: 38px;
    align-self: end;
}
.MuiPaginationItem-page.Mui-selected  {
    border-radius: 14px;
    width: 48px;
    height: 48px;
    //overflow: hidden;
    font-weight: 900;
    background-color: #606EEA ;
         box-shadow :  0px 7px 16px rgba(0, 0, 0, 0.14);
    color: white;
    margin: 0px;
    
}

`
export const RightSideDrawer = styled.div`
position: fixed;
width: 300px;
z-index: 30;
margin-bottom: 0px;
padding-bottom: 0px;
top: 80px;
right: 0;
box-sizing: border-box;
background-color: white;
height: 100vh;
overflow: hidden;
`

export const MessageElement = styled.div`
flex-grow : 1;
padding : 15px;
background-color: ${(props: IMessageElement) => props?.chatType == 1 ? "#E5E9FF" : "#606EEA"} ;
color: white;
font-size: 14px;
font-weight: 400;
position: relative;
margin-left:30px ;
border-radius: 14px;
word-break: break-all;
width: 250px;
flex-grow: 1;
border-bottom-left-radius : 0px;
&::before {

  content: "";
  display: block;
  position: absolute;
  bottom : 0;
  width : 22px;
  height: 34px;
  left: -21px;
  background-color: ${(props: IMessageElement) => props?.chatType == 1 ? "#E5E9FF" : "#606EEA"};
 clip-path: polygon(100% 0, 0% 100%, 100% 100%);
}`


export const UnderTextArea = styled.div`
padding: 15px 25px;
display: flex;
box-sizing: border-box;
align-items: center;
justify-content: space-between;
width: 100%;
background-color: #F5F5F5;
`


