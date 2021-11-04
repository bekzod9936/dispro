import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
//components
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import MultiSelect from "components/Custom/MultiSelect";
import IconButton from "@material-ui/core/IconButton";

//style
import {
  ModalContent,
  Form,
  ModalTitle,
  ModalRow,
  Break,
  ModalText,
} from "./style";
import { BtnAction } from "../styles/index";
import { ReactComponent as Close } from "assets/icons/exit.svg";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import { useAppSelector } from "services/redux/hooks";
//types
import { FormProps } from "../types";

const QrForBranch = ({ qrVisible, onSave, closeQr }: IProps) => {
  const { t } = useTranslation();
  const stores = useAppSelector((state) => state.qrSetting.stores);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  return (
    <Modal open={qrVisible}>
      <Form onSubmit={handleSubmit(onSave)}>
        <ModalContent>
          <ModalRow jContent="space-between">
            <ModalTitle>QR для оплаты на местах</ModalTitle>
            <IconButton
              style={{
                padding: "5px",
              }}
              onClick={closeQr}
            >
              <Close />
            </IconButton>
          </ModalRow>
          <Break />
          <ModalRow jContent="space-between">
            <ModalText>
              Выберите филиал, в которой будет производитьсяоплата на местах,
              через QR
            </ModalText>
          </ModalRow>
          <Break />

          <ModalRow jContent="center">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="branch"
              render={({ field }) => {
                return (
                  <MultiSelect
                    isMulti={false}
                    error={!!errors.branch}
                    message={t("requiredField")}
                    field={field}
                    label="Выберите категорию"
                    options={stores}
                    margin={{ laptop: "0 0 35px 0" }}
                  />
                );
              }}
            />
          </ModalRow>
        </ModalContent>

        <BtnAction>
          <Button
            startIcon={<CancelIcon />}
            buttonStyle={{ bgcolor: "white", color: "#223367" }}
            onClick={closeQr}
          >
            {t("cancel")}
          </Button>
          <Button startIcon={<SaveIcon />} type="submit">
            {t("save")}
          </Button>
        </BtnAction>
      </Form>
    </Modal>
  );
};

export default QrForBranch;

interface IProps {
  qrVisible: boolean;
  onSave: any;
  closeQr?: any;
}
