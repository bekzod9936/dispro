import MultiSelect from "components/Custom/MultiSelect";
import { Controller, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Input from "components/Custom/Input";
import { LevelGrid, RequirementsGrid, SelectGrid, SubText } from "../styles";
import { IconDiv } from "./style";
import RippleEffect from "components/Custom/RippleEffect";
import { ReactComponent as Plus } from "assets/icons/plus_mini.svg";
interface IProps {
  index: number;
  control: any;
}

const NestedArray = ({ index, control }: IProps) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `levels[${index}].requirements`,
  });

  return (
    <div>
      {fields?.map((value: any, smallIndex: number) => {
        return (
          <RequirementsGrid
            container
            spacing={3}
            justifyContent="space-between"
          >
            <SelectGrid alignItems="flex-end" item xs={3}>
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
                      options={[
                        { value: "and", label: t("and") },
                        { value: "or", label: t("or") },
                      ]}
                      field={field}
                      // error={errors.companyType ? true : false}
                      message={t("requiredField")}
                    />
                  )}
                />
                // <Select
                //   //  color={COLORS.purple}
                //   className={classes.select}
                //   style={{
                //     marginLeft: "15px",
                //     borderColor: COLORS.purple,
                //   }}
                //   value={value?.condition}
                //   onChange={(e) =>
                //     handleConditionChange(e, item, value)
                //   }
                // >
                //   <MenuItem value="and">{t("and")}</MenuItem>
                //   <MenuItem value="or">{t("or")}</MenuItem>
                // </Select>
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
                    defaultValue={value?.condition}
                    options={[
                      { value: 1, label: t("purchaseSum") },
                      { value: 2, label: t("companyVisits") },
                      {
                        value: 3,
                        label: t("recomendations"),
                      },
                    ]}
                    field={field}
                    // error={errors.companyType ? true : false}
                    message={t("requiredField")}
                  />
                )}
              />
              {/* <Select
                          style={{
                            marginLeft: "15px",
                            width: "140px",
                            borderColor: COLORS.purple,
                          }}
                          className={classes.select}
                          value={value?.type}
                          onChange={(e) =>
                            handleSelectChange(e, item, value)
                          }
                        >
                          <MenuItem value={1}>
                            {t("purchaseSum")}
                          </MenuItem>
                          <MenuItem value={2}>
                            {t("companyVisits")}
                          </MenuItem>
                          <MenuItem value={3}>
                            {t("recomendations")}
                          </MenuItem>
                        </Select> */}
            </SelectGrid>

            <LevelGrid item xs={5} direction="row" justifyContent="center">
              <SubText>{t("more").toLowerCase()}</SubText>
              <Input
                name="level"
                type="number"
                variant="standard"
                defaultValue={value?.amount}
                IconEnd={<div>{value.unit}</div>}
                width={{
                  maxwidth: 140,
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
              <RippleEffect onClick={append} padding={0}>
                <IconDiv>
                  <Plus />
                </IconDiv>
              </RippleEffect>
            </LevelGrid>
          </RequirementsGrid>
        );
      })}
    </div>
  );
};

export default NestedArray;
