import Button from 'components/Custom/Buttons/Button';
import Popover from 'components/Custom/Popover';
import Modal from 'components/Custom/Modal';
import Input from 'components/Custom/Input';
import { SquarePlusIcon, DownIcon } from 'newassets/icons/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WrapList } from '../../style';
import { CancelButton } from 'components/Custom/Buttons/Cancel';
import { SaveButton } from 'components/Custom/Buttons/Save';

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
      <Modal open={openSubscribe}>
        <div>{(t('createqrforcompany'), t('forcomfortqrcodeplace'))}</div>
        <Input label={t('enterNewName')} />
        <CancelButton />
        <SaveButton />
      </Modal>
      <Modal open={openPayment}></Modal>
    </>
  );
};

export default CreateQrCode;
