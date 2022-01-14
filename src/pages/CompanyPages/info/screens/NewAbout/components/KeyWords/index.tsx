import { Controller, useFormContext, useWatch } from "react-hook-form";
import { WrapKeyWords } from "./style";
import { FilterButton } from "components/Custom/Buttons/Filter";
import Input from "components/Custom/Input";
import { useTranslation } from "react-i18next";
import { WrapArrow, ArrowIcon } from "../../style";

const KeyWords = () => {
  const { t } = useTranslation();

  const keywordsValue = useWatch({ name: "keywordsValue" });
  const keyWords = useWatch({ name: "keyWords" });

  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useFormContext();

  const handleKeywords = () => {
    if (Boolean(keywordsValue)) {
      clearErrors("keywordsValue");
      setValue("keyWords", [
        ...getValues("keyWords"),
        getValues("keywordsValue"),
      ]);
      setValue("keywordsValue", "");
    } else {
      setError("keywordsValue", {}, { shouldFocus: true });
    }
  };

  const handleDelete = (value: any) => {
    const newKeys = keyWords.filter(
      (a: any, j: any) => value.v !== a && value.i !== j
    );
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
        {keyWords?.map((v: any, i: any) => {
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
