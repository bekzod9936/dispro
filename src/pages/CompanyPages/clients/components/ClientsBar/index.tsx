import { MButton } from "./components/Button";
import { VipModal } from "./components/VipModal";
import Button from "components/Custom/Buttons/Button";
import dayjs from "dayjs";
import {
  CloseIcon,
  CoinsIcon,
  MiniCloseIcon,
  MinusCoinsIcon,
  ProfileIcon,
  UnBlockIconBlue,
} from "assets/icons/ClientsPageIcons/ClientIcons";
import { CancelButton } from "../QrCodeBar/style";
import {
  selectAll,
  setAllClients,
  setClient,
} from "services/redux/Slices/clients";
import { MModal } from "../Modal";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import {
  AddInfo,
  Buttons,
  Content,
  ContentInfo,
  DefaultImage,
  MToggle,
  SelectButtons,
  SelectedClients,
  SubContent,
  Text,
  Wrapper,
  WrapperContent,
} from "./style";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import { BlockModal } from "../BlockModal";
import Modal from "components/Custom/Modal";
import clientDefaultImage from "assets/images/staff_default.png";
import { numberWith } from "services/utils";
import FullModal from "components/Custom/FullModal";
import { ViewAll } from "../ViewAll";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { blockClient } from "services/queries/clientsQuery";
import useWindowWidth from "services/hooks/useWindowWidth";
import { usePermissions } from "services/hooks/usePermissions";
interface IProps {
  refetch: any;
}

const modalInfo: any = {
  addCoins: {
    title: "Начисление баллов",
    subtitle: "Количество баллов",
    btn: "Начислить",
    action: "addCoins",
  },
  removeCoins: {
    title: "Списание баллов",
    subtitle: "Количество баллов",
    info: "Клиент будет проинформирован о списании баллов push-уведомлением",
    btn: "Списать",
    action: "removeCoins",
  },
};

