import Spinner from 'components/Helpers/Spinner';
import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useClientsRoutes } from './routes';

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