import Button from "components/Custom/Button";
import Spinner from "components/Helpers/Spinner";
import { QuitModal } from "pages/CompanyPages/services/components/Modals/Quit";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { buttonStyle, CancelIcon, SaveIcon } from "./style";

interface ButtonsProps {
  isLoading: boolean;
}

export const Buttons: React.FC<ButtonsProps> = ({ isLoading }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [leaveModal, setLeaveModal] = useState(false);

  const handleOpen = () => {
    setLeaveModal(true);
  };

  const handleClose = () => {
    setLeaveModal(false);
  };

  const handleQuit = () => {
    history.push("main");
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        margin={buttonStyle.cancel.margin}
        buttonStyle={buttonStyle.cancel.button}
        startIcon={<CancelIcon />}
      >
        {t("cancel")}
      </Button>
      <Button
        width={buttonStyle.save.width}
        disabled={isLoading}
        type="submit"
        startIcon={<SaveIcon />}
      >
        {isLoading ? <Spinner size={20} /> : t("save")}
      </Button>

      <QuitModal onQuit={handleQuit} onStay={handleClose} isOpen={leaveModal} />
    </div>
  );
};
