
import Modal from "components/Custom/Modal";

import useWindowWidth from "services/hooks/useWindowWidth";
import { useTranslation } from "react-i18next";
import {WrapperModal,CloseButton,Buttons} from "./style";
import { CloseIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import Button from "components/Custom/Button";
import dayjs from "dayjs";
import { SaveIcon } from "assets/icons/news/newsIcons";
import { MobileCancelIcon } from "assets/icons/proposals/ProposalsIcons";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
interface ConfirmModal{
   
    submit:any,
    cancelSubmit:()=>void,
    submitData:()=>void,
    startDate:any,
    todayDate:any
}

export const ConfirmModal=({submit, cancelSubmit,startDate,todayDate,submitData}:ConfirmModal)=>{

    const { width } = useWindowWidth();
    const { t } = useTranslation();

    return (
        <Modal modalStyle={{ bgcolor: "#fff" }} open={submit} > 
        <WrapperModal>
          {width > 600 && (
            <CloseButton onClick={cancelSubmit}>
              <CloseIcon />
            </CloseButton>
          )}

          <h3 style={{ marginRight: "20px" }}>
            {startDate > todayDate
              ? t(`Новость будет добавлена в раздел "В ожидании" `)
              : t("Новость будет опубликована сразу")}
          </h3>
          <p>
            {startDate > todayDate
              ? t(
                  `Новость будет опубликована ${dayjs(startDate).format(
                    "DD.MM.YYYY"
                  )} `
                )
              : t(
                  "Новость перейдет в раздел Активные и будет доступна вашим клиентам в приложении"
                )}
          </p>
          {width > 600 ? (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
                margin={{ laptop: "0 22px 0 0" }}
                onClick={cancelSubmit}
                startIcon={<CancelIcon />}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                margin={{ laptop: "0 22px 0 0" }}
                onClick={submitData}
                buttonStyle={{shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' }}
                startIcon={<SaveIcon />}
              >
                Сохранить
              </Button>
            </div>
          ) : (
            <Buttons>
              <div className="upside">
                <Button
                  onClick={cancelSubmit}
                  endIcon={<MobileCancelIcon />}
                  buttonStyle={{
                    bgcolor: "rgba(96, 110, 234, 0.1)",
                    color: "#606EEA",
                  }}
                  margin={{ mobile: "0 8px 8px 0" }}
                >
                  {t("cancel")}
                </Button>
              </div>
              <Button
                onClick={submitData}
                type="submit"
                endIcon={<SaveIcon />}
                buttonStyle={{
                  bgcolor: "#606EEA",
                  color: "#fff",
                  shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)'
                }}
                margin={{ mobile: "0px 8px  8px  0" }}
              >
                {"Сохранить"}
              </Button>
            </Buttons>
          )}
        </WrapperModal>
      </Modal>
    )
}