import styled from 'styled-components';
import { device } from 'styles/device';

export const Container = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
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

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const Info = styled.div`
  color: #223367;
  font-size: 18px;
  span {
    font-weight: 900;
    margin: 0px 5px;
    font-size: 18px;
  }
`;

export const WrapFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 30px 0 0;
  margin-bottom: 20px;
`;

export const WrapInputs = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
  margin-bottom: 5px;
`;

export const WrapDate = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #223367;
  padding-left: 15px;
`;
