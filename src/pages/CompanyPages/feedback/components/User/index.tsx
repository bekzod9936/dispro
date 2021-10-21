import {
  Container,
  Header,
  LeftHeader,
  WrapText,
  Avatar,
  UserName,
  Status,
  Date,
  Title,
  StarIcon,
  WrapStars,
  Context,
  Casher,
  Content,
} from './style';

const User = () => {
  return (
    <Container>
      <Header>
        <LeftHeader>
          <Avatar />
          <WrapText>
            <UserName>Эмма Вудхаус</UserName>
            <Status>Статус: Base 5%</Status>
          </WrapText>
        </LeftHeader>
        <Date>11.05.2021 10:18</Date>
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
          debitis! Molestiae, sapiente! Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Nostrum quidem, adipisci eum doloribus tempora saepe
          necessitatibus ullam labore vero reprehenderit quaerat qui iste quos,
          ad eaque laudantium debitis! Molestiae, sapiente! Lorem ipsum dolor
          sit amet consectetur, adipisicing elit. Nostrum quidem, adipisci eum
          doloribus tempora saepe necessitatibus ullam labore vero reprehenderit
          quaerat qui iste quos, ad eaque laudantium debitis! Molestiae,
          sapiente! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Nostrum quidem, adipisci eum doloribus tempora saepe necessitatibus
          ullam labore vero reprehenderit quaerat qui iste quos, ad eaque
          laudantium debitis! Molestiae, sapiente! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Nostrum quidem, adipisci eum doloribus
          tempora saepe necessitatibus ullam labore vero reprehenderit quaerat
          qui iste quos, ad eaque laudantium debitis! Molestiae, sapiente! Lorem
          ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quidem,
          adipisci eum doloribus tempora saepe necessitatibus ullam labore vero
          reprehenderit quaerat qui iste quos, ad eaque laudantium debitis!
          Molestiae, sapiente!
        </Content>
        <Title>Кассир:</Title>
        <Casher>Эльпадро</Casher>
      </Context>
    </Container>
  );
};

export default User;
