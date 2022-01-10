import styled from "styled-components";
import { device } from "../../../styles/device";

export const Container = styled.div`
  span.MuiCheckbox-colorSecondary.Mui-checked {
    color: #3492ff !important ;
  }
  span.MuiCheckbox-colorSecondary {
    color: #a5a5a5 !important ;
  }
  span.MuiTypography-body1 {
    font-weight: 500 !important ;
    font-size: 16px !important ;
    color: #223367 !important ;
  }
  @media (min-width: ${device.laptop}) {
    span.MuiTypography-body1 {
      font-size: 18px !important ;
    }
  }
  @media (max-width: ${device.mobile}) {
    span.MuiTypography-body1 {
      font-size: 14px !important ;
    }
  }
`;
