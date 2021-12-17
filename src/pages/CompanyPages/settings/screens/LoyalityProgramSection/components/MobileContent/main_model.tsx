import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router';
//actions
import { addModal, handleClick } from 'services/redux/Slices/settingsSlice';
//assets and style
import { ReactComponent as ArrowBack } from 'assets/icons/arrow_left.svg';
import { Text } from 'styles/CustomStyles';
import {
  Container,
  Header,
  Body,
  Row,
  Htext,
  TextStyle,
  Column,
  Footer,
  SubText,
  EText,
  WrapModalPaygo,
} from './style';
import { FormProps } from '../../hooks/types';
import { Break, SpinnerDiv } from 'pages/CompanyPages/settings/styles';
//hooks
import Modal from 'components/Custom/Modal';
import { useAppSelector, useAppDispatch } from 'services/redux/hooks';
// import useMobileContent from "./useMobileContent";
//components

import Checkbox from 'components/Custom/CheckBox';
import InputFormat from 'components/Custom/InputFormat';
import Input from 'components/Custom/Input';
import { IconButton } from '@material-ui/core';
import NestedArray from './nested_array';
import Button from 'components/Custom/Button';
import CancelButton from 'pages/CompanyPages/settings/components/CancelButton';
import SaveButton from 'pages/CompanyPages/settings/components/SaveButton';
import useMobileData from './useMobileData';
import Spinner from 'components/Helpers/Spinner';
import RippleEffect from 'components/Custom/RippleEffect';
import SnackBar from 'components/Custom/NewSnack';
//atoms
import { baseLoyalty, useLoyal } from 'services/atoms/settings/loyality';

