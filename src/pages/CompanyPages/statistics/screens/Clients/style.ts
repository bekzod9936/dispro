import styled, { css } from 'styled-components';

import { ReactComponent as Age } from 'assets/icons/StatistisPage/age.svg';
import { ReactComponent as Cart } from 'assets/icons/StatistisPage/cart.svg';
import { ReactComponent as CashBack } from 'assets/icons/StatistisPage/cashback.svg';
import { ReactComponent as Check } from 'assets/icons/StatistisPage/check.svg';
import { ReactComponent as Coupon } from 'assets/icons/StatistisPage/coupon.svg';
import { ReactComponent as Discount } from 'assets/icons/StatistisPage/discount.svg';
import { ReactComponent as Man } from 'assets/icons/StatistisPage/man.svg';
import { ReactComponent as Woman } from 'assets/icons/StatistisPage/woman.svg';
import { ReactComponent as Money } from 'assets/icons/StatistisPage/money.svg';
import { ReactComponent as Quistion } from 'assets/icons/StatistisPage/quistion.svg';
import { ReactComponent as Rating } from 'assets/icons/StatistisPage/rating.svg';
import { ReactComponent as Score } from 'assets/icons/StatistisPage/score.svg';
import { ReactComponent as Sertificate } from 'assets/icons/StatistisPage/sertificate.svg';
import { ReactComponent as Users } from 'assets/icons/StatistisPage/users.svg';
import { ReactComponent as Calendar } from 'assets/icons/StatistisPage/calendar.svg';
import { ReactComponent as Laptop } from 'assets/icons/StatistisPage/laptop.svg';
import { device } from 'styles/device';

const iconstyle = css``;

export const AgeIcon = styled(Age)`
  ${iconstyle}
`;
export const LaptopIcon = styled(Laptop)`
  ${iconstyle}
`;
export const CartIcon = styled(Cart)`
  ${iconstyle}
`;
export const CashBackIcon = styled(CashBack)`
  ${iconstyle}
`;
export const CheckIcon = styled(Check)`
  ${iconstyle}
`;
export const CouponIcon = styled(Coupon)`
  ${iconstyle}
`;
export const DiscountIcon = styled(Discount)`
  ${iconstyle}
`;
export const ManIcon = styled(Man)`
  ${iconstyle}
`;
export const WomanIcon = styled(Woman)`
  ${iconstyle}
`;
export const MoneyIcon = styled(Money)`
  ${iconstyle}
`;
export const QuistionIcon = styled(Quistion)`
  ${iconstyle}
`;
export const RatingIcon = styled(Rating)`
  ${iconstyle}
`;
export const ScoreIcon = styled(Score)`
  ${iconstyle}
`;
export const SertificateIcon = styled(Sertificate)`
  ${iconstyle}
`;
export const UsersIcon = styled(Users)`
  ${iconstyle}
`;
export const CalendarIcon = styled(Calendar)`
  ${iconstyle}
  & > path {
    fill: #c4c4c4;
  }
`;
export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 15px;
  color: #223367;
  @media (max-width: ${device.mobile}) {
    font-size: 13px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const Value = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #606eea;
  @media (max-width: ${device.mobile}) {
    font-size: 16px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 28px;
  }
`;

export const WrapInfo = styled.div`
  display: flex;
`;

export const Content = styled.div`
  margin-left: 15px;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  grid-auto-rows: minmax(90px, 110px);

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
  @media (max-width: ${device.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const WrapIcon = styled.div``;
