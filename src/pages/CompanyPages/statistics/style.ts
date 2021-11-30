import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Age } from 'assets/icons/StatistisPage/age.svg';
import { ReactComponent as AgeMob } from 'assets/icons/StatistisPage/agemob.svg';
import { ReactComponent as Cart } from 'assets/icons/StatistisPage/cart.svg';
import { ReactComponent as CashBack } from 'assets/icons/StatistisPage/cashback.svg';
import { ReactComponent as Check } from 'assets/icons/StatistisPage/check.svg';
import { ReactComponent as Coupon } from 'assets/icons/StatistisPage/coupon.svg';
import { ReactComponent as Discount } from 'assets/icons/StatistisPage/discount.svg';
import { ReactComponent as Man } from 'assets/icons/StatistisPage/man.svg';
import { ReactComponent as Woman } from 'assets/icons/StatistisPage/woman.svg';
import { ReactComponent as Money } from 'assets/icons/StatistisPage/money.svg';
import { ReactComponent as Rating } from 'assets/icons/StatistisPage/rating.svg';
import { ReactComponent as Score } from 'assets/icons/StatistisPage/score.svg';
import { ReactComponent as Sertificate } from 'assets/icons/StatistisPage/cashnew.svg';
import { ReactComponent as Users } from 'assets/icons/StatistisPage/users.svg';
import { ReactComponent as Calendar } from 'assets/icons/StatistisPage/buying.svg';
import { ReactComponent as Laptop } from 'assets/icons/StatistisPage/laptop.svg';

export const UsersIcon = styled(Users)`
  width: 35px;
  height: 30px;
  @media (max-width: ${device.mobile}) {
    width: 21px;
    height: 18px;
  }
`;

export const ManIcon = styled(Man)`
  width: 35px;
  height: 30px;
  @media (max-width: ${device.mobile}) {
    width: 10px;
    height: 25px;
  }
`;

export const WomanIcon = styled(Woman)`
  width: 15px;
  height: 40px;
  @media (max-width: ${device.mobile}) {
    width: 10px;
    height: 25px;
  }
`;

export const AgeIcon = styled(Age)`
  width: 66px;
  height: 39px;
`;

export const AgeMobIcon = styled(AgeMob)`
  @media (max-width: ${device.mobile}) {
    width: 11px;
    height: 39px;
  }
`;

export const CalendarIcon = styled(Calendar)`
  width: 35px;
  height: 35px;
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 18px;
  }
  & > path {
    fill: #c4c4c4;
  }
`;

export const CartIcon = styled(Cart)`
  width: 35px;
  height: 35px;
  @media (max-width: ${device.mobile}) {
    width: 21px;
    height: 20px;
  }
`;

export const MoneyIcon = styled(Money)`
  width: 30px;
  height: 35px;
  @media (max-width: ${device.mobile}) {
    width: 16px;
    height: 20px;
  }
`;

export const RatingIcon = styled(Rating)`
  width: 44px;
  height: 44px;
  @media (max-width: ${device.mobile}) {
    width: 21px;
    height: 21px;
  }
`;

export const ScoreIcon = styled(Score)`
  width: 35px;
  height: 30px;
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 18px;
  }
`;

export const CheckIcon = styled(Check)`
  width: 35px;
  height: 35px;
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
  }
`;

export const CashBackIcon = styled(CashBack)`
  width: 35px;
  height: 35px;
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
  }
`;

export const DiscountIcon = styled(Discount)`
  width: 35px;
  height: 35px;
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
  }
`;

export const SertificateIcon = styled(Sertificate)`
  width: 30px;
  height: 32px;
  @media (max-width: ${device.mobile}) {
    width: 16px;
    height: 19px;
  }
`;

export const CouponIcon = styled(Coupon)`
  width: 35px;
  height: 35px;
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
  }
`;

export const LaptopIcon = styled(Laptop)`
  width: 35px;
  height: 35px;
  @media (max-width: ${device.mobile}) {
    width: 21px;
    height: 21px;
  }
`;

export const Container = styled.div`
  padding: 25px 0 0 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
  @media (max-width: ${device.mobile}) {
    padding: 15px 0 0 15px;
  }
`;

export const WrapInfo = styled.div`
  display: flex;
`;

export const WrapFilter = styled.div`
  padding-bottom: 20px;
  display: flex;
  @media (max-width: ${device.mobile}) {
    padding-bottom: 15px;
  }
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

export const Content = styled.div`
  margin-left: 15px;
  @media (max-width: ${device.mobile}) {
    margin-left: 10px;
  }
`;

export const WrapNav = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 20px 20px 0;

  @media (max-width: ${device.mobile}) {
    padding: 10px 10px 10px 0;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    padding: 10px 10px 10px 0;
  }
`;
