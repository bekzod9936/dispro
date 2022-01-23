import Filter from 'components/Custom/Filter';
import MultiSelect from 'components/Custom/MultiSelect';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'services/redux/hooks';
import { IconButton } from '@material-ui/core';
import Input from 'components/Custom/Input';
import useWindowWidth from 'services/hooks/useWindowWidth';
import {
  WrapCheck,
  Label,
  WrapChecks,
  StarIcon,
  ButtonKeyWord,
  DeleteIcon,
  WrapValues,
  SearchIcon,
  FilterWarp,
} from './style';

interface CProps {
  value?: any;
  label?: any;
}

interface Props {
  filterValues?: any;
  setFilterValues?: any;
  refetch?: any;
  handleSearch?: any;
  inpuSearch?: any;
}

const FilterReview = ({
  setFilterValues,
  filterValues,
  refetch,
  handleSearch,
  inpuSearch,
}: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const [rating, setRating] = useState<any>('');
  const filter: any = useAppSelector((state) => state.feedbackPost.filter);

  const [cashierIds, setCashierIds] = useState<CProps[]>([]);
  const [storeIds, setStoreIds] = useState<CProps[]>([]);
  const [Filters, setFilters] = useState<any>({
    cashierIds: [],
    storeIds: [],
    rating: '',
  });
  const cashiersFilter = filter?.cashiers
    ?.filter((v: any) => v.firstName !== '' || v.lastName !== '')
    ?.map((v: any) => {
      return {
        value: v.cashierId,
        label: `${v.firstName} ${v.lastName}`,
      };
    });

  const storesFilter = filter.stores?.map((v: any) => {
    return {
      value: v.id,
      label: v.name,
    };
  });

  const handleFilterSubmit = async () => {
    await setFilterValues({
      ...filterValues,
      page: 1,
      cashierIds:
        cashierIds.map((v: any) => v.value).length > 0
          ? `[${cashierIds.map((v: any) => v.value).join(',')}]`
          : '',
      rating: rating,
      storeIds:
        storeIds.map((v: any) => v.value).length > 0
          ? `[${storeIds.map((v: any) => v.value).join(',')}]`
          : '',
    });
    await refetch();
    await setFilters({
      cashierIds: cashierIds,
      storeIds: storeIds,
      rating: rating,
    });
  };

  const onReset = async () => {
    await setFilterValues({
      ...filterValues,
      page: 1,
      cashierIds: '',
      rating: '',
      storeIds: '',
    });
    await setCashierIds([]);
    await setRating('');
    await setStoreIds([]);
    await refetch();
  };

  const handleStarCheck = (v: any) => {
    setRating(v);
  };

  const filterList: any = [
    {
      title: t('bycashier'),
      value: cashierIds.length > 0 ? cashierIds.length : undefined,
      content: (
        <MultiSelect
          label={t('chose_cashier')}
          options={cashiersFilter}
          onChange={(e: any) => setCashierIds(e)}
          value={cashierIds}
          selectStyle={{ bgcolor: '#eff0fd' }}
          isMulti={true}
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
          onChange={(e: any) => setStoreIds(e)}
          value={storeIds}
          selectStyle={{ bgcolor: '#eff0fd' }}
          isMulti={true}
          menuPortalTarget={document.body}
        />
      ),
    },
    {
      title: t('byRating'),
      content: (
        <WrapCheck>
          <Label>{t('chose_status')}</Label>
          <WrapChecks>
            {[1, 2, 3, 4, 5]?.map((v: any) => (
              <IconButton
                onClick={() => {
                  if (v === rating) {
                    handleStarCheck('');
                  } else {
                    handleStarCheck(v);
                  }
                }}
              >
                <StarIcon bgcolor={rating >= v} />
              </IconButton>
            ))}
          </WrapChecks>
        </WrapCheck>
      ),
    },
  ];

  const filtercash = (values: any) => {
    if (values.length > 0) {
      return values.map((v: any) => {
        return (
          <ButtonKeyWord>
            {`${t('cashier')}: `}
            {v.label}
            <IconButton
              onClick={async () => {
                await setFilterValues({
                  ...filterValues,
                  page: 1,
                  cashierIds: `[${cashierIds
                    .filter((a: any) => a.value !== v.value)
                    .map((v: any) => v.value)
                    .join(',')}]`,
                });
                await setCashierIds(
                  values.filter((a: any) => a.value !== v.value)
                );
                await setFilters({
                  ...Filters,
                  cashierIds: values.filter((a: any) => a.value !== v.value),
                });
                await refetch();
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

  const filterStroe = (values: any) => {
    if (values.length > 0) {
      return values.map((v: any) => {
        return (
          <ButtonKeyWord>
            {`${t('filial')}: `}
            {v.label}
            <IconButton
              onClick={async () => {
                await setFilterValues({
                  ...filterValues,
                  page: 1,
                  storeIds: `[${storeIds
                    .filter((a: any) => a.value !== v.value)
                    .map((v: any) => v.value)
                    .join(',')}]`,
                });
                await setStoreIds(
                  values.filter((a: any) => a.value !== v.value)
                );
                await setFilters({
                  ...Filters,
                  storeIds: values.filter((a: any) => a.value !== v.value),
                });
                await refetch();
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

  const funCount = (number: any) => {
    switch (number) {
      case 1:
        return t('star1');
      case 2:
      case 3:
      case 4:
        return t('star23');
      case 5:
        return t('star5');
    }
  };

  const ratingValue: any =
    Filters.rating !== '' && Filters.rating !== undefined ? (
      <ButtonKeyWord>
        {`${t('rating')}: ${Filters.rating} ${funCount(Filters.rating)}`}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              page: 1,
              rating: '',
            });
            await setRating('');
            await setFilters({ ...Filters, rating: '' });
            await refetch();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  return (
    <FilterWarp>
      <div className='filterCom'>
        <Input
          IconStart={<SearchIcon />}
          inputStyle={{
            border: 'none',
            shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
            outpadding: width > 600 ? '0 0 0 25px' : '0 0 0 10px',
            inpadding: width > 600 ? '0 20px 0 10px' : '0 10px 0 0',
            height: {
              desktop: 50,
              laptop: 45,
              planshet: 40,
              mobile: 36,
            },
          }}
          type='search'
          onChange={handleSearch}
          width={{ maxwidth: 280 }}
          margin={{ laptop: '0 20px 0 0', mobile: '0 10px 0 0' }}
          placeholder={t('searchbyclients')}
          value={inpuSearch}
        />
        <Filter
          list={filterList}
          onSubmit={handleFilterSubmit}
          onReset={onReset}
        />
      </div>
      <WrapValues>
        {filtercash(Filters.cashierIds)}
        {filterStroe(Filters.storeIds)}
        {ratingValue}
      </WrapValues>
    </FilterWarp>
  );
};

export default FilterReview;
