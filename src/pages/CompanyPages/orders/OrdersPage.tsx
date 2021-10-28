import NewDatePicker from 'components/Custom/DatePicker';
import { TextArea } from 'components/Custom/TextArea';
import Snack from 'components/Custom/NewSnack';
import { useState } from 'react';

const OrdersPage = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div style={{ padding: '20px' }}>
      <NewDatePicker />
      <button>ssss</button>
      <TextArea title='Label' textarea={{ resize: 'auto' }} />
      <Snack
        message='ssssssss'
        status='error'
        open={open}
        onClose={(e: any) => setOpen(e)}
      />
    </div>
  );
};

export default OrdersPage;
