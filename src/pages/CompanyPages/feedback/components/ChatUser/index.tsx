import { Container, Name, Text, Wrapper } from './style';
import { Avatar } from '../../style';
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';

interface Props {
  date?: string;
  firstName?: string;
  id?: number;
  image?: string;
  isDeleted?: boolean;
  lastMsg?: string;
  lastName?: string;
  onClick?: (v: any) => void;
}

const ChatUser = ({
  date,
  firstName,
  id,
  image = '',
  isDeleted,
  lastMsg,
  lastName,
  onClick,
}: Props) => {
  return (
    <Container onClick={onClick}>
      <Avatar>
        <ImageLazyLoad objectFit='contain' src={image} alt='image' />
      </Avatar>
      <Wrapper>
        <Name>
          {firstName} {lastName}
        </Name>
        <Text>{lastMsg}</Text>
      </Wrapper>
    </Container>
  );
};

export default ChatUser;
