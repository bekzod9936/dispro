import styled from 'styled-components';
import { ReactComponent as Money } from 'assets/icons/StatistisPage/money.svg';
import { ReactComponent as Discount } from 'assets/icons/StatistisPage/discount.svg';

export const Container = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 25px;
`;

export const MoneyIcon = styled(Money)`
  width: 17px;
  height: 20px;
`;

export const DiscountIcon = styled(Discount)`
  width: 20px;
  height: 20px;
`;
