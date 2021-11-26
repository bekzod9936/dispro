import styled from 'styled-components';
import { device } from '../../../../styles/device';
import { ReactComponent as Plus } from '../../../../assets/icons/LoginPage/plus.svg';
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';

interface Props {
  border?: string;
  color?: string;
  loading?: boolean;
}

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 25px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: inherit;
  flex: 100%;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f4f6;
  }

  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
  background-color: #f1f4f6;
  @media (max-width: ${device.mobile}) {
    padding: 0 15px;
    justify-content: flex-start;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  justify-items: start;
  grid-column-gap: 25px;
  grid-row-gap: 35px;
  grid-template-columns: minmax(140px, 250px) minmax(140px, 250px);
  margin-top: 25%;
  @media (max-width: ${device.mobile}) {
    grid-column-gap: 10px;
    grid-row-gap: 20px;
    margin-top: 0;
    height: fit-content;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    grid-column-gap: 18px;
    grid-row-gap: 28px;
    grid-template-columns: minmax(140px, 190px) minmax(140px, 190px);
  }
`;

export const Box = styled.div`
  width: 100%;
  height: 280px;
  max-width: 250px;
  min-width: 140px;
  max-height: 290px;
  min-height: 160px;
  background: white;
  box-shadow: ${({ loading }: Props) =>
    loading
      ? '-1px -1px 9px black, 1px 1px 9px black'
      : '0px 4px 4px rgba(0, 0, 0, 0.04)'};
  border-radius: 14px;
  flex: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
  padding: 25px 0;
  @media (max-width: ${device.mobile}) {
    padding: 15px 0;
    height: 160px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    padding: 30px 0;
    height: 250px;
  }
  @media (min-width: ${device.laptop}) {
    height: 290px;
    padding: 35px 0;
  }
`;

export const Text = styled.div`
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  color: ${({ color }: Props) => color};
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  div {
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    text-align: center;
  }
  @media (max-width: ${device.mobile}) {
    font-size: 16px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    font-size: 20px;
  }
`;

export const Wrap = styled.div`
  width: 115px;
  height: 115px;
  border-radius: 50%;
  border: ${({ border }: Props) => border};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: ${device.mobile}) {
    width: 65px;
    height: 65px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    width: 85px;
    height: 85px;
  }
`;

export const PlusIcon = styled(Plus)`
  width: 45px;
  height: 45px;
  @media (max-width: ${device.mobile}) {
    width: 25px;
    height: 25px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    width: 30px;
    height: 30px;
  }
`;

export const ImgDiv = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-width: 50px;
  max-width: 100px;
  min-height: 50px;
  max-height: 100px;
  .lazy-load-image-background {
    height: 100% !important;
  }
`;

export const Img = styled(ImageLazyLoad)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .lazy-load-image-background {
    height: 100% !important;
  }
  /* min-width: 50px;
  max-width: 100px;
  min-height: 50px;
  max-height: 100px; */
`;

export const ChooseText = styled.div`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  color: #223367;
  width: 100%;
  height: fit-content;
  margin: 25px 0;
  @media (min-width: ${device.mobile}) {
    display: none;
  }
`;
