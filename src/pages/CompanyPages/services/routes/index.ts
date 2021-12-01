import { lazy } from 'react';

const MainPage = lazy(() => import("../screens/Main"));
const CreatePage = lazy(() => import("../screens/Create"));



export const getRoutes = () => {
    const routes = [
        {
            path: "/services/main",
            component: MainPage
        },
        {
            path: "/services/create",
            component: CreatePage
        }
    ]
    return routes;
}