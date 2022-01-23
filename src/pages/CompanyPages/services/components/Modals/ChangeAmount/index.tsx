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
import { useEditAmount } from "pages/CompanyPages/services/hooks/MainPageHooks";
import { changeAmountToPutDto } from "pages/CompanyPages/services/helpers";
import { IGoodsResponse } from "services/queries/servicesQueries/response.types";

interface ChangeAmountModalProps {
  onClose: () => void;
  open: boolean;
  item: IGoodsResponse | null;
}

export const ChangeAmountModal: React.FC<ChangeAmountModalProps> = ({
  onClose,
  open,
  item,
}) => {
  const { t } = useTranslation();
  const count = item?.count || 0;
  const isUnlimited = Boolean(item?.isCountUnlimited);
  const label = item?.name;
  const id = item?.id || 0;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useChangeAmount(count, isUnlimited);
  const isCountUnlimited = useWatch({ control, name: "isCountUnlimited" });

  const styles = useStyles();

  const { mutate, isLoading } = useEditAmount();

  const onSubmit = (data: ChangeAmountFormType) => {
    const dto = changeAmountToPutDto(data.count, data.isCountUnlimited);

    mutate(
      { id, dto },
      {
        onSettled: () => {
          onClose();
        },
      }
    );
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
                checked={field.value}
                onChange={field.onChange}
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
            <SaveButton disabled={isLoading} />
          </div>
        </form>
      </Wrapper>
    </Modal>
  );
};
