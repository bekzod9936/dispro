import React, { useState } from "react";

import Input from "components/Custom/Input";
import Checkbox from 'components/Custom/CheckBox';
import { ReactComponent as PercentIcon } from "assets/icons/percent_icon.svg";
import InputFormat from "components/Custom/InputFormat";
import { PlusIcon } from "newassets/icons/icons";

import { Controller, useForm, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SaveButton } from 'components/Custom/Buttons/Save';
import MultiSelect from "components/Custom/MultiSelect";

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
} from "../../style";

const Right=()=>{

    const { t } = useTranslation();
    const [localyPaymentfirst, setLocalPaymentFirst] = useState(false);
    const [localyPaymentsecond, setLocalPaymentSecond] = useState(false);
    const subs = [{ name: "Math" }, { name: "english" }];
 
    const {
        control,
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors, isValid },
      } = useForm({
        mode: "onChange",
        shouldFocusError: true,
        reValidateMode: "onChange",
      });
      const { fields, remove, append } = useFieldArray({
        control,
        name: "сonditions",
      });

    return (
        <Form>
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
            <div onClick={() => append({})}>
              <PlusIcon />
            </div>
          </IconStyle>
        </TitleForm>

        {fields.map(({ id }, index) => (
          <TitleFormChild key={id}>
            <Controller
              name={`сonditions[${index}].name`}
              control={control}
              render={({ field }) => (
                <Input
                  label={t("status_name")}
                  type="string"
                  width={{ width: "400px" }}
                  margin={{ desktop: "0px 20px 0px 0px" }}
                  field={field}
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
                  message={""}
                  error={errors.base_percent}
                />
              )}
            />
            <IconStyle>
              <div onClick={() => remove(index)}>
                <DeleteIcon />
              </div>
            </IconStyle>
            {/* {subs.map((sub,i)=>(
              // <>
              // <MultiSelect>

              // </MultiSelect>
              // </>
            ))} */}
          </TitleFormChild>
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
                            name='useProgram'
                            control={control}
                            defaultValue={''}
                            render={({ field }) => (
                              <Checkbox
                                {...field}
                                checked={localyPaymentfirst}
                                label={t('useLoyaltyProgram')}
                              />
                            )}
                          />{' '}
                           <Controller
                            name='usePoint'
                            control={control}
                            defaultValue={''}
                            render={({ field }) => (
                              <Checkbox
                                {...field}
                                checked={localyPaymentsecond}
                                label={t('substractingPoints')}
                              />
                            )}
                          />
                          <SubmitButton><SaveButton  /></SubmitButton>
                              
          </LocalyPayment>
          
      </Form>
    )
}
export default Right;