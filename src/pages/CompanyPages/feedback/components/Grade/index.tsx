import { useTranslation } from 'react-i18next';
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
  rate?: { avg?: number; count?: number; downVal?: number; upVal?: number };
  total?: boolean;
}

const Grade = ({ title, rate, total }: Props) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{title}</Title>
      <Wrapper>
        {rate?.avg !== 0 ||
        rate?.count !== 0 ||
        rate?.downVal !== 0 ||
        rate?.upVal !== 0 ? (
          <>
            <PercentWrap total={total}>
              {rate ? (
                <PercentNum>{!total ? rate?.avg : rate?.count}</PercentNum>
              ) : null}
              {rate && !total ? <PercentDef>/5</PercentDef> : null}
            </PercentWrap>
            {total ? null : (
              <PercentInfo>
                <LineIcon />
                {rate?.downVal === 0
                  ? `+${rate?.upVal}%`
                  : `-${rate?.downVal}%`}
              </PercentInfo>
            )}
          </>
        ) : (
          <Text>{t('nobodydidnotevaluate')}</Text>
        )}
      </Wrapper>
    </Container>
  );
};

export default Grade;
