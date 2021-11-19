import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/delete.svg';
import { ReactComponent as Money } from 'assets/icons/StatistisPage/money.svg';
import { ReactComponent as Cart } from 'assets/icons/StatistisPage/cart.svg';
import { ReactComponent as Discount } from 'assets/icons/StatistisPage/discount.svg';
import { ReactComponent as Pink } from 'assets/icons/StatistisPage/app.svg';
import { ReactComponent as Excel } from 'assets/icons/FinanceIcons/excel.svg';

export const Container = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 25px;
`;

export const ExcelIcon = styled(Excel)`
  width: 18px;
  height: 18px;
`;

export const CartIcon = styled(Cart)`
  width: 20px;
  height: 20px;
`;

export const DeleteIcon = styled(Delete)`
  & > path {
    fill: #c4c4c4;
  }
`;

export const WrapFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const WrapInputs = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  & > div {
    display: flex;
    grid-gap: 10px;
  }
`;

export const Label1 = styled.label`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
  margin-bottom: 5px;
`;

export const WrapDate = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #223367;
  padding-left: 15px;
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
  margin: 0 0 0 10px;
  height: 30px;
  .MuiIconButton-root {
    padding: 6px !important;
    margin-left: 5px;
  }
  @media (max-width: ${device.mobile}) {
    height: 25px;
    font-weight: 300;
    font-size: 12px;
    color: #223367;
    margin: 10px 0 0 0;
  }
  @media (min-width: ${device.laptop}) {
    height: 35px;
    font-size: 14px;
  }
`;

export const WrapFilterValues = styled.div`
  display: flex;
  align-items: center;
`;

export const MoneyIcon = styled(Money)`
  width: 17px;
  height: 20px;
`;

export const DiscountIcon = styled(Discount)`
  width: 20px;
  height: 20px;
`;

export const PinkIcon = styled(Pink)``;

export const WrapSelectV = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
`;

export const Img = styled.img`
  min-width: 90px;
  max-width: 120px;
  min-height: 180px;
  max-height: 250px;
  width: 8%;
  height: 12%;
  margin: 5% 0 2% 0;
  @media (max-width: ${device.mobile}) {
    margin: 10% 0 5% 0;
  }
`;

export const WrapDef = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const TitleDef = styled.div`
  color: #223367;
  font-weight: normal;
  font-size: 18px;
  @media (max-width: ${device.mobile}) {
    font-size: 15px;
    display: flex;
    width: 50%;
    word-wrap: break-word;
    text-align: center;
  }
`;
