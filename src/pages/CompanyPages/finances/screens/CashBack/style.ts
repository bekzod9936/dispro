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

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
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
