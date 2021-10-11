import MultiSelect from "components/Custom/MultiSelect";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Input from "components/Custom/Input";
import { LevelGrid, RequirementsGrid, SelectGrid, SubText } from "../styles";
import { IconDiv } from "./style";
import RippleEffect from "components/Custom/RippleEffect";
import { ReactComponent as Plus } from "assets/icons/plus_mini.svg";
import { ReactComponent as Remove } from "assets/icons/exit_mini.svg";
interface IProps {
  index: number;
  control: any;
  getValues: any;
  register?: any;
}

interface ICategory {
  value: string;
  label: string;
}

const NestedArray = ({ index, control, getValues, register }: IProps) => {
  const { t } = useTranslation();
  const levels = useWatch({
    control,
    name: `levels`,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: `levels[${index}].requirements`,
  });

  const loyalityOptions = [
    { value: 1, label: t("purchaseSum") },
    { value: 3, label: t("companyVisits") },
    {
      value: 2,
      label: t("recomendations"),
    },
  ];

  const typeFullOptions = [
    { value: "and", label: t("and") },
    { value: "or", label: t("or") },
  ];

  const oneFullOptions = [{ value: "and", label: t("and") }];

  const removeIcon = (smallIndex: number) => {
    if (smallIndex !== 0) {
      return (
        <RippleEffect onClick={() => remove(smallIndex)} padding={0}>
          <IconDiv>
            <Remove />
          </IconDiv>
        </RippleEffect>
      );
    } else {
      return null;
    }
  };

  const addIcon = (smallIndex: number, value: any) => {
    if (smallIndex === 0 && fields.length < 3) {
      return (
        <RippleEffect
          onClick={() => {
            append({
              type: 1,
              amount: 0,
              condition: "or",
              unit: "шт",
            });
            console.log(getValues("levels"), "values get!!!");
          }}
          padding={0}
        >
          <IconDiv>
            <Plus />
          </IconDiv>
        </RippleEffect>
      );
    } else {
      return null;
    }
  };

  const unitIcon = (unit: string | number) => {
    if (unit === "UZS") return <div>{t("uzs")}</div>;
    else if (unit === "шт") return <div>{t("quantity")}</div>;
  };

  const labelType = (value: string | number) => {
    if (value === 1) {
      return t("purchaseSum");
    } else if (value === 2) {
      return t("recomendations");
    } else if (value === 3) {
      return t("companyVisits");
    } else {
      return "";
    }
  };

  console.log(levels, "levels");
  return (
    <div>
      {fields?.map((value: any, smallIndex: number) => {
        return (
          <RequirementsGrid
            container
            spacing={3}
            justifyContent="space-between"
          >
            <SelectGrid alignItems="flex-end" item xs={2}>
              {smallIndex === 0 ? null : (
                <Controller
                  name={`levels.${[index]}.requirements.${[
                    smallIndex,
                  ]}.condition`}
                  control={control}
                  render={({ field }) => {
                    // : oneFullOptions.find(
                    //     (c) => c.value === value?.condition
                    //   );
                    //   value?.type !== 2
                    // ?

                    return (
                      <MultiSelect
                        {...field}
                        defaultValue={{
                          value: value?.condition,
                          label: t(`${value?.condition}`),
                        }}
                        placeholder={t(`${value?.condition}`)}
                        // defaultValue={{ value: "and", label: t("and") }}
                        options={
                          value?.type !== 2 ? typeFullOptions : oneFullOptions
                        }
                        value={
                          value?.type !== 2
                            ? typeFullOptions.find(
                                (c) => c.value == value?.condition
                              )
                            : oneFullOptions.find(
                                (c) => c.value == value?.condition
                              )
                        }
                        onChange={(e) => field.onChange(e.value)}
                        selectStyle={{
                          radius: 0,
                          borderbottom: "1px solid #606EEA",
                          border: "transparent",
                          bgcolor: "transparent",
                          inpadding: "2px 0",
                          height: {
                            laptop: 20,
                            desktop: 20,
                            planshet: 20,
                            mobile: 20,
                          },
                        }}
                        width={{
                          maxwidth: 60,
                        }}
                        iconmargin="0"
                        // error={errors.companyType ? true : false}
                        message={t("requiredField")}
                      />
                    );
                  }}
                />
              )}
            </SelectGrid>

            <SelectGrid alignItems="flex-end" item xs={4}>
              <SubText>{t("when").toLowerCase()}</SubText>

              <Controller
                name={`levels.${[index]}.requirements.${[smallIndex]}.type`}
                control={control}
                render={({ field }) => {
                  return (
                    <MultiSelect
                      defaultValue={{
                        value: value?.type,
                        label: labelType(value?.type),
                      }}
                      {...field}
                      // name={name}
                      placeholder={labelType(value?.type)}
                      options={loyalityOptions}
                      value={loyalityOptions.find(
                        (c) => c.value == value?.type
                      )}
                      onChange={(e) => field.onChange(e.value)}
                      width={{
                        minwidth: 120,
                      }}
                      selectStyle={{
                        radius: 0,
                        borderbottom: "1px solid #606EEA",
                        border: "transparent",
                        bgcolor: "transparent",
                        inpadding: "2px 0",
                        height: {
                          laptop: 20,
                          desktop: 20,
                          planshet: 20,
                          mobile: 20,
                        },
                      }}
                      iconmargin="0"
                      // error={errors.companyType ? true : false}
                      message={t("requiredField")}
                    />
                  );
                }}
              />
            </SelectGrid>

            <LevelGrid item xs={5} direction="row" justifyContent="center">
              <SubText>{t("more").toLowerCase()}</SubText>
              <Controller
                name={`levels.${[index]}.requirements.${[smallIndex]}.amount`}
                rules={{
                  required: true,
                  maxLength: 13,
                  minLength: 13,
                }}
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    variant="standard"
                    defaultValue={value?.amount}
                    IconEnd={unitIcon(value.unit)}
                    width={{
                      minwidth: 100,
                    }}
                    field={field}
                    inputStyle={{
                      inpadding: "0 0 5px 2px",
                      border: "none",
                      borderbottom: "1px solid #606EEA",
                      bgcolor: "transparent",
                      radius: 0,
                      fitheight: true,
                    }}
                  />
                )}
              />

              {addIcon(smallIndex, value)}
              {removeIcon(smallIndex)}
            </LevelGrid>
          </RequirementsGrid>
        );
      })}
    </div>
  );
};

export default NestedArray;
