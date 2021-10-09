import { useState } from 'react';
import Spinner from 'components/Custom/Spinner';
import { useTranslation } from 'react-i18next';
import useClientsHook from './useClientsHook';
import Filter from 'components/Custom/Filter/index';
import Radio from 'components/Custom/Radio';
import CheckBox from 'components/Custom/CheckBox';
import Input from 'components/Custom/Input';
import {
  Container,
  AgeIcon,
  CartIcon,
  CashBackIcon,
  CheckIcon,
  CouponIcon,
  DiscountIcon,
  ManIcon,
  WomanIcon,
  MoneyIcon,
  RatingIcon,
  ScoreIcon,
  SertificateIcon,
  UsersIcon,
  CalendarIcon,
  Title,
  Value,
  Content,
  WrapInfo,
  Wrapper,
  WrapIcon,
  MainWrapper,
  WrapFilter,
  Label,
  WrapStatus,
  WrapCheck,
  WrapPlaceHolder,
  WrapDate,
  WrapInputs,
} from './style';

const intialState = {
  startDate: '',
  endDate: '',
  regDateFrom: '',
  regDateTo: '',
  genderTypeId: '',
  purchaseCountFrom: '',
  purchaseCountTo: '',
  allPurchaseSum: '',
  usedLevelNumber: '',
};

const intialReg = { regDateFrom: '', regDateTo: '' };

const intialPur = { purchaseCountFrom: '', purchaseCountTo: '' };

