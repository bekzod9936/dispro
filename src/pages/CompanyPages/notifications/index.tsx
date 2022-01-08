import Card from "./components/Card";
import { countPagination } from "./utils";
import Title from "components/Custom/Title";
import { useTranslation } from "react-i18next";
import Spinner from "components/Custom/Spinner";
import useNotefications from "./useNotefications";
import SideContent from "./components/SideContent";
import DefaultScreen from "./components/DefaultScreen";
import { NewPagination } from "components/Custom/NewPagination";
import { Container, WrapPag, Info, WrapperCard, Wrap } from "./style";

const Notifications = () => {
  const { t } = useTranslation();

  const {
    response,
    data,
    totalCount,
    between,
    pages,
    page,
    state,
    onClick,
    dispatchReducer,
    handleChangePage,
  } = useNotefications();

  const { info, open } = state;

  return (
    <Container>
      <Title padding={{ planshet: "0" }}>
        {t("notifications")} {t("from")} DIS-COUNT
      </Title>
      {response.isLoading || response.isFetching ? (
        <Spinner />
      ) : data.length > 0 ? (
        <Wrap>
          <WrapperCard>
            {data.map((v: any) => {
              return (
                <Card
                  key={v.id}
                  onClick={() => onClick({ value: v, open: true })}
                  value={v}
                  state={state}
                />
              );
            })}
          </WrapperCard>
          <WrapPag>
            <Info>
              {t("shown")}
              <span>{between}</span>
              {t("from1")} <span>{pages}</span>
              {countPagination({
                count: pages,
                firstWord: t("notification1"),
                secondWord: t("notification23"),
              })}
            </Info>
            <NewPagination
              onChange={handleChangePage}
              currentPage={Number(page)}
              totalCount={Number(totalCount)}
            />
          </WrapPag>
        </Wrap>
      ) : (
        <DefaultScreen />
      )}
      <SideContent
        onClick={() => onClick({ value: {}, open: false })}
        value={info}
        dispatchReducer={dispatchReducer}
        open={open}
      />
    </Container>
  );
};

export default Notifications;
