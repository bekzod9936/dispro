import { Popover } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Modals } from "../../utils/types";
import { ButtonIcon } from "../Item/style";
import { MenuIcon, MenuItem, MenuList, paperStyle } from "./style";

interface ItemPopoverProps {
  onOpenModal: (modalName: keyof Modals) => void;
  itemId?: number;
}

export const ItemPopover: React.FC<ItemPopoverProps> = ({
  onOpenModal,
  itemId,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation();
  const history = useHistory();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeAmount = () => {
    onOpenModal("changeAmount");
  };

  const handleDelete = () => {
    onOpenModal("delete");
  };

  const handleEdit = () => {
    history.push(`edit/${itemId}`);
  };

  return (
    <div>
      <ButtonIcon onClick={handleOpen}>
        <MenuIcon />
      </ButtonIcon>
      <Popover
        PaperProps={paperStyle}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuList onClick={handleClose}>
          <MenuItem onClick={handleChangeAmount}>{t("changeAmount")}</MenuItem>
          <MenuItem onClick={handleEdit}>{t("edit")}</MenuItem>
          <MenuItem onClick={handleDelete} isDeleteButton>
            {t("delete")}
          </MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
};
