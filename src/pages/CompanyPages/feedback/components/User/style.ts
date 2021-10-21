import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Star } from 'assets/icons/FeedBack/star.svg';

export const StarIcon = styled(Star)`
  margin-right: 5px;
  width: 13px;
  height: 13px;
  @media (max-width: ${device.laptop}) {
    margin-right: 3px;
  }
`;

export const WrapStars = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
`;

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 12px 16px rgba(13, 19, 36, 0.08);
  border-radius: 14px;
  padding: 20px;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapText = styled.div``;

export const Avatar = styled.div`
  border-radius: 14px;
  width: 50px;
  height: 50px;
  background-color: lightgray;
  margin-right: 15px;
`;

export const UserName = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #223367;
`;

export const Status = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
`;

export const Date = styled.div`
  font-weight: normal;
  font-size: 14px;
  color: #8f8f8f;
  margin: 5px 0 0 20px;
`;

export const Title = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

export const Context = styled.div``;

export const Casher = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #3492ff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

export const Content = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: start;
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  margin-bottom: 10px;
`;
