import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
const Drafts = lazy(() => import("../screens/Drafts"));
const Deferred = lazy(() => import("../screens/Deferred"));
const OnSale = lazy(() => import("../screens/OnSale"));
const Canceled = lazy(() => import("../screens/Canceled"));
const Archive = lazy(() => import("../screens/Archive"));
const Coupons = lazy(() => import("../screens/Coupons"));
const Update = lazy(() => import("../screens/UpdateCoupon"));
const FullInfo = lazy(() => import("../screens/FullInfo"))
const RePublish = lazy(() => import("../screens/RePublish"))
const useProposalsRoute = () => {
    const { t } = useTranslation()
    const routes = [
        {
            path: "/proposals/drafts",
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
            component: Coupons,
            text: t("certificates")
        },
        {
            path: "/proposals/create_coupon",
            component: Coupons,
            text: t("coupon")
        },
        {
            path: "/proposals/update_coupon",
            component: Update,
            text: t("some")
        },
        {
            path: "/proposals/update_certificate",
            component: Update,
            text: t("some")
        },
        {
            path: "/proposals/check_coupon",
            component: FullInfo,
            text: t("coupon")
        },
        {
            path: "/proposals/check_certificate",
            component: FullInfo,
            text: t("coupon")
        },
        {
            path: "/proposals/create_republishcoupon",
            component: RePublish,
            text: t("coupon")
        },
        {
            path: "/proposals/create_republishcertificate",
            component: RePublish,
            text: t("certificate")
        }

    ]

    return { routes }
}

export default useProposalsRoute