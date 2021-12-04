import { LazyLoadImage } from 'react-lazy-load-image-component';
import defuserman from 'assets/icons/defuserman.png';
import defuserwoman from 'assets/icons/defuserwoman.png';
import useWindowWidth from 'services/hooks/useWindowWidth';
import App from 'assets/icons/StatistisPage/app.svg';
import {
  Avatar,
  OneCheckIcon,
  DoubleCheckIcoon,
  UnreadIcon,
} from '../../style';
import { Container, Name, Text, Wrapper, WrapName } from './style';

interface Props {
  value: {
    firstName?: string;
    image?: string;
    lastMsg?: string;
    lastName?: string;
    onClick?: (v: any) => void;
    isActive?: boolean;
    clientGenderTypeId?: number;
    chatType?: number;
    status?: number;
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
    chatType,
    status,
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
      : App,
    height: width > 600 ? '40px' : '50px',
    width: width > 600 ? '40px' : '50px',
  };

  const unread = chatType === 1 ? status === 2 ? null : <UnreadIcon /> : null;

  const check =
    chatType === 2 ? (
      status === 1 ? (
        <OneCheckIcon />
      ) : status === 2 ? (
        <DoubleCheckIcoon />
      ) : null
    ) : null;

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
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = App;
          }}
        />
      </Avatar>
      <Wrapper>
        <WrapName>
          <Name>
            <div>
              {firstName} {lastName}
            </div>
            {unread}
          </Name>
          {check}
        </WrapName>
        <Text>{lastMsg}</Text>
      </Wrapper>
    </Container>
  );
};

export default ChatUser;
