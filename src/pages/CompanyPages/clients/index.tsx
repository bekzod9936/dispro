import Spinner from 'components/Helpers/Spinner'
import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { useClientsRoutes } from './routes'
import ClientsPage from './screens/ClientsPage/ClientsPage'

const ClientPage = () => {
    const { routes } = useClientsRoutes()


    return (
        <div style={{ height: "100%" }}>
            <Switch>
                <Suspense fallback={<Spinner />}>
                    {routes.map(el => (
                        <Route component={el.component} path={el.path} exact />
                    ))}
                </Suspense>
            </Switch>
        </div>
    )
}

export default ClientPage