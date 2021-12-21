import { Sections } from "pages/CompanyPages/services/components/Sections";
import React from "react";
import { Wrapper } from "./style";
interface GoodsProps {}

export const Goods: React.FC<GoodsProps> = () => {
  return (
    <Wrapper>
      <Sections />
    </Wrapper>
  );
};
