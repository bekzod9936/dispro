import Filter from 'components/Custom/Filter';
import MultiSelect from 'components/Custom/MultiSelect';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'services/redux/hooks';
import useFeedBack from '../../hooks/useFeedBack';
import CheckBox from 'components/Custom/CheckBox';
import { WrapCheck, Label, WrapChecks, StarIcon } from './style';

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
  const [checked, setChecked] = useState(false);
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
    await setFilterValues(cashierStaffId?.value);
    await await resClients.refetch();
  };

  const onReset = async () => {
    await setFilterValues({ ...filterValues, cashierStaffId: '' });
    await setCashierStaffId({});
    await resClients.refetch();
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
              <CheckBox
                checkedIcon={<StarIcon checked={checked} margin='0 10px' />}
                icon={<StarIcon checked={checked} margin='0 10px' />}
                key={v}
                checked={checked}
                name={v}
                onChange={(e: any) => setChecked(e)}
              />
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
