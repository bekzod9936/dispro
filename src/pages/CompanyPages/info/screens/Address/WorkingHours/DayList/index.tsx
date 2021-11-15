import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, Radio, RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Popover from 'components/Custom/Popover';
import Input from 'components/Custom/Input';
import Button from 'components/Custom/Button';
import useWindowWidth from 'services/hooks/useWindowWidth';
import FullModal from 'components/Custom/FullModal';
import { IconButton } from '@material-ui/core';
import Tabs from '../../../../components/Tabs';
import {
  Container,
  Content,
  Label,
  WrapCheck,
  WrapTime,
  DeleteIcon,
  WorkSign,
  NoBreakIcon,
  SunIcon,
  CoffeeIcon,
  Time,
  Wrapper,
  WrapperTimes,
  GraphWrap,
  WrapHeader,
  CloseIcon,
  Wrap,
} from './style';

interface Props {
  list?: {
    day?: number;
    dayOff?: boolean;
    wHours?: { from?: string; to?: string };
    bHours?: { from?: string; to?: string };
    weekday?: string;
  };
  onCopy?: (e: any) => void;
  onChange?: (e: Props) => void;
  all?: any;
}

const DayList = ({
  list,
  onCopy = () => {},
  onChange = () => {},
  all,
}: Props) => {
  const { t } = useTranslation();
  const [values, setValues] = useState<any>({
    day: 1,
    dayOff: false,
    wHours: { from: '', to: '' },
    bHours: { from: '', to: '' },
    weekday: '',
  });
  const { width } = useWindowWidth();
  const [radio, setRadio] = useState<any>(false);
  const [noon, setNoon] = useState(true);
  const [check, setCheck] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setValues(list);
  }, [list]);

  useEffect(() => {
    setRadio(values.dayOff);
  }, [values]);

  const handleRadio = (e: any) => {
    if (e.target.value === 'dayOff') {
      const value: any = {
        day: values.day,
        dayOff: true,
      };
      onChange(value);
      setRadio(true);
    }
    if (e.target.value === 'dayOn') {
      const value: any = {
        day: values.day,
        dayOff: false,
      };
      onChange(value);
      setRadio(false);
    }
  };

  const handleLunch = () => {
    setNoon(!noon);
  };

  const handleCopy = (e: any) => {
    if (e.target.checked) {
      onCopy(list?.day);
      setCheck(true);
    } else {
      onCopy(null);
      setCheck(false);
    }
  };

  const handleActive = (e: any) => {
    all.forEach((v: any) => {
      if (v.day === e) {
        setValues(v);
      }
    });
  };

  const content = (
    <Content>
      <FormControl style={{ width: '100%' }} component='fieldset'>
        <RadioGroup
          aria-label='position'
          value={radio ? 'dayOff' : 'dayOn'}
          name='position'
          onChange={handleRadio}
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
        <WrapTime>
          <Input
            label={t('starttime')}
            type='time'
            margin={{
              laptop: '10px 20px 20px 0',
            }}
            value={values?.wHours?.from}
            disabled={radio}
            inputStyle={{
              height: {
                laptop: 45,
                desktop: 45,
                planshet: 45,
                mobile: 45,
              },
            }}
            lmargin={{
              laptop: 5,
              desktop: 7,
              mobile: 5,
              planshet: 5,
            }}
            onChange={(e: any) => {
              const value: any = {
                day: values.day,
                wHours: { from: e.target.value },
              };

              onChange(value);
            }}
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
            lmargin={{
              laptop: 5,
              desktop: 7,
              mobile: 5,
              planshet: 5,
            }}
            onChange={(e: any) => {
              const value: any = {
                day: values.day,
                wHours: { to: e.target.value },
              };

              onChange(value);
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
        {noon ? (
          <WrapTime>
            <Input
              label={t('starttime')}
              type='time'
              margin={{
                laptop: '0 20px 20px 0',
              }}
              value={values?.bHours?.from}
              disabled={radio}
              inputStyle={{
                height: {
                  laptop: 45,
                  desktop: 45,
                  planshet: 45,
                  mobile: 45,
                },
              }}
              lmargin={{
                laptop: 5,
                desktop: 7,
                mobile: 5,
                planshet: 5,
              }}
              onChange={(e: any) => {
                const value: any = {
                  day: values.day,
                  bHours: { from: e.target.value },
                };
                onChange(value);
              }}
            />
            <Input
              label={t('endtime')}
              type='time'
              margin={{
                laptop: '0 0 20px',
              }}
              value={values?.bHours?.to}
              disabled={radio}
              inputStyle={{
                height: {
                  laptop: 45,
                  desktop: 45,
                  planshet: 45,
                  mobile: 45,
                },
              }}
              lmargin={{
                laptop: 5,
                desktop: 7,
                mobile: 5,
                planshet: 5,
              }}
              onChange={(e: any) => {
                const value: any = {
                  day: values.day,
                  bHours: { to: e.target.value },
                };
                onChange(value);
              }}
            />
          </WrapTime>
        ) : null}
        <WrapCheck>
          <Checkbox
            id='applyallday'
            color='primary'
            onChange={handleCopy}
            checked={check}
          />
          <Label htmlFor='applyallday'>{t('copydate')}</Label>
        </WrapCheck>
      </FormControl>
    </Content>
  );

  const weeks = [
    {
      day: 1,
      weekday: t('monday'),
    },
    {
      day: 2,
      weekday: t('tuesday'),
    },
    {
      day: 3,
      weekday: t('wednesday'),
    },
    {
      day: 4,
      weekday: t('thursday'),
    },
    {
      day: 5,
      weekday: t('friday'),
    },
    {
      day: 6,
      weekday: t('saturday'),
    },
    {
      day: 7,
      weekday: t('sunday'),
    },
  ];

  return (
    <Container>
      {width < 600 ? (
        <>
          <Button
            width={{ width: '100%', minwidth: 80 }}
            buttonStyle={{
              color: '#223367',
              bgcolor: 'rgba(96, 110, 234, 0.1)',
              weight: 300,
            }}
            onClick={() => {
              setModal(true);
            }}
          >
            {values?.weekday}
          </Button>
          <FullModal open={modal}>
            <Wrap>
              <WrapHeader>
                <GraphWrap>{t('graphWorking')}</GraphWrap>
                <IconButton
                  style={{ marginRight: '-12px' }}
                  onClick={() => setModal(false)}
                >
                  <CloseIcon />
                </IconButton>
              </WrapHeader>
              <Tabs
                listTabs={weeks}
                active={values.day}
                onActive={handleActive}
                content={content}
              />
            </Wrap>
          </FullModal>
        </>
      ) : (
        <Popover
          click={
            <Button
              buttonStyle={{
                color: '#223367',
                bgcolor: 'rgba(96, 110, 234, 0.1)',
                weight: 300,
              }}
              width={{ width: '100%', minwidth: 80 }}
            >
              {values?.weekday}
            </Button>
          }
          popoverStyle={{ margin: '-20px 0 0 0' }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          {content}
        </Popover>
      )}
      {(values.wHours.from !== '' && values.wHours.to !== '') || radio ? (
        <WorkSign>
          {values.dayOff ? (
            <SunIcon />
          ) : (
            <>
              <Time>{values?.wHours?.from}</Time>
              {noon && values?.bHours?.from && values?.bHours?.to ? (
                <Wrapper>
                  <CoffeeIcon />
                  <WrapperTimes>
                    <Time>{values?.bHours?.from}</Time>
                    <Time>{values?.bHours?.to}</Time>
                  </WrapperTimes>
                </Wrapper>
              ) : (
                <NoBreakIcon />
              )}
              <Time>{values?.wHours?.to}</Time>
            </>
          )}
        </WorkSign>
      ) : null}
    </Container>
  );
};

export default DayList;
