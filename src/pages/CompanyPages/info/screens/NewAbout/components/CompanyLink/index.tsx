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
  const companyLinkWatch = useWatch({ name: "companyLink" });

  const [links, setLinks] = useState<any[]>([]);

  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    setError,
  } = useFormContext();

  const handleWebLink = () => {
    if (Boolean(getValues("companyLink")) && Boolean(getValues("link"))) {
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
    } else {
      if (!Boolean(getValues("link"))) {
        setError(
          "link",
          { type: "value", message: t("requiredField") },
          { shouldFocus: true }
        );
      }
      if (!Boolean(getValues("companyLink"))) {
        setError(
          "companyLink",
          { type: "value", message: t("requiredField") },
          { shouldFocus: true }
        );
      }
    }
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
        rules={{
          required: {
            value: linkWatch?.length > 0,
            message: "requiredField",
          },
          maxLength: {
            value: 30,
            message: "maxcharacters",
          },
        }}
        render={({ field }) => (
          <Input
            message={t(errors?.companyLink?.message, { value: 30 })}
            error={errors?.companyLink}
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
        rules={{
          required: {
            value: companyLinkWatch?.length > 0,
            message: "requiredField",
          },
          pattern: {
            value:
              /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
            message: "wronglink",
          },
        }}
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
            message={t(errors?.link?.message)}
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
      {links?.length > 0 && <Title>{t("companyLink")}</Title>}
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
