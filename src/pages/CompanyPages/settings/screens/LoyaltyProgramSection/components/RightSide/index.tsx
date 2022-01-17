import React, {useState } from "react";
import { useAppSelector } from "services/redux/hooks";
import {useMutation } from 'react-query';
import CheckBox from 'components/Custom/CheckBox';
import { useHistory } from 'react-router';
import useWindowWidth from 'services/hooks/useWindowWidth';
import useBonusPoints from './hooks/useBonusPoint';
import useDiscounts from './hooks/useDiscount';
import useCashback from './hooks/useCashback';
import useProgramSettings from './hooks/useProgramSettings';
import usePayGo from './hooks/usePayGo';
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
import {MainconditionTypes,FirstconditonTypes,TypeParkMainconditionTypes} from "./utils";
import {notifyError,notifySuccess} from 'services/utils/local_notification';
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
import typeParkImage from 'assets/images/typePark.png';
import { SendIcon, MobileCancelIcon,SaveIcon,NewSaveIcon} from 'assets/icons/news/newsIcons';
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
  RightSideContent,
  WrapSpinner,
  EText,
  IconWord,
  HoverMainAdd,
  HoverMainIcon,
  IconStyleMain,
  WrapperModal,
} from "../../style";


const Right = () => {
  usePayGo()

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

  const { t } = useTranslation();
  let checkTypePark=(Boolean(disCount?.isActive) ||Boolean(cashBack?.isActive)||Boolean(bonusPoint?.isActive));

  let companyId: any = sessionStorage.getItem('companyId');
  const [modified,setModified]=useState('0')
  const [modaldiscount,setModalDiscount]=useState(false);
  const [modalcashback,setModalCashback]=useState(false);
  const [modalpoints,setModalPoints]=useState(false);
  const [discounts, setDiscounts] = useState(false);
  const [cashback, setCashback] = useState(false);
  const [points, setPoints] = useState(false);
  const [typePark,setTypePark]=useState(false);
  const [payGoModal, setpayGoModal] = useState(false);
  const [localyPaymentfirst, setLocalPaymentFirst] = useState(programSettingsUseProgram);
  const [localyPaymentsecond, setLocalPaymentSecond] = useState(programSettingsUsePoint);
  const [modalActive, setModalForActive]=useState(false);

  const [makeActive,setMakeActive]=useState(false);
  const [requestprogram,setRequestProgram]=useState<any>()
  const [loyalityProgram,setLoyalityProgram]=useState<any>()

  let defaultValue=points ? bonusPoint:discounts? disCount:cashback ? cashBack:null;

  let convertedValue=defaultValue?.levels?.map((item:any)=>{
    let amount=item?.requirements?.filter((item:any)=> item?.condition =='')
    let id=amount?.[0]?.type==3 ? 3:amount?.[0]?.type==2 ? 2:amount?.[0]?.type==1 ? 1:0;
    let requirements=item?.requirements?.filter((item:any)=>item?.condition !=='')?.map((childItem:any)=>{
        return {
           amount:String(childItem?.amount),
           type:{
             id:childItem?.type,
            label:childItem?.type==2 ? 'Рекомендации' :childItem?.type==3 ? 'Посещения' :childItem?.type==1 && infoData !==2 ? 'Сумма покупок':childItem?.type==1 && infoData ==2 ?'Сумма пополнения карты парка':'',
            value:childItem?.type==2 ? 'Рекомендации':childItem?.type==3 ? 'Посещения' :childItem?.type==1 && infoData !==2 ? 'Сумма покупок':childItem?.type==1 && infoData ==2 ?'Сумма пополнения карты парка':'',
           },
           condition:{label:String(childItem?.condition)=='or' ? 'или':'и',value:String(childItem?.condition)=='or' ? 'или':'и',},         
        }
    })
    return {
      amount:String(amount?.[0]?.amount),
      name:String(item?.name),
      percent:String(item?.percent),
      condition:{id:id,label:id==3 ? 'Посещения' :id==1 && infoData !==2 ? 'Сумма покупок':id==1 && infoData ==2 ? 'Сумма пополнения карты парка':id==2 ? 'Рекомендации':'',value:id==3 ? 'Посещения' :id==1 && infoData !==2 ? 'Сумма покупок':id==1 && infoData ==2 ? 'Сумма пополнения карты парка':id==2 ? 'Рекомендации':''},
      type:{id:id,label:id==3 ? 'Посещения' :id==1 && infoData !==2 ? 'Сумма покупок':id==1 && infoData ==2 ? 'Сумма пополнения карты парка':id==2 ? 'Рекомендации':'',value:id==3 ? 'Посещения' :id==1 && infoData !==2 ? 'Сумма покупок':id==1 && infoData ==2 ? 'Сумма пополнения карты парка':id==2 ? 'Рекомендации':''},
      requirements:requirements
    }
  });


  const methods = useForm({
   
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });
  const {
    handleSubmit,
    control,
    setValue,
    reset,
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

console.log('datadata',data)

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
  setTypePark(true);
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
      turnedOff:true,
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

const InitialhandleSwitchPush=()=>{

  loayalityChange.mutate({
    data:{
      isActive:true,
      isMoved:true,
      plType:discounts ? 'discount' :cashback ? 'cashback':points ? 'point':'discount',
      turnedOff:false,
      password:""
    }
  })
  setTypePark(false)
  setModified('0');
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
      else return loyalityNewSaveChange(
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
      notifySuccess(t('Данные успешно сохранены'));
    },
  }
);

const handleChangeDiscount = () => {
  setModalDiscount(Boolean(disCount?.name));
  setModified('0');
  if(!disCount?.name){
  setDiscounts(true);
  setCashback(false );
  setPoints(false );
  setTypePark(false);

  }
};
const handleChangeCashback = () => {
    setModalCashback(Boolean(cashBack?.name));
    setModified('0');
    if(!cashBack?.name){
    setCashback(true );
    setDiscounts(false);
    setPoints(false );
    setTypePark(false);
    
    }
};
const handleChangePoints = () => {
    setModalPoints(Boolean(bonusPoint?.name));
    setModified('0');
    if(!bonusPoint?.name){
    setPoints(true);
    setDiscounts(false);
    setCashback(false );
    setTypePark(false);
      
    }
};



 const checkValidation=(levels:any,name:any)=>{
  
   for (let i=0;i<levels?.length;i++){
     //pre curr values
     
     let prev=levels[i-1];
     let curr=levels[i];
     let prevFilterPercent=prev?.percent;
     let currFilterPercent=curr?.percent;
     let checkPercent=Number(prevFilterPercent)>Number(currFilterPercent);


     let hasSometype3=curr?.requirements?.filter((item:any)=>item.type==3);
     let hasSometype2=curr?.requirements?.filter((item:any)=>item.type==2);
     let hasSometype1=curr?.requirements?.filter((item:any)=>item.type==1);

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
    
     if(hasSometype3?.length>1){
    return notifyError(t(` "Посещения" не должны дублироваться в "${curr?.name}" `));
     }

     if(hasSometype2?.length>1){
    return notifyError(t(` "Рекомендации" не должны дублироваться в "${curr?.name}" `));
    }

    if(hasSometype1?.length>1){
    return notifyError(t(` "Cумма покупок" не должны дублироваться в "${curr?.name}" `));
   }

    if(checkPercent){
      
     return notifyError(t(`Процент в  "${curr?.name}" должен быть больше чем  "${prev?.name}" `));
    }

     if(checkFilterFirstOne){
      
      return notifyError(t(`Количество "Cумма покупок" в  "${curr?.name}" должен быть больше чем  "${prev?.name}" `));
     }

     if(checkFilterSecondOne){
    
      return  notifyError(t(`Количество Рекомендации в  "${curr?.name}" должен бить болше чем ${prev?.name}`));
     }

     if(checkFilterThirdOne){
     
      return notifyError(t(`Количество Посещения в  "${curr?.name}" должен бить болше чем ${prev?.name}`));
     }

   }
 return name;

 }


 let newarray={amount:'',type:{id:0}}

  const FormSettings = (data: any) => {
   
    let checking=!localyPaymentfirst ?'yes':'no';
    let checking2=!localyPaymentsecond ? 'yes':'no';
    let globalChecking=checking=='yes' && checking2=='yes';
    let checkinglevels=data?.levels?.map((item: any) => {
      if(item?.type){
        newarray.amount=item?.amount
        newarray.type.id=item?.type.id;
      }
      let arraynew=[newarray]
      let requirements=[...arraynew,item?.requirements?.[0],item?.requirements?.[1]].filter((item:any)=> item !==undefined);
  
      if(requirements?.length>0){
        return {
          name: item.name,
          percent: item.percent,
          requirements: requirements?.map((reqItem: any) => {
            return {
              type:Number(reqItem.type.id),
              amount: Number(reqItem?.amount),
              unit: Number(reqItem?.type.id)==1 ? "UZS":"шт.",
              condition: reqItem?.condition?.value=='или' ? 'or':reqItem?.condition?.value=='и' ?'and':'',
            };
          }),
        };
      }
          }
          )
        
     if(globalChecking ? true :payGo==1) {
      if(checkValidation(checkinglevels,data?.name)){
      
        if(discounts && Boolean(disCount?.isActive)){
          setModalForActive(false);
            useProgramSave.mutate({
            useProgram: localyPaymentfirst ? true:false,
            usePoint: localyPaymentsecond ? true:false,
          });
          loyalityPut.mutate({
            cashbackReturnedDay:data?.cashbackReturnedDay>=0 ? Number(data?.cashbackReturnedDay):'',
            description: '',
            isActive: false,
            companyId: parseInt(companyId),
            levels:checkinglevels,
            maxAmount: Number(data?.maxAmount),
            name: data?.name,
            percent: Number(data?.percent),
          });
        }
       else if(cashback && Boolean(cashBack?.isActive)){
          setModalForActive(false);
          useProgramSave.mutate({
            useProgram: localyPaymentfirst ? true:false,
            usePoint: localyPaymentsecond ? true:false,
          });
          loyalityPut.mutate({
            cashbackReturnedDay:data?.cashbackReturnedDay>=0 ? Number(data?.cashbackReturnedDay):'',
            description: '',
            isActive: false,
            companyId: parseInt(companyId),
            levels:checkinglevels,
            maxAmount: Number(data?.maxAmount),
            name: data?.name,
            percent: Number(data?.percent),
          });
        }
       else if(points && Boolean(bonusPoint?.isActive)){
          setModalForActive(false);
          useProgramSave.mutate({
            useProgram: localyPaymentfirst ? true:false,
            usePoint: localyPaymentsecond ? true:false,
          });
          loyalityPut.mutate({
            cashbackReturnedDay:data?.cashbackReturnedDay>=0 ? Number(data?.cashbackReturnedDay):'',
            description: '',
            isActive: false,
            companyId: parseInt(companyId),
            levels:checkinglevels,
            maxAmount: Number(data?.maxAmount),
            name: data?.name,
            percent: Number(data?.percent),
          });
        }
        else {
        setModalForActive(true);
        let dataProgram={
          useProgram: localyPaymentfirst ? true:false,
          usePoint: localyPaymentsecond ? true:false,
        }
        let dataLoyality={
          cashbackReturnedDay:data?.cashbackReturnedDay>=0 ? Number(data?.cashbackReturnedDay):'',
          description: '',
          isActive: false,
          companyId: parseInt(companyId),
          levels:checkinglevels,
          maxAmount: Number(data?.maxAmount),
          name: data?.name,
          percent: Number(data?.percent),
        }
        setRequestProgram(dataProgram);
        setLoyalityProgram(dataLoyality);
    }
  }
}
      else {
        setpayGoModal(true);
      }
  };
 

  React.useEffect(()=>{
    if(Boolean(responseCashback?.data?.data?.data?.isActive)){
      setCashback(Boolean(responseCashback?.data?.data?.data?.isActive))
    }
  },[responseCashback?.data?.data?.data?.isActive,Boolean(cashBack)])
 
  React.useEffect(()=>{
   if(Boolean(responseDiscount?.data?.data?.data?.isActive)){
    setDiscounts(Boolean(responseDiscount?.data?.data?.data?.isActive))
   }

  },[responseDiscount?.data?.data?.data?.isActive,Boolean(disCount)])

  React.useEffect(()=>{
    if(Boolean(responseBonusPoint?.data?.data?.data?.isActive)){
      setPoints(Boolean(responseBonusPoint?.data?.data?.data?.isActive))
    }
    
  },[responseBonusPoint?.data?.data?.data?.isActive,Boolean(bonusPoint)])
 

  React.useEffect(() => {
    if(discounts){
      responseDiscount.refetch();
      if(Boolean(disCount)){
    
        if(defaultValue?.cashbackReturnedDay==0 || defaultValue?.cashbackReturnedDay>0){
          setValue('cashbackReturnedDay',defaultValue?.cashbackReturnedDay);
        }
        if(convertedValue?.length>0){
          setValue(`levels`, convertedValue );
        }
        if(convertedValue?.length==0 ||convertedValue==undefined||convertedValue==null){
          reset({requirments:''})
      } 
    setValue('maxAmount', defaultValue?.maxAmount);
    setValue('name', defaultValue?.name);
    setValue('percent', defaultValue?.percent);
    if(defaultValue?.cashbackReturnedDay){
      setValue('cashbackReturnedDay', defaultValue.cashbackReturnedDay);
    }
      }
      if(convertedValue==undefined || convertedValue==null ){
        reset({percent:undefined})
        reset({maxAmount:''})
        // reset({cashbackReturnedDay:0})
      }
     }

    if(cashback){
      responseCashback.refetch();
        if(Boolean(cashBack)){
          if(defaultValue?.cashbackReturnedDay==0 || defaultValue?.cashbackReturnedDay>0){
            setValue('cashbackReturnedDay',defaultValue?.cashbackReturnedDay);
          }
          if(convertedValue?.length>0){
            setValue(`levels`, convertedValue );
          }
          if(convertedValue?.length==0 ||convertedValue==undefined|| convertedValue==null){
            reset({requirments:''})
        }
        setValue('maxAmount', defaultValue?.maxAmount);
        setValue('name', defaultValue?.name);
        setValue('percent', defaultValue?.percent);
        if(defaultValue?.cashbackReturnedDay){
          setValue('cashbackReturnedDay', defaultValue.cashbackReturnedDay);
        }
    }  
    if(convertedValue==undefined || convertedValue==null ){
      reset({percent:undefined})
      reset({maxAmount:''})
      // reset({cashbackReturnedDay:0})
    }
  }    

    if(points){
      responseBonusPoint.refetch();
      if(Boolean(bonusPoint)){
          if(defaultValue?.cashbackReturnedDay==0 || defaultValue?.cashbackReturnedDay>0){
            setValue('cashbackReturnedDay',defaultValue?.cashbackReturnedDay);
          }
          if(convertedValue?.length>0){
            setValue(`levels`, convertedValue );
          }
          if(convertedValue?.length==0 ||convertedValue==undefined ||convertedValue==null){
            reset({requirments:''})
        } 
        setValue('maxAmount', defaultValue?.maxAmount);
        setValue('name', defaultValue?.name);
        setValue('percent', defaultValue?.percent);
        if(defaultValue?.cashbackReturnedDay){
          setValue('cashbackReturnedDay', defaultValue.cashbackReturnedDay);
        }
      }
    if(convertedValue==undefined || convertedValue==null ){
      reset({percent:undefined})
      reset({maxAmount:''})
      // reset({cashbackReturnedDay:0})
    }
    }
  }, [Boolean(defaultValue),points,discounts,cashback,Boolean(cashBack),Boolean(bonusPoint),Boolean(disCount)]);



  let checkPercentage =
    Number(watch(`levels.${0}.percent`)) &&
    Number(watch("percent")) >= Number(watch(`levels.${0}.percent`))
      ? true
      : false;

 let isEmpty=disCount?.isActive ||cashBack?.isActive||bonusPoint?.isActive ||discounts||cashback||points;
 let checkEmpty=isEmpty==false ||isEmpty==undefined ;
 
const saveHandle=() => {
                      loyalityPut.mutate(loyalityProgram)
                      useProgramSave.mutate(requestprogram)
                      setModalForActive(false)
          }
const saveActiveHandle=()=>{
        loyalityPut.mutate(loyalityProgram,
          {
            onSuccess: (res) => {
                InitialhandleSwitchPush()
                setModalForActive(false);
              }
          })
  useProgramSave.mutate(requestprogram)
  setModalForActive(false)
}

  return (
    <Container>
    <LeftSide>
    <GroupToggle>
    <CustomToggle checked={discounts} onChange={handleChangeDiscount} />
    
        <ToggleInfo>
          <h5>Предоставление скидки</h5>
          <p>
           {infoData==2 ? 'Клиент получает скидку при каждом пополнении карты парка в размере определенного %':'Клиент получает скидку при каждой покупке в размере определенного %'}
          </p>
        </ToggleInfo>
      </GroupToggle>
      <GroupToggle>
      <CustomToggle checked={cashback} onChange={handleChangeCashback} />
      
        <ToggleInfo>
          <h5>Предоставление кешбэка</h5>
          <p>
          {infoData==2 ?'Клиент получает кешбэк в виде реальных денег после каждого пополнения карты парка' :  'Клиент получает кешбэк в виде реальных денег после каждой покупки'}
          </p>
        </ToggleInfo>
      </GroupToggle>
      <GroupToggle>
      <CustomToggle checked={points} onChange={handleChangePoints} />
      
        <ToggleInfo>
          <h5>Предоставление баллов</h5>
          <p>
          {infoData==2 ? 'Клиент получает баллы после каждого пополнения карты парка, которые  может потратить только у вас в компании':'Клиент получает баллы после каждой покупки которые может потратить только у вас в компании'}  
          </p>
        </ToggleInfo>
      </GroupToggle>
      {infoData===2 &&  <GroupToggle>
      <CustomToggle checked={isEmpty==true ? false:typePark || checkTypePark==false} onChange={handleChangePark} />
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
  
      <WrapperModal>
      <h3 style={{ marginRight: '20px' }}>
      {t('paygowarning')}
          </h3>
          <p>
          Функция оплата на местах отключена. Обратитесь в службу поддержки
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              buttonStyle={{ color: '#223367', bgcolor: '#ffffff' }}
              margin={{ laptop: '0 22px 0 0' }}
              onClick={() => {
                setpayGoModal(false);
               
              }}
              startIcon={<CancelIcon />}
            >
              Отмена
            </Button>
            <Button
              margin={{ laptop: '0 22px 0 0' }}
              onClick={() => {
                setpayGoModal(false);
                history.push('/support');
              }}
              buttonStyle={{ shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' }}
              startIcon={<SendIcon />}
            >
          {t('Написать')}
            </Button>
          </div>
        
            </WrapperModal>
         </Modal>

         <Modal open={modalActive}>
         <WrapperModal>
         <h3 style={{ marginRight: '20px', padding:'5px 0px 25px 0px' }}>
      {t(`Хотите активировать Программу лояльности - ${discounts ? 'Скидка' :cashback ? 'Кешбэк':points ? 'Баллы':''} ? `)}
          </h3>
     
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                   onClick={saveHandle}
                startIcon={<NewSaveIcon />}
                buttonStyle={{
                  bgcolor: 'rgba(96, 110, 234, 0.1)',
                  color: '#606EEA',
                }}
               margin={{laptop:'0px 4px'}}>
                {t('save')}
              </Button>    
            <Button
                 onClick={saveActiveHandle}
                startIcon={<SaveIcon />}
                buttonStyle={{
                bgcolor: '#606EEA',
                color: '#fff',
              }}
              margin={{laptop:'0px 8px'}}
            >
              {t('Активировать')}
            </Button>
            </div>
            </WrapperModal>
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
            { infoData==2 && checkTypePark==false ? <div >
            <img src={typeParkImage} />
          </div>: <EmptySetting />}
          {infoData ==2 ? <EText>{t('Программа лояльности отключена')}</EText>: <EText>{t('empty_setting_text')}</EText>}
            </Grid>
          ):
       
    <RightSide>
        <RightSideContent>
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
          rules={{ required: true ,pattern:/\S/}}
          render={({ field }) => (
            <Input
              label={t("status_name")}
              type="string"
              autoComplete={"off"}
              maxLength={30}
              width={width>1550 ? { maxwidth:500, minwidth: 300}:{ maxwidth:350, minwidth: 250}}
              margin={{ laptop: "0px 20px 0px 0px" }}
              field={field}

              error={!!errors.name}
              message={t("requiredField")}
            />
          )}
        />

        <Controller
          name={`percent`}
          rules={{ required: true,pattern:/\S/,min:1 }}
          control={control}
       
          render={({ field }) => (
            <InputFormat
              autoComplete={"off"}
              // label={}
              type="string"
              max="100"
              width={{
                width: "106px",
                minwidth:100,
              }}
              margin={{
                laptop: "25px 0 0",
              }}
              IconEnd={
                <PercentDiv>
                  <PercentIcon />
                </PercentDiv>
              }
              field={field}
              // message={t("requiredField")}
              error={errors.percent}
            />
          )}
        />
        <IconStyleMain>
          <HoverMainAdd>

            {fields?.length<=3 ? <HoverMainIcon onClick={() => append({ name: "" })}>
            <PlusIcon />
          </HoverMainIcon>:
          <HoverMainIcon >
          <PlusIcon />
        </HoverMainIcon>
          }
         
          </HoverMainAdd>
        </IconStyleMain>
      </TitleForm>
      <div>

        {console.log('fields',fields)}

        {fields.map((item, index) => (
          <>
            <div key={item.id}>
              <TitleFormChild >
                <Controller
                  rules={{
                    required: true,
                    pattern:/\S/,
                  }}
                  name={`levels.[${index}].name`}
             
                  control={control}
                  render={({ field }) => (
                    <Input
                      label={t("status_name")}
                      type="string"
                      autoComplete={"off"}
                      maxLength={30}
                      width={width>1550 ? { maxwidth:500, minwidth: 300}:{ maxwidth:350, minwidth: 250}}
                      margin={{ laptop: "0px 20px 0px 0px" }}
                      field={field}
                      error={!!errors.levels?.[index]?.name}
                      message={t("requiredField")}
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
                    
                      error={
                        !!errors.levels?.[index]?.percent ||checkPercentage
                     
                      }
                      IconEnd={
                        <PercentDiv>
                          <PercentIcon />
                        </PercentDiv>
                      }
                    />
                  )}
                />
                <IconStyle style={{marginLeft:'30px'}}>
                  {fields?.length<=3 ?  <div onClick={() => append({ name: "" })}>
            <PlusIcon />
          </div>:<div >
            <PlusIcon />
          </div>}
         
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
                        width={{ minwidth: 170,width:'fit-content',maxwidth:170 }}
                        error={!!errors.levels?.[index]?.type}
                        {...field}
                        options={ infoData==2 ? 
                         TypeParkMainconditionTypes:MainconditionTypes
                        }
                        //   options={ infoData==2 ? 
                        //    TypeParkMainconditionTypes:FirstconditonTypes
                        //  }
                        //  isOptionDisabled={(option:any) =>
                        //   option.value=='Рекомендации'
                        // }
                        //  isOptionDisabled={(option:any)=>watch(`levels[${index}].type.id`)==2 && option.value=='Рекомендации'}
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
                            watch(`levels[${index}].type`)&&  <div>{"uzs"}</div>
                          ) : (
                            watch(`levels[${index}].type`)&& <p style={{ fontSize: "12px" }}>{"шт"}</p>
                          )
                        }
                        maxLength={11}
                        width={{
                          minwidth: 130 ,maxwidth:140
                        }}
                        field={field}
                        error={!!errors.levels?.[index]?.amount }
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
            min:1,
          }}
          control={control}
          render={({ field }) => (
            <InputFormat
              label={t("Какой процент счета можно оплатить баллами?")}
              type='tel'
             
              max='100'
              autoComplete={"off"}
              width={width>1550 ? { maxwidth:500, minwidth: 300}:{ maxwidth:350, minwidth: 300}}
              margin={{ laptop: "0px 20px 5px 0px" }}
              field={field}
              error={errors.maxAmount}
              message={errors.maxAmount?.type=='required' ? t("requiredField"):t('minvalue',{value:1})}
            />
          )}
        />
      </TitleForm>
      {cashback && <TitleForm>
                            <Controller
                              name='cashbackReturnedDay'
                              control={control}
                              rules={{
                                required: cashback,
                                max:cashback && 30,
                              
                              }}
                              render={({ field }) => {
                                return (
                                  <InputFormat
                                    field={field}
                                    autoComplete={"off"}
                                    label={t('give_cashback_after')}
                                    width={width>1550 ? { maxwidth:500, minwidth: 300}:{ maxwidth:350, minwidth: 300}}
                                    margin={{ laptop: "0px 20px 0px 0px" }}
                                    IconEnd={<IconWord>{t('дней')}</IconWord>}
                                    error={!!errors.cashbackReturnedDay }
                                    message={errors.cashbackReturnedDay?.type=='required' ? t('requiredField'):t('maxcharactersdays',{value:30})}
                                  />
                                );
                              }}
                            />
                          </TitleForm>}
      <LocalyPayment>
      {infoData !==2 && <div>
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
                  </div>}
        <SubmitButton>
          <SaveButton />
        </SubmitButton>
      </LocalyPayment>
    </Form>
}
</RightSideContent>
    </RightSide>}
    
  </Container>
   
  );
};
export default Right;
