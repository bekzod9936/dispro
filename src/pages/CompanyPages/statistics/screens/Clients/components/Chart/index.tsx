import Highcharts from 'highcharts/highcharts';
import HighchartsReact from 'highcharts-react-official';
import useChart from './useChart';
import Button from 'components/Custom/Button';
import Modal from 'components/Custom/Modal';
import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import {
  Container,
  Title,
  WrapHeader,
  WrapModalH,
  WrapTitle,
  CloseIcon,
  TickIcon,
  AcrossIcon,
  WrapButtons,
} from './style';

const Chart = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { width } = useWindowWidth();

  useChart();

  const options = {
    chart: {
      type: 'areaspline',
      backgroundColor: '#FFFFFF',
      height: '35%',
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: '',
        data: [0, 2, 1, 4, 3, 6],
        color: 'transparent',
        lineWidth: 6,
        zones: [{ color: '#606EEA' }],
        fillColor: '#e6e6fc',

        marker: {
          fillColor: '#606EEA',
          enabled: false,
          states: {
            hover: {
              lineWidth: '3px',
              lineColor: 'white',
            },
          },
        },
        threshold: null,
      },
    ],
  };

  return (
    <Container>
      <WrapHeader>
        <Title>{t('sortnewclients')}</Title>
      </WrapHeader>
      <Button
        buttonStyle={{
          bgcolor: 'transparent',
          color: '#3492FF',
          fontSize: { laptop: 14 },
          weight: 300,
        }}
        padding={{ laptop: '0' }}
        onClick={() => setOpen(true)}
      >
        {t('chooseperiod')}
      </Button>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <Modal open={open}>
        <WrapModalH>
          <WrapTitle>{t('selectdate')}</WrapTitle>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </WrapModalH>
        <WrapButtons>
          <Button
            buttonStyle={{
              bgcolor: width > 600 ? 'white' : '#eff0fd',
              color: width > 600 ? '#223367' : '#606EEA',
              weight: 500,
            }}
            margin={{
              laptop: '0 30px 0 0',
              mobile: '0 10px 0 0',
            }}
            onClick={() => {
              setOpen(false);
            }}
            startIcon={width > 600 ? <AcrossIcon /> : null}
            endIcon={width < 600 ? <AcrossIcon /> : null}
          >
            {t('cancel')}
          </Button>
          <Button
            buttonStyle={{
              weight: 500,
              shadow: ' 0px 4px 9px rgba(96, 110, 234, 0.46)',
              fontSize: {
                mobile: 14,
                desktop: 18,
                laptop: 16,
              },
              height: {
                mobile: 36,
              },
            }}
            startIcon={<TickIcon />}
            onClick={() => {
              setOpen(false);
            }}
          >
            {t('apply')}
          </Button>
        </WrapButtons>
      </Modal>
    </Container>
  );
};

export default Chart;
