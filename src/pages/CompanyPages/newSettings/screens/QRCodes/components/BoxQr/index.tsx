import { useState } from 'react';
import {
  Box,
  BoxTitle,
  BoxHeader,
  BoxBody,
  WrapButtons,
  WrapList,
} from './style';
import {
  DotsIcon,
  DownLoadIcon,
  ChainIcon,
  CloseIcon,
} from 'newassets/icons/icons';
import Popover from 'components/Custom/Popover';
import Button from 'components/Custom/Buttons/Button';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import QRCode from 'qrcode.react';
import { downloadQR } from './canvas';
import { copyToClipboard } from 'services/utils';
import Modal from 'components/Custom/Modal';
import Input from 'components/Custom/Input';
import { CancelButton } from 'components/Custom/Buttons/Cancel';
import { SaveButton } from 'components/Custom/Buttons/Save';
import {
  ModalText,
  ModalWrap,
  ModalHeader,
  ModalButtons,
  ModalTitle,
} from '../../style';

interface Props {
  value?: {
    companyId?: number;
    dynLinkToken?: any;
    id?: number;
    referType?: number;
    source?: string;
    token?: string;
    userId?: number;
  };
}

const BoxQr = ({ value }: Props) => {
  const { t } = useTranslation();
  const [closeFun, setCloseFun] = useState<any>(null);

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const downloadQrCode = () => {
    const canvas = document.getElementById(
      `referral-qr-code-${value?.id}`
    ) as HTMLCanvasElement;
    downloadQR(canvas);
  };

  return (
    <>
      <Box>
        <BoxHeader>
          <BoxTitle>{value?.source}</BoxTitle>
          <Popover
            click={
              <IconButton>
                <DotsIcon />
              </IconButton>
            }
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            radius={14}
            onClose={(e: any) => setCloseFun(e)}
          >
            <WrapList>
              <ul>
                <li
                  onClick={() => {
                    setOpenEdit(true);
                    closeFun.close();
                  }}
                >
                  {t('edit')}
                </li>
                <li className='delete'>{t('delete')}</li>
              </ul>
            </WrapList>
          </Popover>
        </BoxHeader>
        <BoxBody>
          <QRCode
            id={`referral-qr-code-${value?.id}`}
            value={value?.dynLinkToken}
            size={120}
            fgColor={'#223367'}
            level={'L'}
          />
          <WrapButtons>
            <Button
              startIcon={<DownLoadIcon />}
              buttonStyle={{ shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' }}
              onClick={downloadQrCode}
            >
              {t('downloadPNG')}
            </Button>
            <Button
              endIcon={<ChainIcon />}
              onClick={() => copyToClipboard(value?.dynLinkToken)}
              buttonStyle={{ bgcolor: '#eff0fd', color: ' #606EEA' }}
              margin={{ laptop: '0 30px 0 0' }}
            >
              {t('copyLink')}
            </Button>
          </WrapButtons>
        </BoxBody>
      </Box>
      <Modal open={openEdit}>
        <ModalWrap>
          <ModalHeader>
            <ModalTitle>{t('editqrcode')}</ModalTitle>
            <IconButton
              onClick={() => {
                setOpenEdit(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <ModalText>{t('changenameqrcode')}</ModalText>
          <Input margin={{ desktop: '30px 0' }} label={t('enterNewName')} />
          <ModalButtons>
            <CancelButton
              onClick={() => {
                setOpenEdit(false);
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

export default BoxQr;
