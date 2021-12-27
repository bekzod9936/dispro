import { SaveButton } from 'components/Custom/Buttons/Save';
import CustomToggle from 'components/Custom/CustomToggleSwitch';
import { useTranslation } from 'react-i18next';
import useSecurty from './useSecurty';
import { Container, Form, WrapSwitch, Title, Text } from './style';
import { useAppSelector } from 'services/redux/hooks';
import InputFormat from 'components/Custom/InputFormat';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';

interface IForm {
  enablepurchase?: boolean;
  limit?: number;
}

const Security = () => {
  const { t } = useTranslation();
  const { response, putSecurity } = useSecurty();
  const { control, handleSubmit, setValue, getValues } = useForm<IForm>();

  const showSwitch = useWatch({ control, name: 'enablepurchase' });

  const data = useAppSelector((state) => state.newsetting.security);

  useEffect(() => {
    setValue('enablepurchase', data?.isEnabledPurchaseLimit);
    setValue('limit', data?.safeties?.daily_purchase_limit);
  }, [data]);

  const handleSave = () => {
    const values: any = {
      isEnabledPaySumLimit: data?.isEnabledPaySumLimit,
      isEnabledPurchaseLimit: getValues('enablepurchase'),
      safeties: {
        daily_purchase_limit: Number(getValues('limit')),
        pay_sum_limit: data?.safeties?.pay_sum_limit,
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
              render={({ field }) => {
                return <CustomToggle checked={field.value} {...field} />;
              }}
            />
          </WrapSwitch>
          <Text>{t('toomanypurchases')}</Text>
          {showSwitch && (
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
          )}
        </div>
        <SaveButton disabled={putSecurity.isLoading || response.isLoading} />
      </Form>
    </Container>
  );
};
export default Security;
