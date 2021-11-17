import { useEffect, useRef, useState } from 'react';
import {
  Container,
  RDatePicker,
  DownIcon,
  WrapText,
  ResetIcon,
  WrapButton,
  DateIcon,
} from './style';
import Button from 'components/Custom/Button';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import useWindowWidth from 'services/hooks/useWindowWidth';

interface Props {
  onChange?: (e: any) => void;
  margin?: string;
  defaultValue?: string[];
  numberofmonths?: number;
  height?: {
    mobile?: number;
    planshet?: number;
    laptop?: number;
    desktop?: number;
  };
}

const DatePicker = ({
  onChange = () => {},
  margin,
  defaultValue = [''],
  numberofmonths,
  height
}: Props) => {
  const datePickerRef: any = useRef();
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const [values, setValues] = useState<any>(defaultValue);

  const [date, setDate] = useState('');
  const handleChange = (e: any) => {
    setValues(e);
  };
  useEffect(() => {
    if (values?.length === 2) {
      onChange(datePickerRef?.current?.childNodes[0]?.attributes?.value?.value);
      datePickerRef.current.closeCalendar();
      setDate(datePickerRef?.current?.childNodes[0]?.attributes?.value?.value);
    }
  }, [datePickerRef?.current?.childNodes[0]?.attributes?.value?.value, values]);

  const handleClick = () => {
    setDate('');
    setValues('');
    onChange('');
  };

  const format = 'YYYY-MM-DD';

  return (
    <Container>
      <WrapButton margin={margin}>
        <Button
          startIcon={<DateIcon />}
          endIcon={width > 600 ? <DownIcon /> : null}
          onClick={() => datePickerRef.current.openCalendar()}
          buttonStyle={{
            bgcolor: 'white',
            shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
            color: '#223367',
            height: height ? height :   {
              mobile: 36,
              desktop: 60,
              laptop: 50
            },
          }}
        >
          <WrapText>
            <span>{t('datePicker')}</span>
            <span>{date}</span>
          </WrapText>
        </Button>
        {date === '' ? null : (
          <IconButton onClick={handleClick}>
            <ResetIcon />
          </IconButton>
        )}
      </WrapButton>
      <RDatePicker
        inputClass='custom-input'
        ref={datePickerRef}
        range={true}
        onChange={handleChange}
        numberOfMonths={numberofmonths ? numberofmonths : width > 600 ? 2 : 1}
        value={values}
        format={format}
        portal={true}
      />
    </Container>
  );
};

export default DatePicker;
