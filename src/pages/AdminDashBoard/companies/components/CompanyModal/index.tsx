import { IconButton } from '@material-ui/core';
import Modal from 'components/Custom/Modal';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectedCompany,
  setSelectCompany,
} from 'services/atoms/admin_companies';
import {
  ModalContent,
  ModalHead,
  ModalTitle,
  ModalBody,
  ModalText,
  ModalAction,
} from './style';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import Button from 'components/Custom/Buttons/Button';
import { useTranslation } from 'react-i18next';
import useCompany from './useCompany';

const CompanyModal = () => {
  const { t } = useTranslation();
  const sCompany = useRecoilValue(selectedCompany);
  const setCompany = useSetRecoilState(setSelectCompany);
  const { enterCompany } = useCompany();

  const handleEnter = () => {
    console.log(sCompany, 'company info');
    enterCompany.mutate({
      id: sCompany.id,
      type: sCompany.type,
    });
  };

  const open = sCompany?.id ? true : false;
  return (
    <Modal open={open}>
      <ModalContent>
        <ModalHead>
          <ModalTitle>{sCompany.name}</ModalTitle>
          <IconButton onClick={() => setCompany({})}>
            <Close />
          </IconButton>
        </ModalHead>

        <ModalBody>
          <ModalText>{sCompany.annotation}</ModalText>
        </ModalBody>
        <ModalAction>
          <Button
            buttonStyle={{
              bgcolor: '#fff',
              color: '#223367',
            }}
            onClick={() => {
              setCompany({});
            }}
          >
            {t('cancel')}
          </Button>
          <Button onClick={handleEnter}>{t('enter')}</Button>
        </ModalAction>
      </ModalContent>
    </Modal>
  );
};

export default CompanyModal;
