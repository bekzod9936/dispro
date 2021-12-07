import Filter from "components/Custom/Filter/index";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Radio from "components/Custom/Radio";
import Input from "components/Custom/Input";
import {
  Label,
  WrapCheck,
  WrapDate,
  WrapInputs,
  WrapPlaceHolder,
  WrapStatus,
} from "../../style";
import { Wrapper } from "./style";
import { resetFilters, setFilters } from "services/redux/Slices/clients";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { getOneDayPlus } from "pages/CompanyPages/clients/utils/getSelectedFilters";
import InputFormat from "components/Custom/InputFormat";
import useWindowWidth from "services/hooks/useWindowWidth";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import CheckBox from "components/Custom/CheckBox";



export const MFilter = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const { filters, referals, clientLevels } = useAppSelector(state => state.clients)
  const [filter, setFilter] = useState<any>({})
  const { width } = useWindowWidth()

  useEffect(() => {
    setFilter(filters)
  }, [filters])

  const getReferals = (arr: any) => {
    return arr?.map((el: any, index: number) => ({
      realValue: el.refIds,
      label: el.name,
      value: index
    }))
  }
  const getLevels = (arr: any) => {
    return arr?.map((el: any) => ({
      label: t(el.name),
      value: el.number
    }))
  }

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
          <div style={{ width: "100%" }}>
            {/* <Input
              type="date"
              width={{
                maxwidth: 200,
                width: width <= 600 ? "47%" : "100%"

              }}
              IconStart={<WrapDate>{t("from")}</WrapDate>}
              inputStyle={{
                inpadding: "0 10px 0 0",
              }}
              max={getOneDayPlus(filter?.regDate?.regDateTo, "minus")}
              value={filter?.regDate?.regDateFrom}
              onChange={(e) => setFilter((prev: any) => ({
                ...prev, regDate: {
                  ...prev["regDate"],
                  regDateFrom: e.target.value
                }
              }))}
            /> */}
            <CustomDatePicker
              margin="0 15px 0 0"
              isFilter
              text={t("from")}
              maxDate={filter?.regDate?.regDateTo || new Date()}
              onChange={(e) => {
                let date = "" + e.year + "-" + e.month.number + "-" + e.day;
                setFilter((prev: any) => ({
                  ...prev, regDate: {
                    ...prev["regDate"],
                    regDateFrom: date
                  }
                }))
              }}
              value={filter?.regDate?.regDateFrom} />
            <CustomDatePicker
              isFilter
              text={t("to")}
              minDate={filter?.regDate?.regDateFrom}
              maxDate={new Date()}
              onChange={(e) => {
                let date = "" + e.year + "-" + e.month.number + "-" + e.day;
                setFilter((prev: any) => ({
                  ...prev, regDate: {
                    ...prev["regDate"],
                    regDateTo: date
                  }
                }))
              }}
              value={filter?.regDate?.regDateTo} />

            {/* <Input
              type="date"
              width={{
                maxwidth: 200,
                width: width <= 600 ? "47%" : "100%"
              }}
              // min={getOneDayPlus(filter?.regDate?.regDateFrom, "plus")}
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
            /> */}
          </div>
        </WrapInputs>
      ),
    },
    {
      title: t("purchuase_amount"),
      content: (
        <>
          <InputFormat
            type='tel'
            label={t("enter_number")}
            IconStart={<WrapPlaceHolder>{t("from")}</WrapPlaceHolder>}
            width={{
              maxwidth: 200,
            }}
            max={filter?.purchaseAmount?.purchaseCountTo}
            inputStyle={{
              inpadding: "0 10px",
            }}
            maxLength="5"
            value={filter?.purchaseAmount?.purchaseCountFrom}
            onChange={(e) => setFilter((prev: any) => ({
              ...prev, purchaseAmount: {
                ...prev["purchaseAmount"],
                purchaseCountFrom: e.target.value
              }
            }))}
          />
          <InputFormat
            type='tel'
            label={t("enter_number")}
            margin={{ laptop: "0 0 0 15px" }}
            IconStart={<WrapPlaceHolder>{t("to")}</WrapPlaceHolder>}
            error={(filter?.purchaseAmount?.purchaseCountFrom != "" && filter?.purchaseAmount?.purchaseCountTo != "") && Number(filter?.purchaseAmount?.purchaseCountFrom) > Number(filter?.purchaseAmount?.purchaseCountTo)}
            width={{
              maxwidth: 200,
            }}
            inputStyle={{
              inpadding: "0 10px",
            }}
            maxLength="5"
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
        <InputFormat
          maxLength="11"
          type='tel'
          placeholder={t("notless")}
          onChange={(e) => setFilter((prev: any) => ({ ...prev, notless: e.target.value }))}
          label={t("enter_amount")}
          value={filter?.notless}
        />
      ),
    },
    {
      title: t('status'),
      content: (
        <Radio
          title={t("statuschoose")}
          list={getLevels(clientLevels)}
          value={Number(filter?.status)}
          onChange={(e) => setFilter((prev: any) => ({ ...prev, status: e }))}
          flexDirection="row" />
      )
    },
    {
      title: t("traffic_provider"),
      content: (
        <Radio
          flexDirection="row"
          list={getReferals(referals)}
          title={t("chose_trafic_provider")}
          onChange={(e) => setFilter((prev: any) => ({ ...prev, trafficProvider: e }))}
          value={Number(filter?.trafficProvider)}
        />
      ),
    },
  ];

  const handleSubmit = () => {
    const res = {
      ...filter,
    }
    if ((filter?.purchaseAmount?.purchaseCountFrom != "" && filter?.purchaseAmount?.purchaseCountTo != "") && Number(filter?.purchaseAmount?.purchaseCountFrom) > Number(filter?.purchaseAmount?.purchaseCountTo)) return
    dispatch(setFilters(res))
  };

  const handleReset = () => {
    dispatch(resetFilters())
  }


  return (
    <Wrapper>
      <Filter
        position={-50}
        error={(filter?.purchaseAmount?.purchaseCountFrom != "" && filter?.purchaseAmount?.purchaseCountTo != "") && Number(filter?.purchaseAmount?.purchaseCountFrom) > Number(filter?.purchaseAmount?.purchaseCountTo)}
        list={filterList}
        onSubmit={handleSubmit}
        onReset={handleReset} />
    </Wrapper>
  );
};

