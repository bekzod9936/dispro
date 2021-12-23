//packages
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';

//components
import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';
import { SubSectionField } from '../../SubSectionField';
import Spinner from 'components/Helpers/Spinner';

//style
import { Wrapper, Header, Footer } from './style';
import {
  CancelIcon,
  CreateSectionIcon,
  CloseIcon,
  useStyles,
} from '../Sections/style';

//other
import {
  usePostSection,
  useSubSectionForm,
} from 'pages/CompanyPages/services/hooks';
import { sectionFieldToDto } from 'pages/CompanyPages/services/helpers';
import { SubSectionFormTypes } from 'pages/CompanyPages/services/utils/types';

interface SubSectionModalProps {
  open: boolean;
  onClose: () => void;
  parentId: number;
}

export const SubSectionModal: React.FC<SubSectionModalProps> = ({
  open,
  onClose,
  parentId,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { mutate, isLoading } = usePostSection();

  const form = useSubSectionForm();

  const onSubmit = (data: SubSectionFormTypes) => {
    const subSectionDto = sectionFieldToDto(data.subSection, parentId);

    mutate([subSectionDto], {
      onSettled: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal width={styles.modal.style} open={open}>
      <Wrapper onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <Header>
            <div className='nav'>
              <h1>{t('newSubSection')}</h1>
              <IconButton type='button' onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </Header>
          <SubSectionField name='subSection' />
          <Footer>
            <Button
              onClick={onClose}
              margin={styles.cancelButton.margin}
              startIcon={<CancelIcon />}
              buttonStyle={styles.cancelButton.style}
            >
              {t('cancel')}
            </Button>
            <Button
              disabled={isLoading}
              width={styles.button.width}
              type='submit'
              startIcon={<CreateSectionIcon />}
            >
              {isLoading ? <Spinner size={20} /> : t('create')}
            </Button>
          </Footer>
        </FormProvider>
      </Wrapper>
    </Modal>
  );
};
