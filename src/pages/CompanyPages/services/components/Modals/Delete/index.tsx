import Button from "components/Custom/Buttons/Button";
import Modal from "components/Custom/Modal";
import {
  ITEM_DELETE_MODAL_CONTENT,
  SECTION_DELETE_MODAL_CONTENT,
} from "pages/CompanyPages/services/constants";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CancelIcon, DeleteIcon, styles, Wrapper } from "./style";

interface DeleteModalProps {
  open: boolean;
  name: string | undefined;
  isSection?: boolean;
  onClose: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  name,
  isSection,
  onClose,
}) => {
  const { t } = useTranslation();
  const alertMessage = isSection
    ? SECTION_DELETE_MODAL_CONTENT
    : ITEM_DELETE_MODAL_CONTENT;

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <Modal width={styles.modal.width} open={open}>
      <Wrapper onSubmit={handleSubmit}>
        <div className="header">
          <h4>
            {t(alertMessage.title)} {name}?
          </h4>
          <p>{t(alertMessage.info)}</p>
        </div>
        <div className="buttons">
          <Button
            onClick={onClose}
            buttonStyle={styles.button.cancel.style}
            margin={styles.button.cancel.margin}
            startIcon={<CancelIcon />}
          >
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            buttonStyle={styles.button.delete.style}
            startIcon={<DeleteIcon />}
          >
            {t("delete")}
          </Button>
        </div>
      </Wrapper>
    </Modal>
  );
};
