import { useMutation } from "react-query";
import React from 'react';
import { deleteCoupon, putCoupon } from "services/queries/proposalQuery";
import { IDeferred } from "services/redux/Slices/proposals/types";
import Title from "components/Custom/Title";
import { deleteNews } from "services/queries/newPageQuery";
import { useHistory } from "react-router-dom";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import dayjs from "dayjs";
import {months} from '../../../useData/index';
import {
  CancelIcon,

} from "assets/icons/ClientsPageIcons/ClientIcons";
import {

    PenIcon,

  } from "assets/icons/news/newsIcons";
import {
  Wrapper,

  DeleteModal,
  Content,
  Preview,
  MainWrapper,
  PreviewContent,
} from "./style";
import {
  
  DeleteIcon,
  GoBackIcon,
 
} from "assets/icons/proposals/ProposalsIcons";
import iphone from "assets/images/iphone.png";
import { useAppSelector } from "services/redux/hooks";



const ShowWaitingNews = () => {
  const history = useHistory();

  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  const newsById = selectedNews?.fullData;
  const [isDeleteOpen, setDeleteOpen] = React.useState<boolean>(false);
  const handleBack = () => {
    history.goBack();
  };
  const editNews=()=>{
    history.push('/news/edit');
  }

  const onDelete = async (id:number) => {
    await deleteNews(id);  
    history.goBack();
  };

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

  {console.log('information',newsById?.data)}
  return (
    <MainWrapper>
      <div style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
        <GoBackIcon
          onClick={handleBack}
          style={{ marginRight: "25px", cursor: "pointer" }}
        />
        <Title>{newsById?.data?.title?.length>30 ? newsById?.data?.title?.slice(0,30)+'...':newsById?.data?.title}</Title>
      </div>
      <Wrapper>
      <Preview>
        <img className="couponImg" src={newsById?.data?.image} alt="" />
        <img className="iphoneImg" width="300" src={iphone} />
        <PreviewContent>
          <h5 >
            <span >{newsById?.data?.title?.length>50 ? newsById?.data?.title?.slice(0,50)+'...':newsById?.data?.title} </span>
          </h5>
          <p style={{ paddingTop: "10px" }}>{newsById?.data?.description.length>500 ? newsById?.data?.description?.slice(0,500)+'...':newsById?.data?.description}</p>
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
            <span style={{ color: "white" ,fontSize:'12px'}}>Написать нам</span>
          </div>

        </PreviewContent>
        <Content>
        <h5>Информация</h5>
        <p>{newsById?.data?.genderType===1 ? 'Только для мужчин':newsById?.data?.genderType===2 ? 'Только для женщины':'Для всех'}</p>
        <p>Срок публикации: {date}</p>
        <p>Возрастное ограничение: {newsById?.data?.ageFrom+'+'}</p>
        <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingTop: "5%",
                paddingRight: "25%",
              }}
            >
              <Button
                onClick={() => editNews()}
                buttonStyle={{
                  color: "white",
                  bgcolor: "#606EEA",
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
                justifyContent: "flex-end",
                paddingTop: "5%",
                paddingRight: "45%",
              }}
            >
         <Button
                onClick={() => setDeleteOpen(true)}
                buttonStyle={{ color: "#ffffff", bgcolor: "#FF5E68" }}
                startIcon={<DeleteIcon />}
              >
                Удалить
              </Button>
            </div>
         
      </Content>
  
      </Preview>
      <Modal open={isDeleteOpen}>
        <DeleteModal>
          <h5>Вы действительно хотите удалить Новость?</h5>
          <p>{'После удаления новости , данные будет утеряны'}</p>
          <Button
            buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
            margin={{ laptop: "0 22px 0 0" }}
            onClick={() => setDeleteOpen(false)}
            startIcon={<CancelIcon />}
          >
            Отмена
          </Button>
          <Button
            buttonStyle={{ bgcolor: "#FF5E68 " }}
            onClick={()=>onDelete(newsById?.data?.id)}
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
