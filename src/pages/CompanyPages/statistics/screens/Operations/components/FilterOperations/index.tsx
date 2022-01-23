import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Radio from 'components/Custom/Radio';
import Filter from 'components/Custom/Filter/index';
import DatePcker from 'components/Custom/DatePicker';
import { WrapFilter, ButtonKeyWord, DeleteIcon, WrapVal } from './style';
import { IconButton } from '@material-ui/core';

interface FProps {
  filterValues?: any;
  setFilterValues?: any;
  intialState?: any;
}

const FilterOperations = ({
  filterValues,
  setFilterValues,
  intialState,
}: FProps) => {
  const { t } = useTranslation();
  const [date, setDate] = useState({ startDate: '', endDate: '' });
  const [genderTypeId, setGenderTypeId] = useState<any>('');

  const genders = [
    { value: '1', label: `${t('male')}` },
    { value: '2', label: `${t('female')}` },
  ];

  const handleFilterSubmit = ({ startDate = '', endDate = '' }) => {
    setFilterValues({
      ...filterValues,
      genderTypeId: genderTypeId,
      startDate: startDate,
      endDate: endDate,
    });
  };

  const onReset = async () => {
    await setFilterValues({
      ...intialState,
      startDate: date.startDate !== '' ? date.startDate : '',
      endDate: date.endDate !== '' ? date.endDate : '',
    });
    await setGenderTypeId('');
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
  };

  const filterList = [
    {
      title: t('gender'),
      value:
        genderTypeId !== '' && genderTypeId !== undefined
          ? Number(genderTypeId) === 1
            ? t('male')
            : Number(genderTypeId) === 2
            ? t('female')
            : undefined
          : undefined,
      content: (
        <Radio
          flexDirection='row'
          list={genders}
          title={t('chose_gender')}
          onChange={(v: any) => setGenderTypeId(v)}
          value={genderTypeId}
        />
      ),
    },
  ];

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
            await setGenderTypeId('');
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonKeyWord>
    ) : null;

  return (
    <WrapFilter>
      <WrapVal>
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
        {filterGender}
      </WrapVal>
      <WrapVal>
        <DatePcker
          onChange={handleDataPicker}
          margin='0 0 0 20px'
          maxDate={new Date()}
        />
      </WrapVal>
    </WrapFilter>
  );
};

export default FilterOperations;
