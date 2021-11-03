import { Container, Name, Text, Wrapper } from './style';
import { Avatar } from '../../style';
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import defuserman from 'assets/icons/defuserman.png';
import defuserwoman from 'assets/icons/defuserwoman.png';
interface Props {
  date?: string;
  firstName?: string;
  id?: number;
  image?: string;
  isDeleted?: boolean;
  lastMsg?: string;
  lastName?: string;
  onClick?: (v: any) => void;
  isActive?: boolean;
  clientGenderTypeId?: number;
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
  isActive,
  clientGenderTypeId,
}: Props) => {
  const img = {
    alt: 'image',
    src: image
      ? image
      : clientGenderTypeId === 1
      ? defuserman
      : clientGenderTypeId === 2
      ? defuserwoman
      : '',
    height: '40px',
    width: '40px',
  };

  return (
    <Container bgcolor={isActive ? '#8590eb' : 'transparent'} onClick={onClick}>
      <Avatar>
        <LazyLoadImage
          alt={img.alt}
          height={img.height}
          src={img.src}
          width={img.width}
          effect='blur'
          style={{ objectFit: 'cover' }}
        />
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
