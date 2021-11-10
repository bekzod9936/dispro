import Filter from "components/Custom/Filter/index";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Radio from "components/Custom/Radio";
import Input from "components/Custom/Input";
import {
  Label,
  WrapDate,
  WrapInputs,
  WrapPlaceHolder,
} from "../../style";
import { Wrapper } from "./style";
import { resetFilters, setFilters } from "services/redux/Slices/clients";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";


const traffics = [
  { value: "1", label: "App" },
  { value: "2", label: "Mobile" },
  { value: "3", label: "Cashier" },
]
export const MFilter = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(state => state.clients)
  const [filter, setFilter] = useState<any>({})

  useEffect(() => {
    setFilter(filters)
  }, [filters])

  const filterList = [
    {
      title: t("gender"),
      content: (
        <Radio
          flexDirection="row"
          list={[
            { value: "1", label: `${t("male")}` },
            { value: "2", label: `${t("female")}` },
          ]}
          title={t("chose_gender")}
          onChange={(v: string) => setFilter((prev: any) => ({
            ...prev,
            gender: v
          }))}
          value={filter?.gender}
        // onChange={(v: string) => setFilter((prev: any) => ({ ...prev, gender: v }))}
        // value={filter.gender}
        />
      ),
    },
    {
      title: t("registration_date"),
      content: (
        <WrapInputs>
          <Label>{t("chose_date")}</Label>
          <div>
            <Input
              type="date"
              width={{
                maxwidth: 200,
              }}
              IconStart={<WrapDate>{t("from")}</WrapDate>}
              inputStyle={{
                inpadding: "0 10px 0 0",
              }}
              value={filter?.regDate?.regDateFrom}
              onChange={(e) => setFilter((prev: any) => ({
                ...prev, regDate: {
                  ...prev["regDate"],
                  regDateFrom: e.target.value
                }
              }))}
            />
            <Input
              type="date"
              width={{
                maxwidth: 200,
              }}
              margin={{ laptop: "0 0 0 15px" }}
              IconStart={<WrapDate>{t("to")}</WrapDate>}
              inputStyle={{
                inpadding: "0 10px 0 0",
              }}
              value={filter?.regDate?.regDateTo}
              onChange={(e) => setFilter((prev: any) => ({
                ...prev, regDate: {
                  ...prev["regDate"],
                  regDateTo: e.target.value
                }
              }))}
            />
          </div>
        </WrapInputs>
      ),
    },
    {
      title: t("purchuase_amount"),
      content: (
        <>
          <Input
            label={t("enter_amount")}
            IconStart={<WrapPlaceHolder>{t("from")}</WrapPlaceHolder>}
            width={{
              maxwidth: 200,
            }}
            inputStyle={{
              inpadding: "0 10px",
            }}
            type="number"
            value={filter?.purchaseAmount?.purchaseCountFrom}
            onChange={(e) => setFilter((prev: any) => ({
              ...prev, purchaseAmount: {
                ...prev["purchaseAmount"],
                purchaseCountFrom: e.target.value
              }
            }))}
          />
          <Input
            label={t("enter_amount")}
            margin={{ laptop: "0 0 0 15px" }}
            IconStart={<WrapPlaceHolder>{t("to")}</WrapPlaceHolder>}
            width={{
              maxwidth: 200,
            }}
            inputStyle={{
              inpadding: "0 10px",
            }}
            type="number"
            value={filter?.purchaseAmount?.purchaseCountTo}
            onChange={(e) => setFilter((prev: any) => ({
              ...prev, purchaseAmount: {
                ...prev["purchaseAmount"],
                purchaseCountTo: e.target.value
              }
            }))}
          />
        </>
      ),
    },
    {
      title: t("purchuase_cost"),
      content: (
        <Input
          placeholder={t("notless")}
          onChange={(e) => setFilter((prev: any) => ({ ...prev, notless: e.target.value }))}
          type="number"
          label={t("enter_amount")}
          value={filter?.notless}
        />
      ),
    },
    // {
    //     title: t('status'),
    //     content: (
    //       <WrapStatus>
    //         <Label>{t('chose_status')}</Label>
    //         <WrapCheck>
    //           {filters.status.map((v: any) => (
    //             <CheckBox
    //               key={v.label}
    //               label={v.label}
    //               checked={v.status}
    //               onChange={(e: any) => {
    //                 const arr = filters.status.map((i: any) => {
    //                   if (i.name === e.target.name) {
    //                     return { ...i, [e.target.name]: e.target.checked };
    //                   } else {
    //                     return i;
    //                   }
    //                 });
    //                 setFilter((prev: any) => ({...prev, status: arr}));
    //               }}
    //             />
    //           ))}
    //         </WrapCheck>
    //       </WrapStatus>
    //     )
    // },
    {
      title: t("traffic_provider"),
      content: (
        <Radio
          flexDirection="row"
          list={traffics}
          title={t("chose_trafic_provider")}
          onChange={(e) => setFilter((prev: any) => ({ ...prev, trafficProvider: traffics.find(el => el.value === e) }))}
          value={filter?.trafficProvider?.value}
        />
      ),
    },
  ];

  const handleSubmit = () => {
    const res = {
      ...filter,

    }
    dispatch(setFilters(res))
  };

  const handleReset = () => {
    dispatch(resetFilters())
  }

  return (
    <Wrapper>
      <Filter list={filterList} onSubmit={handleSubmit} onReset={handleReset} />
    </Wrapper>
  );
};

