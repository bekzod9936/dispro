import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
//components
import CancelButton from '../../../components/CancelButton';
import SaveButton from '../../../components/SaveButton';
import Modal from 'components/Custom/Modal';
import MultiSelect from 'components/Custom/MultiSelect';
import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as Market } from 'assets/icons/SideBar/ilmarket.svg';

//style
import {
  ModalContent,
  Form,
  ModalTitle,
  ModalRow,
  Break,
  ModalText,
} from './style';
import { BtnAction } from '../styles/index';
import { ReactComponent as Close } from 'assets/icons/exit.svg';
import { useAppSelector } from 'services/redux/hooks';
//types
import { FormProps } from '../types';
import useWindowWidth from 'services/hooks/useWindowWidth';

const QrForBranch = ({ qrVisible, onSave, closeQr }: IProps) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const stores = useAppSelector((state) => state.qrSetting.stores);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  return (
    <Modal open={qrVisible}>
      <Form onSubmit={handleSubmit(onSave)}>
        <ModalContent>
          <ModalRow jContent='space-between'>
            <ModalTitle>QR для оплаты на местах</ModalTitle>
            {width <= 1000 ? null : (
              <IconButton
                style={{
                  padding: '5px',
                }}
                onClick={closeQr}
              >
                <Close />
              </IconButton>
            )}
          </ModalRow>
          <Break mHeight={10} />
          <ModalRow jContent='space-between'>
            <ModalText>{t('choosefilialqrcodesetting')}</ModalText>
          </ModalRow>
          <Break mHeight={20} />

          <ModalRow jContent='center'>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name='branch'
              render={({ field }) => {
                return (
                  <MultiSelect
                    isMulti={false}
                    error={!!errors.branch}
                    message={t('requiredField')}
                    field={field}
                    options={stores}
                    margin={{ laptop: '0 0 35px 0' }}
                    icon={<Market />}
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
                  />
                );
              }}
            />
          </ModalRow>
        </ModalContent>

        <BtnAction>
          <CancelButton onClick={closeQr} text={t('cancel')} />
          <SaveButton text={t('save')} />
        </BtnAction>
      </Form>
    </Modal>
  );
};

export default QrForBranch;

interface IProps {
  qrVisible: boolean;
  onSave: any;
  closeQr?: any;
}
