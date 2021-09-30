import React, { useState } from 'react';
import {
  YMaps,
  ZoomControl,
  GeolocationControl,
  SearchControl,
  Placemark,
  Map,
} from 'react-yandex-maps';

const YandexMap = () => {
  const [coords, setCoords] = useState([]);

  const handleOnClick = (e: any) => {
    const coords = e.get('coords');
    const place = e.get('name');
    console.log(e.get('coords'));
    setCoords(coords);
  };

  // const handleLoad = (ymaps: any) => {
  //   const suggestView = new ymaps.SuggestView('maplocation');
  // };
  return (
    <YMaps
      query={{
        load: 'Map,control.GeolocationControl',
        apikey: '6f33a62b-bf0f-4218-9613-374e77d830ab',
      }}
    >
      <Map
        style={{
          width: '100%',
          height: '100%',
        }}
        defaultState={{ center: [41.311081, 69.240562], zoom: 11 }}
        onClick={handleOnClick}
        // modules={['SuggestView']}
        // onLoad={handleLoad}
      >
        {coords ? <Placemark geometry={coords} /> : null}
        <ZoomControl options={{ float: 'right' }} />
        <GeolocationControl />
        <SearchControl options={{ noPlacemark: true }} />
      </Map>
    </YMaps>
  );
};

export default YandexMap;
