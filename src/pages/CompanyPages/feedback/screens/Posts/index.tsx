import { useEffect, useState } from 'react';
import ChatUser from '../../components/ChatUser';
import Input from 'components/Custom/Input';
import Button from 'components/Custom/Button';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../../style';
import useChatClients from '../../hooks/useChatClients';
import { useAppSelector } from 'services/redux/hooks';
import defaultChat from 'assets/images/choosechat.png';
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';
import useWindowWidth from 'services/hooks/useWindowWidth';
import {
  Container,
  LeftSide,
  RightSide,
  Header,
  SearchIcon,
  WrapChatUsers,
  WrapUserInfo,
  UserName,
  Status,
  WrapInfo,
  DotsIcon,
  WrapInput,
  Body,
  InputDown,
  ScriptIcon,
  SmileIcon,
  SendIcon,
  InputWarn,
  WrapIcons,
  ChatPlace,
  WrapImg,
  WrapChoose,
  Messages,
  Wrapper,
  DownIcon,
  WrapDown,
  Img,
} from './style';

interface ChProps {
  date?: string;
  firstName?: string;
  id?: number;
  image?: string;
  isDeleted?: boolean;
  lastMsg?: string;
  lastName?: string;
}

// chatType?: number;
// companyId?: number;
// createdAt?: string;
// fromId?: number;
// id?: number;
// msg?: string;
// toId?: number;

const Posts = () => {
  const { t } = useTranslation();

  const { width } = useWindowWidth();
  const [chosen, setChosen] = useState<ChProps>({});

  const { resChatClients, resChatClientHistory } = useChatClients({ chosen });
  const messages = useAppSelector((state) => state.feedbackPost.messages);
  const histories = useAppSelector((state) => state.feedbackPost.histories);
  const socket = useAppSelector((state) => state.feedbackPost.socket);

  const [isChoose, setIsChoose] = useState<boolean>(false);

  const handleChoose = async (v: ChProps) => {
    await setChosen(v);
    await setIsChoose(true);
    await resChatClientHistory.refetch();
  };

  return (
    <Container>
      <LeftSide>
        <Header>
          <Input
            fullWidth={true}
            inputStyle={{
              border: 'none',
              inpadding: '0  5px 0 20px',
              height: { desktop: 50, laptop: 45, planshet: 45, mobile: 40 },
            }}
            placeholder={t('searchthere')}
            IconEnd={<SearchIcon />}
          />
        </Header>
        {resChatClients.isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            loading....
          </div>
        ) : (
          <WrapChatUsers>
            {messages?.map((v: any) => {
              return (
                <ChatUser
                  key={v.id}
                  firstName={v.firstName}
                  image={v.image}
                  lastName={v.lastName}
                  date={v.date}
                  id={v.id}
                  isDeleted={v.isDelete}
                  onClick={() => handleChoose(v)}
                />
              );
            })}
          </WrapChatUsers>
        )}
      </LeftSide>
      <RightSide>
        {isChoose ? (
          <Wrapper>
            <Header right={true}>
              <WrapUserInfo>
                <Avatar big={true}>
                  <ImageLazyLoad
                    objectFit='contain'
                    src={chosen?.image ? chosen?.image : ''}
                    alt='image'
                  />
                </Avatar>
                <WrapInfo>
                  <UserName>
                    {chosen.firstName} {chosen.lastName}
                  </UserName>
                  <Status>Base 5%</Status>
                </WrapInfo>
              </WrapUserInfo>
              <DotsIcon />
            </Header>
            <Body>
              <ChatPlace>
                <Messages>
                  {histories
                    ?.map((v: any) => {
                      return <div>{v.msg}</div>;
                    })
                    .reverse()}
                </Messages>
                {/* <WrapDown>
                  <DownIcon />
                </WrapDown> */}
              </ChatPlace>
              <WrapInput>
                <Input
                  fullWidth={true}
                  multiline={width > 1500 ? true : false}
                  placeholder={t('writeyoutmessage')}
                  inputStyle={{
                    border: 'none',
                    inpadding: width > 1500 ? '10px 20px' : '',
                  }}
                />
                <InputDown>
                  <InputWarn>Вы можете написать еще 400 сообщения</InputWarn>
                  <WrapIcons>
                    <SmileIcon />
                    <ScriptIcon />
                    <Button startIcon={<SendIcon />}>{t('send')}</Button>
                  </WrapIcons>
                </InputDown>
              </WrapInput>
            </Body>
          </Wrapper>
        ) : (
          <WrapImg>
            <Img src={defaultChat} alt='defphoto' />
            <WrapChoose>{t('choseChat')}</WrapChoose>
          </WrapImg>
        )}
      </RightSide>
    </Container>
  );
};

export default Posts;
