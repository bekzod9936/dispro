import {useAppSelector } from 'services/redux/hooks';
import { useFieldArray, Controller } from "react-hook-form";
import InputFormat from "components/Custom/InputFormat";
import MultiSelect from "components/Custom/MultiSelect";
import { ReactComponent as Remove } from "assets/icons/exit_mini.svg";
import {OnlyOneOr,TypeParkConditionTypes,conditonTypes,Or,FirstconditonTypes} from '../utils';
import { ReactComponent as Plus } from "assets/icons/plus_mini.svg";
import {
  IconStyle,
  DynamicGroup,
  DynamicLabel,
  TitleInsideFormChildMore,
  IconHover,
  IconHoverElement,
} from "../../../style";
const NestedArray = ({
  nestIndex,
  control,
  watch,
  errors,
}: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `levels.[${nestIndex}].requirements`,
  });
  const infoData = useAppSelector((state) => state.info.data?.type);
  let selectedItem=watch(`levels.[${nestIndex}].type.id`);
  
  let conditionFilter=infoData==2 ? TypeParkConditionTypes.filter((item)=> selectedItem !==item.id):conditonTypes.filter((item)=> selectedItem !==item.id)
  let secondconditionFilter=conditionFilter.filter((item)=> item.value !==watch(`levels.[${nestIndex}].requirements.[${0}].type.value`))
  let thirdconditionFilter=secondconditionFilter.filter((item)=>item.value !==watch(`levels.[${nestIndex}].requirements.[${1}].type.value`))

  return (
    <>
      <IconStyle>
        {fields.length <= 1 ? (
            <IconHover>
          <IconHoverElement  onClick={() => append({})}>
            <Plus />
          </IconHoverElement>
          </IconHover>
        ) 
        : (
          <div style={{width:'20px'}}>
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
                    // options={watch(`levels.[${nestIndex}].requirements.[${k}].type.value`)=='Рекомендации' ? OnlyOneOr:Or}
                    options={Or}
                    width={{ maxwidth: 100,width:'fit-content',minwidth:80 }}
                    {...field}
                    error={!!errors?.levels?.[nestIndex]?.requirements?.[k]?.condition}
               
                    isOptionDisabled={(option:any) =>
                      watch(`levels.[${nestIndex}].requirements.[${k}].type.value`)=='Рекомендации' && option.value=='или'
                    }
       
                    selectStyle={{
                      radius: !!errors?.levels?.[nestIndex]?.requirements?.[k]?.condition ? 14:0,
                      borderbottom:!!errors?.levels?.[nestIndex]?.requirements?.[k]?.condition ? " 1px solid #FF5E68" :"1px solid #606EEA",
                      border: "transparent",
                      bgcolor: "transparent",
                      inpadding:'0 20px 0 0',
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
                    // options={
                    //   watch(`levels.[${nestIndex}].requirements.[${k}].condition.value`)=='или' ? thirdconditionFilter.filter((item)=>item.value=='Посещения'):thirdconditionFilter
                    // }
                    options={
                      FirstconditonTypes
                    }
                    isOptionDisabled={(option:any) =>
                      watch(`levels.[${nestIndex}].requirements.[${k}].condition.value`)=='или' && option.value=='Рекомендации'
                    }
                    width={{ minwidth: 170,width:'fit-content',maxwidth:170 }}
                    {...field}
                    error={!!errors?.levels?.[nestIndex]?.requirements?.[k]?.type}
                    selectStyle={{
                      radius:!!errors?.levels?.[nestIndex]?.requirements?.[k]?.type ? 14: 0,
                      borderbottom: !!errors?.levels?.[nestIndex]?.requirements?.[k]?.type ? " 1px solid #FF5E68" :"1px solid #606EEA",
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
                    IconEnd={watch(`levels.[${nestIndex}].requirements.[${k}].type.id`) !==1 ? watch(`levels.[${nestIndex}].requirements.[${k}].type`) && <p style={{ fontSize: "12px" }}>{"шт"}</p>:watch(`levels.[${nestIndex}].requirements.[${k}].type`) &&<div>{"uzs"}</div>}
                    maxLength={11}
                    width={{
                      minwidth: 130 ,maxwidth:140
                    }}
                    field={field}
                    error={!!errors.levels?.[nestIndex]?.requirements?.[k]?.amount}
                    inputStyle={{
                      inpadding: "10px 10px 5px 2px",
                      border: "none",
                      borderbottom:!!errors.levels?.[nestIndex]?.requirements?.[k]?.amount ? " 1px solid #FF5E68": "1px solid #606EEA",
                      bgcolor: "transparent",
                      radius:!!errors.levels?.[nestIndex]?.requirements?.[k]?.amount ? 14: 0,
                      fitheight: true,
                    }}
                  />
                )}
              />
            </DynamicGroup>
            <IconStyle>
            <IconHover>
          <IconHoverElement onClick={() => remove(k)}>
            <Remove />
          </IconHoverElement>
          </IconHover>
          </IconStyle>
          </TitleInsideFormChildMore>
        </>
      ))}
    </>
  );
};

export default NestedArray;
