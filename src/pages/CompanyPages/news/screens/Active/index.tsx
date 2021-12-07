import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AddIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import Spinner from "components/Custom/Spinner";
import Table from "../../components/Table";
import { Flex } from "../../style";
import NavBar from "components/Custom/NavBar";
import { SearchIcon } from "components/Layout/Header/style";
import MobileTable from "../../components/MobileTable";
import NoNews from "../../components/NoNews";
import { NewsBar } from "../../components/NewsBar";
import NoNewsMobile from "../../components/NoNewsMobile";
import Input from "components/Custom/Input";
import DatePcker from "components/Custom/DatePicker";
import {
  setQuery,
  setSelectedNews,
  setErrorMessage,
} from "services/redux/Slices/news";
import { SideBar } from "../../components/SideBar";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import useData from "../useData";
import useWindowWidth from "services/hooks/useWindowWidth";
import { countPagination } from "../../components/utils";
import Button from "components/Custom/Button";
import { LimitNews } from "../../components/LimitNews";
import { FilterNews } from "../../components/FilterNews";
import { LaptopFilterNews } from "../../components/LaptopFilterNews";
import { MobileFilterNews } from "../../components/MobileFilterNews";
import { LeftHeader, WrapMobile, WrapHeader } from "./style";
import { Container, Wrap, Info, WrapPag, WrapSpinner } from "./style";
import useNewsRoute from "../../routes";
import useActive from "./useActive";
import Pagination from "components/Custom/Pagination";
import { NewPagination } from 'components/Custom/NewPagination';
interface intialFilterProps {
  page?: number;
  perPage?: number;
  fromDate?: string;
  toDate?: string;
}

const Active = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const data = useAppSelector((state) => state.news.NewsInfo.data);

  const totalCount = useAppSelector((state) => state.news.NewsInfo.totalCount);
  const between = useAppSelector((state) => state.news.NewsInfo.between);

  const errormessage = useAppSelector((state) => state.news.errorMessage);

  const totalNewsCount = useAppSelector(
    (state) => state.news.NewsInfo.totalCountNews
  );
  console.log("totalNewsCount", totalNewsCount);
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

  const intialFilter = {
    page: 1,
    perPage: 5,
    fromDate: "",
    toDate: "",
  };

  const { width } = useWindowWidth();
  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response } = useActive({ filterValues: filterValues });

  const { list } = useData();
  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };
  const onClose = () => {
    dispatch(setSelectedNews(""));
  };

  const newsById = selectedNews?.fullData;

  const handleOpenNews = () => {
    history.push({
      pathname: "/news/create",
      state: { prevPage: location.pathname },
    });
    dispatch(setQuery(""));
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

  const filterByDate = async (e: any) => {
    await setFilterValues({
      ...filterValues,
      fromDate: e.slice(0, e.indexOf(" ~")),
      toDate: e.slice(e.indexOf("~ ") + 2),
    });
    await response.refetch();
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
          filterByDate={filterByDate}
        />
      ) : (
        width > 1000 && (
          <FilterNews
            handleOpenNews={handleOpenNews}
            searchNews={searchNews}
            filterByDate={filterByDate}
          />
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
              {data?.length > 0 ? (
                <Table data={list} />
              ) : (
                <div style={{ paddingRight: "20%", paddingTop: "5%" }}>
                  <NoNews handleOpenSetting={handleOpenSetting} />
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
                    <span>{between}</span>
                    {t("from1")} <span>{totalNewsCount}</span>
                    {countPagination({
                      count: Number(totalNewsCount),
                      firstWord: t("новости "),
                      secondWord: t("новостей"),
                    })}
                  </Info>
                  <NewPagination
              onChange={handlechangePage}
              currentPage={Number(filterValues.page)}
              totalCount={Number(totalCount)}
            />
               
                </WrapPag>
              ) : null}
            </>
          )}
        </Wrap>
      ) : (
        <Wrap>
          <MobileFilterNews
            handleOpenNews={handleOpenNews}
            searchNews={searchNews}
            filterByDate={filterByDate}
          />
          {response.isLoading || response.isFetching ? (
            <WrapSpinner>
              <Spinner />
            </WrapSpinner>
          ) : (
            width < 600 && (
              <>
                {data?.length > 0 ? (
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
                      <span>{between}</span>
                      {t("from1")} <span>{totalNewsCount}</span>
                      {countPagination({
                        count: Number(totalNewsCount),
                        firstWord: t("новости "),
                        secondWord: t("новостей"),
                      })}
                    </Info>

               <NewPagination
              onChange={handlechangePage}
              currentPage={Number(filterValues.page)}
              totalCount={Number(totalCount)}
            />
                  </WrapPag>
                ) : null}
              </>
            )
          )}
        </Wrap>
      )}
    </Container>
  );
};

export default Active;
