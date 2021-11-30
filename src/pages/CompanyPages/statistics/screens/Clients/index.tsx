import Spinner from 'components/Custom/Spinner';
import useClientsHook from './useClientsHook';
import { numberWithNew } from 'services/utils';
import Chart from './components/Chart';
import FilterClients from './components/FilterClients';
import { Container, Wrapper, MainWrapper } from './style';
import { WrapInfo, WrapFilter, Title, Value, Content } from '../../style';

const Clients = () => {
  const { response, list } = useClientsHook({});
  return (
    <MainWrapper>
      <WrapFilter>
        <FilterClients />
      </WrapFilter>
      <Chart />
      <Container>
        {response.isLoading || response.isFetching ? (
          <Spinner />
        ) : (
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
        )}
      </Container>
    </MainWrapper>
  );
};

export default Clients;
