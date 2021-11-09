import { useState } from "react";
import { useQuery } from "react-query";
import { fetchActiveQueries } from "services/queries/newPageQuery";

interface Props {
  title: string;
  text: string;
  gender: string;
  date: string;
}

interface FProps {
  total: number;
  page: number;
  perPage: number;
}
interface VProps {
  Values: any;
}
interface HProps {
  title?: string;
  value?: number;
}
interface PProps {
  total: number;
  page: number;
  perPage: number;
}

const useActive = () => {
  const [data, setData] = useState<Props[]>([
    {
      title: "",
      text: "",
      gender: "",
      date: "",
    },
  ]);

  const [total, setTotal] = useState<number>(0);
  function format({ page, perPage }: PProps) {
    let start = 1;
    let end = 1;
    if (page === 1) {
      start = 1;
      end = perPage;
    } else {
      start = (page - 1) * perPage + 1;
      end = page * perPage;
    }
    let info = `${start}-${end}`;

    return info;
  }

  const [between, setBetween] = useState<string>("");

  const response = useQuery("ActiveNews", fetchActiveQueries, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      console.log("data", data.data.data);
      setData(data.data.data.news);
    },
  });
  return { response, data };
};

export default useActive;
