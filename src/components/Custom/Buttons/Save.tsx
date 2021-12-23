import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { Props } from './type';
import Button from './Button';
import { SaveIcon } from 'newassets/icons/icons';

export const SaveButton = ({ type = 'submit', ...props }: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  return (
    <Button
      {...props}
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
      startIcon={width > 1000 ? <SaveIcon /> : null}
      endIcon={width < 1000 ? <SaveIcon /> : null}
      type='submit'
    >
      {t('save')}
    </Button>
  );
};
