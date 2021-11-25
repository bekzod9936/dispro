import React, {useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AddIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";

import { SearchIcon } from "components/Layout/Header/style";
import Button from "components/Custom/Button";
import Input from "components/Custom/Input";
import { Flex } from "../../style";
import {Container,MobileFlex,TopMobile} from './style';
import { useTranslation } from "react-i18next";
import { IProps } from "./types";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import DatePcker from "components/Custom/DatePicker";
import { setQuery, setSelectedNews,setToDate,setFromDate } from "services/redux/Slices/news";
// import FilterActiveNews from './Components/FilterActivePeriod';
// import FilterArchiveNews from './Components/FilterArchivePeriod';
import useWindowWidth from "services/hooks/useWindowWidth";
import useActive from "../../screens/Active/useActive";
import useArchive from "../../screens/Archive/useArchive";
const Header = ({ handleOpenNews }: IProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.news.query);
  interface intialFilterProps {
    page?: number;
    perPage?: number;
    fromDate: any,
    toDate: any,
  }
  const intialFilter = {
    page: 1,
    perPage: 5,
    fromDate: '',
    toDate: '',
  };


  useEffect(() => {
    if (location.pathname !== "/news") {
      dispatch(setSelectedNews([]));
    }
  }, [dispatch(setSelectedNews([]))]);
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  return (
    <Container>
   
    
    </Container>
  );
};

export default Header;
