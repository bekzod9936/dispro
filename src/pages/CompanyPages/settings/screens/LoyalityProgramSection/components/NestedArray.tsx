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
}

const NestedArray = ({ index, control }: IProps) => {
  const { t } = useTranslation();
  const levels = useWatch({
    control,
    name: `levels`,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: `levels[${index}].requirements`,
  });

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

  console.log(levels, "fields requirements");
  const addIcon = (smallIndex: number, value: any) => {
    if (smallIndex === 0 && fields.length < 3) {
      return (
        <RippleEffect
          onClick={() =>
            append({
              type: 1,
              amount: 0,
              condition: "or",
              unit: "шт",
            })
          }
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
                  rules={{ required: true }}
                  render={({ field }) => (
                    <MultiSelect
                      defaultValue={value?.condition}
                      options={
                        value?.type !== 3
                          ? [
                              { value: "and", label: t("and") },
                              { value: "or", label: t("or") },
                            ]
                          : [{ value: "and", label: t("and") }]
                      }
                      field={field}
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
                  )}
                />
              )}
            </SelectGrid>

            <SelectGrid alignItems="flex-end" item xs={4}>
              <SubText>{t("when").toLowerCase()}</SubText>

              <Controller
                name={`levels.${[index]}.requirements.${[smallIndex]}.type`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <MultiSelect
                    defaultValue={value.type}
                    options={[
                      { value: 1, label: t("purchaseSum") },
                      { value: 2, label: t("companyVisits") },
                      {
                        value: 3,
                        label: t("recomendations"),
                      },
                    ]}
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
                    field={field}
                    width={{
                      minwidth: 120,
                    }}
                    iconmargin="0"
                    // error={errors.companyType ? true : false}
                    message={t("requiredField")}
                  />
                )}
              />
            </SelectGrid>

            <LevelGrid item xs={5} direction="row" justifyContent="center">
              <SubText>{t("more").toLowerCase()}</SubText>
              <Input
                name="level"
                type="number"
                variant="standard"
                defaultValue={value?.amount}
                IconEnd={unitIcon(value.unit)}
                width={{
                  minwidth: 100,
                }}
                onChange={(e) => {
                  console.log(e);
                  // handleAmountChange(
                  //   e,
                  //   item,
                  //   value,
                  //   index,
                  //   smallIndex
                  // )
                }}
                inputStyle={{
                  inpadding: "0 0 5px 2px",
                  border: "none",
                  borderbottom: "1px solid #606EEA",
                  bgcolor: "transparent",
                  radius: 0,
                  fitheight: true,
                }}
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
