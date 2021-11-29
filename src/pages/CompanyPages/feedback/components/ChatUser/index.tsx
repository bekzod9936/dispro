import { LazyLoadImage } from 'react-lazy-load-image-component';
import defuserman from 'assets/icons/defuserman.png';
import defuserwoman from 'assets/icons/defuserwoman.png';
import useWindowWidth from 'services/hooks/useWindowWidth';
import {
  Avatar,
  OneCheckIcon,
  DoubleCheckIcoon,
  UnreadIcon,
} from '../../style';
import { Container, Name, Text, Wrapper } from './style';

interface Props {
  value: {
    firstName?: string;
    image?: string;
    lastMsg?: string;
    lastName?: string;
    onClick?: (v: any) => void;
    isActive?: boolean;
    clientGenderTypeId?: number;
  };
}

const ChatUser = ({ value }: Props) => {
  const {
    firstName,
    image = '',
    lastMsg,
    lastName,
    onClick,
    isActive,
    clientGenderTypeId,
  } = value;
  const { width } = useWindowWidth();
  const img = {
    alt: 'image',
    src: image
      ? image
      : clientGenderTypeId === 1
      ? defuserman
      : clientGenderTypeId === 2
      ? defuserwoman
      : '',
    height: width > 600 ? '40px' : '50px',
    width: width > 600 ? '40px' : '50px',
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
      </Avatar>
      <Wrapper>
        <Name>
          {firstName} {lastName} <OneCheckIcon /> <DoubleCheckIcoon />
          <UnreadIcon />
        </Name>
        <Text>{lastMsg}</Text>
      </Wrapper>
    </Container>
  );
};

export default ChatUser;
