import NewDatePicker from 'components/Custom/DatePicker';
import { TextArea } from 'components/Custom/TextArea';
import Snack from 'components/Custom/NewSnack';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputFormat from 'components/Custom/InputFormat';

interface IProps {
  count: any;
}
const OrdersPage = () => {
  const { setValue, control, handleSubmit } = useForm<IProps>();
  const [open, setOpen] = useState<boolean>(true);

  const onSave = (data: IProps) => {
    console.log(data);
  };

  useEffect(() => {
    setValue('count', '1232');
  }, []);
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
      <form>
        <label htmlFor='appt-time'>
          Choose an appointment time (opening hours 12:00 to 18:00):{' '}
        </label>
        <input
          id='appt-time'
          type='time'
          name='appt-time'
          min='12:00'
          max='18:00'
        />
        <span className='validity'></span>
      </form>

      <form onSubmit={handleSubmit(onSave)}>
        <Controller
          name='count'
          control={control}
          render={({ field }) => {
            return <InputFormat max='1300' type='string' field={field} />;
          }}
        />
      </form>
    </div>
  );
};

export default OrdersPage;
