import Button from 'components/Custom/Button';
import Popover from 'components/Custom/Popover';
import { useTranslation } from 'react-i18next';
import {
  FilterIcon,
  ResetIcon,
  Content,
  Header,
  Body,
  Footer,
  TickIcon,
} from './style';
import Accordion from 'components/Custom/Accordion';
import { useState } from 'react';

interface Props {
  list?: { title: string; content: any }[];
  onSubmit?: () => void;
  onReset?: () => void;
}

const Filter = ({ list, onSubmit = () => {}, onReset = () => {} }: Props) => {
  const { t } = useTranslation();
  
  const [closeFun, setCloseFun] = useState<any>();
  const handleClose = (e: any) => {
    setCloseFun(e);
  };

  return (
    <Popover
      click={
        <Button
          buttonStyle={{
            shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
            bgcolor: 'white',
            color: '#223367',
            weight: 500,
          }}
          startIcon={<FilterIcon />}
        >
          {t('filters')}
        </Button>
      }
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      popoverStyle={{ marginTop: '20px' }}
      onClose={handleClose}
    >
      <Content>
        <Header>
          {t('filters')}
          <Button
            buttonStyle={{
              bgcolor: 'white',
              color: '#606EEA',
              weight: 500,
            }}
            endIcon={<ResetIcon />}
            onClick={() => {
              closeFun?.close();
              onReset();
            }}
          >
            {t('reset')}
          </Button>
        </Header>
        <Body>
          <Accordion list={list} />
        </Body>
        <Footer>
          <Button
            buttonStyle={{
              weight: 500,
              shadow: ' 0px 4px 9px rgba(96, 110, 234, 0.46)',
            }}
            endIcon={<TickIcon />}
            onClick={() => {
              closeFun?.close();
              onSubmit();
            }}
          >
            {t('apply')}
          </Button>
        </Footer>
      </Content>
    </Popover>
  );
};

export default Filter;
