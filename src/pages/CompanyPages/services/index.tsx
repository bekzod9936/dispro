import { Suspense } from "react";

//packages
import { Route, Switch } from "react-router";

//components
import Spinner from "components/Helpers/Spinner";

//routes
import { getRoutes } from "./routes";

const ServicesPage: React.FC = () => {
  const routes = getRoutes();
  return (
    <div style={{ height: "100%" }}>
      <Switch>
        <Suspense fallback={<Spinner />}>
          {routes.map(({ component, path }) => (
            <Route component={component} path={path} exact />
          ))}
        </Suspense>
      </Switch>
    </div>
  );
};

export default ServicesPage;
