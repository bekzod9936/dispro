import { useState } from 'react';
import Spinner from 'components/Custom/Spinner';
import useClientsHook from './useClientsHook';
import { numberWithNew } from 'services/utils';
import Chart from './components/Chart';
import FilterClients from './components/FilterClients';
import {
  Container,
  Wrapper,
  MainWrapper,
  WrapMobile,
  WrapDesktop,
} from './style';
import { WrapInfo, Title, Value, Content } from '../../style';

interface Props {
  startDate?: string;
  endDate?: string;
  regDateFrom?: string;
  regDateTo?: string;
  genderTypeId?: string | number;
  purchaseCountFrom?: string;
  purchaseCountTo?: string;
  allPurchaseSum?: string;
  usedLevelNumber?: string;
  storeIds?: string;
  traffic?: string;
}

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
  refIds: '',
};

const Clients = () => {
  const [filterValues, setFilterValues] = useState<Props>(intialState);
  const { response, list, status, setStatus, setUsedLevel, usedLevel } =
    useClientsHook({
      filterValues,
    });

  return (
    <MainWrapper>
      <div>
        <FilterClients
          response={response}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          intialState={intialState}
          status={status}
          setStatus={setStatus}
          setUsedLevel={setUsedLevel}
          usedLevel={usedLevel}
        />
        <WrapDesktop>
          <Chart />
        </WrapDesktop>
        <Container>
          {response.isLoading || response.isFetching ? (
            <Spinner />
          ) : (
            <>
              <Wrapper>
                {list.map((v: any) => (
                  <WrapInfo key={v.title}>
                    <div>{v.Icon}</div>
                    <Content>
                      <Title>{v.title}</Title>
                      <Value>{numberWithNew({ number: v?.value })}</Value>
                    </Content>
                  </WrapInfo>
                ))}
              </Wrapper>
              <WrapMobile>
                <Chart />
              </WrapMobile>
            </>
          )}
        </Container>
      </div>
    </MainWrapper>
  );
};

export default Clients;
