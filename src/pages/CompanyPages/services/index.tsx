import { Route, Switch } from "react-router";
import { Suspense } from "react"
import Spinner from "components/Helpers/Spinner";
import { getRoutes } from "./routes";

interface ServicesPageProps {

}


const ServicesPage: React.FC<ServicesPageProps> = () => {
    const routes = getRoutes()
    return (
        <div style={{ height: '100%' }}>
            <Switch>
                <Suspense fallback={<Spinner />}>
                    {
                        routes.map(({ component, path }) => (
                            <Route component={component} path={path} exact />
                        ))
                    }
                </Suspense>
            </Switch>
        </div>
    );
}

export default ServicesPage;
