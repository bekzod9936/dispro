import Button from 'components/Custom/Buttons/Button';
import { useTranslation } from 'react-i18next';
import { SaveIcon } from './style';
import useWindowWidth from 'services/hooks/useWindowWidth';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  margin?: any;
  type?: 'button' | 'submit' | 'reset';
}

const SaveButton = ({
  onClick = () => {},
  margin,
  disabled,
  type = 'submit',
}: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  return (
    <Button
      type={type}
      buttonStyle={{
        shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
        weight: 500,
        height: {
          mobile: 40,
          planshet: 45,
          laptop: 50,
          desktop: 50,
        },
      }}
      margin={margin}
      onClick={onClick}
      startIcon={width > 1000 ? <SaveIcon /> : null}
      endIcon={width < 1000 ? <SaveIcon /> : null}
      disabled={disabled}
    >
      {t('save')}
    </Button>
  );
};

export default SaveButton;
