import React from "react";
import { useFieldArray,Controller } from "react-hook-form";
import InputFormat from "components/Custom/InputFormat";
import MultiSelect from "components/Custom/MultiSelect";

import {
    IconStyle,
    LittlePlus,
    DynamicGroup,
    DynamicLabel,
    TitleInsideFormChildMore,
    CloseIcon,
  } from "../../../style";
const NestedArray=({nestIndex,control,newdata,OneOr,Or,childselect,mainselect}:any)=>{
    const { fields, remove, append } = useFieldArray({
        control,
        name: `сonditions.${nestIndex}.nestedArray`
      });

      return (
          <div> {fields.map(({ id }, k) => (
            <>
              <TitleInsideFormChildMore key={id}>
                <DynamicGroup>
                  <Controller
                    name={`сonditions.${nestIndex}.nestedArray.${k}.or`}
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
                        // error={errors.insideconditions?.[index]?.or}
                        // message={t("requiredField")}
                        field={field}
                        options={OneOr.length > 0 ? OneOr : Or}
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
                    name={`сonditions.${nestIndex}.nestedArray.${k}.when`}
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
                        // error={errors.when}
                        // message={t("requiredField")}
                        field={field}
                        options={
                          (newdata?.length > 0 && newdata) || childselect
                            ? childselect
                            : mainselect
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
                    name={`сonditions.${nestIndex}.nestedArray.${k}.more`}
                    control={control}
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
                  {fields.length <= 0 ? (
                    <div onClick={() => append({})}>
                      <LittlePlus />
                    </div>
                  ) : (
                    <div onClick={() => remove(k)}>
                      <CloseIcon />
                    </div>
                  )}
                </IconStyle>
              </TitleInsideFormChildMore>
            </>
          ))}</div>
      )
}

export default NestedArray;