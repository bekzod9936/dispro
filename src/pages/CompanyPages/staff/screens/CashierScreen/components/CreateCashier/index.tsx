import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Modal from "components/Custom/Modal";
import Input from "components/Custom/Input";
import Button from "components/Custom/Button";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import MultiSelect from "components/Custom/MultiSelect";
import { Form, FormRow, FormCol, Break } from "./style";
import { FormProps } from "./types";
import { ModalContent, ModalBody, ModalAction } from "../../style";
import { useAppDispatch } from "services/redux/hooks";
import { setOpenCash } from "services/redux/Slices/staffs";
import { ReactComponent as SaveIcon } from "assets/icons/IconsInfo/save.svg";
import useCashiers from "../../../../hooks/useCashiers";

interface IProps {
  openCash: boolean;
}

const CreateCashier = ({ openCash }: IProps) => {
  const { branches } = useCashiers({
    page: 1,
    query: "",
    period: "",
  });
  //   const [branches, setBranches] = useState([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  console.log(branches, "branches");

  const onSave = (data: FormProps) => {
    console.log(data, "data");
  };

  return (
    <Modal open={openCash}>
      <Form onSubmit={handleSubmit(onSave)}>
        <ModalContent>
          <ModalBody>
            <FormRow>
              <FormCol>
                <Controller
                  control={control}
                  name="firstName"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      label={t("cashier_name")}
                      error={errors.firstName ? true : false}
                      message={t("requiredField")}
                      type="string"
                      field={field}
                      margin={{
                        laptop: "20px 0 25px",
                      }}
                    />
                  )}
                />
              </FormCol>
              <Break width={25} />
              <FormCol>
                <Controller
                  control={control}
                  name="lastName"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      label={t("cashier_lastName")}
                      error={errors.lastName ? true : false}
                      message={t("requiredField")}
                      type="string"
                      field={field}
                      margin={{
                        laptop: "20px 0 25px",
                      }}
                    />
                  )}
                />
              </FormCol>
            </FormRow>
            <FormRow>
              <Controller
                name="telNumber"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <Input
                      label={t("phoneNumber")}
                      error={errors.telNumber ? true : false}
                      message={t("requiredField")}
                      type="string"
                      defaultValue={"+998"}
                      maxLength={13}
                      field={field}
                      fullWidth={true}
                      margin={{
                        laptop: "20px 0 25px",
                      }}
                    />
                  );
                }}
              />
            </FormRow>
            <FormRow>
              <Controller
                control={control}
                name="storeId"
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <MultiSelect
                      options={branches}
                      isMulti={false}
                      label={t("choose_branch")}
                      placeholder={t("choose_branch")}
                      margin={{
                        laptop: "20px 0 25px",
                      }}
                      message={t("requiredField")}
                      error={errors.storeId ? true : false}
                      field={field}
                      isClearable={false}
                    />
                  );
                }}
              />
            </FormRow>
            <FormRow>
              <Controller
                control={control}
                name="comment"
                render={({ field }) => {
                  return (
                    <Input
                      label={t("comment")}
                      type="string"
                      maxLength={13}
                      field={field}
                      fullWidth={true}
                      minRows={10}
                      multiline={true}
                      margin={{
                        laptop: "20px 0 25px",
                      }}
                    />
                  );
                }}
              />
            </FormRow>
          </ModalBody>
          <ModalAction>
            <Button
              buttonStyle={{
                bgcolor: "white",
                color: "#223367",
              }}
              onClick={() => {
                dispatch(setOpenCash(false));
              }}
              startIcon={<CancelIcon />}
            >
              {t("cancel")}
            </Button>

            <Button disabled={!isValid} type="submit" startIcon={<SaveIcon />}>
              {t("save")}
            </Button>
          </ModalAction>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default CreateCashier;
