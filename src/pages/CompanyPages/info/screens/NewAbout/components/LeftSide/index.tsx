import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Logo from "../Logo";
import { WrapCurrency } from "./style";
import { TextArea } from "components/Custom/TextArea";
import Input from "components/Custom/Input";
import MultiSelect from "components/Custom/MultiSelect";
import KeyWords from "../KeyWords";
import useLeft from "./useLeft";
import useLayout from "components/Layout/useLayout";
import { useEffect } from "react";
import { useAppSelector } from "services/redux/hooks";

const LeftSide = () => {
  const { t } = useTranslation();
  const { resCategory } = useLeft();
  const categories = useWatch({ name: "category" });
  const companyId: any = localStorage.getItem("companyId");
  const { resHeader } = useLayout({ id: companyId });
  const data = useAppSelector((state) => state.info.data);

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  useEffect(() => {
    if (resHeader.isSuccess && resCategory.isSuccess) {
      const newArr = resCategory.data?.filter((v: any) =>
        data?.categories?.find((i: any) => i === v.value)
      );

      setValue("category", newArr);
    }
  }, [resCategory.isSuccess, resHeader.isSuccess]);

  return (
    <div>
      <Logo />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            label={t("title")}
            error={errors?.name}
            message={t(errors?.name?.message, { value: 30 })}
            type="string"
            field={field}
            margin={{
              laptop: "20px 0 25px",
            }}
            autoComplete="off"
          />
        )}
      />
      <Controller
        name="annotation"
        control={control}
        render={({ field }) => (
          <Input
            label={t("company_direction")}
            error={errors?.annotation}
            type="string"
            field={field}
            margin={{
              laptop: "20px 0 25px",
            }}
            message={t(errors?.annotation?.message, { value: 30 })}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            message={t(errors?.description?.message, { value: 800 })}
            error={errors?.description}
            minHeight={"120px"}
            maxHeight={"300px"}
            resize={"vertical"}
            title={t("description")}
          />
        )}
      />
      <WrapCurrency>
        <span>{t("currency")}</span>
        <div>UZS (Uzbekistan sum)</div>
      </WrapCurrency>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <MultiSelect
            isLoading={resCategory.isLoading}
            options={categories?.length < 2 ? resCategory.data : []}
            isMulti={true}
            label={t("chose_categories")}
            margin={{
              laptop: "20px 0 25px",
            }}
            message={t(errors?.category?.message)}
            error={errors?.categories}
            field={field}
            isClearable={false}
            nooptionsmessage={t("noOptionMessage")}
          />
        )}
      />
      <KeyWords />
    </div>
  );
};

export default LeftSide;
