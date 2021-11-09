import React from 'react';
import { MDialog } from './style';

export interface Props {
  onClose?: (v: boolean) => void;
  disableEnforceFocus?: boolean;
  fullScreen?: boolean;
  fullWidth?: boolean;
  open?: boolean;
  children?: any;
  modalStyle?: {
    radius?: number;
    bgcolor?: string;
    border?: string;
    shadow?: string;
    padding?: string;
  };
  width?: {
    maxwidth?: number;
    minwidth?: number;
    width?: string;
  };
  margin?: {
    mobile?: string;
    planshet?: string;
    laptop?: string;
    desktop?: string;
  };
  disableBackdropClick?: boolean;
}

const Modal = ({
  onClose = () => {},
  open = false,
  children,
  ...props
}: Props) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <MDialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      modalStyle={props.modalStyle}
      width={props.width}
      disableBackdropClick={props.disableBackdropClick}
      fullScreen={props.fullScreen}
      fullWidth={props.fullWidth}
    >
      {children}
    </MDialog>
  );
};

export default Modal;
