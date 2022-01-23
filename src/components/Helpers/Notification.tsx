import { Slide, Snackbar } from '@material-ui/core';
import React from 'react';

interface IProps {
  message: string;
  open: boolean;
  handleClose: () => void;
}
const TransitionRight: React.FC<any> = (message: string, { ...props }: any) => {
  return (
    <Slide
      timeout={1000}
      style={{
        border: message.includes('error') ? '1px solid red' : undefined,
        color: message.includes('error') ? 'red' : 'black',
        background: 'white',
        boxShadow: message.includes('error') ? undefined : '2px 2px 2px #ccc',
      }}
      {...props}
      direction='left'
    />
  );
};

const Notification: React.FC<IProps> = ({ open, handleClose, message }) => {
  return (
    <div>
      <Snackbar
        transitionDuration={500}
        autoHideDuration={1500}
        TransitionComponent={TransitionRight.bind(null, message)}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={message}
      />
    </div>
  );
};

export default Notification;
