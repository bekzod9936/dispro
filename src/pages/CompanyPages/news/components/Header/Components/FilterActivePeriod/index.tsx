import React, {useState, useEffect } from "react";

import DatePcker from "components/Custom/DatePicker";

import useActive from "../../../../screens/Active/useActive";


const FilterActiveNews = () => {
  
   interface intialFilterProps {
    fromDate?: string;
    toDate?: string;
    page?:number;
    perPage?:number;
  }
  const intialFilter = {
    page: 1,
    perPage: 5,
    fromDate: '',
    toDate: '',
  };

   const [filterValues,setFilterValues]=
   useState<intialFilterProps>(intialFilter);
   const {response } =useActive({ filterValues });
   return (
        <DatePcker
          onChange={async (e: any) => {
            await  setFilterValues({
              ...filterValues, 
              fromDate: e.slice(0, e.indexOf(' ~')),
              toDate: e.slice(e.indexOf('~ ') + 2),
            });
            response.refetch();
          }}
        />
      )}
export default FilterActiveNews;
