import { Checkbox, FormControlLabel } from "@material-ui/core";
import InputFormat from "components/Custom/InputFormat";
import { Duration } from "pages/CompanyPages/services/components/Duration";
import { FormFieldTypes } from "pages/CompanyPages/services/utils/types";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Fields, GridContainer, useStyles } from "./style";

interface DurationsProps {}
export const Durations: React.FC<DurationsProps> = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { control } = useFormContext<FormFieldTypes>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "preparationTime",
  });

  const handleChange = (event: React.ChangeEvent<{}>, checked: boolean) => {
    if (checked) {
      append({
        hours: "",
        days: "",
        minutes: "",
      });
    } else {
      remove(0);
    }
  };

  return (
    <div className={styles.wrapper}>
      <FormControlLabel
        classes={{ root: styles.root }}
        onChange={handleChange}
        control={
          <Checkbox
            className={styles.checkbox}
            disableRipple
            checkedIcon={
              <span className={`${styles.icon} ${styles.checkedIcon}`} />
            }
            icon={<span className={styles.icon} />}
          />
        }
        label={t("preparationTime")}
        labelPlacement="end"
      />
      <Fields>
        <h4>Задайте вашему товару время изготовления</h4>
        {fields.map((item, index) => (
          <GridContainer key={item.id}>
            <Duration name={`preparationTime.${index}.days`} label="days" />
            <Duration name={`preparationTime.${index}.hours`} label="hours" />
            <Duration
              name={`preparationTime.${index}.minutes`}
              label="minutes"
            />
          </GridContainer>
        ))}
      </Fields>
    </div>
  );
};
