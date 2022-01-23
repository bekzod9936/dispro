import React from "react";
import { OptionsListItem } from "../../styles/CustomStyles";
import { useTranslation } from "react-i18next";

interface IProps {
  width: string;
  options?: any[];
}
const CustomSelectPopoverComponent: React.FC<IProps> = ({ options, width }) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "14px",
        background: "white",
        padding: "8px 0px",

        width: width,
      }}
    >
      {options?.map((item) => {
        return (
          <OptionsListItem onClick={item.handler}>
            {t(item.content)}
          </OptionsListItem>
        );
      })}
    </div>
  );
};

export default CustomSelectPopoverComponent;
