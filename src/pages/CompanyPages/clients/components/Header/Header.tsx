import { ButtonsWrapper, Flex, SubTitle } from "../../style/style";
import Title from "components/Custom/Title";
import Input from "components/Custom/Input";
import { QRButton } from "./components/QRButton";
import { useTranslation } from "react-i18next";
import { MFilter } from "./components/Filter";
import NewDatePicker from "components/Custom/DatePicker";
import { SearchIcon } from "components/Layout/Header/style";
import { SelectedFilters, Wrapper } from "./style";
import { useHandleGetFilters } from "../../utils/getSelectedFilters";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { removeFilter, setPeriod } from "services/redux/Slices/clients";
import { useWindowSize } from "../../hooks/useWindowSize";

interface IProps {
  query: string;
  setQuery: any;
}

export const Header = ({ query, setQuery }: IProps) => {

  const { t } = useTranslation();
  const { totalCount, filters } = useAppSelector(state => state.clients);
  const activeFilters = useHandleGetFilters({ filters, handleRemove })
  const dispatch = useAppDispatch()
  const { width } = useWindowSize()
  function handleRemove(key: string) {
    dispatch(removeFilter(key))
  }

  const handlePickDate = (date: string) => {
    dispatch(setPeriod(date))
  };

  return (
    <Wrapper>
      <Flex>
        <Title>{t("clients")}</Title>
        <SubTitle>{`${t("totalClients")}: ${totalCount}`}</SubTitle>
      </Flex>
      <Input
        placeholder="Поиск по клиентам"
        inputStyle={{ border: "none" }}
        IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        width={{ maxwidth: 700 }}
      />
      <ButtonsWrapper marginBottom={20} marginTop={20}>
        <MFilter />
        {width > 600 && <NewDatePicker onChange={(e) => handlePickDate(e)} />}
        <QRButton />
      </ButtonsWrapper>
      <SelectedFilters>
        {activeFilters}
      </SelectedFilters>
    </Wrapper>
  );
};
