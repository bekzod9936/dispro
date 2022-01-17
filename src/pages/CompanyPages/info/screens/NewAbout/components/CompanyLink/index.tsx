import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, Title } from "../../../../style";
import Input from "components/Custom/Input";
import { ForExample, WrapWebLink, WebLink, WebValue } from "./style";
import { ArrowIcon, WrapArrow, DeleteIcon } from "../../style";
import { IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAppSelector } from "services/redux/hooks";

const CompanyLink = () => {
  const { t } = useTranslation();

  const data: any = useAppSelector((state) => state.info.data);
  const linkWatch = useWatch({ name: "link" });

  const [links, setLinks] = useState<any[]>([]);

  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useFormContext();

  const handleWebLink = () => {
    trigger(["companyLink", "link"]);
    setLinks((prev) => [
      ...prev,
      {
        name: getValues("companyLink"),
        address: getValues("link"),
        enable: false,
      },
    ]);
    setValue("companyLink", "");
    setValue("link", "");
  };
  const handleWebDelete = (v: any) => {
    const newArr = links.filter((a: any, i: any) => i !== v);
    setLinks(newArr);
  };

  useEffect(() => {
    setLinks(data?.links);
  }, [data]);

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
            error={errors.companyLink}
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
              border: Boolean(linkWatch)
                ? "1px solid #606EEA"
                : "1px solid #C2C2C2",
            }}
            isAbsolute={true}
            message={errors?.link?.message}
            error={errors.link}
            IconEnd={
              <WrapArrow onClick={handleWebLink} bgcolor={Boolean(linkWatch)}>
                <ArrowIcon />
              </WrapArrow>
            }
          />
        )}
      />
      <ForExample>{t("forexample")}: https://dis-count.app/</ForExample>
      {links?.length > 0 ? <Title>{t("companyLink")}</Title> : null}
      {links?.map(({ address, name }: any, i: any) => (
        <>
          <WrapWebLink key={address}>
            <WebLink>{name}</WebLink>
            <WebValue>
              <a href={address} rel="noreferrer" target="_blank">
                ({address})
              </a>
              <IconButton onClick={() => handleWebDelete(i)}>
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
