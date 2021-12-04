import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import {WrapperModal,CloseButton,Buttons} from "./style";
import useWindowWidth from 'services/hooks/useWindowWidth';
import { CloseIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { useTranslation } from "react-i18next";
 interface LimitNewsModal{
  errormessage?: boolean,
  linkToComment:()=>void,
  CancelError:()=>void,
}

export const LimitNews=({errormessage,linkToComment,CancelError}:LimitNewsModal)=>{
    const { width } = useWindowWidth();
    const { t } = useTranslation();
    return (
<Modal modalStyle={{ bgcolor: "#fff" }} open={errormessage}>
        <WrapperModal>
          {width > 600 &&  
        <CloseButton onClick={CancelError}>
        <CloseIcon />
      </CloseButton>}
    
      <h3 >
       {t('Лимит новостей исчерпан')} 
      </h3>
          <p>
           {t('Для более подробной информации, просим обратиться к Модератору')}
          </p>
          {width > 600 ? (
            <>
              <Button
                buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
                margin={{ laptop: "0 22px 0 0" }}
                onClick={linkToComment}
                // startIcon={<CancelIcon />}
              >
                {t('Написать')}
              </Button>
              <Button
              
                margin={{ laptop: "0 22px 0 0" }}
                onClick={CancelError}
                // startIcon={<SaveIcon />}
              >
                {t('Ok')}
              </Button>
            </>
          ) : (
            <Buttons>
              <div className="upside">
                <Button
                        onClick={linkToComment}
                  // endIcon={<MobileCancelIcon />}
                  buttonStyle={{
                    bgcolor: "rgba(96, 110, 234, 0.1)",
                    color: "#606EEA",
                  }}
                  margin={{ mobile: "0 8px 8px 0" }}
                >
                  {t("Написать")}
                </Button>
              </div>
              <Button
                onClick={CancelError}
                // endIcon={<SaveIcon />}
                buttonStyle={{
                  bgcolor: "#606EEA",
                  color: "#fff",
                }}
                margin={{ mobile: "0px 8px  8px  0" }}
              >
                {"Ok"}
              </Button>
            </Buttons>
          )}
        </WrapperModal>
      </Modal>
    )


}