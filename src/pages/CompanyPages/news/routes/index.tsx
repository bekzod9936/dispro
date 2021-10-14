import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

const ActiveNews = lazy(() => import('../screens/ActiveNews'));
const NewsArchive = lazy(() => import('../screens/NewsArchive'));
const Pending = lazy(() => import('../screens/Pending'));

interface IFinanceRow {
  path: string;
  text: string;
  component: any;
}

const useFinanceRoute = () => {
  const { t } = useTranslation();
  const menuItems: IFinanceRow[] = [
    {
      path: '/news',
      text: t('active_news'),
      component: ActiveNews,
    },
    {
      path: '/news/newsArchive',
      text: t('news_archive'),
      component: NewsArchive,
    },
    {
      path: '/news/Pending',
      text: t('in_pending'),
      component: Pending,
    },
  ];

  return { menuItems };
};

export default useFinanceRoute;

