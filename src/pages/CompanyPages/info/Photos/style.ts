import styled from 'styled-components';
import { ReactComponent as Save } from '../../../../assets/icons/IconsInfo/save.svg';
import { ReactComponent as Photo } from '../../../../assets/icons/IconsInfo/photo.svg';
import { ReactComponent as Trash } from '../../../../assets/icons/IconsInfo/trash.svg';
import { device } from '../../../../styles/device';

interface Props {
  align?: string;
  maxwidth?: string;
}
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  flex: 1;
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
`;

export const SaveIcon = styled(Save)`
  margin-right: 15px;
`;

export const Img = styled.img`
  width: 230px;
  height: 160px;
  border-radius: 14px;
`;

export const ImgNo = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  min-width: 110px;
  max-width: 200px;
  min-height: 120px;
  max-height: 220px;
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
  width: fit-content;
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
