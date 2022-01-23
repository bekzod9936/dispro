import Button from './Button';
import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { CancelIcon } from 'newassets/icons/icons';
import { Props } from './type';

export const CancelButton = (props: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  return (
    <Button
      {...props}
      buttonStyle={{
        color: width > 1000 ? '#223367' : '#606EEA',
        bgcolor: width > 1000 ? 'white' : '#eff0fd',
        weight: '500',
        height: {
          mobile: 40,
          planshet: 45,
          laptop: 50,
          desktop: 50,
        },
      }}
      startIcon={width > 1000 ? <CancelIcon /> : null}
      endIcon={width > 1000 ? null : <CancelIcon />}
    >
      {t('cancel')}
    </Button>
  );
};
