import { Flex } from "../../style";
import Button from "components/Custom/Button";
import { AddIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import Input from "components/Custom/Input";
import DatePcker from "components/Custom/DatePicker";
import { SearchIcon } from "components/Layout/Header/style";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "services/redux/hooks";
import { AddMobileIcon } from "assets/icons/news/newsIcons";
interface FilterNews {
  handleOpenNews: () => void;
  searchNews: (e: any) => void;
  filterByDate?: (e: any) => void;
}

export const WaitingFilterNews = ({
  handleOpenNews,
  searchNews,
  filterByDate,
}: FilterNews) => {
  const { t } = useTranslation();
  const query = useAppSelector((state) => state.news.query);
  return (
    <Flex width="100%" justifyContent="center" alignItems="center" margin="0">
      <Input
        inputStyle={{ border: "none", height: { desktop: 50, mobile: 36 } }}
        IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
        value={query}
        placeholder="Поиск "
        onChange={(e) => searchNews(e)}
        width={{ maxwidth: 500 }}
      />

      <Button
        onClick={handleOpenNews}
        buttonStyle={{
          bgcolor: "#FFFFFF",
          color: "#223367",
          weight: 500,
          height: { desktop: 50, mobile: 36 },
        }}
        margin={{
          desktop: "0 25px 0 0",
          laptop: "0 25px 0 0",
          planshet: "0 0 20px 0",
          mobile: "0 0 0 13px",
        }}
        startIcon={<AddMobileIcon />}
      >
        {t("create ")}
      </Button>
      {filterByDate && (
        <DatePcker
          onChange={async (e: any) => {
            filterByDate(e);
          }}
        />
      )}
    </Flex>
  );
};
