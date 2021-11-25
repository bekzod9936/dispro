import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as OneCheck } from 'assets/icons/FeedBack/onecheck.svg';
import { ReactComponent as DoubleCheck } from 'assets/icons/FeedBack/doublecheck.svg';
import { ReactComponent as Unread } from 'assets/icons/FeedBack/unread.svg';

interface Props {
  bgcolor?: string;
}

export const OneCheckIcon = styled(OneCheck)``;

export const DoubleCheckIcoon=styled(DoubleCheck)``

export const UnreadIcon=styled(Unread)``;

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
