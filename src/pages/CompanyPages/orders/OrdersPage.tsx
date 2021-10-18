import NewDatePicker from 'components/Custom/DatePicker';
import { TextArea } from "components/Custom/TextArea"
import React from 'react';

const OrdersPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <NewDatePicker />
      <TextArea title="Label" textarea={{resize: "auto"}}/>
    </div>
  );
};

export default OrdersPage;
