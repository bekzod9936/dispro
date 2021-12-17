import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import {
  Container,
  Title,
  Text,
  Wrapper,
  PercentInfo,
  LineIcon,
  PercentNum,
  PercentDef,
  PercentWrap,
} from './style';

interface Props {
  title?: string;
  rate?: any;
  total?: boolean;
}

const Grade = ({ title, rate, total }: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const percent = () => {
    if (rate?.avg !== null) {
      if (width < 600) {
        if (!total) {
          return (
            <PercentInfo bgcolor={rate?.downVal === 0}>
              <LineIcon up={rate?.downVal === 0} />
              {rate?.downVal === 0 ? `+${rate?.upVal}%` : `-${rate?.downVal}%`}
            </PercentInfo>
          );
        }
      }
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      {percent()}
      <Wrapper total={total}>
        {rate?.avg === null || rate?.count === undefined ? (
          <Text>{t('nobodydidnotevaluate')}</Text>
        ) : (
          <>
            <PercentWrap total={total}>
              <PercentNum>{!total ? rate?.avg : rate?.count}</PercentNum>
              {!total ? <PercentDef>/5</PercentDef> : null}
            </PercentWrap>
            {width > 600 ? (
              total ? null : (
                <PercentInfo bgcolor={rate?.downVal === 0}>
                  <LineIcon up={rate?.downVal === 0} />
                  {rate?.downVal === 0 && rate?.upVal === 0
                    ? '0%'
                    : rate?.downVal === 0
                    ? `+${rate?.upVal}%`
                    : `-${rate?.downVal}%`}
                </PercentInfo>
              )
            ) : null}
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Grade;
