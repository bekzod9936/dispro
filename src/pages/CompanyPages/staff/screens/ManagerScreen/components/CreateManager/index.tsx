import { IProps } from "./types";
import { Controller } from "react-hook-form";
import Input from "components/Custom/Input";
import { Form, FormRow, FormCol, Break, ModalHead, ModalTitle } from "./style";
import useStaff from "pages/CompanyPages/staff/hooks/useStaff";
import useManagers from "pages/CompanyPages/staff/hooks/useManagers";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FormProps } from "./types";
import Modal from "components/Custom/Modal";
import {
  ModalAction,
  ModalBody,
  ModalContent,
  ModalMain,
} from "../../../CashierScreen/style";
import Radio from "components/Custom/Radio";
import { IconButton } from "@material-ui/core";
import MultiSelect from "components/Custom/MultiSelect";
import Button from "components/Custom/Button";
import { setOpenManager, setStepManager } from "services/redux/Slices/staffs";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { ReactComponent as NextIcon } from "assets/icons/sign_tick.svg";
import { ReactComponent as ExitIcon } from "assets/icons/exit.svg";
import { ReactComponent as SaveIcon } from "assets/icons/IconsInfo/save.svg";
import RoleTable from "./components/RoleTable";
import useRoles from "./components/RoleTable/useRoles";

const CreateManager = ({ openManager }: IProps) => {
  const stepManager = useAppSelector((state) => state.staffs.stepManager);
  const selectedRole = useAppSelector((state) => state.staffs.selectedRole);
  const { roles } = useRoles();
  const { branches } = useStaff();

  const { saveRoleManager, modified, setModified, createManager } = useManagers(
    {
      page: 1,
      query: "",
      period: "",
    }
  );

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

  const onSave = (data: FormProps) => {
    console.log(data, "data");
    createManager.mutate({
      comment: data.comment,
      firstName: data.firstName,
      lastName: data.lastName,
      storeId: data.storeId?.value,
      telNumber: data.telNumber,
      roleId: 2,
    });
  };

  return (
    <Modal open={openManager}>
      {/* first step */}
      {stepManager === 1 && (
        <Form onSubmit={handleSubmit(onSave)}>
          <ModalContent>
            <ModalHead>
              <ModalTitle>Добавление менеджера</ModalTitle>
              <IconButton
                onClick={() => {
                  dispatch(setOpenManager(false));
                  dispatch(setStepManager(1));
                }}
              >
                <ExitIcon />
              </IconButton>
            </ModalHead>
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
                  dispatch(setOpenManager(false));
                  dispatch(setStepManager(1));
                }}
                startIcon={<CancelIcon />}
              >
                {t("cancel")}
              </Button>

              <Button
                disabled={!isValid || createManager.isLoading}
                type="submit"
                startIcon={<NextIcon />}
              >
                {t("next")}
              </Button>
            </ModalAction>
          </ModalContent>
        </Form>
      )}

      {/* second step  */}

      {stepManager === 2 && (
        <ModalMain>
          <ModalHead>
            <ModalTitle>Настройки доступа</ModalTitle>
            <IconButton
              onClick={() => {
                dispatch(setOpenManager(false));
                dispatch(setStepManager(1));
              }}
            >
              <ExitIcon />
            </IconButton>
          </ModalHead>
          <Break height={50} />
          <ModalBody>
            <FormRow>
              <FormCol>
                <Radio
                  flexDirection="row"
                  list={[
                    {
                      value: "1",
                      label: `Полный доступ`,
                    },
                    {
                      value: "2",
                      label: `Ограниченный доступ`,
                    },
                  ]}
                  title={""}
                  onChange={(v: any) => setModified(v)}
                  value={modified}
                />
              </FormCol>
            </FormRow>
          </ModalBody>
          <Break height={35} />

          <ModalAction>
            <Button
              buttonStyle={{
                bgcolor: "white",
                color: "#223367",
              }}
              onClick={() => {
                dispatch(setOpenManager(false));
                dispatch(setStepManager(1));
              }}
              startIcon={<CancelIcon />}
            >
              {t("cancel")}
            </Button>

            <Button
              onClick={() => {
                if (modified === "2") {
                  dispatch(setStepManager(3));
                } else {
                  dispatch(setOpenManager(false));
                  dispatch(setStepManager(1));
                  saveRoleManager.mutate(roles.map((item: any) => item?.value));
                }
              }}
              startIcon={<NextIcon />}
            >
              {t("next")}
            </Button>
          </ModalAction>
        </ModalMain>
      )}

      {/* third step */}
      {stepManager === 3 && (
        <ModalMain>
          <ModalHead>
            <ModalTitle>Настройки доступа</ModalTitle>
            <IconButton
              onClick={() => {
                dispatch(setOpenManager(false));
                dispatch(setStepManager(1));
              }}
            >
              <ExitIcon />
            </IconButton>
          </ModalHead>
          <ModalBody>
            {/* tables  */}
            <RoleTable />
          </ModalBody>
          <ModalAction justifyContent="center" mTop={25}>
            <Button
              buttonStyle={{
                bgcolor: "white",
                color: "#223367",
              }}
              onClick={() => {
                dispatch(setOpenManager(false));
                dispatch(setStepManager(1));
              }}
              startIcon={<CancelIcon />}
            >
              {t("cancel")}
            </Button>

            <Button
              onClick={() => {
                dispatch(setOpenManager(false));
                dispatch(setStepManager(1));
                if (selectedRole.length > 0) {
                  saveRoleManager.mutate(
                    selectedRole.map((item: any) => item?.value)
                  );
                } else {
                  saveRoleManager.mutate(roles.map((item: any) => item?.value));
                }
              }}
              startIcon={<SaveIcon />}
            >
              {t("save")}
            </Button>
          </ModalAction>
        </ModalMain>
      )}
    </Modal>
  );
};

export default CreateManager;
