import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilValue, useSetRecoilState } from 'recoil';
//hooks
import useLoyality from './hooks/useLoyality';
import useWindowWidth from 'services/hooks/useWindowWidth';
//Redux
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';

//styles
import { Flex } from 'styles/BuildingBlocks';
import { LargePanel } from '../../styles/SettingStyles';
import { CustomButton, ModalComponent, Text } from 'styles/CustomStyles';
import { FONT_SIZE, FONT_WEIGHT } from 'services/Types/enums';
import {
  AddIconDiv,
  LeftGrid,
  LevelGrid,
  ProgramRow,
  ThirdContainer,
  RemoveIconDiv,
  HeaderGrid,
  PercentDiv,
  Form,
  ModalTitle,
  ModalBody,
  LoyalDiv,
  BtnContainer,
  MainContainer,
  EText,
  RightGrid,
  BottomSide,
  WrapModalPaygo,
} from './styles';
import { Break } from '../../styles';

//icons
import { ReactComponent as RemoveIconSettings } from 'assets/icons/delete_level.svg';
import { ReactComponent as PercentIcon } from 'assets/icons/percent_icon.svg';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import { ReactComponent as EmptySetting } from 'assets/images/empty_setting.svg';
import { SyncIcon } from 'assets/icons/FeedBackIcons.tsx/FeedbackIcons';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { SaveIcon } from 'assets/icons/InfoPageIcons/InfoPageIcons';
import { AddIconSettings } from 'assets/icons/SettingsIcons/SettingsPageIcon';
//constants
import { switchItems } from './constants';
import { numberWith } from 'services/utils';
//components
import Input from 'components/Custom/Input';
import { Grid, IconButton } from '@material-ui/core';
import CustomToggle from 'components/Custom/CustomToggleSwitch';
import Spinner from 'components/Helpers/Spinner';
import Button from 'components/Custom/Buttons/Button';
import RippleEffect from 'components/Custom/RippleEffect';
import Modal from 'components/Custom/Modal';
import Radio from 'components/Custom/Radio';
import InputFormat from 'components/Custom/InputFormat';
import { RippleDiv } from 'components/Custom/RippleEffect/style';
import Checkbox from 'components/Custom/CheckBox';
//mobile
import MobileContent from './components/MobileContent';
//requirement fields
import NestedArray from './components/NestedArray';
//recoil states
import { useLoyal, baseLoyalty } from 'services/atoms/settings/loyality';
import {
  switchKeyT,
  setSwitchKeyT,
  setActiveCheckM,
  setActiveM,
} from 'services/atoms/settings';
import {
  activeM,
  eCashback,
  eBonuspoint,
  eDiscount,
  activeCheckM,
} from 'services/atoms/settings';
import { useHistory } from 'react-router';

