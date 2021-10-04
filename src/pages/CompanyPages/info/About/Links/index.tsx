import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/Custom/NButton';
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
  ValueStyle,
} from './style';

interface Props {
  Icon?: any;
  name?: string;
  value?: any;
  onChange?: (e: any) => void;
}

const Links = ({ Icon, name, value, onChange = () => {} }: Props) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [item, setItem] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Container>
      <WrapSocial>
        <WrapLink>
          <WrapLinkIcon>
            <Icon />
          </WrapLinkIcon>
          {name}
        </WrapLink>
        <Button
          buttonStyle={{
            color: value ? '#223367' : '#3492FF',
            bgcolor: 'transparent',
          }}
          onClick={() => setOpen(true)}
        >
          {inputValue ? (
            <>
              {<ValueStyle>{inputValue}</ValueStyle>}
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
            defaultValue={inputValue}
            label={name}
            type='string'
            onChange={(e: any) => {
              setItem(e.target.value);
            }}
            autoFocus={true}
          />
          <ModalWrap>
            <Button
              buttonStyle={{
                color: '#223367',
                bgcolor: 'white',
                weight: '500',
              }}
              onClick={() => setOpen(false)}
              margin={{
                laptop: '0 30px 0 0',
              }}
            >
              <CloseIcon />
              {t('cancel')}
            </Button>
            <Button
              buttonStyle={{
                shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
                radius: 14,
                weight: 500,
              }}
              onClick={() => {
                setOpen(false);
                onChange({
                  name: name,
                  value: item === '' ? inputValue : item,
                });
                setInputValue(item === '' ? inputValue : item);
              }}
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
