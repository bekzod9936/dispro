import { useTranslation } from "react-i18next";
import Filter from "components/Custom/Filter/index";
import Radio from "components/Custom/Radio";
import { useState } from "react";
import { FilterButton } from "components/Custom/Buttons/Filter";
import { WrapFilter } from "./style";
interface Props {
  filterType: any;
  setFilterType: any;
}

const FilterQr = ({ filterType, setFilterType }: Props) => {
  const { t } = useTranslation();

  const types = [
    { value: "ref", label: `${t("forpayment")}` },
    { value: "branches", label: `${t("formarketing")}` },
  ];
  const [type, setType] = useState(null);

  const onReset = () => {
    setType(null);
    setFilterType(null);
  };

  const filterList = [
    {
      title: t("qrtype"),
      value:
        type !== null && type !== undefined
          ? type === "ref"
            ? t("forpayment")
            : type === "branches"
            ? t("formarketing")
            : undefined
          : undefined,
      content: (
        <Radio
          flexDirection="row"
          list={types}
          title={t("chose_gender")}
          onChange={(v: any) => setType(v)}
          value={type}
        />
      ),
    },
  ];

  return (
    <WrapFilter>
      <Filter
        onSubmit={() => {
          setFilterType(type);
        }}
        onReset={onReset}
        list={filterList}
      />
      {filterType !== null && filterType !== "" && filterType !== undefined ? (
        <FilterButton onClick={onReset}>
          {`${t("qrtype")} :  ${
            types.find((v: any) => filterType === v.value)?.label
          }
`}
        </FilterButton>
      ) : null}
    </WrapFilter>
  );
};

export default FilterQr;
