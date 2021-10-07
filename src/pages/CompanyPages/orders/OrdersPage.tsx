import React from 'react';
import { Map, YMaps } from 'react-yandex-maps';

const OrdersPage = () => {
  const defaultToshkentAddress = [41.32847446609404, 69.24298268717716];
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
        options={{
          suppressMapOpenBlock: true,
        }}
        defaultState={{
          center: defaultToshkentAddress,
          zoom: 11,
        }}
      />
    </YMaps>
  );
};

export default OrdersPage;
