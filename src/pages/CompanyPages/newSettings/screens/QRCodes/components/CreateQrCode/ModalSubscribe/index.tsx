import { IconButton } from "@material-ui/core";
import { CancelButton } from "components/Custom/Buttons/Cancel";
import { SaveButton } from "components/Custom/Buttons/Save";
import Modal from "components/Custom/Modal";
import Input from "components/Custom/Input";
import { Controller, useForm } from "react-hook-form";
import { CloseIcon } from "newassets/icons/icons";
import { useTranslation } from "react-i18next";
import useQrcode from "../../../useQrcode";
import {
  ModalText,
  ModalWrap,
  ModalHeader,
  ModalButtons,
  ModalTitle,
} from "../../../style";

interface IForm {
  source?: string;
}

const MSubscribe = ({ open }: any) => {
  const { t } = useTranslation();
  const [openSubscribe, setOpenSubscribe] = open;
  const { postRef } = useQrcode();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const handleSaveRef = (e: any) => {
    if (e.source.match(/\S/) !== null) {
      clearErrors("source");
      postRef.mutate(
        { id: "", source: e.source },
        {
          onSuccess: () => {
            setOpenSubscribe(false);
            reset();
          },
        }
      );
    } else {
      setError("source", { type: "required" }, { shouldFocus: true });
    }
  };

  return (
    <Modal open={openSubscribe}>
      <form onSubmit={handleSubmit(handleSaveRef)}>
        <ModalWrap>
          <ModalHeader>
            <ModalTitle>{t("createqrforcompany")}</ModalTitle>
            <IconButton
              onClick={() => {
                setOpenSubscribe(false);
                reset();
              }}
            >
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <ModalText>{t("forcomfortqrcodeplace")}</ModalText>
          <Controller
            rules={{ required: true, maxLength: 30 }}
            control={control}
            name="source"
            render={({ field }) => {
              return (
                <Input
                  label={t("enterNewName")}
                  field={field}
                  error={errors.source ? true : false}
                  message={
                    errors.source?.type === "maxLength"
                      ? t("maxcharacters", { value: 30 })
                      : t("requiredField")
                  }
                  margin={{ laptop: "30px 0" }}
                />
              );
            }}
          />
          <ModalButtons>
            <CancelButton
              onClick={() => {
                setOpenSubscribe(false);
                reset();
              }}
              margin={{ laptop: "0 15px 0 0" }}
            />
            <SaveButton disabled={postRef.isLoading || !isDirty} />
          </ModalButtons>
        </ModalWrap>
      </form>
    </Modal>
  );
};

export default MSubscribe;
