import React,{useEffect} from "react";
import { useFieldArray, Controller } from "react-hook-form";
import InputFormat from "components/Custom/InputFormat";
import MultiSelect from "components/Custom/MultiSelect";
import {OnlyOneOr,DefaultOr,conditonTypes,Or} from '../utils';
import {
  IconStyle,
  LittlePlus,
  DynamicGroup,
  DynamicLabel,
  TitleInsideFormChildMore,
  CloseIcon,
} from "../../../style";
const NestedArray = ({
  nestIndex,
  control,
  watch,

}: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `levels.[${nestIndex}].requirements`,
  });
 
  let selectedItem=watch(`levels.[${nestIndex}].type.id`);
  
  let conditionFilter=conditonTypes.filter((item)=> selectedItem !==item.id)
  let secondconditionFilter=conditionFilter.filter((item)=> item.value !==watch(`levels.[${nestIndex}].requirements.[${0}].type.value`))
  let thirdconditionFilter=secondconditionFilter.filter((item)=>item.value !==watch(`levels.[${nestIndex}].requirements.[${1}].type.value`))

  return (
    <>
      <IconStyle>
        {fields.length <= 1 ? (
          <div onClick={() => append({})}>
            <LittlePlus />
          </div>
        ) : (
          <div onClick={() => remove()}>
       <CloseIcon />
          </div>
        )}
      </IconStyle>
      {fields.map(({ id }, k) => (
        <>
          <TitleInsideFormChildMore key={id}>
            <DynamicGroup>
              <Controller
                name={`levels.[${nestIndex}].requirements.[${k}].condition`}
                defaultValue={watch(`levels.[${nestIndex}].requirements.[${k}].condition`)}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <MultiSelect
                    isMulti={false}
                    options={watch(`levels.[${nestIndex}].requirements.[${k}].type.value`)=='Рекомендации' ? OnlyOneOr:Or}
                    width={{ maxwidth: 100, minwidth: 100 }}
                    {...field}
                    // value={watch(`levels.[${nestIndex}].requirements.[${k}].type`)==3 ? OnlyOneOr:Or}
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
                name={`levels.[${nestIndex}].requirements.[${k}].type`}
                defaultValue={watch(`levels.[${nestIndex}].requirements.[${k}].type`)}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <MultiSelect
                    isMulti={false}
                    options={
                     thirdconditionFilter
                    }
                    width={{ minwidth: 190,maxwidth:200 }}
                    // field={field}
                    {...field}
                    isDisabled={thirdconditionFilter?.length>0 ?false:true}
                
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
                name={`levels.[${nestIndex}].requirements.[${k}].amount`}
               
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <InputFormat
                    defaultValue={''}
                    autoComplete={"off"}
                    variant="standard"
                    IconEnd={watch(`levels.[${nestIndex}].requirements.[${k}].type.id`) !==1 ?<p style={{ fontSize: "12px" }}>{"шт"}</p>:<div>{"uzs"}</div>}
                    maxLength={11}
                    width={{
                      minwidth: 130 ,maxwidth:130
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
              <div onClick={() => remove(k)}>
                <CloseIcon />
              </div>
            </IconStyle>
          </TitleInsideFormChildMore>
        </>
      ))}
    </>
  );
};

export default NestedArray;
