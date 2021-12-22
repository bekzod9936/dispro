import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { fetchCilentsData } from 'services/queries/statisticsQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setOperations } from 'services/redux/Slices/statistics/statistics';
import {
  MoneyIcon,
  RatingIcon,
  CheckIcon,
  CashBackIcon,
  DiscountIcon,
  LaptopIcon,
} from '../../style';

interface Props {
  filterValues?: any;
}

const useOperationsHook = ({ filterValues }: Props) => {
  const { t } = useTranslation();
  const data = useAppSelector((state) => state.statistics.operations);
  const dispatch = useAppDispatch();

  const response = useQuery(
    ['fetchOperationsInfo', filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => {
          if (filterValues[v] !== '') {
            return `${v}=${filterValues[v]}&`;
          } else {
            return '';
          }
        })
        .join('');
      return fetchCilentsData({ section: `operations?${url}` });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setOperations(data.data.data));
      },
    }
  );

  const list = [
    {
      title: t('totalSum'),
      value: data?.chequeSum,
      Icon: <LaptopIcon />,
    },
    {
      title: t('discountSum'),
      value: data?.discountSum,
      Icon: <DiscountIcon />,
    },
    {
      title: t('cashbackSum'),
      value: data?.cashbackSum,
      Icon: <CashBackIcon />,
    },
    {
      title: t('paidWithPoint'),
      value: data?.paidWithPoint,
      Icon: <RatingIcon />,
    },
    {
      title: t('paidWithMoney'),
      value: data?.paidWithMoney,
      Icon: <MoneyIcon />,
    },
    {
      title: t('chequeAvg'),
      value: data?.chequeAvg,
      Icon: <CheckIcon />,
    },
  ];

  return { response, list };
};

export default useOperationsHook;
