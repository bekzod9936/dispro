import styled from 'styled-components';
import { device } from 'styles/device';

interface Props {
  isValue?: boolean;
}

export const Container = styled.div``;

export const WrapTotal = styled.div``;

export const WrapDefPhoto = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  width: 100%;
  padding-top: 5%;
  & > span {
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    color: #223367;
    width: 70%;
  }
  @media (max-width: ${device.mobile}) {
    padding-top: 15%;
    & > span {
      font-size: 18px;
    }
  }
`;

interface Props {
  isPosts?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  height: 100%;
  width: 100%;
  overflow-y: ${({ isPosts }: Props) => (isPosts ? 'none' : 'auto')};
  overflow-x: ${({ isPosts }: Props) => (isPosts ? 'none' : 'hidden')};
  position: relative;
  &::after {
    position: sticky;
    content: '';
    width: ${({ isPosts }: Props) => (isPosts ? '0' : '1px')};
    height: 100%;
    background-color: rgba(96, 110, 234, 0.3);
    top: 0;
    right: calc(25% + 20px);
  }
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

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Img = styled.img`
  width: 40%;
  height: 50%;
  margin-bottom: 20px;
  @media (min-width: ${device.laptop}) {
    width: 30%;
    height: 40%;
  }
  @media (max-width: ${device.mobile}) {
    width: 60%;
    height: 50%;
  }
`;

export const NoResult = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  height: 200px;
  font-weight: normal;
  font-size: 16px;
  color: #223367;
`;

interface Props {
  big?: boolean;
}

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
    font-size: 16px;
    span {
      font-size: 16px;
    }
  }
`;

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0 0;
  padding-bottom: 25px;
  width: 100%;
  @media (max-width: ${device.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

export const Mas = styled.div`
  column-count: 2;
  column-gap: 25px;
  color: #223367;
  font-weight: normal;
  font-size: 18px;
  box-sizing: border-box;

  @media (max-width: ${device.planshet}) {
    column-count: 1;
  }
`;
