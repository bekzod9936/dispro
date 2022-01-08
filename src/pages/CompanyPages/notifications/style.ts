import styled from "styled-components";
import { device } from "styles/device";

export const Container = styled.div`
  padding: 25px 0 0 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
  @media (max-width: ${device.mobile}) {
    padding: 15px 0 0 15px;
  }
`;

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 0 25px 0 0;
  @media (max-width: ${device.mobile}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const Info = styled.div`
  color: #223367;
  font-size: 18px;
  span {
    font-weight: 900;
    margin: 0px 5px;
    font-size: 18px;
  }
  @media (max-width: ${device.mobile}) {
    margin-bottom: 15px;
  }
`;

export const WrapperCard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(30%, 1fr));
  grid-gap: 20px;
  padding-right: 25px;

  border-radius: 14px;
  @media (max-width: ${device.mobile}) {
    grid-template-columns: minmax(100%, 1fr);
    padding-right: 15px;
    grid-gap: 25px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    grid-template-columns: repeat(2, minmax(40%, 1fr));
  }
  @media (min-width: ${device.laptop}) {
    grid-template-columns: repeat(4, minmax(20%, 1fr));
    padding-right: 25px;
    grid-gap: 25px;
  }
`;

export const Wrap = styled.div`
  overflow-y: auto;
  margin-top: 25px;
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
  @media (max-width: ${device.mobile}) {
    margin-top: 15px;
  }
`;

export const WrapTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  grid-column-gap: 10px;
  word-break: break-word;
`;

export const Date1 = styled.div`
  font-weight: normal;
  font-size: 11px;
  color: #8f8f8f;
  white-space: nowrap;
  margin-left: 10px;
  @media (min-width: ${device.laptop}) {
    font-size: 12px;
  }
`;
