import styled from 'styled-components';
import { device } from 'styles/device';

export const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  grid-row-gap: 50px;
  grid-column-gap: 20px;

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
  @media (max-width: ${device.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 30px;
    grid-column-gap: 10px;
    padding-bottom: 15px;
  }
`;
