import Spinner from "components/Helpers/Spinner";
import { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router";
import { useClientsRoutes } from "./routes";

const ClientPage = () => {
  const { routes } = useClientsRoutes();

  return (
    <div style={{ height: "100%" }}>
      <Switch>
        <Suspense fallback={<Spinner />}>
          {routes.map((el) => (
            <Route component={el.component} path={el.path} exact />
          ))}
          <Route path="*">
            <Redirect to={routes[0].path} />
          </Route>
        </Suspense>
      </Switch>
    </div>
  );
};

export default ClientPage;
