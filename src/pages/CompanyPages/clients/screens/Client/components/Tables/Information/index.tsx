import { numberWith } from "services/utils";
import {
  AddInfo,
  BreakLine,
  Container,
  InfoBlock,
  InfoItem,
  NoteBlock,
  Wrapper,
} from "./style";
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import Button from "components/Custom/Button";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Recommendation } from "../../Recommendations";
import { getClientStatistics } from "pages/CompanyPages/clients/utils/getSelectedFilters";
import useWindowWidth from "services/hooks/useWindowWidth";
import FullModal from "components/Custom/FullModal";
import { NoteModal } from "../../NoteModal"
import { setNote } from "services/redux/Slices/clients";
import { useMutation } from "react-query";
import { sendNote } from "services/queries/clientsQuery";
const Information = () => {
  const { t } = useTranslation()
  const { currentClient } = useAppSelector(state => state.clients)
  const dispatch = useAppDispatch()
  const [noteState, setNoteState] = useState({
    value: currentClient?.clientInfo.notes + "",
    open: false
  })
  const client = currentClient?.clientInfo;
  const statistics = getClientStatistics(currentClient?.clientInfo.addInfo)
  const { width } = useWindowWidth()
  const refetch = () => {
    dispatch(setNote(noteState.value))
  }
  const { mutate } = useMutation((data: any) => sendNote(data))

  const handleSendNote = () => {
    if (client?.id) {
      mutate({
        clientId: client.id,
        notes: noteState.value
      })
    }
  }
  return (
    <Container>
      {width <= 600 &&
        <FullModal open={noteState.open}>
          <NoteModal config={{ setNote: setNoteState, refetch, note: noteState, handleSendNote }} />
        </FullModal>}
      <Wrapper>
        {statistics.map((el, index) => (
          <InfoItem>
            <span>{el?.heading}</span>
            <p>
              {numberWith(el?.value?.toString(), " ")}
            </p>
            {index !== statistics.length - 1 && <BreakLine />}
          </InfoItem>
        ))}
      </Wrapper>
      <AddInfo>
        <InfoBlock>
          <h4>{t("info")}</h4>
          <div>
            <p>{t("byRecommendation")}: <span>Ни Натальи</span> ({t("client")})</p>
            <p>{t('lastPurchase')}: {client?.addInfo?.lastPurchaseDate ? dayjs(client?.addInfo?.lastPurchaseDate).format("DD.MM.YYYY") : "-"}</p>
          </div>
          {<Button
            onClick={() => setNoteState((prev: any) => ({ ...prev, open: true }))}
            margin={{ mobile: "7px 0 0 0" }}
            buttonStyle={{ bgcolor: "rgba(96, 110, 234, 0.1);", color: "#3492FF" }}>
            {client?.notes ? t("editNote") : t("addNote") + " +"}
          </Button>}
        </InfoBlock>
        {client?.notes &&
          <NoteBlock>
            <h4>{t("noteAboutClient")}</h4>
            <p>{client?.notes}</p>
          </NoteBlock>}
        <Recommendation
          maxWidth="none"
          referLevels={currentClient?.childReferalClientsByLevel || []} />
      </AddInfo>
    </Container>
  )
}


export default Information;
