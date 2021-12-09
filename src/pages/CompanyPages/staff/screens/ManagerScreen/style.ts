import styled from "styled-components";
import { device } from "styles/device";

export const ManagerDiv = styled.div`
  margin-top: 50px;
//   padding-right: 40px;

  padding-right: 25px;
  overflow-y: auto;
  @media (max-width: ${device.mobile}) {
    overflow: visible;
  }
  @media (max-width: ${device.mobile}) {
    padding-right: 15px;
    &::-webkit-scrollbar {
      width: 4px !important;
  }
  }
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`;

export const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  width: 530px;
  line-height: 150%;
`;

export const Break = styled.div`
  height: 20px;
`;

export const Wrap = styled.div`
  padding-right: 25px;
  overflow-y: auto;
  @media (max-width: ${device.mobile}) {
    overflow: visible;
  }
  @media (max-width: ${device.mobile}) {
    padding-right: 15px;
    &::-webkit-scrollbar {
      width: 4px !important;
  }
  }
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`;