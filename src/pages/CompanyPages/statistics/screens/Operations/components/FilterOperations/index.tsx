import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Radio from 'components/Custom/Radio';
import Filter from 'components/Custom/Filter/index';
import DatePcker from 'components/Custom/DatePicker';
import useOperationsHook from '../../useOperationsHook';
import { WrapFilter } from './style';
interface Props {
  startDate?: string;
  endDate?: string;
  genderTypeId?: string | number;
}

const intialState = {
  startDate: '',
  endDate: '',
  genderTypeId: '',
};

const FilterOperations = () => {
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState<Props>(intialState);
  const [date, setDate] = useState({ startDate: '', endDate: '' });

  const { response } = useOperationsHook({ filterValues: filterValues });

  const genders = [
    { value: '1', label: `${t('male')}` },
    { value: '2', label: `${t('female')}` },
  ];

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

  const filterList = [
    {
      title: t('gender'),
      value: filterValues.genderTypeId
        ? Number(filterValues.genderTypeId) === 1
          ? t('male')
          : t('female')
        : undefined,
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
  ];

  return (
    <WrapFilter>
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
      <DatePcker onChange={handleDataPicker} margin='0 0 0 20px' />
    </WrapFilter>
  );
};

export default FilterOperations;
