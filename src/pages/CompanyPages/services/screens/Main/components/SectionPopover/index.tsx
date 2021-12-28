import { useState } from "react";

//packages
import { IconButton, Popover } from "@material-ui/core";
import { useTranslation } from "react-i18next";

//style
import { MenuIcon, MenuItem, MenuList } from "./style";
import { SectionModalsType } from "pages/CompanyPages/services/utils/types";
import { useGetSections } from "pages/CompanyPages/services/hooks";
import { SUBSECTIONS_LIMIT } from "pages/CompanyPages/services/constants";
import { getSubSectionsLength } from "pages/CompanyPages/services/helpers";
import { LightToolTip } from "../../../Create/components/Radios/style";

//other
interface SectionPopoverProps {
  isParent?: boolean;
  isHiddenInMobile: boolean;
  onOpenModal: (arg: keyof SectionModalsType) => () => void;
  parentId?: number;
}

export const SectionPopover: React.FC<SectionPopoverProps> = ({
  isParent,
  isHiddenInMobile,
  onOpenModal,
  parentId = 0,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const { t } = useTranslation();

  const { data } = useGetSections();
  const limit = SUBSECTIONS_LIMIT - getSubSectionsLength(data?.data, parentId);

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
        <MenuList onClick={handleClose}>
          {Boolean(isParent) ? (
            <LightToolTip
              placement="top"
              arrow
              title={
                limit <= 0
                  ? "Вы уже создали максимальное количество(10) подразделов"
                  : ""
              }
            >
              <MenuItem
                disabled={limit <= 0}
                onClick={onOpenModal("subSection")}
              >
                {t("createSubSection")}
              </MenuItem>
            </LightToolTip>
          ) : (
            <MenuItem>{t("move")}</MenuItem>
          )}
          <MenuItem onClick={onOpenModal("editSection")}>{t("edit")}</MenuItem>
          <MenuItem>
            {isHiddenInMobile ? t("showInMobile") : t("hideInMobile")}
          </MenuItem>
          <MenuItem onClick={onOpenModal("delete")} isDeleteButton>
            {t("delete")}
          </MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
};
