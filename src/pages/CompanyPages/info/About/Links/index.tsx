import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/Custom/Button';
import Input from '../../../../../components/Custom/Input';
import Modal from '../../../../../components/Custom/Modal';
import {
  Container,
  WrapLinkIcon,
  WrapLink,
  WrapSocial,
  ModelContent,
  ModalWrap,
  CloseIcon,
  DeleteIcon,
} from './style';
interface Props {
  Icon?: any;
  title?: string;
  value?: any;
}
const Links = ({ Icon, title, value }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <WrapSocial>
        <WrapLink>
          <WrapLinkIcon>
            <Icon />
          </WrapLinkIcon>
          {title}
        </WrapLink>
        <Button
          tcolor={value ? '#223367' : '#3492FF'}
          bgcolor='transparent'
          onClick={() => setOpen(true)}
        >
          {value ? (
            <>
              {value}
              <DeleteIcon />
            </>
          ) : (
            t('connect')
          )}
        </Button>
      </WrapSocial>
      <Modal onClose={(e: boolean) => setOpen(e)} open={open}>
        <ModelContent>
          <Input
            defaultValue={value}
            label={title}
            type='string'
            onChange={(e: any) => console.log(e.target.value)}
          />
          <ModalWrap>
            <Button
              tcolor='#223367'
              bgcolor='white'
              onClick={() => setOpen(false)}
              margin='0 30px 0 0'
              height='50px'
              fontSize={{ max: 17, min: 14 }}
              weight='500'
            >
              <CloseIcon />
              {t('cancel')}
            </Button>
            <Button
              shadow='0px 4px 9px rgba(96, 110, 234, 0.46)'
              radius={14}
              minWidth={100}
              minHeight={40}
              maxHeight={50}
              maxWidth={140}
              fontSize={{ max: 17, min: 14 }}
              weight='500'
            >
              {t('save')}
            </Button>
          </ModalWrap>
        </ModelContent>
      </Modal>
    </Container>
  );
};

export default Links;
