import { lazy } from "react";
import { useTranslation } from "react-i18next";



const Clients = lazy(() => import("../screens/ClientsPage/ClientsPage"))
const Client = lazy(() => import("../screens/Client"))
const Operations = lazy(() => import("../screens/Client/components/Tables/Operations"))
const Recommendations = lazy(() => import("../screens/Client/components/Tables/Recommendations"))
const Points = lazy(() => import("../screens/Client/components/Tables/Points"))
export const useClientsRoutes = () => {
    const { t } = useTranslation()
    const routes = [
        {
            path: "/clients",
            title: t("client"),
            component: Clients
        },
        {
            path: "/clients/client",
            title: t("client"),
            component: Client
        },
        {
            path: "/clients/client/:params",
            title: t("client"),
            component: Client
        },
    ]
    return { routes }
}

export const useClientRoutes = () => {
    const { t } = useTranslation()
    const routes = [
        {
            path: "/clients/client",
            text: t("operations"),
            component: Operations
        },
        {
            path: "/clients/client/points",
            text: t("points"),
            component: Points
        },
        {
            path: "/clients/client/recommendations",
            text: t("recommendations"),
            component: Recommendations
        }
    ]
    return { routes }
}