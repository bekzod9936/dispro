import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

const ActiveNews = lazy(() => import('../screens/ActiveNews'));
const NewsArchive = lazy(() => import('../screens/NewsArchive'));
const Pending = lazy(() => import('../screens/Pending'));
const CreateNews = lazy(() => import('../CreateNews'));
interface IFinanceRow {
	path: string;
	text: string;
	component: any;
}

const useNewsNavbarRoute = () => {
	const { t } = useTranslation();
	const menuItems: IFinanceRow[] = [
		{
			path: '/news/pending',
			text: t('in_pending'),
			component: Pending,
		},
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
			path: '/news/createNews',
			text: t('addingNews'),
			component: CreateNews,
		},
	];

	return { menuItems };
};

export default useNewsNavbarRoute;
