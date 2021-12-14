import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
//styles
import { MContent, ModalTitle, ModalCText, Break, ActMaxDiv } from './style';
import { BtnAction } from '../styles/index';
//icons
import CancelButton from 'pages/CompanyPages/settings/components/CancelButton';
import DeleteButton from 'pages/CompanyPages/settings/components/DeleteButton';
import SaveButton from 'pages/CompanyPages/settings/components/SaveButton';
//components
import Modal from 'components/Custom/Modal';
import Input from 'components/Custom/Input';

interface FormProps {
  name: string;
}

const QrActionModal = ({
  modalVisible,
  state,
  setModalVisible,
  handleSavePromocode,
  handleDelete,
}: IProps) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onChange',
    shouldFocusError: true,
  });

  const onSave = (data: FormProps) => {
    handleSavePromocode(data.name);
  };

  useEffect(() => {
    if (modalVisible) {
      reset();
    }
  }, []);

  return (
    <Modal open={modalVisible}>
      <MContent onSubmit={handleSubmit(onSave)}>
        {state === 'edit' || state === 'create' ? (
          <>
            <ModalTitle>QR для подписки на компанию</ModalTitle>
            <Break mHeight={10} />
            <ActMaxDiv>
              <ModalCText>{t('forcomfortqrcodeplace')}</ModalCText>
            </ActMaxDiv>
            <Break mHeight={20} />
            <div style={{ width: '100%' }}>
              <Controller
                rules={{ required: true }}
                control={control}
                name='name'
                render={({ field }) => {
                  return (
                    <Input
                      width={{ minwidth: 350 }}
                      label={t('enterNewName')}
                      field={field}
                      error={errors.name ? true : false}
                      message={t('requiredField')}
                    />
                  );
                }}
              />
            </div>
            <BtnAction>
              <CancelButton
                onClick={() => {
                  setModalVisible(false);
                  reset();
                }}
                text={t('cancel')}
              />
              <SaveButton type='submit' text={t('save')} />
            </BtnAction>
          </>
        ) : (
          <>
            <div style={{ maxWidth: '300px' }}>
              <ModalTitle>{t('sure_want_delete?')}</ModalTitle>
            </div>
            <BtnAction>
              <CancelButton
                text={t('cancel')}
                onClick={() => setModalVisible(false)}
              />
              <DeleteButton onClick={handleDelete} text={t('delete')} />
            </BtnAction>
          </>
        )}
      </MContent>
    </Modal>
  );
};

export default QrActionModal;

interface IProps {
  modalVisible: boolean;
  state: any;
  setModalVisible: any;
  handleSavePromocode: any;
  handleDelete: any;
}
