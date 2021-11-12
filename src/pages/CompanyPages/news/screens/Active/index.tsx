import { useMemo, useState } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "components/Custom/Spinner";
import Table from "../../components/Table";
import NoNews from "../../components/NoNews";
import {NewsBar} from "../../components/NewsBar";
import {setQuery,setSelectedNews} from "services/redux/Slices/news";
import {SideBar} from "../../components/SideBar"
import { useAppSelector, useAppDispatch } from "services/redux/hooks";

import moment from "moment";
import { Container, Wrap, TitleData,AgeData,Info,WrapPag, DefaultImage } from "./style";
import {months} from './constants';
import useActive from "./useActive";
import Pagination from 'components/Custom/Pagination';

interface intialFilterProps {
  page?: number;
  perPage?: number;
 
}

const Active = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();   
  const history = useHistory();
  const data = useAppSelector((state) => state.news.NewsInfo.data);
  const totalCount=useAppSelector((state)=>state.news.NewsInfo.totalCount);
  const between=useAppSelector((state)=>state.news.NewsInfo.between);
  const totalNewsCount=useAppSelector((state)=>state.news.NewsInfo.totalCountNews)
  const selectedNews = useAppSelector(
    (state) => state.news.selectedNews
  );
  console.log('totalNewsCount',totalNewsCount)
  const { t } = useTranslation();
  const handleOpenSetting = () => {
    history.push({
      pathname: "/news/create",
      state: { prevPage: location.pathname },
    });
    dispatch(setQuery(''))
  };

  const intialFilter = {
    page: 1,
    perPage: 5,
    
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);
  

  const { response } = useActive({filterValues: filterValues});
 
  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };
  console.log()
 const onClose=()=>{
   dispatch(setSelectedNews(''))
 }
  const list = data?.map((v: any) => {
    const startDate = moment(v?.startLifeTime).format("YYYY-MM-DD");
    const endDate = moment(v?.endLifeTime).format("YYYY-MM-DD");
    const startdates = new Date(startDate); 
    const enddates=new Date(endDate);
    const startmonthName=months[startdates.getMonth()]
    const endmonthName=months[enddates.getMonth()]
    const startDays=startdates.getDate()
    const endDays=enddates.getDate()
    const years=enddates.getFullYear()

    const date=startDays+' '+startmonthName+' - '+endDays+' '+endmonthName+''+years
    
  
    const genderType =
      v?.genderType === 1
        ? "Мужчина"
        : v?.genderType === 2
        ? "Женщины"
        : "Для всех";
    let src = v?.image;
    return {
      col1: (
        <TitleData>
          {src ? <img src={src} /> : <DefaultImage />}
          {v?.title}
        </TitleData>
      ),
      col2: v?.description,
      col3: genderType,
      col4: <AgeData>{date}<h4>{v?.ageFrom+'+'}</h4></AgeData>,
      fullData:v,
    };
  });

  const columns: any = useMemo(
    () => [
      {
        Header: t("Заголовок"),
        accessor: "col1",
      },
      {
        Header: t("Зазывающий текст"),
        accessor: "col2",
      },
      {
        Header: t("Пол"),
        accessor: "col3",
      },
      {
        Header: t("Срок публикации"),
        accessor: "col4",
      },
    ],
    []
  );
 const newsById=selectedNews?.fullData;
 console.log('newsById',newsById)
  return (
    <Container>
      <Wrap>
        {response.isLoading || response.isFetching ? (
        
          <Spinner />
 
        ) : (
          <>
            {list.length > 0 ? (
            
                <Table columns={columns} data={list}  />
             
            ) : (
              <div style={{ paddingRight: "20%", paddingTop: "10%" }}>
                <NoNews handleOpenSetting={handleOpenSetting} />
              </div>
            )}
            <SideBar isOpen={newsById?.id}>
       {newsById?.id &&   <NewsBar
            currentNews={newsById}
                    onClose={onClose} />}
        
			</SideBar>
              {list.length > 0 ? (
        <WrapPag>
          <Info>
            {t('shown')}
            <span>{between}</span>
            {t('from1')} <span>{totalNewsCount}</span> {t('news')}
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
