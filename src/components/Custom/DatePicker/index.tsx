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

interface Props {
  onChange?: (e: any) => void;
  margin?: string;
}

const DatePicker = ({ onChange = () => {}, margin }: Props) => {
  const datePickerRef: any = useRef();
  const { t } = useTranslation();

  const [values, setValues] = useState<any>();
  const [date, setDate] = useState('');
  useEffect(() => {
    setValues(datePickerRef?.current?.childNodes[0]?.attributes?.value?.value);
    setDate(datePickerRef?.current?.childNodes[0]?.attributes?.value?.value);
  }, [datePickerRef?.current?.childNodes[0]?.attributes?.value?.value]);

  useEffect(() => {
    onChange(date);
    datePickerRef.current.closeCalendar();
  }, [date]);

  const handleClick = () => {
    setDate('');
    setValues('');
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
        className='asas'
        ref={datePickerRef}
        range={true}
        onChange={setValues}
        numberOfMonths={2}
        value={''}
        format={format}
      />
    </Container>
  );
};

export default DatePicker;
