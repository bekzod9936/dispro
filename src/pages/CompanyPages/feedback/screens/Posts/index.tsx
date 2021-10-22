import ChatUser from '../../components/ChatUser';
import Input from 'components/Custom/Input';
import Button from 'components/Custom/Button';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../../style';
import useChatClients from '../../hooks/useChatClients';
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
} from './style';
import { useAppSelector } from 'services/redux/hooks';

const Posts = () => {
  const { t } = useTranslation();

  const { resChatClients } = useChatClients();
  const messages = useAppSelector((state) => state.feedbackPost.messages);

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
        <WrapChatUsers>
          {messages?.map((v: any) => {
            <ChatUser />;
          })}
        </WrapChatUsers>
      </LeftSide>
      <RightSide>
        <Header right={true}>
          <WrapUserInfo>
            <Avatar big={true} />
            <WrapInfo>
              <UserName>asdfas</UserName>
              <Status>asdasdadew</Status>
            </WrapInfo>
          </WrapUserInfo>
          <DotsIcon />
        </Header>
        <Body>
          <ChatPlace>asddds</ChatPlace>
          <WrapInput>
            <Input
              fullWidth={true}
              multiline={true}
              placeholder={t('writeyoutmessage')}
              inputStyle={{ border: 'none', inpadding: '10px 20px' }}
            />
            <InputDown>
              <InputWarn>Вы можете написать еще 3 сообщения</InputWarn>
              <WrapIcons>
                <SmileIcon />
                <ScriptIcon />
                <Button startIcon={<SendIcon />}>{t('send')}</Button>
              </WrapIcons>
            </InputDown>
          </WrapInput>
        </Body>
      </RightSide>
    </Container>
  );
};

export default Posts;
