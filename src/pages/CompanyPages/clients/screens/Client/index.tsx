import { CartIcon, CashBackIcon, DiscountIcon, DownIcon, GoBackIcon, HandIcon, MoneyBagIcon, MoneyStatsIcon, PointActionsIcon, RatingIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import NavBar from 'components/Custom/NavBar'
import Spinner from 'components/Helpers/Spinner'
import React, { Suspense, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { useClientRoutes } from '../../routes'
import { ClientBlock } from './components/ClientBlock'
import { InfoBlock } from './components/InfoBlock'
import { Recommendation } from './components/Recommendations'
import { StatsCard } from './components/StatsCard'
import { DownSide, MAddInfo, MButtons, MClientInfo, MDefaultImage, MiddleSide, MNav, MUpside, MWrapper, UpSide, Wrapper } from "./style"
import { useWindowSize } from "../../hooks/useWindowSize"
import { useTranslation } from 'react-i18next'
import Button from 'components/Custom/Button'
import { DownModal } from './components/DownModal'
import { selectAll } from 'services/redux/Slices/clients'
import { Form } from '../../components/Form'

const Client = () => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const client = selectedClients[0]
    const history = useHistory()
    const { routes } = useClientRoutes()
    const { width } = useWindowSize()
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState<"points" | "other">("points")
    const [form, setForm] = useState({
        action: 1,
        isOpen: false
    })
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(selectAll(false))
        history.push("/clients")
    }

    React.useEffect(() => {
        if (!client) history.push("/clients");
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

    const handlePointsAction = (action: number) => {
        setForm({
            isOpen: true,
            action
        })
        setIsOpen(false)
    }


    const handleDownModal = (e: any, action: "other" | "points") => {
        e.stopPropagation()
        setModalContent(action)
        setIsOpen(true)
    }

    if (width > 600) {
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
    } else {
        return (
            <MWrapper>
                <Form
                    handleClose={() => setForm(prev => ({ ...prev, isOpen: false }))}
                    action={form.action}
                    isOpen={form.isOpen} />
                {isOpen &&
                    <DownModal
                        onClick={handlePointsAction}
                        modalContent={modalContent}
                        handleClose={() => setIsOpen(false)} />}
                <MUpside>
                    <MNav>
                        <GoBackIcon onClick={handleClose} style={{ width: 10, height: 15, cursor: "pointer" }} />
                        <MClientInfo>
                            {client?.image ? <img src={client.image} alt="imgAvatart" /> : <MDefaultImage />}
                            <h6>{client?.firstName + " " + client?.lastName}</h6>
                        </MClientInfo>
                    </MNav>
                    <MAddInfo>
                        <p className="gender">
                            {t(client?.genderTypeId === 1 ? "man" : "woman")}
                        </p>
                        <p>
                            {t("status")}: {client?.addInfo?.status + " " + client?.personalLoyaltyInfo?.percent} %
                        </p>
                    </MAddInfo>
                    <MButtons>
                        <Button
                            onClick={(e) => handleDownModal(e, "points")}
                            margin={{ mobile: "0 8px 0 0" }}
                            endIcon={<PointActionsIcon />}
                            buttonStyle={{ weight: "500", bgcolor: "rgba(96, 110, 234, 0.1)", color: "#606EEA" }}>
                            Действия с баллами
                        </Button>
                        <Button
                            onClick={(e) => handleDownModal(e, "other")}
                            buttonStyle={{ bgcolor: "#F0F0F0", color: "#606EEA", weight: "500" }}
                            endIcon={<DownIcon />}>
                            Ещё
                        </Button>
                    </MButtons>
                    <NavBar list={routes} />
                </MUpside>
                <Switch>
                    <Suspense fallback={<Spinner />}>
                        {routes.map(route => (
                            <Route path={route.path} component={route.component} exact />
                        ))}
                    </Suspense>
                </Switch>
            </MWrapper>)
    }
}

export default Client
