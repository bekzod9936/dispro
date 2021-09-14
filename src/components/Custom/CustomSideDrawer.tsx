import { Drawer } from '@material-ui/core';
import React from 'react';
import { CustomDrawer } from '../../styles/CustomStyles';

interface IDrawer {
  children: any;
}

const CustomSideDrawer: React.FC<IDrawer> = ({ children }) => {
  return <CustomDrawer>{children}</CustomDrawer>;
};

export default CustomSideDrawer;
