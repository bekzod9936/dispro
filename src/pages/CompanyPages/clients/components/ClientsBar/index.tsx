import { MButton } from './components/Button'
import { VipModal } from './components/VipModal'
import Button from 'components/Custom/Button'
import moment from 'moment'
import { BlockIcon, CloseIcon, CoinsIcon, CrownIcon, MinusCoinsIcon, ProfileIcon, UnBlockIconBlue } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { CancelButton } from '../QrCodeBar/style'
import { MModal } from '../Modal'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { selectAll } from 'services/redux/Slices/clients'
import { AddInfo, Buttons, Content, ContentInfo, DefaultImage, MToggle, SelectButtons, SubContent, Text, Wrapper, WrapperContent } from './style'
import CustomToggle from 'components/Custom/CustomToggleSwitch'
import Modal from 'components/Custom/Modal'
import { BlockModal } from '../BlockModal'

interface IProps {
    refetch: any
}

const modalInfo: any = {
    addCoins: {
        title: "Начисление баллов",
        subtitle: "Количество баллов",
        btn: "Начислить",
        action: "addCoins"
    },
    removeCoins: {
        title: "Списание баллов",
        subtitle: "Количество баллов",
        info: "Клиент будет проинформирован о списании баллов push-уведомлением",
        btn: "Списать",
        action: "removeCoins"
    }
}

export const ClientsBar = ({ refetch }: IProps) => {
    const dispatch = useAppDispatch()
    const { selectedClients } = useAppSelector(state => state.clients)
    const client = selectedClients[0]
    const [vipModal, setVipModal] = useState(false)
    const history = useHistory()
    const [blockModal, setBlockModal] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState<any>({})
    const [vipModalState, setVipModalState] = useState<"selecting" | "updating" | "removing">("selecting")

    const handleOpen = (action: string) => {
        setIsModalOpen(true)
        setModalContent(modalInfo[action])
    }

    const handleAddAll = (action: boolean) => {
        dispatch(selectAll(action))
    }

    const handleClose = () => {
        dispatch(selectAll(false))
    }

    const handleClient = () => {
        history.push(`/clients/${client.id}-${client.userId}/operations`)
    }

    const handleChangeStatus = (e: any) => {
        let checked = e.target.checked
        if (checked) {
            setVipModal(true)
            setVipModalState("selecting")
        } else {
            setVipModal(true)
            setVipModalState("removing")
        }
    }

    const handleUnBlock = () => {
        setBlockModal(true)
    }

    return (
        <Wrapper>
            <BlockModal
                handleClose={setBlockModal}
                refetch={refetch}
                clientId={client?.id || 0}
                isOpen={blockModal}
                isBlocking={!client?.isPlBlocked} />
            <Modal open={vipModal}>
                <VipModal
                    clientInfo={{
                        name: client?.firstName + " " + client?.lastName,
                        prevStatus: client?.obtainProgramLoyalty?.levelName,
                        prevPercent: client?.obtainProgramLoyalty?.percent,
                        value: client?.personalLoyaltyInfo?.percent,
                        status: client?.addInfo?.status
                    }}
                    id={client?.id}
                    state={vipModalState}
                    refetch={refetch}
                    handleClose={() => setVipModal(false)} />
            </Modal>
            <CancelButton onClick={handleClose}>
                <CloseIcon />
            </CancelButton>
            {selectedClients.length === 1 ?
                <WrapperContent>
                    <div>
                        <Content>
                            {client.image ? <img src={client.image} alt="clientAvatar" /> : <DefaultImage />}
                            <ContentInfo>
                                <p>{client.firstName} {client.lastName}</p>
                                <span>Статус: {client.personalLoyaltyInfo.isActive ? client.addInfo.status : client.obtainProgramLoyalty.levelName} {client.personalLoyaltyInfo.isActive ? client.personalLoyaltyInfo.percent : client.obtainProgramLoyalty.percent}%</span>
                            </ContentInfo>
                        </Content>
                        <SubContent>
                            <p>Последняя покупка: {client.addInfo.lastPurchaseDate ? moment(client.addInfo.lastPurchaseDate).format("DD.MM.YYYY") : "-"}</p>
                            <Buttons>
                                {client.isPlBlocked ?
                                    <div className="blockedContent">
                                        <p>Клиент заблокирован</p>
                                        {client.blockedReason && <span>{client.blockedReason}</span>}
                                        <Button
                                            onClick={handleUnBlock}
                                            margin={{ laptop: "20px 0" }}
                                            buttonStyle={{
                                                color: "#606EEA",
                                                bgcolor: "rgba(96, 110, 234, 0.1)"
                                            }}
                                            endIcon={<UnBlockIconBlue />}>
                                            Разблокировать
                                        </Button>
                                    </div>
                                    : <>
                                        <MButton onClick={() => handleOpen("addCoins")}>
                                            Начислить баллы
                                            <CoinsIcon style={{ marginLeft: 10 }} />
                                        </MButton>
                                        <MButton onClick={() => handleOpen("removeCoins")}>
                                            Списать баллы
                                            <MinusCoinsIcon style={{ marginLeft: 10 }} />
                                        </MButton>
                                        <MToggle>
                                            <p>Индивидуальный статус</p>
                                            <CustomToggle
                                                checked={client?.personalLoyaltyInfo?.isActive || vipModal}
                                                defaultChecked={client?.personalLoyaltyInfo?.isActive}
                                                onChange={handleChangeStatus} />
                                        </MToggle>
                                        {client?.personalLoyaltyInfo?.isActive &&
                                            <button
                                                onClick={() => {
                                                    setVipModalState("updating")
                                                    setVipModal(true)
                                                }}
                                                className="updatePercent">
                                                Настроить индивидуальный статус
                                            </button>}
                                    </>}
                            </Buttons>
                            <AddInfo>
                                <div>
                                    <p>Общая сумма покупок</p>
                                    <span>{client.addInfo.amountOperation}</span>
                                </div>
                                <div>
                                    <p>Количество посещений</p>
                                    <span>{client.addInfo.countOperation}</span>
                                </div>
                            </AddInfo>
                        </SubContent>
                    </div>
                    <Button onClick={handleClient} startIcon={<ProfileIcon />}>
                        Карточка клиента
                    </Button>
                </WrapperContent> : selectedClients.length > 1 ?
                    <div>
                        <Text>Выбрано: {selectedClients.length}</Text>
                        <Buttons>
                            <MButton onClick={() => handleOpen("addCoins")}>
                                Начислить баллы
                                <CoinsIcon style={{ marginLeft: 10 }} />
                            </MButton>
                            <MButton onClick={() => handleOpen("removeCoins")}>
                                Списать баллы
                                <MinusCoinsIcon style={{ marginLeft: 10 }} />
                            </MButton>
                            <MToggle>
                                <p>Индивидуальный статус</p>
                                <CustomToggle
                                    onChange={handleChangeStatus} />
                            </MToggle>
                        </Buttons>
                        <SelectButtons>
                            <button onClick={() => handleAddAll(true)}>
                                Выбрать всех клиентов
                            </button>
                            <button onClick={() => handleAddAll(false)}>
                                Снять выделение
                            </button>
                        </SelectButtons>
                    </div> : null}
            <MModal
                refetch={refetch}
                clients={selectedClients}
                modalContent={modalContent}
                handleOpen={setIsModalOpen}
                open={isModalOpen} />
        </Wrapper>
    )
}
