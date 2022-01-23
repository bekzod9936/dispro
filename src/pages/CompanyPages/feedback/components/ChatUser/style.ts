import styled from 'styled-components';
import { device } from 'styles/device';

interface Props {
  bgcolor?: string;
}

export const Container = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(96, 110, 234, 0.1);
  padding: 15px;
  cursor: pointer;
  direction: ltr;
  width: 100%;
  :hover {
    background-color: #8590eb;
  }
  background-color: ${({ bgcolor }: Props) => bgcolor};
  @media (max-width: ${device.mobile}) {
    padding: 15px 12px;
    width: 100%;
    border-bottom: 1px solid #e3e6f9;
    max-height: 90px;
    min-height: 90px;
    direction: unset;
    background-color: transparent;
    :hover {
      background-color: transparent;
    }
  }
`;

export const Name = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  display: flex;
  align-items: center;
  div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 80%;
  }

  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
  @media (max-width: ${device.mobile}) {
    color: #223367;
  }
`;

export const Text = styled.div`
  font-weight: normal;
  font-size: 13px;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: ${device.laptop}) {
    font-size: 14px;
  }
  @media (max-width: ${device.mobile}) {
    font-weight: normal;
    font-size: 14px;
    color: #223367;
  }
`;

export const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  @media (max-width: ${device.mobile}) {
    padding-left: 10px;
  }
`;

export const WrapName = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
