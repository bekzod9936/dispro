import { BlockIcon, DownIcon, GoBackIcon, PointActionsIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import NavBar from 'components/Custom/NavBar'
import Spinner from 'components/Helpers/Spinner'
import { Suspense, useState, useEffect } from 'react'
import { Route, Switch, useHistory, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { useClientRoutes } from '../../routes'
import { ClientBlock } from './components/ClientBlock'
import { InfoBlock } from './components/InfoBlock'
import { Recommendation } from './components/Recommendations'
import { StatsCard } from './components/StatsCard'
import { DownSide, MAddInfo, MButtons, MClientInfo, MDefaultImage, MiddleSide, MNav, MUpside, MWrapper, SpinnerWrapper, UpSide, Wrapper } from "./style"
import { useWindowSize } from "../../hooks/useWindowSize"
import { useTranslation } from 'react-i18next'
import Button from 'components/Custom/Button'
import { DownModal } from './components/DownModal'
import { selectAll, setCurrentClient } from 'services/redux/Slices/clients'
import { useMutation, useQuery } from 'react-query'
import { fetchPersonalInfo, sendNote } from 'services/queries/clientsQuery'
import { BlockModal } from '../../components/BlockModal'
import { VipModal } from '../../components/ClientsBar/components/VipModal'
import Modal from 'components/Custom/Modal';
import { getClientStatistics } from '../../utils/getSelectedFilters';
import { MobileForm } from '../../components/Form'
import FullModal from 'components/Custom/FullModal'
import { NoteModal } from './components/NoteModal'
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



    if (width > 600) {
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
                        <GoBackIcon onClick={handleClose} style={{ width: 10, height: 15, cursor: "pointer" }} />
                        <MClientInfo>
                            {client?.image ?
                                <div className="image">
                                    <img
                                        src={client.image}
                                        alt="imgAvatart" />
                                    {client.isPlBlocked &&
                                        <div className="block">{<BlockIcon />}</div>}
                                </div> :
                                <MDefaultImage>
                                    {client?.isPlBlocked && <div className="block">{<BlockIcon />}</div>}
                                </MDefaultImage>}
                            <h6>{client?.firstName + " " + client?.lastName}</h6>
                        </MClientInfo>
                    </MNav>
                    <MAddInfo>
                        <p className="gender">
                            {t(client?.genderTypeId === 1 ? "man" : "woman")}
                        </p>
                        <p>
                            {t("status")}: {client?.isPlBlocked ? t("blocked") : status + " " + percent + " %"}
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
