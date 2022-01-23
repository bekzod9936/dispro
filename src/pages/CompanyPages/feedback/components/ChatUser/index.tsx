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
    onClick?: (v: any) => void;
    isActive?: boolean;
    data?: any;
  };
}

const ChatUser = ({ value }: Props) => {
  const { onClick, isActive, data } = value;
  const { width } = useWindowWidth();
  const img = {
    alt: 'image',
    src: data.image
      ? data.image
      : data.genderTypeId === 1
      ? defuserman
      : data.genderTypeId === 2
      ? defuserwoman
      : App,
    height: width > 600 ? '40px' : '50px',
    width: width > 600 ? '40px' : '50px',
  };

  const unread =
    data.chatType === 1 ? data.status === 2 ? null : <UnreadIcon /> : null;

  const check =
    data.chatType === 2 ? (
      data.status === 1 ? (
        <OneCheckIcon />
      ) : data.status === 2 ? (
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
              {data.firstName} {data.lastName}
            </div>
            {unread}
          </Name>
          {check}
        </WrapName>
        <Text>{data.lastMsg}</Text>
      </Wrapper>
    </Container>
  );
};

export default ChatUser;
