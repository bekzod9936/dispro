import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/delete.svg';

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
  flex-direction: column;
  & > div {
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 20px;
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
  }
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

export const ButtonKeyWord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c4c4c4;
  border-radius: 46px;
  font-weight: 300;
  font-size: 13px;
  color: #223367;
  padding: 0 5px 0 15px;
  margin: 0 0 0 10px;
  height: 30px;
  .MuiIconButton-root {
    padding: 6px !important;
    margin-left: 5px;
  }
  @media (max-width: ${device.mobile}) {
    height: 25px;
    font-weight: 300;
    font-size: 12px;
    color: #223367;
    margin: 10px 0 0 0;
  }
  @media (min-width: ${device.laptop}) {
    height: 35px;
    font-size: 14px;
  }
`;

export const DeleteIcon = styled(Delete)`
  & > path {
    fill: #c4c4c4;
  }
`;