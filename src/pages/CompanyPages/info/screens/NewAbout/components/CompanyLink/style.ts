import styled from "styled-components";
import { device } from "styles/device";

interface Props {
  margin?: string;
}

export const ForExample = styled.div`
  margin-bottom: 20px;
  font-weight: 300;
  font-size: 14px;
  color: #223367;
`;

export const WrapWebLink = styled.div`
  margin: ${({ margin }: Props) => margin};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const WebLink = styled.div`
  font-weight: normal;
  user-select: none;
  font-size: 15px;
  color: #223367;

  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }

  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const WebValue = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  display: flex;
  align-items: center;

  a {
    margin: 0 20px 0 15px;
    text-decoration: none;
    font-weight: 300;
    font-size: 14px;
    color: #223367;
  }
`;
