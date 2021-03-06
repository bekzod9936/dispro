import NavBar from "components/Custom/NavBar";
import Title from "components/Custom/Title";
import Spinner from "components/Custom/Spinner";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import { useAppDispatch } from "services/redux/hooks";
import { setQuery } from "services/redux/Slices/news";
import useNewsRoute from "./routes";
import Header from "./components/Header";
import useWindowWidth from "services/hooks/useWindowWidth";
import { MainWrapper, Flex, WrapHeader, LeftHeader, Wrap } from "./style";


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

 

  return (
    <MainWrapper id="drawer-container">
      <Wrap>
        {location.pathname !== "/news/create" &&
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
                        <Title padding={{ planshet: "0 0 0 0px" }}>
                          {t("News")}
                        </Title>
                        {width > 600 && width <= 1000 ? (
                          <Flex
                            width="100%"
                            height="70px"
                            alignItems="flex-start"
                            margin="0"
                          >
                            <NavBar
                              list={newsPath}
                              padding="0 15px 0 0"
                              margin="10px 0"
                            />
                          </Flex>
                        ) : (
                          <Flex
                            width="100%"
                            height="75px"
                            alignItems="flex-start"
                            margin="0"
                          >
                            <NavBar
                              list={newsPath}
                              padding="0 15px 0 0"
                              margin="10px 0"
                            />
                          </Flex>
                        )}
                      </>
                    </LeftHeader>
                  </WrapHeader>
                  <Header handleOpenNews={handleOpenNews} />
                </div>
              ) : (
                <div>
                  <Title padding={{ mobile: "13px 15px 5px 15px" }}>
                    {t("News")}
                  </Title>
                  <Header handleOpenNews={handleOpenNews} />
                  <WrapHeader>
                    <LeftHeader>
                      <>
                        <Flex
                          width="100%"
                          height="50px"
                          alignItems="flex-start"
                          margin="0"
                        >
                          <NavBar
                            list={newsPath}
                            padding="0 10px 0 5px"
                            margin="0px 0"
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
            <Route path="*">
              <Redirect to={menuItems[0].path} />
            </Route>
          </Suspense>
        </Switch>
      </Wrap>
    </MainWrapper>
  );
};

export default News;
