import { useState } from 'react';
import CustomDatePicker from 'components/Custom/CustomDatePicker';
import InputFormat from 'components/Custom/InputFormat';
import Radio from 'components/Custom/Radio';
import CheckBox from 'components/Custom/CheckBox';
import Filter from 'components/Custom/Filter/index';
import DatePcker from 'components/Custom/DatePicker';
import useClientsHook from '../../useClientsHook';
import { useAppSelector } from 'services/redux/hooks';
import { useTranslation } from 'react-i18next';
import {
  Label,
  WrapStatus,
  WrapCheck,
  WrapPlaceHolder,
  WrapInputs,
} from './style';

interface Props {
  startDate?: string;
  endDate?: string;
  regDateFrom?: string;
  regDateTo?: string;
  genderTypeId?: string | number;
  purchaseCountFrom?: string;
  purchaseCountTo?: string;
  allPurchaseSum?: string;
  usedLevelNumber?: string;
}

const intialState = {
  startDate: '',
  endDate: '',
  regDateFrom: '',
  regDateTo: '',
  genderTypeId: '',
  purchaseCountFrom: '',
  purchaseCountTo: '',
  allPurchaseSum: '',
  usedLevelNumber: '',
};

const FilterClients = () => {
  const { t } = useTranslation();
  const data = useAppSelector((state) => state.statistics.clientStats);
  const [filterValues, setFilterValues] = useState<Props>(intialState);
  const [date, setDate] = useState({ startDate: '', endDate: '' });
  const [traffic, setTraffic] = useState('');

  const { response, status, setStatus, setUsedLevel } = useClientsHook({
    filterValues,
    traffic,
  });

  const genders = [
    { value: '1', label: `${t('male')}` },
    { value: '2', label: `${t('female')}` },
  ];

  const error =
    !!filterValues.purchaseCountFrom &&
    !!filterValues.purchaseCountTo &&
    Number(filterValues.purchaseCountFrom) >
      Number(filterValues.purchaseCountTo);

  const handleFilterSubmit = async ({ startDate = '', endDate = '' }) => {
    await setFilterValues({
      ...filterValues,
      startDate: startDate,
      endDate: endDate,
    });
    await response.refetch();
  };

  const onReset = async () => {
    await setFilterValues(intialState);
    await setTraffic('');
    await setUsedLevel([]);
    await response.refetch();
  };

  const handleDataPicker = async (e: any) => {
    await setFilterValues({
      ...filterValues,
      startDate: e.slice(0, e.indexOf(' ~')),
      endDate: e.slice(e.indexOf('~ ') + 2),
    });
    await setDate({
      startDate: e.slice(0, e.indexOf(' ~')),
      endDate: e.slice(e.indexOf('~ ') + 2),
    });
    await response.refetch();
  };

  const radioList = data?.filter?.referal?.map((v: any) => {
    const val = v.refIds
      .map((v: any, i: any) => `refIds%5B${i}%5D=${v}&`)
      .join('');
    return {
      value: val,
      label: v.name,
    };
  });

  const filterList = [
    {
      title: t('gender'),
      content: (
        <Radio
          flexDirection='row'
          list={genders}
          title={t('chose_gender')}
          onChange={(v: any) =>
            setFilterValues({ ...filterValues, genderTypeId: v })
          }
          value={filterValues.genderTypeId}
        />
      ),
    },
    {
      title: t('registration_date'),
      content: (
        <WrapInputs>
          <Label>{t('chose_date')}</Label>
          <div>
            <CustomDatePicker
              margin='0 15px 0 0'
              isFilter
              text={t('from')}
              onChange={(e) => {
                let date = '' + e.year + '-' + e.month.number + '-' + e.day;
                setFilterValues({ ...filterValues, regDateFrom: date });
              }}
              value={filterValues?.regDateFrom}
              maxDate={filterValues?.regDateTo}
            />
            <CustomDatePicker
              margin='0 0 0 0'
              isFilter
              text={t('to')}
              onChange={(e) => {
                let date = '' + e.year + '-' + e.month.number + '-' + e.day;
                setFilterValues({ ...filterValues, regDateTo: date });
              }}
              value={filterValues?.regDateTo}
              minDate={filterValues?.regDateFrom}
            />
          </div>
        </WrapInputs>
      ),
    },
    {
      title: t('purchuase_amount'),
      content: (
        <>
          <InputFormat
            label={t('enter_number')}
            value={filterValues.purchaseCountFrom}
            IconStart={<WrapPlaceHolder>{t('from')}</WrapPlaceHolder>}
            width={{
              maxwidth: 200,
            }}
            inputStyle={{
              inpadding: '0 10px',
            }}
            error={error}
            maxLength={11}
            onChange={(e: any) => {
              setFilterValues({
                ...filterValues,
                purchaseCountFrom: e.target.value,
              });
            }}
            type='tel'
          />
          <InputFormat
            label={t('enter_number')}
            margin={{ laptop: '0 0 0 15px' }}
            IconStart={<WrapPlaceHolder>{t('to')}</WrapPlaceHolder>}
            width={{
              maxwidth: 200,
            }}
            maxLength={11}
            error={error}
            inputStyle={{
              inpadding: '0 10px',
            }}
            value={filterValues.purchaseCountTo}
            onChange={(e: any) =>
              setFilterValues({
                ...filterValues,
                purchaseCountTo: e.target.value,
              })
            }
            type='tel'
          />
        </>
      ),
    },
    {
      title: t('purchuase_cost'),
      content: (
        <InputFormat
          placeholder={t('notless')}
          onChange={(e: any) =>
            setFilterValues({ ...filterValues, allPurchaseSum: e.target.value })
          }
          label={t('enter_amount')}
          value={filterValues.allPurchaseSum}
          type='tel'
          maxLength={11}
        />
      ),
    },
    {
      title: t('status'),
      content: (
        <WrapStatus>
          <Label>{t('chose_status')}</Label>
          <WrapCheck>
            {status?.map((v: any) => (
              <CheckBox
                key={v.label}
                label={v.label}
                checked={v?.[v?.name]}
                name={v.name}
                onChange={(e: any) => {
                  const arr = status?.map((i: any) => {
                    if (i.name === e.target.name) {
                      return { ...i, [i.name]: e.target.checked };
                    } else {
                      return { ...i, [i.name]: i?.[i?.name] };
                    }
                  });
                  const ad: any = arr.filter((a: any) => a?.[a.name]);
                  const val = ad.map((a: any) => a?.number).join(',');
                  setFilterValues({
                    ...filterValues,
                    usedLevelNumber: val,
                  });
                  setUsedLevel(arr);
                  setStatus(arr);
                }}
              />
            ))}
          </WrapCheck>
        </WrapStatus>
      ),
    },
    {
      title: t('traffic_provider'),
      content: (
        <Radio
          flexDirection='row'
          list={radioList}
          title={t('chose_trafic_provider')}
          onChange={(v: any) => {
            setTraffic(v);
          }}
          value={traffic}
        />
      ),
    },
  ];

  return (
    <>
      <Filter
        onSubmit={() =>
          handleFilterSubmit({
            startDate: date.startDate,
            endDate: date.endDate,
          })
        }
        error={error}
        onReset={onReset}
        list={filterList}
      />
      <DatePcker onChange={handleDataPicker} margin='0 0 0 20px' />
    </>
  );
};

export default FilterClients;
