import React, { useState } from "react";
import { IconButton, Popover } from "@material-ui/core";
import { MenuIcon, MenuItem, MenuList } from "./style";
import { useTranslation } from "react-i18next";

interface SectionPopoverProps {
  isParent?: boolean;
  isHiddenInMobile: boolean;
  onOpenModal: (arg: "subSection") => () => void;
}

export const SectionPopover: React.FC<SectionPopoverProps> = ({
  isParent,
  isHiddenInMobile,
  onOpenModal,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const { t } = useTranslation();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <IconButton onClick={handleOpen} children={<MenuIcon />} />
      <Popover
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
        {Boolean(isParent) ? (
          <MenuList>
            <MenuItem onClick={onOpenModal("subSection")}>
              {t("createSubSection")}
            </MenuItem>
            <MenuItem>{t("edit")}</MenuItem>
            <MenuItem>
              {isHiddenInMobile ? t("showInMobile") : t("hideInMobile")}
            </MenuItem>
            <MenuItem isDeleteButton>{t("delete")}</MenuItem>
          </MenuList>
        ) : null}
      </Popover>
    </div>
  );
};
