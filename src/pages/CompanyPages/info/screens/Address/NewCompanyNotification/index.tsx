import Modal from 'components/Custom/Modal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import Button from 'components/Custom/Buttons/Button';
import photoNote from 'assets/images/goToPhotos.png';
import { Img, ModalContent, WrapHeader, WrapButton } from './style';
import DialogContent from '@material-ui/core/DialogContent';

const Notification = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  return (
    <>
      <Modal
        disableBackdropClick={true}
        onClose={(v: boolean) => setOpen(v)}
        open={open}
      >
        <ModalContent>
          <Img src={photoNote} alt='photonote' />
          <WrapHeader>
            <span> {t('congratulations')}</span>
            <span> {t('newcompanyphototitle')}</span>
            <span> {t('newcompanyphototext')}</span>
          </WrapHeader>

          <WrapButton>
            <Button
              buttonStyle={{
                color: '#223367',
                bgcolor: 'transparent',
              }}
              onClick={() => {
                setOpen(false);
              }}
            >
              {t('back')}
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                history.push('/info/photos');
              }}
            >
              {t('addphoto')}
            </Button>
          </WrapButton>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Notification;
