import { Input, Modal, TextareaAutosize } from '@material-ui/core';
import React, { Children } from 'react';
import { classicNameResolver } from 'typescript';
import { makeStyles } from '@material-ui/core';
import CustomModal from '../../../components/Custom/CustomModal';
import {
  CustomButton,
  ModalComponent,
  Text,
} from '../../../styles/CustomStyles';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import {
  CancelIcon,
  CoinsIconWhite,
  TickIconButton,
} from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import { Flex } from '../../../styles/BuildingBlocks';
import OperationProceed from './OperationProceed';
import { useAppSelector } from '../../../services/redux/hooks';
interface IProps {
  open: boolean;
  process?: any;
  client?: any;
  setProceed: any;
  setModalVisible: any;
  proceed: boolean;
}
const useStyles = makeStyles({
  input: {
    width: '100%',
    padding: '15px',
    border: '1px solid #C7C7C7',
    borderRadius: '14px',
    height: '54px',
    boxSizing: 'border-box',
    marginTop: '10px',
  },
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

const CustomModalClients: React.FC<IProps> = ({
  open,
  process,
  client,
  setProceed,
  setModalVisible,
  proceed,
}) => {
  const classes = useStyles();
  const clients = useAppSelector((state) => state.clients.checkedClients);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
    reset,
  } = useForm({
    reValidateMode: 'onBlur',
  });
  const onFormSubmit = (data: any) => {
    setTimeout(() => {
      if (data.password !== 'DisPass2020') {
        setError('password', {
          type: 'incorrectPassword',
          message: 'wrongPassword',
        });
      } else {
        setProceed(true);
      }
    }, 300);
  };

  const handleContinueButton = () => {
    setModalVisible(false);
    setProceed(false);
    setValue('password', '');
    setValue('comment', ' ');
    setValue('pointsQuantity', '');
    clearErrors();
  };

  const handleCancel = () => {
    setModalVisible(false);
    clearErrors();
    reset({
      comment: '',
      password: '',
      pointQuantity: '',
    });
  };

  return (
    <CustomModal open={open}>
      <>
        {!proceed ? (
          <ModalComponent>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div
                style={{
                  marginBottom: process !== 'substract' ? '25px' : '0px',
                }}
              >
                <Text marginLeft='0px' fontSize='21px' fontWeight={700}>
                  {process === 'accure'
                    ? t('accuringPoints')
                    : process === 'substract'
                    ? t('substractingPoints')
                    : t('vipPrivate')}
                </Text>
              </div>
              {process === 'substract' ? (
                <div style={{ marginBottom: '25px', width: '270px' }}>
                  <Text
                    fontSize='13px'
                    fontWeight={300}
                    marginLeft='0px'
                    marginRight='0px'
                  >
                    {t('substractInfo')}
                  </Text>
                </div>
              ) : null}
              {clients.length < 2 ? (
                <div style={{ marginBottom: '30px' }}>
                  <Text
                    fontSize='17px'
                    fontWeight={500}
                    marginLeft='0px'
                    marginRight='0px'
                  >
                    {`${client.firstName} ${client.lastName}`}
                  </Text>
                </div>
              ) : (
                <div style={{ marginBottom: '30px' }}>
                  <Text fontSize='17px' fontWeight={400}>
                    {t('chosen')} {clients.length}
                  </Text>
                </div>
              )}
              <div style={{ marginTop: '25px', width: '100%' }}>
                <label htmlFor='input1' style={{ marginTop: '10px' }}>
                  <Text
                    marginLeft='8px'
                    color='#C7C7C7'
                    fontWeight={700}
                    fontSize='15px'
                  >
                    {process !== 'VIP' ? t('pointsQuantity') : t('enterVip')}
                  </Text>
                </label>
                <Controller
                  render={({ field }) => (
                    <Input
                      type='number'
                      {...field}
                      disableUnderline
                      className={classes.input}
                    />
                  )}
                  name={'pointsQuantity'}
                  control={control}
                  rules={{ required: true, min: 1 }}
                />
                {errors.pointsQuantity && (
                  <div style={{ width: '100%' }}>
                    <Text fontSize='13px' color='red' fontWeight={300}>
                      {errors?.password?.type === 'required'
                        ? t('requiredField')
                        : errors?.password?.type === 'min'
                        ? t('minError')
                        : null}
                    </Text>
                  </div>
                )}
              </div>
              {process !== 'VIP' && (
                <div style={{ marginTop: '25px', width: '100%' }}>
                  <label htmlFor='comment' style={{ marginTop: '10px' }}>
                    <Text
                      marginLeft='8px'
                      color='#C7C7C7'
                      fontWeight={700}
                      fontSize='15px'
                    >
                      {t('comment')}
                    </Text>
                  </label>
                  <div style={{ width: '100%' }}>
                    <Controller
                      render={({ field }) => (
                        <TextareaAutosize
                          {...field}
                          className={classes.textArea}
                          id='comment'
                        />
                      )}
                      control={control}
                      name='comment'
                    />
                  </div>
                </div>
              )}
              <div
                style={{
                  marginTop: '25px',
                  marginBottom: '25px',
                  width: '100%',
                }}
              >
                <label htmlFor='password' style={{ marginTop: '10px' }}>
                  <Text
                    marginLeft='8px'
                    color='#C7C7C7'
                    fontWeight={700}
                    fontSize='15px'
                  >
                    {t('adminPassword')}
                  </Text>
                </label>
                <Controller
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='password'
                      disableUnderline
                      className={classes.input}
                    />
                  )}
                  name='password'
                  control={control}
                  rules={{ required: true }}
                />
                {errors.password ? (
                  <div style={{ width: '100%' }}>
                    {' '}
                    <Text fontSize='13px' color='red' fontWeight={300}>
                      {errors?.password?.type === 'required'
                        ? t('requiredField')
                        : errors?.password?.type === 'incorrectPassword'
                        ? t(errors.password.message)
                        : ''}
                    </Text>{' '}
                  </div>
                ) : null}
              </div>

              <Flex width='100%' margin='25px 0px 0px 15%' justifyContent='end'>
                <CustomButton background='white' onClick={handleCancel}>
                  <CancelIcon />
                  <Text color='#223367' fontSize='16px' fontWeight={500}>
                    {t('cancel')}
                  </Text>
                </CustomButton>
                <CustomButton type='submit'>
                  {process !== 'VIP' ? <CoinsIconWhite /> : <TickIconButton />}
                  <Text color='white' fontSize='16px' fontWeight={500}>
                    {process !== 'VIP' ? t(process) : t('ready')}
                  </Text>
                </CustomButton>
              </Flex>
            </form>
          </ModalComponent>
        ) : (
          <OperationProceed
            handleContinueButton={handleContinueButton}
            process={process}
          />
        )}
      </>
    </CustomModal>
  );
};

export default CustomModalClients;
