import React, {useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {Container} from './style';
import { useTranslation } from "react-i18next";
import { IProps } from "./types";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";

import { setQuery, setSelectedNews} from "services/redux/Slices/news";

import useWindowWidth from "services/hooks/useWindowWidth";

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

  useEffect(()=>{
    if (location.pathname !== "/news/active") {
    dispatch(setQuery(""));
    }
    if (location.pathname !== "/news/waiting") {
      dispatch(setQuery(""));
      }
      if (location.pathname !== "/news/archive") {
        dispatch(setQuery(""));
        }
  },[])

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
