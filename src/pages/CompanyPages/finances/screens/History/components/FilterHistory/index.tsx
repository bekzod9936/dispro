import { useState } from 'react';
import Filter from 'components/Custom/Filter/index';
import MultiSelect from 'components/Custom/MultiSelect';
import Button from 'components/Custom/Button';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useAppSelector } from 'services/redux/hooks';
import { IconButton } from '@material-ui/core';
import useExcel from '../../hook/useExcel';
import CustomDatePicker from 'components/Custom/CustomDatePicker';
import {
  WrapFilterValues,
  WrapInputs,
  Label1,
  WrapSelectV,
  ButtonKeyWord,
  DeleteIcon,
  ExcelIcon,
  WrapFilter,
} from './style';

interface CashProp {
  value?: number;
  label?: string;
}

interface Props {
  refetch?: any;
  setFilterValues?: any;
  filterValues?: any;
  intialFilter?: any;
}

const FilterHistory = ({
  refetch,
  setFilterValues,
  filterValues,
  intialFilter,
}: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const { resExcel } = useExcel();

  const cashier = useAppSelector(
    (state) => state.finance.historyFinance.cashier
  );

  const stores = useAppSelector(
    (state) => state.finance.historyFinance.storeIds
  );
  const intialDate = {
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
  };

  const [date, setDate] = useState(intialDate);
  const [dateLimit, setDateLimit] = useState({ startDate: '', endDate: '' });
  const [cashierStaffId, setCashierStaffId] = useState<CashProp>();
  const [storeId, setStoreId] = useState<CashProp>();

  const storesFilter = stores?.map((v: any) => {
    return {
      value: v.id,
      label: v.name,
    };
  });

  const onReset = async () => {
    await setFilterValues(intialFilter);
    await setDate(intialDate);
    await setCashierStaffId({});
    await setDateLimit({ startDate: '', endDate: '' });
    await setStoreId({});
    await refetch();
  };

  const handleFilterSubmit = async ({ startDate = '', endDate = '' }) => {
    await setFilterValues({
      ...filterValues,
      cashierStaffId: cashierStaffId?.value ? cashierStaffId?.value : '',
      storeId: storeId?.value ? storeId?.value : '',
      startDate: startDate,
      endDate: endDate,
    });

    await refetch();
  };

  const handleClick = () => {
    resExcel.refetch();
  };

  const filterselectvalue =
    dateLimit?.startDate !== '' && dateLimit?.endDate !== '' ? (
      <ButtonKeyWord
        onClick={async () => {
          await setFilterValues({
            ...filterValues,
            page: 1,
            endDate: '',
            startDate: '',
          });
          await setDate(intialDate);
          await setDateLimit({ startDate: '', endDate: '' });
          await refetch();
        }}
      >
        {`${dayjs(dateLimit?.startDate).format('DD MMMM')}-${dayjs(
          dateLimit?.endDate
        ).format('DD MMMM, YYYY')}`}
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  const filtercash = cashierStaffId?.label ? (
    <ButtonKeyWord>
      {`${t('cashier')}: `}
      {cashierStaffId?.label}
      <IconButton
        onClick={async () => {
          await setFilterValues({
            ...filterValues,
            cashierStaffId: '',
            page: 1,
          });
          await setCashierStaffId({});
          await refetch();
        }}
      >
        <DeleteIcon />
      </IconButton>
    </ButtonKeyWord>
  ) : null;

  const filterstore =
    storeId !== undefined ? (
      <ButtonKeyWord>
        {`${t('filial')}: `}
        {storeId?.label}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              page: 1,
              storeId: '',
            });
            await setStoreId({});
            await refetch();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  const filterList = [
    {
      title: t('byDate'),
      content: (
        <WrapInputs>
          <Label1>{t('chose_date')}</Label1>
          <div>
            <CustomDatePicker
              margin='0 15px 0 0'
              isFilter
              text={t('from')}
              onChange={(e) => {
                let date1 = '' + e.year + '-' + e.month.number + '-' + e.day;
                setDate({
                  ...date,
                  startDate: date1,
                });
                setDateLimit({ ...date, startDate: date1 });
              }}
              value={date?.startDate}
              maxDate={date?.endDate}
            />
            <CustomDatePicker
              margin='0 0 0 0'
              isFilter
              text={t('to')}
              onChange={(e) => {
                let date1 = '' + e.year + '-' + e.month.number + '-' + e.day;
                setDate({
                  ...date,
                  endDate: date1,
                });
                setDateLimit({ ...date, endDate: date1 });
              }}
              value={date?.endDate}
              minDate={date?.startDate}
            />
          </div>
        </WrapInputs>
      ),
    },
    {
      title: t('bycashier'),
      content: (
        <MultiSelect
          label={t('chose_cashier')}
          options={cashier}
          placeholder={t('cashiernotselected')}
          onChange={(e: any) => setCashierStaffId(e)}
          value={cashierStaffId}
        />
      ),
    },
    {
      title: t('withfilial'),
      content: (
        <MultiSelect
          label={t('choosefilial')}
          options={storesFilter}
          onChange={(e: any) => setStoreId(e)}
          value={storeId}
          selectStyle={{ bgcolor: '#eff0fd' }}
        />
      ),
    },
  ];

  return (
    <>
      <WrapFilter>
        <WrapFilterValues>
          <Filter
            onSubmit={() =>
              handleFilterSubmit({
                startDate: date.startDate,
                endDate: date.endDate,
              })
            }
            onReset={onReset}
            list={filterList}
          />
          {width > 600 ? filterselectvalue : null}
          {width > 600 ? filtercash : null}
          {width > 600 ? filterstore : null}
        </WrapFilterValues>
        <Button
          onClick={handleClick}
          startIcon={<ExcelIcon />}
          buttonStyle={{
            bgcolor: '#45A13B',
            height: {
              mobile: 36,
            },
          }}
          margin={{
            laptop: '0 0 0 10px',
          }}
          disabled={resExcel.isLoading}
        >
          {t('exportexcel')}
        </Button>
      </WrapFilter>
      <WrapSelectV>
        {width > 600 ? null : <>{filterselectvalue}</>}
        {width > 600 ? null : <>{filtercash}</>}
        {width > 600 ? null : <>{filterstore}</>}
      </WrapSelectV>
    </>
  );
};

export default FilterHistory;
