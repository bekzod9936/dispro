
import Modal from "components/Custom/Modal";
import {WrapperModal,Buttons} from '../ConfirmModal/style';
import useWindowWidth from "services/hooks/useWindowWidth";
import Button from "components/Custom/Button";
import { useTranslation } from "react-i18next";
import { MobileCancelIcon } from "assets/icons/proposals/ProposalsIcons";
import { SaveIcon,SaveIconMobile } from "assets/icons/news/newsIcons";
interface CancelNewsModal{
    cancel:any,
    cancelNews:()=>void,
    notCancel:()=>void
}

export const CancelNewsModal=({cancel, cancelNews,notCancel}:CancelNewsModal)=>{

    const { width } = useWindowWidth();
    const { t } = useTranslation();

    return (
        <Modal modalStyle={{ bgcolor: "#fff" }} open={cancel}>
        <WrapperModal>
          <p style={{ color: "black" }}>
            {t("Вы действительно хотите отменить создание новости")}
          </p>
          {width > 600 ? (
            <>
              <Button
                buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
                margin={{ laptop: "0 22px 0 0" }}
                onClick={notCancel}
              >
                {t("Нет")}
              </Button>
              <Button
                type="submit"
                margin={{ laptop: "0 22px 0 0" }}
                onClick={cancelNews}
                buttonStyle={{shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' }}
              >
                {t("Да")}
              </Button>
            </>
          ) : (
            <Buttons>
              <div className="upside">
                <Button
                  onClick={notCancel}
                  endIcon={<MobileCancelIcon />}
                  buttonStyle={{
                    bgcolor: "rgba(96, 110, 234, 0.1)",
                    color: "#606EEA",
                  }}
                  margin={{ mobile: "0 8px 8px 0" }}
                >
                  {t("Нет")}
                </Button>
              </div>
              <Button
                onClick={cancelNews}
                type="submit"
                endIcon={<SaveIconMobile />}
                buttonStyle={{
                  bgcolor: "#606EEA",
                  color: "#fff",
                  shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' 
                }}
                margin={{ mobile: "0px 8px  8px  0" }}
              >
                {t("Да")}
              </Button>
            </Buttons>
          )}
        </WrapperModal>
      </Modal>
    )
}