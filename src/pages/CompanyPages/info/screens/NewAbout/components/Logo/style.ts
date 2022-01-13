import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Trash } from "assets/icons/IconsInfo/trash.svg";
import { ReactComponent as PhotoLoading } from "assets/icons/IconsInfo/photoloading.svg";

export const PhotoLoadingIcon = styled(PhotoLoading)`
  margin-left: 15px;
  width: 24px;
  height: 24px;
  @media (max-width: ${device.mobile}) {
    width: 18px;
    height: 18px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
`;

export const Label = styled.label`
  background: rgba(96, 110, 234, 0.1);
  border-radius: 14px;
  font-weight: 500;
  font-size: 16px;
  color: #606eea;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  cursor: pointer;
  margin-top: 10px;
  user-select: none;
  height: 50px;
  padding: 0 15px;
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    height: 45px;
    font-size: 16px;
    padding: 0 20px;
  }
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
    padding: 0 15px;
    height: 45px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const Message = styled.div`
  font-weight: 300;
  color: #ff5e68;
  overflow-wrap: normal;
  margin-top: 5px;
  font-size: 14px;

  @media (max-width: ${device.mobile}) {
    font-size: 14px;
    margin-top: 3px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: 14px;
    margin-top: 3px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: 14px;

    margin-top: 3px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
    margin-top: 5px;
  }
`;

export const PhotoWrap = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 20px 0;
  user-select: none;
  .lazy-load-image-background.blur.lazy-load-image-loaded {
    filter: blur(0);
    transition: filter 0.3s;
    height: 100%;
    width: 100%;
  }
  :hover {
    div {
      background: rgba(34, 51, 103, 0.75);
      svg {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 2.5rem;
        height: 3rem;
      }
    }
  }
  @media (max-width: ${device.mobile}) {
    width: 60px;
    height: 60px;
  }
  @media (min-width: ${device.laptop}) {
    width: 120px;
    height: 120px;
  }
  cursor: pointer;
  background-color: transparent;
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

export const TrashIcon = styled(Trash)`
  & > path {
    fill: #ffffff;
  }
`;
