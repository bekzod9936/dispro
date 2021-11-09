import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { Props } from './index';
import { device } from '../../../styles/device';

export const MDialog = styled(Dialog)`
  .MuiDialog-root {
    /* z-index: ${({ zIndex }: Props) => (zIndex || 1) + " !important;"};
     */
    z-index: 2500 !important;
  }
  .MuiDialog-paper {
    min-width: ${({ width }: Props) =>
    width?.minwidth ? width?.minwidth : 'fit-content'} !important;
    max-width: ${({ width }: Props) =>
    width?.maxwidth ? width?.maxwidth + "px" : null} !important;
    width: ${({ width }: Props) =>
    width?.width ? width?.width : 'fit-content'} !important;
    overflow: hidden !important;
    background: ${({ modalStyle }: Props) =>
    modalStyle?.bgcolor ? modalStyle?.bgcolor : 'white'} !important;
    border: ${({ modalStyle }: Props) =>
    modalStyle?.border ? modalStyle?.border : 'none'} !important;
    box-shadow: ${({ modalStyle }: Props) =>
    modalStyle?.shadow
      ? modalStyle.shadow
      : '0px 4px 4px rgba(0, 0, 0, 0.04)'} !important;
    margin: ${({ margin }: Props) =>
    margin?.laptop ? margin.laptop : '20px'} !important;
    @media (max-width: ${device.mobile}) {
      margin: ${({ margin }: Props) =>
    margin?.mobile ? margin.mobile : '10px'} !important;
    }
    @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
      margin: ${({ margin }: Props) =>
    margin?.planshet ? margin.planshet : '10px'} !important;
    }
    @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
      margin: ${({ margin }: Props) =>
    margin?.laptop ? margin.laptop : '20px'} !important;
    }
    @media (min-width: ${device.laptop}) {
      margin: ${({ margin }: Props) =>
    margin?.desktop ? margin.desktop : '30px'} !important;
    }
  }
  .MuiPaper-rounded {
    border-radius: ${({ modalStyle }: Props) =>
    modalStyle?.radius ? `${modalStyle.radius}px` : '14px'} !important;
  }
`;
