import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "components/Custom/Input";
import Checkbox from "components/Custom/CheckBox";
import { ReactComponent as PercentIcon } from "assets/icons/percent_icon.svg";
import InputFormat from "components/Custom/InputFormat";
import { PlusIcon } from "newassets/icons/icons";
import { numberWithNew } from "services/utils";
import NestedArray from './hooks/NestedArray';
import {
  Controller,
  useForm,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SaveButton } from "components/Custom/Buttons/Save";
import MultiSelect from "components/Custom/MultiSelect";
import { conditonTypes, Or, OnlyOneOr, mainconditionTypes } from "./utils";
import {
  Form,
  Title,
  TitleForm,
  PercentDiv,
  IconStyle,
  TitleFormChild,
  LocalyPayment,
  DeleteIcon,
  LittlePlus,
  SubmitButton,
  DynamicGroup,
  DynamicLabel,
  MainDynamicGroup,
  ContentVariant,
  ContentGroup,
  TitleInsideFormChildMore,
  CloseIcon,
  TitleInsideFormChild,
} from "../../style";
import { object } from "yup/lib/locale";

const Right = () => {
  const { t } = useTranslation();
  const [localyPaymentfirst, setLocalPaymentFirst] = useState(false);
  const [localyPaymentsecond, setLocalPaymentSecond] = useState(false);
  const subs = [{ name: "Math" }, { name: "english" }];
  const unitIcon = (unit: string | number) => {
    if (unit === "UZS") return <div>{t("uzs")}</div>;
    else if (unit === "шт") return <div>{t("quantity")}</div>;
  };
  const [changesd, setCfghf] = useState<boolean>(false);

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
    register,
    control,
    setValue,
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

  const validateee = watchFields2 && watchFields1 >= watchFields2 ? true : false;
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
  console.log('CheckOrVariant',CheckOrVariant)
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(submitSettings)}>
        <Title>
          <h5>Статусы клиентов</h5>
          <p>Создайте статусы и определите размер скидки</p>
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

        {mainfields.map(({ id }, index) => (
          <>
            <TitleFormChild key={id}>
              <Controller
                rules={{
                  required: true,
                }}
                name={`сonditions[${index}].name`}
                control={control}
                render={({ field }) => (
                  <Input
                    label={t("status_name")}
                    type="string"
                    autoComplete={"off"}
                    width={{ width: "400px" }}
                    margin={{ desktop: "0px 20px 0px 0px" }}
                    field={field}
                    error={errors.сonditions?.[index]?.name}
                    message={t("requiredField")}
                  />
                )}
              />
              <Controller
                name={`сonditions[${index}].percentage`}
                rules={{
                  required: true,
                  max: 100,
                  min: 1,
                }}
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <InputFormat
                    label={""}
                    autoComplete={"off"}
                    type="string"
                    // defaultValue={setCfghf(
                    //   validateee ||
                    //     watch(`сonditions[${index - 1}].percentage`) >
                    //       watch(`сonditions[${index}].percentage`)
                    //     ? true
                    //     : false
                    // )}
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
                    error={
                      errors.сonditions?.[index]?.percentage 
                      // ||
                      // validateee ||
                      // watch(`сonditions[${index - 1}].percentage`) >
                      //   watch(`сonditions[${index}].percentage`)
                      //   ? true
                      //   : false
                    }
                  />
                )}
              />
              <IconStyle>
                <div onClick={() => mainremove(index)}>
                  <DeleteIcon />
                </div>
              </IconStyle>
            </TitleFormChild>
            <TitleInsideFormChild key={id}>
              <DynamicGroup>
                <DynamicLabel>когда</DynamicLabel>
                <Controller
                  name={`сonditions[${index}].when`}
                  defaultValue={"Требование"}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <MultiSelect
                      isMulti={false}
                      width={{ minwidth: 200 }}
                      defaultValue={"Требование"}
                      error={errors.сonditions?.[index]?.when}
                      message={t("requiredField")}
                      field={field}
                      options={
                        globalselect?.length > 0 ? globalselect : conditonTypes
                      }
                      selectStyle={{
                        radius: 0,
                        borderbottom: "1px solid #606EEA",
                        border: "transparent",
                        bgcolor: "transparent",
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
                  name={`сonditions[${index}].more`}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <InputFormat
                      defaultValue={""}
                      autoComplete={"off"}
                      variant="standard"
                      IconEnd={<div>{"uzs"}</div>}
                      maxLength={11}
                      width={{
                        maxwidth: 150,
                      }}
                      field={field}
                      inputStyle={{
                        inpadding: "10px 10px 5px 2px",
                        border: "none",
                        borderbottom: "1px solid #606EEA",
                        bgcolor: "transparent",
                        radius: 0,
                        fitheight: true,
                      }}
                    />
                  )}
                />
              </DynamicGroup>
              <IconStyle>
                <div onClick={() => smallfields.length <= 2 && smallappend({})}>
                  {smallfields.length <= 1 && <LittlePlus />}
                </div>
              </IconStyle>
            </TitleInsideFormChild>
             <NestedArray nestIndex={index} control={control} newdata={newdata} OneOr={OneOr} mainselect={mainselect} Or={Or} childselect={childselect}/>
           
          </>
        ))}
        {/* {FirstVariantNumber ? (
          <ContentGroup>
            <ContentVariant>
              <h5>Вариант №1</h5>
              <p>
                {FirstVariantLabel&& FirstVariantLabel}
                <span>
                  {" : " +
                    numberWithNew({
                      number: Number(FirstVariantNumber),
                      defaultValue: 0,
                    })}
                </span>
              </p>
          
                  <p>
                
                  { SecondVariantLabel && SecondVariantLabel}
                  <span>
                    {SecondVariantNumber &&
                      " : " +
                        numberWithNew({
                          number: Number(SecondVariantNumber),
                          defaultValue: 0,
                        })}
                  </span>
                </p>

           <p>
                  {ThirdVariantLabel && ThirdVariantLabel}
                  <span>
                    { ThirdVariantNumber &&
                      " : " +
                        numberWithNew({
                          number: Number(ThirdVariantNumber),
                          defaultValue: 0,
                        })}
                  </span>
                </p>
          
            </ContentVariant>
            {OrVariant.length > 0 && (
              <ContentVariant>
                <h5>Вариант №2</h5>
                <p>
                  {SecondVariantLabel}
                  <span>
                    {" : " +
                      numberWithNew({
                        number: Number(SecondVariantNumber),
                        defaultValue: 0,
                      })}
                  </span>
                </p>
                <p>
                  {ThirdVariantLabel && ThirdVariantLabel}
                  <span>
                    {ThirdVariantNumber && " : " + ThirdVariantNumber}
                  </span>
                </p>
              </ContentVariant>
            )}
          </ContentGroup>
        ) : (
          ""
        )} */}

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
            <h5>Оплата на местах</h5>
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
