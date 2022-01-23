import FilterReview from "../../components/FilterReview";
import { useState } from "react";
import { useAppSelector } from "services/redux/hooks";
import { useTranslation } from "react-i18next";
import { formatPagination } from "../../utils";
import feedDef from "assets/images/feedback.png";
import User from "../../components/User";
import Spinner from "components/Custom/Spinner";
import useFeedBack from "../../hooks/useFeedBack";
import { NewPagination } from "components/Custom/NewPagination";
import useWindowWidth from "services/hooks/useWindowWidth";
import Stars from "../../components/Stars";
import { useDebounce } from "use-debounce/lib";
import {
  WrapPag,
  Info,
  Content,
  Img,
  WrapDefPhoto,
  NoResult,
  Container,
  Mas,
} from "./style";

interface intialFilterProps {
  page?: number;
  cashierIds?: number | string;
  perPage?: number;
  rating?: number | string;
  key?: string | number;
  storeIds?: string | number;
}

const Reviews = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const intialFilter = {
    page: 1,
    cashierIds: "",
    perPage: 6,
    rating: "",
    key: "",
    storeIds: "",
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const [inpuSearch, setInpuSearch] = useState<string>("");
  const [debouncedQuery] = useDebounce(inpuSearch, 300);

  const clients: any = useAppSelector((state) => state.feedbackPost.clients);

  const { resClients, totalCount, between } = useFeedBack({
    filterValues,
    key: debouncedQuery,
  });

  const handleSearch = (e: any) => {
    setFilterValues({ ...filterValues, page: 1 });
    setInpuSearch(e.target.value);
  };

  const handleChangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await resClients.refetch();
  };

  return (
    <Container>
      <FilterReview
        setFilterValues={setFilterValues}
        filterValues={filterValues}
        refetch={() => resClients.refetch()}
        handleSearch={handleSearch}
        inpuSearch={inpuSearch}
      />
      {resClients.isLoading || resClients.isFetching ? (
        <Spinner />
      ) : clients.length === 0 ? (
        <WrapDefPhoto>
          <Img src={feedDef} alt="feedback" />
          <span>
            {inpuSearch === "" ? t("feeddef") : t("notfoundsearchsetting")}
          </span>
        </WrapDefPhoto>
      ) : (
        <>
          {width > 600 ? null : <Stars />}
          <Content>
            <Mas>
              {clients.length === 0 ? (
                <NoResult>{t("noresult")}</NoResult>
              ) : (
                clients?.map((v: any) => <User value={v} />)
              )}
            </Mas>
            {clients.length > 0 ? (
              <WrapPag>
                <Info>
                  {t("shown")}
                  <span>{between}</span>
                  {t("from1")} <span>{totalCount}</span>
                  {formatPagination({
                    count: totalCount,
                    firstWord: t("review1"),
                    secondWord: t("review23"),
                  })}
                </Info>
                <NewPagination
                  onChange={handleChangePage}
                  currentPage={Number(filterValues.page)}
                  totalCount={Math.ceil(totalCount / intialFilter?.perPage)}
                />
              </WrapPag>
            ) : null}
          </Content>
        </>
      )}
    </Container>
  );
};

export default Reviews;
