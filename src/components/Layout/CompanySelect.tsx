import { Avatar, MenuItem } from '@material-ui/core';
import React from 'react';
import { CustomSelect } from '../../styles/CustomStyles';

const CompanySelect = () => {
  return (
    <>
      <CustomSelect value='Nasa' variant='standard' disableUnderline>
        <MenuItem value='Nasa'>
          <Avatar src='' /> NASA
        </MenuItem>
      </CustomSelect>
    </>
  );
};

export default CompanySelect;
