import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Logo from "../Logo";
import { WrapCurrency } from "./style";
import { TextArea } from "components/Custom/TextArea";
import Input from "components/Custom/Input";
import MultiSelect from "components/Custom/MultiSelect";
import KeyWords from "../KeyWords";
import useLeft from "./useLeft";

const LeftSide = () => {
  const { t } = useTranslation();
  const { resCategory } = useLeft();
  const categories = useWatch({ name: "category" });

  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  return (
    <div>
      <Logo />
      <Controller
        name="name"
        control={control}
        rules={{ required: true, maxLength: 30 }}
        render={({ field }) => (
          <Input
            label={t("title")}
            error={errors.name ? true : false}
            message={t("requiredField")}
            type="string"
            field={field}
            margin={{
              laptop: "20px 0 25px",
            }}
            maxLength={30}
            autoComplete="off"
          />
        )}
      />
      <Controller
        name="annotation"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            label={t("company_direction")}
            error={errors.annotation ? true : false}
            message={t("requiredField")}
            type="string"
            field={field}
            margin={{
              laptop: "20px 0 25px",
            }}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextArea
            {...field}
            message={t("requiredField")}
            error={errors.description ? true : false}
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
        rules={{ required: true }}
        render={({ field }) => (
          <MultiSelect
            isLoading={resCategory.isLoading}
            options={categories?.length < 2 ? getValues("options") : []}
            isMulti={true}
            label={t("chose_categories")}
            margin={{
              laptop: "20px 0 25px",
            }}
            message={t("requiredField")}
            error={errors.categories ? true : false}
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
