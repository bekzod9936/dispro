import { useTranslation } from 'react-i18next';

const useDayList = () => {
  const { t } = useTranslation();

  const weeks = [
    {
      day: 1,
      weekday: t('monday'),
    },
    {
      day: 2,
      weekday: t('tuesday'),
    },
    {
      day: 3,
      weekday: t('wednesday'),
    },
    {
      day: 4,
      weekday: t('thursday'),
    },
    {
      day: 5,
      weekday: t('friday'),
    },
    {
      day: 6,
      weekday: t('saturday'),
    },
    {
      day: 7,
      weekday: t('sunday'),
    },
  ];
  return { weeks };
};

export default useDayList;
