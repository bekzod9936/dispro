//packages
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

//style
import { Wrapper } from './style';

//other
import emptyBoxImg from 'assets/images/emptyBox.png';
import Button from 'components/Custom/Buttons/Button';

interface EmptyPageProps {}

export const EmptyPage: React.FC<EmptyPageProps> = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <img src={emptyBoxImg} alt='emptyBoxImage' />
      <p>{t('youDontHaveProductsYet')}</p>
      <Link to='/services/create'>
        <Button>{t('add')}</Button>
      </Link>
    </Wrapper>
  );
};
