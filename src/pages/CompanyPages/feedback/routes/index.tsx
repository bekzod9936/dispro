import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

const Posts = lazy(() => import('../screens/Posts'));

interface IFeedbackRow {
  path: string;
  text: string;
  component: any;
}

const useFeedBackRoute = () => {
  const { t } = useTranslation();
  const menuItems: IFeedbackRow[] = [
    {
      path: '/feedback/reviews',
      text: t('feedbacks'),
      component: null,
    },
    {
      path: '/feedback/posts',
      text: t('messages'),
      component: Posts,
    },
  ];

  return { menuItems };
};

export default useFeedBackRoute;
