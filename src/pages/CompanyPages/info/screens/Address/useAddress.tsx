import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { fetchAddressInfo, fetchRegions } from 'services/queries/InfoQuery';

interface Props {
  value: number | undefined;
  address?: string;
  addressDesc?: string;
  companyId?: number;
  dynLink?: string;
  id?: number;
  isMain?: boolean;
  location?: { lat?: number; lng?: number };
  name?: string;
  telNumbers?: string[];
  workingTime?: {
    aroundTheClock?: boolean;
    work?: {
      day: number;
      dayOff: boolean;
      wHours: { from?: string; to?: string };
      bHours: { from?: string; to?: string };
    }[];
  } | null;
}
interface AProps {
  id?: any;
}

const useAddress = ({ id }: AProps) => {
  const { t } = useTranslation();
  const [regions, setRegions] = useState([]);
  const [dataAddress, setData] = useState<Props[]>([]);
  const responseAddress = useQuery(
    'fetchAddress',
    () => fetchAddressInfo({ companyId: id }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setData(data?.data?.data);
      },
    }
  );

  const responseRegions = useQuery('fetchRegions', fetchRegions, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      const newArr = data?.data?.data?.map((v: any) => {
        return {
          value: v.id,
          label: t(`${v.code}`),
        };
      });
      setRegions(newArr);
    },
  });

  const weeks = [
    {
      day: 1,
      weekday: t('md'),
    },
    {
      day: 2,
      weekday: t('td'),
    },
    {
      day: 3,
      weekday: t('wd'),
    },
    {
      day: 4,
      weekday: t('thd'),
    },
    {
      day: 5,
      weekday: t('fd'),
    },
    {
      day: 6,
      weekday: t('std'),
    },
    {
      day: 7,
      weekday: t('sd'),
    },
  ];

  const inntialWorkTime = [
    {
      day: 1,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
    },
    {
      day: 2,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
    },
    {
      day: 3,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
    },
    {
      day: 4,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
    },
    {
      day: 5,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
    },
    {
      day: 6,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
    },
    {
      day: 7,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
    },
  ];

  return {
    responseAddress,
    dataAddress,
    weeks,
    inntialWorkTime,
    responseRegions,
    regions,
  };
};

export default useAddress;
