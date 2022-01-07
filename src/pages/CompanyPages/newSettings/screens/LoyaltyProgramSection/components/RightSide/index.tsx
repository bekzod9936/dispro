import React, { useState } from "react";
import { useMutation } from 'react-query';
import {  useAppSelector } from 'services/redux/hooks';
import CheckBox from 'components/Custom/CheckBox';
import { useHistory } from 'react-router';
import useWindowWidth from 'services/hooks/useWindowWidth';
import useBonusPoints from './hooks/useBonusPoint';
import useDiscounts from './hooks/useDiscount';
import useCashback from './hooks/useCashback';
import useProgramSettings from './hooks/useProgramSettings';
import Input from "components/Custom/Input";
import { Grid, IconButton } from '@material-ui/core';
import { ReactComponent as PercentIcon } from "assets/icons/percent_icon.svg";
import InputFormat from "components/Custom/InputFormat";
import { PlusIcon } from "newassets/icons/icons";
import { ReactComponent as EmptySetting } from 'assets/images/empty_setting.svg';
import NestedArray from "./hooks/NestedArray";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SaveButton } from "components/Custom/Buttons/Save";
import MultiSelect from "components/Custom/MultiSelect";
import Spinner from "components/Custom/Spinner";
import { MainconditionTypes } from "./utils";
import { notify,notifyError,notifySuccess} from 'services/utils/local_notification';
import CustomToggle from "components/Custom/CustomToggleSwitch";
import { GroupToggle, ToggleInfo,ModalTitle,ModalBody ,LoyalDiv,BtnContainer} from "../../style";
import Modal from 'components/Custom/Modal';
import Radio from 'components/Custom/Radio';

import { CustomButton, ModalComponent, Text } from 'styles/CustomStyles';
import { FONT_SIZE, FONT_WEIGHT } from 'services/Types/enums';

import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import RippleEffect from 'components/Custom/RippleEffect';
import Button from 'components/Custom/Buttons/Button';
import { SyncIcon } from 'assets/icons/FeedBackIcons.tsx/FeedbackIcons';
import Condition from './hooks/Condition';

import {
  loyalityNewSaveChange,
  changeProgramLoyalityGlobal,
  saveUseProgramLoyality,
  loyalitySaveChange,
} from 'services/queries/settingsQuery';
import {
  Form,
  Title,
  TitleForm,
  PercentDiv,
  IconStyle,
  TitleFormChild,
  LocalyPayment,
  DeleteIcon,
  SubmitButton,
  DynamicGroup,
  DynamicLabel,
  TitleInsideFormChild,
  Container,
  LeftSide,
  RightSide,
  WrapSpinner,
  EText,
  WrapModalPaygo,
} from "../../style";


