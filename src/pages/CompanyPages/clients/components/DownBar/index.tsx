import {
  CloseIcon,
  CoinsIcon,
  DoneIcon,
  MiniCloseIcon,
  RightArrowIcon,
  VioletCancelIcon,
} from "assets/icons/ClientsPageIcons/ClientIcons";
import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import FullModal from "components/Custom/FullModal";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import {
  selectAll,
  setAllClients,
  setClient,
} from "services/redux/Slices/clients";
import { Content, Footer, Header, Main } from "./style";
import { useEffect } from "react";
import { IMobileForm } from "../../screens/ClientsPage/ClientsPage";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ResetModal } from "../ResetModal";
import { ViewAll } from "../ViewAll";
interface IProps {
  open: boolean;
  setModals: (arg: any) => void;
  setForm: (arg: IMobileForm) => void;
  refetch: () => void;
}

export const DownBar = ({ open, setModals, setForm, refetch }: IProps) => {
  const { selectedClients, allClients } = useAppSelector(
    (state) => state.clients
  );
  const [resetModal, setResetModal] = useState(false);
  const client = selectedClients[0];
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [checkAll, setCheckAll] = useState(false);
  const [fetchingAllClients, setFetchingAllClients] = useState("");
  const checked =
    selectedClients.length > 1
      ? selectedClients.every((el) => el.personalLoyaltyInfo.isActive)
      : client?.personalLoyaltyInfo?.isActive;

  const handleRemoveClient = (id: number) => {
    dispatch(setClient(id));
  };

  const handleClick = (e: any) => {
    if (allClients.length === 0) {
      setFetchingAllClients("Подождите, идет загрузка...");
    } else {
      dispatch(setAllClients(e.target.value === "true"));
    }
  };

  const handleToggleChange = (e: any) => {
    const checked = e.target.checked;
    if (checked) {
      setForm({
        open: true,
        action: 3,
      });
    } else {
      setResetModal(true);
    }
  };

  useEffect(() => {
    if (selectedClients.length === 0) {
      setModals((prev: any) => ({ ...prev, downBar: false }));
    }
  }, [selectedClients.length]);

  useEffect(() => {
    if (allClients.length > 0) {
      setFetchingAllClients("");
    }
  }, [allClients.length]);

  return (
    <FullModal direction="down" open={open}>
      {client && (
        <ResetModal
          refetch={refetch}
          client={{
            id: client.id,
            status: client.addInfo.status,
            percent: client.personalLoyaltyInfo.percent,
            prevPercent: client.obtainProgramLoyalty.percent,
            prevStatus: client.obtainProgramLoyalty.levelName,
          }}
          open={resetModal}
          onClose={() => setResetModal(false)}
        />
      )}
      <Header>
        <h5>Выбранно клиентов: {selectedClients.length}</h5>
        <CloseIcon
          onClick={() =>
            setModals((prev: any) => ({ ...prev, downBar: false }))
          }
        />
      </Header>
      <Main>
        {Boolean(fetchingAllClients) ? (
          <div>{fetchingAllClients}</div>
        ) : (
          <Content>
            {(selectedClients.length > 7
              ? selectedClients.slice(0, 7)
              : selectedClients
            ).map((client) => (
              <div
                onClick={() => handleRemoveClient(client.id)}
                className="client"
              >
                <p>{client.firstName + " " + client.lastName}</p>
                <MiniCloseIcon />
              </div>
            ))}
          </Content>
        )}
        {selectedClients.length > 7 && (
          <Button
            onClick={() => setCheckAll(true)}
            buttonStyle={{
              weight: 300,
              bgcolor: "#fff",
              color: "#3492FF",
            }}
          >
            {t("checkAll")}
          </Button>
        )}
        <Footer>
          <div className="vipProcent">
            <div className="toggler">
              <h6>Специальный статус</h6>
              <CustomToggle onChange={handleToggleChange} checked={checked} />
            </div>
            {checked && (
              <Button
                onClick={() => setForm({ open: true, action: 3 })}
                margin={{
                  mobile: "10px 0",
                }}
                buttonStyle={{
                  color: "#3492FF",
                  bgcolor: "#ffffff",
                  weight: 300,
                }}
              >
                {t("edit") + " %"}
              </Button>
            )}
          </div>
          {/* <Button
                        onClick={() => setForm({ open: true, action: 1 })}
                        endIcon={<CoinsIcon />}
                        margin={{ mobile: "0 0 20px 0" }}
                        buttonStyle={{
                            color: "#606EEA",
                            bgcolor: "rgba(96, 110, 234, 0.1)",
                        }}
                    >
                        Начислить баллы
                    </Button>
                    <Button
                        onClick={() => setForm({ open: true, action: 2 })}
                        endIcon={<CoinsIcon />}
                        margin={{ mobile: "0 0 20px 0" }}
                        buttonStyle={{
                            color: "#606EEA",
                            bgcolor: "rgba(96, 110, 234, 0.1)",
                        }}
                    >
                        Списать баллы
                    </Button> */}
          <button value="true" onClick={handleClick} className="customButton">
            Выбрать всех клиентов
          </button>
          <button value="false" onClick={handleClick} className="customButton">
            Снять выделение
          </button>
        </Footer>
      </Main>
      <FullModal open={checkAll}>
        <ViewAll onClose={() => setCheckAll(false)} />
      </FullModal>
    </FullModal>
  );
};
