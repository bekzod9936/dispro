import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {Container} from './style';

import { IProps } from "./types";
import { useAppDispatch } from "services/redux/hooks";

import { setQuery, setSelectedNews} from "services/redux/Slices/news";

const Header = ({ handleOpenNews }: IProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();


  // useEffect(()=>{
  //   if (location.pathname !== "/news/active") {
  //   dispatch(setQuery(""));
  //   }
  //   if (location.pathname !== "/news/waiting") {
  //     dispatch(setQuery(""));
  //     }
  //     if (location.pathname !== "/news/archive") {
  //       dispatch(setQuery(""));
  //       }
  // },[dispatch(setQuery(""))])

  useEffect(() => {
    if (location.pathname !== "/news") {
      dispatch(setSelectedNews([]));
    }
  }, [dispatch(setSelectedNews([]))]);
 
  return (
    <Container>
    </Container>
  );
};

export default Header;
