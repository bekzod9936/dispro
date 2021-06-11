import React from 'react';
import { Redirect, Route } from "react-router-dom"
import { pathToFileURL } from 'url';

interface IProps {
    Layout: React.LazyExoticComponent<React.ComponentType<any>>,
    Component: React.LazyExoticComponent<React.ComponentType<any>>,
    // rest?: Object,
    path: string
}

const PrivateRoute: React.FC<IProps> = ({

    Layout, Component, ...rest }) => {

    return (
        <Route {...rest} exact render={(props) => {
            let companyToken = localStorage.getItem("companyToken");
            let moderator = localStorage.getItem("moderator_access_token");
            return ((moderator && props.match.path.includes("admin")) || (companyToken && !props.match.path.includes("admin"))) ? (<Layout>
                <Component {...props} />
            </Layout>) : (!companyToken && !props.match.path.includes("admin")) ? (
                <Redirect to="/admin/companies" />
            ) : (<Redirect to="/" />)
        }}>

        </Route>
    );
}

export default PrivateRoute;
