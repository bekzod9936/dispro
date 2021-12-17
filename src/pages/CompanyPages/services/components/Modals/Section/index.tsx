import { useEffect, useRef, useState } from "react";

//packages
import { useTranslation } from "react-i18next";
import { useFieldArray, FormProvider } from "react-hook-form";

//components
import { IconButton } from "@material-ui/core";
import Modal from "components/Custom/Modal";
import Button from "components/Custom/Button";

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
import { usePostSection, useSections } from "pages/CompanyPages/services/hooks";
import { SectionField } from "../../SectionField";
import { sectionsToSectionArray } from "pages/CompanyPages/services/helpers";

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
  const styles = useStyles();
  const buttonRef = useRef<null | HTMLDivElement>(null);
  const { t } = useTranslation();
  const [isAdded, setIsAdded] = useState(false);

  const form = useSections();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  const { mutate } = usePostSection();

  const fieldsLimit = 20 - fields.length;

  const onSubmit = async (data: createSectionFormType) => {
    const sectionDtos = sectionsToSectionArray(data);
    mutate(sectionDtos[0]);
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

  const handleClose = () => {
    form.clearErrors();
    onClose();
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
            {!isSingle && fieldsLimit > 0 && (
              <p>
                Можно добавить еще {fieldsLimit}{" "}
                {fieldsLimit === 1 ? "раздел" : "разделов"}
              </p>
            )}
          </Header>
          <Main ref={buttonRef}>
            {fields.map((field, index) => (
              <SectionField
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
            <Button type="submit" startIcon={<CreateSectionIcon />}>
              {t("create")}
            </Button>
          </Footer>
        </Wrapper>
      </FormProvider>
    </Modal>
  );
};
