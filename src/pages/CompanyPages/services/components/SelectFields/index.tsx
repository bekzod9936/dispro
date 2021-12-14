import MultiSelect from "components/Custom/MultiSelect";
import { FormFieldTypes } from "pages/CompanyPages/services/utils/types";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SelectFieldProps {
  icon: JSX.Element;
  isMulti?: boolean;
  name: keyof FormFieldTypes;
  placeholder: string;
  options: {
    value: string | number;
    label: string;
    name: string;
  }[];
  margin?: {
    desktop?: string;
    laptop?: string;
    planshet?: string;
    mobile?: string;
  };
}

export const SelectField: React.FC<SelectFieldProps> = ({
  icon,
  options,
  margin,
  isMulti,
  name,
  placeholder,
}) => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MultiSelect
          field={field}
          margin={margin}
          selectStyle={{
            fontSize: {
              desktop: 16,
              laptop: 16,
            },
            bgcolor: "#eff0fd",
            border: "none",
            placeholdercolor: "#223367",
            inpadding: "2px 10px 2px 75px",
            placewieght: "500",
          }}
          iconleft="25px"
          icon={icon}
          isMulti={isMulti}
          options={options}
          placeholder={t(placeholder)}
        />
      )}
    />
  );
};
