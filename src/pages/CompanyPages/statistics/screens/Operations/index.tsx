import Spinner from 'components/Custom/Spinner';
import useOperationsHook from './useOperationsHook';
import { numberWithNew } from 'services/utils';
import FilterOperations from './components/FilterOperations';
import { Container, Wrapper, WrapperCon } from './style';
import { WrapInfo, Title, Value, Content } from '../../style';
import { useState } from 'react';
interface Props {
  startDate?: string;
  endDate?: string;
  genderTypeId?: string | number;
}

const intialState = {
  startDate: '',
  endDate: '',
  genderTypeId: '',
};

const Operations = () => {
  const [filterValues, setFilterValues] = useState<Props>(intialState);

  const { response, list } = useOperationsHook({ filterValues: filterValues });

  return (
    <Container>
      <FilterOperations
        setFilterValues={setFilterValues}
        filterValues={filterValues}
        intialState={intialState}
      />
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
