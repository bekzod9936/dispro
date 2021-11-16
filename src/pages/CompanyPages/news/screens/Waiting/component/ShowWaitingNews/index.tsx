import { useMutation } from "react-query";
import React from 'react';
import { deleteCoupon, putCoupon } from "services/queries/proposalQuery";
import { IDeferred } from "services/redux/Slices/proposals/types";
import Title from "components/Custom/Title";
import { deleteNews } from "services/queries/newPageQuery";
import { useHistory } from "react-router-dom";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import {
  CancelIcon,
  CloseIcon,
} from "assets/icons/ClientsPageIcons/ClientIcons";
import {

    PenIcon,

  } from "assets/icons/news/newsIcons";
import {
  Wrapper,
  Header,
  DeleteModal,
  Content,
  Preview,
  MainWrapper,
  PreviewContent,
} from "./style";
import {
  DangerIcon,
  DeleteIcon,
  GoBackIcon,
  PhoneIcon,
  PlusIcon,
  UploadImage,
} from "assets/icons/proposals/ProposalsIcons";
import iphone from "assets/images/iphone.png";
import { useAppSelector } from "services/redux/hooks";
import { RootState } from "services/redux/store";
import { useTranslation } from "react-i18next";

//   interface IProps {
//     onClose: (arg: boolean) => void;
//     currentCoupon: IDeferred;
//     disableUpdate?: boolean;
//     resetCoupon: any;
//     canceled?: boolean;
//     refetch: () => void;
//   }

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


  return (
    <MainWrapper>
      <div style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
        <GoBackIcon
          onClick={handleBack}
          style={{ marginRight: "25px", cursor: "pointer" }}
        />
        <Title>{newsById?.data?.title}</Title>
      </div>
      <Wrapper>
      <Preview>
        <img className="couponImg" src={newsById?.data?.image} alt="" />
        <img className="iphoneImg" width="300" src={iphone} />
        <PreviewContent>
          <h5 >
            <span >{newsById?.data?.title} </span>
          </h5>
          <p style={{ paddingTop: "10px" }}>{newsById?.data?.description}</p>
          <div
            style={{
              position: "absolute",
              bottom: "10%",
         
              padding: "5px",
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
        <p>Только для мужчин</p>
        <p>Срок публикции: 31 Мая - 15 Июня 2021</p>
        <p>Возрастное ограничение: 18+</p>
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
          <p>{newsById?.data?.title}</p>
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
