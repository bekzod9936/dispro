
import Modal from "components/Custom/Modal";
import {WrapperModal,UploadButton,CloseButton} from './style';
import useWindowWidth from "services/hooks/useWindowWidth";
import { CloseIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import {MobileCloseIcon} from "assets/icons/news/newsIcons";
import { useTranslation } from "react-i18next";
import {
 
    UploadImage,
  } from "assets/icons/proposals/ProposalsIcons";
interface UploadModal{
    errorFileType:any,
    handleUploadImg:(data:any)=>void,
    cancelFormat:()=>void
}

export const UploadModal=({errorFileType, handleUploadImg,cancelFormat}:UploadModal)=>{

    const { width } = useWindowWidth();
    const { t } = useTranslation();

    return (
        <Modal modalStyle={{ bgcolor: "#fff" }} open={errorFileType}>
        <WrapperModal>
        <CloseButton onClick={cancelFormat}>
          {width>600 ?  <CloseIcon />:< MobileCloseIcon/>}
            
            </CloseButton>
          <p style={{ color: "black" }}>
            {t("Можно загрузить изображение формата jpeg или png")}
          </p>
      
              <UploadButton>
                <label htmlFor="uploadImg">Загрузить фото</label>
                <input onChange={handleUploadImg} type="file" id="uploadImg" />
                <UploadImage />
              </UploadButton>
         
        </WrapperModal>
      </Modal>
    )
}