import {
  CancelIcon,
  CloseIcon,
} from "assets/icons/ClientsPageIcons/ClientIcons";

import { WatchIcons,WatchIconsWhite, DeleteIcon,PublishIcon,RepairNewsIcon } from "assets/icons/news/newsIcons";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { deleteNews } from "services/queries/newPageQuery";
import { IDeferred } from "services/redux/Slices/news/types";
import {PublicModal} from "./components/PublicModal";

import {
  Wrapper,
  Header,
  DeleteModal,
  ContentInfo,
  ContentSideBar,
  PreviewDivNews,
  ContentButton,
  LeftRound,
  PreviewBgNews,
  WrapperModal,
  CloseButton,
} from "./style";

import { useTranslation } from "react-i18next";

interface IProps {
  onClose: (arg: boolean) => void;
  currentNews: IDeferred;
  refetch: any;
}
export const NewsBar = ({ refetch, onClose, currentNews }: IProps) => {

  console.log("currentNews",currentNews)

  const history = useHistory();
  const location = useLocation();

  const { t } = useTranslation();
  const [isDeleteOpen, setDeleteOpen] = React.useState<boolean>(false);
  const [isPublishOpen, setPublisOpen] = React.useState<boolean>(false);
 


  const showNew = () => {
    if (currentNews) {
       history.push("/news/showwaiting");
    
    }
  };


  const restoreNews=()=>{
    if (currentNews) {
      history.push("/news/repair");
    }
  }

  const onDelete = async () => {
    await deleteNews(currentNews?.data?.id);
    await refetch.refetch();
    setDeleteOpen(false);
    onClose(false);
  };
console.log('gender',currentNews?.genderType )
  return (
    <Wrapper>
      <Header>
        <h6>{'Новости'}</h6>
        <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
      </Header>
      {/* <Preview> */}
      <LeftRound>
        <PreviewDivNews>
          {currentNews?.data?.image?.length > 6 && (
            <PreviewBgNews src={currentNews?.data?.image} alt="" />
          )}
          <img
            style={{ zIndex: 20, position: "relative",objectFit:'fill' }}
            width="320"
            height="180"
            alt=""
          />
        </PreviewDivNews>
        <h5>{currentNews?.data?.title?.length>50 ? currentNews?.data?.title?.slice(0,30)+'...':currentNews?.data?.title}</h5>
        <p style={{wordBreak: 'break-all'}}>{currentNews?.data?.description?.length> 66 ? currentNews?.data?.description?.slice(0,66)+'...':currentNews?.data?.description}</p>
      </LeftRound>
      <ContentSideBar>
        <ContentInfo>
          <h5>Информация</h5>
       
          <p>{currentNews?.data?.genderType ===0 ?  'Для всех' : currentNews?.data?.genderType ===1 ? 'Только для мужчин':`Только для женщин` }</p>
          <p>Срок публикации: {currentNews?.date}</p>
          <p>Возрастное ограничение: {currentNews?.data?.ageFrom}+</p>
        </ContentInfo>
        <ContentButton>
          {location.pathname === "/news/waiting" &&(
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom:'10px',
              
              }}
            >
              <Button
                onClick={() => showNew()}
                buttonStyle={{
                  color: "#606EEA",
                  bgcolor: " rgba(96,110,234,0.1)",
                }}
                startIcon={<WatchIcons />}
              >
                Смотреть полностью
              </Button>
            </div>
          )}
             {location.pathname === "/news/active" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom:'10px',
        
              }}
            >
              <Button
                onClick={() => showNew()}
                buttonStyle={{
                  color: "#fff",
                  bgcolor: "#606EEA",
                  shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)'
                  
                }}
                startIcon={<WatchIconsWhite />}
              >
                Смотреть полностью
              </Button>
            </div>
          )}
          {location.pathname === "/news/waiting" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: "25px",
                marginBottom:'10px',
           
              }}
            >
              <Button
                onClick={() => setPublisOpen(true)}
                buttonStyle={{
                  color: "#606EEA",
                  bgcolor: " rgba(96,110,234,0.1)",
                }}
                startIcon={<PublishIcon />}
              >
                Опубликовать
              </Button>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingTop: "5%",
              
         
            }}
          >
            {location.pathname !== "/news/archive" && (
              <Button
                onClick={() => setDeleteOpen(true)}
                buttonStyle={{ color: "#ffffff", bgcolor: "#FF5E68" ,shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)'}}
                startIcon={<DeleteIcon />}
              >
                Удалить
              </Button>
            )}
            {location.pathname === "/news/archive" && (
              <Button
                onClick={() => restoreNews()}
                buttonStyle={{ color: "#ffffff", bgcolor: "#606EEA",shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' }}
                startIcon={<RepairNewsIcon />}
              >
                Восстановить новость
              </Button>
            )}
          </div>
        </ContentButton>
      </ContentSideBar>
      <Modal open={isDeleteOpen}>
        <DeleteModal>
          <h5>Вы действительно хотите удалить новость?</h5>
          <p>{'После удаления новости  данные будет утеряны'}</p>
          <Button
            buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
            margin={{ laptop: "0 22px 0 0" }}
            onClick={() => setDeleteOpen(false)}
            startIcon={<CancelIcon />}
          >
            Отмена
          </Button>
          <Button
            buttonStyle={{ bgcolor: "#FF5E68 " ,shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)'}}
            onClick={onDelete}
            startIcon={<DeleteIcon />}
          >
            Удалить
          </Button>
        </DeleteModal>
      </Modal>
      <Modal modalStyle={{ bgcolor: "#fff" }}  open={isPublishOpen}>
        <WrapperModal>
          <CloseButton onClick={() => setPublisOpen(false)}>
            <CloseIcon />
          </CloseButton>
          <h3>
           {t('Выберите период')}
          </h3>
          <PublicModal  setPublisOpen={setPublisOpen} />
      
        </WrapperModal>
      </Modal>
    </Wrapper>
  );
};
