import styled from "styled-components";
import { device } from "styles/device";

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 5px 20px 25px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  padding: 40px;
  div.switchWrap {
    width: 31%;
  }
`;

export const WrapSwitch = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #223367;
  width: 80%;
  word-break: break-word;
  @media (max-width: ${device.mobile}) {
    font-size: 15px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const Text = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  width: calc(100% - 50px);
  margin: 10px 0 15px 0;
`;