const Right = () => {
  const payGo = useAppSelector((state) => state.info.payGo);
  const infoData = useAppSelector((state) => state.info.data?.type);
  const {responseBonusPoint}=useBonusPoints();
  const {responseDiscount}=useDiscounts();
  const {responseCashback}=useCashback();
  const {responseProgramSettings}=useProgramSettings();
  const history = useHistory();
  const { width } = useWindowWidth();

  let bonusPoint=responseBonusPoint?.data?.data?.data;
  let disCount=responseDiscount?.data?.data?.data;
  let cashBack=responseCashback?.data?.data?.data;

  let programSettingsUsePoint=responseProgramSettings?.data?.data?.data?.usePoint;
  let programSettingsUseProgram=responseProgramSettings?.data?.data?.data?.useProgram;

  let isFetching=responseBonusPoint.isLoading  || responseBonusPoint.isFetching || responseDiscount.isLoading ||responseDiscount.isFetching ||responseDiscount.isLoading || responseCashback.isFetching;

  // let levels:any=[];
  let defaultValue=bonusPoint?.isActive ? bonusPoint:disCount?.isActive ? disCount:cashBack?.isActive ?cashBack:null;

  let convertedValue=defaultValue?.levels?.map((item:any)=>{
    let amount=item?.requirements?.filter((item:any)=> item?.condition =='')
    let id=amount?.[0]?.type==3 ? 3:amount?.[0]?.type==2 ? 2:amount?.[0]?.type==1 ? 1:0;
    let requirements=item?.requirements?.filter((item:any)=>item?.condition !=='')?.map((childItem:any)=>{
        return {
           amount:String(childItem?.amount),
           type:{
            label:childItem?.type==2 ? 'Рекомендации' :childItem?.type==3 ? 'Посещения' :childItem?.type==1 ? 'Сумма покупок':'',
            value:childItem?.type==2 ? 'Рекомендации':childItem?.type==3 ? 'Посещения' :childItem?.type==1 ? 'Сумма покупок':'',
           },
           condition:{label:String(childItem?.condition)=='or' ? 'или':'и',value:String(childItem?.condition)=='or' ? 'или':'и',},         
        }
    })
    return {
      amount:String(amount?.[0]?.amount),
      name:String(item?.name),
      percent:String(item?.percent),
      condition:{id:id,label:id==2 ? 'Посещения' :id==1? 'Сумма покупок':id==2 ? 'Рекомендации':'',value:id==3 ? 'Посещения' :id==1? 'Сумма покупок':id==2 ? 'Рекомендации':''},
      type:{id:id,label:id==2 ? 'Посещения' :id==1? 'Сумма покупок':id==2 ? 'Рекомендации':'',value:id==3 ? 'Посещения' :id==1? 'Сумма покупок':id==2 ? 'Рекомендации':''},
      requirements:requirements
    }
  });

  const { t } = useTranslation();
  
  let companyId: any = localStorage.getItem('companyId');
  const [modified,setModified]=useState('0')
  const [modaldiscount,setModalDiscount]=useState(false);
  const [modalcashback,setModalCashback]=useState(false);
  const [modalpoints,setModalPoints]=useState(false);
  const [discounts, setDiscounts] = useState(disCount?.isActive);
  const [cashback, setCashback] = useState(cashBack?.isActive);
  const [points, setPoints] = useState(bonusPoint?.isActive);
  const [typePark,setTypePark]=useState(false);
  const [payGoModal, setpayGoModal] = useState(false);
 
  const [localyPaymentfirst, setLocalPaymentFirst] = useState(programSettingsUseProgram);
  const [localyPaymentsecond, setLocalPaymentSecond] = useState(programSettingsUsePoint);

  console.log('typePark',typePark)
  console.log('discounts',disCount?.isActive)
  console.log('cashback',cashBack?.isActive)
  console.log('points',bonusPoint?.isActive)
 
  const methods = useForm({
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });
  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = methods;

  const { fields, remove, append } = useFieldArray({
    control,
    name: "levels",
  });

 const data = watch();
 const useProgramSave = useMutation((data: any) =>
  saveUseProgramLoyality(data)
);

const handleChangeDiscount = () => {
  setModalDiscount(disCount?.name ? true:false);
  if(!disCount?.name){
  setDiscounts(true);
  setCashback(false );
  setPoints(false );
  setTypePark(false)
  }
};
const handleChangeCashback = () => {
    setModalCashback(cashBack?.name? true:false);
    if(!cashBack?.name){
    setCashback(true );
    setDiscounts(false);
    setPoints(false );
    setTypePark(false)
    }
    
};
const handleChangePoints = () => {
    setModalPoints(bonusPoint?.name ? true:false);
    if(!bonusPoint?.name){
    setPoints(true);
    setDiscounts(false);
    setCashback(false );
    setTypePark(false)
    }
};

const loayalityChange = useMutation(
  (data: any) =>
  changeProgramLoyalityGlobal({ data: data.data }),
  {
    onSuccess: () => {
      responseBonusPoint.refetch();
      responseDiscount.refetch();
      responseCashback.refetch();
      responseProgramSettings.refetch();
      setModified('0');
    },
  }
);

const handleChangePark=(e:any)=>{
  setTypePark(e.target.checked);
  if(e.target.checked){
    setPoints(false);
    setDiscounts(false);
    setCashback(false );
  }
  
  loayalityChange.mutate({
    data:{
      isActive:true,
      isMoved:false,
      plType:discounts ? 'discount' :cashback ? 'cashback':points ? 'point':'discount',
      turnedOff:e.target.checked,
      password:""
    }
  })
}


const handleSwitchPush=()=>{
  let modifyLoyal = modified === '1' ? false : true;
  loayalityChange.mutate({
    data:{
      isActive:true,
      isMoved:modifyLoyal,
      plType:modaldiscount ? 'discount' :modalcashback ? 'cashback':modalpoints ? 'point':'',
      turnedOff:false,
      password:""
    }
  })
  setModified('0');
  setDiscounts(modaldiscount )
  setCashback(modalcashback )
  setPoints(modalpoints )
  setTypePark(false)
}


const loyalityPut = useMutation(
  (data: any) => {
    if (discounts) {
      if(disCount?.name){
        return loyalitySaveChange(
          data,
         'discount'
        )
      }
     else return loyalityNewSaveChange(
        data,
        'discount'
      );
    } else if (cashback) {
      if(cashBack?.name){
        return loyalitySaveChange(
          data,
         'cashback'
        ); 
      }
     else return loyalityNewSaveChange(
        data,
       'cashback'
      );
    } else if (points) {
      if(bonusPoint?.name){
        return loyalitySaveChange(
          data,
          points ? 'bonuspoint':'' 
        )
      }
      return loyalityNewSaveChange(
        data,
        points ? 'bonuspoint':''
      );
    } 
    else {
      return loyalitySaveChange(
        data,
        'cashback'
      );
    }
  },
  {
    onSuccess: (res) => {
      responseBonusPoint.refetch();
      responseDiscount.refetch();
      responseCashback.refetch();
      responseProgramSettings.refetch();
      notifySuccess(t('save'));
    },
  }
);

const obj = {
  1: 'Cумма покупок',
  2: 'Рекомендации',
  3: 'Посещения'
}

const f = (array: any) => {
  const types = [1, 2, 3];
  // let error=false;
  array.forEach((e: any, index: number) => {
    let prev = array[index - 1]
    let curr = e
    
    for (let t of types) {
      let prevReq = prev?.requirements.find((i: any)=> i.type == t)
      let currReq = curr.requirements.find((i: any)=> i.type == t)

      if (prevReq?.amount > currReq?.amount) {
        // error==true;
        notifyError(`${obj[t as keyof typeof obj]} в  ${curr?.name} должна бить болше чем ${obj[t as keyof typeof obj]} в ${prev?.name}`)
        return
      }
    }
  })

}
  
 const checkValidation=(levels:any)=>{

  
 
   console.log('levelsValue',levels)
   for (let i=0;i<levels?.length;i++){
     //pre curr values

     let prev=levels[i-1];
     let curr=levels[i];
     let prevFilterPercent=prev?.percent;
     let currFilterPercent=curr?.percent;
     let checkPercent=Number(prevFilterPercent)>Number(currFilterPercent);

     console.log('checkPercentcheckPercent',checkPercent)
     //case 1
     let prevFilterFirstRequirments=prev?.requirements?.find((item:any)=>item.type==1);
     let currFilterFirstRequirments=curr?.requirements?.find((item:any)=>item.type==1);
     let checkFilterFirstOne=prevFilterFirstRequirments?.amount >=currFilterFirstRequirments?.amount;

     //case 2
     let prevFilterSecondRequirments=prev?.requirements?.find((item:any)=>item.type==2);
     let currFilterSecondRequirments=curr?.requirements?.find((item:any)=>item.type==2);
     let checkFilterSecondOne=prevFilterSecondRequirments?.amount >=currFilterSecondRequirments?.amount;

     //case 3
     let prevFilterThirdRequirments=prev?.requirements?.find((item:any)=>item.type==3);
     let currFilterThirdRequirments=curr?.requirements?.find((item:any)=>item.type==3);
     let checkFilterThirdOne=prevFilterThirdRequirments?.amount >=currFilterThirdRequirments?.amount;
    
    if(checkPercent){
      return notifyError(t(`percent в  ${curr?.name} должна бить болше чем percent в ${prev?.name}`));
    }

     if(checkFilterFirstOne){
      return notifyError(t(`Cумма покупок в  ${curr?.name} должна бить болше чем Cумма покупок в ${prev?.name}`));
     }

     if(checkFilterSecondOne){
      return notifyError(t(`Рекомендации в  ${curr?.name} должна бить болше чем Рекомендации в ${prev?.name}`));
     }

     if(checkFilterThirdOne){
      return notifyError(t(`Посещения в  ${curr?.name} должна бить болше чем Посещения в ${prev?.name}`));
     }

   }

   return levels;
 }

 let newarray={amount:'',type:{value:''}}

  const FormSettings =async (data: any) => {
  
    let checking=!localyPaymentfirst ?'yes':'no';
    let checking2=!localyPaymentsecond ? 'yes':'no';
    let globalChecking=checking=='yes' && checking2=='yes';
 
    let checkinglevels=data?.levels?.map((item: any) => {
      if(item?.type){
        newarray.amount=item?.amount
        newarray.type.value=item?.type?.value;
      }
      let arraynew=[newarray]
      let requirements=[...arraynew,item.requirements[0],item.requirements[1]].filter((item:any)=> item !==undefined);

      if(requirements.length>0){
        return {
          name: item.name,
          percent: item.percent,
          requirements: requirements.map((reqItem: any) => {
            return {
              type:reqItem?.type?.value=='Рекомендации' ? 2:reqItem?.type?.value=='Посещения' ? 3 :reqItem?.type?.value=='Сумма покупок' ? 1:0 ,
              amount: Number(reqItem?.amount),
              unit: reqItem?.type=='Сумма покупок' ? "UZS":"шт.",
              condition: reqItem?.condition?.value=='или' ? 'or':reqItem?.condition?.value=='и' ?'and':'',
            };
          }),
        };
      }
          }
          )
        
     if(globalChecking ? true :payGo==1) {
      if(checkValidation(checkinglevels)){
        try{
          useProgramSave.mutate({
            useProgram: localyPaymentfirst ? true:false,
            usePoint: localyPaymentsecond ? true:false,
          });
          loyalityPut.mutate({
            cashbackReturnedDay:data?.cashbackReturnedDay ? Number(data.cashbackReturnedDay):'',
            description: '',
            isActive: true,
            companyId: parseInt(companyId),
            levels:checkinglevels,
            maxAmount: Number(data.maxAmount),
            name: data.name,
            percent: Number(data.percent),
          })
        }
        catch (e){
          console.log(e)
        }
      
    }
  }
      else {
        setpayGoModal(true);
      }
   
  
  };

  React.useEffect(() => {
    if(defaultValue){
      setValue('maxAmount', defaultValue?.maxAmount);
      setValue('name', defaultValue?.name);
      setValue('percent', defaultValue?.percent);
      setValue('cashbackReturnedDay',defaultValue?.cashbackReturnedDay);
    }
 
    if(convertedValue?.length>0){
      setValue(`levels`, convertedValue );
    }
    
  }, [defaultValue?.maxAmount]);
 


  let CheckPercentage =
    Number(watch(`levels.${0}.percent`)) &&
    Number(watch("base_percent")) >= Number(watch(`levels.${0}.percent`))
      ? true
      : false;

  console.log('CheckPercentage',CheckPercentage)
  
 let isEmpty=disCount?.isActive ||cashBack?.isActive||bonusPoint?.isActive;
 let checkEmpty=isEmpty==false ||typePark;
 
 console.log('isEmpty',isEmpty==false);
 console.log('typePark',typePark);

 console.log('checkEmpty',checkEmpty);

  return (
    <Container>
    <LeftSide>
    <GroupToggle>
        <CustomToggle checked={discounts ? discounts:disCount?.isActive} onChange={handleChangeDiscount} />
        <ToggleInfo>
          <h5>Предоставление скидки</h5>
          <p>
            Клиент получает скидку при каждой покупке в размере определенного %
          </p>
        </ToggleInfo>
      </GroupToggle>
      <GroupToggle>
        <CustomToggle checked={cashback ? cashback:cashBack?.isActive} onChange={handleChangeCashback} />
        <ToggleInfo>
          <h5>Предоставление кешбэка</h5>
          <p>
            Клиент получает кешбэк в виде реальных денег после каждой покупки
          </p>
        </ToggleInfo>
      </GroupToggle>
      <GroupToggle>
        <CustomToggle checked={points ? points :bonusPoint?.isActive} onChange={handleChangePoints} />
        <ToggleInfo>
          <h5>Предоставление баллов</h5>
          <p>
            Клиент получает баллы после каждой покупки которые может потратить
            только у вас в компании
          </p>
        </ToggleInfo>
      </GroupToggle>
      {infoData===2 &&  <GroupToggle>
        <CustomToggle checked={typePark} onChange={handleChangePark} />
        <ToggleInfo>
          <h5>Отключить все</h5>
          <p>
          В данном случае все программы лояльности будут отключены
          </p>
        </ToggleInfo>
      </GroupToggle>}
     
      <Modal open={modaldiscount ||modalcashback||modalpoints}>
            <ModalComponent>
              <ModalTitle>
                <Text fontSize={FONT_SIZE.large} fontWeight={FONT_WEIGHT.bold}>
                  Выберите тип замены программы лояльности?
                </Text>

                <IconButton
                  onClick={() => {
                    setModalDiscount(false);
                    setModalCashback(false);
                    setModalPoints(false);
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
                      setModalDiscount(false);
                      setModalCashback(false);
                      setModalPoints(false);
                    }}
                  >
                    <CancelIcon />
                    <div style={{ width: '15px' }} />
                    <Text>{t('cancel')}</Text>
                  </CustomButton>
                </RippleEffect>

                <Button
                  onClick={() => {
                    handleSwitchPush()
                    setModalDiscount(false);
                    setModalCashback(false);
                    setModalPoints(false);
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
    </LeftSide>
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
   {checkEmpty ? (
            <Grid
              justifyContent='center'
              alignItems='center'
              direction='column'
              container
              xs={12}
              sm={7}
            >
              <EmptySetting />
              <EText>{t('empty_setting_text')}</EText>
            </Grid>
          ):
    <RightSide>
    { isFetching ? (
            <WrapSpinner>
              <Spinner />
            </WrapSpinner>
          ):  
    <Form onSubmit={handleSubmit(FormSettings)}>
      <Title>
        <h5>Статусы клиентов</h5>
        <p>Создайте статусы и определите размер скидки</p>
      </Title>
      <TitleForm>
        <Controller
          name={`name`}
          control={control}
          // defaultValue={}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label={t("status_name")}
              type="string"
              autoComplete={"off"}
              defaultValue={defaultValue?.name}
              width={width>1550 ? { maxwidth:500, minwidth: 300}:{ maxwidth:350, minwidth: 300}}
              margin={{ laptop: "0px 20px 0px 0px" }}
              field={field}
              error={!!errors.name}
              // message={t("requiredField")}
            />
          )}
        />
        <Controller
          name={`percent`}
          
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputFormat
              autoComplete={"off"}
              label={""}
              type="string"
              field={field}
              maxLength={3}
              max="100"
              width={{
                width: "106px",
              }}
              margin={{
                laptop: "25px 0 0",
              }}
              IconEnd={
                <PercentDiv>
                  <PercentIcon />
                </PercentDiv>
              }
              // message={t("requiredField")}
              error={!!errors.base_percent}
            />
          )}
        />
        <IconStyle>
          <div onClick={() => append({ name: "" })}>
            <PlusIcon />
          </div>
        </IconStyle>
      </TitleForm>
      <div>
        {fields.map(({ id }, index: any) => (
          <>
            <div>
              <TitleFormChild key={id}>
                <Controller
                  rules={{
                    required: true,
                  }}
                  name={`levels.[${index}].name`}
             
                  control={control}
                  render={({ field }) => (
                    <Input
                      label={t("status_name")}
                      type="string"
                      autoComplete={"off"}
                      width={width>1550 ? { maxwidth:500, minwidth: 300}:{ maxwidth:350, minwidth: 300}}
                      margin={{ laptop: "0px 20px 0px 0px" }}
                      field={field}
                      error={!!errors.levels?.[index]?.name}
                    />
                  )}
                />
                <Controller
                  name={`levels.[${index}].percent`}
                  rules={{
                    required: true,
                    max: 100,
                    min: 1,
                  }}
                
                  control={control}
                  render={({ field }) => (
                    <InputFormat
                      label={""}
                      autoComplete={"off"}
                      type="string"
                      field={field}
                      maxLength={3}
                      max="100"
                      width={{
                        width: "106px",
                      }}
                      margin={{
                        laptop: "25px 0 0",
                      }}
                      // message={t("requiredField")}
                      error={
                        !!errors.levels?.[index]?.percent 
                        // CheckPercentage ||
                        // Number(
                        //   watch(`levels[${Number(index - 1)}].percent`)
                        // ) >=
                        //   Number(
                        //     watch(`levels[${Number(index)}].percent`)
                        //   )
                        //   ? true
                        //   : false
                      }
                      IconEnd={
                        <PercentDiv>
                          <PercentIcon />
                        </PercentDiv>
                      }
                    />
                  )}
                />
                <IconStyle>
          <div onClick={() => append({ name: "" })}>
            <PlusIcon />
          </div>
        </IconStyle>
                <IconStyle>
                  <div onClick={() => remove(index)}>
                    <DeleteIcon />
                  </div>
                </IconStyle>
              </TitleFormChild>

              <TitleInsideFormChild>
                <DynamicGroup>
                  <DynamicLabel>когда</DynamicLabel>
                  <Controller
                    name={`levels[${index}].type`}
                    defaultValue={watch(`levels[${index}].type`)}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <MultiSelect
                        isMulti={false}
                        width={{ minwidth: 170,width:'fit-content',maxwidth:200 }}
                        error={!!errors.levels?.[index]?.type}
                        // message={t("requiredField")}
                        {...field}
                        options={
                          watch(`levels[${index}].type.id`)
                            ? MainconditionTypes.filter(
                                (item) =>
                                  item.id ===
                                  watch(`levels[${index}].type.id`)
                              )
                            : MainconditionTypes
                        }
                        selectStyle={{
                          radius: !!errors.levels?.[index]?.type ? 14:0,
                          borderbottom: !!errors.levels?.[index]?.type
                            ? " 1px solid #FF5E68"
                            : "1px solid #606EEA",
                          border: "transparent",
                          bgcolor: "transparent",
                          inpadding:'2px 20px 2px 0',
                          height: {
                            desktop: 10,
                          },
                        }}
                      />
                    )}
                  />
                </DynamicGroup>
                <DynamicGroup>
                  <DynamicLabel>больше</DynamicLabel>
                  <Controller
                    name={`levels.[${index}].amount`}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <InputFormat
                        autoComplete={"off"}
                        variant="standard"
                        IconEnd={
                          watch(`levels[${index}].type.id`) == 1 ? (
                            <div>{"uzs"}</div>
                          ) : (
                            <p style={{ fontSize: "12px" }}>{"шт"}</p>
                          )
                        }
                        maxLength={11}
                        width={{
                          minwidth: 130 ,maxwidth:140
                        }}
                        field={field}
                        error={!!errors.levels?.[index]?.amount ||CheckPercentage}
                        inputStyle={{
                          inpadding: "10px 10px 5px 2px",
                          border: "none",
                          borderbottom: "1px solid #606EEA",
                          bgcolor: "transparent",
                          radius: !!errors.levels?.[index]?.amount ? 14:0,
                          fitheight: true,
                        }}
                      />
                    )}
                  />
                </DynamicGroup>
                <NestedArray
                  nestIndex={index}
                  watch={watch}
                  setValue={setValue}
                  convertedValue={convertedValue}
                  data={data}
                  errors={errors}
                  control={control}
                />
              </TitleInsideFormChild>
              
              <Condition watch={watch} index={index}/>

             
            </div>
          </>
        ))}
      </div>

      <TitleForm>
        <Controller
          name={`maxAmount`}
          rules={{
            required: true,
          }}
          control={control}
          render={({ field }) => (
            <Input
              label={t("Какой процент счета можно оплатить баллами?")}
              type="string"
              autoComplete={"off"}
              width={width>1550 ? { maxwidth:500, minwidth: 300}:{ maxwidth:350, minwidth: 300}}
              margin={{ laptop: "0px 20px 0px 0px" }}
              field={field}
              error={errors.maxAmount}
              // message={t("requiredField")}
            />
          )}
        />
      </TitleForm>
      {cashback&&<TitleForm>
                            <Controller
                              name='cashbackReturnedDay'
                              control={control}
                              rules={{
                                required: modalcashback ? true:false,
                              }}
                              // defaultValue={give_cashback_after}
                              render={({ field }) => {
                                return (
                                  <InputFormat
                                    field={field}
                                    label={t('give_cashback_after')}
                                    width={width>1550 ? { maxwidth:500, minwidth: 300}:{ maxwidth:350, minwidth: 300}}
                                    margin={{ laptop: "0px 20px 0px 0px" }}
                                    // defaultValue={
                                    //   base_loyality?.give_cashback_after
                                    // }
                                    // error={
                                    //   errors.cashbackReturnedDay?.type ===
                                    //   'required'
                                    // }
                                    error={errors.cashbackReturnedDay}
                                    message={t('requiredField')}
                                  />
                                );
                              }}
                            />
                          </TitleForm>}
      <LocalyPayment>
        <Title>
          <h5>Оплата на местах</h5>
        </Title>
        <CheckBox
                  checked={localyPaymentfirst}
                  name={'localyPaymentfirst'}
                  label={t('useLoyaltyProgram')}
                  onChange={(e: any) => setLocalPaymentFirst(e.target.checked)}
                />
        <CheckBox
                  checked={localyPaymentsecond}
                  name={'localyPaymentsecond'}
                  label={t('substractingPoints')}
                  onChange={(e: any) => setLocalPaymentSecond(e.target.checked)}/>
        <SubmitButton>
          <SaveButton />
        </SubmitButton>
      </LocalyPayment>
    </Form>
}
    </RightSide>}
    
  </Container>
   
  );
};
export default Right;