const MainModel = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    errors,
    setValue,
    onFormSubmit,
    saleLoading,
    cashLoading,
    isLoading,
    isFetching,
    cashIsFetch,
    saleIsFetch,
    alertName,
    checkL,
    setCheckL,
    getValues,
    payGoModal,
    setpayGoModal,
  } = useMobileData();

  //atoms
  const base_loyality = useRecoilValue(baseLoyalty);
  const useLoyalMain = useRecoilValue(useLoyal);
  const history = useHistory();
  const { fields, append, remove } = useFieldArray<FormProps>({
    control,
    name: 'levels',
  });

  const openCashback = useAppSelector((state) => state.settings.openState);

  console.log(errors, 'errors');

  const levels = useWatch({
    control,
    name: 'levels',
  });

  const handleOpen = () => {
    dispatch(addModal(true));
  };

  const checkRequire = () => {
    if (levels?.length) {
      if (levels[levels.length - 1]?.requirements?.length >= 3) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  if (
    isLoading ||
    cashLoading ||
    saleLoading ||
    isFetching ||
    cashIsFetch ||
    saleIsFetch
  ) {
    return (
      <SpinnerDiv>
        <Spinner />
      </SpinnerDiv>
    );
  }

  console.log(alertName, 'alert name');

  return (
    <Container>
      <Header>
        <IconButton
          onClick={() =>
            dispatch(
              handleClick({
                type: 'cashback',
                open: false,
              })
            )
          }
        >
          <ArrowBack />
        </IconButton>
        <Htext>Настройка предоставления скидки</Htext>
      </Header>
      <Body onSubmit={handleSubmit(onFormSubmit)}>
        <Break height={20} />
        <Htext>Статусы клиентов</Htext>
        <Break height={2} />
        <TextStyle>Создайте статусы и определите размер скидки</TextStyle>
        <Break height={25} />
        <Row>
          <Controller
            name={`base_name`}
            rules={{
              required: true,
            }}
            control={control}
            defaultValue={base_loyality?.base_name}
            render={({ field }) => (
              <Input
                label={'№ 1 Название статуса'}
                type='string'
                defaultValue={base_loyality?.base_name}
                field={field}
                message={t('requiredField')}
              />
            )}
          />
        </Row>
        <Row>
          <Controller
            name='base_percent'
            rules={{
              required: true,
              max: 100,
              min: 1,
            }}
            defaultValue={base_loyality?.base_percent}
            control={control}
            render={({ field }) => {
              return (
                <InputFormat
                  field={field}
                  label={'Укажите % статуса'}
                  type='string'
                  defaultValue={base_loyality?.base_percent}
                  maxLength={3}
                  max='100'
                  width={{
                    width: '100%',
                  }}
                  margin={{
                    laptop: '20px 0 0',
                  }}
                  message={t("requiredField")}
                  error={errors.base_percent}
                />
              );
            }}
          />
        </Row>
        <Break height={25} />
        {fields.map((item: any, index: number) => {
          return (
            <Column key={index}>
              <Row aItems='flex-end'>
                <SubText>№ {index + 2} Название статуса</SubText>
                {fields[fields.length - 1] === fields[index] && (
                  <RippleEffect
                    onClick={() => {
                      remove(index);
                      setValue(
                        'levels',
                        fields.filter(
                          (item: any, indexV: number) => indexV !== index
                        )
                      );
                    }}
                    padding={0}
                  >
                    <EText>{t('delete')}</EText>
                  </RippleEffect>
                )}
              </Row>
              <Row>
                <Controller
                  name={`levels.${index}.name`}
                  rules={{
                    required: true,
                  }}
                  defaultValue={item.name}
                  control={control}
                  render={({ field }) => (
                    <Input
                      label={``}
                      type='string'
                      field={field}
                      defaultValue={item.name}
                      message={t('requiredField')}
                    />
                  )}
                />
              </Row>
              <Row>
                <Controller
                  name={`levels.${index}.percent`}
                  rules={{
                    required: true,
                    max: 100,
                    min:1,
               
                  }}
                  defaultValue={item.percent}
                  control={control}
                  render={({ field }) => {
                    return (
                      <InputFormat
                        field={field}
                        label={'Укажите % статуса'}
                        labelStyle={{
                          letterSpacing: '0.5',
                        }}
                        type='string'
                        defaultValue={item.percent}
                        maxLength={3}
                        max='100'
                        width={{
                          width: '100%',
                        }}
                        margin={{
                          laptop: '20px 0 0',
                        }}
                        message={t('requiredField')}
                        error={
                          errors.levels?.[index]?.percent
                            ? true
                            : false
                        }
          
                      />
                    );
                  }}
                />
              </Row>

              {/* //level requirements  */}
              <NestedArray
                setValue={setValue}
                index={index}
                control={control}
                getValues={getValues}
              />
            </Column>
          );
        })}
        <Row>
          <Button
            buttonStyle={{
              bgcolor: 'transparent',
              color: '#3492FF',
              fontSize: {
                mobile: 12.5,
                planshet: 14,
              },
            }}
            onClick={() => {
              append({
                name: null,
                percent: null,
                requirements: [
                  {
                    amount: null,
                    condition: null,
                    type: null,
                    unit: 'UZS',
                  },
                ],
              });
            }}
          >
            Добавить статус +
          </Button>
          {fields.length > 0 && checkRequire() && (
            <Button
              onClick={handleOpen}
              buttonStyle={{
                bgcolor: 'transparent',
                color: '#3492FF',
                fontSize: {
                  mobile: 12.5,
                  planshet: 14,
                },
              }}
            >
              Добавить условие +
            </Button>
          )}
        </Row>
        <Break height={15} />
        <Row>
          <Controller
            name='max_percent'
            control={control}
            rules={{
              required: true,
              max:100,
              min:1
            }}
            defaultValue={base_loyality?.max_percent}
            render={({ field }) => {
              return (
                <InputFormat
                  label={t('max_percent')}
                  defaultValue={base_loyality?.max_percent}
                  type='string'
                  field={field}
                  message={t('requiredField')}
                  error={errors.max_percent? true:false}
                />
              );
            }}
          />
        </Row>
        <Break height={15} />
        {openCashback.type === 'cashback' && (
          <Row>
            <Controller
              name='give_cashback_after'
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={base_loyality?.give_cashback_after}
              render={({ field }) => {
                return (
                  <InputFormat
                    field={field}
                    label={t('give_cashback_after')}
                    defaultValue={base_loyality?.give_cashback_after}
                    error={errors.give_cashback_after?.type === 'required'}
                    message={t('requiredField')}
                  />
                );
              }}
            />
          </Row>
        )}
        <Break height={25} />
        <Row>
          <Controller
            name='useProgram'
            control={control}
            defaultValue={useLoyalMain.useProgram}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={useLoyalMain.useProgram}
                label={t('useLoyaltyProgram')}
              />
            )}
          />{' '}
        </Row>
        <Row>
          <Controller
            name='usePoint'
            control={control}
            defaultValue={useLoyalMain.usePoint}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={useLoyalMain.usePoint}
                label={t('substractingPoints')}
              />
            )}
          />
        </Row>
        <Break height={15} />
        <Footer>
          <CancelButton
            onClick={() => {
              dispatch(
                handleClick({
                  type: 'cashback',
                  open: false,
                })
              );
            }}
            text={t('cancel')}
          />
          <SaveButton type='submit' text={t('save')} />
        </Footer>
      </Body>
   
      <Modal open={payGoModal}>
                        <WrapModalPaygo>
                          <Text marginBottom={'25px'}>{t('paygowarning')}</Text>
                          <Button
                            onClick={() => {
                              setpayGoModal(false);
                              history.push('/support');
                            }}
                          >
                            {t('writetomoderator')}
                          </Button>
                        </WrapModalPaygo>
                      </Modal>
      <SnackBar
        message={alertName}
        status='error'
        open={checkL}
        autoHideDuration={5000}
        onClose={(e: any) => setCheckL(e)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </Container>
  );
};

export default MainModel;
