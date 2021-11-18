import React, {useState, useEffect } from "react";

import DatePcker from "components/Custom/DatePicker";

import useArchive from "../../../../screens/Archive/useArchive";


const FilterArchiveNews = () => {
  
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
   const {response } =useArchive({ filterValues });
  return (
        <DatePcker
          onChange={async (e: any) => {
              setFilterValues({
              ...filterValues, 
              dateFrom: e.slice(0, e.indexOf(' ~')),
              dateTo: e.slice(e.indexOf('~ ') + 2),
            });
          await  response.refetch();
          }}
        />
      )}
export default FilterArchiveNews;
