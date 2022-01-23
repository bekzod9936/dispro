import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';
import { WrapperModal, CloseButton, Buttons } from './style';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { useTranslation } from 'react-i18next';
import { SendIcon, MobileCancelIcon } from 'assets/icons/news/newsIcons';

interface LimitNewsModal {
  errormessage?: boolean;
  linkToComment: () => void;
  CancelError: () => void;
}

export const LimitNews = ({
  errormessage,
  linkToComment,
  CancelError,
}: LimitNewsModal) => {
  const { width } = useWindowWidth();
  const { t } = useTranslation();
  return (
    <Modal modalStyle={{ bgcolor: '#fff' }} open={errormessage}>
      <WrapperModal>
        <h3>{t('Лимит новостей исчерпан')}</h3>
        <p>
          {t('Для более подробной информации, просим обратиться к Модератору')}
        </p>
        {width > 600 ? (
          <>
            <div style={{ display: 'flex' }}>
              <Button
                onClick={CancelError}
                endIcon={<MobileCancelIcon />}
                buttonStyle={{
                  bgcolor: 'rgba(96, 110, 234, 0.1)',
                  color: '#606EEA',
                }}
                margin={{ desktop: '0 16px 8px 0', planshet: '0 20px 8px 0' }}
              >
                {t('cancellation')}
              </Button>
              <Button
                onClick={linkToComment}
                type='submit'
                endIcon={<SendIcon />}
                buttonStyle={{
                  bgcolor: '#606EEA',
                  color: '#fff',
                  shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
                }}
              >
                {t('Написать модератору')}
              </Button>
            </div>
          </>
        ) : (
          <Buttons>
            <div className='upside'>
              <Button
                onClick={CancelError}
                endIcon={<MobileCancelIcon />}
                buttonStyle={{
                  bgcolor: 'rgba(96, 110, 234, 0.1)',
                  color: '#606EEA',
                }}
                margin={{ mobile: '0 8px 8px 0' }}
              >
                {t('cancellation')}
              </Button>
            </div>
            <Button
              onClick={linkToComment}
              endIcon={<SendIcon />}
              buttonStyle={{
                bgcolor: '#606EEA',
                color: '#fff',
              }}
              margin={{ mobile: '0px 8px  8px  0' }}
            >
              {t('Написать ')}
            </Button>
          </Buttons>
        )}
      </WrapperModal>
    </Modal>
  );
};
