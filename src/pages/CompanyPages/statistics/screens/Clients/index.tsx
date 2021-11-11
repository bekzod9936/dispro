import { useEffect, useState } from 'react';
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
import DatePcker from 'components/Custom/DatePicker';
import { numberWith } from 'services/utils';
import { useAppSelector } from 'services/redux/hooks';
import InputFormat from 'components/Custom/InputFormat';

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
  const data = useAppSelector((state) => state.statistics.clientStats);
  const [genderTypeId, setGenderTypeId] = useState('');
  const [traffic, setTraffic] = useState('');
  const [status, setStatus] = useState<any[]>([]);
  const [filterValues, setFilterValues] = useState(intialState);
  const [regDate, setRegDate] = useState(intialReg);
  const [purchase, setPurchase] = useState(intialPur);
  const [allPurchaseSum, setAllPurchaseSum] = useState('');
  const { response, isFetching, setIsFetching, resChart } = useClientsHook({
    filterValues,
    traffic,
  });
  const [errorPurchase, setErrorPurchase] = useState(false);
  const [usedLevel, setUsedLevel] = useState<any[]>([]);
  const [radioValue, setRadioValue] = useState<any>();

  useEffect(() => {
    const newStatus: any = data?.filter?.levels?.map((v: any) => {
      const check = usedLevel?.find((i: any) => {
        if (i?.number === v?.number) {
          return true;
        } else {
          return false;
        }
      });
      return {
        number: v.number,
        [v.name]: check?.[check?.name],
        label: v.name,
        name: v.name,
      };
    });

    setStatus(newStatus);
  }, [data]);

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

  useEffect(() => {
    const arrFilter = status?.filter((i: any) => i?.[i.name] === true);
    setUsedLevel(arrFilter);
  }, [status]);

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
          <InputFormat
            label={t('enter_number')}
            value={purchase.purchaseCountFrom}
            IconStart={<WrapPlaceHolder>{t('from')}</WrapPlaceHolder>}
            width={{
              maxwidth: 200,
            }}
            inputStyle={{
              inpadding: '0 10px',
            }}
            min={9}
            onChange={(e: any) => {
              setPurchase({ ...purchase, purchaseCountFrom: e.target.value });
            }}
          />
          <InputFormat
            label={t('enter_number')}
            margin={{ laptop: '0 0 0 15px' }}
            IconStart={<WrapPlaceHolder>{t('to')}</WrapPlaceHolder>}
            width={{
              maxwidth: 200,
            }}
            inputStyle={{
              inpadding: '0 10px',
            }}
            min={9}
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
            {status?.map((v: any) => (
              <CheckBox
                key={v.label}
                label={v.label}
                checked={v?.[v?.name]}
                name={v.name}
                onChange={(e: any) => {
                  const arr = status?.map((i: any) => {
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
          flexDirection='row'
          list={data?.filter?.referal?.map((v: any) => {
            return { value: v.refIds.join(','), label: v.name };
          })}
          title={t('chose_trafic_provider')}
          onChange={(v: any) => {
            let newS = '';
            v?.value?.forEach(
              (v: any, i: any) => (newS = newS + `refIdsB%5B${i + 1}%5D=${v}&`)
            );
            setTraffic(newS);

            setRadioValue(v);
          }}
          value={radioValue}
        />
      ),
    },
  ];

  const handleFilterSubmit = async ({ startDate = '', endDate = '' }) => {
    await setFilterValues({
      genderTypeId: genderTypeId,
      regDateFrom: regDate.regDateFrom,
      regDateTo: regDate.regDateTo,
      purchaseCountFrom: purchase.purchaseCountFrom,
      purchaseCountTo: purchase.purchaseCountTo,
      allPurchaseSum: allPurchaseSum,
      startDate: startDate,
      endDate: endDate,
      usedLevelNumber: usedLevel?.map((v: any) => v.number).join(','),
    });
    await response.refetch();
  };

  const [date, setDate] = useState({ startDate: '', endDate: '' });

  const onReset = async () => {
    await setFilterValues(intialState);
    await setRegDate(intialReg);
    await setPurchase(intialPur);
    await setTraffic('');
    await setAllPurchaseSum('');
    await setUsedLevel([]);
    await setRadioValue({});
    await response.refetch();
  };

  useEffect(() => {
    handleFilterSubmit({
      startDate: date.startDate,
      endDate: date.endDate,
    });
  }, [date]);

  return (
    <MainWrapper>
      <WrapFilter>
        <Filter
          onSubmit={() => {
            setIsFetching(true);
            handleFilterSubmit({
              startDate: date.startDate,
              endDate: date.endDate,
            });
          }}
          onReset={onReset}
          list={filterList}
        />
        <DatePcker
          onChange={async (e: any) => {
            await setFilterValues({
              genderTypeId: genderTypeId,
              regDateFrom: regDate.regDateFrom,
              regDateTo: regDate.regDateTo,
              purchaseCountFrom: purchase.purchaseCountFrom,
              purchaseCountTo: purchase.purchaseCountTo,
              allPurchaseSum: allPurchaseSum,
              startDate: e.slice(0, e.indexOf(' ~')),
              endDate: e.slice(e.indexOf('~ ') + 2),
              usedLevelNumber: '',
            });
            setDate({
              startDate: e.slice(0, e.indexOf(' ~')),
              endDate: e.slice(e.indexOf('~ ') + 2),
            });
          }}
          margin='0 0 0 20px'
        />
      </WrapFilter>
      <Container>
        {response.isLoading || isFetching ? (
          <Spinner />
        ) : (
          <Wrapper>
            {list.map((v: any) => (
              <WrapInfo key={v.title}>
                <WrapIcon>{v.Icon}</WrapIcon>

                <Content>
                  <Title>{v.title}</Title>
                  <Value>{numberWith(v?.value?.toString(), ' ')}</Value>
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
