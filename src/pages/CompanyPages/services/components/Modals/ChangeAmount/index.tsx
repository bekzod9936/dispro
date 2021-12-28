//packages
import { Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import { Checkbox, FormControlLabel, IconButton } from "@material-ui/core";
import Button from "components/Custom/Buttons/Button";
import { SaveButton } from "components/Custom/Buttons/Save";
import Modal from "components/Custom/Modal";
import InputFormat from "components/Custom/InputFormat";

//style
import { Wrapper, CloseIcon, buttonStyles, CancelIcon } from "./style";
import { useStyles } from "pages/CompanyPages/services/screens/Services/components/Durations/style";

//other
import { useChangeAmount } from "pages/CompanyPages/services/hooks";
import { ChangeAmountFormType } from "pages/CompanyPages/services/utils/types";

interface ChangeAmountModalProps {
  count?: number;
  label: string | undefined;
  onClose: () => void;
  open: boolean;
}

export const ChangeAmountModal: React.FC<ChangeAmountModalProps> = ({
  count,
  label,
  onClose,
  open,
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useChangeAmount(count);
  const isCountUnlimited = useWatch({ control, name: "isCountUnlimited" });

  const styles = useStyles();

  const onSubmit = (data: ChangeAmountFormType) => {
    console.log(data);
  };

  return (
    <Modal width={buttonStyles.modal.width} open={open}>
      <Wrapper>
        <div className="header">
          <h4>{t("amountOfItemInCompany")}</h4>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="main">
          <Controller
            control={control}
            name="isCountUnlimited"
            render={({ field }) => (
              <FormControlLabel
                classes={{ root: styles.root }}
                {...field}
                control={
                  <Checkbox
                    className={styles.checkbox}
                    disableRipple
                    checkedIcon={
                      <span
                        className={`${styles.icon} ${styles.checkedIcon}`}
                      />
                    }
                    icon={<span className={styles.icon} />}
                  />
                }
                label={t("unlimited")}
                labelPlacement="end"
              />
            )}
          />
          {!isCountUnlimited && (
            <Controller
              name="count"
              control={control}
              render={({ field }) => (
                <InputFormat
                  margin={buttonStyles.input.margin}
                  isAbsolute
                  onChange={field.onChange}
                  value={field.value}
                  label={label}
                  error={Boolean(errors.count)}
                  message={t(errors.count?.message || "")}
                  IconEnd={<span className="main_inputLabel">шт.</span>}
                />
              )}
            />
          )}
          <div className="buttons">
            <Button
              startIcon={<CancelIcon />}
              margin={buttonStyles.cancel.margin}
              buttonStyle={buttonStyles.cancel.style}
              onClick={onClose}
            >
              {t("cancel")}
            </Button>
            <SaveButton />
          </div>
        </form>
      </Wrapper>
    </Modal>
  );
};
