import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Search } from 'assets/icons/searchblue.svg';

export const MainWrapper = styled.div`
  padding: 25px 0 0 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export const Label = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const WrapTotal = styled.div``;

export const WrapHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: fit-content;
`;

export const RightHeader = styled.div`
  position: absolute;
  right: 30px;
  top: 25px;
`;
export const LeftHeader = styled.div``;

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
  margin: 20px 0;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  height: 100%;
`;

export const RightSide = styled.div`
  border-left: 1px solid rgba(96, 110, 234, 0.3);
  margin-bottom: 20px;
  width: 25%;
  padding: 0 40px;
`;
