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
import CheckBox from 'components/Custom/CheckBox';
import {
  WrapFilterValues,
  WrapInputs,
  Label1,
  WrapSelectV,
  ButtonKeyWord,
  DeleteIcon,
  ExcelIcon,
  WrapFilter,
  WrapStatus,
  WrapCheck,
  Label,
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

  const intialPayment = {
    cash: false,
    app: false,
  };

  const [date, setDate] = useState(intialDate);
  const [dateLimit, setDateLimit] = useState({ startDate: '', endDate: '' });
  const [cashierStaffId, setCashierStaffId] = useState<CashProp>();
  const [storeId, setStoreId] = useState<CashProp>();
  const [payment, setPayment] = useState<any>(intialPayment);
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
    await setPayment(intialPayment);
    await refetch();
  };

  const handleFilterSubmit = ({ startDate = '', endDate = '' }) => {
    setFilterValues({
      ...filterValues,
      cashierStaffId: cashierStaffId?.value ? cashierStaffId?.value : '',
      storeId: storeId?.value ? storeId?.value : '',
      startDate: startDate,
      endDate: endDate,
      amountCash: payment.cash ? 1 : '',
      amountCard: payment.app ? 1 : '',
      page: 1,
    });
  };

  const handleClick = () => {
    resExcel.refetch();
  };

  const filterselectvalue =
    filterValues?.startDate === dateLimit?.startDate &&
    filterValues?.endDate === dateLimit?.endDate ? (
      <ButtonKeyWord>
        {`${dayjs(dateLimit?.startDate).format('DD MMMM')}-${dayjs(
          dateLimit?.endDate
        ).format('DD MMMM, YYYY')}`}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              page: 1,
              endDate: intialDate.endDate,
              startDate: intialDate.startDate,
            });
            await setDate(intialDate);
            await setDateLimit({ startDate: '', endDate: '' });
            await refetch();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  const filtercashier = cashierStaffId?.label ? (
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

  const filterstore = filterValues.storeId ? (
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

  const filtercash =
    filterValues?.amountCash === 1 ? (
      <ButtonKeyWord>
        {`${t('bypayment')}: ${t('paymentbycash')}`}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              page: 1,
              amountCash: '',
            });
            await setPayment({ ...payment, cash: false });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  const filtercard =
    filterValues?.amountCard === 1 ? (
      <ButtonKeyWord>
        {`${t('bypayment')}: ${t('paymentbyapp')}`}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              page: 1,
              amountCard: '',
            });
            await setPayment({ ...payment, card: false });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  const filterList = [
    {
      title: t('byDate'),
      value:
        filterValues.startDate && filterValues.endDate
          ? dayjs(filterValues.startDate).format('YYYY.MM.DD') +
            ' - ' +
            dayjs(filterValues.endDate).format('YYYY.MM.DD')
          : filterValues.endDate || filterValues.startDate
          ? dayjs(filterValues.endDate || filterValues.startDate).format(
              'YYYY.MM.DD'
            )
          : undefined,
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
      value: filterValues.cashierStaffId ? cashierStaffId?.label : undefined,
      content: (
        <MultiSelect
          label={t('chose_cashier')}
          options={cashier}
          placeholder={t('cashiernotselected')}
          onChange={(e: any) => setCashierStaffId(e)}
          value={cashierStaffId}
          menuPortalTarget={document.body}
          isBranchHeight={true}
        />
      ),
    },
    {
      title: t('withfilial'),
      value: filterValues.storeId ? storeId?.label : undefined,
      content: (
        <MultiSelect
          label={t('choosefilial')}
          options={storesFilter}
          onChange={(e: any) => setStoreId(e)}
          value={storeId}
          selectStyle={{ bgcolor: '#eff0fd' }}
          menuPortalTarget={document.body}
          isBranchHeight={true}
        />
      ),
    },
    {
      title: t('bypayment'),
      value:
        filterValues.amountCash === 1 && filterValues.amountCard === 1
          ? '2'
          : filterValues.amountCash === 1
          ? '1'
          : filterValues.amountCard === 1
          ? '1'
          : undefined,
      content: (
        <WrapStatus>
          <Label>{t('choosepaymentmethod')}</Label>
          <WrapCheck>
            <CheckBox
              label={t('paymentbycash')}
              name='amountCash'
              onChange={(e) => {
                setPayment({ ...payment, cash: e.target.checked });
              }}
              checked={payment?.cash}
            />
            <CheckBox
              label={t('paymentbyapp')}
              name='amountCard'
              onChange={(e) => {
                setPayment({ ...payment, app: e.target.checked });
              }}
              checked={payment?.app}
            />
          </WrapCheck>
        </WrapStatus>
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
          {width > 600 ? (
            <>
              {filtercash}
              {filtercard}
              {filterselectvalue}
              {filtercashier}
              {filterstore}
            </>
          ) : null}
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
        {width > 600 ? null : (
          <>
            {filtercash}
            {filtercard}
            {filterselectvalue}
            {filtercashier}
            {filterstore}
          </>
        )}
      </WrapSelectV>
    </>
  );
};

export default FilterHistory;
