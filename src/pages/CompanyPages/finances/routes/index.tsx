import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

const Suggestions = lazy(() => import('../screens/Suggestions'));
const Payment = lazy(() => import('../screens/Payment'));
const CashBack = lazy(() => import('../screens/CashBack'));
const History = lazy(() => import('../screens/History'));

interface IFinanceRow {
  path: string;
  text: string;
  component: any;
}

const useFinanceRoute = () => {
  const { t } = useTranslation();
  const menuItems: IFinanceRow[] = [
    {
      path: '/finances/suggestions',
      text: t('proposals'),
      component: Suggestions,
    },
    {
      path: '/finances/payment',
      text: t('p2p'),
      component: Payment,
    },
    {
      path: '/finances/cashback',
      text: t('cashbackSum'),
      component: CashBack,
    },
    {
      path: '/finances/history',
      text: t('byCashiers'),
      component: History,
    },
  ];

  return { menuItems };
};

export default useFinanceRoute;
