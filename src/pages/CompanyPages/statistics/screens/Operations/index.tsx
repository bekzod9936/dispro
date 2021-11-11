import { useTranslation } from 'react-i18next';
import { Container, Wrapper, WrapperCon } from './style';
import Spinner from 'components/Custom/Spinner';
import useOperationsHook from './useOperationsHook';
import Filter from 'components/Custom/Filter/index';
import {
  MoneyIcon,
  RatingIcon,
  CheckIcon,
  CashBackIcon,
  DiscountIcon,
  LaptopIcon,
  WrapInfo,
  WrapIcon,
  Content,
  Value,
  Title,
  WrapFilter,
} from '../Clients/style';
import DatePcker from 'components/Custom/DatePicker';
import { useState } from 'react';
import { numberWith, numberWithNew } from 'services/utils';
import Radio from 'components/Custom/Radio';
import { useAppSelector } from 'services/redux/hooks';

const intialState = {
  startDate: '',
  endDate: '',
  genderTypeId: '',
};

const Operations = () => {
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState(intialState);
  const [date, setDate] = useState({ startDate: '', endDate: '' });
  const [genderTypeId, setGenderTypeId] = useState('');
  const data = useAppSelector((state) => state.statistics.operations);
  const { response } = useOperationsHook({ filterValues: filterValues });

  const list = [
    {
      title: t('totalSum'),
      value: data?.chequeSum,
      Icon: <LaptopIcon />,
    },
    {
      title: t('discountSum'),
      value: data?.discountSum,
      Icon: <DiscountIcon />,
    },
    {
      title: t('cashbackSum'),
      value: data?.cashbackSum,
      Icon: <CashBackIcon />,
    },
    {
      title: t('paidWithPoint'),
      value: data?.paidWithPoint,
      Icon: <RatingIcon />,
    },
    {
      title: t('paidWithMoney'),
      value: data?.paidWithMoney,
      Icon: <MoneyIcon />,
    },
    {
      title: t('chequeAvg'),
      value: data?.chequeAvg,
      Icon: <CheckIcon />,
    },
  ];

  const handleFilterSubmit = async () => {
    await setFilterValues({
      genderTypeId: genderTypeId,
      startDate: date.startDate,
      endDate: date.endDate,
    });
    await response.refetch();
  };

  const onReset = async () => {
    await setFilterValues(intialState);
    await response.refetch();
  };

  const filterList = [
    {
      title: t('gender'),
      content: (
        <Radio
          flexDirection='row'
          list={[
            { value: '1', label: `${t('male')}` },
            { value: '2', label: `${t('female')}` },
          ]}
          title={t('chose_gender')}
          onChange={(v: any) => setGenderTypeId(v)}
          value={genderTypeId}
        />
      ),
    },
  ];

  return (
    <Container>
      <WrapFilter>
        <Filter
          onSubmit={handleFilterSubmit}
          onReset={onReset}
          list={filterList}
        />
        <DatePcker
          onChange={async (e: any) => {
            await setFilterValues({
              ...filterValues,
              startDate: e.slice(0, e.indexOf(' ~')),
              endDate: e.slice(e.indexOf('~ ') + 2),
            });
            setDate({
              startDate: e.slice(0, e.indexOf(' ~')),
              endDate: e.slice(e.indexOf('~ ') + 2),
            });
            await response.refetch();
          }}
          margin='0 0 0 20px'
        />
      </WrapFilter>
      <WrapperCon>
        {response.isLoading ? (
          <Spinner />
        ) : (
          <Wrapper>
            {list.map((v: any) => (
              <WrapInfo key={v.title}>
                <WrapIcon>{v.Icon}</WrapIcon>
                <Content>
                  <Title>{v.title}</Title>
                  <Value>{numberWithNew({ number: v?.value })}</Value>
                </Content>
              </WrapInfo>
            ))}
          </Wrapper>
        )}
      </WrapperCon>
    </Container>
  );
};

export default Operations;
