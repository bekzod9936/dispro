//packages
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import { Variant } from "pages/CompanyPages/services/components/Variant";
import { SubButton } from "pages/CompanyPages/services/style";

//style
import { Buttons, Item, Wrapper } from "./style";

interface VariantsProps {
  disabled: boolean;
}

export const Variants: React.FC<VariantsProps> = ({ disabled }) => {
  const { control } = useFormContext();
  const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const handleAddVariant = () => {
    append({
      name: [{ data: "", lang: "(Рус)" }],
      amount: "",
      price: "",
      priceWithSale: "",
      articul: "",
    });
  };

  return (
    <Wrapper>
      {fields.map((item, index) => (
        <Item isLastElem={index === fields.length - 1} key={item.id}>
          <Variant disabled={disabled} index={index} />
          <Buttons>
            {index === fields.length - 1 && fields.length <= 2 && (
              <SubButton onClick={handleAddVariant}>
                {t("addVariant")}
              </SubButton>
            )}
            {index === fields.length - 1 && fields.length > 1 && (
              <SubButton deleteButton onClick={() => remove(index)}>
                {t("removeVariant")}
              </SubButton>
            )}
          </Buttons>
        </Item>
      ))}
    </Wrapper>
  );
};
