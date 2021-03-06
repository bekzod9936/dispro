import styled from 'styled-components';
import { device } from 'styles/device';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const Img = styled.img`
  max-width: 200px;
  max-height: 200px;
  width: 50%;
  height: 40%;
  user-select: none;
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    max-width: 200px;
    max-height: 200px;
  }
  @media (min-width: ${device.laptop}) {
    max-width: 300px;
    max-height: 300px;
  }
  @media (max-width: ${device.mobile}) {
    max-width: 200px;
    max-height: 160px;
  }
`;

export const WrapHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0 25px;
  span {
    text-align: center;
    color: #223367;
    font-size: 18px;
    max-width: 450px;
  }
  & > span:first-child {
    font-weight: bold;
  }
  & > span:nth-child(2) {
    font-weight: bold;
    margin-bottom: 30px;
  }
  & > span:last-child {
    font-weight: normal;
  }
  @media (max-width: ${device.mobile}) {
    span {
      max-width: 300px;
      font-size: 14px;
    }
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    span {
      max-width: 350px;
      font-size: 16px;
    }
  }
`;
export const WrapButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  @media (max-width: ${device.mobile}) {
    width: 90%;
  }
`;
