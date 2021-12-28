import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "components/Custom/Input";
import Checkbox from "components/Custom/CheckBox";
import { ReactComponent as PercentIcon } from "assets/icons/percent_icon.svg";
import InputFormat from "components/Custom/InputFormat";
import { PlusIcon } from "newassets/icons/icons";

import ArrayFields from './hooks/ArrayFields';
import {
  Controller,
  useForm,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SaveButton } from "components/Custom/Buttons/Save";

import { conditonTypes, Or, OnlyOneOr, mainconditionTypes } from "./utils";
import {
  Form,
  Title,
  TitleForm,
  PercentDiv,
  IconStyle,
  LocalyPayment,
  SubmitButton,
} from "../../style";

const Right = () => {
  const { t } = useTranslation();
  const [localyPaymentfirst, setLocalPaymentFirst] = useState(false);
  const [localyPaymentsecond, setLocalPaymentSecond] = useState(false);
  const subs = [{ name: "Math" }, { name: "english" }];

  const unitIcon = (unit: string | number) => {
    if (unit === "UZS") return <div>{t("uzs")}</div>;
    else if (unit === "шт") return <div>{t("quantity")}</div>;
  };

  const fieldsSchema = yup.object().shape({
    base_name: yup.string().required("form.required_message"),
    base_percent: yup
      .number()
      .min(1, "Min value 1.")
      .max(100, "Max value 30.")
      .required("form.required_message"),
  });
  const methods = useForm({
    resolver: yupResolver(fieldsSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = methods;

  const {
    fields: mainfields,
    remove: mainremove,
    append: mainappend,
  } = useFieldArray({
    control,
    name: "сonditions",
  });
  const {
    fields: smallfields,
    remove: smallremove,
    append: smallappend,
  } = useFieldArray({
    control,
    name: "insideconditions",
  });


  const submitSettings = (data: any) => {
    console.log(data);
  };
  const data = watch();

  const watchFields1 = watch("base_percent");
  const watchFields2 = watch(`сonditions.${0}.percentage`);


  const mainselect: any[] = [];
  const childselect: any[] = [];
  const globalselect: any[] = [];
  const childConditions = Object.values(conditonTypes);
  const OneOrData = Object.values(Or);
  const OrVariant: any[] = [];
  const FirstVariantLabel = data?.сonditions?.[0]?.when?.label;
  const FirstVariantNumber = data?.сonditions?.[0]?.more;
  const SecondVariantLabel = data?.insideconditions?.[0]?.when?.label;
  const SecondVariantNumber = data?.insideconditions?.[0]?.more;
  const ThirdVariantLabel = data?.insideconditions?.[1]?.when?.label;
  const ThirdVariantNumber = data?.insideconditions?.[1]?.more;
  const checkVariant=data?.insideconditions?.[0];
  const checkVariantLast=data?.insideconditions?.[1];

 
  let OneOr: any = {};


  childConditions.map((item) => {
    if (
      item.id! == data?.сonditions?.[0]?.when?.id &&
      data?.insideconditions?.[0]?.when?.id
    ) {
      globalselect.push(item);
    }
    if (item.id !== data?.сonditions?.[0]?.when.id) {
      mainselect.push(item);
    }
  });
  mainselect?.map((item) => {
    if (
      item.id !==
      (data?.сonditions?.[0]?.when?.id && data?.insideconditions?.[0]?.when?.id)
    ) {
      childselect.push(item);
    }
  });

  data?.insideconditions?.map((item: any) => {
    if (item?.when?.id === 2) {
      OneOr = OneOrData;
    }
    if (item?.when?.id === 3) {
      OneOr = OnlyOneOr;
    }
    if (item?.or?.id === 2) {
      OrVariant.push(item);
    }
  });

  
  let newdata: any[] = [];

  newdata.push(mainselect?.[0]);

  const CheckOrVariant=data?.insideconditions?.[0]?.label==='или' ? true:false;


  const PropsArrayField={
    fields:mainfields,
    OrVariant:OrVariant,
    ThirdVariantNumber:ThirdVariantNumber,
    ThirdVariantLabel:ThirdVariantLabel,
    SecondVariantNumber:SecondVariantNumber,
    SecondVariantLabel:SecondVariantLabel,
    checkVariant:checkVariant,
    FirstVariantLabel:FirstVariantLabel,
    FirstVariantNumber:FirstVariantNumber,
    OneOr:OneOr,
    smallappend:smallappend,
    smallfields:smallfields,
    globalselect:globalselect,
    control:control,
    newdata:newdata,
    smallremove:smallremove,
    mainselect:mainselect,
    errors:errors,
    childselect:childselect,
    remove:mainremove,
    
  }
  
  return (
    <FormProvider {...methods}>

      <Form onSubmit={handleSubmit(submitSettings)}>
        <Title>
          <h5>{t('Статусы клиентов')}</h5>
          <p>{t('Создайте статусы и определите размер скидки')}</p>
        </Title>
        <TitleForm>
          <Controller
            name={`base_name`}
            control={control}
            render={({ field }) => (
              <Input
                label={t("status_name")}
                type="string"
                autoComplete={"off"}
                width={{ width: "400px" }}
                margin={{ desktop: "0px 20px 0px 0px" }}
                field={field}
                error={errors.base_name}
                message={t("requiredField")}
              />
            )}
          />
          <Controller
            name={`base_percent`}
            defaultValue={""}
            control={control}
            render={({ field }) => (
              <InputFormat
                autoComplete={"off"}
                label={""}
                type="string"
                defaultValue={""}
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
                message={t("requiredField")}
                error={errors.base_percent}
              />
            )}
          />
          <IconStyle>
            <div onClick={() => mainappend({})}>
              <PlusIcon />
            </div>
          </IconStyle>
        </TitleForm> 
        <ArrayFields {...PropsArrayField}/>
        <TitleForm>
          <Controller
            name={`how_much_percentage`}
            rules={{
              required: true,
            }}
            control={control}
            render={({ field }) => (
              <Input
                label={t("Какой процент счета можно оплатить баллами?")}
                type="string"
                autoComplete={"off"}
                width={{ width: "400px" }}
                margin={{ desktop: "0px 20px 0px 0px" }}
                field={field}
                error={errors.how_much_percentage}
                message={t("requiredField")}
              />
            )}
          />
        </TitleForm>
        <LocalyPayment>
          <Title>
            <h5>{t('Оплата на местах')}</h5>
          </Title>
          <Controller
            name="useProgram"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={localyPaymentfirst}
                label={t("useLoyaltyProgram")}
              />
            )}
          />{" "}
          <Controller
            name="usePoint"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={localyPaymentsecond}
                label={t("substractingPoints")}
              />
            )}
          />
          <SubmitButton>
            <SaveButton />
          </SubmitButton>
        </LocalyPayment>
      </Form>
    </FormProvider>
  );
};
export default Right;
