import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

const Active = lazy(() => import('../screens/Active'));
const Waiting=lazy(()=>import ('../screens/Active'));
const Archive=lazy(()=>import ('../screens/Active'));

interface INewsRow{
    path:string,
    text:string,
    component:any
}

const useNewsRoute=()=>{
    const {t}=useTranslation();

    const menuItems:INewsRow[]=[
        {
            path:'/news/waiting',
            text:t('В ожидание'),
            component:Waiting
          },
        {
            path:'/news',
            text:t('Активные новости'),
            component:Active,
        },
        {
            path:'/news/archive',
            text:t('Архив новостей'),
            component:Archive,
        }
     
    ]
    return {menuItems};
}

export default useNewsRoute;