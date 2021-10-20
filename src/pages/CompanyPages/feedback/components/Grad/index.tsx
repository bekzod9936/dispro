import { useTranslation } from 'react-i18next';
import { Container, Title, Text } from './style';

const Grad = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t('overallscore')}</Title>
      <Text>{t('nobodydidnotevaluate')}</Text>
    </Container>
  );
};

export default Grad;
