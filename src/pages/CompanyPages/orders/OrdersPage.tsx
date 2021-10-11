import DatePicker from 'components/Custom/DatePicker';
import MultiSelect from 'components/Custom/MultiSelect';
import Pagination from 'components/Custom/Pagination';
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
      <Pagination />
    </div>
  );
};

export default OrdersPage;