const LoyaltyProgramSection = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const history = useHistory();

  const infoData = useAppSelector((state) => state.info.data?.type);
  const offChecked = useAppSelector((state) => state.settings.offChecked);
  const {
    control,
    setValue,
    handleSwitchChange,
    handleSwitch,
    handleSubmit,
    dynamicFields,
    getValues,
    append,
    remove,
    isLoading,
    cashbackLoading,
    discountLoading,
    loayalityChange,
    onFormSubmit,
    loayalityPut,
    errors,
    modified,
    setModified,
    assertModalVisible,
    setAssertModalVisible,
    isFetching,
    cashbackFetching,
    discountFetching,
    payGoModal,
    setpayGoModal,
  } = useLoyality();

  //selectors
  const setSwitchKey = useSetRecoilState(setSwitchKeyT);
  const setActiveCheck = useSetRecoilState(setActiveCheckM);
  const setActive = useSetRecoilState(setActiveM);
  //atoms
  const base_loyality = useRecoilValue(baseLoyalty);
  const useLoyalMain = useRecoilValue(useLoyal);
  const switchKey = useRecoilValue(switchKeyT);
  const active = useRecoilValue(activeM);
  const activeCheck = useRecoilValue(activeCheckM);
  console.log('useLoyalMain', useLoyalMain);
  const emptyCashback = useRecoilValue(eCashback);
  const emptyDiscount = useRecoilValue(eDiscount);

  const emptyBonuspoint = useRecoilValue(eBonuspoint);

  const loading =
    !isLoading &&
    !cashbackLoading &&
    !discountLoading &&
    !loayalityChange.isLoading &&
    !isFetching &&
    !cashbackFetching &&
    !discountFetching;

  const cashbackActive =
    active.active === 'cashback' ||
    activeCheck === 'cashback' ||
    (emptyCashback.empty && emptyCashback.type === activeCheck);
  // const activeEmpty =offChecked ? true : active.active === '' ? true:false;
  const activeEmpty = active.active === '' && activeCheck === '';
  const handleChecked = (key: any) => {
    console.log('key that i want', key);

    setSwitchKey(key);
    if (emptyCashback.empty && emptyCashback.type === key) {
      setActiveCheck(key);
      setAssertModalVisible(false);
      setActive({ active: key });
    } else if (emptyDiscount.empty && emptyDiscount.type === key) {
      setActiveCheck(key);
      setAssertModalVisible(false);
      setActive({ active: key });
    } else if (emptyBonuspoint.empty && emptyBonuspoint.type === key) {
      setActiveCheck(key);
      setAssertModalVisible(false);
      setActive({ active: key });
    } else {
      setAssertModalVisible(true);
    }
  };

  const content = () => {
    if (width <= 1000) {
      return (
        <MobileContent
          isLoading={isLoading || cashbackLoading || discountLoading}
        />
      );
    } else {
      return (
        <>
          <LeftGrid item xs={12} sm={5}>
            <Flex
              flexDirection='column'
              justifyContent='start'
              margin='0px'
              alignItems='flex-start'
            >
              {switchItems.map((item: any) => {
                return (
                  <Flex
                    key={item.key}
                    // width="100%"
                    justifyContent='space-between'
                    margin='0px 0px 35px 0px'
                    alignItems='flex-start'
                  >
                    <Flex
                      flexDirection={'column'}
                      justifyContent='start'
                      alignItems='flex-start'
                      margin='0'
                    >
                      <CustomToggle
                        checked={item.key === active.active}
                        disabled={
                          offChecked ? true : item.key === active.active
                        }
                        onChange={(checked: any) => handleChecked(item.key)}
                      />
                    </Flex>
                    <Flex
                      margin='0 0 0 20px'
                      flexDirection='column'
                      alignItems='flex-start'
                    >
                      <div style={{}}>
                        <Text fontSize='18px' fontWeight={500}>
                          {item.title}
                        </Text>
                      </div>
                      <div style={{ marginTop: '5px', width: '290px' }}>
                        <Text fontSize='14px' fontWeight={300}>
                          {item.text}
                        </Text>
                      </div>
                    </Flex>
                  </Flex>
                );
              })}
              {infoData === 2 && (
                <Flex
                  justifyContent='space-between'
                  margin='0px 0px 35px 0px'
                  alignItems='flex-start'
                >
                  <Flex
                    flexDirection={'column'}
                    justifyContent='start'
                    alignItems='flex-start'
                    margin='0'
                  >
                    <CustomToggle
                checked={offChecked}
                onChange={(e: any) => {
                  handleSwitch(e.target.checked);
                }}
              />
            
                    </Flex>
                    <Flex
                      margin='0 0 0 20px'
                      flexDirection='column'
                      alignItems='flex-start'
                    >
                      <div >
                        <Text fontSize='18px' fontWeight={500}>
                          {'Отключения все'}
                        </Text>
                      </div>
                      <div style={{ marginTop: '5px', width: '290px' }}>
                        <Text fontSize='14px' fontWeight={300}>
                          {'В данном случае все программы лояльности будут отключены'}
                        </Text>
                      </div>
                    </Flex>
                  </Flex>}
          
              
            </Flex>
          </LeftGrid>

          {activeEmpty ? (
            <Grid
              justifyContent='center'
              alignItems='center'
              direction='column'
              container
              xs={12}
              sm={7}
            >
              {isLoading ? <Spinner /> : <EmptySetting />}
              <EText>{t('empty_setting_text')}</EText>
            </Grid>
          ) : (
            <RightGrid item xs={12} sm={7}>
              {loading ? (
                <LargePanel id='largePanel'>
                  <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <Grid
                      container
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      spacing={2}
                      xs={12}
                    >
                      <HeaderGrid item xs={6}>
                        <Controller
                          name={`base_name`}
                          rules={{
                            required: true,
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              label={t('status_name')}
                              type='string'
                              field={field}
                              message={t('requiredField')}
                            />
                          )}
                        />
                      </HeaderGrid>

                      <LevelGrid
                        direction='row'
                        alignItems='center'
                        item
                        xs={6}
                      >
                        <Controller
                          name={`base_percent`}
                          rules={{
                            required: true,
                            max: 100,
                            min: 1,
                          }}
                          defaultValue={base_loyality?.base_percent}
                          control={control}
                          render={({ field }) => (
                            <InputFormat
                              label={''}
                              type='string'
                              defaultValue={base_loyality?.base_percent}
                              field={field}
                              maxLength={3}
                              max='100'
                              width={{
                                width: '106px',
                              }}
                              margin={{
                                laptop: '20px 0 0',
                              }}
                              IconEnd={
                                <PercentDiv>
                                  <PercentIcon />
                                </PercentDiv>
                              }
                              message={''}
                              error={errors.base_percent}
                            />
                          )}
                        />
                        <ThirdContainer>
                          <AddIconDiv>
                            <RippleDiv
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
                              marginLeft={0}
                              marginRight={0}
                            >
                              <AddIconSettings />
                            </RippleDiv>
                          </AddIconDiv>
                        </ThirdContainer>
                      </LevelGrid>
                    </Grid>
                    <div style={{ height: '25px' }} />
                    {dynamicFields?.length > 0 &&
                      dynamicFields?.map((item: any, index: number) => {
                        return (
                          <ProgramRow
                            container
                            spacing={3}
                            key={index}
                            justifyContent='space-between'
                            alignItems='flex-end'
                          >
                            <Grid
                              container
                              direction='row'
                              alignItems='center'
                              justifyContent='space-between'
                              spacing={3}
                              xs={12}
                            >
                              <Grid item xs={6}>
                                <Controller
                                  name={`levels.${index}.name`}
                                  rules={{
                                    required: true,
                                  }}
                                  defaultValue={item?.name || ''}
                                  control={control}
                                  render={({ field }) => (
                                    <Input
                                      label={t('status_name')}
                                      type='string'
                                      field={field}
                                      margin={{
                                        laptop: '20px 0 10px',
                                      }}
                                      message={t('requiredField')}
                                      error={
                                        errors.levels?.[index]?.name
                                          ? true
                                          : false
                                      }
                                    />
                                  )}
                                />
                              </Grid>

                              <LevelGrid
                                direction='row'
                                alignItems='flex-end'
                                item
                                xs={6}
                              >
                                <Controller
                                  name={`levels.${index}.percent`}
                                  rules={{
                                    required: true,
                                    max: 100,
                                    min: 1,
                                  }}
                                  control={control}
                                  defaultValue={numberWith(item?.percent, ' ')}
                                  render={({ field }) => (
                                    <InputFormat
                                      label={''}
                                      defaultValue={numberWith(
                                        item?.percent,
                                        ' '
                                      )}
                                      type='string'
                                      field={field}
                                      max='100'
                                      width={{
                                        width: '106px',
                                      }}
                                      margin={{
                                        laptop: '30px 0 0',
                                      }}
                                      IconEnd={
                                        <PercentDiv>
                                          <PercentIcon />
                                        </PercentDiv>
                                      }
                                      // message={
                                      //   errors.levels?.[index]?.percent?.type ===
                                      //   "max"
                                      //     ? "maksimal 100%"
                                      //     : t("requiredField")
                                      // }
                                      message={''}
                                      error={
                                        errors.levels?.[index]?.percent
                                          ? true
                                          : false
                                      }
                                    />
                                  )}
                                />
                                <ThirdContainer>
                                  <AddIconDiv bgContain={false}>
                                    <RippleDiv
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
                                      marginLeft={0}
                                      marginRight={0}
                                    >
                                      <AddIconSettings />
                                    </RippleDiv>
                                  </AddIconDiv>
                                </ThirdContainer>

                                <ThirdContainer>
                                  <RemoveIconDiv
                                    onClick={() => {
                                      console.log(index, 'index remove');
                                      remove(index);
                                      setValue(
                                        'levels',
                                        dynamicFields.filter(
                                          (item: any, indexV: number) =>
                                            indexV !== index
                                        )
                                      );
                                    }}
                                  >
                                    <RippleDiv>
                                      <RemoveIconSettings />
                                    </RippleDiv>
                                  </RemoveIconDiv>
                                </ThirdContainer>
                              </LevelGrid>
                            </Grid>

                            {/* //Requirements section */}

                            <NestedArray
                              index={index}
                              control={control}
                              getValues={getValues}
                              setValue={setValue}
                            />
                          </ProgramRow>
                        );
                      })}
                    <div style={{ height: '25px' }} />
                    <BottomSide>
                      <HeaderGrid item xs={6}>
                        <Controller
                          name='max_percent'
                          control={control}
                          rules={{
                            required: true,
                            min: 1,
                          }}
                          defaultValue={base_loyality?.max_percent}
                          render={({ field }) => {
                            return (
                              <InputFormat
                                label={t('max_percent')}
                                defaultValue={base_loyality?.max_percent}
                                type='string'
                                field={field}
                                max='100'
                                message={t('requiredField')}
                                error={errors.max_percent ? true : false}
                              />
                            );
                          }}
                        />
                      </HeaderGrid>
                      <Break height={15} />
                      {cashbackActive && (
                        <HeaderGrid item xs={6}>
                          <div style={{ marginTop: '15px' }}>
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
                                    defaultValue={
                                      base_loyality?.give_cashback_after
                                    }
                                    error={
                                      errors.give_cashback_after?.type ===
                                      'required'
                                    }
                                    message={t('requiredField')}
                                  />
                                );
                              }}
                            />
                          </div>
                        </HeaderGrid>
                      )}
                      <HeaderGrid>
                        <div style={{ marginTop: '20px' }}>
                          <div>
                            <Text marginLeft='5px'>{t('p2p')}</Text>
                          </div>
                          <div>
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
                          </div>
                          <div>
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
                          </div>
                        </div>
                      </HeaderGrid>
                      <Break height={15} />
                      <HeaderGrid item xs={12}>
                        <div style={{ marginTop: '20px' }}>
                          <Button
                            type='submit'
                            startIcon={<SaveIcon />}
                            disabled={loayalityPut.isLoading}
                          >
                            <Text marginLeft='10px' color='white'>
                              {t('save')}
                            </Text>
                          </Button>
                        </div>
                      </HeaderGrid>
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
                    </BottomSide>
                  </Form>
                </LargePanel>
              ) : (
                <Spinner />
              )}
            </RightGrid>
          )}

          {/* other settings tools  */}
          <Modal open={assertModalVisible}>
            <ModalComponent>
              <ModalTitle>
                <Text fontSize={FONT_SIZE.large} fontWeight={FONT_WEIGHT.bold}>
                  Выберите тип замены программы лояльности?
                </Text>

                <IconButton
                  onClick={() => {
                    setAssertModalVisible(false);
                  }}
                >
                  <Close />
                </IconButton>
              </ModalTitle>
              <ModalBody>
                <Text
                  fontSize={FONT_SIZE.mediumPlus}
                  fontWeight={FONT_WEIGHT.modalText}
                  marginBottom={'25px'}
                >
                  При изменении программы лояльности Вы можете обнулить статусы
                  ваших клиентов или заменить программу лояльности, сохранив
                  статусы клиентов.
                </Text>
                <LoyalDiv>
                  <Radio
                    flexDirection='column'
                    list={[
                      {
                        value: '1',
                        label: `Обнулить статусы клиентов при замене лояльности`,
                      },
                      {
                        value: '2',
                        label: `Сохранить статусы клиентов при замене лояльности`,
                      },
                    ]}
                    title={''}
                    onChange={(v: any) => setModified(v)}
                    value={modified}
                  />
                </LoyalDiv>
              </ModalBody>
              <BtnContainer>
                <RippleEffect>
                  <CustomButton
                    background='white'
                    onClick={() => {
                      setAssertModalVisible(false);
                    }}
                  >
                    <CancelIcon />
                    <div style={{ width: '15px' }} />
                    <Text>{t('cancel')}</Text>
                  </CustomButton>
                </RippleEffect>

                <Button
                  onClick={() => {
                    handleSwitchChange(true, switchKey);
                    setAssertModalVisible(false);
                  }}
                  disabled={modified === '0'}
                  startIcon={<SyncIcon />}
                  type='button'
                >
                  <Text color='white'>{t('change')}</Text>
                </Button>
              </BtnContainer>
            </ModalComponent>
          </Modal>
        </>
      );
    }
  };

  return (
    <MainContainer container spacing={3} justifyContent='space-between'>
      {content()}
    </MainContainer>
  );
};

export default LoyaltyProgramSection;
