import {
  CloseIcon,
  CopyLinkIcon,
  ShareIcon,
} from 'assets/icons/ClientsPageIcons/ClientIcons';
import Button from 'components/Custom/Buttons/Button';
import Input from 'components/Custom/Input';
import QrCode from 'qrcode.react';
import { Buttons, Header, Main, Wrapper } from './style';
import { useState } from 'react';
interface IProps {
  link: string;
  code: string;
  handleClose: () => void;
}
export const MobileQrBar = ({ handleClose, link, code }: IProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if ('clipboard' in navigator) {
      setCopied(true);
      return await navigator.clipboard.writeText(link);
    } else {
      setCopied(true);
      return document.execCommand('copy', true, link);
    }
  };

  return (
    <Wrapper>
      <Header>
        <h6>Код приглашения</h6>
        <CloseIcon onClick={handleClose} />
      </Header>
      <Main>
        <QrCode value={link} size={146} />
        <p>{code}</p>
        <Input
          label='Ссылка на присоединение'
          inputStyle={{ color: '#A5A5A5' }}
          value={link}
        />
      </Main>
      <Buttons>
        <Button
          onClick={handleCopy}
          margin={{ mobile: '0 0 15px 0' }}
          buttonStyle={{ color: '#606EEA', bgcolor: 'rgba(96, 110, 234, 0.1)' }}
          endIcon={<CopyLinkIcon />}
        >
          {copied ? 'Скопировано' : 'Скопировать ссылку'}
        </Button>
        {/* <Button
                    endIcon={<ShareIcon />}>
                    Поделиться
                </Button> */}
      </Buttons>
    </Wrapper>
  );
};
