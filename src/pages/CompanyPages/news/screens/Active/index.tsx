import { useMemo, useState } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "components/Custom/Spinner";
import Table from "../../components/Table";
import NoNews from "../../components/NoNews";
import { NewsBar } from "../../components/NewsBar";
import { setQuery, setSelectedNews } from "services/redux/Slices/news";
import { SideBar } from "../../components/SideBar";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import useData from "../useData";
import DatePcker from 'components/Custom/DatePicker';
import {
  Container,
  Wrap,
  TitleData,
  AgeData,
  Info,
  WrapPag,
  DefaultImage,
  WrapSpinner,
} from "./style";

import useActive from "./useActive";
import Pagination from "components/Custom/Pagination";

interface intialFilterProps {
  page?: number;
  perPage?: number;
    dateFrom?: string;
  dateTo?: string;
}

const Active = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const data = useAppSelector((state) => state.news.NewsInfo.data);
  const totalCount = useAppSelector((state) => state.news.NewsInfo.totalCount);
  const between = useAppSelector((state) => state.news.NewsInfo.between);
  const totalNewsCount = useAppSelector(
    (state) => state.news.NewsInfo.totalCountNews
  );
  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  console.log("selectedNews", selectedNews);
  const { t } = useTranslation();
  const handleOpenSetting = () => {
    history.push({
      pathname: "/news/create",
      state: { prevPage: location.pathname },
    });
    dispatch(setQuery(""));
  };
  const companyId = localStorage.getItem('companyId');
  const intialFilter = {
    // companyId: companyId,
    page: 1,
    perPage: 5,
    dateFrom: '',
    dateTo: '',
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response } = useActive({ filterValues: filterValues });
 const {list}=useData()
  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };
  console.log();
  const onClose = () => {
    dispatch(setSelectedNews(""));
  };
  
  const newsById = selectedNews?.fullData;

  return (
    <Container>
    
      <Wrap>
        {response.isLoading || response.isFetching ? (
          <WrapSpinner><Spinner/></WrapSpinner>
     
        ) : (
          <>
            {data.length > 0 ? (
              <Table  data={list} />
            ) : (
              <div style={{ paddingRight: "20%", paddingTop: "10%" }}>
                <NoNews handleOpenSetting={handleOpenSetting} />
              </div>
            )}
            <SideBar isOpen={newsById} maxWidth={"370px"}>
              {newsById && <NewsBar refetch={response} currentNews={newsById} onClose={onClose} />}
            </SideBar>
            {list.length > 0 ? (
              <WrapPag>
                <Info>
                  {t("shown")}
                  <span>{between}</span>
                  {t("from1")} <span>{totalNewsCount}</span> {t("news")}
                </Info>
                <Pagination
                  page={filterValues.page}
                  count={totalCount}
                  onChange={handlechangePage}
                  disabled={response.isLoading || response.isFetching}
                />
              </WrapPag>
            ) : null}
          </>
        )}
      </Wrap>
    </Container>
  );
};

export default Active;
