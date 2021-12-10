import Filter from 'components/Custom/Filter';
import MultiSelect from 'components/Custom/MultiSelect';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'services/redux/hooks';
import { IconButton } from '@material-ui/core';
import {
  WrapCheck,
  Label,
  WrapChecks,
  StarIcon,
  ButtonKeyWord,
  DeleteIcon,
  WrapValues,
} from './style';

interface CProps {
  value?: any;
  label?: any;
}

interface Props {
  filterValues?: any;
  setFilterValues?: any;
  refetch?: any;
}

const FilterReview = ({ setFilterValues, filterValues, refetch }: Props) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState<any>('');
  const filter: any = useAppSelector((state) => state.feedbackPost.filter);

  const [cashierStaffId, setCashierStaffId] = useState<CProps>();

  const cashiersFilter = filter?.cashiers
    ?.filter((v: any) => v.firstName !== '' || v.lastName !== '')
    ?.map((v: any) => {
      return {
        value: v.cashierId,
        label: `${v.firstName} ${v.lastName}`,
      };
    });

  const handleFilterSubmit = async () => {
    await setFilterValues({
      ...filterValues,
      cashierStaffId: cashierStaffId?.value,
      rating: rating,
    });
    await refetch();
  };

  const onReset = async () => {
    await setFilterValues({ ...filterValues, cashierStaffId: '', rating: '' });
    await setCashierStaffId({});
    await setRating('');
    await refetch();
  };

  const handleStarCheck = (v: any) => {
    setRating(v);
  };

  const filterList: any = [
    {
      title: t('bycashier'),
      content: (
        <MultiSelect
          label={t('chose_cashier')}
          options={cashiersFilter}
          onChange={(e: any) => setCashierStaffId(e)}
          value={cashierStaffId}
          selectStyle={{ bgcolor: '#eff0fd' }}
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

  const filtercash =
    filterValues.cashierStaffId !== '' &&
    filterValues.cashierStaffId !== undefined ? (
      <ButtonKeyWord>
        {`${t('cashier')}: `}
        {cashierStaffId?.label}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              cashierStaffId: '',
            });
            await setCashierStaffId({});
            await refetch();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

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
    filterValues.rating !== '' && filterValues.rating !== undefined ? (
      <ButtonKeyWord>
        {`${t('rating')}: ${filterValues.rating} ${funCount(
          filterValues.rating
        )}`}
        <IconButton
          onClick={async () => {
            await setFilterValues({
              ...filterValues,
              rating: '',
            });
            await setRating('');
            await refetch();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  return (
    <>
      <Filter
        list={filterList}
        onSubmit={handleFilterSubmit}
        onReset={onReset}
      />
      <WrapValues>
        {ratingValue}
        {filtercash}
      </WrapValues>
    </>
  );
};

export default FilterReview;
