import SaveButton from '../../../../../components/Buttons/SaveButton';
import Input from 'components/Custom/Input';
import { Checkbox, FormControl, Radio, RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from 'components/Custom/Button';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import {
  FormContainer,
  WrapTime,
  DeleteIcon,
  WrapCheck,
  Label,
  WrapButton,
  Content,
} from './style';

interface vProps {
  day?: number;
  dayOff?: boolean;
  wHours?: { from?: string; to?: string };
  bHours?: { from?: string; to?: string };
  weekday?: string;
  copy?: boolean;
}

interface Props {
  times?: {
    day?: number;
    dayOff?: boolean;
    wHours?: { from?: string; to?: string };
    bHours?: { from?: string; to?: string };
    weekday?: string;
  };
  onChange?: (e: any) => void;
  modal?: any;
}

const initialState = {
  errorwHours: { from: false, to: false },
  errorbHours: { from: false, to: false },
};
const Form = ({ times, onChange = () => {}, modal }: Props) => {
  const { t } = useTranslation();
  const [noon, setNoon] = useState(false);
  const [radio, setRadio] = useState<any>(false);
  const [values, setValues] = useState<vProps>();
  const [errors, setErrors] = useState(initialState);

  const onSubmit = () => {
    if (radio || (values?.wHours?.from !== '' && values?.wHours?.to !== '')) {
      if (noon) {
        if (values?.bHours?.from !== '' && values?.bHours?.to !== '') {
          onChange(values);
          modal(false);
        } else {
          if (values?.bHours?.from === '' && values?.bHours?.to === '') {
            setErrors({
              ...errors,
              errorbHours: { to: true, from: true },
            });
          } else {
            if (values?.bHours?.to === '') {
              setErrors({
                ...errors,
                errorbHours: { ...errors.errorbHours, to: true },
              });
            } else {
              setErrors({
                ...errors,
                errorbHours: { ...errors.errorbHours, from: true },
              });
            }
          }
        }
      } else {
        onChange(values);
        modal(false);
      }
    } else {
      if (values?.wHours?.from === '' && values?.wHours?.to === '') {
        setErrors({
          ...errors,
          errorwHours: { to: true, from: true },
        });
      } else {
        if (values?.wHours?.to === '') {
          setErrors({
            ...errors,
            errorwHours: { ...errors.errorwHours, to: true },
          });
        } else {
          setErrors({
            ...errors,
            errorwHours: { ...errors.errorwHours, from: true },
          });
        }
      }
      if (noon) {
        if (values?.bHours?.from === '' && values?.bHours?.to === '') {
          setErrors({
            ...errors,
            errorbHours: { to: true, from: true },
          });
        } else {
          if (values?.bHours?.to === '') {
            setErrors({
              ...errors,
              errorbHours: { ...errors.errorbHours, to: true },
            });
          } else {
            setErrors({
              ...errors,
              errorbHours: { ...errors.errorbHours, from: true },
            });
          }
        }
      }
    }
  };

  const handleLunch = () => {
    setNoon(!noon);
  };

  useEffect(() => {
    setValues(times);
    setRadio(times?.dayOff);
    if (times?.bHours?.from !== '' && times?.bHours?.to !== '') {
      setNoon(true);
    }
    setErrors(initialState);
  }, [times]);

  const handleRadio = (e: any) => {
    console.log(e.target.value);
    if (e.target.value === 'dayOff') {
      setRadio(true);
      setValues((old) => {
        return { ...old, dayOff: true };
      });
    }
    if (e.target.value === 'dayOn') {
      setRadio(false);
      setValues((old) => {
        return { ...old, dayOff: false };
      });
    }
  };
  console.log(values);
  return (
    <FormContainer>
      <Content>
        <FormControl style={{ width: '100%' }} component='fieldset'>
          <RadioGroup
            onChange={handleRadio}
            defaultValue='dayOn'
            value={radio ? 'dayOff' : 'dayOn'}
            aria-label='position'
          >
            <FormControlLabel
              value='dayOff'
              control={<Radio color='primary' />}
              label={t('weekends')}
              labelPlacement='end'
            />
            <FormControlLabel
              value='dayOn'
              control={<Radio color='primary' />}
              label={t('weekdays')}
              labelPlacement='end'
            />
          </RadioGroup>
        </FormControl>
        <WrapTime>
          <Input
            label={t('starttime')}
            type='time'
            margin={{
              laptop: '10px 20px 20px 0',
            }}
            inputStyle={{
              height: {
                laptop: 45,
                desktop: 45,
                planshet: 45,
                mobile: 45,
              },
            }}
            value={values?.wHours?.from}
            disabled={radio}
            lmargin={{
              laptop: 5,
              desktop: 7,
              mobile: 5,
              planshet: 5,
            }}
            onChange={(e) => {
              setValues({
                ...values,
                wHours: { ...values?.wHours, from: e.target.value },
              });
            }}
            error={errors.errorwHours.from}
          />
          <Input
            label={t('endtime')}
            type='time'
            margin={{
              laptop: '10px 0 20px',
            }}
            value={values?.wHours?.to}
            disabled={radio}
            inputStyle={{
              height: {
                laptop: 45,
                desktop: 45,
                planshet: 45,
                mobile: 45,
              },
            }}
            error={errors.errorwHours.to}
            onChange={(e) => {
              setValues({
                ...values,
                wHours: { ...values?.wHours, to: e.target.value },
              });
            }}
            lmargin={{
              laptop: 5,
              desktop: 7,
              mobile: 5,
              planshet: 5,
            }}
          />
        </WrapTime>
        <Button
          buttonStyle={{
            color: noon ? '#223367' : '#3492FF',
            bgcolor: 'transparent',
          }}
          padding={{
            laptop: '0',
            desktop: '0',
            planshet: '0',
            mobile: '0',
          }}
          onClick={handleLunch}
        >
          {noon ? (
            <>
              {t('breaktime')}
              <DeleteIcon />
            </>
          ) : (
            t('addbreaktime')
          )}
        </Button>
        {noon || values?.bHours?.to || values?.bHours?.from ? (
          <WrapTime>
            <Input
              label={t('starttime')}
              type='time'
              margin={{
                laptop: '10px 20px 20px 0',
              }}
              disabled={radio}
              inputStyle={{
                height: {
                  laptop: 45,
                  desktop: 45,
                  planshet: 45,
                  mobile: 45,
                },
              }}
              value={values?.bHours?.from}
              onChange={(e) => {
                setValues({
                  ...values,
                  bHours: { ...values?.bHours, from: e.target.value },
                });
              }}
              lmargin={{
                laptop: 5,
                desktop: 7,
                mobile: 5,
                planshet: 5,
              }}
              error={errors.errorbHours.from}
            />
            <Input
              label={t('endtime')}
              type='time'
              margin={{
                laptop: '10px 0 20px',
              }}
              disabled={radio}
              inputStyle={{
                height: {
                  laptop: 45,
                  desktop: 45,
                  planshet: 45,
                  mobile: 45,
                },
              }}
              value={values?.bHours?.to}
              onChange={(e) => {
                setValues({
                  ...values,
                  bHours: { ...values?.bHours, to: e.target.value },
                });
              }}
              lmargin={{
                laptop: 5,
                desktop: 7,
                mobile: 5,
                planshet: 5,
              }}
              error={errors.errorbHours.to}
            />
          </WrapTime>
        ) : null}
        <WrapCheck>
          <Checkbox
            onChange={(e) => setValues({ ...values, copy: e.target.checked })}
            id='applyallday'
            color='primary'
          />
          <Label htmlFor='applyallday'>{t('copydate')}</Label>
        </WrapCheck>
      </Content>
      <WrapButton>
        <SaveButton
          margin={{
            laptop: '20px 0 0',
            mobile: '0',
          }}
          type='button'
          onClick={onSubmit}
        />
      </WrapButton>
    </FormContainer>
  );
};

export default Form;
