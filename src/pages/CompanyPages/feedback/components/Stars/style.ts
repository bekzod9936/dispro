import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Star } from 'assets/icons/FeedBack/star.svg';

interface Props {
  checked?: boolean;
  margin?: string;
}

export const Container = styled.div`
  margin-bottom: 20px;
  width: 24%;
  top: 0;
  right: 0;
  position: sticky;
  height: fit-content;
  & > div {
    width: 90%;
    height: inherit;
  }

  @media (max-width: ${device.mobile}) {
    position: static;
    width: 100%;
    margin-bottom: 10px;
    height: fit-content;
    & > div {
      width: 100%;
      height: fit-content;
    }
  }
`;

export const Rate = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #223367;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const WrapStars = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;
  }
`;

export const WrapIconStart = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  flex: 1;
  height: 100%;
  justify-content: flex-end;
  @media (max-width: ${device.mobile}) {
    grid-gap: 10px;
  }
`;

export const StarIcon = styled(Star)`
  margin-right: 8px;
  margin: ${({ margin }: Props) => margin}!important;
  & > path {
    fill: ${({ checked }: Props) =>
      checked ? '#FFC107' : checked !== undefined ? '#C7C7C7' : '#FFC107'};
  }

  @media (max-width: ${device.laptop}) {
    margin-right: 3px;
    margin: ${({ margin }: Props) => margin}!important;
    width: 18px;
    height: 18px;
  }
`;

export const WrapStartT = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    justify-content: flex-end;
  }
  @media (max-width: ${device.mobile}) {
    justify-content: space-between;
  }
`;

interface RtProps {
  colort?: any;
}

export const RateText = styled.div`
  color: ${({ colort }: RtProps) => (colort ? '#223367' : '#c4c4c4')};
  font-weight: normal;
  font-size: 16px;
  margin-left: 5px;
  @media (min-width: ${device.laptop}) {
    margin-left: 10px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    flex: 1;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: 15px;
  }
`;
