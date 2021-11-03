import { CartIcon, CashBackIcon, DiscountIcon, HandIcon, MoneyBagIcon, MoneyStatsIcon, RatingIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import NavBar from 'components/Custom/NavBar'
import Spinner from 'components/Helpers/Spinner'
import React, { Suspense } from 'react'
import { Route, Switch, useHistory } from 'react-router'
import { useAppSelector } from 'services/redux/hooks'
import { useClientRoutes } from '../../routes'
import { ClientBlock } from './components/ClientBlock'
import { InfoBlock } from './components/InfoBlock'
import { Recommendation } from './components/Recommendations'
import { StatsCard } from './components/StatsCard'
import { DownSide, MiddleSide, UpSide, Wrapper } from "./style"
const Client = () => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const client = selectedClients[0]
    const history = useHistory()
    const { routes } = useClientRoutes()
    React.useEffect(() => {
        if (!client) history.push("/clients")
    }, [])
    const statistics = [
        {
            icon: <MoneyStatsIcon />,
            heading: "Оплачено в UZS",
            value: 99999999
        },
        {
            icon: <CartIcon />,
            heading: "Количество покупок",
            value: 5670260
        },
        {
            icon: <MoneyBagIcon />,
            heading: "Сумма всех покупок",
            value: 99999999
        },
        {
            icon: <HandIcon />,
            heading: "Остаток баллов",
            value: 1125000
        },
        {
            icon: <CashBackIcon />,
            heading: "Получено кешбэк",
            value: 620750
        },
        {
            icon: <DiscountIcon />,
            heading: "Оплаченно баллами",
            value: 320260
        },
        {
            icon: <RatingIcon />,
            heading: "Оплаченно баллами",
            value: 250000
        },

    ]
    return (
        <Wrapper>
            <UpSide>
                <ClientBlock {...client} />
                <InfoBlock {...client} />
                <Recommendation />
            </UpSide>
            <MiddleSide>
                {statistics.map((el, index) => (
                    <StatsCard key={index} {...el} />
                ))}
            </MiddleSide>
            <DownSide>
                <NavBar list={routes} />
                <Switch>
                    <Suspense fallback={<Spinner />}>
                        {routes.map((route, index) => (
                            <Route exact key={index} component={route.component} path={route.path} />
                        ))}
                    </Suspense>
                </Switch>
            </DownSide>
        </Wrapper>
    )
}

export default Client
