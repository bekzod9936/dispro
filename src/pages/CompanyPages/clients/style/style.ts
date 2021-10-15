import styled from 'styled-components';
import { IButtonWrapper } from './types';

export const Container = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const MainWrapper = styled.div`
  padding: 25px 0 25px 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
`;
export const Wrap = styled.div`
  overflow-y: auto;
  padding-right: 25px;
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
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props: IButtonWrapper) => props.marginBottom + "px" || "0"};
  margin-top: ${(props: IButtonWrapper) => props.marginTop + "px" || "0"};
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
