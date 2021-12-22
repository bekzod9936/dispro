import { IconButton } from "@material-ui/core";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SubSectionField } from "../../SubSectionField";

import { Wrapper, Header, Footer } from "./style";
import {
  CancelIcon,
  CreateSectionIcon,
  CloseIcon,
  useStyles,
} from "../Section/style";

interface SubSectionModalProps {
  open: boolean;
  onClose: () => void;
}

export interface SubSectionFormTypes {
  subSection: string;
}

export const SubSectionModal: React.FC<SubSectionModalProps> = ({
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const form = useForm<SubSectionFormTypes>({
    mode: "onChange",
  });

  return (
    <Modal open={open}>
      <Wrapper>
        <FormProvider {...form}>
          <Header>
            <div className="nav">
              <h1>{t("newSubSection")}</h1>
              <IconButton type="button" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </Header>
          <SubSectionField name="subSection" />
          <Footer>
            <Button
              onClick={onClose}
              margin={styles.cancelButton.margin}
              startIcon={<CancelIcon />}
              buttonStyle={styles.cancelButton.style}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" startIcon={<CreateSectionIcon />}>
              {t("create")}
            </Button>
          </Footer>
        </FormProvider>
      </Wrapper>
    </Modal>
  );
};
