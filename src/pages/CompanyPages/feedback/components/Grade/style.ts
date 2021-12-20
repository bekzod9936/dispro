import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Line } from 'assets/icons/FeedBack/line.svg';

interface Props {
  up?: boolean;
  total?: boolean;
  bgcolor?: boolean;
}

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  padding: 20px;
  width: 100%;
  margin: 10px 0 20px;

  @media (max-width: ${device.mobile}) {
    display: flex;
    padding: 12px 18px;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 15px;
  }
`;

export const Title = styled.div`
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 15px;
  color: #c7c7c7;
  width: fit-content;
  user-select: none;
  text-align: center;
  width: 100%;
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
    width: 140px;
    margin-bottom: 0;
    text-align: start;
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

export const Text = styled.div`
  font-weight: 300;
  font-size: 15px;
  color: #223367;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: ${({ total }: Props) =>
    total ? 'center' : 'space-between'};
  grid-gap: 10px;
`;

export const PercentInfo = styled.div`
  background: ${({ bgcolor }: Props) => (bgcolor ? '#38e25d' : '#FF5E68')};
  border-radius: 14px;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  width: fit-content;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

export const LineIcon = styled(Line)`
  margin-right: 10px;
  transform: ${({ up }: Props) => (up ? 'rotate(0)' : 'rotateX(180deg)')};
`;

export const PercentNum = styled.div`
  font-weight: bold;
  font-size: 40px;
  color: #606eea;
`;

export const PercentDef = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #c4c4c4;
  margin-left: 10px;
`;

export const PercentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ total }: Props) => (total ? '100%' : 'fit-content')};
`;
