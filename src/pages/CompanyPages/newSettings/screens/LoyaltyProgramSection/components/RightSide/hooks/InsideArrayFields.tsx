import { useTranslation } from "react-i18next";
import {
    Controller,
  } from "react-hook-form";
import {
    IconStyle,
    DynamicGroup,
    DynamicLabel,
    TitleInsideFormChildMore,
    CloseIcon,
  } from "../../../style";

import {Or} from "../utils";
import InputFormat from "components/Custom/InputFormat";
import MultiSelect from "components/Custom/MultiSelect";

interface ArrayProps {
    fields:any[];
    remove:any;
    control:any;
    errors:any;
    globalselect:any;
    smallfields:any;
    OneOr:any;
    newdata:any;
    childselect:any;
    mainselect:any;
    smallremove:any;
    smallappend:any;
    FirstVariantNumber:any;
    FirstVariantLabel:string;
    checkVariant:any;
    ThirdVariantNumber:number |string;
    SecondVariantLabel:string;
    SecondVariantNumber:number|string;
    ThirdVariantLabel:string;
    OrVariant:any;
} 

const InsideArrayFields=({...PropsArrayField}:ArrayProps)=>{
    const { t } = useTranslation();
    return (
        <>
               {PropsArrayField.smallfields.map(({ id }:any, childindex:any) => (
                <>
                  <TitleInsideFormChildMore key={id}>
                    <DynamicGroup>
                      <Controller
                        name={`insideconditions[${childindex}].or`}
                        defaultValue={"Требование"}
                        control={PropsArrayField.control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <MultiSelect
                            isMulti={false}
                            width={{ maxwidth: 150, minwidth: 100 }}
                            defaultValue={"Требование"}
                            error={PropsArrayField.errors.insideconditions?.[childindex]?.or}
                            message={t("requiredField")}
                            field={field}
                            options={PropsArrayField.OneOr.length > 0 ? PropsArrayField.OneOr : Or}
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
                        name={`insideconditions[${childindex}].when`}
                        defaultValue={"Требование"}
                        control={PropsArrayField.control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <MultiSelect
                            isMulti={false}
                            width={{ minwidth: 200 }}
                            defaultValue={"Требование"}
                            error={PropsArrayField.errors.when}
                            message={t("requiredField")}
                            field={field}
                            options={
                              (PropsArrayField.newdata?.length > 0 && PropsArrayField.newdata) || PropsArrayField.childselect
                                ? PropsArrayField.childselect
                                : PropsArrayField.mainselect
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
                      <DynamicLabel>{t('больше')}</DynamicLabel>
                      <Controller
                        name={`insideconditions[${childindex}].more`}
                        control={PropsArrayField.control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <InputFormat
                            defaultValue={""}
                            autoComplete={"off"}
                            variant="standard"
                            IconEnd={<p style={{ fontSize: "12px" }}>{"шт"}</p>}
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
                        <div onClick={() => PropsArrayField.smallremove(childindex)}>
                          <CloseIcon />
                        </div>
                    </IconStyle>
                  </TitleInsideFormChildMore>
               
                </>
              ))}
        </>
    )
}
export default InsideArrayFields;