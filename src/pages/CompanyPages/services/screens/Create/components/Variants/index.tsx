import { Variant } from "pages/CompanyPages/services/components/Variant";
import { SubButton } from "pages/CompanyPages/services/style";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Item, Wrapper } from "./style";

export const Variants = () => {
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
          <Variant index={index} />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
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
          </div>
        </Item>
      ))}
    </Wrapper>
  );
};
