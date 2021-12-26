import Button from 'components/Custom/Buttons/Button';
import Popover from 'components/Custom/Popover';
import { useTranslation } from 'react-i18next';
import Accordion from 'components/Custom/Accordion';
import { useState } from 'react';
import useWindowWidth from 'services/hooks/useWindowWidth';
import FullModal from 'components/Custom/FullModal';
import Modal from 'components/Custom/Modal';
import { IconButton } from '@material-ui/core';
import {
  FilterIcon,
  ResetIcon,
  Content,
  Header,
  Body,
  Footer,
  TickIcon,
  Container,
  WrapHeader,
  WrapTitle,
  CloseIcon,
  BoxWrap,
  FooterModel,
  WrapMain,
  WrapBody,
} from './style';

interface Props {
  list?: { title: string; content: any; value?: string }[];
  onSubmit?: () => void;
  onReset?: () => void;
  error?: boolean;
  position?: number;
}

const Filter = ({
  list,
  onSubmit = () => {},
  onReset = () => {},
  error,
  position,
}: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const [open, setOpen] = useState(false);

  const [closeFun, setCloseFun] = useState<any>();
  const handleClose = (e: any) => {
    setCloseFun(e);
  };

  return width > 1000 ? (
    <Popover
      click={
        <Button
          buttonStyle={{
            shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
            bgcolor: 'white',
            color: '#223367',
            weight: 500,
            fontSize: {
              mobile: 14,
              desktop: 18,
              laptop: 16,
            },
            height: {
              mobile: 36,
            },
          }}
          startIcon={<FilterIcon />}
        >
          {t('filters')}
        </Button>
      }
      anchorOrigin={{ horizontal: 'left', vertical: position || 'bottom' }}
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
              fontSize: {
                mobile: 14,
                desktop: 18,
                laptop: 16,
              },
              height: {
                mobile: 36,
              },
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
              fontSize: {
                mobile: 14,
                desktop: 18,
                laptop: 16,
              },
              height: {
                mobile: 36,
              },
            }}
            endIcon={<TickIcon />}
            disabled={error}
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
  ) : width <= 1000 && width > 600 ? (
    <Container>
      <Button
        buttonStyle={{
          shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
          bgcolor: 'white',
          color: '#223367',
          weight: 500,
          fontSize: {
            mobile: 14,
            desktop: 18,
            laptop: 16,
          },
          height: {
            mobile: 36,
          },
        }}
        startIcon={<FilterIcon />}
        onClick={() => setOpen(true)}
      >
        {t('filters')}
      </Button>
      <Modal open={open} scroll={'body'}>
        <WrapMain>
          <WrapBody>
            <WrapHeader>
              <WrapTitle>{t('filters')}</WrapTitle>
              <IconButton
                style={{ marginRight: '-12px' }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </WrapHeader>
            <BoxWrap>
              <Accordion list={list} />
            </BoxWrap>
          </WrapBody>
          <FooterModel>
            <Button
              buttonStyle={{
                bgcolor: '#F0F1FD',
                color: '#606EEA',
                weight: 500,
                fontSize: {
                  mobile: 14,
                  desktop: 18,
                  laptop: 16,
                },
                height: {
                  mobile: 36,
                },
              }}
              endIcon={<ResetIcon />}
              onClick={() => {
                setOpen(false);
                onReset();
              }}
            >
              {t('reset')}
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
              margin={{ planshet: '0 0 0 20px' }}
              startIcon={<TickIcon />}
              disabled={error}
              onClick={() => {
                setOpen(false);
                onSubmit();
              }}
            >
              {t('apply')}
            </Button>
          </FooterModel>
        </WrapMain>
      </Modal>
    </Container>
  ) : (
    <Container>
      <Button
        buttonStyle={{
          shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
          bgcolor: 'white',
          color: '#223367',
          weight: 500,
          fontSize: {
            mobile: 14,
            desktop: 18,
            laptop: 16,
          },
          height: {
            mobile: 36,
          },
        }}
        startIcon={<FilterIcon />}
        onClick={() => setOpen(true)}
      >
        {t('filters')}
      </Button>
      <FullModal open={open}>
        <WrapMain>
          <WrapBody>
            <WrapHeader>
              <WrapTitle>{t('filters')}</WrapTitle>
              <IconButton
                style={{ marginRight: '-12px' }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </WrapHeader>
            <BoxWrap>
              <Accordion list={list} />
            </BoxWrap>
          </WrapBody>

          <FooterModel>
            <Button
              buttonStyle={{
                bgcolor: '#F0F1FD',
                color: '#606EEA',
                weight: 500,
                fontSize: {
                  mobile: 14,
                  desktop: 18,
                  laptop: 16,
                },
                height: {
                  mobile: 36,
                },
              }}
              endIcon={<ResetIcon />}
              onClick={() => {
                setOpen(false);
                onReset();
              }}
            >
              {t('reset')}
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
              margin={{ mobile: '0 0 0 20px' }}
              startIcon={<TickIcon />}
              disabled={error}
              onClick={() => {
                setOpen(false);
                onSubmit();
              }}
            >
              {t('apply')}
            </Button>
          </FooterModel>
        </WrapMain>
      </FullModal>
    </Container>
  );
};

export default Filter;
