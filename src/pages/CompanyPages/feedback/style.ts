import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Search } from 'assets/icons/searchblue.svg';
import { ReactComponent as Star } from 'assets/icons/FeedBack/star.svg';

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

export const MainWrapper = styled.div`
  padding: 25px 0 0 25px;
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  flex-direction: column;
`;

export const WrapTotal = styled.div``;

export const WrapHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 75%;
  height: 100%;
  max-width: 75%;
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

export const LeftHeader = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 40px;
`;

export const SearchIcon = styled(Search)`
  width: 24px;
  height: 24px;
  @media (min-width: ${device.laptop}) {
    width: 26px;
    height: 26px;
  }
  @media (max-width: ${device.planshet}) {
    width: 20px;
    height: 20px;
  }
`;

export const FilterWarp = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 20px 0;
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
`;

export const WrapDef = styled.div`
  color: #223367;
  font-weight: normal;
  font-size: 18px;
  text-align: center;
  grid-gap: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
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

export const WrapChecks = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
  margin-left: 15px;
  margin-top: 15px;
`;

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

interface Props {
  big?: boolean;
}

export const Avatar = styled.div`
  border-radius: 14px;
  width: ${({ big }: Props) => (big ? '45px' : '40px')};
  height: ${({ big }: Props) => (big ? '45px' : '40px')};
  min-width: ${({ big }: Props) => (big ? '45px' : '40px')};
  min-height: ${({ big }: Props) => (big ? '45px' : '40px')};
  background-color: lightgray;
  margin-right: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: ${device.laptop}) {
    width: ${({ big }: Props) => (big ? '55px' : '40px')};
    height: ${({ big }: Props) => (big ? '55px' : '40px')};
  }
  & > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export const Info = styled.div`
  color: #223367;
  font-size: 18px;
  span {
    font-weight: 900;
    margin: 0px 5px;
    font-size: 18px;
  }
`;

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0 0;
  padding-bottom: 25px;
  width: 100%;
`;
