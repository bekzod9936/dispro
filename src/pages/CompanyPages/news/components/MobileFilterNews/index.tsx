import { Flex } from "../../style";
import Button from "components/Custom/Button";
import { AddMobileIcon } from "assets/icons/news/newsIcons";
import Input from "components/Custom/Input";
import DatePcker from "components/Custom/DatePicker";
import { SearchIcon } from "components/Layout/Header/style";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "services/redux/hooks";
import useWindowWidth from "services/hooks/useWindowWidth";
interface FilterNews {
  handleOpenNews: () => void;
  searchNews: (e: any) => void;
  filterByDate?: (e: any) => void;
}

export const MobileFilterNews = ({
  handleOpenNews,
  searchNews,
  filterByDate,
}: FilterNews) => {
  const { width } = useWindowWidth();
  const { t } = useTranslation();
  const query = useAppSelector((state) => state.news.query);
  return (
    <>
      {width > 360 ? (
        <Flex
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
          margin="0"
        >
           <div style={{width:"100%",display:'flex'}}>
        <div>
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
                mobile: "0 20px 0px 0px",
              }}
              startIcon={<AddMobileIcon />}
            >
              {t("Создать ")}
            </Button>
            </div>
            {filterByDate && (
              <DatePcker
                onChange={async (e: any) => {
                  filterByDate(e);
                }}
              />
            )}
  </div>
          <Flex
            width="100%"
            justifyContent="center"
            alignItems="center"
            margin="13px 0px 0px 0px"
          >
            <Input
              inputStyle={{
                border: "none",
                height: { desktop: 50, mobile: 36 },
              }}
              margin={{
                mobile: "0 10px 0 0px",
              }}
              IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
              value={query}
              placeholder="Поиск "
              onChange={(e) => searchNews(e)}
              width={{ maxwidth: 500 }}
            />
          </Flex>
        </Flex>
      ) : (
        <Flex
          width="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          margin="0"
        >
          <Flex width="100%" justifyContent="center" alignItems="center">
            <Input
              inputStyle={{
                border: "none",
                height: { desktop: 50, mobile: 36 },
              }}
              margin={{
                mobile: "0 10px 0 0px",
              }}
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
                mobile: "0 10px 0 0",
              }}
              startIcon={<AddMobileIcon />}
            >
              {t("Создать ")}
            </Button>
          </Flex>
          <Flex
            width="100%"
            justifyContent="flex-start"
            alignItems="center"
            margin="13px 0px 0px 0px"
          >
            {filterByDate && (
              <DatePcker
                onChange={async (e: any) => {
                  filterByDate(e);
                }}
              />
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};
