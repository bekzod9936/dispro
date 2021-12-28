
import { useTranslation } from "react-i18next";
import Input from "components/Custom/Input";
import InputFormat from "components/Custom/InputFormat";
import MultiSelect from "components/Custom/MultiSelect";
import { ReactComponent as PercentIcon } from "assets/icons/percent_icon.svg";
import { conditonTypes,  } from "../utils";
import InsideArrayFields from "./InsideArrayFields";
import { numberWithNew } from "services/utils";
import {
    Controller,
  } from "react-hook-form";
import {
    PercentDiv,
    IconStyle,
    TitleFormChild,
    DeleteIcon,
    LittlePlus,
    DynamicGroup,
    DynamicLabel,
    ContentVariant,
    ContentGroup,

    TitleInsideFormChild,
  } from "../../../style";

 
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

 const ArrayFields=({...PropsArrayField}:ArrayProps)=>{
    const { t } = useTranslation();
    return (
        <>
        {PropsArrayField.fields.map(({ id }, index) => (
            <>
              <TitleFormChild key={id}>
                <Controller
                  rules={{
                    required: true,
                  }}
                  name={`сonditions[${index}].name`}
                  control={PropsArrayField.control}
                  render={({ field }) => (
                    <Input
                      label={t("status_name")}
                      type="string"
                      autoComplete={"off"}
                      width={{ width: "400px" }}
                      margin={{ desktop: "0px 20px 0px 0px" }}
                      field={field}
                      error={PropsArrayField.errors.сonditions?.[index]?.name}
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
                  control={PropsArrayField.control}
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
                      IconEnd={
                        <PercentDiv>
                          <PercentIcon />
                        </PercentDiv>
                      }
                      error={
                        PropsArrayField.errors.сonditions?.[index]?.percentage 
                      
                      }
                    />
                  )}
                />
                <IconStyle>
                  <div onClick={() => PropsArrayField.remove(index)}>
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
                    control={PropsArrayField.control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <MultiSelect
                        isMulti={false}
                        width={{ minwidth: 200 }}
                        defaultValue={"Требование"}
                        error={PropsArrayField.errors.сonditions?.[index]?.when}
                        message={t("requiredField")}
                        field={field}
                        options={
                            PropsArrayField.globalselect?.length > 0 ? PropsArrayField.globalselect : conditonTypes
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
                    control={PropsArrayField.control}
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
                  <div onClick={() => PropsArrayField.smallfields.length <= 2 && PropsArrayField.smallappend({})}>
                    {PropsArrayField.smallfields.length <= 1 && <LittlePlus />}
                  </div>
                </IconStyle>
              </TitleInsideFormChild>
              <InsideArrayFields {...PropsArrayField}/>
              <ContentGroup>
            <ContentVariant>
              <h5>{t('Вариант №1')}</h5>
              <p>
                {PropsArrayField.FirstVariantLabel&& PropsArrayField.FirstVariantLabel+' : '}
                <span>
                  { +
                    numberWithNew({
                      number: Number(PropsArrayField.FirstVariantNumber),
                      defaultValue: '',
                    })}
                </span>
              </p>
           <p>
                  { PropsArrayField.SecondVariantLabel &&PropsArrayField.SecondVariantLabel}
                  <span>
                    {PropsArrayField.SecondVariantNumber &&
                      " : " +
                        numberWithNew({
                          number: Number(PropsArrayField.SecondVariantNumber),
                          defaultValue: 0,
                        })}
                  </span>
                </p>
           <p>
                  {PropsArrayField.ThirdVariantLabel && PropsArrayField.ThirdVariantLabel}
                  <span>
                    { PropsArrayField.ThirdVariantNumber &&
                      " : " +
                        numberWithNew({
                          number: Number(PropsArrayField.ThirdVariantNumber),
                          defaultValue: 0,
                        })}
                  </span>
                </p>
          
            </ContentVariant>
            {PropsArrayField.OrVariant.length > 0 && (
              <ContentVariant>
                <h5>Вариант №2</h5>
                <p>
                  {PropsArrayField.SecondVariantLabel}
                  <span>
                    {" : " +
                      numberWithNew({
                        number: Number(PropsArrayField.SecondVariantNumber),
                        defaultValue: 0,
                      })}
                  </span>
                </p>
                <p>
                  {PropsArrayField.ThirdVariantLabel && PropsArrayField.ThirdVariantLabel}
                  <span>
                    {PropsArrayField.ThirdVariantNumber && " : " + PropsArrayField.ThirdVariantNumber}
                  </span>
                </p>
              </ContentVariant>
            )}
          </ContentGroup>
            </>
          ))}
            {/* {PropsArrayField.FirstVariantNumber ? ( */}
      
     
        </>
    )
}
export default ArrayFields;