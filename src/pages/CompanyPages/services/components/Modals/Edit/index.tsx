//packages
import { IconButton } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import Button from "components/Custom/Buttons/Button";
import Modal from "components/Custom/Modal";
import Spinner from "components/Helpers/Spinner";
import Input from "components/Custom/Input";

//style
import { useStyles } from "../Sections/style";
import {
  Wrapper,
  Header,
  CloseIcon,
  Footer,
  CancelIcon,
  CreateSectionIcon,
} from "../Sections/style";

//other
import { editModalType } from "pages/CompanyPages/services/constants";
import { EditSectionType } from "pages/CompanyPages/services/utils/types";
import { useEditSectionForm } from "pages/CompanyPages/services/hooks";
import { ISectionResponse } from "services/queries/servicesQueries/response.types";
import { useEditSection } from "pages/CompanyPages/services/hooks/MainPageHooks";

interface EditSectionModalProps {
  open: boolean;
  onClose: () => void;
  parent: boolean;
  item: ISectionResponse | null;
}

export const EditSectionModal: React.FC<EditSectionModalProps> = ({
  open,
  onClose,
  parent,
  item,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const type = parent ? "section" : "subsection";
  const defaultTitle = item?.goodsSectionTranslates[0].translateName || "";

  const form = useEditSectionForm(defaultTitle);
  // const isLoading = false;

  const { mutate, isLoading } = useEditSection();

  const onSubmit = (data: EditSectionType) => {
    mutate(
      {
        id: item?.id || 0,
        section: {
          langId: 1,
          translateName: data.section,
        },
      },
      {
        onSettled() {
          onClose();
        },
      }
    );
  };

  return (
    <Modal width={styles.modal.style} open={open}>
      <Wrapper onSubmit={form.handleSubmit(onSubmit)}>
        <Header>
          <div className="nav">
            <h1>{t(editModalType[type].title)}</h1>
            <IconButton type="button" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </Header>
        <Controller
          name="section"
          control={form.control}
          render={({ field }) => (
            <Input
              margin={styles.input.margin}
              error={Boolean(form.formState.errors.section)}
              message={t(form.formState.errors.section?.message || "")}
              isAbsolute
              label={t(editModalType[type].label)}
              field={field}
            />
          )}
        />
        <Footer>
          <Button
            onClick={onClose}
            margin={styles.cancelButton.margin}
            startIcon={<CancelIcon />}
            buttonStyle={styles.cancelButton.style}
          >
            {t("cancel")}
          </Button>
          <Button
            disabled={isLoading}
            width={styles.button.width}
            type="submit"
            startIcon={<CreateSectionIcon />}
          >
            {isLoading ? <Spinner size={20} /> : t("save")}
          </Button>
        </Footer>
      </Wrapper>
    </Modal>
  );
};
