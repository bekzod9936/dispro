import {useEffect} from "react"
import { setSelectedNews } from "services/redux/Slices/news";
import NavBar from "components/Custom/NavBar";
import Title from "components/Custom/Title";
import Spinner from "components/Custom/Spinner";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "services/redux/hooks";
import { setQuery } from "services/redux/Slices/news";
import useNewsRoute from "./routes";
import Header from "./components/Header";
import useWindowWidth from "services/hooks/useWindowWidth";
import { MainWrapper, Flex, WrapHeader, LeftHeader, Wrap } from "./style";
import {MobileFilterNews} from "./components/MobileFilterNews";
import {WaitingFilterNews} from "./components/WaitingFilterNews";
const News = () => {
  const { t } = useTranslation();
  const { menuItems, newsPath } = useNewsRoute();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { width } = useWindowWidth();
  const history = useHistory();
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
  //   await setFilterValues({
  //     ...filterValues,
  //     fromDate: e.slice(0, e.indexOf(' ~')),
  //     toDate: e.slice(e.indexOf('~ ') + 2),
  //   });
  // await response.refetch();
  }

  return (
    <MainWrapper id="drawer-container">
      <Wrap>
        { location.pathname !== "/news/create" &&
          location.pathname !== "/news/detail" &&
          location.pathname !== "/news/repair" &&
          location.pathname !== "/news/showwaiting" &&
          location.pathname !== "/news/edit" &&
          location.pathname !== "/news/public" && (
            <div>
              {width > 600 ? (
                <div>
                  <WrapHeader>
                    <LeftHeader>
                      <>
                        <Title>{t("News")}</Title>
                        <Flex
                          width="100%"
                          height="85px"
                          alignItems="flex-start"
                          margin="0"
                        >
                          <NavBar
                            list={newsPath}
                            padding="0 15px 0 0"
                            margin="10px 0"
                          />
                        </Flex>
                      </>
                    </LeftHeader>
                  </WrapHeader>
                  <Header handleOpenNews={handleOpenNews} />
                </div>
              ) : (
                <div>
                  <Title padding={{ mobile: "13px 15px 13px 15px" }}>
                    {t("News")}
                  </Title>
                  { location.pathname === "/news/waiting" ? <WaitingFilterNews handleOpenNews={handleOpenNews} searchNews={searchNews} />: <MobileFilterNews handleOpenNews={handleOpenNews} searchNews={searchNews} filterByDate={filterByDate}/>}

                  <Header handleOpenNews={handleOpenNews} />
                  <WrapHeader>
                    <LeftHeader>
                      <>
                        <Flex
                          width="100%"
                          height="60px"
                          alignItems="flex-start"
                          margin="0"
                        >
                          <NavBar
                            list={newsPath}
                            padding="0 15px 0 0"
                            margin="10px 0"
                          />
                        </Flex>
                      </>
                    </LeftHeader>
                  </WrapHeader>
                </div>
              )}
            </div>
          )}
        <Switch>
          <Suspense fallback={<Spinner />}>
            {" "}
            {menuItems.map((item) => {
              return (
                <Route exact path={item.path} component={item.component} />
              );
            })}
          </Suspense>
        </Switch>
      </Wrap>
    </MainWrapper>
  );
};

export default News;
