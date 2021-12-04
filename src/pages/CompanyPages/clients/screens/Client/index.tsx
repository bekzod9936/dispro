import { BlockIcon, CoinsIcon, CrownIcon, DownIcon, GoBackIcon, MinusCoinsIcon, PointActionsIcon, UnBlockIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import NavBar from 'components/Custom/NavBar'
import Spinner from 'components/Helpers/Spinner'
import { Suspense, useState, useEffect } from 'react'
import { Route, Switch, useHistory, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { useClientRoutes } from '../../routes'
import { ClientBlock } from './components/ClientBlock'
import clientDefault from "assets/images/staff_default.png"
import { InfoBlock } from './components/InfoBlock'
import { Recommendation } from './components/Recommendations'
import { StatsCard } from './components/StatsCard'
import { DownSide, Flex, MAddInfo, MButtons, MClientInfo, MDefaultImage, MiddleSide, MNav, MUpside, MWrapper, SpinnerWrapper, UpSide, Wrapper } from "./style"
import { useWindowSize } from "../../hooks/useWindowSize"
import { useTranslation } from 'react-i18next'
import Button from 'components/Custom/Button'
import { DownModal } from './components/DownModal'
import { selectAll, setCurrentClient } from 'services/redux/Slices/clients'
import { useMutation, useQuery } from 'react-query'
import { blockClient, fetchPersonalInfo } from 'services/queries/clientsQuery'
import { BlockModal } from '../../components/BlockModal'
import { VipModal } from '../../components/ClientsBar/components/VipModal'
import Modal from 'components/Custom/Modal';
import { getClientStatistics } from '../../utils/getSelectedFilters';
import { MobileForm } from '../../components/Form'
import { IconButton } from '@material-ui/core'

interface IForm {
    open: boolean,
    action: 1 | 2 | 3 | 4
}
const Client = () => {
    const { period: { endDate, startDate }, currentClient, note } = useAppSelector(state => state.clients)
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
    const [form, setForm] = useState<IForm>({
        open: false,
        action: 1
    })
    const { status, percent } = { percent: client?.personalLoyaltyInfo.isActive ? client.personalLoyaltyInfo.percent : client?.obtainProgramLoyalty.percent, status: client?.personalLoyaltyInfo.isActive ? client.addInfo.status : client?.obtainProgramLoyalty.levelName }
    const [modalContent, setModalContent] = useState<"points" | "other">("points")


    const dispatch = useAppDispatch()
    const { refetch, isLoading } = useQuery(["fetch", note], () => fetchPersonalInfo({
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

    const { mutate } = useMutation((data: any) => blockClient(data))

    const handleClose = () => {
        dispatch(selectAll(false))
        history.push("/clients")
    }

    const handlePointsAction = (action: 1 | 2 | 3 | 4) => {
        setForm({
            action: action,
            open: true
        })
        setIsOpen(false)
    }

    const handleBlock = () => {
        if (client?.isPlBlocked) {
            mutate({
                isPlBlocked: false,
                reason: "",
                clientId: client.id
            })
            refetch()
        }
        else {
            setBlockModal(true)
        }
    }

    const handleDownModal = (e: any, action: "other" | "points") => {
        e.stopPropagation()
        setModalContent(action)
        setIsOpen(true)
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    if (currentClient?.clientInfo.id != clientId && currentClient?.clientInfo.userId != clientUserId) {
        return (
            <Spinner />
        )
    }



    if (width > 1000) {
        return (
            <Wrapper>
                <Modal open={vipModal}>
                    <VipModal
                        clientInfo={{
                            name: currentClient?.clientInfo.firstName + " " + currentClient?.clientInfo.lastName,
                            prevPercent: currentClient?.clientInfo?.obtainProgramLoyalty?.percent + "",
                            prevStatus: currentClient?.clientInfo?.obtainProgramLoyalty?.levelName + "",
                            status: currentClient?.clientInfo.personalLoyaltyInfo.percent ? currentClient?.clientInfo.addInfo.status + "" : currentClient?.clientInfo.obtainProgramLoyalty.levelName + "",
                            value: currentClient?.clientInfo.personalLoyaltyInfo.percent ? currentClient?.clientInfo?.personalLoyaltyInfo?.percent + "" : currentClient?.clientInfo.obtainProgramLoyalty.percent + ""
                        }}
                        id={client?.id || 0}
                        refetch={refetch}
                        handleClose={() => setVipModal(false)}
                        state={vipModalState}
                    />
                </Modal>
                <UpSide>
                    <ClientBlock
                        refetch={refetch}
                        client={client}
                        setBlockModal={setBlockModal} />
                    <InfoBlock
                        refetch={refetch}
                        referBy={currentClient?.referBy}
                        vipModal={vipModal}
                        setVipModalState={setVipModalState}
                        setVipModal={setVipModal}
                        client={client} />
                    <Recommendation referLevels={currentClient?.childReferalClientsByLevel || []} />
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
                    refetch={refetch}
                    isBlocking={!client?.isPlBlocked}
                    handleClose={setBlockModal}
                    isOpen={blockModal} />
            </Wrapper>
        )
    } else {
        return (
            <MWrapper>
                {client &&
                    <MobileForm
                        open={form.open}
                        onClose={() => setForm((prev: IForm) => ({ ...prev, open: false }))}
                        refetch={refetch}
                        action={form.action}
                        client={{
                            isBlocked: client.isPlBlocked,
                            currentStatus: status + "",
                            id: client.id,
                            name: client.firstName + " " + client.lastName,
                            points: client.addInfo.pointSum,
                            percent: percent || 0,
                            prevPercent: client.obtainProgramLoyalty.percent,
                            prevStatus: client.obtainProgramLoyalty.levelName
                        }} />}
                {isOpen &&
                    <DownModal
                        onClose={() => setIsOpen(false)}
                        refetch={refetch}
                        id={client?.id || 0}
                        isBlocked={!!client?.isPlBlocked}
                        onClick={handlePointsAction}
                        modalContent={modalContent}
                        handleClose={() => setIsOpen(false)} />}
                <MUpside>
                    <MNav>
                        <IconButton onClick={handleClose}>
                            <GoBackIcon style={{ width: 10, height: 15, cursor: "pointer" }} />
                        </IconButton>
                        <MClientInfo>
                            <div className="planshetHeader">
                                {client?.image ?
                                    <div className="image">
                                        <img
                                            src={client.image}
                                            onError={(e: any) => {
                                                e.target.onerror = null;
                                                e.target.src = clientDefault;
                                            }}
                                            alt="imgAvatart" />
                                        {client.isPlBlocked &&
                                            <div className="block">{<BlockIcon />}</div>}
                                    </div> :
                                    <MDefaultImage>
                                        {client?.isPlBlocked && <div className="block">{<BlockIcon />}</div>}
                                    </MDefaultImage>}
                                <div>
                                    <h6>{client?.firstName + " " + client?.lastName}</h6>
                                    {width <= 1000 && width > 600 && <span className="clientInfo">{t(client?.genderTypeId === 1 ? "man" : "woman")}<b>{" "}</b>{t("status")}: {client?.isPlBlocked ? t("blocked") : (client?.personalLoyaltyInfo.isActive ? "Спец" : status) + " " + percent + " %"}</span>}
                                </div>

                            </div>
                        </MClientInfo>
                        {width <= 1000 && width > 600 &&
                            <>
                                <Modal open={vipModal}>
                                    <VipModal
                                        clientInfo={{
                                            name: client?.firstName + " " + client?.lastName,
                                            prevPercent: client?.obtainProgramLoyalty?.percent + "",
                                            prevStatus: client?.obtainProgramLoyalty?.levelName + "",
                                            status: client?.addInfo?.status + "",
                                            value: client?.personalLoyaltyInfo.percent + ""
                                        }}
                                        state={vipModalState}
                                        handleClose={() => setVipModal(false)}
                                        refetch={refetch}
                                        id={client?.id || 0} />
                                </Modal>
                                <BlockModal
                                    isOpen={blockModal}
                                    refetch={refetch}
                                    clientId={client?.id || 0}
                                    isBlocking={true}
                                    handleClose={setBlockModal} />
                                {client?.isPlBlocked ?
                                    <Button
                                        onClick={() => handleBlock()}
                                        endIcon={<UnBlockIcon />}
                                        buttonStyle={{
                                            fontSize: {
                                                planshet: 17
                                            },
                                            bgcolor: "rgba(15, 207, 11, 0.1)",
                                            color: "#0FCF0B",
                                            weight: 500
                                        }}>
                                        {t("unBlocking")}
                                    </Button> :
                                    <Button
                                        onClick={() => handleBlock()}
                                        endIcon={<BlockIcon />}
                                        buttonStyle={{
                                            fontSize: {
                                                planshet: 17
                                            },
                                            bgcolor: "rgba(255, 94, 104, 0.1)",
                                            color: "#FF5E68",
                                            weight: 500
                                        }}>
                                        {t("block")}
                                    </Button>}
                            </>}
                    </MNav>
                    {!(width <= 1000 && width > 600) ?
                        <MAddInfo>
                            <p className="gender">
                                {t(client?.genderTypeId === 1 ? "man" : "woman")}
                            </p>
                            <p>
                                {t("status")}: {client?.isPlBlocked ? t("blocked") : (client?.personalLoyaltyInfo.isActive ? "Спец" : status) + " " + percent + " %"}
                            </p>
                        </MAddInfo> :
                        <Flex>
                            <Button
                                endIcon={<CoinsIcon style={{ width: 20, height: 20 }} />}
                                buttonStyle={{
                                    bgcolor: "rgba(96, 110, 234, 0.1)",
                                    color: "#606EEA",
                                    weight: 500,
                                    fontSize: {
                                        planshet: 17
                                    }
                                }}>
                                {t("accurePoints")}
                            </Button>
                            <Button
                                margin={{
                                    planshet: "0 15px"
                                }}
                                endIcon={<MinusCoinsIcon style={{ width: 20, height: 20 }} />}
                                buttonStyle={{
                                    bgcolor: "rgba(96, 110, 234, 0.1)",
                                    color: "#606EEA",
                                    weight: 500,
                                    fontSize: {
                                        planshet: 17
                                    }
                                }}>
                                {t("substractPoints")}
                            </Button>
                            <Button
                                onClick={() => {
                                    let res: "updating" | "selecting" = client?.personalLoyaltyInfo.isActive ? "updating" : "selecting"
                                    setVipModalState(res)
                                    setVipModal(true)
                                }}
                                endIcon={width > 604 ? <CrownIcon style={{ width: 20, height: 20 }} /> : undefined}
                                buttonStyle={{
                                    bgcolor: "rgba(96, 110, 234, 0.1)",
                                    color: "#606EEA",
                                    weight: 500,
                                    fontSize: {
                                        planshet: 17
                                    }
                                }}>
                                {t("changeStatus")}
                            </Button>
                        </Flex>}
                    {width <= 600 &&
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
                                buttonStyle={{ bgcolor: "#fff", color: "#606EEA", weight: "500" }}
                                endIcon={<DownIcon />}>
                                Ещё
                            </Button>
                        </MButtons>}
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
