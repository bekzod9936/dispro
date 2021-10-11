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
  onClickPlaceMark?: (e: any) => void;
  onClickLocation?: (e: any) => void;
}

const YandexMap = ({
  onBoundsChange,
  handleRef = () => {},
  place,
  onClickPlaceMark = () => {},
}: Props) => {
  const defaultToshkentAddress = [41.32847446609404, 69.24298268717716];

  const handlePlaceMark = (e: any) => {
    onClickPlaceMark(e);
  };

  return (
    <YMaps
      query={{
        ns: 'use-load-option',
        apikey: 'af28acb6-4b1c-4cd1-8251-b2f67a908cac',
        load: 'package.full',
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
        instanceRef={(ref: any) => {
          handleRef(ref);
        }}
        onBoundsChange={onBoundsChange}
        onClick={handlePlaceMark}
      >
        {place?.length !== 0 ? <Placemark geometry={place} /> : null}
        <ZoomControl options={{ float: 'right' }} />
      </Map>
    </YMaps>
  );
};

export default YandexMap;
