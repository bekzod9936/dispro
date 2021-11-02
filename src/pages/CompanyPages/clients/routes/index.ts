import { lazy } from "react";
import { useTranslation } from "react-i18next";



const Clients = lazy(() => import("../screens/ClientsPage/ClientsPage"))
const Client = lazy(() => import("../screens/Client"))

const useClientsRoutes = () => {
    const { t } = useTranslation()
    const routes = [
        {
            path: "/clients",
            title: t("client"),
            component: Clients
        },
        {
            path: "/clients/:params",
            title: t("client"),
            component: Client
        }
    ]
    return { routes }
}


export default useClientsRoutes