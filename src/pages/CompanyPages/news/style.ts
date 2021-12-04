import styled from 'styled-components';
import { device } from 'styles/device';
import { IFlex } from 'services/Types/Style';
import ButtonBase from '@material-ui/core/ButtonBase';

export interface IRow {
  light?: boolean;
}

export const MainWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  flex: 1;
  padding: 25px 0 0 25px;
  @media (max-width: ${device.mobile}) {
    padding: 0px 0 0 0px;
  }
  @media (min-width:${device.mobile}) and (max-width:${device.planshet}){
    padding: 0px 0 0 0px;
  }

`;

export const SpinnerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;
export const Wrap = styled.div`
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    appearance: none;
    display: none;
  }

  &::-webkit-scrollbar-track {
    appearance: none;
    display: none;
  }
`;


export const Label = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const Flex = styled.div<IFlex>`
  display: flex;
  position: relative;
  max-width: ${(props: any) => props.maxWidth || 'none'};
  flex-grow: ${(props: IFlex) => (props.flexGrow ? props.flexGrow : 0)};
  justify-content: ${(props: IFlex) =>
    props.justifyContent ? props.justifyContent : 'space-between'};
  align-items: ${(props: IFlex) =>
    props.alignItems ? props.alignItems : 'center'};
  width: ${(props: IFlex) => (props.width ? props.width : 'auto')};
  height: ${(props: IFlex) => (props.height ? props.height : 'auto')};
  flex-direction: ${(props: IFlex) =>
    props.flexDirection ? props.flexDirection : 'row'};
  max-height: ${(props: IFlex) => props.height || 'auto'};
  margin: ${(props: IFlex) => props.margin || 'auto'};
  padding: ${(props: IFlex) => props.padding || '0px'};
  box-sizing: border-box;
  background-color: ${(props: IFlex) => props.background || 'transparent'};
  overflow-y: ${(props: IFlex) => props.overflowY || 'visible'};
  flex-wrap: ${(props: IFlex) => props.flexWrap || 'nowrap'};



  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    flex-direction: flex;
    align-items: center;
  }

  &::-webkit-scrollbar {
    display: none;
    appearance: none;
  }
  /* overflow-y: hidden; */
`;

export const StaffPopover = styled.div`
  border-radius: 14px;
  background-color: white;
  width: 250px;
  padding: 10px 0;
`;

export const PopoverRow = styled(ButtonBase)`
  background: ${({ light }: IRow) =>
    light ? '#fff' : 'rgba(96, 110, 234, 0.1)'};
  padding: 15px 25px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;


export const WrapHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: ${device.mobile}) {
    padding: 5px 0 0 10px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    padding: 25px 0 0 25px;
  }
`;

export const RightHeader = styled.div`
  position: absolute;
  right: 30px;
  top: 25px;
`;
export const LeftHeader = styled.div`
overflow: hidden;`;
