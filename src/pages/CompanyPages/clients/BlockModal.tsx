import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomModal from '../../../components/Custom/CustomModal';
import { Flex } from '../../../styles/BuildingBlocks';
import {
  CustomButton,
  ModalComponent,
  Text,
} from '../../../styles/CustomStyles';
import { makeStyles, TextareaAutosize } from '@material-ui/core';
import {
  CancelIcon,
  WhiteLock,
} from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import { useTranslation } from 'react-i18next';
interface IProps {
  open: boolean;
  setModalVisible: any;
}
//boxShadow = " 0 4 9 0rgba(96, 110, 234, 0.46)"
const useStyles = makeStyles({
  textArea: {
    width: '100%',
    padding: '15px',
    border: '1px solid #C7C7C7',
    borderRadius: '14px',
    boxSizing: 'border-box',
    marginTop: '10px',
    outline: 'none',
    minHeight: '124px',
  },
});

const BlockModal: React.FC<IProps> = ({ open, setModalVisible }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm();
  const classes = useStyles();
  const { t } = useTranslation();
  const onFormSubmit = (data: any) => {
    setModalVisible(false);
    setValue('reason', '', { shouldDirty: true, shouldValidate: true });
  };

  const handleCancel = () => {
    setModalVisible(false);
    setValue('reason', '', { shouldDirty: true, shouldValidate: true });
    clearErrors();
  };

  return (
    <CustomModal open={open}>
      <ModalComponent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Flex justifyContent='space-between'>
            <Text
              marginLeft='0px'
              marginRight='0px'
              fontWeight={700}
              fontSize='21px'
            >
              {' '}
              {t('blocking')}
            </Text>
          </Flex>
          <div style={{ width: '272px', marginTop: '8px' }}>
            <Text
              marginLeft='0px'
              marginRight='0px'
              fontWeight={300}
              fontSize='14px'
            >
              {' '}
              {t('blockInfo')}{' '}
            </Text>
          </div>

          <div style={{ marginTop: '30px' }}>
            <label htmlFor='reason'>
              <Text
                marginLeft='0px'
                marginRight='0px'
                color='#C7C7C7'
                fontWeight={700}
                fontSize='14px'
              >
                {t('blockLabel')}{' '}
              </Text>
            </label>
            <Controller
              name='blockReason'
              control={control}
              render={({ field }) => (
                <TextareaAutosize
                  {...field}
                  className={classes.textArea}
                  id='reason'
                />
              )}
            />
          </div>
          <Flex width='100%' margin='25px 0px 0px 5%' justifyContent='end'>
            <CustomButton background='white' onClick={handleCancel}>
              <CancelIcon />
              <Text color='#223367' fontSize='16px' fontWeight={500}>
                {t('cancel')}
              </Text>
            </CustomButton>
            <CustomButton type='submit'>
              <WhiteLock />
              <Text color='white' fontSize='16px' fontWeight={500}>
                {t('block')}
              </Text>
            </CustomButton>
          </Flex>
        </form>
      </ModalComponent>
    </CustomModal>
  );
};

export default BlockModal;
