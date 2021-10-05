import React from 'react';
import {
  YMaps,
  ZoomControl,
  GeolocationControl,
  Placemark,
  Map,
} from 'react-yandex-maps';
interface Props {
  onBoundsChange?: any;
  handleRef?: (e: any) => void;
  place?: any;
  onClick?: (e: any) => void;
}
const YandexMap = ({
  onBoundsChange,
  handleRef = () => {},
  place,
  onClick = () => {},
}: Props) => {
  const defaultToshkentAddress = [41.32847446609404, 69.24298268717716];

  const handleOnClick = (e: any) => {
    onClick(e);
  };
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
        defaultState={{
          center: defaultToshkentAddress,
          zoom: 11,
        }}
        instanceRef={(ref: any) => handleRef(ref)}
        onBoundsChange={onBoundsChange}
        onClick={handleOnClick}
        onLoad={(ymaps: any) => console.log(ymaps)}
      >
        {place?.length !== 0 ? (
          <Placemark
            geometry={place}
            properties={{ balloonContentBody: 'Test 6' }}
          />
        ) : null}
        <ZoomControl options={{ float: 'right' }} />
        <GeolocationControl />
      </Map>
    </YMaps>
  );
};

export default YandexMap;
