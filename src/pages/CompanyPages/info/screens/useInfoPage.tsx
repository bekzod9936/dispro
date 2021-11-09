import { useState } from "react";
import { useQuery } from "react-query";
import { fetchInfo } from "services/queries/partnerQuery";

interface Props {
  annotation?: string;
  categories?: number[];
  companyNewsLimitCount?: number;
  currencyId?: number;
  description?: string;
  disCommission?: number;
  email?: string;
  filled?: boolean;
  filledAddress?: boolean;
  hasCoupon?: boolean;
  id?: number;
  images?: string[];
  isHalol?: boolean;
  keyWords?: string;
  links?: [];
  logo?: string;
  merchantFields?: string;
  socialLinks?: { name?: string; value?: string }[];
  staffId?: number;
  status?: number;
  telNumber?: number;
  type?: number;
  workingTime?: {
    aroundTheClock?: boolean;
    work?: {
      day: number;
      dayOff: boolean;
      wHours: { from?: string; to?: string };
      bHours: { from?: string; to?: string };
    }[];
  } | null;
  name?: string;
}

const useInfoPage = () => {
  const [data, setData] = useState<Props>({ categories: [] });

  const response = useQuery(
    "fetchInfoCompanyid123",
    () => {
      return fetchInfo(localStorage.getItem("companyId"));
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setData(data.data.data);
      },
    }
  );

  return { response, data };
};

export default useInfoPage;
