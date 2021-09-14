import { Modal } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Flex } from '../../styles/BuildingBlocks';
interface IProps {
  open: boolean;
  children?: any;
  rest?: any;
}

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});

const CustomModal: React.FC<IProps> = ({ open, children, ...rest }) => {
  const classes = useStyles();

  return (
    <Modal open={open} disablePortal className={classes.root}>
      {children}
    </Modal>
  );
};

export default CustomModal;
