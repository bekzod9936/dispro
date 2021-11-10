import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/Custom/Button';
import Input from 'components/Custom/Input';
import Modal from 'components/Custom/Modal';
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
import SaveButton from 'pages/CompanyPages/info/components/Buttons/SaveButton';
import CancelButton from 'pages/CompanyPages/info/components/Buttons/CancelButton';

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
          <div>{name}</div>
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
            <CancelButton onClick={() => setOpen(false)} />
            <SaveButton
              type='button'
              onClick={() => {
                setOpen(false);
                onChange({
                  name: name,
                  value: item === '' ? inputValue : item,
                });
                setInputValue(item === '' ? inputValue : item);
              }}
            />
          </ModalWrap>
        </ModelContent>
      </Modal>
    </Container>
  );
};

export default Links;
