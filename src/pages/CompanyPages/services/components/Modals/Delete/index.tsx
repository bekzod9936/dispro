//packages
import { useTranslation } from "react-i18next";

//component
import Button from "components/Custom/Buttons/Button";
import Modal from "components/Custom/Modal";

//other
import {
  ITEM_DELETE_MODAL_CONTENT,
  SECTION_DELETE_MODAL_CONTENT,
  SUBSECTION_DELETE_MODAL_CONTENT,
} from "pages/CompanyPages/services/constants";

//style
import { CancelIcon, DeleteIcon, styles, Wrapper } from "./style";
import { useDeleteSection } from "pages/CompanyPages/services/hooks/MainPageHooks";

interface DeleteModalProps {
  open: boolean;
  name: string | undefined;
  isSection?: boolean;
  onClose: () => void;
  isItem?: boolean;
  id: number;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  name,
  isSection,
  onClose,
  isItem,
  id,
}) => {
  const { t } = useTranslation();
  const alertMessage = isItem
    ? ITEM_DELETE_MODAL_CONTENT
    : isSection
    ? SECTION_DELETE_MODAL_CONTENT
    : SUBSECTION_DELETE_MODAL_CONTENT;

  const { mutate, isLoading } = useDeleteSection();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    mutate(id, {
      onSettled() {
        onClose();
      },
    });
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
