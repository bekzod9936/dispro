import React, {useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AddIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";

import { SearchIcon } from "components/Layout/Header/style";
import Button from "components/Custom/Button";
import Input from "components/Custom/Input";
import { Flex } from "../../style";
import { useTranslation } from "react-i18next";
import { IProps } from "./types";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import DatePcker from "components/Custom/DatePicker";
import { setQuery, setSelectedNews } from "services/redux/Slices/news";
import FilterActiveNews from './Components/FilterActivePeriod';
import FilterArchiveNews from './Components/FilterArchivePeriod';

const Header = ({ handleOpenNews }: IProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.news.query);

  useEffect(() => {
    if (location.pathname !== "/news") {
      dispatch(setSelectedNews([]));
    }
  }, [dispatch(setSelectedNews([]))]);
  const { t } = useTranslation();

  return (
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
     {location.pathname === "/news" && <FilterActiveNews/> } 
     {location.pathname==="/news/archive" && <FilterArchiveNews/>}
  
    </Flex>
  );
};

export default Header;
