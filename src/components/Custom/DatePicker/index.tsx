import { useEffect, useRef, useState } from 'react';
import {
  Container,
  RDatePicker,
  DownIcon,
  WrapText,
  ResetIcon,
  WrapButton,
} from './style';
import Button from 'components/Custom/Button';
import { ReactComponent as Date } from 'assets/icons/date.svg';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import useWindowWidth from 'services/hooks/useWindowWidth';

interface Props {
  onChange?: (e: any) => void;
  margin?: string;
  defaultValue?: string[];
  numberofmonths?: number;
}

const DatePicker = ({
  onChange = () => {},
  margin,
  defaultValue = [''],
  numberofmonths,
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
          startIcon={<Date />}
          endIcon={<DownIcon />}
          onClick={() => datePickerRef.current.openCalendar()}
          buttonStyle={{
            bgcolor: 'white',
            shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
            color: '#223367',
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
