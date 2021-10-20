import { lazy } from 'react';
import { useTranslation } from 'react-i18next';


const Drafts = lazy(() => import("../screens/Drafts"));
const Deferred = lazy(() => import("../screens/Deferred"));
const OnSale = lazy(() => import("../screens/OnSale"));
const Canceled = lazy(() => import("../screens/Canceled"));
const Archive = lazy(() => import("../screens/Archive"));
const Coupons = lazy(() => import("../screens/Coupons"));
const Certificates = lazy(() => import("../screens/Certificates"));

const useProposalsRoute = () => {
    const { t } = useTranslation()
    const routes = [
        {
            path: "/proposals",
            component: Drafts,
            text: t("drafts")
        },
        {
            path: "/proposals/deferred",
            component: Deferred,
            text: t("deferred")
        }, 
        {
            path: "/proposals/onsale",
            component: OnSale,
            text: t("onsale")
        },
        {
            path: "/proposals/archive",
            component: Archive,
            text: t("archive")
        },
        {
            path: "/proposals/canceled",
            component: Canceled,
            text: t("сanceled_proposals")
        },
        {
            path: "/proposals/create_certificate",
            component: Certificates,
            text: t("certificates")
        },
        {
            path: "/proposals/create_coupon",
            component: Coupons,
            text: t("coupon")
        },
    ]

    return { routes }
}

export default useProposalsRoute