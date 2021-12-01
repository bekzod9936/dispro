import { useMemo, useState,useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "components/Custom/Spinner";
import Table from "../../components/Table";
import NoNews from "../../components/NoNews";
import NoNewsMobile from "../../components/NoNewsMobile";
import { setQuery, setSelectedNews } from "services/redux/Slices/news";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import { SideBar } from "../../components/SideBar";
import { NewsBar } from "../../components/NewsBar";
import { Container, Wrap,Info,WrapPag,WrapSpinner } from "./style";
import NavBar from "components/Custom/NavBar";
import { Flex } from "../../style";
import useData from "../useData";
import useArchive from "./useArchive";
import Pagination from "components/Custom/Pagination";
import MobileTable from "../../components/MobileTable";
import useWindowWidth from 'services/hooks/useWindowWidth';
import { FilterNews } from "../../components/FilterNews";
import { countPagination } from '../../components/utils';
import useNewsRoute from "../../routes";
import { LeftHeader, WrapMobile,WrapHeader } from "./style";
import {MobileFilterNews} from "../../components/MobileFilterNews";
interface intialFilterProps {
  page?: number;
  perPage?: number;
  fromDate?: string;
  toDate?: string;
}

const Archive = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const data = useAppSelector((state) => state.news.NewsInfo.data);
  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  const totalCount=useAppSelector((state)=>state.news.NewsInfo.totalCount);
  const between=useAppSelector((state)=>state.news.NewsInfo.between);
  const totalNewsCount=useAppSelector((state)=>state.news.NewsInfo.totalCountNews)
  console.log('totalNewsCount',totalNewsCount)
  const { newsPath } = useNewsRoute();
  const { t } = useTranslation();
  const handleOpenSetting = () => {
    history.push({
      pathname: "/news/create",
      state: { prevPage: location.pathname },
    });
    dispatch(setQuery(""));
  };
  const query = useAppSelector((state) => state.news.query);
  const intialFilter = {
    page: 1,
    perPage: 5,
    fromDate: '',
    toDate: '',
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);
  
  const { response } = useArchive({filterValues: filterValues});
  const {list}=useData();
  const { width } = useWindowWidth();
  const newsById = selectedNews?.fullData;
  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };
  const onClose = () => {
    dispatch(setSelectedNews(""));
  };
  
  const handleOpenNews = () => {
    history.push({
      pathname: "/news/create",
      state: { prevPage: location.pathname },
    });
    dispatch(setQuery(""));
  };
  const searchNews=(e:any)=>{
    dispatch(setQuery(e.target.value));
  }
  const filterByDate=async (e:any)=>{
    await setFilterValues({
      ...filterValues,
      fromDate: e.slice(0, e.indexOf(' ~')),
      toDate: e.slice(e.indexOf('~ ') + 2),
    });
  await response.refetch();
  }


  return (
    <Container>
         {width>600 && <FilterNews handleOpenNews={handleOpenNews} searchNews={searchNews} filterByDate={filterByDate}/>}
      {width>600 ? 
      <Wrap>
        {response.isLoading || response.isFetching ? (
          <WrapSpinner><Spinner/></WrapSpinner>

        ) : (
          <>
            {data.length > 0 ? (
              <Table  data={list} />
            ) : (
              <div style={{ paddingRight: "20%", paddingTop: "5%" }}>
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
                 {t("from1")} <span>{totalNewsCount}</span> 
                 {countPagination({
               count: totalNewsCount,
               firstWord: t('новости '),
               secondWord: t('новостей'),
             })}
               </Info>
               <Pagination
                 page={filterValues.page}
                 count={totalCount}
                 onChange={handlechangePage}
                 disabled={response.isLoading || response.isFetching}
                 siblingCount={0}
               />
             </WrapPag>
            ) : null}
          </>
        )}
      </Wrap>:
    <WrapMobile>
         <MobileFilterNews handleOpenNews={handleOpenNews} searchNews={searchNews} filterByDate={filterByDate}/> 
          {response.isLoading || response.isFetching ? (
          <WrapSpinner><Spinner/></WrapSpinner>

        )
         : 
         (
          <>
            {data.length > 0 ? (
              <MobileTable  refetch={response}  data={list} />
            ) : (
              <div style={{ paddingTop: "15%" }}>
              <NoNewsMobile handleOpenSetting={handleOpenSetting} />
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
            {t("from1")} <span>{totalNewsCount}</span> 
            {countPagination({
          count: totalNewsCount,
          firstWord: 'новости ',
          secondWord: 'новостей',
        })}
          </Info>
          <Pagination
            page={filterValues.page}
            count={totalCount}
            onChange={handlechangePage}
            disabled={response.isLoading || response.isFetching}
            siblingCount={0}
          />
        </WrapPag>
            ) : null}
          </>
        )
        }
        </WrapMobile>}
    </Container>
  );
};

export default Archive;
