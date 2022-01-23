import { useState } from "react";
import { useTranslation } from "react-i18next";
import useSuggestion from "./useSuggestions";
import Spinner from "components/Custom/Spinner";
import Table from "../../components/Table";
import { Container } from "./style";
import DatePcker from "components/Custom/DatePicker";
import { useAppSelector } from "services/redux/hooks";
import { countPagination } from "services/utils";
import useWindowWidth from "services/hooks/useWindowWidth";
import MobileTable from "../../components/MobileTable";
import { NewPagination } from "components/Custom/NewPagination";
import financeCashierDef from "../../../../../assets/images/financeCashierDef.png";
import { Info, WrapPag, Img, WrapDef, TitleDef } from "../../style";

interface intialFilterProps {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
}

const Suggestions = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const companyId = localStorage.getItem("companyId");
  const data = useAppSelector((state) => state.finance.suggestionFinance.data);
  const total = useAppSelector(
    (state) => state.finance.suggestionFinance.total
  );
  const between = useAppSelector(
    (state) => state.finance.suggestionFinance.between
  );

  const intialFilter = {
    companyId: companyId,
    page: 1,
    perPage: width > 600 && width <= 1000 ? 10 : 5,
    dateFrom: "",
    dateTo: "",
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response, listdesktop, columns, listmobile } = useSuggestion({
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
            <TitleDef>{t("therewillbeahistoryofsuggestions")}</TitleDef>
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
              headertitle={t("proposals")}
            />
          );
        }
      }
    }
  };

  return (
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
        margin="0 0 10px 0"
        maxDate={new Date()}
      />
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
  );
};

export default Suggestions;
