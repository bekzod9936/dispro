import { SaveButton } from 'components/Custom/Buttons/Save';
import CustomToggle from 'components/Custom/CustomToggleSwitch';
import { useTranslation } from 'react-i18next';
import useSecurty from './useSecurty';
import { Container, Form, WrapSwitch, Title, Text } from './style';
import { useAppSelector } from 'services/redux/hooks';
import InputFormat from 'components/Custom/InputFormat';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';


interface IForm {
  enablepurchase?: boolean;
  limit?: number;
}

const Security = () => {
  const { t } = useTranslation();
  const { response, putSecurity } = useSecurty();
  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<IForm>();
  const [showSwitch, setShowSwitch] = useState(false);

  const data = useAppSelector((state) => state.newsetting);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.enablepurchase) {
        setShowSwitch(true);
      } else {
        setShowSwitch(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch(['enablepurchase'])]);

  useEffect(() => {
    setValue('enablepurchase', data.security?.isEnabledPurchaseLimit);
    setValue('limit', data.security?.safeties?.daily_purchase_limit);
  }, [data]);

  const handleSave = () => {
    const values: any = {
      isEnabledPaySumLimit: data.security?.isEnabledPaySumLimit,
      isEnabledPurchaseLimit: getValues('enablepurchase'),
      safeties: {
        daily_purchase_limit: Number(getValues('limit')),
        pay_sum_limit: data.security?.safeties?.pay_sum_limit,
      },
    };
    putSecurity.mutate(values);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleSave)}>
        <div>
          <WrapSwitch>
            <Title>{t('suspiciouscustomers')}</Title>
            <Controller
              name='enablepurchase'
              control={control}
              defaultValue={data.security?.isEnabledPurchaseLimit}
              render={({ field }) => {
                return <CustomToggle checked={field.value} {...field} />;
              }}
            />
          </WrapSwitch>
          <Text>{t('toomanypurchases')}</Text>
          {showSwitch ? (
            <Controller
              name='limit'
              control={control}
              render={({ field }) => {
                return (
                  <InputFormat
                    field={field}
                    label={t('operations_per_day')}
                    maxLength={11}
                    width={{ maxwidth: 300 }}
                  />
                );
              }}
            />
          ) : null}
        </div>
        <SaveButton disabled={putSecurity.isLoading || response.isLoading} />
      </Form>
    </Container>
  );
};
export default Security;
