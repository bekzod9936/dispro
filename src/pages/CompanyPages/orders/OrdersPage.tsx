import DatePicker from 'components/Custom/DatePicker';
import Input from 'components/Custom/Input';

const OrdersPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <DatePicker />
      <Input
        width={{
          maxwidth: 140,
        }}
        type='number'
        margin={{ laptop: '0 15px 0 0' }}
        IconEnd={<div>sht</div>}
        inputStyle={{
          inpadding: '0 0 5px 2px',
          border: 'none',
          borderbottom: '1px solid #606EEA',
          bgcolor: 'transparent',
          radius: 0,
          fitheight: true,
        }}
      />
    </div>
  );
};

export default OrdersPage;
