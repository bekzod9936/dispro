import Button from "components/Custom/Button";
import { QuitModal } from "pages/CompanyPages/services/components/Modals/Quit";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { cancelButtonStyle, CancelIcon, SaveIcon } from "./style";

interface ButtonsProps {}

export const Buttons: React.FC<ButtonsProps> = () => {
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
        margin={cancelButtonStyle.margin}
        buttonStyle={cancelButtonStyle.button}
        startIcon={<CancelIcon />}
      >
        {t("cancel")}
      </Button>
      <Button type="submit" startIcon={<SaveIcon />}>
        {t("save")}
      </Button>

      <QuitModal onQuit={handleQuit} onStay={handleClose} isOpen={leaveModal} />
    </div>
  );
};
