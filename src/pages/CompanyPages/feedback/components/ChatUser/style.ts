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
  :hover {
    background-color: #8590eb;
  }
  background-color: ${({ bgcolor }: Props) => bgcolor};
`;

export const Name = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const Text = styled.div`
  font-weight: normal;
  font-size: 13px;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: ${device.laptop}) {
    font-size: 14px;
  }
`;

export const Wrapper = styled.div`
  overflow: hidden;
`;
