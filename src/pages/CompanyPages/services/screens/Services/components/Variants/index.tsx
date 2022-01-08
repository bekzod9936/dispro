//packages
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import { Variant } from "pages/CompanyPages/services/components/Variant";
import { SubButton } from "pages/CompanyPages/services/style";

//style
import { Buttons, Item, Wrapper } from "./style";
import { useEffect } from "react";

interface VariantsProps {
  disabled: boolean;
  setVariantsLength: (value: number) => void;
}

export const Variants: React.FC<VariantsProps> = ({
  disabled,
  setVariantsLength,
}) => {
  const { t } = useTranslation();

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
  };

  const handleRemoveVariant = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    setVariantsLength(fields.length);
  }, [fields]);

  return (
    <Wrapper>
      {fields.map((item, index) => (
        <Item isLastElem={index === fields.length - 1} key={item.id}>
          <Variant
            isFieldsMultiple={fields.length > 1}
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
