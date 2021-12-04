import styled from "styled-components";
import { ReactComponent as Up } from "assets/icons/up.svg";
import { device } from "styles/device"
interface Props {
  up?: boolean;
  active?: boolean;
}
interface ITRow {
  background?: boolean | number;
  checked?: boolean;
}
export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  overflow-x: auto;
  width: 100%;
  &:hover {
    ::-webkit-scrollbar-thumb {
      background: #606eea;
    }
  }
  ::-webkit-scrollbar {
    height: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 0 0 14px 14px;
  }
`;

export const MTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: auto;
  white-space: nowrap;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`;

interface Props {
  header2?: boolean;
}

export const Thead = styled.thead`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px 14px 0 0;
  & > tr:last-child {
    border-top: ${({ header2 }: Props) =>
      header2 ? "1px solid rgba(96, 110, 234, 0.3)" : null};
    & > th:first-child {
      border-right: ${({ header2 }: Props) =>
        header2 ? "1px solid rgba(96, 110, 234, 0.3)" : null};
    }
  }
  & > tr {
    height: 65px;
  }
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: left;
  padding: 0 40px;
  font-weight: normal;
  font-size: 16px;
  color: ${({ active }: Props) => (active ? "#223367" : "#a5a5a5")}!important;
  border-radius: 14px 14px 0 0;
  :hover {
    color: ${({ active }: Props) => (active ? null : "#3492FF")}!important;
    & > svg {
      & > path {
        fill: ${({ active }: Props) =>
          active ? "#223367" : "#8f8f8f"}!important;
      }
    }
  }
`;

export const Tbody = styled.tbody`
  & > tr:nth-child(odd) {
    background-color: rgba(96, 110, 234, 0.1);
  }

  & > tr:nth-child(even) {
    background-color: white;
  }
  background-color: white;
  & > tr {
    height: 60px;
  }
`;

export const Td = styled.td`
  padding: 15px;
  padding-left: 40px;
  text-align: left;
  
  font-weight: normal;
  font-size: 16px;
  color: #223367;
`;

export const UpIcon = styled(Up)`
  transform: ${({ up }: Props) => (up ? "rotate(-180deg)" : "rotate(0)")};
  margin-left: 5px;
  & > path {
    fill: ${({ active }: Props) => (active ? "#223367" : "transparent")};
  }
`;

export const Description = styled.div`
  display: flex;
  position: relative;
  justify-content:space-between;
  align-items: center;
  margin-right:10px;
  
  p {
    min-width:250px !important;
     max-width:300px !important;
     white-space: pre-wrap !important;
     word-break: break-all !important;
    font-size: 14px;
    line-height:'21px';
    color:'#223367';
    font-weight:300;

  }
  
  h4 {

    padding: 10px 20px;
    font-size: 14px;
    background: linear-gradient(215.2deg, #8bdd59 -12.1%, #dcf089 101.51%);
    border-radius: 14px;
  }
  h3 {  
 
    padding: 10px 20px;
    /* margin-right:20px; */
    font-size: 14px;
    background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
    border-radius: 14px;
  }
  `

  export const GenderStyle=styled.div`
  
    line-height:21px;
    color:'#223367';
    font-size: 14px;
    font-weight:300;
  
  `
export const TimeData = styled.div`
display: flex;
position: relative;
justify-content:space-between;
align-items: center;
margin-right:10px;
p {
  font-size: 14px;
  line-height:'21px';
  color:'#223367';
  font-weight:300;
}

h4 {

  padding: 10px 20px;
  font-size: 14px;
  background: linear-gradient(215.2deg, #8bdd59 -12.1%, #dcf089 101.51%);
  border-radius: 14px;
}
h6{
  color:'#223367';
  font-weight:300;
  font-size: 14px;
  padding-right:2px;
}
h3 {  

  padding: 10px 20px;
  /* margin-right:20px; */
  font-size: 14px;
  background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
  border-radius: 14px;
}
 span {

    font-weight:300;
}
`


export const Text = styled.p`

font-size: 14px;
color: #223367;
max-width: 300px;
display: inline;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;

`;

export const TitleCard = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #223367;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;


export const TitleData = styled.div`
  display: flex;
  align-items: center;
  
  img {
    object-fit: cover;
    border-radius: 14px !important;
    width: 40px ;
    height: 40px ;
    margin-right: 15px;
  }
  
`;

export const TRow = styled.tr`
  border: none;
  transition: 100ms all;
  cursor: pointer;
  background-color: ${({ checked }: ITRow) =>
    checked ? "rgba(96, 110, 234, 0.3) !important" : "transparent"};
`;
export const DefaultImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: linear-gradient(215.2deg, #c7eeff -12.1%, #fca9ea 101.51%);
  margin-right: 15px;
`;


export const TooltipGetAll=styled.div`
padding:'10px 0px';
line-height:'21px';
color:'#223367';
font-size: '18px';
font-weight:300;
`;


export const TooltipGet=styled.div`
line-height:'21px';
color:'#223367';
font-size: '18px';
font-weight:300;
`;
export const TooltipMale=styled.div`

  color:'red' !important;
font-weight:300;


`;
export const TooltipFemale=styled.div`


color:'red' !important;
font-weight:300;

`