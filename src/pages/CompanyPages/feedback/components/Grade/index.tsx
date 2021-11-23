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
  total?: number | string;
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
        rate?.upVal ||
        total ? (
          <>
            <PercentWrap>
              {rate || total ? (
                <PercentNum>{rate?.avg || total}</PercentNum>
              ) : null}
              {rate ? <PercentDef>/5</PercentDef> : null}
            </PercentWrap>
            <PercentInfo>
              <LineIcon />
              {rate?.downVal === 0 ? `+${rate?.upVal}%` : `-${rate?.downVal}%`}
            </PercentInfo>
          </>
        ) : (
          <Text>{t('nobodydidnotevaluate')}</Text>
        )}
      </Wrapper>
    </Container>
  );
};

export default Grade;
