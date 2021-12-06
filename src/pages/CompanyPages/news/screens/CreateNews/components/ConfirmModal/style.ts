import styled from "styled-components";
import { device } from "styles/device";

export const WrapperModal = styled.div`
  padding: 20px 45px;
  width: 500px;
  position: relative;
  a {
    text-decoration: none;
  }
  h3 {
    font-size: 22px;
    line-height: 26px;
    margin-bottom: 10px;
    color: #223367;
  }
  p {
    font-size: 18px;
    font-weight: 300;
    color: #223367;
    margin-bottom: 25px;
  }
  @media (max-width: ${device.mobile}) {
    max-width: 300px;
    padding: 20px 15px;
    h3 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 15px;
      color: #223367;
    }
    p {
      width: 250px;
      font-size: 14px;
      color: #223367;
      font-weight: 300;
    }
  }
`;
export const UploadButton = styled.div`
  background: rgba(96, 110, 234, 0.1);
  input {
    display: none;
  }
  padding: 14px 25px;
  cursor: pointer;
  width: max-content;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  margin-bottom: 10px;
  label {
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    margin-right: 10px;
    color: #606eea;
  }
  @media (max-width: ${device.mobile}) {
    padding: 10px 15px;

    label {
      font-size: 14px;
      line-height: 16px;
    }
  }
`;
export const CloseButton = styled.div`
  position: absolute;
  right: 25px;
  top: 15px;
  cursor: pointer;
`;
export const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;

  align-items: center;
  .upside {
    @media (max-width: 347px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
