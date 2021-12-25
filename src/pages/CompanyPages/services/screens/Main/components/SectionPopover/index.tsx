import { useState } from "react";

//packages
import { IconButton, Popover } from "@material-ui/core";
import { useTranslation } from "react-i18next";

//style
import { MenuIcon, MenuItem, MenuList } from "./style";
import { SectionModalsType } from "pages/CompanyPages/services/utils/types";

//other
interface SectionPopoverProps {
  isParent?: boolean;
  isHiddenInMobile: boolean;
  onOpenModal: (arg: keyof SectionModalsType) => () => void;
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
    event.stopPropagation();
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
          <MenuList onClick={handleClose}>
            <MenuItem onClick={onOpenModal("subSection")}>
              {t("createSubSection")}
            </MenuItem>
            <MenuItem onClick={onOpenModal("editSection")}>
              {t("edit")}
            </MenuItem>
            <MenuItem>
              {isHiddenInMobile ? t("showInMobile") : t("hideInMobile")}
            </MenuItem>
            <MenuItem onClick={onOpenModal("delete")} isDeleteButton>
              {t("delete")}
            </MenuItem>
          </MenuList>
        ) : null}
      </Popover>
    </div>
  );
};
