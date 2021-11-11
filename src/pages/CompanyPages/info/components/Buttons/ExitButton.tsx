import Button from 'components/Custom/Button';
import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { CloseIcon } from './style';

interface Props {
  onClick?: () => void;
  mobile?: boolean;
  margin?: any;
}

const ExitButton = ({ onClick, mobile, margin }: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  return mobile ? (
    width < 1000 ? (
      <Button
        onClick={onClick}
        buttonStyle={{
          color: '#606EEA',
          bgcolor: 'rgba(96, 110, 234, 0.1)',
          weight: 500,
        }}
        width={{ width: 'fit-content' }}
        margin={margin}
      >
        {t('quit')}
        <CloseIcon color='#606eea' />
      </Button>
    ) : null
  ) : width > 1000 ? (
    <Button
      buttonStyle={{
        color: '#223367',
        bgcolor: 'transparent',
        weight: 500,
      }}
      onClick={onClick}
    >
      {t('logout')}
      <CloseIcon color='#223367' />
    </Button>
  ) : null;
};

export default ExitButton;
