import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Dots } from 'assets/icons/FeedBack/dots.svg';
import { ReactComponent as Delete1 } from 'assets/icons/FeedBack/delete.svg';
import { ReactComponent as Close } from 'assets/icons/SideBar/close.svg';

export const Delete = styled.div`
  color: #ff5e68;
`;

export const DeleteIcon = styled(Delete1)``;

export const Link = styled.div`
  color: #223367;
  background-color: #eff0fd;
`;

export const SelectWrap = styled.div`
  padding: 15px 0;
  & > div {
    font-weight: normal;
    font-size: 16px;
    padding: 15px 25px;
    cursor: pointer;
  }
  @media (max-width: ${device.mobile}) {
    padding: 10px 0;
    & > div {
      font-size: 14px;
    }
  }
`;

export const DotsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const DotsIcon = styled(Dots)`
  margin: 10px;

  @media (max-width: ${device.mobile}) {
    transform: rotate(90deg);
  }
`;

export const ModelContent = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  width: 450px;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: ${device.mobile}) {
    width: 290px;
  }
`;

export const ModelTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #223367;

  @media (max-width: ${device.mobile}) {
    font-size: 16px;
  }
`;

export const ModalWrap = styled.div`
  display: flex;
  margin-top: 30px;
`;

export const ModalText = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  width: 70%;
`;

export const Texts = styled.div`
  width: 100%;
  padding-left: 50px;
`;

export const CloseIcon = styled(Close)`
  width: 24px;
  height: 24px;
  & path {
    fill: #223367;
  }
  @media (max-width: ${device.mobile}) {
    width: 18px;
    height: 18px;
    & path {
      fill: #606eea;
    }
  }
`;

export const Img = styled.img`
  width: 10%;
  height: 10%;
  max-width: 75px;
  max-height: 220px;
`;

export const WrapWarning = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 35px;
  margin-top: 15px;
  max-width: 460px;
  span.title {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #223367;
    padding: 10px 35px;
  }
  span.text {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #223367;
    padding: 10px 45px;
  }
`;
