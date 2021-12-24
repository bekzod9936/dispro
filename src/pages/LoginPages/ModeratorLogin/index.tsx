import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
//styles
import { Container, Box, Form, Title } from "./style";
//components
import Input from "components/Custom/Input";
import Button from "components/Custom/Button";
import MultiSelect from "components/Custom/MultiSelect";
import IconButton from "@material-ui/core/IconButton";
//types
import { IForm, ROLES } from "./types";
//hooks
import useSignIn from "./useSignIn";
import { useHistory } from "react-router-dom";

const LoginPageAdmin = () => {
  const history = useHistory();
  const { logIn } = useSignIn(history);
  const [type, setType] = useState<boolean>(false);
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForm>({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const onLoginFormSubmit = (data: IForm) => {
    console.log(data, "data for login");
    logIn.mutate(data);
  };

  return (
    <Container>
      <Box>
        <Title>Moderator Login</Title>
        <Form onSubmit={handleSubmit(onLoginFormSubmit)}>
          <Controller
            name="roleId"
            control={control}
            defaultValue={{ value: ROLES.MODERATOR, label: t("admin") }}
            rules={{ required: true }}
            render={({ field }) => (
              <MultiSelect
                label={t("staffRole")}
                dataCy="roleId"
                defaultValue={ROLES.MODERATOR}
                options={[
                  { value: ROLES.MODERATOR, label: t("admin") },
                  { value: ROLES.MANAGER, label: t("manager") },
                  { value: ROLES.CASHIER, label: t("cashier") },
                ]}
                field={field}
                error={errors.roleId ? true : false}
                message={t("requiredField")}
                placeholder=""
                isSearchable={false}
              />
            )}
          />
          <Controller
            name="telNumber"
            control={control}
            rules={{ required: true, maxLength: 9 }}
            render={({ field }) => {
              return (
                <Input
                  type="tel"
                  field={field}
                  autoComplete=""
                  maxLength={9}
                  IconStart={<div className="inputstyle">+998</div>}
                />
              );
            }}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type={!type ? "password" : "text"}
                  field={field}
                  IconEnd={
                    <IconButton
                      onClick={() => {
                        setType(!type);
                      }}
                    >
                      <p style={{ fontSize: "14px" }}>
                        {!type ? "show" : "hide"}
                      </p>
                    </IconButton>
                  }
                />
              );
            }}
          />

          <Button
            disabled={logIn.isLoading}
            type="submit"
            width={{ width: "100%" }}
          >
            {t("enter")}
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default LoginPageAdmin;
