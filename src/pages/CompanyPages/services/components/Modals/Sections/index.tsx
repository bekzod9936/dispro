import { useEffect, useRef, useState } from "react";

//packages
import { useTranslation } from "react-i18next";
import { FormProvider } from "react-hook-form";

//components
import { IconButton } from "@material-ui/core";
import Modal from "components/Custom/Modal";
import Button from "components/Custom/Buttons/Button";
import { SectionField } from "../../SectionField";
import Spinner from "components/Helpers/Spinner";

//style
import {
  Wrapper,
  CloseIcon,
  Header,
  Main,
  Footer,
  CreateSectionIcon,
  CancelIcon,
  useStyles,
} from "./style";

//other
import { createSectionFormType } from "pages/CompanyPages/services/utils/types";
import {
  useGetSections,
  usePostSection,
  useSections,
} from "pages/CompanyPages/services/hooks";
import {
  getCorrectPostfixFromSectionsAmount,
  getLengthOfParentSections,
  sectionsToSectionArray,
} from "pages/CompanyPages/services/helpers";
import { SECTIONS_LIMIT } from "pages/CompanyPages/services/constants";

interface SectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSingle?: boolean;
}

export const SectionModal: React.FC<SectionModalProps> = ({
  isOpen,
  onClose,
  isSingle,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const buttonRef = useRef<null | HTMLDivElement>(null);

  const styles = useStyles();
  const { t } = useTranslation();

  const { fields, append, remove, form } = useSections();

  const { mutate, isLoading } = usePostSection();

  const { data } = useGetSections();
  const limit = SECTIONS_LIMIT - getLengthOfParentSections(data?.data);
  const fieldsLimit = limit - fields.length;

  const handleClose = () => {
    onClose();
    form.reset({
      sections: [{ title: "" }],
    });
  };

  const onSubmit = async (data: createSectionFormType) => {
    const sectionDtos = sectionsToSectionArray(data);
    mutate(sectionDtos, {
      onSettled: () => {
        handleClose();
      },
    });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
    //disable scroll to bottom
    setIsAdded(false);
  };

  const handleAddField = () => {
    append({ title: "" });
    //scroll to bottom
    setIsAdded(true);
  };

  //if field was added, effect scrolls to the last field
  useEffect(() => {
    if (isAdded) {
      buttonRef.current?.scrollTo({
        behavior: "smooth",
        top: buttonRef.current?.scrollHeight,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.length]);

  return (
    <Modal open={isOpen} width={styles.modal.style}>
      <FormProvider {...form}>
        <Wrapper onSubmit={form.handleSubmit(onSubmit)}>
          <Header>
            <div className="nav">
              <h1>{t("newSection")}</h1>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            {!isSingle && (
              <p>
                ?????????? ???????????????? ?????? {fieldsLimit}{" "}
                {getCorrectPostfixFromSectionsAmount(fieldsLimit)}
              </p>
            )}
          </Header>
          <Main ref={buttonRef}>
            {fields.map((field, index) => (
              <SectionField
                limit={limit}
                key={field.id}
                index={index}
                name={`sections.${index}.title`}
                isSingle={Boolean(isSingle)}
                lengthOfFields={fields.length}
                append={handleAddField}
                remove={handleRemoveField}
              />
            ))}
          </Main>
          <Footer>
            <Button
              onClick={handleClose}
              margin={styles.cancelButton.margin}
              startIcon={<CancelIcon />}
              buttonStyle={styles.cancelButton.style}
            >
              {t("cancel")}
            </Button>
            <Button
              width={styles.button.width}
              disabled={isLoading}
              type="submit"
              startIcon={<CreateSectionIcon />}
            >
              {isLoading ? <Spinner size={20} /> : t("create")}
            </Button>
          </Footer>
        </Wrapper>
      </FormProvider>
    </Modal>
  );
};
