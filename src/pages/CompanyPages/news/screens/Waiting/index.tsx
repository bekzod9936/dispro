import { useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "components/Custom/Spinner";
import Table from "../../components/Table";
import NoNews from "../../components/NoNews";
import NoNewsMobile from "../../components/NoNewsMobile";
import MobileTable from "../../components/MobileTable";
import { SideBar } from "../../components/SideBar";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import { NewsBar } from "../../components/NewsBar";
import { Container, Wrap, Info, WrapPag, WrapSpinner } from "./style";
import useData from "../useData";
import useWaiting from "./useWaiting";

import { countPagination } from "../../components/utils";
import useWindowWidth from "services/hooks/useWindowWidth";
import {
  setQuery,
  setSelectedNews,
  setErrorMessage,
} from "services/redux/Slices/news";
import { LimitNews } from "../../components/LimitNews";

import { FilterNews } from "../../components/FilterNews";
import { WaitingFilterNews } from "../../components/WaitingFilterNews";

import { LaptopFilterNews } from "../../components/LaptopFilterNews";
import NoNewsLaptop from "../../components/NoNewsLaptop";

import { NewPagination } from 'components/Custom/NewPagination';

interface intialFilterProps {
  page?: number;
  perPage?: number;
  fromDate?: string;
  toDate?: string;
}

const Waiting = () => {
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
  const query = useAppSelector((state) => state.news.query);
  const { width } = useWindowWidth();

  const { t } = useTranslation();
  const handleOpenSetting = () => {
    history.push({
      pathname: "/news/create",
      state: { prevPage: location.pathname },
    });
    dispatch(setQuery(""));
  };

  const intialFilter = {
    page: 1,
    perPage: width>1000 || width<600 ?5:10,
    fromDate: "",
    toDate: "",
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);
    const [searchFilterValues, setSearchFilterValues] =
    useState<intialFilterProps>(intialFilter);
  const { response } = useWaiting({  filterValues: query ?searchFilterValues:filterValues,  });
  const { list } = useData();
  
  const errormessage = useAppSelector((state) => state.news.errorMessage);
  const newsById = selectedNews?.fullData;

  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };
  const handlechangePageSearch = async (e: any) => {
    await setSearchFilterValues({ ...searchFilterValues, page: e });
    await response.refetch();
  };
  const handleOpenNews = () => {
    history.push({
      pathname: "/news/create",
      state: { prevPage: location.pathname },
    });
    dispatch(setQuery(""));
  };
  const onClose = () => {
    dispatch(setSelectedNews(""));
  };

  const LinkComment = () => {
    dispatch(setErrorMessage(false));
    history.push("/support");
  };
  const ResetError = () => {
    dispatch(setErrorMessage(false));
  };

  const searchNews = (e: any) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <Container>
      <LimitNews
        errormessage={errormessage}
        linkToComment={LinkComment}
        CancelError={ResetError}
      />
      {width > 600 && width <= 1000 ? (
        <LaptopFilterNews
          handleOpenNews={handleOpenNews}
          searchNews={searchNews}
        />
      ) : (
        width > 1000 && (
          <FilterNews handleOpenNews={handleOpenNews} searchNews={searchNews} />
        )
      )}

      {width > 600 ? (
        <Wrap>
          {response.isLoading || response.isFetching ? (
            <WrapSpinner>
              <Spinner />
            </WrapSpinner>
          ) : (
            <>
              {data.length > 0 ? (
                <Table data={list} />
              ) : (
                <div>
                  {width > 1000 ? (
                    <div style={{ paddingRight: "20%", paddingTop: "5%" }}>
                      <NoNews handleOpenSetting={handleOpenSetting} />
                    </div>
                  ) : (
                    <div style={{ paddingRight: "10%", paddingTop: "20%" }}>
                      <NoNewsLaptop handleOpenSetting={handleOpenSetting} />
                    </div>
                  )}
                </div>
              )}
              <SideBar isOpen={newsById} maxWidth={"370px"}>
                {newsById && (
                  <NewsBar
                    refetch={response}
                    currentNews={newsById}
                    onClose={onClose}
                  />
                )}
              </SideBar>
              {list.length > 0 ? (
                <WrapPag>
                <Info>
                    {t("shown")}
                    <span>{ between}</span>
                    {t("from1")} <span>{totalNewsCount}</span>
                    {countPagination({
                      count: Number(totalNewsCount),
                      firstWord: t("newspaginationtitle"),
                      secondWord: t("newspaginationtitles"),
                    })}
                  </Info>
                     <NewPagination
                   onChange={query ? handlechangePageSearch:handlechangePage}
                   currentPage={Number(query ?searchFilterValues.page: filterValues.page)}
                   totalCount={Number(totalCount)}
            />
            
                </WrapPag>
              ) : null}
            </>
          )}
        </Wrap>
      ) : (
        <Wrap>
          <WaitingFilterNews
            handleOpenNews={handleOpenNews}
            searchNews={searchNews}
          />
          {response.isLoading || response.isFetching ? (
            <WrapSpinner>
              <Spinner />
            </WrapSpinner>
          ) : (
            <>
              {data.length > 0 ? (
                <MobileTable refetch={response} data={list} />
              ) : (
                <div style={{ paddingTop: "15%" }}>
                  <NoNewsMobile handleOpenSetting={handleOpenSetting} />
                </div>
              )}
              <SideBar isOpen={newsById} maxWidth={"370px"}>
                {newsById && (
                  <NewsBar
                    refetch={response}
                    currentNews={newsById}
                    onClose={onClose}
                  />
                )}
              </SideBar>
              {list.length > 0 ? (
                <WrapPag>
                <Info>
                    {t("shown")}
                    {<span>{ between}</span>}
                    { t("from1")} <span>{totalNewsCount}</span>
                    {countPagination({
                      count: Number(totalNewsCount),
                      firstWord: t("newspaginationtitle"),
                      secondWord: t("newspaginationtitles"),
                    })}
                  </Info>
                    <NewPagination
                         onChange={query ? handlechangePageSearch:handlechangePage}
                         currentPage={Number(query ?searchFilterValues.page: filterValues.page)}
                         totalCount={Number(totalCount)}
            />
                   
                  
                </WrapPag>
              ) : null}
            </>
          )}
        </Wrap>
      )}
    </Container>
  );
};

export default Waiting;
