import { useMemo, useState,useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AddIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import Spinner from "components/Custom/Spinner";
import Table from "../../components/Table";
import { Flex } from "../../style";
import { SearchIcon } from "components/Layout/Header/style";
import MobileTable from "../../components/MobileTable";
import NoNews from "../../components/NoNews";
import { NewsBar } from "../../components/NewsBar";
import {setPage,setPerPage, setFromDate,
  setToDate,} from "services/redux/Slices/news";
import Input from "components/Custom/Input";
import DatePcker from "components/Custom/DatePicker";
import { setQuery, setSelectedNews,setErrorMessage } from "services/redux/Slices/news";
import { SideBar } from "../../components/SideBar";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import useData from "../useData";
import useWindowWidth from 'services/hooks/useWindowWidth';
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { CloseIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { SaveIcon } from "assets/icons/news/newsIcons";
import { MobileCancelIcon } from "assets/icons/proposals/ProposalsIcons";

import {
  Container,
  Wrap,
  TitleData,
  AgeData,
  Info,
  WrapPag,
  DefaultImage,
  WrapSpinner,
  WrapperModal,
  CloseButton,
  Buttons,
} from "./style";

import useActive from "./useActive";
import Pagination from "components/Custom/Pagination";


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
  const query = useAppSelector((state) => state.news.query);
  const errormessage=useAppSelector((state)=>state.news.errorMessage)
  const page=useAppSelector((state)=>state.news.setPeriod.page);
  // const [error,setError]=useState<any>(errormessage);
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

  const intialFilter = {
    page:1,
    perPage: 5,
    fromDate: '',
    toDate: '',
  };


  const { width } = useWindowWidth();
  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response } = useActive({filterValues:filterValues});
  const {list}=useData()
  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };
  const onClose = () => {
    dispatch(setSelectedNews(""));
  };

  console.log('list',list)
  const newsById = selectedNews?.fullData;

  const handleOpenNews = () => {
    history.push({
      pathname: "/news/create",
      state: { prevPage: location.pathname },
    });
    dispatch(setQuery(""));
  };
  console.log('errormessage',errormessage)

  const LinkComment=()=>{
    dispatch(setErrorMessage(false))
    history.push('/support')
  
  }
  const CancelError=()=>{

    dispatch(setErrorMessage(false));
  }

  
  return (
    <Container>
      <Modal modalStyle={{ bgcolor: "#fff" }} open={errormessage}>
        <WrapperModal>
          {width > 600 &&  
        <CloseButton onClick={() => dispatch(setErrorMessage(false))}>
        <CloseIcon />
      </CloseButton>}
    
      <h3 >
      Лимит новостей исчерпан
      </h3>
          <p>
           Для более подробной информации, просим обратиться к Модератору
          </p>
          {width > 600 ? (
            <>
              <Button
                buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
                margin={{ laptop: "0 22px 0 0" }}
                onClick={LinkComment}
                startIcon={<CancelIcon />}
              >
                Написать
              </Button>
              <Button
              
                margin={{ laptop: "0 22px 0 0" }}
                onClick={CancelError}
                startIcon={<SaveIcon />}
              >
                Ok
              </Button>
            </>
          ) : (
            <Buttons>
              <div className="upside">
                <Button
                        onClick={LinkComment}
                  endIcon={<MobileCancelIcon />}
                  buttonStyle={{
                    bgcolor: "rgba(96, 110, 234, 0.1)",
                    color: "#606EEA",
                  }}
                  margin={{ mobile: "0 8px 8px 0" }}
                >
                  {t("Написать")}
                </Button>
              </div>
              <Button
                onClick={CancelError}
                endIcon={<SaveIcon />}
                buttonStyle={{
                  bgcolor: "#606EEA",
                  color: "#fff",
                }}
                margin={{ mobile: "0px 8px  8px  0" }}
              >
                {"Ok"}
              </Button>
            </Buttons>
          )}
        </WrapperModal>
      </Modal>

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
            {data?.length > 0 ? (
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
                  siblingCount={width<=600 ? 0 : 4}
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
            {data?.length > 0 ? (
              <MobileTable refetch={response}  data={list} />
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

export default Active;
