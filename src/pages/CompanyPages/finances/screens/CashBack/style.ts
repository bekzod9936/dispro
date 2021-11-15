import styled from 'styled-components';
import { ReactComponent as CashBack } from 'assets/icons/FinanceIcons/cashback.svg';
import { ReactComponent as Wallet } from 'assets/icons/FinanceIcons/wallet.svg';

export const Container = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 25px;
`;

export const CashBackIcon = styled(CashBack)`
  margin-right: 15px;
`;
export const WalletIcon = styled(Wallet)`
  margin-right: 15px;
`;

export const WrapIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
