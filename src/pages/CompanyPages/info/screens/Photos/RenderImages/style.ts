import styled from "styled-components";
import { device } from "styles/device";

export const WrapImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  grid-gap: 20px;
  @media (max-width: ${device.mobile}) {
    grid-gap: 10px;
    display: grid;
    grid-template-columns: minmax(140px, 1fr) minmax(140px, 1fr);
  }
`;

export const WrapTrash = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  cursor: pointer;
  background-color: transparent;
  border-radius: 14px;
  & > svg {
    display: none;
  }
`;

export const WrapImage = styled.div`
  position: relative;
  width: 230px;
  height: 160px;
  border-radius: 14px;
  overflow: hidden;
  .lazy-load-image-background.blur.lazy-load-image-loaded {
    filter: blur(0);
    transition: filter 0.3s;
    height: 100%;
    width: 100%;
  }

  :hover {
    & > div {
      background-color: rgba(31, 26, 62, 0.7);
      svg {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 2.3rem;
        height: 2.4rem;
      }
    }
  }

  @media (max-width: ${device.mobile}) {
    width: 100%;
    height: 100px;
  }
`;

export const Label = styled.label`
  border: 1px dashed #c4c4c4;
  box-sizing: border-box;
  border-radius: 14px;
  width: 230px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  margin-right: 20px;
  span {
    font-weight: 500;
    font-size: 16px;
    color: #c4c4c4;
  }
  & > svg {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
    & > path {
      fill: #c4c4c4;
    }
  }
  @media (max-width: ${device.mobile}) {
    width: 100%;
    height: 100px;
    & > svg {
      width: 20px;
      height: 20px;
    }
    span {
      font-size: 14px;
    }
  }
`;
