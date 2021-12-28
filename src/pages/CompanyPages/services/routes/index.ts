import { lazy } from 'react';

const MainPage = lazy(() => import("../screens/Main"));
const CreatePage = lazy(() => import("../screens/Services/Create"));
const EditPage = lazy(() => import('../screens/Services/Edit'))


export const getRoutes = () => {
    const routes = [
        {
            path: "/services/main",
            component: MainPage
        },
        {
            path: "/services/create",
            component: CreatePage
        },
        {
            path: "/services/:id",
            component: EditPage
        }
    ]
    return routes;
}