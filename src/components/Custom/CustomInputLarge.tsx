import { Input, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { SearchIcon } from '../../assets/icons/ClientsPageIcons/ClientIcons';

const useStyles = makeStyles({
  input: {
    width: '90%',
    padding: '18px 30px',
    background: 'white',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 500,
    maxHeight: '62px',
    margin: '18px 0px 18px 0px',
  },
  adornment: {
    marginRight: '40px',
  },
});

interface Iprops {
  onChange?:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
}
const CustomInputLarge: React.FC<Iprops> = ({ onChange }) => {
  const classes = useStyles();
  return (
    <>
      <Input
        className={classes.input}
        onChange={onChange}
        disableUnderline
        startAdornment={
          <InputAdornment position='start' className={classes.adornment}>
            <SearchIcon />
          </InputAdornment>
        }
      />
    </>
  );
};

export default CustomInputLarge;
