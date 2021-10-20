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
  rate?: number | string;
  total?: number | string;
  percent?: number | string;
}

const Grade = ({ title, rate, total, percent }: Props) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{title}</Title>
      <Wrapper>
        {rate || total || percent ? (
          <>
            <PercentWrap>
              {rate || total ? <PercentNum>{rate || total}</PercentNum> : null}
              {rate ? <PercentDef>/5</PercentDef> : null}
            </PercentWrap>
            <PercentInfo>
              <LineIcon />
              {percent}
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
