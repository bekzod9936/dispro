import styled from 'styled-components';
import { ReactComponent as Save } from 'assets/icons/IconsInfo/save.svg';
import { ReactComponent as Photo } from 'assets/icons/IconsInfo/photo.svg';
import { ReactComponent as Trash } from 'assets/icons/IconsInfo/trash.svg';
import { device } from 'styles/device';

interface Props {
  align?: string;
  maxwidth?: string;
}
export const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  & > div {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #606eea;
      border-radius: 14px 0px 0px 14px;
    }
  }
  @media (max-width: ${device.mobile}) {
    padding: 0 15px;
  }
`;

export const Text = styled.div`
  font-weight: ${({ align }: Props) => (align ? 'normal' : '300')};
  font-size: 16px;
  color: #223367;
  margin-bottom: 15px;
  span {
    color: #3492ff;
  }
  max-width: ${({ maxwidth }: Props) => (maxwidth ? maxwidth : 'fit-content')};
  text-align: ${({ align }: Props) => (align ? align : 'left')};

  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
`;

export const SaveIcon = styled(Save)`
  margin-right: 15px;
`;

export const ImgNo = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  min-width: 110px;
  max-width: 200px;
  min-height: 120px;
  max-height: 220px;
  @media (max-width: ${device.mobile}) {
    max-height: 120px;
    max-width: 110px;
  }
`;

export const LabelNoPhoto = styled.label`
  background: rgba(96, 110, 234, 0.1);
  border-radius: 14px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #606eea;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  user-select: none;
  cursor: pointer;
  & > svg {
    margin-left: 10px;
    width: 22px;
    height: 22px;
  }
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
    padding: 10px 15px;
    & > svg {
      width: 17px;
      height: 17px;
    }
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
`;

export const PhotoIcon = styled(Photo)``;

export const WrapImage = styled.div`
  position: relative;
  width: 230px;
  height: 160px;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 10px;
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
  margin-right: 20px;
`;

export const WrapImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
`;

export const TrashIcon = styled(Trash)``;

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

export const WrapNoPhoto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const Wrpaper = styled.div``;