export const ClientsBar = ({ refetch }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isEditable = usePermissions("clients");

  const { selectedClients, allClients, disableSpecStatus } = useAppSelector(
    (state) => state.clients
  );
  const client = selectedClients[0];
  const [vipModal, setVipModal] = useState(false);
  const history = useHistory();
  const [checkAll, setCheckAll] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>({});
  const [vipModalState, setVipModalState] = useState<
    "selecting" | "updating" | "removing"
  >("selecting");
  const [fetchingAllClients, setFetchingAllClients] = useState("");
  const { width } = useWindowWidth();
  const handleOpen = (action: string) => {
    setIsModalOpen(true);
    setModalContent(modalInfo[action]);
  };

  const handleAddAll = (action: boolean) => {
    if (allClients.length === 0) {
      setFetchingAllClients("Подождите несколько минут...");
    } else {
      dispatch(setAllClients(action));
    }
  };

  const handleClose = () => {
    dispatch(selectAll(false));
  };

  const handleClient = () => {
    const path = width > 1000 ? "operations" : "information";
    history.push(`/clients/${client.id}-${client.userId}/${path}`);
  };

  const handleChangeStatus = (e: any) => {
    let checked = e.target.checked;
    if (checked) {
      setVipModal(true);
      setVipModalState("selecting");
    } else {
      setVipModal(true);
      setVipModalState("removing");
    }
  };

  useEffect(() => {
    if (allClients.length > 0) {
      setFetchingAllClients("");
    }
  }, [allClients]);
  const { mutate } = useMutation((data: any) => blockClient(data));

  const handleUnblock = () => {
    mutate({
      clientId: client.id,
      isPlBlocked: false,
      reason: "",
    });
    refetch();
  };

  return (
    <Wrapper>
      <BlockModal
        handleClose={setBlockModal}
        refetch={refetch}
        clientId={client?.id || 0}
        isOpen={blockModal}
        isBlocking={!client?.isPlBlocked}
      />
      <Modal open={vipModal}>
        <VipModal
          clientInfo={{
            isBlocked: client?.isPlBlocked,
            name: client?.firstName + " " + client?.lastName,
            prevStatus: client?.obtainProgramLoyalty?.levelName,
            prevPercent: client?.obtainProgramLoyalty?.percent,
            value:
              client?.personalLoyaltyInfo?.percent ||
              client?.obtainProgramLoyalty?.percent,
            status: client?.personalLoyaltyInfo?.percent
              ? client?.addInfo?.status
              : client?.obtainProgramLoyalty?.levelName,
          }}
          id={client?.id}
          state={vipModalState}
          refetch={refetch}
          handleClose={() => setVipModal(false)}
        />
      </Modal>
      <CancelButton onClick={handleClose}>
        <CloseIcon />
      </CancelButton>
      {selectedClients.length === 1 ? (
        <WrapperContent>
          <div>
            <Content>
              {client.image ? (
                <img
                  src={client.image}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = clientDefaultImage;
                  }}
                  alt="clientAvatar"
                />
              ) : (
                <DefaultImage />
              )}
              <ContentInfo>
                <p>
                  {client.firstName} {client.lastName}
                </p>
                <span>
                  Статус:{" "}
                  {client.personalLoyaltyInfo.isActive
                    ? "Спец"
                    : client.obtainProgramLoyalty.levelName}{" "}
                  {client.personalLoyaltyInfo.isActive
                    ? client.personalLoyaltyInfo.percent
                    : client.obtainProgramLoyalty.percent}
                  %
                </span>
              </ContentInfo>
            </Content>
            <SubContent>
              <p>
                Последняя покупка:{" "}
                {client.addInfo.lastPurchaseDate
                  ? dayjs(client.addInfo.lastPurchaseDate).format("DD.MM.YYYY")
                  : "-"}
              </p>
              <Buttons disabled={!isEditable}>
                {client.isPlBlocked ? (
                  <div className="blockedContent">
                    <p>Клиент заблокирован</p>
                    {client.blockedReason && (
                      <span>{client.blockedReason}</span>
                    )}
                    <Button
                      disabled={!isEditable}
                      onClick={handleUnblock}
                      margin={{ laptop: "20px 0" }}
                      buttonStyle={{
                        color: "#606EEA",
                        bgcolor: "rgba(96, 110, 234, 0.1)",
                      }}
                      endIcon={<UnBlockIconBlue />}
                    >
                      Разблокировать
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* <MButton onClick={() => handleOpen("addCoins")}>
                                            Начислить баллы
                                            <CoinsIcon style={{ marginLeft: 10 }} />
                                        </MButton>
                                        <MButton onClick={() => handleOpen("removeCoins")}>
                                            Списать баллы
                                            <MinusCoinsIcon style={{ marginLeft: 10 }} />
                                        </MButton> */}
                    <MToggle>
                      <p>Специальный статус</p>
                      <CustomToggle
                        disabled={!isEditable || disableSpecStatus}
                        checked={
                          client?.personalLoyaltyInfo?.isActive || vipModal
                        }
                        defaultChecked={client?.personalLoyaltyInfo?.isActive}
                        onChange={handleChangeStatus}
                      />
                    </MToggle>
                    {client?.personalLoyaltyInfo?.isActive && (
                      <button
                        disabled={!isEditable || disableSpecStatus}
                        onClick={() => {
                          setVipModalState("updating");
                          setVipModal(true);
                        }}
                        className="updatePercent"
                      >
                        Настроить специальный статус
                      </button>
                    )}
                  </>
                )}
              </Buttons>
              <AddInfo>
                <div>
                  <p>Общая сумма покупок</p>
                  <span>
                    {numberWith(client.addInfo.amountOperation + "", " ")}
                  </span>
                </div>
                <div>
                  <p>Количество посещений</p>
                  <span>
                    {numberWith(client.addInfo.countOperation + "", " ")}
                  </span>
                </div>
              </AddInfo>
            </SubContent>
          </div>
          <Button onClick={handleClient} startIcon={<ProfileIcon />}>
            Карточка клиента
          </Button>
        </WrapperContent>
      ) : selectedClients.length > 1 ? (
        <div>
          <Text>Выбрано: {selectedClients.length}</Text>
          {fetchingAllClients ? (
            <div className="loadingText">{fetchingAllClients}</div>
          ) : (
            <SelectedClients>
              {selectedClients.map((client) => (
                <div className="client">
                  <span>{client.firstName + " " + client.lastName}</span>
                  <MiniCloseIcon
                    onClick={() => dispatch(setClient(client.id))}
                  />
                </div>
              ))}
            </SelectedClients>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => setCheckAll(true)}
              margin={{
                laptop: "5px auto",
              }}
              buttonStyle={{
                color: "#3492FF",
                bgcolor: "#fff",
              }}
            >
              {t("checkSelected")}
            </Button>
          </div>
          <Buttons disabled={!isEditable}>
            {/* <MButton onClick={() => handleOpen("addCoins")}>
              Начислить баллы
              <CoinsIcon style={{ marginLeft: 10 }} />
            </MButton>
            <MButton onClick={() => handleOpen("removeCoins")}>
              Списать баллы
              <MinusCoinsIcon style={{ marginLeft: 10 }} />
            </MButton> */}
            <MToggle>
              <p>Специальный статус</p>
              <CustomToggle
                disabled={!isEditable || disableSpecStatus}
                checked={
                  selectedClients.every(
                    (client) => client.personalLoyaltyInfo.isActive
                  ) || vipModal
                }
                defaultChecked={selectedClients.every(
                  (client) => client.personalLoyaltyInfo.isActive
                )}
                onChange={handleChangeStatus}
              />
            </MToggle>
            {selectedClients.every((el) => el.personalLoyaltyInfo.isActive) && (
              <button
                disabled={!isEditable || disableSpecStatus}
                onClick={() => {
                  setVipModalState("updating");
                  setVipModal(true);
                }}
                className="updatePercent"
              >
                Настроить специальный статус
              </button>
            )}
          </Buttons>
          <SelectButtons>
            <button onClick={() => handleAddAll(true)}>
              Выбрать всех клиентов
            </button>
            <button onClick={() => handleAddAll(false)}>Снять выделение</button>
          </SelectButtons>
        </div>
      ) : null}
      <MModal
        refetch={refetch}
        clients={selectedClients}
        modalContent={modalContent}
        handleOpen={setIsModalOpen}
        open={isModalOpen}
      />
      <FullModal open={checkAll}>
        <ViewAll onClose={() => setCheckAll(false)} />
      </FullModal>
    </Wrapper>
  );
};
