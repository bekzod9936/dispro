import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, Radio, RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Popover from '../../../../../../components/Custom/Popover';
import Input from '../../../../../../components/Custom/Input';
import Button from '../../../../../../components/Custom/Button';
import {
  Container,
  Content,
  Label,
  WrapCheck,
  WrapTime,
  DeleteIcon,
} from './style';

interface Props {
  list?: {
    day?: number;
    dayOff?: boolean;
    wHours?: { from?: string; to?: string };
    bHours?: { from?: string; to?: string };
    weekday?: string;
  };
}

const DayList = ({ list }: Props) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Popover
        click={
          <Button
            buttonStyle={{
              color: '#223367',
              bgcolor: 'rgba(96, 110, 234, 0.1)',
              weight: 300,
            }}
          >
            {list?.weekday}
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
        <Content>
          <FormControl component='fieldset'>
            <RadioGroup aria-label='position' name='position'>
              <FormControlLabel
                value='weekends'
                control={<Radio color='primary' />}
                label={t('weekends')}
                labelPlacement='end'
              />
              <FormControlLabel
                value='weekdays'
                control={<Radio color='primary' />}
                label={t('weekdays')}
                labelPlacement='end'
              />
              <WrapTime>
                <Input
                  label={t('starttime')}
                  type='time'
                  margin={{
                    laptop: '20px 20px 25px 0',
                  }}
                />
                <Input
                  label={t('endtime')}
                  type='time'
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                />
              </WrapTime>
              <Button
                buttonStyle={{ color: '#223367', bgcolor: 'transparent' }}
              >
                {t('breaktime')}
                <DeleteIcon />
              </Button>
              <WrapTime>
                <Input
                  label={t('starttime')}
                  type='time'
                  margin={{
                    laptop: '20px 20px 25px 0',
                  }}
                />
                <Input
                  label={t('endtime')}
                  type='time'
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                />
              </WrapTime>
              <WrapCheck>
                <Checkbox id='applyallday' color='primary' />
                <Label htmlFor='applyallday'>{t('24/7')}</Label>
              </WrapCheck>
            </RadioGroup>
          </FormControl>
        </Content>
      </Popover>
    </Container>
  );
};

export default DayList;
