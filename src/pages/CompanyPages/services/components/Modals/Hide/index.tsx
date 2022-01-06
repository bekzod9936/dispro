import Button from "components/Custom/Buttons/Button";
import { CancelButton } from "components/Custom/Buttons/Cancel";
import Modal from "components/Custom/Modal";
import { useTranslation } from "react-i18next";
import { Wrapper } from "./style";
import { useHideSection } from "pages/CompanyPages/services/hooks/MainPageHooks";
import { ISectionResponse } from "services/queries/servicesQueries/response.types";

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
    <Modal
      width={{
        maxwidth: 475,
        width: "100%",
      }}
      open={open}
    >
      <Wrapper>
        <div className="container">
          <h4>Вы уверены что хотите скрыть раздел?</h4>
          <p>Тогда все товары раздела/подраздела будут скрыты/удалены</p>
          <div className="footer">
            <CancelButton onClick={onClose} />
            <Button onClick={handleHide}>{t("hide")}</Button>
          </div>
        </div>
      </Wrapper>
    </Modal>
  );
};
