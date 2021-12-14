import { Variant } from "pages/CompanyPages/services/components/Variant";
import { SubButton } from "pages/CompanyPages/services/style";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Item, Wrapper } from "./style";

export const Variants = () => {
  const { control } = useFormContext();
  const { t } = useTranslation();

  const { fields, append } = useFieldArray({
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
          <Variant index={index} />
          {index === fields.length - 1 && fields.length <= 2 && (
            <SubButton onClick={handleAddVariant}>{t("addVariant")}</SubButton>
          )}
        </Item>
      ))}
    </Wrapper>
  );
};
