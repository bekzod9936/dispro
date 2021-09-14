import React from 'react';
import { useTranslation } from 'react-i18next';
import { CancelIcon } from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import { DeleteIconWhite } from '../../../assets/icons/SettingsIcons/SettingsPageIcon';
import CustomModal from '../../../components/Custom/CustomModal';
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '../../../services/Types/enums';
import {
  CustomButton,
  ModalComponent,
  Text,
} from '../../../styles/CustomStyles';
interface IProps {
  isModalVisible: boolean;
  modalTitle: string;
  modalText: string;
  onProceedClick: () => void;
  onCancelClick: () => void;
}

const AssertModalNews: React.FC<IProps> = ({
  isModalVisible,
  modalTitle,
  modalText,
  onCancelClick,
  onProceedClick,
}) => {
  const { t } = useTranslation();
  return (
    <CustomModal open={isModalVisible}>
      <ModalComponent>
        <div>
          <Text
            fontSize={FONT_SIZE.modalTitle}
            fontWeight={FONT_WEIGHT.modalTitle}
          >
            {modalTitle}
          </Text>
        </div>
        <div style={{ marginTop: '12px' }}>
          <Text
            fontSize={FONT_SIZE.modalText}
            fontWeight={FONT_WEIGHT.modalText}
          >
            {modalText}
          </Text>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            marginTop: '15px',
          }}
        >
          <CustomButton onClick={onCancelClick} background='white'>
            <CancelIcon />
            <Text marginLeft='10px'> {t('cancel')}</Text>
          </CustomButton>
          <CustomButton onClick={onProceedClick} background={COLORS.red}>
            <DeleteIconWhite />
            <Text color='white'>{t('delete')}</Text>
          </CustomButton>
        </div>
      </ModalComponent>
    </CustomModal>
  );
};

export default AssertModalNews;
