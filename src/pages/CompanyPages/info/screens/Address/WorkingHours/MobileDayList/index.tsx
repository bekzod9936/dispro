import Button from 'components/Custom/Button';
import { useState } from 'react';
import {
  Container,
  WrapHeader,
  GraphWrap,
  CloseIcon,
  ModalContainer,
  Appbar,
  MMTabs,
  MTab,
  ModalWrap,
  WorkSign,
  SunIcon,
  Time,
  Wrapper,
  CoffeeIcon,
  WrapperTimes,
  NoBreakIcon,
} from './style';
import FullModal from 'components/Custom/FullModal';
import useDayList from './useDayList';
import { IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Form from './Form';

interface Props {
  list?: {
    day?: number;
    dayOff?: boolean;
    wHours?: { from?: string; to?: string };
    bHours?: { from?: string; to?: string };
    weekday?: string;
  }[];
  onChange?: (e: any) => void;
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MobileDaylist = ({ list, onChange }: Props) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const { weeks } = useDayList();
  const [active, setActive] = useState<any>('');
  const [times, setTimes] = useState();

  const handleChange = (event: any, newValue: any) => {
    setActive(newValue);
    let newArr1: any = list?.filter((v) => v.day === newValue);
    setTimes(newArr1[0]);
  };

  return (
    <>
      {list?.map((v: any) => (
        <Container>
          <Button
            width={{ width: '100%', minwidth: 80 }}
            buttonStyle={{
              color: '#223367',
              bgcolor: 'rgba(96, 110, 234, 0.1)',
              weight: 300,
            }}
            onClick={() => {
              setModal(true);
              setActive(v.day);
              let newArr1: any = list?.filter((a) => a.day === v.day);
              setTimes(newArr1[0]);
            }}
          >
            {v?.weekday}
          </Button>
          {(v.wHours.from !== '' && v.wHours.to !== '') || v.dayOff ? (
            <WorkSign>
              {v.dayOff ? (
                <SunIcon />
              ) : (
                <>
                  <Time>{v?.wHours?.from}</Time>
                  {v?.bHours?.from && v?.bHours?.to ? (
                    <Wrapper>
                      <CoffeeIcon />
                      <WrapperTimes>
                        <Time>{v?.bHours?.from}</Time>
                        <Time>{v?.bHours?.to}</Time>
                      </WrapperTimes>
                    </Wrapper>
                  ) : (
                    <NoBreakIcon />
                  )}
                  <Time>{v?.wHours?.to}</Time>
                </>
              )}
            </WorkSign>
          ) : null}
        </Container>
      ))}
      <FullModal open={modal}>
        <ModalWrap>
          <WrapHeader>
            <GraphWrap>{t('graphWorking')}</GraphWrap>
            <IconButton
              style={{ marginRight: '-12px' }}
              onClick={() => setModal(false)}
            >
              <CloseIcon />
            </IconButton>
          </WrapHeader>
          <ModalContainer>
            <Appbar position='static'>
              <MMTabs
                value={active}
                onChange={handleChange}
                aria-label='simple tabs example'
                selectionFollowsFocus={true}
                variant={'scrollable'}
              >
                {weeks?.map((v) => {
                  return (
                    <MTab
                      key={v.day}
                      value={v.day}
                      label={v.weekday}
                      {...a11yProps(v.day)}
                    />
                  );
                })}
              </MMTabs>
            </Appbar>
            <TabPanel value={active} index={active}>
              <Form times={times} onChange={onChange} modal={setModal} />
            </TabPanel>
          </ModalContainer>
        </ModalWrap>
      </FullModal>
    </>
  );
};

export default MobileDaylist;
