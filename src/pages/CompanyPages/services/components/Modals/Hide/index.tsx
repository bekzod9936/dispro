import Button from "components/Custom/Buttons/Button";
import { CancelButton } from "components/Custom/Buttons/Cancel";
import Modal from "components/Custom/Modal";
import { useTranslation } from "react-i18next";
import { styles, Wrapper, HideIcon } from "./style";
import { useHideSection } from "pages/CompanyPages/services/hooks/MainPageHooks";
import { ISectionResponse } from "services/queries/servicesQueries/response.types";
import {
  SECTION_HIDE_MODAL_CONTENT,
  SUBSECTION_HIDE_MODAL_CONTENT,
} from "pages/CompanyPages/services/constants";

interface HideModalProps {
  open: boolean;
  onClose: () => void;
  item: ISectionResponse | null;
}

export const HideModal: React.FC<HideModalProps> = ({
  open,
  onClose,
  item,
}) => {
  const { t } = useTranslation();
  const id = item?.id || 0;
  const isSection = item?.parentId === 0;
  const name = item?.goodsSectionTranslates[0].translateName;

  const alertMessage = isSection
    ? SECTION_HIDE_MODAL_CONTENT
    : SUBSECTION_HIDE_MODAL_CONTENT;

  const { mutate } = useHideSection();

  const handleHide = () => {
    mutate(
      {
        id,
        action: !item?.hideInMobile,
      },
      {
        onSettled() {
          onClose();
        },
      }
    );
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
