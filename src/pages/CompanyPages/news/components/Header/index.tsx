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

const [filterValues, setFilterValues] =
useState<intialFilterProps>(intialFilter);
//  const {response}=useArchive({filterValues:filterValues});
  useEffect(() => {
    if (location.pathname !== "/news") {
      dispatch(setSelectedNews([]));
    }
  }, [dispatch(setSelectedNews([]))]);
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  return (
    <Container>
      {width >600 ? <Flex
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

      
    </Flex>:
     <MobileFlex
   
   >
     <TopMobile>
     {/* <div style={{ width: "20px" }} /> */}
     <Input
       inputStyle={{ border: "none",  height: { desktop: 50,mobile:36 } }}
       IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
       value={query}
       placeholder="Поиск по новостям"
       onChange={(e) => dispatch(setQuery(e.target.value))}
       width={{ maxwidth: 500,minwidth:160 }}
     />
       <div style={{ width: "20px" }} />
     <Button
       onClick={handleOpenNews}
       padding={ {mobile :'0px 10px'}}
       buttonStyle={{
          
         bgcolor: "#FFFFFF",
         color: "#223367",
         weight: 500,
         height: { desktop: 50 ,mobile:36},
       }}
       margin={{
         desktop: "0 25px 0 0",
         laptop: "0 25px 0 0",
         planshet: "0 0 20px 0",
         mobile:"0px 5px 0px 5px"
       }}
       startIcon={<AddIcon />}
     >
       {t("Создать")}
     </Button>
 
    </TopMobile>
    
   
    {/* {location.pathname === "/news/active" && <FilterActiveNews/> } 
    {location.pathname==="/news/archive" && <FilterArchiveNews/>} */}

 
   </MobileFlex>}
    
    </Container>
  );
};

export default Header;
