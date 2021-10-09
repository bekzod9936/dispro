import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
              <>
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
              </>
            );
          }}
        />
      </div>
    </>
  );
};

export default DataPicker;
