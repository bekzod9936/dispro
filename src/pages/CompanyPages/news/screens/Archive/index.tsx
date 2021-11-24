import { useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "components/Custom/Spinner";
import Table from "../../components/Table";
import NoNews from "../../components/NoNews";
import { setQuery, setSelectedNews } from "services/redux/Slices/news";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import { SideBar } from "../../components/SideBar";
import { NewsBar } from "../../components/NewsBar";
import { Container, Wrap,Info,WrapPag,WrapSpinner } from "./style";
import useData from "../useData";
import useArchive from "./useArchive";
import Pagination from "components/Custom/Pagination";
import MobileTable from "../../components/MobileTable";
import useWindowWidth from 'services/hooks/useWindowWidth';
import { Flex } from "../../style";
import { AddIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import { SearchIcon } from "components/Layout/Header/style";
import DatePcker from "components/Custom/DatePicker";
import Input from "components/Custom/Input";
import Button from "components/Custom/Button";
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

  const newsById = selectedNews?.fullData;
  return (
    <Container>
      <Flex
      width="95%"
      justifyContent="flex-start"
      alignItems="center"
      margin="0"
    >
      {/* Settings side  */}
      <Button
        onClick={handleOpenNews}
        buttonStyle={{
          bgcolor: "#FFFFFF",
          color: "#223367",
          weight: 500,
          height: { desktop: 50 },
        }}
        margin={{
          desktop: "0 25px 0 0",
          laptop: "0 25px 0 0",
          planshet: "0 0 20px 0",
        }}
        startIcon={<AddIcon />}
      >
        {t("Создать новость")}
      </Button>

      <div style={{ width: "20px" }} />
      <Input
        inputStyle={{ border: "none", height: { desktop: 50 } }}
        IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
        value={query}
        placeholder="Поиск по новостям"
        onChange={(e) => dispatch(setQuery(e.target.value))}
        width={{ maxwidth: 500 }}
      />
      <div style={{ width: "20px" }} />
    <DatePcker
          onChange={async (e: any) => {
           
            await setFilterValues({
              ...filterValues,
              fromDate: e.slice(0, e.indexOf(' ~')),
              toDate: e.slice(e.indexOf('~ ') + 2),
            });
          await response.refetch();
         
          }}
        />
      
    </Flex>
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
                  {t("from1")} <span>{totalNewsCount}</span> {t("новостей")}
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
      </Wrap>:
      <Wrap>
          {response.isLoading || response.isFetching ? (
          <WrapSpinner><Spinner/></WrapSpinner>

        )
         : 
         (
          <>
            {data.length > 0 ? (
              <MobileTable  refetch={response}  data={list} />
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
                  {t("from1")} <span>{totalNewsCount}</span> {t("новостей")}
                </Info>
                <Pagination
                  page={filterValues.page}
                  count={totalCount}
                  onChange={handlechangePage}
                  disabled={response.isLoading || response.isFetching}
                  siblingCount={width<=600 ? 0 : 4}
                />
              </WrapPag>
            ) : null}
          </>
        )
        }
        </Wrap>}
    </Container>
  );
};

export default Archive;
