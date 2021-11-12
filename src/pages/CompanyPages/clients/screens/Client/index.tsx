import { DownIcon, GoBackIcon, PointActionsIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import NavBar from 'components/Custom/NavBar'
import Spinner from 'components/Helpers/Spinner'
import { Suspense, useState } from 'react'
import { Route, Switch, useHistory, useParams } from 'react-router'
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
import { selectAll, setCurrentClient } from 'services/redux/Slices/clients'
import { Form } from '../../components/Form'
import { useQuery } from 'react-query'
import { fetchPersonalInfo } from 'services/queries/clientsQuery'
import { BlockModal } from '../../components/BlockModal'
import { VipModal } from '../../components/ClientsBar/components/VipModal'
import Modal from 'components/Custom/Modal';
import { getClientStatistics } from '../../utils/getSelectedFilters';

const Client = () => {
    const { period: { endDate, startDate }, currentClient } = useAppSelector(state => state.clients)
    const { id }: any = useParams()
    const [clientId, clientUserId] = id?.toString()?.split("-")
    const client = currentClient?.clientInfo
    const history = useHistory()
    const { routes } = useClientRoutes()
    const { width } = useWindowSize()
    const { t } = useTranslation()
    const [vipModal, setVipModal] = useState(false)
    const [vipModalState, setVipModalState] = useState<"selecting" | "updating" | "removing">("selecting")
    const [blockModal, setBlockModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState<"points" | "other">("points")
    const [form, setForm] = useState({
        action: 1,
        isOpen: false
    })


    const dispatch = useAppDispatch()
    const response = useQuery(["fetch"], () => fetchPersonalInfo({
        clientUserId,
        clientId,
        startDate,
        endDate
    }), {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data: any) => {
            dispatch(setCurrentClient(data.data.data));

        }
    })

    const handleClose = () => {
        dispatch(selectAll(false))
        history.push("/clients")
    }

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

    if (response.isFetching) {
        return (
            <Spinner />
        )
    }


    if (width > 600) {
        return (
            <Wrapper>
                <Modal open={vipModal}>
                    <VipModal
                        clientInfo={{
                            name: currentClient?.clientInfo.firstName + " " + currentClient?.clientInfo.lastName,
                            prevPercent: currentClient?.clientInfo?.obtainProgramLoyalty?.percent + "",
                            prevStatus: currentClient?.clientInfo?.obtainProgramLoyalty?.levelName + "",
                            status: currentClient?.clientInfo.addInfo.status + "",
                            value: currentClient?.clientInfo?.personalLoyaltyInfo?.percent + ""
                        }}
                        id={client?.id || 0}
                        refetch={response.refetch}
                        handleClose={() => setVipModal(false)}
                        state={vipModalState}
                    />
                </Modal>
                <UpSide>
                    <ClientBlock
                        client={client}
                        setBlockModal={setBlockModal} />
                    <InfoBlock
                        referBy={currentClient?.referBy}
                        vipModal={vipModal}
                        setVipModalState={setVipModalState}
                        setVipModal={setVipModal}
                        client={client} />
                    <Recommendation referLevels={currentClient?.childReferalClientsByLevel} />
                </UpSide>
                <MiddleSide>
                    {getClientStatistics(client?.addInfo)?.map((el, index) => (
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
                <BlockModal
                    clientId={client?.id || 0}
                    refetch={response.refetch}
                    isBlocking={!client?.isPlBlocked}
                    handleClose={setBlockModal}
                    isOpen={blockModal} />
            </Wrapper>
        )
    } else {
        return (
            <MWrapper>
                <Form
                    clientInfo={{
                        status: currentClient?.clientInfo?.addInfo?.status + "",
                        name: currentClient?.clientInfo?.firstName + " " + currentClient?.clientInfo?.lastName,
                        percent: currentClient?.clientInfo?.personalLoyaltyInfo?.percent || "",
                        points: currentClient?.clientInfo?.addInfo?.pointSum + "" || "",
                        id: currentClient?.clientInfo?.id || 0
                    }}
                    refetch={response.refetch}
                    handleClose={setForm}
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
