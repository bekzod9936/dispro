import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Star } from 'assets/icons/FeedBack/star.svg';

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`;

export const Left = styled.div`
  width: 75%;
  overflow: hidden;
  display: flex;
  flex: 1;
`;

export const Right = styled.div`
  width: 25%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  &::after {
    position: absolute;
    content: '';
    width: 1px;
    height: 100%;
    background-color: rgba(96, 110, 234, 0.3);
    top: 20px;
    left: 5%;
  }

  & > div {
    width: 90%;
    height: 100%;
    & > div {
      position: sticky;
      top: 0;
      right: 0;
    }
  }
`;

export const WrapDefPhoto = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  width: 100%;
`;

export const Img = styled.img`
	object-fit: contain;
  width: 40%;
  height: 50%;
  margin-bottom: 20px;
  @media (min-width: ${device.laptop}) {
    width: 30%;
    height: 40%;
  }
`;

export const Content = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex: 1;
`;

export const WrapDef = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 20px;
  overflow: hidden;
  color: #223367;
  font-weight: normal;
  font-size: 18px;
  text-align: center;
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
  margin-bottom: 20px;
  width: 100%;
  justify-content: center;

  @media (max-width: ${device.laptop}) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;
  }
`;

export const WrapIconStart = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: flex-end;
`;

interface Props {
  checked?: boolean;
  margin?: string;
}

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
  width: 100%;
  flex: 1;
  justify-content: space-between;
`;

export const RateText = styled.div`
  color: #c4c4c4;
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
