import Modal from 'components/Custom/Modal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from 'components/Custom/Button';
import { Avatar } from '../../style';
import dayjs from 'dayjs';
import { useHistory, useLocation } from 'react-router';
import { useAppDispatch } from 'services/redux/hooks';
import { setChosenClientChat } from 'services/redux/Slices/feedback';
import { setCashierId } from 'services/redux/Slices/staffs';
import defuserman from 'assets/icons/defuserman.png';
import defuserwoman from 'assets/icons/defuserwoman.png';
import useWindowWidth from 'services/hooks/useWindowWidth';
import FullModal from 'components/Custom/FullModal';
import App from 'assets/icons/StatistisPage/app.svg';
import {
  Container,
  Header,
  LeftHeader,
  WrapText,
  UserName,
  Status,
  Date1,
  Title,
  StarIcon,
  WrapStars,
  Context,
  Casher,
  Content,
  ModelContent,
  ModalWrap,
  CloseIcon,
  ModalContext,
  WrapClose,
  MessageIcon,
  ModalText,
  Wrapper,
  WrapFillial,
  MoneyIcon,
  WrapMoney,
  WrapButton,
  WrapMContent,
  WrapDates,
} from './style';

interface Props {
  value?: any;
}

const User = ({ value }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { width } = useWindowWidth();

  const [open, setOpen] = useState<boolean>(false);
  dispatch(setChosenClientChat({ data: {}, choose: false }));
  const image = {
    alt: 'image',
    src: value.clientImage
      ? value.clientImage
      : value.clientGenderTypeId === 1
      ? defuserman
      : defuserwoman,
    height: width > 600 ? '40px' : '50px',
    width: width > 600 ? '40px' : '50px',
  };

  const modalcontent = (
    <ModelContent>
      <ModalWrap>
        <Header>
          <LeftHeader>
            <Avatar>
              <LazyLoadImage
                alt={image.alt}
                height={image.height}
                src={image.src}
                width={image.width}
                effect='blur'
                style={{ objectFit: 'cover' }}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = App;
                }}
              />
            </Avatar>
            <WrapText>
              <UserName>
                {value.clientFirstName} {value.clientLastName}
              </UserName>
              <Status>
                {t('status')}:
                {` ${value?.obtainProgramLoyalty?.levelName} ${value?.obtainProgramLoyalty?.percent}%`}
              </Status>
            </WrapText>
          </LeftHeader>
          <WrapClose>
            {width > 600 ? (
              <Date1 margin='3px 10px 0 20px'>
                <div>{dayjs(value.createdAt).format('DD.MM.YYYY HH:mm')}</div>
              </Date1>
            ) : null}
            <IconButton
              style={{ marginTop: '-12px' }}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </WrapClose>
        </Header>
        <WrapStars>
          {[1, 2, 3, 4, 5].map((v: any) => (
            <StarIcon bgcolor={value.rating >= v} />
          ))}
        </WrapStars>
        <Context>
          <WrapMContent>
            {value.review ? (
              <>
                <Title>{t('review')}:</Title>
                <ModalContext>{value.review}</ModalContext>
              </>
            ) : null}
            <WrapFillial>
              {value.firstName || value.lastName ? (
                <Wrapper>
                  <Title>{t('cashier')}:</Title>
                  <ModalText>
                    {value.firstName} {value.lastName}
                  </ModalText>
                </Wrapper>
              ) : null}
              <Wrapper>
                <Title>{t('filial')}:</Title>
                <ModalText>{value.storeName}</ModalText>
              </Wrapper>
            </WrapFillial>
            <WrapMoney>
              <MoneyIcon />
              <Wrapper>
                <ModalText>
                  Операция от {dayjs(value.payDate).format('DD.MM.YYYY')}
                </ModalText>
                <ModalText>
                  {t('totalsum')}: {`${value.totalAmount} сум`}
                </ModalText>
                <WrapMoney>
                  <ModalText>
                    {t('sale')}: {`${value.amountReturned} сум`}
                  </ModalText>
                  <ModalText>
                    {t('paidwithpoints')}: {value.usedPointAmount}
                  </ModalText>
                </WrapMoney>
              </Wrapper>
            </WrapMoney>
          </WrapMContent>
          <WrapButton>
            <Button
              margin={{ laptop: '20px 0 0 0' }}
              startIcon={<MessageIcon />}
              onClick={() => {
                dispatch(setChosenClientChat({ data: value, choose: true }));
                history.push('/feedback/posts');
              }}
              buttonStyle={{ shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' }}
            >
              {t('writemessage')}
            </Button>
          </WrapButton>
        </Context>
      </ModalWrap>
    </ModelContent>
  );

  return (
    <>
      <Container onClick={() => setOpen(true)}>
        <Header>
          <LeftHeader>
            <Avatar>
              <LazyLoadImage
                alt={image.alt}
                height={image.height}
                src={image.src}
                width={image.width}
                effect='blur'
                style={{ objectFit: 'cover' }}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = App;
                }}
              />
            </Avatar>
            <WrapText>
              <WrapDates>
                <UserName>
                  {value.clientFirstName} {value.clientLastName}
                </UserName>
                <Date1 margin='3px 0 0 20px'>
                  <div className='laptop'>
                    {dayjs(value.createdAt).format('DD.MM.YYYY HH:mm')}
                  </div>
                  <div className='mobile'>
                    {dayjs(value.createdAt).format('DD.MM.YYYY')}
                  </div>
                  <div className='mobile'>
                    {dayjs(value.createdAt).format('HH:mm')}
                  </div>
                </Date1>
              </WrapDates>
              <Status>
                {t('status')}:
                {` ${value?.obtainProgramLoyalty?.levelName} ${value?.obtainProgramLoyalty?.percent}%`}
              </Status>
            </WrapText>
          </LeftHeader>
        </Header>
        <WrapStars>
          {[1, 2, 3, 4, 5].map((v: any) => (
            <StarIcon bgcolor={value.rating >= v} />
          ))}
        </WrapStars>
        <Context>
          {value.review ? (
            <>
              <Title>{t('review')}:</Title>
              <Content>{value.review}</Content>
            </>
          ) : null}
          {value.firstName || value.lastName ? (
            <>
              <Title>{t('cashier')}:</Title>
              <Casher
                onClick={() => {
                  history.push({
                    pathname: '/staff/cashier/statistic',
                    state: {
                      prevPage: location.pathname,
                      id: value?.cashierId,
                    },
                  });
                  dispatch(setCashierId(value?.cashierId));
                }}
              >
                {value.firstName} {value.lastName}
              </Casher>
            </>
          ) : null}
        </Context>
      </Container>
      {width > 600 ? (
        <Modal scroll='body' onClose={(v: boolean) => setOpen(v)} open={open}>
          {modalcontent}
        </Modal>
      ) : (
        <FullModal open={open}>{modalcontent}</FullModal>
      )}
    </>
  );
};

export default User;
