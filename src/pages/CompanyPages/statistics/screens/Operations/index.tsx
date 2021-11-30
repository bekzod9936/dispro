import Spinner from 'components/Custom/Spinner';
import useOperationsHook from './useOperationsHook';
import { numberWithNew } from 'services/utils';
import FilterOperations from './components/FilterOperations';
import { Container, Wrapper, WrapperCon } from './style';
import { WrapInfo, WrapFilter, Title, Value, Content } from '../../style';

const Operations = () => {
  const { response, list } = useOperationsHook({});

  return (
    <Container>
      <WrapFilter>
        <FilterOperations />
      </WrapFilter>
      <WrapperCon>
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
      </WrapperCon>
    </Container>
  );
};

export default Operations;
