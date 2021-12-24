import styled from 'styled-components';
import { device } from 'styles/device';

export const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
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

export const Container = styled.div`
  display: flex;
  flex: 1;

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 20px;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;

  grid-column-gap: 10px;
  grid-auto-rows: minmax(90px, 110px);

  @media (max-width: ${device.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: 15px;
  }
`;

export const WrapMobile = styled.div`
  display: none;

  @media (max-width: ${device.planshet}) {
    display: block;
    padding-bottom: 20px;
  }
`;
export const WrapDesktop = styled.div`
  display: none;

  @media (min-width: ${device.planshet}) {
    display: block;
    position: absolute;
    top: 20px;
    right: 30px;
    height: 150px;
    width: 400px;
  }
`;
