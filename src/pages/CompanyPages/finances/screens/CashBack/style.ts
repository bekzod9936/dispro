import styled from 'styled-components';
import { ReactComponent as CashBack } from 'assets/icons/FinanceIcons/cashback.svg';
import { ReactComponent as Wallet } from 'assets/icons/FinanceIcons/wallet.svg';
import { ReactComponent as Discount } from 'assets/icons/StatistisPage/discount.svg';
import { device } from 'styles/device';

export const Container = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 25px;
`;
interface CashProps {
  mobile?: boolean;
}

export const CashBackIcon = styled(CashBack)`
  margin-right: ${({ mobile }: CashProps) => (mobile ? '0' : '15px')};
  & path {
    fill: ${({ mobile }: CashProps) => (mobile ? '#C4C4C4' : '#606EEA')};
  }
  width: 30px;
  height: 30px;
  @media (max-width: ${device.mobile}) {
    width: 21px;
    height: 21px;
  }
`;
export const WalletIcon = styled(Wallet)`
  margin-right: 15px;
  width: 30px;
  height: 30px;
  @media (max-width: ${device.mobile}) {
    width: 21px;
    height: 21px;
  }
`;

export const WrapIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DiscountIcon = styled(Discount)`
  width: 20px;
  height: 20px;
`;
