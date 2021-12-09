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
  rate?: { avg?: number; count?: number; downVal?: number; upVal?: number };
  total?: boolean;
}

const Grade = ({ title, rate, total }: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  return (
    <Container>
      <Title>{title}</Title>
      {rate?.avg !== 0 ||
      rate?.count !== 0 ||
      rate?.downVal !== 0 ||
      rate?.upVal !== 0 ? (
        width > 600 ? null : total ? null : (
          <PercentInfo>
            <LineIcon />
            {rate?.downVal === 0 ? `+${rate?.upVal}%` : `-${rate?.downVal}%`}
          </PercentInfo>
        )
      ) : null}
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
            {/* {width > 600 ? (
              total ? null : (
                <PercentInfo>
                  <LineIcon />
                  {rate?.downVal === 0
                    ? `+${rate?.upVal}%`
                    : `-${rate?.downVal}%`}
                </PercentInfo>
              )
            ) : null} */}
          </>
        ) : (
          <Text>{t('nobodydidnotevaluate')}</Text>
        )}
      </Wrapper>
    </Container>
  );
};

export default Grade;
