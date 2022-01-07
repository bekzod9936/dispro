import { IconButton } from "@material-ui/core";
import { CancelButton } from "components/Custom/Buttons/Cancel";
import { SaveButton } from "components/Custom/Buttons/Save";
import Modal from "components/Custom/Modal";
import MultiSelect from "components/Custom/MultiSelect";
import {
  getParentSections,
  sectionsResponseListToOptions,
} from "pages/CompanyPages/services/helpers";
import { useGetSections } from "pages/CompanyPages/services/hooks";
import { useMoveSection } from "pages/CompanyPages/services/hooks/MainPageHooks";
import { sectionOptionType } from "pages/CompanyPages/services/utils/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "../Sections/style";
import { MenuIcon, styles, Wrapper } from "./style";

interface MoveModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

export const MoveModal: React.FC<MoveModalProps> = ({ open, onClose, id }) => {
  const { t } = useTranslation();

  const [option, setOption] = useState<sectionOptionType | null>(null);

  const { data } = useGetSections();
  const parentSections = getParentSections(data?.data);

  const handleChange = (obj: sectionOptionType) => {
    setOption(obj);
  };

  const handleClose = () => {
    setOption(null);
    onClose();
  };

  const { mutate } = useMoveSection();

  const handleSave = () => {
    mutate(
      { id: id, parentId: option?.value || 0 },
      {
        onSettled() {
          handleClose();
        },
      }
    );
  };

  return (
    <Modal width={styles.modal} open={open}>
      <Wrapper>
        <div className="nav">
          <h4>{t("moveSubSection")}</h4>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <MultiSelect
          menuPortalTarget={document.body}
          options={sectionsResponseListToOptions(parentSections)}
          value={option}
          onChange={handleChange}
          selectStyle={styles.select}
          icon={<MenuIcon />}
          iconleft="25px"
          placeholder={t("moveToSection")}
        />
        <div className="footer">
          <CancelButton
            onClick={handleClose}
            margin={styles.cancelButton.margin}
          />
          <SaveButton onClick={handleSave} disabled={!option} />
        </div>
      </Wrapper>
    </Modal>
  );
};
