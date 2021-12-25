import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "components/Custom/Input";
import Checkbox from "components/Custom/CheckBox";
import { ReactComponent as PercentIcon } from "assets/icons/percent_icon.svg";
import InputFormat from "components/Custom/InputFormat";
import { PlusIcon } from "newassets/icons/icons";

import { Controller, useForm, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SaveButton } from "components/Custom/Buttons/Save";
import MultiSelect from "components/Custom/MultiSelect";
import { conditonTypes,Or } from "./utils";
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
  CloseIcon,
  TitleInsideFormChild,
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

  const schema = yup
    .object({
      base_name: yup.string().required(),
      base_percent: yup.number().positive().integer().required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    // resolver:yupResolver(schema)
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });
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
    console.log("data", data);
  };
  {
    console.log("mainfields", mainfields);
  }
  {
    console.log("smallfields", smallfields);
  }
  return (
    <Form onSubmit={handleSubmit(submitSettings)}>
      <Title>
        <h5>Статусы клиентов</h5>
        <p>Создайте статусы и определите размер скидки</p>
      </Title>
      <TitleForm>
        <Controller
          name={`base_name`}
          rules={{
            required: true,
          }}
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
              message={""}
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
                  error={errors.сonditions?.[index]?.percentage}
                />
              )}
            />
            <IconStyle>
              <div onClick={() => mainremove(index)}>
                <DeleteIcon />
              </div>
            </IconStyle>
          </TitleFormChild>
          {/* {smallfields.map(({ id }, index) => (
            <> */}
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
              <div onClick={() =>smallfields.length <= 2 && smallappend({})}>
               {smallfields.length <= 1 && <LittlePlus />} 
              </div>
            </IconStyle>
          </TitleInsideFormChild>
            
          {smallfields.map(({ id }, index) => (
            <>
              <TitleInsideFormChild key={id}>
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
                        width={{ maxwidth: 100,minwidth:50, }}
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
                    name={`insideconditions[${index}].more`}
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
                  {smallfields.length <= 0 ? (
                    <div onClick={() => smallappend({})}
                    >
                      <LittlePlus />
                    </div>
                  ) : (
                    <div onClick={() => smallremove(index)}>
                      <CloseIcon />
                    </div>
                  )}
                </IconStyle>
              </TitleInsideFormChild>
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
          <SaveButton />
        </SubmitButton>
      </LocalyPayment>
    </Form>
  );
};
export default Right;
