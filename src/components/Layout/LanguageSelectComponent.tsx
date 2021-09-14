import { MenuItem } from '@material-ui/core';
import React from 'react';
import USFlagIcon from '../../assets/icons/USFlagIcon';
import { CustomSelect } from '../../styles/CustomStyles';

const SelectComponent = () => {
  return (
    <>
      <CustomSelect value='En' variant='standard' disableUnderline>
        <MenuItem value='En'>
          <USFlagIcon /> English
        </MenuItem>
      </CustomSelect>
    </>
  );
};

export default SelectComponent;
