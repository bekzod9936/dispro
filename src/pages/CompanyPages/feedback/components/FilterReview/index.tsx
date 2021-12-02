import Filter from 'components/Custom/Filter';
import MultiSelect from 'components/Custom/MultiSelect';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'services/redux/hooks';
import useFeedBack from '../../hooks/useFeedBack';
import { WrapCheck, Label, WrapChecks, StarIcon } from './style';
import { IconButton } from '@material-ui/core';

interface CProps {
  value?: any;
  label?: any;
}

interface Props {
  filterValues?: any;
  setFilterValues?: any;
}

const FilterReview = ({ setFilterValues, filterValues }: Props) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState<any>('');
  const cashiers = useAppSelector((state) => state.feedbackPost.cashiers);

  const [cashierStaffId, setCashierStaffId] = useState<CProps>();

  const cashiersFilter = cashiers
    ?.filter((v: any) => v.firstName !== '' || v.lastName !== '')
    ?.map((v: any) => {
      return {
        value: v.cashierId,
        label: `${v.firstName} ${v.lastName}`,
      };
    });

  const { resClients, resCashiers } = useFeedBack({
    filterValues,
  });

  const handleFilterSubmit = async () => {
    await setFilterValues({
      ...filterValues,
      cashierStaffId: cashierStaffId?.value,
      rating: rating,
    });
    await resClients.refetch();
  };

  const onReset = async () => {
    await setFilterValues({ ...filterValues, cashierStaffId: '', rating: '' });
    await setCashierStaffId({});
    await setRating('');
    await resClients.refetch();
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
          isLoading={resCashiers.isLoading}
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

  return (
    <Filter list={filterList} onSubmit={handleFilterSubmit} onReset={onReset} />
  );
};

export default FilterReview;
