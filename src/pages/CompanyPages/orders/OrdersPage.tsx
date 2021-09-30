import React from 'react';
import DataPicker from '../../../components/Custom/DatePicker';
import Input from '../../../components/Custom/Input';
import { ReactComponent as Arrow } from '../../../assets/icons/SideBar/arrow.svg';
import MultiSelect from '../../../components/Custom/MultiSelect';
import { YMaps, Map } from 'react-yandex-maps';

const options = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
];

const OrdersPage = () => {
  const loadSuggest = (ymaps: any) => {
    const suggestView = new ymaps.SuggestView('suggest');
  };
  return (
    <div>
      <DataPicker />
      <MultiSelect
        options={[
          { value: 'ssss', label: '1asfasdf' },
          { value: 'usdhfusd', label: '3asfasf' },
        ]}
        label='ssss'
        selectStyle={{
          color: 'blue',
        }}
        isMulti={true}
        onChange={(e: any) => console.log(e)}
        defaultValue={[{ value: 'ssss', label: '1asfasdf' }]}
      />
      <input
        type='text'
        className='form-control'
        onChange={(e: any) => console.log(e.target.value)}
        id='suggest'
      />
      <YMaps>
        <Map
          onLoad={(ymaps: any) => {
            console.log(ymaps);
            loadSuggest(ymaps);
          }}
          defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
          modules={['SuggestView']}
        />
      </YMaps>
    </div>
  );
};

export default OrdersPage;
