import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, Title } from "../../../../style";
import Input from "components/Custom/Input";
import { ForExample, WrapWebLink, WebLink, WebValue } from "./style";
import { ArrowIcon, WrapArrow, DeleteIcon } from "../../style";
import { IconButton } from "@material-ui/core";

const CompanyLink = () => {
  const { t } = useTranslation();
  const links = useWatch({ name: "links" });

  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useFormContext();

  console.log(links, "dddd");
  const handleWebLink = () => {};
  const handleWebDelete = (v: any) => {};

  return (
    <div>
      <Title>{t("companyLink")}</Title>
      <Text>{t("companyLink_text")}</Text>
      <Controller
        name="companyLink"
        control={control}
        rules={{ required: false }}
        defaultValue=""
        render={({ field }) => (
          <Input
            message={t("requiredField")}
            error={errors.companyLink ? true : false}
            label={t("linkName")}
            type="string"
            field={field}
            margin={{
              laptop: "20px 0 25px",
            }}
          />
        )}
      />
      <Controller
        name="link"
        control={control}
        rules={{ required: false }}
        defaultValue=""
        render={({ field }) => (
          <Input
            label={t("link")}
            type="string"
            field={field}
            margin={{
              laptop: "20px 0 0",
            }}
            inputStyle={{
              border:
                getValues("link") !== ""
                  ? "1px solid #606EEA"
                  : "1px solid #C2C2C2",
            }}
            isAbsolute={true}
            message={errors?.link?.message}
            error={errors.link ? true : false}
            IconEnd={
              <WrapArrow
                style={{ cursor: "pointer" }}
                onClick={handleWebLink}
                bgcolor={getValues("link") !== ""}
              >
                <ArrowIcon />
              </WrapArrow>
            }
          />
        )}
      />
      <ForExample>{t("forexample")}: https://dis-count.app/</ForExample>
      {links?.length > 0 ? <Title>{t("companyLink")}</Title> : null}
      {getValues("links")?.map((v: any) => (
        <>
          <WrapWebLink key={v.address}>
            <WebLink>{v?.name}</WebLink>
            <WebValue>
              <a href={v?.address} rel="noreferrer" target="_blank">
                ({v?.address})
              </a>
              <IconButton onClick={() => handleWebDelete(v)}>
                <DeleteIcon />
              </IconButton>
            </WebValue>
          </WrapWebLink>
        </>
      ))}
    </div>
  );
};

export default CompanyLink;
