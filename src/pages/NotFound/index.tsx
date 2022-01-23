import Button from 'components/Custom/Buttons/Button';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Wrapper } from './style';

const NotFound = () => {
  const history = useHistory();
  const { t } = useTranslation();
  console.log('something wrond there');
  return (
    <Wrapper>
      Нет таких экран
      <Button
        onClick={() => {
          history.push('/statistics/clients');
        }}
      >
        {t('back')}
      </Button>
    </Wrapper>
  );
};

export default NotFound;
