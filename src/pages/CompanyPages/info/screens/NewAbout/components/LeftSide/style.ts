import styled from "styled-components";
import { device } from "styles/device";

export const WrapCurrency = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;

  span {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: #c7c7c7;
    margin-bottom: 7px;
  }
  div {
    font-weight: 500;
    font-size: 16px;
    color: #223367;
    background: #f5f5f5;
    border-radius: 14px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 25px;
    cursor: not-allowed;
  }
  @media (max-width: ${device.planshet}) {
    div {
      height: 45px;
      font-size: 15px;
    }

    span {
      margin-bottom: 5px;
      font-size: 14px;
    }
  }

  @media (min-width: ${device.laptop}) {
    div {
      height: 60px;
    }
  }
`;
