import Button from "components/Custom/Buttons/Button";
import { CancelButton } from "components/Custom/Buttons/Cancel";
import Modal from "components/Custom/Modal";
import { useTranslation } from "react-i18next";
import { styles, Wrapper, HideIcon } from "./style";
import {
  useHideItem,
  useHideSection,
} from "pages/CompanyPages/services/hooks/MainPageHooks";
import {
  ITEM_HIDE_MODAL_CONTENT,
  SECTION_HIDE_MODAL_CONTENT,
  SUBSECTION_HIDE_MODAL_CONTENT,
} from "pages/CompanyPages/services/constants";

interface HideModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
  name: string;
  isSection?: boolean;
  isItem?: boolean;
}

export const HideModal: React.FC<HideModalProps> = ({
  open,
  onClose,
  id,
  isSection,
  name,
  isItem,
}) => {
  const { t } = useTranslation();

  const alertMessage = isItem
    ? ITEM_HIDE_MODAL_CONTENT
    : isSection
    ? SECTION_HIDE_MODAL_CONTENT
    : SUBSECTION_HIDE_MODAL_CONTENT;

  const { mutate: hideSection } = useHideSection();
  const { mutate: hideItem } = useHideItem();

  const handleHide = () => {
    if (isItem) {
      hideItem(
        {
          id,
          action: true,
        },
        {
          onSettled() {
            onClose();
          },
        }
      );
    } else {
      hideSection(
        {
          id,
          action: true,
        },
        {
          onSettled() {
            onClose();
          },
        }
      );
    }
  };

  return (
    <Modal width={styles.modal} open={open}>
      <Wrapper>
        <div className="container">
          <h4>
            {t(alertMessage.title)} {name}?
          </h4>
          <p>{t(alertMessage.info)}</p>
          <div className="footer">
            <CancelButton
              margin={styles.cancelButton.margin}
              onClick={onClose}
            />
            <Button startIcon={<HideIcon />} onClick={handleHide}>
              {t("hide")}
            </Button>
          </div>
        </div>
      </Wrapper>
    </Modal>
  );
};
