import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Excel } from "assets/icons/FinanceIcons/excel.svg";

export const WrapFilterValues = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  grid-row-gap: 10px;
  @media (max-width: ${device.mobile}) {
    flex-direction: column;
  }
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

export const ExcelIcon = styled(Excel)`
  width: 18px;
  height: 18px;
`;

export const WrapFilter = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    justify-content: start;
  }
`;

export const WrapSelectV = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
`;

export const WrapStatus = styled.div`
  display: flex;
  grid-column-gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const WrapCheck = styled.div``;

export const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
  margin-bottom: 5px;
`;

export const WrapFilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 10px;
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    gap: 0;
    .buttonkey {
      margin-right: 15px;
      margin-bottom: 15px;
    }
  }
`;

export const WrapExpo = styled.div`
  min-width: 200px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > div:first-child {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 18px;
    color: #223367;
  }
`;
