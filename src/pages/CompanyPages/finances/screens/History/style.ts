import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/delete.svg';
import { ReactComponent as Money } from 'assets/icons/StatistisPage/money.svg';
import { ReactComponent as Cart } from 'assets/icons/StatistisPage/cart.svg';
import { ReactComponent as Discount } from 'assets/icons/StatistisPage/discount.svg';
import { ReactComponent as Pink } from 'assets/icons/StatistisPage/app.svg';
import { ReactComponent as Excel } from 'assets/icons/FinanceIcons/excel.svg';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import { ReactComponent as Trash } from 'assets/icons/delete.svg';
import { ReactComponent as Save } from 'assets/icons/IconsInfo/save.svg';
import { ReactComponent as Close1 } from 'assets/icons/SideBar/close.svg';

export const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 25px;
`;

export const SaveIcon = styled(Save)`
  width: 24px;
  height: 24px;
  @media (max-width: ${device.planshet}) {
    width: 18px;
    height: 18px;
  }
`;

export const CancelIcon = styled(Close1)`
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

export const DeleteIcon1 = styled(Trash)``;

export const CloseIcon = styled(Close)`
  width: 15px;
  height: 15px;
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

export const WrapComment = styled.div`
  text-overflow: ellipsis;
  text-transform: none !important;
  max-width: 200px;
  overflow: hidden;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  color: #223367;
`;

export const WrapSideHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0 13px 0 25px;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  color: #223367;
  margin-bottom: 15px;
  @media (max-width: ${device.mobile}) {
    display: none;
  }
`;

export const WrapSideBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  height: 80%;
  @media (max-width: ${device.mobile}) {
    padding: 0 20px;
  }
`;

export const BodyTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #c7c7c7;
  padding: 0 25px;
  margin-bottom: 10px;
  @media (max-width: ${device.mobile}) {
    font-weight: normal;
    font-size: 14px;
    color: #a5a5a5;
    padding: 0;
  }
`;

export const Comment = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  color: #223367;
  margin-bottom: 10px;
  overflow: hidden;
  height: 100%;
  padding: 0 0 0 25px;
  @media (max-width: ${device.mobile}) {
    padding: 0;
  }
  & > div {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #606eea;
      border-radius: 14px 0px 0px 14px;
    }
  }
`;

export const WrapSideFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 20px;
`;

export const WrapButtonsModal = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const WrapModalComment = styled.div`
  padding: 30px;
  width: 500px;
  @media (max-width: ${device.mobile}) {
    width: 290px;
    padding: 15px;
  }
`;

export const WarpBodyComModel = styled.div``;

export const WrapComTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    font-weight: bold;
    font-size: 22px;
    color: #223367;
  }
  @media (max-width: ${device.mobile}) {
    & > div {
      font-size: 16px;
    }
  }
`;

export const LabelCom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const WrapImage = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 15px;
`;

export const CloseWrapBut = styled.div`
  @media (max-width: ${device.mobile}) {
    display: none;
  }
`;

export const WrapDeleteModal = styled.div`
  padding: 30px;

  @media (max-width: ${device.mobile}) {
    width: 290px;
    padding: 15px;
  }
`;
export const WrapDeleteTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #223367;
  @media (max-width: ${device.mobile}) {
    font-size: 16px;
  }
`;
export const WrapDeleteComment = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #223367;
  margin: 15px 0;
  word-break: break-all;
`;

export const WrapDeleteButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
