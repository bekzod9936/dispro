import { IconButton } from "@material-ui/core";
import {
  CancelIcon,
  CloseIcon,
  WhiteEditIcon,
} from "assets/icons/ClientsPageIcons/ClientIcons";
import { PenIcon } from "assets/icons/proposals/ProposalsIcons";
import Button from "components/Custom/Buttons/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import Modal from "components/Custom/Modal";
import dayjs from "dayjs";
import { MToggle } from "pages/CompanyPages/clients/components/ClientsBar/style";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { usePermissions } from "services/hooks/usePermissions";
import { sendNote } from "services/queries/clientsQuery";
import { useAppSelector } from "services/redux/hooks";
import { IClient } from "services/redux/Slices/clients/types";
import { NoteModal } from "../NoteModal";
import { DownSide, Note, NoteView, UpSide, Wrapper } from "./style";
interface IProps {
  client: IClient | any;
  setVipModal: (arg: boolean) => void;
  setVipModalState: (arg: "selecting" | "updating" | "removing") => void;
  vipModal: boolean;
  referBy: any;
  refetch: () => void;
}
interface INote {
  clientId: number;
  notes: string;
}

const referTypes: any = {
  1: "client",
  2: "partner_admin",
  3: "cashier",
  4: "manager",
  5: "worker",
};

export const InfoBlock = ({
  referBy,
  vipModal,
  client: { addInfo, personalLoyaltyInfo, isPlBlocked, notes },
  setVipModal,
  setVipModalState,
  refetch,
}: IProps) => {
  const [note, setNote] = useState({
    value: notes,
    open: false,
  });
  const isEditable = usePermissions("clients");
  const [noteView, setNoteView] = useState(false);
  const { currentClient, disableSpecStatus } = useAppSelector(
    (state) => state.clients
  );
  const handleChangePercent = (e: any) => {
    let checked = e.target.checked;
    setVipModal(true);
    if (checked) {
      setVipModalState("selecting");
    } else {
      setVipModalState("removing");
    }
  };
  const mutation = useMutation((data: INote) => sendNote(data));

  const { t } = useTranslation();

  const handleSendNote = () => {
    if (currentClient?.clientInfo.id) {
      mutation.mutate({
        clientId: currentClient.clientInfo.id,
        notes: note.value,
      });
    }
  };

  return (
    <Wrapper>
      <Modal open={noteView}>
        <NoteView>
          <div className="header">
            <h3>?????????????? ?? ??????????????</h3>
            <IconButton onClick={() => setNoteView(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <p>{notes}</p>
          <div className="buttons">
            <Button
              onClick={() => setNoteView(false)}
              margin={{ laptop: "0 20px 0 0" }}
              buttonStyle={{ bgcolor: "#ffffff", color: "#223367" }}
              startIcon={<CancelIcon />}
            >
              {t("cancel")}
            </Button>
            <Button
              disabled={!isEditable}
              onClick={() => setNote((prev: any) => ({ ...prev, open: true }))}
              startIcon={<WhiteEditIcon />}
            >
              {t("edit")}
            </Button>
          </div>
        </NoteView>
      </Modal>
      <Modal open={note.open}>
        <NoteModal
          edit
          config={{
            note,
            setNote,
            handleSendNote,
            refetch,
          }}
        />
      </Modal>
      <UpSide disabled={!isEditable}>
        <h4>{t("info")}</h4>
        <button
          disabled={!isEditable}
          onClick={() => setNote((prev: any) => ({ ...prev, open: true }))}
        >
          {notes ? t("editNote") : t("addNote") + " +"}
        </button>
      </UpSide>
      <DownSide>
        {referBy?.name && (
          <p>
            {t("byRecommendation")}: <span>{referBy.name}</span>(
            {t(referTypes[referBy.type])})
          </p>
        )}
        <p>
          {t("lastPurchase")}:{" "}
          {addInfo?.lastPurchaseDate
            ? dayjs(addInfo?.lastPurchaseDate).format("DD.MM.YYYY")
            : "-"}
        </p>
        {notes && (
          <Note>
            {t("note")}:{" "}
            {notes.length > 15 ? notes.slice(0, 15) + "..." : notes}{" "}
            {notes.length > 15 && (
              <button onClick={() => setNoteView(true)}>
                ???????????????? ????????????????????
              </button>
            )}
          </Note>
        )}
        {isPlBlocked && <b>???????????? ????????????????????????</b>}
        <div className="changeStatus">
          <MToggle>
            <p>?????????????????????? ????????????</p>
            <CustomToggle
              disabled={!isEditable || isPlBlocked || disableSpecStatus}
              checked={personalLoyaltyInfo?.isActive || vipModal}
              onChange={handleChangePercent}
            />
          </MToggle>
          {personalLoyaltyInfo?.isActive && (
            <Button
              disabled={!isEditable || isPlBlocked || disableSpecStatus}
              onClick={() => {
                setVipModalState("updating");
                setVipModal(true);
              }}
              buttonStyle={{
                color: "#3492FF",
                bgcolor: "#ffffff",
                weight: "300",
              }}
              margin={{ laptop: "0 0 0 20px" }}
            >
              ??????????????????
            </Button>
          )}
        </div>
      </DownSide>
    </Wrapper>
  );
};
