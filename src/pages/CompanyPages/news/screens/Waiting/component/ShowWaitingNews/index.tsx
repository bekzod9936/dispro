import React,{useState} from "react";
import Title from "components/Custom/Title";
import { deleteNews } from "services/queries/newPageQuery";
import { ReactComponent as LeftBack } from "assets/icons/FinanceIcons/leftback.svg";
import { useHistory } from "react-router-dom";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import dayjs from "dayjs";
import { months } from "../../../useData/index";

import { CancelIcon } from "assets/icons/news/newsIcons";
import { PenIcon } from "assets/icons/news/newsIcons";
import { DeleteIcon } from "assets/icons/proposals/ProposalsIcons";
import useWindowWidth from 'services/hooks/useWindowWidth';
import { PublicModal } from "../../../../components/NewsBar/components/PublicModal";
import FullModal from "components/Custom/FullModal";
import { IconButton } from "@material-ui/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CloseButton } from "../../../../components/NewsBar/style";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {

  WhitePublishIcon,
  BluePenIcon,
  RepairNewsIcon,
} from "assets/icons/news/newsIcons";
import {
  Wrapper,
  DeleteModal,
  Content,
  Preview,
  MainWrapper,
  PreviewContent,
  Buttons,
  ModalContent,
  HeaderLaptop,
  WrapAvatar,
  WrapIcon,
  WrapBox,
  WrapBoxDetail,
  Box,
  WrapperModal,
  BoxInfo,
  BoxinfoDetail,
  
} from "./style";
import { GoBackIcon } from "assets/icons/proposals/ProposalsIcons";
import iphone from "assets/images/iphone.png";
import { useAppSelector } from "services/redux/hooks";
import { CloseIcon } from "assets/icons/news/newsIcons";
const ShowWaitingNews = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation();
  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  const newsById = selectedNews?.fullData;
  const [isDeleteOpen, setDeleteOpen] = React.useState<boolean>(false);
  const [isPublishOpen, setPublisOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(true);
  const handleBack = () => {
    history.goBack();
  };
  const handleBackLaptop=()=>{
    setOpen(false);
    history.goBack();
  }
  const editNews = () => {
    history.push("/news/edit");
  };

  React.useEffect(() => {
    if (newsById === undefined) {
      handleBack();
      handleBackLaptop();
    }
  }, []);
  const onDelete = async (id: number) => {
    await deleteNews(id);
    history.goBack();
  };
  const { width } = useWindowWidth();
  const startDate = dayjs(newsById?.data?.startLifeTime).format("YYYY-MM-DD");
  const endDate = dayjs(newsById?.data?.endLifeTime).format("YYYY-MM-DD");
  const startdates = new Date(startDate);
  const enddates = new Date(endDate);
  const startmonthName = months[startdates.getMonth()];
  const endmonthName = months[enddates.getMonth()];
  const startDays = startdates.getDate();
  const endDays = enddates.getDate();
  const years = enddates.getFullYear();

  const date =
    startDays +
    " " +
    startmonthName +
    " - " +
    endDays +
    " " +
    endmonthName +
    "" +
    years;

  return (
    <MainWrapper>
     
      <div style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
        <GoBackIcon
          onClick={handleBack}
          style={{ marginRight: "25px", cursor: "pointer" }}
        />
        <Title>
          {newsById?.data?.title?.length > 30
            ? newsById?.data?.title?.slice(0, 30) + "..."
            : newsById?.data?.title}
        </Title>
      </div>
      <Wrapper>
        <Preview>
          <img style={{objectFit:'fill'}} className="couponImg" src={newsById?.data?.image} alt="" />
          <img className="iphoneImg" max-width="300px" src={iphone} />
          <PreviewContent>
            <h5>
              <span style={{wordBreak: 'break-all' }}>
                
                  {newsById?.data?.title}
              </span>
            </h5>
            <p style={{ paddingTop: "10px",wordBreak: 'break-all' }}>
              {newsById?.data?.description.length > 250
                ? newsById?.data?.description?.slice(0, 250) + "..."
                : newsById?.data?.description}
            </p>
            <div
              style={{
                position: "absolute",
                bottom: "10%",
                padding: "8px 30px",
                backgroundColor: "#606EEA",
                color: "white",
                borderRadius: "20px",
              }}
            >
              <span style={{ color: "white", fontSize: "12px" }}>
                Написать нам
              </span>
            </div>
          </PreviewContent>
          <div>
          <Content>
  <div style={{display:'flex',justifyContent:'space-between',}}>
           <div style={{padding: '0 0 0 50px'}}>
          <h5>Название новости</h5>
          <p style={{color:'#223367',maxWidth:'500px',wordBreak: 'break-all',margin:"15px 0px 25px 0"}}>{newsById?.data?.title}</p>
          <h5>Описание новости</h5>
          {newsById?.data?.description?.length>790 ?
            <p style={{color:'#223367',fontSize:'12px',fontWeight:'300',margin:"15px 0px 25px 0",wordBreak: 'break-all',maxWidth:'500px'}}>{newsById?.data?.description}</p>:
            <p style={{color:'#223367',fontWeight:'300',margin:"15px 0px 25px 0",wordBreak: 'break-all',maxWidth:'600px'}}>{newsById?.data?.description}</p>
             }
        
          
            <div style={{display:'flex'}}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingTop: "2%",
                paddingRight: "5%",
              }}
            >
              <Button
                onClick={() => editNews()}
                buttonStyle={{
                  color: "white",
                  bgcolor: "#606EEA",
                  shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)",
                }}
                startIcon={<PenIcon />}
              >
                Редактировать
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: "2%",
                paddingRight: "50%",
              }}
            >
              <Button
                onClick={() => setDeleteOpen(true)}
                buttonStyle={{
                  color: "#ffffff",
                  bgcolor: "#FF5E68",
                  shadow: "0px 4px 9px rgba(255, 94, 104, 0.46)",
                }}
                startIcon={<DeleteIcon />}
              >
                Удалить
              </Button>
            </div>
            </div>
            </div>
            <div style={{padding: '0 20px 0 50px'}}>  <h5>Информация</h5>
            <p >
              {newsById?.data?.genderType === 1
                ? "Только для мужчин"
                : newsById?.data?.genderType === 2
                ? "Только для женщины"
                : "Для всех"}
            </p>
            <p >Срок публикации: {date}</p>
            <p>Возрастное ограничение: {newsById?.data?.ageFrom + "+"}</p></div>
            </div>
          </Content>
          </div>
        </Preview>
        <Modal open={isDeleteOpen}>
          <DeleteModal>
            <h5>Вы действительно хотите удалить новость?</h5>
            <p>{"После удаления новости  данные будет утеряны"}</p>
            <Button
              buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
              margin={{ laptop: "0 22px 0 0" }}
              onClick={() => setDeleteOpen(false)}
              startIcon={<CancelIcon />}
            >
              Отмена
            </Button>
            <Button
              buttonStyle={{
                bgcolor: "#FF5E68 ",
                shadow: "0px 4px 9px rgba(255, 94, 104, 0.46)",
              }}
              onClick={() => onDelete(newsById?.data?.id)}
              startIcon={<DeleteIcon />}
            >
              Удалить
            </Button>
          </DeleteModal>
        </Modal>
      </Wrapper>
       
    </MainWrapper>
  );
};

export default ShowWaitingNews;
