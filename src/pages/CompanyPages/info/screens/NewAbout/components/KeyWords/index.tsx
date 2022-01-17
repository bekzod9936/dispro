import { Controller, useFormContext, useWatch } from "react-hook-form";
import { WrapKeyWords } from "./style";
import { FilterButton } from "components/Custom/Buttons/Filter";
import Input from "components/Custom/Input";
import { useTranslation } from "react-i18next";
import { WrapArrow, ArrowIcon } from "../../style";
import { useAppSelector } from "services/redux/hooks";
import { useEffect, useState } from "react";

const KeyWords = () => {
  const { t } = useTranslation();
  const data = useAppSelector((state) => state.info.data);
  const [options, setOptions] = useState<any>([]);
  const keywordsValue = useWatch({ name: "keywordsValue" });

  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useFormContext();

  useEffect(() => {
    const arr: any = Boolean(data?.keyWords) ? data?.keyWords?.split(",") : [];
    setOptions(arr);
  }, [data]);

  const handleKeywords = () => {
    trigger(["keywordsValue"]);
    if (Boolean(keywordsValue)) {
      setOptions([...options, getValues("keywordsValue")]);
      setValue("keywordsValue", "");
    }
  };

  const handleDelete = (value: any) => {
    const newKeys = options.filter(
      (a: any, j: any) => value.v !== a && value.i !== j
    );
    setOptions(newKeys);
  };

  return (
    <div>
      <Controller
        name="keywordsValue"
        control={control}
        rules={{ required: Boolean(keywordsValue) }}
        defaultValue=""
        render={({ field }) => (
          <Input
            label={t("keywords")}
            error={errors.keywordsValue}
            message={
              errors.keywordsValue?.type === "value"
                ? errors.keywordsValue.message
                : t("requiredField")
            }
            type="string"
            field={field}
            margin={{
              laptop: "20px 0 0",
            }}
            isAbsolute={true}
            inputStyle={{
              border: Boolean(keywordsValue)
                ? "1px solid #606EEA"
                : "1px solid #C2C2C2",
            }}
            IconEnd={
              <WrapArrow
                onClick={handleKeywords}
                bgcolor={Boolean(keywordsValue)}
              >
                <ArrowIcon />
              </WrapArrow>
            }
          />
        )}
      />
      <WrapKeyWords>
        {options?.map((v: any, i: any) => {
          return (
            <FilterButton onClick={() => handleDelete({ v, i })}>
              {v}
            </FilterButton>
          );
        })}
      </WrapKeyWords>
    </div>
  );
};

export default KeyWords;
