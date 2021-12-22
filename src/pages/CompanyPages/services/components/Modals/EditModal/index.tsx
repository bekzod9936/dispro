import { IconButton } from "@material-ui/core";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import Spinner from "components/Helpers/Spinner";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SubSectionField } from "../../SubSectionField";
import { useStyles } from "../Section/style";
import Input from "components/Custom/Input";

import {
  Wrapper,
  Header,
  CloseIcon,
  Footer,
  CancelIcon,
  CreateSectionIcon,
} from "../Section/style";

interface EditSectionModalProps {
  open: boolean;
  onClose: () => void;
}

export const EditSectionModal: React.FC<EditSectionModalProps> = ({
  open,
  onClose,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const form = useForm();
  const isLoading = false;

  const onSubmit = () => {};

  return (
    <Modal width={styles.modal.style} open={open}>
      <Wrapper onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <Header>
            <div className="nav">
              <h1>{t("newSubSection")}</h1>
              <IconButton type="button" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </Header>
          <Controller
            name="section"
            control={form.control}
            render={({ field }) => <Input field={field} />}
          />
          <Footer>
            <Button
              onClick={onClose}
              margin={styles.cancelButton.margin}
              startIcon={<CancelIcon />}
              buttonStyle={styles.cancelButton.style}
            >
              {t("cancel")}
            </Button>
            <Button
              disabled={isLoading}
              width={styles.button.width}
              type="submit"
              startIcon={<CreateSectionIcon />}
            >
              {isLoading ? <Spinner size={20} /> : t("create")}
            </Button>
          </Footer>
        </FormProvider>
      </Wrapper>
    </Modal>
  );
};
