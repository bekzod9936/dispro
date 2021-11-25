import React, {useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

import DatePcker from "components/Custom/DatePicker";

import useActive from "../../../screens/Active/useActive";


const FilterActiveNews = () => {
  
   interface intialFilterProps {
    dateFrom?: string;
    dateTo?: string;
    page?:number;
    perPage?:number;
  }
  const intialFilter = {
    page: 1,
    perPage: 5,
    dateFrom: '',
    dateTo: '',
  };

   const [filterValues,setFilterValues]=
   useState<intialFilterProps>(intialFilter);
  //  const {response } =useActive({ filterValues });
  return (
      <div>hi</div>
      )}
export default FilterActiveNews;
