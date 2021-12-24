import { useState } from 'react';
import CustomDatePicker from 'components/Custom/CustomDatePicker';
import InputFormat from 'components/Custom/InputFormat';
import Radio from 'components/Custom/Radio';
import CheckBox from 'components/Custom/CheckBox';
import Filter from 'components/Custom/Filter/index';
import DatePcker from 'components/Custom/DatePicker';
import { useAppSelector } from 'services/redux/hooks';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { numberWithNew } from 'services/utils';
import {
  Label,
  WrapStatus,
  WrapCheck,
  WrapPlaceHolder,
  WrapInputs,
  WrapFilter,
  DeleteIcon,
  ButtonKeyWord,
  WrapValues,
} from './style';
import MultiSelect from 'components/Custom/MultiSelect';
import { IconButton } from '@material-ui/core';

interface Props {
  response?: any;
  filterValues?: any;
  setFilterValues?: any;
  intialState?: any;
  status?: any;
  setStatus?: any;
  setUsedLevel?: any;
  usedLevel?: any;
}

interface VProps {
  startDate?: string;
  endDate?: string;
  regDateFrom?: string;
  regDateTo?: string;
  genderTypeId?: string | number;
  purchaseCountFrom?: string;
  purchaseCountTo?: string;
  allPurchaseSum?: string;
  usedLevelNumber?: string;
  storeIds?: string;
  refIds?: string;
}

