import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Star } from 'assets/icons/FeedBack/star.svg';

interface Props {
  bgcolor?: boolean;
}

export const WrapCheck = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 15px;
  color: #c7c7c7;
  width: fit-content;
  user-select: none;
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: 14px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: 15px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const WrapChecks = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
  margin-top: 15px;
  grid-column-gap: 20px;
`;

export const StarIcon = styled(Star)`
  & path {
    fill: ${({ bgcolor }: Props) => (bgcolor ? '#FFC107' : '#C7C7C7')};
  }
`;
