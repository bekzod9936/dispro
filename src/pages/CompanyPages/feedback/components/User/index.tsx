import Modal from 'components/Custom/Modal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
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
} from './style';
import Button from 'components/Custom/Button';
import { Avatar } from '../../style';
interface Props {
  image?: string;
}

const User = ({ image }: Props) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Container onClick={() => setOpen(true)}>
        <Header>
          <LeftHeader>
            <Avatar />
            <WrapText>
              <UserName>Эмма Вудхаус</UserName>
              <Status>Статус: Base 5%</Status>
            </WrapText>
          </LeftHeader>
          <Date margin='5px 0 0 20px'>11.05.2021 10:18</Date>
        </Header>
        <WrapStars>
          {[1, 2, 3, 4, 5].map((v: any) => (
            <StarIcon />
          ))}
        </WrapStars>
        <Context>
          <Title>Отзыв:</Title>
          <Content>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            quidem, adipisci eum doloribus tempora saepe necessitatibus ullam
            labore vero reprehenderit quaerat qui iste quos, ad eaque laudantium
            debitis! Molestiae, sapiente! Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Nostrum quidem, adipisci eum
            doloribus tempora saepe necessitatibus ullam labore vero
          </Content>
          <Title>Кассир:</Title>
          <Casher>Эльпадро</Casher>
        </Context>
      </Container>
      <Modal onClose={(v: boolean) => setOpen(v)} open={open}>
        <ModelContent>
          <ModalWrap>
            <Header>
              <LeftHeader>
                <Avatar />
                <WrapText>
                  <UserName>Эмма Вудхаус</UserName>
                  <Status>Статус: Base 5%</Status>
                </WrapText>
              </LeftHeader>
              <WrapClose>
                <Date margin='10px 10px 0 20px'>11.05.2021 10:18</Date>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </WrapClose>
            </Header>
            <WrapStars>
              {[1, 2, 3, 4, 5].map((v: any) => (
                <StarIcon />
              ))}
            </WrapStars>
            <Context>
              <Title>Отзыв:</Title>
              <ModalContext>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nostrum quidem, adipisci eum doloribus tempora saepe
                necessitatibus ullam labore vero reprehenderit quaerat qui iste
                quos, ad eaque laudantium debitis! Molestiae, sapiente! Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
                quidem, adipisci eum doloribus tempora saepe necessitatibus
              </ModalContext>
              <WrapFillial>
                <Wrapper>
                  <Title>Кассир:</Title>
                  <ModalText>Кудрат Бекендер</ModalText>
                </Wrapper>
                <Wrapper>
                  <Title>Филиал:</Title>
                  <ModalText>
                    Rademakerstraat 14, 3769 BD Soesterberg, Ниде
                  </ModalText>
                </Wrapper>
              </WrapFillial>
              <WrapMoney>
                <MoneyIcon />
                <Wrapper>
                  <ModalText>Операция от 11.06.2021</ModalText>
                  <ModalText>Общая сумма: 350 000 сум</ModalText>
                  <WrapMoney>
                    <ModalText>Скидка: 35 000 сум</ModalText>
                    <ModalText>Оплачено баллами: 35 000</ModalText>
                  </WrapMoney>
                </Wrapper>
              </WrapMoney>
              <Button
                margin={{ laptop: '20px 0 0 0' }}
                startIcon={<MessageIcon />}
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
