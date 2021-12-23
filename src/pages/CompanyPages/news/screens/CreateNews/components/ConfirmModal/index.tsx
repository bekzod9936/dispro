import Modal from 'components/Custom/Modal';

import useWindowWidth from 'services/hooks/useWindowWidth';
import { useTranslation } from 'react-i18next';
import { WrapperModal, CloseButton, Buttons } from './style';
import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import Button from 'components/Custom/Buttons/Button';
import dayjs from 'dayjs';
import { SaveIcon, SaveIconMobile } from 'assets/icons/news/newsIcons';
import { MobileCancelIcon } from 'assets/icons/proposals/ProposalsIcons';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
interface ConfirmModal {
  submit: any;
  cancelSubmit: () => void;
  submitData: () => void;
  startDate: any;
  todayDate: any;
}

export const ConfirmModal = ({
  submit,
  cancelSubmit,
  startDate,
  todayDate,
  submitData,
}: ConfirmModal) => {
  let start = dayjs(startDate).format('DD.MM.YYYY');
  let today = dayjs(todayDate).format('DD.MM.YYYY');

  const { width } = useWindowWidth();
  const { t } = useTranslation();

  return (
    <Modal modalStyle={{ bgcolor: '#fff' }} open={submit}>
      <WrapperModal>
        {width > 600 ? (
          <h3 style={{ marginRight: '20px' }}>
            {start > today
              ? t(`Новость будет добавлена в раздел "В ожидании" `)
              : t('Новость будет опубликована сразу')}
          </h3>
        ) : (
          <h3>
            {start > today
              ? t(`Новость будет добавлена в раздел "В ожидании" `)
              : t('Новость будет опубликована сразу')}
          </h3>
        )}

        <p>
          {start > today
            ? t(
                `Новость будет опубликована ${dayjs(startDate).format(
                  'DD.MM.YYYY'
                )} `
              )
            : t(
                'Новость перейдет в раздел Активные и будет доступна вашим клиентам в приложении'
              )}
        </p>
        {width > 1000 ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              buttonStyle={{ color: '#223367', bgcolor: '#ffffff' }}
              margin={{ laptop: '0 22px 0 0' }}
              onClick={cancelSubmit}
              startIcon={<CancelIcon />}
            >
              Отмена
            </Button>
            <Button
              type='submit'
              margin={{ laptop: '0 22px 0 0' }}
              onClick={submitData}
              buttonStyle={{ shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' }}
              startIcon={<SaveIcon />}
            >
              Сохранить
            </Button>
          </div>
        ) : width > 600 && width <= 1000 ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={cancelSubmit}
              endIcon={<MobileCancelIcon />}
              buttonStyle={{
                bgcolor: 'rgba(96, 110, 234, 0.1)',
                color: '#606EEA',
              }}
              margin={{ planshet: '0 20px 0px 0' }}
            >
              {t('cancellation')}
            </Button>
            <Button
              type='submit'
              margin={{ laptop: '0 22px 0 0' }}
              onClick={submitData}
              buttonStyle={{ shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' }}
              endIcon={<SaveIconMobile />}
            >
              {t('Сохранить')}
            </Button>
          </div>
        ) : (
          <Buttons>
            <div className='upside'>
              <Button
                onClick={cancelSubmit}
                endIcon={<MobileCancelIcon />}
                buttonStyle={{
                  bgcolor: 'rgba(96, 110, 234, 0.1)',
                  color: '#606EEA',
                }}
                margin={{ mobile: '0 5px 0px 0' }}
              >
                {t('Отмена')}
              </Button>
            </div>
            <Button
              onClick={submitData}
              type='submit'
              endIcon={<SaveIconMobile />}
              buttonStyle={{
                bgcolor: '#606EEA',
                color: '#fff',
                shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
              }}
              margin={{ mobile: '0px px  0px  0' }}
            >
              {'Сохранить'}
            </Button>
          </Buttons>
        )}
      </WrapperModal>
    </Modal>
  );
};
