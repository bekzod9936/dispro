//packages
import { useTranslation } from "react-i18next";

//components
import Button from "components/Custom/Buttons/Button";
import Modal from "components/Custom/Modal";

//style
import {
  CancelIcon,
  useButtonStyle,
  Wrapper,
  MobileCancelIcon,
  ExitIcon,
} from "./style";

//other
import useWindowWidth from "services/hooks/useWindowWidth";

interface QuitModalProps {
  isOpen: boolean;
  onQuit: () => void;
  onStay: () => void;
}

export const QuitModal: React.FC<QuitModalProps> = ({
  isOpen,
  onQuit,
  onStay,
}) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const styles = useButtonStyle();

  return (
    <Modal open={isOpen}>
      <Wrapper>
        <h4>{t("leavePage")}</h4>
        <p>{t("servicesPageQuitModalAlertMessage")}</p>
        <div className="buttons">
          <Button
            onClick={onStay}
            buttonStyle={styles.style}
            margin={styles.margin}
            startIcon={width > 1000 ? <CancelIcon /> : <MobileCancelIcon />}
          >
            Отмена
          </Button>
          <Button onClick={onQuit} startIcon={<ExitIcon />}>
            Покинуть
          </Button>
        </div>
      </Wrapper>
    </Modal>
  );
};
