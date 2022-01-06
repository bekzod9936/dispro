import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import usePayment from "./usePayment";
import Spinner from "components/Custom/Spinner";
import Table from "../../components/Table";
import DatePcker from "components/Custom/DatePicker";
import { countPagination, numberWithNew } from "services/utils";
import { useAppSelector } from "services/redux/hooks";
import useWindowWidth from "services/hooks/useWindowWidth";
import MobileTable from "../../components/MobileTable";
import { NewPagination } from "components/Custom/NewPagination";
import financeCashierDef from "../../../../../assets/images/financeCashierDef.png";
import { Container, MoneyIcon, DiscountIcon } from "./style";
import {
  Label,
  RightHeader,
  TotalSum,
  WrapTotal,
  WrapTotalSum,
  WrapPag,
  Info,
  WrapSum,
  Img,
  WrapDef,
  TitleDef,
} from "../../style";

interface intialFilterProps {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
}

const Payment = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const data = useAppSelector((state) => state.finance.paymentFinance.data);
  const total = useAppSelector((state) => state.finance.paymentFinance.total);
  const between = useAppSelector(
    (state) => state.finance.paymentFinance.between
  );
  const header = useAppSelector((state) => state.finance.paymentFinance.header);

  const companyId = localStorage.getItem("companyId");

  const intialFilter = {
    companyId: companyId,
    page: 1,
    perPage: width > 600 && width <= 1000 ? 10 : 5,
    dateFrom: "",
    dateTo: "",
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response, columns, listmobile, listdesktop } = usePayment({
    filterValues: filterValues,
  });

  const handlechangePage = (e: any) => {
    setFilterValues({ ...filterValues, page: e });
  };

  const contentTable = () => {
    if (response.isLoading || response.isFetching) {
      return <Spinner />;
    } else {
      if (data.length === 0) {
        return (
          <WrapDef>
            <Img src={financeCashierDef} alt="finance" />
            <TitleDef>{t("therewillbeahistoryofpayplace")}</TitleDef>
          </WrapDef>
        );
      } else {
        if (width > 600) {
          return <Table columns={columns} data={listdesktop} />;
        } else {
          return (
            <MobileTable
              data={{
                title: t("amountofpurchase"),
                info: listmobile,
              }}
              headertitle={t("p2p")}
            />
          );
        }
      }
    }
  };

  const headerContent = useMemo(() => {
    return header.map((v: any) => {
      return (
        <WrapTotalSum>
          <Label>{v.title}</Label>
          <TotalSum>
            {numberWithNew({
              number: +v.value,
              defaultValue: 0,
            })}
          </TotalSum>
        </WrapTotalSum>
      );
    });
  }, [header]);

  const headerContentMobile = () => {
    if (width <= 1000) {
      return (
        <WrapTotal>
          <WrapTotalSum>
            <MoneyIcon />
            <WrapSum>
              <Label>{header[0]?.title || t("totalpaidbyUZS")}</Label>
              <TotalSum>
                {numberWithNew({ number: header[0]?.value, defaultValue: 0 })}
              </TotalSum>
            </WrapSum>
          </WrapTotalSum>
          <WrapTotalSum>
            <DiscountIcon />
            <WrapSum>
              <Label>{header[1]?.title || t("DISCommission")}</Label>
              <TotalSum>
                {numberWithNew({ number: header[1]?.value, defaultValue: 0 })}
              </TotalSum>
            </WrapSum>
          </WrapTotalSum>
        </WrapTotal>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <RightHeader>
        <WrapTotal>{headerContent}</WrapTotal>
      </RightHeader>
      <Container>
        <DatePcker
          onChange={(e: any) => {
            setFilterValues({
              ...filterValues,
              page: 1,
              dateFrom: e.slice(0, e.indexOf(" ~")),
              dateTo: e.slice(e.indexOf("~ ") + 2),
            });
          }}
        />
        {headerContentMobile()}
        {contentTable()}
        {data.length === 0 ? null : (
          <WrapPag>
            <Info>
              {t("shown")}
              <span>{between}</span>
              {t("from1")} <span>{total.pages}</span>
              {countPagination({
                count: Number(total.pages),
                firstWord: t("operations1"),
                secondWord: t("operations23"),
              })}
            </Info>
            {!response.isFetching && (
              <NewPagination
                onChange={handlechangePage}
                currentPage={Number(filterValues.page)}
                totalCount={Number(total?.count)}
              />
            )}
          </WrapPag>
        )}
      </Container>
    </>
  );
};

export default Payment;
