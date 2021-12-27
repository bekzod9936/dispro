import Button from 'components/Custom/Buttons/Button';
import Popover from 'components/Custom/Popover';
import Modal from 'components/Custom/Modal';
import MultiSelect from 'components/Custom/MultiSelect';
import Input from 'components/Custom/Input';
import {
  SquarePlusIcon,
  DownIcon,
  CloseIcon,
  StoreIcon,
} from 'newassets/icons/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WrapList } from '../../style';
import { CancelButton } from 'components/Custom/Buttons/Cancel';
import { SaveButton } from 'components/Custom/Buttons/Save';
import {
  ModalText,
  ModalWrap,
  ModalHeader,
  ModalButtons,
  ModalTitle,
} from '../../style';
import { IconButton } from '@material-ui/core';

const CreateQrCode = () => {
  const { t } = useTranslation();
  const [closeFun, setCloseFun] = useState<any>(null);
  const [openSubscribe, setOpenSubscribe] = useState<boolean>(false);
  const [openPayment, setOpenPayment] = useState<boolean>(false);

  return (
    <>
      <Popover
        click={
          <Button
            startIcon={<SquarePlusIcon />}
            endIcon={<DownIcon style={{ marginLeft: '40px' }} />}
            buttonStyle={{
              bgcolor: 'white',
              color: '#223367',
              weight: 500,
              shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
              height: {
                desktop: 50,
                laptop: 45,
              },
            }}
            margin={{ laptop: '0 20px 0 0' }}
          >
            {t('create')}
          </Button>
        }
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        radius={14}
        popoverStyle={{ marginTop: '20px' }}
        onClose={(e: any) => setCloseFun(e)}
      >
        <WrapList>
          <ul>
            <li
              onClick={() => {
                closeFun.close();
                setOpenSubscribe(true);
              }}
            >
              {t('forDownload')}
            </li>
            <li
              onClick={() => {
                closeFun.close();
                setOpenPayment(true);
              }}
            >
              {t('forP2p')}
            </li>
          </ul>
        </WrapList>
      </Popover>
      <Modal open={openSubscribe || openPayment}>
        <ModalWrap>
          <ModalHeader>
            <ModalTitle>
              {openSubscribe && !openPayment
                ? t('createqrforcompany')
                : t('qrforpaymentplace')}
            </ModalTitle>
            <IconButton
              onClick={() => {
                setOpenSubscribe(false);
                setOpenPayment(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <ModalText>
            {openSubscribe && !openPayment
              ? t('forcomfortqrcodeplace')
              : t('choosefilialqrcodesetting')}
          </ModalText>
          {openSubscribe && !openPayment ? (
            <Input margin={{ desktop: '30px 0' }} label={t('enterNewName')} />
          ) : (
            <MultiSelect
              isMulti={false}
              margin={{ laptop: '30px 0' }}
              icon={<StoreIcon />}
              selectStyle={{
                bgcolor: '#eff0fd',
                border: 'none',
                placeholdercolor: '#223367',
                inpadding: '2px 10px 2px 60px',
                placewieght: '500',
              }}
              iconleft={'20px'}
              icondowncolor='#C4C4C4'
              placeholder={t('choose_branch')}
              isClearable={false}
              menuPortalTarget={document.body}
            />
          )}
          <ModalButtons>
            <CancelButton
              onClick={() => {
                setOpenSubscribe(false);
                setOpenPayment(false);
              }}
              margin={{ laptop: '0 15px 0 0' }}
            />
            <SaveButton />
          </ModalButtons>
        </ModalWrap>
      </Modal>
    </>
  );
};

export default CreateQrCode;
