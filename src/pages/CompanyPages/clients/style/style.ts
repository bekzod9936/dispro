import styled from 'styled-components';
import { device } from 'styles/device';
import { IButtonWrapper } from './types';
interface IProps {
  isRelative: boolean
}
export const Container = styled.div`
  @media (max-width: ${device.mobile}) {
    overflow-y: auto;
    overflow-x: hidden; 
  }
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`;
export const MainWrapper = styled.div`
  padding: 25px 0 25px 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
  position: ${({ isRelative }: IProps) => isRelative ? "relative" : "static"};
  flex-grow: 1;
  @media (max-width: ${device.planshet}) {
    padding: 20px 0 20px 20px;
  }
  @media (max-width: ${device.mobile}) {
    padding: 15px 0 15px 15px;
  }
`;
export const SpinnerWrapper = styled.div`
  min-height: 100px;
`
export const Wrap = styled.div`
  padding-right: 25px;
  overflow-y: auto;
  @media (max-width: ${device.mobile}) {
    overflow: visible;
  }
  @media (max-width: ${device.mobile}) {
    padding-right: 15px;
    &::-webkit-scrollbar {
      width: 4px !important;
  }
  }
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`;
export const SubTitle = styled.span`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #8F8F8F;
  align-self: center;
  line-height: 2;
`

export const Flex = styled.div`
  display: flex;
  margin-bottom: 20px;
`

export const ButtonsWrapper = styled.div`
  max-width: 750px;
  width: 100%;
  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  margin-bottom: ${(props: IButtonWrapper) => props.marginBottom + "px" || "0"};
  margin-top: ${(props: IButtonWrapper) => props.marginTop + "px" || "0"};
  @media (max-width: ${device.planshet}) {
    margin: 0;
  }
  @media(max-width: ${device.mobile}) {
    margin: 13px 0;
  }
`



export const FiltersWrapper = styled.div`
  display: flex;
  max-width: 700px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