const FilterClients = ({
  response,
  filterValues,
  setFilterValues,
  intialState,
  status,
  setStatus,
  setUsedLevel,
  usedLevel,
}: Props) => {
  const { t } = useTranslation();
  const data = useAppSelector((state) => state.statistics.clientStats);
  const [date, setDate] = useState({ startDate: '', endDate: '' });
  const [storeIds, setStoreIds] = useState<any[]>([]);
  const [storeId, setStoreId] = useState<any[]>([]);
  const [values, setValues] = useState<VProps>(intialState);
  const [statusValue, setStatusValue] = useState<any>([]);

  const handleFilterSubmit = async ({ startDate = '', endDate = '' }) => {
    await setFilterValues({
      ...values,
      startDate: startDate,
      endDate: endDate,
    });
    await setStatusValue(usedLevel.filter((v: any) => v?.[v?.name]));
    await setStoreId(storeIds);
  };

  const onReset = async () => {
    await setFilterValues(intialState);
    await setValues(intialState);
    await setUsedLevel([]);
    await setStatusValue([]);
    await setStoreIds([]);
    await setStoreId([]);
    await response.refetch();
  };

  const handleDataPicker = async (e: any) => {
    await setFilterValues({
      ...values,
      startDate: e.slice(0, e.indexOf(' ~')),
      endDate: e.slice(e.indexOf('~ ') + 2),
    });
    await setDate({
      startDate: e.slice(0, e.indexOf(' ~')),
      endDate: e.slice(e.indexOf('~ ') + 2),
    });
    await response.refetch();
  };

  function capitalize(s: any) {
    return s[0]?.toUpperCase() + s?.slice(1);
  }

  const radioList = data?.filter?.referal?.map((v: any) => {
    const val = JSON.stringify(v.refIds);
    return {
      value: val,
      label: v.name,
    };
  });

  const storesFilter = data?.filter?.stores?.map((v: any) => {
    return {
      value: v.id,
      label: v.name,
    };
  });

  const genders = [
    { value: '1', label: `${t('male')}` },
    { value: '2', label: `${t('female')}` },
  ];

  const error =
    !!values.purchaseCountFrom &&
    !!values.purchaseCountTo &&
    Number(values.purchaseCountFrom) > Number(values.purchaseCountTo);

  const filterList = [
    {
      title: t('gender'),
      value:
        values.genderTypeId !== '' && values.genderTypeId !== undefined
          ? Number(values.genderTypeId) === 1
            ? t('male')
            : Number(values.genderTypeId) === 2
            ? t('female')
            : undefined
          : undefined,
      content: (
        <Radio
          flexDirection='row'
          list={genders}
          title={t('chose_gender')}
          onChange={(v: any) => setValues({ ...values, genderTypeId: v })}
          value={values.genderTypeId}
        />
      ),
    },
    {
      title: t('registration_date'),
      value:
        values.regDateTo !== '' &&
        values.regDateTo !== undefined &&
        values.regDateFrom !== '' &&
        values.regDateFrom !== undefined
          ? dayjs(values.regDateFrom).format('YYYY.MM.DD') +
            ' - ' +
            dayjs(values.regDateTo).format('YYYY.MM.DD')
          : values.regDateTo !== '' && values.regDateTo !== undefined
          ? dayjs(values.regDateTo).format('YYYY.MM.DD')
          : values.regDateFrom !== '' && values.regDateFrom !== undefined
          ? dayjs(values.regDateFrom).format('YYYY.MM.DD')
          : undefined,
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
                setValues({ ...values, regDateFrom: date });
              }}
              value={values?.regDateFrom}
              maxDate={values?.regDateTo}
            />
            <CustomDatePicker
              margin='0 0 0 0'
              isFilter
              text={t('to')}
              onChange={(e) => {
                let date = '' + e.year + '-' + e.month.number + '-' + e.day;
                setValues({ ...values, regDateTo: date });
              }}
              value={values?.regDateTo}
              minDate={values?.regDateFrom}
            />
          </div>
        </WrapInputs>
      ),
    },
    {
      title: t('purchuase_amount'),
      value:
        values.purchaseCountFrom !== '' &&
        values.purchaseCountFrom !== undefined &&
        values.purchaseCountTo !== '' &&
        values.purchaseCountTo !== undefined
          ? numberWithNew({
              number: +values.purchaseCountFrom,
            }) +
            ' - ' +
            numberWithNew({
              number: +values.purchaseCountTo,
            })
          : values.purchaseCountFrom !== '' &&
            values.purchaseCountFrom !== undefined
          ? numberWithNew({
              number: +values.purchaseCountFrom,
            })
          : values.purchaseCountTo !== '' &&
            values.purchaseCountTo !== undefined
          ? numberWithNew({
              number: +values.purchaseCountTo,
            })
          : undefined,
      content: (
        <>
          <InputFormat
            label={t('enter_number')}
            value={values.purchaseCountFrom}
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
              setValues({
                ...values,
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
            value={values.purchaseCountTo}
            onChange={(e: any) => {
              setValues({
                ...values,
                purchaseCountTo: e.target.value,
              });
            }}
            type='tel'
          />
        </>
      ),
    },
    {
      title: t('purchuase_cost'),
      value:
        values.allPurchaseSum !== '' && values.allPurchaseSum !== undefined
          ? numberWithNew({
              number: +values.allPurchaseSum,
            })
          : undefined,
      content: (
        <InputFormat
          placeholder={t('notless')}
          onChange={(e: any) =>
            setValues({ ...values, allPurchaseSum: e.target.value })
          }
          label={t('enter_amount')}
          value={values.allPurchaseSum}
          type='tel'
          maxLength={11}
        />
      ),
    },
    {
      title: t('withfilial'),
      value: storeIds.length > 0 ? storeIds.length : undefined,
      content: (
        <MultiSelect
          label={t('choosefilial')}
          options={storesFilter}
          menuPortalTarget={document.body}
          onChange={(e: any) => {
            setValues({
              ...values,
              storeIds:
                e.length > 0 ? JSON.stringify(e.map((v: any) => v.value)) : '',
            });
            setStoreIds(e);
          }}
          value={storeIds}
          selectStyle={{ bgcolor: '#eff0fd' }}
          isMulti={true}
        />
      ),
    },
    {
      title: t('status'),
      value:
        status.length > 0
          ? status.filter((v: any) => v?.[v?.name] === true).length > 0
            ? status.filter((v: any) => v?.[v?.name] === true).length
            : undefined
          : undefined,
      content: (
        <WrapStatus>
          <Label>{t('statuschoose')}</Label>
          <WrapCheck>
            {status?.map((v: any) => (
              <CheckBox
                key={v.label}
                label={
                  v.label === 'BLOCKED'
                    ? t('BLOCKED')
                    : v.label === 'VIP'
                    ? t('VIP')
                    : v.label
                }
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
                  setValues({
                    ...values,
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
      value:
        values.refIds !== '' && values.refIds !== undefined
          ? capitalize(
              radioList?.find((v: any) => values?.refIds === v?.value)?.label
            )
          : undefined,
      content: (
        <Radio
          flexDirection='row'
          list={radioList}
          title={t('chose_trafic_provider')}
          onChange={(v: any) => {
            setValues({ ...values, refIds: v });
          }}
          value={values.refIds}
        />
      ),
    },
  ];

  const filterStatus = (values1: any) => {
    if (values1.length > 0) {
      return values1.map((v: any) => {
        return (
          <ButtonKeyWord>
            {`${t('status')}: `}
            {v.label === 'BLOCKED'
              ? t('BLOCKED')
              : v.label === 'VIP'
              ? t('VIP')
              : v.label}
            <IconButton
              onClick={async () => {
                const arr = await status?.map((i: any) => {
                  if (i.name === v.name) {
                    return { ...i, [i.name]: false };
                  } else {
                    return { ...i, [i.name]: i?.[i?.name] };
                  }
                });
                const ad: any = await arr.filter((a: any) => a?.[a.name]);
                const val = await ad.map((a: any) => a?.number).join(',');

                await setFilterValues({
                  ...filterValues,
                  usedLevelNumber: val,
                });
                await setValues({
                  ...values,
                  usedLevelNumber: val,
                });
                await setStatusValue(ad);
                await setStatus(arr);
                await setUsedLevel(arr);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ButtonKeyWord>
        );
      });
    } else {
      return;
    }
  };

  const filterRegvalue =
    (filterValues?.regDateFrom !== '' || filterValues?.regDateTo !== '') &&
    (filterValues?.regDateFrom !== undefined ||
      filterValues?.regDateTo !== undefined) ? (
      <ButtonKeyWord>
        {filterValues?.regDateFrom !== '' &&
        filterValues?.regDateTo !== '' &&
        filterValues?.regDateFrom !== undefined &&
        filterValues?.regDateTo !== undefined
          ? `${t('registration_date')}: ${t('from')}: ${dayjs(
              filterValues?.regDateFrom
            ).format('DD-MM-YYYY')} ${t('to')}: ${dayjs(
              filterValues?.regDateTo
            ).format('DD-MM-YYYY')}`
          : filterValues?.regDateFrom !== '' &&
            filterValues?.regDateFrom !== undefined
          ? `${t('registration_date')}: ${t('from')}: ${dayjs(
              filterValues?.regDateFrom
            ).format('DD-MM-YYYY')}`
          : filterValues?.regDateTo !== '' &&
            filterValues?.regDateTo !== undefined
          ? `${t('registration_date')}: ${t('to')}: ${dayjs(
              filterValues?.regDateTo
            ).format('DD-MM-YYYY')}`
          : ''}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              regDateFrom: '',
              regDateTo: '',
            });
            await setValues({ ...values, regDateFrom: '', regDateTo: '' });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  const fiterPurchaseCount =
    (filterValues.purchaseCountFrom !== '' ||
      filterValues.purchaseCountTo !== '') &&
    (filterValues.purchaseCountFrom !== undefined ||
      filterValues.purchaseCountTo !== undefined) ? (
      <ButtonKeyWord>
        {filterValues.purchaseCountFrom !== '' &&
        filterValues.purchaseCountTo !== '' &&
        filterValues.purchaseCountFrom !== undefined &&
        filterValues.purchaseCountTo !== undefined
          ? `${t('allpurchase')}: ${t('from')}: ${numberWithNew({
              number: +filterValues.purchaseCountFrom,
            })} ${t('to')}: ${numberWithNew({
              number: +filterValues.purchaseCountTo,
            })}`
          : filterValues.purchaseCountFrom !== '' &&
            filterValues.purchaseCountFrom !== undefined
          ? `${t('allpurchase')}: ${t('from')}: ${numberWithNew({
              number: +filterValues.purchaseCountFrom,
            })}`
          : filterValues.purchaseCountTo !== '' &&
            filterValues.purchaseCountTo !== undefined
          ? `${t('allpurchase')}: ${t('to')}: ${numberWithNew({
              number: +filterValues.purchaseCountTo,
            })}`
          : ''}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              purchaseCountFrom: '',
              purchaseCountTo: '',
            });
            await setValues({
              ...values,
              purchaseCountFrom: '',
              purchaseCountTo: '',
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  const filterAllPurchase =
    filterValues.allPurchaseSum !== '' &&
    filterValues.allPurchaseSum !== undefined ? (
      <ButtonKeyWord>
        {`${t('purchuase_cost')}: ${numberWithNew({
          number: +filterValues.allPurchaseSum,
        })}`}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              allPurchaseSum: '',
            });
            await setValues({
              ...values,
              allPurchaseSum: '',
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  const filterTraffic =
    filterValues.refIds !== '' && filterValues.refIds !== undefined ? (
      <ButtonKeyWord>
        {`${t('traffic_provider')}: ${capitalize(
          radioList?.find((v: any) => values?.refIds === v?.value)?.label
        )}`}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              refIds: '',
            });
            await setValues({
              ...values,
              refIds: '',
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  const filterGender =
    filterValues.genderTypeId !== '' &&
    filterValues.genderTypeId !== undefined ? (
      <ButtonKeyWord>
        {`${t('gender')}: `}
        {genders.filter((v: any) => v.value === filterValues.genderTypeId)
          .length > 0
          ? genders.filter((v: any) => v.value === filterValues.genderTypeId)[0]
              .label
          : undefined}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              genderTypeId: '',
            });
            await setValues({
              ...values,
              genderTypeId: '',
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  const filterStore = (values: any) => {
    if (values.length > 0) {
      return values.map((v: any) => {
        return (
          <ButtonKeyWord className='filter'>
            {`${t('filial')}: `}
            {v.label}
            <IconButton
              onClick={async () => {
                await setFilterValues({
                  ...filterValues,
                  storeIds:
                    storeIds
                      .filter((a: any) => a.value !== v.value)
                      .map((v: any) => v.value).length > 0
                      ? `[${storeIds
                          .filter((a: any) => a.value !== v.value)
                          .map((v: any) => v.value)
                          .join(',')}]`
                      : '',
                });
                await setStoreIds(
                  values.filter((a: any) => a.value !== v.value)
                );
                await setStoreId(
                  values.filter((a: any) => a.value !== v.value)
                );
                await setValues({
                  ...values,
                  storeIds: values.filter((a: any) => a.value !== v.value),
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ButtonKeyWord>
        );
      });
    } else {
      return;
    }
  };

  return (
    <>
      <WrapFilter>
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
        <DatePcker onChange={handleDataPicker} margin='0 10px 5px 15px' />
        {filterStore(storeId)}
        {filterGender}
        {filterRegvalue}
        {fiterPurchaseCount}
        {filterAllPurchase}
        {filterTraffic}
        {filterStatus(statusValue)}
      </WrapFilter>
    </>
  );
};

export default FilterClients;
