//packages
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import { Variant } from "pages/CompanyPages/services/components/Variant";
import { SubButton } from "pages/CompanyPages/services/style";

//style
import { Buttons, Item, Wrapper } from "./style";
import { useState } from "react";

interface VariantsProps {
  disabled: boolean;
}

export const Variants: React.FC<VariantsProps> = ({ disabled }) => {
  const { t } = useTranslation();
  const [isVariantAdded, setIsVariantAdded] = useState<
    "append" | "remove" | "reset"
  >("reset");

  const { fields, append, remove } = useFieldArray({
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
    setIsVariantAdded("append");
  };

  const handleRemoveVariant = (index: number) => {
    remove(index);
    setIsVariantAdded("remove");
  };

  return (
    <Wrapper>
      {fields.map((item, index) => (
        <Item isLastElem={index === fields.length - 1} key={item.id}>
          <Variant
            isFieldsMultiple={fields.length > 1}
            isVariantAdded={isVariantAdded}
            disabled={disabled}
            index={index}
          />
          <Buttons>
            {index === fields.length - 1 && fields.length <= 2 && (
              <SubButton onClick={handleAddVariant}>
                {t("addVariant")}
              </SubButton>
            )}
            {index === fields.length - 1 && fields.length > 1 && (
              <SubButton
                deleteButton
                onClick={() => handleRemoveVariant(index)}
              >
                {t("removeVariant")}
              </SubButton>
            )}
          </Buttons>
        </Item>
      ))}
    </Wrapper>
  );
};
