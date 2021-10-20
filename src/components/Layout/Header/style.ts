import styled, { css } from 'styled-components';
import { device } from '../../../styles/device';
import { ReactComponent as Search } from '../../../assets/icons/SideBar/search.svg';
import { ReactComponent as Arrow } from '../../../assets/icons/SideBar/arrow.svg';
import { ReactComponent as Bell } from '../../../assets/icons/SideBar/bell.svg';
import { ReactComponent as Deposit } from '../../../assets/icons/SideBar/deposit.svg';
import { ReactComponent as Shield } from '../../../assets/icons/SideBar/shield.svg';
import { ReactComponent as LogOut } from '../../../assets/icons/SideBar/logout.svg';
import { ReactComponent as Market } from '../../../assets/icons/SideBar/ilmarket.svg';
import { ReactComponent as HeadPhone } from '../../../assets/icons/SideBar/biheadphones.svg';
import { ReactComponent as LogWhite } from '../../../assets/icons/SideBar/logoutwhite.svg';
import { ReactComponent as Close } from '../../../assets/icons/SideBar/close.svg';
import { ReactComponent as Warn } from '../../../assets/icons/SideBar/warning.svg';

interface ImgProps {
  size?: string;
}

interface ArrowProps {
  marginLeft?: boolean;
}

interface NProps {
  fontSize?: number;
  mobile?: boolean;
}

interface LangProps {
  mobile?: boolean;
}

export const WrapLang = styled.div`
  display: ${({ mobile }: LangProps) => (mobile ? 'none' : 'inline-block')};
  @media (max-width: ${device.mobile}) {
    display: ${({ mobile }: LangProps) => (mobile ? 'inline-block' : 'none')};
    margin: ${({ mobile }: LangProps) => (mobile ? '0 0 20px 0' : null)};
  }
`;

export const TitleLogo = styled.div`
  font-weight: bold;
  font-size: 12px;
  color: #223367;
  margin-left: 20px;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const LogoIcon = styled.img`
  width: 30px;
  height: 20px;
  min-width: 30px;
  min-height: 20px;
  max-width: 30px;
  max-height: 20px;
`;

export const WrapLogo = styled.div`
  display: none;

  @media (max-width: ${device.mobile}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Wrarning = styled.div`
  width: 100%;
  height: 80%;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  color: #223367;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const WranningIcon = styled(Warn)`
  margin-right: 20px;
`;

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: ${device.laptop}) {
    justify-content: space-between;
  }
  @media (max-width: ${device.mobile}) {
    justify-content: space-evenly;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  flex: 1;
  height: 100%;
`;

export const LogOutWhiteIcon = styled(LogWhite)`
  margin-left: 15px;
`;

export const CloseIcon = styled(Close)`
  margin-right: 15px;
`;

export const DepositIcon = styled(Deposit)`
  margin-left: 5px;
`;
export const ShieldIcon = styled(Shield)`
  margin-left: 5px;
`;

export const SearchIcon = styled(Search)`
  @media (max-width: ${device.laptop}) {
    width: 17px;
    height: 17px;
  }
  @media (min-width: ${device.mobile}) {
    display: ${({ mobile }: NProps) => mobile && 'none'};
  }
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
    & > path {
      fill: ${({ mobile }: NProps) => mobile && '#A5A5A5'};
    }
  }
`;

export const WrapInput = styled.div`
  width: fit-content;
  @media (max-width: ${device.mobile}) {
    display: none;
  }
`;
export const MarketIcon = styled(Market)`
  margin-left: 10px;
`;
export const HeadPhoneIcon = styled(HeadPhone)`
  margin-left: 10px;
`;

export const ArrowIcon = styled(Arrow)`
  width: 15px;
  height: 8px;
  margin-right: ${({ marginLeft }: ArrowProps) => (marginLeft ? null : '20px')};
  margin-left: ${({ marginLeft }: ArrowProps) => marginLeft && '20px'};
  @media (max-width: ${device.mobile}) {
    display: ${({ marginLeft }: ArrowProps) => marginLeft && 'none'};
  }
`;

export const Badge = styled.div`
  position: relative;
`;

export const BellIcon = styled(Bell)``;

export const BadgeContent = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3492ff;
  border: 3px solid #ffffff;
  border-radius: 14px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  width: 26px;
  height: 26px;
  top: -15px;
  left: 10px;
  user-select: none;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${device.mobile}) {
    display: none;
  }
  @media (min-width: ${device.laptop}) {
    margin-left: 20px;
  }
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #223367;
  margin-left: 15px;
  margin-bottom: 5px;
  white-space: nowrap;
`;

export const Text = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  color: #223367;
  white-space: nowrap;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 35px;
  align-items: center;
  background: #ffffff;
  border-radius: 14px;
  user-select: none;
  width: 360px;
`;

const ImgSmall = css`
  width: 40px;
  height: 40px;
`;

const ImgLarge = css`
  width: 70px;
  height: 70px;
`;

export const Img = styled.img`
  border-radius: 50%;
  ${({ size }: ImgProps) =>
    size === 'small' ? ImgSmall : size === 'large' ? ImgLarge : null}
  margin-bottom: ${({ size }: ImgProps) => size === 'large' && '20px'};
`;

export const LogOutIcon = styled(LogOut)`
  margin-left: 15px;
`;

export const Name = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: ${({ fontSize }: NProps) => `${fontSize}px`};
  color: #223367;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;

  max-width: 120px;
  width: 120px;
`;

export const TextCompany = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #8f8f8f;
  width: 100%;
`;

export const WrapPop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 20px;
  @media (max-width: ${device.mobile}) {
    display: none !important;
  }
`;

export const Type = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: #223367;
  margin-top: 5px;
  text-align: center;
`;

export const Link = styled.a`
  text-decoration: none;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: #3492ff;
  text-transform: capitalize;
  margin-bottom: 15px;
`;

export const ModelContent = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  width: 419px;
  height: 183px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ModelTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  color: #223367;
`;

export const ModalWrap = styled.div`
  display: flex;
  margin-top: 30px;
`;
