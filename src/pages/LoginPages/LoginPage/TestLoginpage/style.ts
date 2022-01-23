import styled, { css } from "styled-components";
import { device } from "../../../../styles/device";
import IconButton from "@material-ui/core/IconButton";

interface textProps {
  fontSize?: number;
  weight?: string;
}

interface WrapProps {
  display?: boolean;
}
interface SelectProps {
  justify?: boolean;
}

const common = css`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100%;
  background: linear-gradient(to bottom, #606eea 50%, #f4f4f4 50%);
  display: flex;
  @media (max-width: ${device.mobile}) {
    background: none;
  }
`;

export const LeftSide = styled.div`
  background-color: #606eea;
  border-bottom-right-radius: 10%;
  width: 50%;
  height: 100vh;
  display: flex;
  align-items: center;
  & > div {
    flex: 1;
    justify-content: space-between;
  }
  @media (max-width: ${device.planshet}) {
    display: none;
  }
`;

export const RightSide = styled.div`
  width: 50%;
  height: 100vh;
  background: red;
  background-color: #f1f4f6;
  border-top-left-radius: 10%;
  display: flex;
  flex-direction: column;
  @media (max-width: ${device.mobile}) {
    height: calc(100vh - 60px);
  }
  @media (max-width: ${device.planshet}) {
    background: white;
    border-top-left-radius: 0;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
`;

export const Img = styled.div`
  border-radius: 50%;
  width: 60%;
  height: 65%;
`;

export const Wrapper = styled.div`
  height: 100vh;
  padding: 60px;
  display: ${({ display }: WrapProps) => (display ? "none" : "flex")};
  ${({ display }: WrapProps) => (display ? null : common)}
  transition: 1s all linear;
  -webkit-animation-name: fade;
  -webkit-animation-duration: 4s;
  animation-name: fade;
  animation-duration: 3s;
  animation-direction: alternate;

  @-webkit-keyframes fade {
    0% {
      opacity: 0;
    }

    75% {
      opacity: 0.75;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    75% {
      opacity: 0.75;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Text = styled.p`
  font-weight: normal;
  font-size: ${({ fontSize }: textProps) => `${fontSize}px` || "16px"};
  font-weight: ${({ weight }: textProps) => weight || null};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
`;

export const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  & > div:first-child {
    width: 30%;
  }
  & > div:last-child {
    width: 70%;
  }
`;

export const WrapSelect = styled.div`
  display: flex;
  justify-content: ${({ justify }: SelectProps) =>
    justify ? "space-between" : "flex-end"};
  align-items: center;
  flex-shrink: 1;
  padding: 15px;

  @media (min-width: ${device.laptop}) {
    margin-left: 20px;
  }

  @media (max-width: ${device.planshet}) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  @media (min-width: ${device.mobile}) {
    padding: 15px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    padding: ${({ justify }: SelectProps) => (justify ? "15px 20px" : "40px")};
  }
`;

export const ImgLogo = styled.div`
  @media (max-width: ${device.mobile}) {
    width: 35px;
    height: 20px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    margin-right: 15px;
    width: 55px;
    height: 30px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    width: 65px;
    height: 35px;
  }
  width: 70px;
  height: 40px;
  margin-right: 10px;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: #223367;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: ${device.planshet}) {
    display: none;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: 20px;
  }
`;

export const WrapButton = styled.div`
  display: inline-block;
  @media (max-width: ${device.planshet}) {
    display: none;
  }
`;

export const WButton = styled(IconButton)`
  margin-right: 10px;
  @media (max-width: ${device.mobile}) {
    margin-right: 5px;
  }
  @media (min-width: ${device.planshet}) {
    display: none;
  }
`;

export const WLogo = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
`;