const Clients = () => {
  const { t } = useTranslation();
  const [genderTypeId, setGenderTypeId] = useState('');
  const [traffic, setTraffic] = useState('');
  const [status, setStatus] = useState([
    { Base: false, label: 'Base', name: 'Base' },
    { Silver: false, label: 'Silver', name: 'Silver' },
    { Gold: false, label: 'Gold', name: 'Gold' },
    { Platinum: false, label: 'Platinum', name: 'Platinum' },
  ]);
  const [filterValues, setFilterValues] = useState(intialState);
  const [regDate, setRegDate] = useState(intialReg);
  const [purchase, setPurchase] = useState(intialPur);
  const [allPurchaseSum, setAllPurchaseSum] = useState('');
  const { response, data } = useClientsHook({ filterValues });

  const list = [
    {
      title: t('totalClients'),
      value: data?.clientCount,
      Icon: <UsersIcon />,
    },
    {
      title: t('maleCount'),
      value: data?.maleCount,
      Icon: <ManIcon />,
    },
    {
      title: t('femaleCount'),
      value: data?.femaleCount,
      Icon: <WomanIcon />,
    },
    {
      title: t('ageAvg'),
      value: data?.ageAvg,
      Icon: <AgeIcon />,
    },
    {
      title: t('uniqueChequeClient'),
      value: data?.uniqueChequeClient,
      Icon: <CalendarIcon />,
    },
    {
      title: t('chequeCount'),
      value: data?.chequeCount,
      Icon: <CartIcon />,
    },
    {
      title: t('paidWithMoney'),
      value: data?.paidWithMoney,
      Icon: <MoneyIcon />,
    },
    {
      title: t('paidWithPoint'),
      value: data?.paidWithPoint,
      Icon: <RatingIcon />,
    },
    {
      title: t('pointSum'),
      value: data?.pointSum,
      Icon: <ScoreIcon />,
    },
    {
      title: t('chequeAvg'),
      value: data?.chequeAvg,
      Icon: <CheckIcon />,
    },
    {
      title: t('cashbackSum'),
      value: data?.cashbackSum,
      Icon: <CashBackIcon />,
    },
    {
      title: t('discountSum'),
      value: data?.discountSum,
      Icon: <DiscountIcon />,
    },
    {
      title: t('couponAmountSum'),
      value: data?.couponAmountSum,
      Icon: <SertificateIcon />,
    },
    {
      title: t('couponDiscountSum'),
      value: data?.couponDiscountSum,
      Icon: <CouponIcon />,
    },
  ];

  const filterList = [
    {
      title: t('gender'),
      content: (
        <Radio
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
    {
      title: t('registration_date'),
      content: (
        <WrapInputs>
          <Label>{t('chose_date')}</Label>
          <div>
            <Input
              type='date'
              width={{
                maxwidth: 200,
              }}
              IconStart={<WrapDate>{t('from')}</WrapDate>}
              inputStyle={{
                inpadding: '0 10px 0 0',
              }}
              value={regDate.regDateFrom}
              onChange={(e: any) =>
                setRegDate({ ...regDate, regDateFrom: e.target.value })
              }
            />
            <Input
              type='date'
              width={{
                maxwidth: 200,
              }}
              margin={{ laptop: '0 0 0 15px' }}
              IconStart={<WrapDate>{t('to')}</WrapDate>}
              inputStyle={{
                inpadding: '0 10px 0 0',
              }}
              value={regDate.regDateTo}
              onChange={(e: any) =>
                setRegDate({ ...regDate, regDateTo: e.target.value })
              }
            />
          </div>
        </WrapInputs>
      ),
    },
    {
      title: t('purchuase_amount'),
      content: (
        <>
          <Input
            label={t('enter_amount')}
            IconStart={<WrapPlaceHolder>{t('from')}</WrapPlaceHolder>}
            width={{
              maxwidth: 200,
            }}
            inputStyle={{
              inpadding: '0 10px',
            }}
            type='number'
            value={purchase.purchaseCountFrom}
            onChange={(e: any) =>
              setPurchase({ ...purchase, purchaseCountFrom: e.target.value })
            }
          />
          <Input
            label={t('enter_amount')}
            margin={{ laptop: '0 0 0 15px' }}
            IconStart={<WrapPlaceHolder>{t('to')}</WrapPlaceHolder>}
            width={{
              maxwidth: 200,
            }}
            inputStyle={{
              inpadding: '0 10px',
            }}
            type='number'
            value={purchase.purchaseCountTo}
            onChange={(e: any) =>
              setPurchase({ ...purchase, purchaseCountTo: e.target.value })
            }
          />
        </>
      ),
    },
    {
      title: t('purchuase_cost'),
      content: (
        <Input
          placeholder={t('notless')}
          onChange={(e: any) => setAllPurchaseSum(e.target.value)}
          type='number'
          label={t('enter_amount')}
          value={allPurchaseSum}
        />
      ),
    },
    {
      title: t('status'),
      content: (
        <WrapStatus>
          <Label>{t('chose_status')}</Label>
          <WrapCheck>
            {status.map((v: any) => (
              <CheckBox
                key={v.label}
                label={v.label}
                checked={v.status}
                onChange={(e: any) => {
                  const arr = status.map((i: any) => {
                    if (i.name === e.target.name) {
                      return { ...i, [e.target.name]: e.target.checked };
                    } else {
                      return i;
                    }
                  });
                  setStatus(arr);
                }}
              />
            ))}
          </WrapCheck>
        </WrapStatus>
      ),
    },
    {
      title: t('traffic_provider'),
      content: (
        <Radio
          list={[
            { value: '1', label: 'App' },
            { value: '2', label: 'Mobile' },
            { value: '3', label: 'Cashier' },
          ]}
          title={t('chose_trafic_provider')}
          onChange={(v: any) => setTraffic(v)}
          value={traffic}
        />
      ),
    },
  ];

  const handleFilterSubmit = async () => {
    await setFilterValues({
      genderTypeId: genderTypeId,
      regDateFrom: regDate.regDateFrom,
      regDateTo: regDate.regDateTo,
      purchaseCountFrom: purchase.purchaseCountFrom,
      purchaseCountTo: purchase.purchaseCountTo,
      allPurchaseSum: allPurchaseSum,
      startDate: '',
      endDate: '',
      usedLevelNumber: '',
    });
    await response.refetch();
  };

  const onReset = async () => {
    await setFilterValues(intialState);
    await setRegDate(intialReg);
    await setPurchase(intialPur);
    await setAllPurchaseSum('');
    await response.refetch();
  };

  return (
    <MainWrapper>
      <WrapFilter>
        <Filter
          onSubmit={handleFilterSubmit}
          onReset={onReset}
          list={filterList}
        />
      </WrapFilter>
      <Container>
        {response.isLoading || response.isFetching ? (
          <Spinner />
        ) : (
          <Wrapper>
            {list.map((v: any) => (
              <WrapInfo key={v.title}>
                <WrapIcon>{v.Icon}</WrapIcon>

                <Content>
                  <Title>{v.title}</Title>
                  <Value>{v.value}</Value>
                </Content>
              </WrapInfo>
            ))}
          </Wrapper>
        )}
      </Container>
    </MainWrapper>
  );
};

export default Clients;
