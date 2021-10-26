import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Spinner from 'components/Helpers/Spinner';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route, useHistory } from 'react-router-dom';
import useProposalsRoute from './routes';
import { Container, Header, LeftSide, RightSide, Wrapper } from './style';

const ProposalsPage = () => {
    const { routes } = useProposalsRoute()
    const history = useHistory()
    const [isCreating, setCreating] = React.useState<boolean>(false)
    const filteredRoutes = routes.filter((el: any) => !el.path.includes("create") && !el.path.includes("update") && !el.path.includes("check"))
    const { t } = useTranslation()


    React.useEffect(() => {
        const res = history.location.pathname.includes("create") || history.location.pathname.includes("update") || history.location.pathname.includes("check")

        setCreating(res)
    }, [history.location.pathname])


    return (
        <Wrapper>
            {!isCreating &&
                <Header>
                    <Title>{t("proposals")}</Title>
                </Header>}
            <Container>
                {!isCreating &&
                    <LeftSide>
                        <NavBar vertical list={filteredRoutes} />
                    </LeftSide>}
                <RightSide isCreating={isCreating}>
                    <Switch>
                        <Suspense fallback={<Spinner />}>
                            {routes.map((route: any) => (
                                <Route exact path={route.path} component={route.component} />
                            ))}
                        </Suspense>
                    </Switch>
                </RightSide>
            </Container>
        </Wrapper>
    );
}

export default ProposalsPage;

