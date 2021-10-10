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

  const options = [
    { value: 'ili', label: 'ili' },
    { value: 'i', label: 'i' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <DatePicker />
      <MultiSelect
        options={options}
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
        defaultValue={options[0]}
      />
    </div>
  );
};

export default OrdersPage;
