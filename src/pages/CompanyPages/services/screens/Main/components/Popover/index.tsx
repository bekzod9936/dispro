//react
import { useState } from "react";

//packages
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

//components
import Button from "components/Custom/Buttons/Button";
import { Popover } from "@material-ui/core";

//style
import {
  CreateIcon,
  ArrowDownIcon,
  PopoverList,
  PopoverItem,
  useStyles,
} from "./style";
import { LightToolTip } from "../../../Services/components/Radios/style";

interface MPopoverProps {
  onClick: () => void;
  isSectionButtonDisabled?: boolean;
}

const MPopover: React.FC<MPopoverProps> = ({
  onClick,
  isSectionButtonDisabled,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const styles = useStyles();

  const { t } = useTranslation();
  const history = useHistory();

  const handlePush = () => {
    history.push("/services/create");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onOpenModal = () => {
    if (isSectionButtonDisabled) return;

    onClick();
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<CreateIcon />}
        buttonStyle={styles.popover.button.style}
        endIcon={<ArrowDownIcon />}
      >
        {t("create")}
      </Button>
      <Popover
        PaperProps={styles.popover}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <PopoverList>
          <LightToolTip
            arrow
            placement="top"
            title={
              isSectionButtonDisabled
                ? "Вы уже создали максимальное количество(20) разделов!"
                : ""
            }
          >
            <PopoverItem
              disabled={isSectionButtonDisabled}
              onClick={onOpenModal}
            >
              {t("section")}
            </PopoverItem>
          </LightToolTip>
          <PopoverItem onClick={handlePush}>{t("item")}</PopoverItem>
        </PopoverList>
      </Popover>
    </>
  );
};

export default MPopover;
