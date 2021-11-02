import { CartIcon, CashBackIcon, DiscountIcon, HandIcon, MoneyBagIcon, MoneyStatsIcon, RatingIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import React from 'react'
import { useHistory } from 'react-router'
import { useAppSelector } from 'services/redux/hooks'
import { ClientBlock } from './components/ClientBlock'
import { InfoBlock } from './components/InfoBlock'
import { Recommendation } from './components/Recommendations'
import { StatsCard } from './components/StatsCard'
import { MiddleSide, UpSide, Wrapper } from "./style"
const Client = () => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const client = selectedClients[0]
    const history = useHistory()

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
        </Wrapper>
    )
}

export default Client
