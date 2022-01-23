import Spinner from "components/Helpers/Spinner";
import { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router";
import { useGetCompanySettings } from "./hooks/useGetCompanySettings";
import { useClientsRoutes } from "./routes";

const ClientPage = () => {
  const { routes } = useClientsRoutes();

  const _ = useGetCompanySettings();

  return (
    <div style={{ height: "100%" }}>
      <Switch>
        <Suspense fallback={<Spinner />}>
          {routes.map((el) => (
            <Route component={el.component} path={el.path} exact />
          ))}
        </Suspense>
      </Switch>
    </div>
  );
};

export default ClientPage;
