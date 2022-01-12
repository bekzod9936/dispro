import { useTranslation } from 'react-i18next';
import { Controller, useFieldArray } from 'react-hook-form';
import {useAppSelector } from 'services/redux/hooks';
//assets and style
import { ReactComponent as ArrowBack } from 'assets/icons/arrow_left.svg';
import { HBreak, SpinnerDiv } from '../../style';
import { SaveIcon } from 'assets/icons/InfoPageIcons/InfoPageIcons';
import {
  AddIconSettings,
  XIcon,
} from 'assets/icons/SettingsIcons/SettingsPageIcon';
import { ThreeHeadIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { COLORS, FONT_SIZE } from 'services/Types/enums';
import { ReferalScroll, SmallPanel } from '../../style';
import { Text } from 'styles/CustomStyles';
import {
  GridContainer,
  LeftGrid,
  LevelsColumn,
  LevelsHead,
  LevelsRow,
  RightGrid,
  LevelsCard,
  Form,
  ReferalCol,
  TextDiv,
  HeaderReferal,
  ActDiv,
  AddDiv,
  SettingDiv,
  ReferalBtn,
  ReferalContent,
  ReferalContainer,
  ReferalDiv,
  ReferalHeader,
  Htext,
  ReferalBody,
  ReferalWrapper,
  Wrapper,
  ActionDiv,
} from './styles';

//components
import CancelButton from '../../components/CancelButton';
import SaveButton from '../../components/SaveButton';
import CustomToggle from 'components/Custom/CustomToggleSwitch';
import SettingButton from '../../components/SettingButton';
import InputFormat from 'components/Custom/InputFormat';
import RippleEffect from 'components/Custom/RippleEffect';
import Button from 'components/Custom/Buttons/Button';
import TwoUsers from '../../components/TwoUsers';
import { IconButton } from '@material-ui/core';

//hooks
import useReferalData from './hooks/useReferalData';
import useWindowWidth from 'services/hooks/useWindowWidth';
import ReferalCard from './components/ReferalCard';
import Spinner from 'components/Helpers/Spinner';
import { ruCount } from 'services/utils';

const ReferalProgrammSection = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const {
    checkedState,
    control,
    handleSave,
    handleSwitch,
    saving,
    handleSubmit,
    errors,
    setValue,
    levelsRef,
    referalRef,
    handleClick,
    isLoading,
    loadingReferal,
    fetchingReferal,
    isFetching,
    disableButton,
    watch,
  } = useReferalData();

  const infoData = useAppSelector((state) => state.info.data?.type);
  //form field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'referals',
  });
 
 console.log('disableButtondisableButton',disableButton)

  const mainContent = () => {
    if (width <= 1000) {
      return (
        <SettingDiv>
          <SettingButton text={'Настроить'} onClick={handleClick} />
        </SettingDiv>
      );
    } else {
      return (
        <ReferalContent>
          <ReferalContainer>
            <ReferalScroll>
              {fields?.map((item: any, index: number) => {
                return (
                  <ReferalCol
                    onClick={(e: any) => {
                      if (!checkedState) {
                        e.stopPropagation();
                      }
                    }}
                    deactivated={!checkedState}
                    key={index}
                  >
                    <SmallPanel>
                      <Controller
                        name={`referals.${[index]}.percent`}
                        control={control}
                        defaultValue={item?.percent}
                        rules={{
                          required: true,
                          min:1,
                          max:100,
                        }}
                        render={({ field }) => {
                          return (
                            <InputFormat
                              width={{
                                maxwidth: 122,
                              }}
                              disabled={!checkedState}
                              label={`Уровень ${index + 1}`}
                              field={field}
                               maxLength={3}
                               max='100'
                              // defaultValue={ console.log('test',errors?.referals?.[index]) }
                              message={''}
                              error={
                                errors?.referals?.[index]?.percent
                                  ? true
                                  : false
                              }
                            />
                          );
                        }}
                      />
               
                      <TwoUsers
                        name1='Саша'
                        name2='Егор'
                        name3={
                          item.number === 2
                            ? 'Петя'
                            : item.number > 2
                            ? index +
                              ' ' +
                              ruCount({
                                count: index,
                                firstWord: t('people'),
                                secondWord: t('people'),
                                thirdWord: t('peopleRu'),
                              })
                            : null
                        }
                      />
                      <TextDiv>
                        {infoData==2 ?  <Text fontSize='14px' fontWeight={300}>
                          1 клиент получает
                          {' ' + item.percent}% с каждого пополнения карты парка 
                          {' ' + +(item.number + 1)} клиентa
                        </Text>:  <Text fontSize='14px' fontWeight={300}>
                          1 клиент получает
                          {' ' + item.percent}% с каждой покупки
                          {' ' + +(item.number + 1)} клиентa
                        </Text>}
                      
                      </TextDiv>
                    </SmallPanel>
                    {index === fields.length - 2 && index !== 0 && (
                      <RippleEffect
                        onClick={() => {
                          if (checkedState) {
                            remove(index);
                            setValue(
                              'referals',
                              fields.filter((item, ind) => ind !== index)
                            );
                          }
                        }}
                      >
                        <XIcon />
                      </RippleEffect>
                    )}
                    
                    {index === fields.length - 1 && (
                      <ActDiv>
                        <RippleEffect
                          onClick={() => {
                            if (checkedState && index !==0) {
                              remove(index);
                            }
                          }}
                        >
                          <XIcon />
                        </RippleEffect>
                        <RippleEffect
                          padding={0}
                          onClick={() => {
                            if (checkedState) {
                              append({
                                name: `${fields.length + 1}`,
                                number: fields.length + 1,
                                percent: 0,
                              });
                            }
                          }}
                        >
                          <AddDiv>
                            <AddIconSettings />
                          </AddDiv>
                        </RippleEffect>
                      </ActDiv>
                    )}
                  </ReferalCol>
                );
              })}
            </ReferalScroll>
          </ReferalContainer>

          <ReferalBtn>
            <Button
              disabled={(checkedState==false && disableButton==false) ? true:false}
              loadingColor='#fff'
              startIcon={<SaveIcon />}
              type='submit'
            >
              {t('save')}
            </Button>
          </ReferalBtn>
        </ReferalContent>
      );
    }
  };

  const removeCard = (index: any) => {
    remove(index);
    setValue(
      'referals',
      fields.filter((item, ind) => ind !== index)
    );
  };

  const mobileContent = () => {
    if (width <= 1000) {
      return (
        <Form onSubmit={handleSubmit(handleSave)}>
          <ReferalDiv ref={referalRef}>
            <ReferalHeader>
              <IconButton onClick={handleClick}>
                <ArrowBack />
              </IconButton>
              <HBreak width={15} />
              <Htext>Настройка реферальной программы</Htext>
            </ReferalHeader>
            <ReferalBody>
              <ReferalWrapper>
                <Wrapper>
                  {fields?.map((item: any, index: number) => {
                    return (
                      <ReferalCard
                        item={item}
                        errors={errors}
                        control={control}
                        fields={fields}
                        index={index}
                        removeCol={() => removeCard(index)}
                        key={index}
                      />
                    );
                  })}
                </Wrapper>
                <Button
                  onClick={() => {
                    append({
                      name: `${fields.length + 1}`,
                      number: fields.length + 1,
                      percent: 0,
                    });
                  }}
                  buttonStyle={{
                    bgcolor: 'transparent',
                    color: '#3492FF',
                  }}
                >
                  Добавить уровень +
                </Button>

                <ActionDiv>
                  <CancelButton onClick={handleClick} text={t('cancel')} />
                  <SaveButton type='submit' text={t('save')}  />
                </ActionDiv>
              </ReferalWrapper>
            </ReferalBody>
          </ReferalDiv>
        </Form>
      );
    } else {
      return null;
    }
  };

  if (loadingReferal || isLoading || fetchingReferal || isFetching) {
    return (
      <SpinnerDiv>
        <Spinner />
      </SpinnerDiv>
    );
  }

  return (
    <GridContainer>
      <LeftGrid>
        <Form onSubmit={handleSubmit(handleSave)}>
          <HeaderReferal>
            <div>
              <div>
                <Text fontWeight={500} fontSize='18px'>
                  Реферальная система
                  <br />
                </Text>
              </div>
              <div style={{ maxWidth: '370px' }}>
                <Text fontWeight={300} fontSize='14px'>
                  Начисление баллов рекомендателю в размере процента от суммы
                  счета приглашенных друзей
                </Text>
              </div>
            </div>
            <div style={{ margin: '10px 0px 10px 20px' }}>
              <CustomToggle
                checked={checkedState}
                onChange={(e: any) => {
                  handleSwitch(e.target.checked);
                }}
              />
            </div>
          </HeaderReferal>
          {/* ?.sort((a: any, b: any) => a.number - b.number) */}

          {mainContent()}
        </Form>
      </LeftGrid>

      <RightGrid>
        {levelsRef?.length > 0 ? (
          <LevelsCard>
            <LevelsHead>
              <ThreeHeadIcon />
              <div>
                <Text marginLeft='15px' fontSize={FONT_SIZE.mediumPlus}>
                  Клиентов по уровням
                </Text>
              </div>
            </LevelsHead>
            <LevelsColumn>
              {levelsRef?.map((item, index) => {
                return (
                  <LevelsRow key={index}>
                    <div>
                      <Text fontSize={FONT_SIZE.smallPlus} fontWeight={400}>
                        {item.levelNumber} {t('level')}
                      </Text>
                    </div>
                    <div>
                      <Text
                        color={COLORS.purple}
                        fontSize={FONT_SIZE.smallPlus}
                      >
                        {item.count}
                      </Text>
                    </div>
                  </LevelsRow>
                );
              })}
            </LevelsColumn>
          </LevelsCard>
        ) : (
          <div></div>
        )}
      </RightGrid>
      {mobileContent()}
    </GridContainer>
  );
};

export default ReferalProgrammSection;
