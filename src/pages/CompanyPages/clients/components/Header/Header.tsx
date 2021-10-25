import { ButtonsWrapper, Flex, SubTitle } from "../../style/style";
import Title from "components/Custom/Title";
import Input from "components/Custom/Input";
import { QRButton } from "./components/QRButton";
import { useTranslation } from "react-i18next";
import { MFilter } from "./components/Filter";
import NewDatePicker from "components/Custom/DatePicker";
import { SearchIcon } from "components/Layout/Header/style";
import { SelectedFilter, SelectedFilters, Wrapper } from "./style";
import { RemoveFilterBtn } from "./components/RemoveFilterBtn";
import React from "react";
import { getSelected } from "../../utils/getSelectedFilters";
import { ActionType, ActionTypes, IFilters } from "../../utils/reducerTypes";

interface IProps {
  totalCount: number;
  query: string;
  setQuery: any;
  dispatch: (arg: ActionType) => void;
  setOpenBar: any;
  filters: IFilters;
  refetch: any;
  isFiltersVisible: boolean;
}

export const Header = ({
  isFiltersVisible,
  filters,
  refetch,
  totalCount,
  setQuery,
  query,
  dispatch,
  setOpenBar,
}: IProps) => {
  const { t } = useTranslation();
  const [sFilters, setSFilters] = React.useState<any>({});

  const handlePickDate = (date: string) => {
    const [startDate, endDate] = date.split(" ~ ");
    dispatch({ type: ActionTypes.SET_PERIOD, payload: { startDate, endDate } });
  };

  const handleRemoveFilter = (payload: any) => {
    console.log(payload);

    if (Object.keys(sFilters).length <= 1) {
      dispatch({ type: ActionTypes.SET_VISIBLE_FILTERS, payload: false });
    }
    dispatch({ type: ActionTypes.REMOVE_FILTER, payload });
    refetch();
  };

  React.useEffect(() => {
    setSFilters(getSelected(filters));
  }, [filters]);

  return (
    <Wrapper>
      <Flex>
        <Title>{t("clients")}</Title>
        <SubTitle>{`${t("totalClients")}: ${totalCount}`}</SubTitle>
      </Flex>
      <Input
        inputStyle={{ border: "none" }}
        IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        width={{ maxwidth: 700 }}
      />
      <ButtonsWrapper marginBottom={20} marginTop={20}>
        <MFilter
          refetch={refetch}
          initialFilters={filters}
          dispatch={dispatch}
        />
        <NewDatePicker onChange={(e) => handlePickDate(e)} />
        <QRButton setOpenBar={setOpenBar} />
      </ButtonsWrapper>
      <SelectedFilters>
        {isFiltersVisible &&
          Object.keys(sFilters).map((key: string) => {
            if (typeof sFilters[key] === "string") {
              return (
                <SelectedFilter>
                  <p>
                    {t(key)}:{" "}
                    {isNaN(sFilters[key]) ? t(sFilters[key]) : sFilters[key]}
                  </p>
                  <RemoveFilterBtn onClick={() => handleRemoveFilter(key)} />
                </SelectedFilter>
              );
            } else {
              return (
                <SelectedFilter>
                  {Object.keys(sFilters[key]).map(
                    (el: string | any | number) => {
                      return (
                        <p>
                          {t(el)}: {sFilters[key][el]}
                        </p>
                      );
                    }
                  )}
                  <RemoveFilterBtn onClick={() => handleRemoveFilter(key)} />
                </SelectedFilter>
              );
            }
          })}
      </SelectedFilters>
    </Wrapper>
  );
};
