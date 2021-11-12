import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useCashBack from "./useCashBack";
import Spinner from "components/Custom/Spinner";
import Pagination from "components/Custom/Pagination";
import Table from "../../components/Table";
import DatePcker from "components/Custom/DatePicker";
import dayjs from "dayjs";
import { countPagination, numberWithNew } from "services/utils";
import { useAppSelector } from "services/redux/hooks";
import {
  Container,
  WrapPag,
  Info,
  CashBackIcon,
  WrapIcon,
  WalletIcon,
} from "./style";
import {
  Label,
  RightHeader,
  TotalSum,
  WrapTotal,
  WrapTotalSum,
} from "../../style";

interface intialFilterProps {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
}

const Payment = () => {
  const { t } = useTranslation();

  const data = useAppSelector((state) => state.finance.cashBackFinance.data);
  const totalCount = useAppSelector(
    (state) => state.finance.cashBackFinance.totalCount
  );
  const between = useAppSelector(
    (state) => state.finance.cashBackFinance.between
  );
  const header = useAppSelector(
    (state) => state.finance.cashBackFinance.header
  );

  const companyId = localStorage.getItem("companyId");
  const intialFilter = {
    accountId: companyId,
    page: 1,
    perPage: 5,
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response } = useCashBack({
    filterValues: filterValues,
  });

  const list = data?.map((v: any) => {
    const date1 = dayjs(v.date).format("DD.MM.YYYY");
    const date2 = dayjs(v.activateDate).format("DD.MM.YYYY");
    return {
      col1: v.operationType,
      col2: v.clientName ? v.clientName : "-",
      col3: v.amount,
      col4: Math.round((v.amount / 100) * 100) / 100,
      col5: date1,
      col6: date2,
      col7: v.status,
    };
  });

  const columns: any = useMemo(
    () => [
      {
        Header: t("typeoftransaction"),
        accessor: "col1",
        Cell: (props: any) => (
          <WrapIcon>
            {props?.value === "cashback_account_top_up" ? <WalletIcon /> : null}
            {props?.value === "cashback_in" ? <CashBackIcon /> : null}
            {props?.value === "cashback_account_top_up"
              ? t("depositcashbek")
              : null}
            {props?.value === "cashback_in" ? t("cashbackaccrual") : null}
          </WrapIcon>
        ),
      },
      {
        Header: t("customer"),
        accessor: "col2",
      },
      {
        Header: t("cashbackUZS"),
        accessor: "col3",
      },
      {
        Header: t("commission/top-upamount"),
        accessor: "col4",
      },
      {
        Header: t("purchasedate"),
        accessor: "col5",
      },
      {
        Header: t("dateofaccrual"),
        accessor: "col6",
      },
      {
        Header: t("status"),
        accessor: "col7",
        Cell: (props: any) => (
          <>
            {props?.value === "success"
              ? t("accrued")
              : props?.value === "pending"
              ? t("pending")
              : t("canceled")}
          </>
        ),
      },
    ],
    []
  );

  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };

  return (
    <>
      <RightHeader>
        <WrapTotal>
          {header.map((v: any) => {
            return (
              <WrapTotalSum>
                <Label>{v.title || ""}</Label>
                <TotalSum>
                  {numberWithNew({
                    number: +v.value,
                    defaultValue: 0,
                  })}
                </TotalSum>
              </WrapTotalSum>
            );
          })}
        </WrapTotal>
      </RightHeader>
      <Container>
        <DatePcker
          onChange={async (e: any) => {
            await setFilterValues({
              ...filterValues,
              dateFrom: e.slice(0, e.indexOf(" ~")),
              dateTo: e.slice(e.indexOf("~ ") + 2),
            });
            await response.refetch();
          }}
          margin="0 0 20px 0"
        />

        {response.isLoading || response.isFetching ? (
          <Spinner />
        ) : (
          <>
            <Table columns={columns} data={list} />
          </>
        )}
        {list.length > 0 ? (
          <WrapPag>
            <Info>
              {t("shown")}
              <span>{between}</span>
              {t("from1")} <span>{totalCount}</span>
              {countPagination({
                count: totalCount,
                firstWord: t("page1"),
                secondWord: t("page23"),
              })}
            </Info>
            <Pagination
              page={filterValues.page}
              count={totalCount}
              onChange={handlechangePage}
              disabled={response.isLoading || response.isFetching}
            />
          </WrapPag>
        ) : null}
      </Container>
    </>
  );
};

export default Payment;
