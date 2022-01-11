import { useState } from "react";
import Filter from "components/Custom/Filter/index";
import MultiSelect from "components/Custom/MultiSelect";
import Button from "components/Custom/Buttons/Button";
import useWindowWidth from "services/hooks/useWindowWidth";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useAppSelector } from "services/redux/hooks";
import useExcel from "../../hook/useExcel";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import { FilterButton } from "components/Custom/Buttons/Filter";
import CheckBox from "components/Custom/CheckBox";
import {
  WrapFilterValues,
  WrapInputs,
  Label1,
  WrapSelectV,
  ExcelIcon,
  WrapFilter,
  WrapFilterButtons,
  Label,
  WrapStatus,
} from "./style";

interface CashProp {
  value?: number;
  label?: string;
}

interface Props {
  refetch?: any;
  setFilterValues?: any;
  filterValues?: any;
  intialFilter?: any;
  length: number;
}

const FilterHistory = ({
  refetch,
  setFilterValues,
  filterValues,
  intialFilter,
  length,
}: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const { resExcel } = useExcel();

  const cashier = useAppSelector(
    (state) => state.finance.historyFinance.cashier
  );

  const stores = useAppSelector(
    (state) => state.finance.historyFinance.storeIds
  );
  const intialDate = {
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  };

  const intialPayment = {
    cash: false,
    app: false,
  };

  const [date, setDate] = useState(intialDate);
  const [dateLimit, setDateLimit] = useState({ startDate: "", endDate: "" });
  const [cashierStaffId, setCashierStaffId] = useState<CashProp>();
  const [storeId, setStoreId] = useState<CashProp>();
  const [payment, setPayment] = useState<any>(intialPayment);
  const storesFilter = stores?.map((v: any) => {
    return {
      value: v.id,
      label: v.name,
    };
  });

  const onReset = async () => {
    await setFilterValues(intialFilter);
    await setDate(intialDate);
    await setCashierStaffId({});
    await setDateLimit({ startDate: "", endDate: "" });
    await setStoreId({});
    await setPayment(intialPayment);
    await refetch();
  };

  const handleFilterSubmit = ({ startDate = "", endDate = "" }) => {
    setFilterValues({
      ...filterValues,
      cashierStaffId: cashierStaffId?.value ?? "",
      storeId: storeId?.value ? storeId?.value : "",
      startDate: startDate,
      endDate: endDate,
      amountCash: payment.cash ? 1 : "",
      amountCard: payment.app ? 1 : "",

      page: 1,
    });
  };

  const handleClick = () => {
    resExcel.refetch();
  };

  const filterselectvalue =
    filterValues?.startDate === dateLimit?.startDate &&
    filterValues?.endDate === dateLimit?.endDate ? (
      <FilterButton
        onClick={async () => {
          await setFilterValues({
            ...filterValues,
            page: 1,
            endDate: intialDate.endDate,
            startDate: intialDate.startDate,
          });
          await setDate(intialDate);
          await setDateLimit({ startDate: "", endDate: "" });
          await refetch();
        }}
      >
        {`${dayjs(dateLimit?.startDate).format("DD MMMM")}-${dayjs(
          dateLimit?.endDate
        ).format("DD MMMM, YYYY")}`}
      </FilterButton>
    ) : null;

  const filtercashier =
    filterValues.cashierStaffId !== "" &&
    filterValues.cashierStaffId !== null &&
    filterValues.cashierStaffId !== undefined ? (
      <FilterButton
        onClick={async () => {
          await setFilterValues({
            ...filterValues,
            cashierStaffId: "",
            page: 1,
          });
          await setCashierStaffId({});
          await refetch();
        }}
      >
        {`${t("cashier")}: `}
        {cashierStaffId?.label}
      </FilterButton>
    ) : null;

  const filterstore = filterValues.storeId ? (
    <FilterButton
      onClick={async () => {
        await setFilterValues({
          ...filterValues,
          page: 1,
          storeId: "",
        });
        await setStoreId({});
        await refetch();
      }}
    >
      {`${t("filial")}: `}
      {storeId?.label}
    </FilterButton>
  ) : null;

  const filtercash =
    filterValues?.amountCash === 1 ? (
      <FilterButton
        onClick={async () => {
          await setFilterValues({
            ...filterValues,
            page: 1,
            amountCash: "",
          });
          await setPayment({ ...payment, cash: false });
        }}
      >
        {`${t("typeofpayment")}: ${t("terminal")}`}
      </FilterButton>
    ) : null;

  const filtercard =
    filterValues?.amountCard === 1 ? (
      <FilterButton
        onClick={async () => {
          await setFilterValues({
            ...filterValues,
            page: 1,
            amountCard: "",
          });
          await setPayment({ ...payment, app: false });
        }}
      >
        {`${t("typeofpayment")}: ${t("throughtheapp")}`}
      </FilterButton>
    ) : null;

  const filterList = [
    {
      title: t("byDate"),
      value:
        filterValues.startDate && filterValues.endDate
          ? dayjs(filterValues.startDate).format("YYYY.MM.DD") +
            " - " +
            dayjs(filterValues.endDate).format("YYYY.MM.DD")
          : filterValues.endDate || filterValues.startDate
          ? dayjs(filterValues.endDate || filterValues.startDate).format(
              "YYYY.MM.DD"
            )
          : undefined,
      content: (
        <WrapInputs>
          <Label1>{t("chose_date")}</Label1>
          <div>
            <CustomDatePicker
              margin="0 15px 0 0"
              isFilter
              text={t("from")}
              onChange={(e) => {
                let date1 = "" + e.year + "-" + e.month.number + "-" + e.day;
                setDate({
                  ...date,
                  startDate: date1,
                });
                setDateLimit({ ...date, startDate: date1 });
              }}
              value={date?.startDate}
              maxDate={date?.endDate}
            />
            <CustomDatePicker
              margin="0 0 0 0"
              isFilter
              text={t("to")}
              onChange={(e) => {
                let date1 = "" + e.year + "-" + e.month.number + "-" + e.day;
                setDate({
                  ...date,
                  endDate: date1,
                });
                setDateLimit({ ...date, endDate: date1 });
              }}
              value={date?.endDate}
              minDate={date?.startDate}
            />
          </div>
        </WrapInputs>
      ),
    },
    {
      title: t("bycashier"),
      value: filterValues.cashierStaffId ? cashierStaffId?.label : undefined,
      content: (
        <MultiSelect
          label={t("chose_cashier")}
          options={cashier}
          placeholder={t("cashiernotselected")}
          onChange={(e: any) => setCashierStaffId(e)}
          value={cashierStaffId}
          menuPortalTarget={document.body}
          isBranchHeight={true}
        />
      ),
    },
    {
      title: t("withfilial"),
      value: filterValues.storeId ? storeId?.label : undefined,
      content: (
        <MultiSelect
          label={t("choosefilial")}
          options={storesFilter}
          onChange={(e: any) => setStoreId(e)}
          value={storeId}
          selectStyle={{ bgcolor: "#eff0fd" }}
          menuPortalTarget={document.body}
          isBranchHeight={true}
        />
      ),
    },
    {
      title: t("typeofpayment"),
      content: (
        <div>
          <Label>{t("choosepaymentmethod")}</Label>
          <WrapStatus>
            <CheckBox
              label={t("terminal")}
              name="amountCash"
              onChange={(e) => {
                setPayment({ ...payment, cash: e.target.checked });
              }}
              checked={payment?.cash}
            />
            <CheckBox
              label={t("throughtheapp")}
              name="amountCard"
              onChange={(e) => {
                setPayment({ ...payment, app: e.target.checked });
              }}
              checked={payment?.app}
            />
          </WrapStatus>
        </div>
      ),
    },
  ];

  return (
    <>
      <WrapFilter>
        <WrapFilterValues>
          <Filter
            onSubmit={() =>
              handleFilterSubmit({
                startDate: date.startDate,
                endDate: date.endDate,
              })
            }
            onReset={onReset}
            list={filterList}
          />
          {width >= 1000 ? (
            <div
              style={{
                gap: "10px",
                display: "flex",
                flexWrap: "wrap",
                marginLeft: "10px",
              }}
            >
              {filtercash}
              {filtercard}
              {filterselectvalue}
              {filtercashier}
              {filterstore}
            </div>
          ) : null}
        </WrapFilterValues>
        {length === 0 ? null : (
          <Button
            onClick={handleClick}
            startIcon={<ExcelIcon />}
            buttonStyle={{
              bgcolor: "#45A13B",
              height: {
                mobile: 36,
              },
            }}
            margin={{
              laptop: "0 0 0 10px",
              planshet: "0 0 0 20px",
            }}
            disabled={resExcel.isLoading}
          >
            {t("exportexcel")}
          </Button>
        )}
      </WrapFilter>
      <WrapSelectV>
        {width > 1000 ? null : (
          <WrapFilterButtons>
            {filtercash}
            {filtercard}

            {filterselectvalue}
            {filtercashier}
            {filterstore}
          </WrapFilterButtons>
        )}
      </WrapSelectV>
    </>
  );
};

export default FilterHistory;
