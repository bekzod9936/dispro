import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams, useRouteMatch } from "react-router";
import useWindowWidth from "services/hooks/useWindowWidth";



const Clients = lazy(() => import("../screens/ClientsPage/ClientsPage"))
const Client = lazy(() => import("../screens/Client"))
const Operations = lazy(() => import("../screens/Client/components/Tables/Operations"))
const Recommendations = lazy(() => import("../screens/Client/components/Tables/Recommendations"))
const Points = lazy(() => import("../screens/Client/components/Tables/Points"))
const Information = lazy(() => import("../screens/Client/components/Tables/Information"))
export const useClientsRoutes = () => {
    const { t } = useTranslation()
    const routes = [
        {
            path: "/clients",
            title: t("client"),
            component: Clients
        },
        {
            path: "/clients/:id/:params",
            title: t("client"),
            component: Client
        },
    ]
    return { routes }
}

export const useClientRoutes = () => {
    const params: any = useParams()

    const { t } = useTranslation()
    const { width } = useWindowWidth()
    const routes = [
        {
            path: `/clients/${params.id}/operations`,
            text: t("operations"),
            component: Operations
        },
        {
            path: `/clients/${params.id}/points`,
            text: t("points"),
            component: Points
        },
        {
            path: `/clients/${params.id}/recommendations`,
            text: t("recommendations"),
            component: Recommendations
        }
    ]
    if (!(width > 1000)) return {
        routes: [{
            path: `/clients/${params.id}/information`,
            text: t("information"),
            component: Information
        }, ...routes]
    }
    return { routes }
}