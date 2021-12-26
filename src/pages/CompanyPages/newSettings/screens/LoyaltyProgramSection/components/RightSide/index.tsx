import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "components/Custom/Input";
import Checkbox from "components/Custom/CheckBox";
import { ReactComponent as PercentIcon } from "assets/icons/percent_icon.svg";
import InputFormat from "components/Custom/InputFormat";
import { PlusIcon } from "newassets/icons/icons";
import { Controller, useForm,FormProvider, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SaveButton } from "components/Custom/Buttons/Save";
import MultiSelect from "components/Custom/MultiSelect";
import { conditonTypes, Or,mainconditionTypes } from "./utils";
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
  const [changesd,setCfghf]=useState<boolean>(false)

  const fieldsSchema = yup.object().shape({
    base_name: yup.string().required("form.required_message"),
    base_percent: yup.number().min(1, 'Min value 1.')
    .max(100, 'Max value 30.').required("form.required_message")
    
  });
  const methods=useForm({ resolver:yupResolver(fieldsSchema),
      mode: "onChange"});
  const {   handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors, isValid },}=methods;
  
  // const {
  //   control,
  //   handleSubmit,
  //   register,
  //   setValue,
  //   watch,
  //   formState: { errors, isValid },
  // } = useForm({
  //   resolver:yupResolver(fieldsSchema),
  //   mode: "onChange"
    
  // });
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
  console.log(data)
  
};
  let data=watch()
 
  let watchFields1 = watch("base_percent"); 
  let watchFields2=watch(`сonditions.${0}.percentage`);

  const validateee=watchFields2&& watchFields1 >=watchFields2 ? true:false;
  let mainselect:any[]=[];
  let childselect:any[]=[];
 let globalselect:any[]=[];
  let childConditions=Object.values(conditonTypes);
 
  childConditions.map((item)=>{
    if(childselect){

    }
    if(item.id !==data?.сonditions?.[0]?.when.id){
      mainselect.push(item)
    }
  })
  
  mainselect?.map((item)=>{
    if(item.id !== (data?.сonditions?.[0]?.when?.id && data?.insideconditions?.[0]?.when?.id)){
      childselect.push(item)
    }
  })

  console.log('childselect',childselect)
  // console.log('watchMainSelect',watch(`сonditions.${0}.when.id`))
// console.log('watchMainSelect',watchMainSelect)
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
              render={({ field, }) => (
             
                <InputFormat
                  label={""}
                  type="string"
                  defaultValue={setCfghf(validateee|| watch(`сonditions[${index-1}].percentage`)>watch(`сonditions[${index}].percentage`)? true:false)}
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
               
                  error={errors.сonditions?.[index]?.percentage ||  validateee|| watch(`сonditions[${index-1}].percentage`)>watch(`сonditions[${index}].percentage`)? true :false}
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
                    options={conditonTypes}
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

          {smallfields.map(({ id }, index) => (
            <>
              <TitleInsideFormChildMore key={id}>
                <DynamicGroup>
                  <Controller
                    name={`insideconditions[${index}].or`}
                    defaultValue={"Требование"}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <MultiSelect
                        isMulti={false}
                        width={{ maxwidth: 150, minwidth: 100 }}
                        defaultValue={"Требование"}
                        error={errors.insideconditions?.[index]?.or}
                        message={t("requiredField")}
                        field={field}
                        options={Or}
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
                  <DynamicLabel>когда</DynamicLabel>
                  <Controller
                    name={`insideconditions[${index}].when`}
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
                        error={errors.when}
                        message={t("requiredField")}
                        field={field}
                        options={childselect ? childselect:mainselect}
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
                    name={`insideconditions[${index}].more`}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <InputFormat
                        defaultValue={""}
                        variant="standard"
                        IconEnd={<p style={{fontSize:'12px'}}>{"шт"}</p>}
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
                  {smallfields.length <= 0 ? (
                    <div onClick={() => smallappend({})}>
                      <LittlePlus />
                    </div>
                  ) : (
                    <div onClick={() => smallremove(index)}>
                      <CloseIcon />
                    </div>
                  )}
                </IconStyle>
              </TitleInsideFormChildMore>
            </>
          ))}
        </>
      ))}
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
          <SaveButton disabled={changesd}/>
        </SubmitButton>
      </LocalyPayment>
    </Form>
    </FormProvider>
  );
};
export default Right;
