import React, { useState } from 'react';
import {
  DateRangePicker,
  DateRange,
  DateRangeDelimiter,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { Container, Text } from './style';
import {
  CalendarIcon1,
  CalendarIcon,
} from '../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';

const DataPicker = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div style={{ width: 'fit-content' }}>
        <DateRangePicker
          value={value}
          open={!isOpen}
          onChange={(newValue: any) => setValue(newValue)}
          onClose={() => setIsOpen(!isOpen)}
          renderInput={(startProps, endProps) => {
            return (
              <React.Fragment>
                <Container
                  onClick={() => setIsOpen(!isOpen)}
                  onBlur={() => setIsOpen(!isOpen)}
                >
                  <CalendarIcon />
                  <Text>{t('datePicker')}</Text>
                </Container>
                <TextField
                  {...startProps}
                  variant='standard'
                  helperText=''
                  placeholder=''
                  style={{ display: 'none', width: 'fit-content' }}
                  inputProps={{
                    ...startProps.inputProps,
                    onClick: () => {
                      console.log('sss111');
                    },
                  }}
                />
              </React.Fragment>
            );
          }}
        />
      </div>
      <div>
        <DateRangePicker
          value={value}
          onChange={(newValue: any) => setValue(newValue)}
          renderInput={(startProps, endProps) => {
            console.log(startProps);
            return (
              <React.Fragment>
                <TextField
                  {...startProps}
                  variant='standard'
                  helperText=''
                  placeholder=''
                  style={{ width: 'fit-content' }}
                  inputProps={{
                    ...startProps.inputProps,
                    onFocus: () => {
                      return { ...startProps.inputProps?.onFocus };
                    },
                    onBlur: () => {
                      return startProps?.inputProps?.onBlur;
                    },
                  }}
                />
              </React.Fragment>
            );
          }}
        />
      </div>
    </>
  );
};

export default DataPicker;
