//react
import { useState } from "react";

//packages
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PopupState } from "material-ui-popup-state/core";

//components
import Popover from "components/Custom/Popover";
import Button from "components/Custom/Button";

//style
import {
  CreateIcon,
  ArrowDownIcon,
  PopoverList,
  PopoverItem,
  useStyles,
} from "./style";

interface MPopoverProps {
  onClick: () => void;
}

const MPopover: React.FC<MPopoverProps> = ({ onClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | PopupState>(null);
  const styles = useStyles();

  const { t } = useTranslation();
  const history = useHistory();

  const handlePush = () => {
    history.push("/services/create");
  };

  const handleClose = (e: PopupState) => {
    setAnchorEl(e);
  };

  return (
    <Popover
      click={
        <Button
          startIcon={<CreateIcon />}
          buttonStyle={styles.popover.button.style}
          endIcon={<ArrowDownIcon />}
        >
          {t("create")}
        </Button>
      }
      onClose={handleClose}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      popoverStyle={{ marginTop: "20px" }}
    >
      <PopoverList>
        <PopoverItem
          onClick={() => {
            onClick();
            anchorEl?.close();
          }}
        >
          {t("section")}
        </PopoverItem>
        <PopoverItem onClick={handlePush}>{t("item")}</PopoverItem>
      </PopoverList>
    </Popover>
  );
};

export default MPopover;
