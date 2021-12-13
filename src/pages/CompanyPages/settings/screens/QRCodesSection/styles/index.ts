import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Down } from 'assets/icons/down.svg';

export const QRPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  width: 100%;
  position: relative;

  overflow-x: hidden;
`;

export const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  flex: 1;

  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`;

export const CreateBtn = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${device.mobile}) {
    justify-content: flex-end;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    justify-content: flex-end;
  }
`;

export const HeadInput = styled.div`
  flex: 3;
  display: flex;
  height: 100%;
  align-items: center;
  @media (max-width: ${device.mobile}) {
    flex: 1;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    flex: 1;
  }
`;

export const IconDiv = styled.div`
  padding-left: 30px;
`;

export const BtnAction = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  @media (max-width: ${device.mobile}) {
    justify-content: center;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    justify-content: center;
  }
`;

export const MyHeadAction = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  align-items: flex-start;
  height: 15%;
  grid-gap: 20px;
  @media (max-width: ${device.mobile}) {
    flex-direction: row-reverse;
    width: 100%;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    flex-direction: row-reverse;
    width: 100%;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  flex-wrap: wrap;
  padding-bottom: 15px;
  @media (max-width: ${device.planshet}) {
    grid-template-columns: 1fr;
    padding: 0 15px;
  }
`;

export const CardItem = styled.div`
  flex: 1;
`;

export const DownIcon = styled(Down)`
  transform: rotate(180deg);
  width: 12px !important;
  height: 6px !important;
  & > path {
    fill: #c4c4c4;
  }
`;
