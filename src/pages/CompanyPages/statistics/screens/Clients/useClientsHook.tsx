import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import useWindowWidth from "services/hooks/useWindowWidth";
import { fetchCilentsData } from "services/queries/statisticsQuery";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { setClientStats } from "services/redux/Slices/statistics/statistics";
import {
  AgeIcon,
  CartIcon,
  CashBackIcon,
  CheckIcon,
  CouponIcon,
  DiscountIcon,
  ManIcon,
  WomanIcon,
  MoneyIcon,
  RatingIcon,
  ScoreIcon,
  SertificateIcon,
  UsersIcon,
  CalendarIcon,
  AgeMobIcon,
} from "../../style";
interface Props {
  filterValues?: any;
}

const useClientsHook = ({ filterValues }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { width } = useWindowWidth();
  const data = useAppSelector((state) => state.statistics.clientStats);
  const [status, setStatus] = useState<any[]>([]);
  const [usedLevel, setUsedLevel] = useState<any[]>([]);

  const response = useQuery(
    ["fetchClientsInfo", filterValues],
    () => {
      const url = Object.entries(filterValues)
        .map(([key, value]: any) => (value !== "" ? `${key}=${value}&` : ""))
        .join("");

      return fetchCilentsData({
        section: `clients?${url}`,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setClientStats(data.data.data));
        const level = data.data.data?.filter?.levels?.map((v: any) => {
          const check = usedLevel?.find((i: any) => {
            if (i?.name === v?.name) {
              return true;
            } else {
              return false;
            }
          });
          return {
            number: v.number,
            [v.name]: check?.[check?.name] ? check?.[check?.name] : false,
            label: v.name,
            name: v.name,
          };
        });
        setStatus(level);
      },
    }
  );

  const list = [
    {
      title: t("totalClients"),
      value: data?.clientCount,
      Icon: <UsersIcon />,
    },
    {
      title: t("maleCount"),
      value: data?.maleCount,
      Icon: <ManIcon />,
    },
    {
      title: t("femaleCount"),
      value: data?.femaleCount,
      Icon: <WomanIcon />,
    },
    {
      title: t("ageAvg"),
      value: data?.ageAvg,
      Icon: width > 1000 ? <AgeIcon /> : <AgeMobIcon />,
    },
    {
      title: t("uniqueChequeClient"),
      value: data?.uniqueChequeClient,
      Icon: <CalendarIcon />,
    },
    {
      title: t("chequeCount"),
      value: data?.chequeCount,
      Icon: <CartIcon />,
    },
    {
      title: t("paidWithMoney"),
      value: data?.paidWithMoney,
      Icon: <MoneyIcon />,
    },
    {
      title: t("paidWithPoint"),
      value: data?.paidWithPoint,
      Icon: <RatingIcon />,
    },
    {
      title: t("pointSum"),
      value: data?.pointSum,
      Icon: <ScoreIcon />,
    },
    {
      title: t("chequeAvg"),
      value: data?.chequeAvg,
      Icon: <CheckIcon />,
    },
    {
      title: t("cashbackSum"),
      value: data?.cashbackSum,
      Icon: <CashBackIcon />,
    },
    {
      title: t("discountSum"),
      value: data?.discountSum,
      Icon: <DiscountIcon />,
    },
    {
      title: t("couponAmountSum"),
      value: data?.couponAmountSum,
      Icon: <SertificateIcon />,
    },
    {
      title: t("couponDiscountSum"),
      value: data?.couponDiscountSum,
      Icon: <CouponIcon />,
    },
  ];

  return { response, list, status, setStatus, setUsedLevel, usedLevel };
};

export default useClientsHook;
