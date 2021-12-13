import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Star } from 'assets/icons/FeedBack/star.svg';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/delete.svg';
import { ReactComponent as Search } from 'assets/icons/searchblue.svg';

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
  @media (max-width: ${device.mobile}) {
    width: 16px;
    height: 16px;
  }
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

export const ButtonKeyWord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c4c4c4;
  border-radius: 46px;
  font-weight: 300;
  font-size: 13px;
  color: #223367;
  padding: 0 5px 0 15px;
  height: 30px;
  width: fit-content;
  .MuiIconButton-root {
    padding: 6px !important;
    margin-left: 5px;
  }
  @media (max-width: ${device.mobile}) {
    height: 25px;
    font-weight: 300;
    font-size: 12px;
    color: #223367;
  }
  @media (min-width: ${device.laptop}) {
    height: 35px;
    font-size: 14px;
  }
`;

export const DeleteIcon = styled(Delete)`
  & > path {
    fill: #c4c4c4;
  }
`;

export const WrapValues = styled.div`
  display: flex;
  grid-gap: 10px;
  flex-wrap: wrap;
`;

export const FilterWarp = styled.div`
  display: flex;
  grid-gap: 10px;
  margin-bottom: 20px;
  flex-direction: column;
  div.filterCom {
    display: flex;
  }
`;
