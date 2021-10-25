import styled from "styled-components";

interface IBreak {
  width?: number;
  height?: number;
}

export const CashSettingWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-right: 21px;
  overflow: hidden;
`;

export const CashierWrapTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const TitleText = styled.h4`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: #223367;
`;

export const CashierBody = styled.div`
  /* height: fit-content; */
  flex: 1;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  padding: 40px 30px 60px 50px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Break = styled.div`
  width: ${({ width }: IBreak) => width + "px"};
  height: ${({ height }: IBreak) => height + "px"};
`;

export const SettingRow = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SettingCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const SettingTitle = styled.h5`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #223367;
`;

export const SettingText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  color: #223367;
`;

export const Form = styled.form``;
