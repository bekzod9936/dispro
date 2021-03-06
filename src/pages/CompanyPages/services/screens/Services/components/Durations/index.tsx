import { useEffect } from "react";

//components
import { Duration } from "pages/CompanyPages/services/components/Duration";

//packages
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useTranslation } from "react-i18next";

//other
import { FormFieldTypes } from "pages/CompanyPages/services/utils/types";

//style
import { Fields, GridContainer, useStyles } from "./style";

interface DurationsProps {}

export const Durations: React.FC<DurationsProps> = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const {
    control,
    clearErrors,
    formState: { errors },
    getValues,
  } = useFormContext<FormFieldTypes>();

  const isPreparationTimeOn = getValues("preparationTime");
  const isAtLeastOneFieldFilled = Object.values(
    getValues("preparationTimeData")
  ).some((fieldValue) => fieldValue);

  useEffect(() => {
    if (isAtLeastOneFieldFilled) {
      clearErrors("preparationTimeData.day");
    }
  }, [isAtLeastOneFieldFilled]);

  return (
    <div>
      <Controller
        name="preparationTime"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            classes={{ root: styles.root }}
            checked={field.value}
            onChange={field.onChange}
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
        )}
      />
      {isPreparationTimeOn && (
        <Fields>
          <h4>Задайте вашему товару время изготовления</h4>
          <GridContainer>
            <Duration
              error={errors.preparationTimeData?.day}
              name="preparationTimeData.day"
              label="days"
            />
            <Duration
              error={errors.preparationTimeData?.hour}
              name="preparationTimeData.hour"
              label="hours"
            />
            <Duration
              error={errors.preparationTimeData?.minute}
              name="preparationTimeData.minute"
              label="minutes"
            />
          </GridContainer>
        </Fields>
      )}
    </div>
  );
};
