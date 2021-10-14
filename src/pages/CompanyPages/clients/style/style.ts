import styled from 'styled-components';
import { IButtonWrapper } from './types';

export const Container = styled.div`
  padding: 25px 25px 40px 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: auto;
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
