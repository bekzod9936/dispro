import { IProps, FormProps } from './types';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  Content,
  ContentHead,
  ContentBody,
  HeadText,
  Text,
  ContentRow,
  BallText,
  SecondText,
  Form,
  ActDiv,
  FormCol,
} from './style';
import { numberWith } from 'services/utils';
import InputFormat from 'components/Custom/InputFormat';
import Button from 'components/Custom/Buttons/Button';
import { DownloadIcon } from 'assets/icons/SettingsIcons/SettingsPageIcon';
import useCashierCard from '../../hooks/useCashierCard';
import { useAppSelector } from 'services/redux/hooks';

const CashierBalls = ({ ballCount = 0 }: IProps) => {
  const { resetPoint } = useCashierCard();
  const cashierId = useAppSelector((state) => state.staffs.cashierId);
  const { staffData, cashiers } = useAppSelector((state) => state.staffs);
  console.log(`staffData`, staffData);
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<FormProps>({
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  const onSave = (data: FormProps) => {
    resetPoint.mutate({
      pointValue: +data.ballAmount,
      cashierStaffId: +cashierId,
      cashierUserId: staffData?.cashierUserId,
    });
  };

  return (
    <Container>
      <Content>
        <ContentHead>
          <HeadText>Остаток</HeadText>
          <Text>Накоплено</Text>
          <Text>Списано</Text>
        </ContentHead>
        <ContentBody>
          <ContentRow>
            <BallText>{numberWith(ballCount, ' ')}</BallText>
            <SecondText>0</SecondText>
            <SecondText>0</SecondText>
          </ContentRow>
          <ContentRow>
            <Form onSubmit={handleSubmit(onSave)}>
              <FormCol>
                <Controller
                  name='ballAmount'
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => {
                    return (
                      <InputFormat
                        label={'Колличество баллов'}
                        type='string'
                        field={field}
                        max={parseInt(ballCount).toString()}
                        fullWidth={true}
                        width={{
                          width: '100%',
                        }}
                        margin={{
                          laptop: '30px 0 0',
                        }}
                        error={errors.ballAmount}
                      />
                    );
                  }}
                />
              </FormCol>
              <ActDiv>
                <Button
                  disabled={!isValid || resetPoint.isLoading}
                  startIcon={<DownloadIcon />}
                  type='submit'
                >
                  Списать баллы
                </Button>
              </ActDiv>
            </Form>
          </ContentRow>
        </ContentBody>
      </Content>
    </Container>
  );
};

export default CashierBalls;
