import Button from 'components/Custom/Button';
import { CancelIcon } from './style';
import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';

interface Props {
  onClick?: () => void;
  mobile?: boolean;
  margin?: any;
}

const CancelButton = ({ onClick = () => {}, mobile, margin }: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  return width > 1000 ? (
    <Button
      buttonStyle={{
        color: '#223367',
        bgcolor: 'white',
        weight: '500',
        height: {
          mobile: 40,
          planshet: 45,
          laptop: 50,
          desktop: 50,
        },
      }}
      onClick={onClick}
      margin={{ laptop: '0 15px 0 0' }}
    >
      <CancelIcon />
      {t('cancel')}
    </Button>
  ) : (
    <Button
      buttonStyle={{
        color: '#606EEA',
        bgcolor: '#eff0fd',
        weight: '500',
        height: {
          mobile: 40,
          planshet: 45,
          laptop: 50,
          desktop: 50,
        },
      }}
      onClick={onClick}
      margin={{ mobile: '0 10px 0 0', planshet: '0 10px 0 0' }}
    >
      {t('cancel')}
      <CancelIcon />
    </Button>
  );
};

export default CancelButton;
