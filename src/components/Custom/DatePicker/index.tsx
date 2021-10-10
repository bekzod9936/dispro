import { TextField } from '@material-ui/core';
import { DateRangePicker } from '@material-ui/pickers';
import React from 'react';

const DatePicker = () => {
  const [value, setValue] = React.useState<any>([null, null]);

  return (
    <DateRangePicker
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      renderInput={(startProps, endProps) => (
        <>
          <TextField {...startProps} />
          <TextField {...endProps} />
        </>
      )}
    />
  );
};

export default DatePicker;
