import Modal from 'components/Custom/Modal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from 'components/Custom/Button';
import dayjs from 'dayjs';
import { useHistory, useLocation } from 'react-router';
import { useAppDispatch } from 'services/redux/hooks';
import { setChosenClientChat } from 'services/redux/Slices/feedback';
import {
  Container,
  Header,
  LeftHeader,
  WrapText,
  UserName,
  Status,
  Date,
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
  Avatar,
} from './style';
import { setCashierId } from 'services/redux/Slices/staffs';
import defuserman from 'assets/icons/defuserman.png';
import defuserwoman from 'assets/icons/defuserwoman.png';

interface Props {
  value?: any;
}

const User = ({ value }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [open, setOpen] = useState<boolean>(false);
  const image = {
    alt: 'image',
    src: value.clientImage
      ? value.clientImage
      : value.clientGenderTypeId === 1
      ? defuserman
      : defuserwoman,
    height: '40px',
    width: '40px',
  };

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
              />
            </Avatar>
            <WrapText>
              <UserName>
                {value.clientFirstName} {value.clientLastName}
              </UserName>
              <Status>{t('status')}: Base 5%</Status>
            </WrapText>
          </LeftHeader>
          <Date margin='5px 0 0 20px'>
            {dayjs(value.createdAt).format('DD.MM.YYYY HH:MM')}
          </Date>
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
              <Content>{value.review}</Content>{' '}
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
      <Modal onClose={(v: boolean) => setOpen(v)} open={open}>
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
                  />
                </Avatar>
                <WrapText>
                  <UserName>
                    {value.clientFirstName} {value.clientLastName}
                  </UserName>
                  <Status>{t('status')}: Base 5%</Status>
                </WrapText>
              </LeftHeader>
              <WrapClose>
                <Date margin='10px 10px 0 20px'>
                  {dayjs(value.createdAt).format('DD.MM.YYYY HH:MM')}
                </Date>
                <IconButton onClick={() => setOpen(false)}>
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
              {value.review ? (
                <>
                  <Title>{t('review')}:</Title>
                  <ModalContext>{value.review}</ModalContext>
                </>
              ) : null}
              <WrapFillial>
                <Wrapper>
                  {value.firstName || value.lastName ? (
                    <>
                      <Title>{t('cashier')}:</Title>
                      <ModalText>
                        {value.firstName} {value.lastName}
                      </ModalText>
                    </>
                  ) : null}
                </Wrapper>
                <Wrapper>
                  <Title>{t('filial')}:</Title>
                  <ModalText>
                    Rademakerstraat 14, 3769 BD Soesterberg, Ниде
                  </ModalText>
                </Wrapper>
              </WrapFillial>
              <WrapMoney>
                <MoneyIcon />
                <Wrapper>
                  <ModalText>Операция от 11.06.2021</ModalText>
                  <ModalText>{t('totalsum')}: 350 000 сум</ModalText>
                  <WrapMoney>
                    <ModalText>{t('sale')}: 35 000 сум</ModalText>
                    <ModalText>{t('paidwithpoints')}: 35 000</ModalText>
                  </WrapMoney>
                </Wrapper>
              </WrapMoney>
              <Button
                margin={{ laptop: '20px 0 0 0' }}
                startIcon={<MessageIcon />}
                onClick={() => {
                  dispatch(setChosenClientChat({ data: value, choose: true }));
                  history.push('/feedback/posts');
                }}
              >
                {t('writemessage')}
              </Button>
            </Context>
          </ModalWrap>
        </ModelContent>
      </Modal>
    </>
  );
};

export default User;
