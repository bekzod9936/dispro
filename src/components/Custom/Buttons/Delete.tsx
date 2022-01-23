import { useTranslation } from 'react-i18next';
import { Props } from './type';
import Button from './Button';
import { DeleteIcon } from 'newassets/icons/icons';

export const DeleteButton = (props : Props) => {
  const { t } = useTranslation();

  return (
    <Button
      {...props}
      buttonStyle={{
        shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)',
        bgcolor: '#FF5E68',
        weight: 500,
        height: {
          mobile: 40,
          planshet: 45,
          laptop: 50,
          desktop: 50,
        },
      }}
   
      endIcon={<DeleteIcon /> }
    >
      {t('delete')}
    </Button>
  );
};
