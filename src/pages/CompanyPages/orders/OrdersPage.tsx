import DatePicker from 'components/Custom/DatePicker';
import MultiSelect from 'components/Custom/MultiSelect';
import { useForm } from 'react-hook-form';

interface FormProps {
  something?: string | number;
}

const OrdersPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    watch,
    reset,
  } = useForm<FormProps>({
    mode: 'onBlur',
    shouldFocusError: true,
  });

  return (
    <div style={{ padding: '20px' }}>
      <DatePicker />
      <MultiSelect
        options={[
          { value: 'ili', label: 'ili' },
          { value: 'i', label: 'i' },
        ]}
        selectStyle={{
          radius: 0,
          borderbottom: '1px solid #606EEA',
          border: 'transparent',
          bgcolor: 'transparent',
          inpadding: '2px 0',
          height: {
            laptop: 20,
            desktop: 20,
            planshet: 20,
            mobile: 20,
          },
        }}
        width={{
          maxwidth: 60,
        }}
        iconmargin='0'
        onChange={(v: any) => setValue('something', v.value)}
      />
    </div>
  );
};

export default OrdersPage;
