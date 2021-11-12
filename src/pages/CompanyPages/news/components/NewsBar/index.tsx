import {
    CancelIcon,
    CloseIcon,
  } from "assets/icons/ClientsPageIcons/ClientIcons";
  import {
    DeleteIcon,
    EyeIcon,
    PenIcon,
    PublishIcon,
    ReUseIcon,
  } from "assets/icons/proposals/ProposalsIcons";
  import Button from "components/Custom/Button";
  import Modal from "components/Custom/Modal";
  import React from "react";
  import { useMutation } from "react-query";
  import { useHistory } from "react-router";
  import { deleteCoupon, putCoupon } from "services/queries/proposalQuery";
  import { IDeferred } from "services/redux/Slices/proposals/types";
//   import { SetDate } from "../../screens/Coupons/components/SetDate";
  import {
    Wrapper,
    Header,
    DeleteModal,
    Content,
    Preview,
    PreviewContent,
  } from "./style";
  import iphone from "assets/images/iphone.png";
  import { useAppSelector } from "services/redux/hooks";
  import { RootState } from "services/redux/store";
  import { useTranslation } from "react-i18next";
//   import { useFetchCategories } from "../../screens/UpdateCoupon/useFetchCategories";
  interface IProps {
    onClose: (arg: boolean) => void;
    currentNews: IDeferred;
 
  }
  
  export const NewsBar = ({
    onClose,
    currentNews,
    
  }: IProps) => {
    console.log("currentNews",currentNews);
    
  
    const history = useHistory();
    const { t } = useTranslation();
    const [isDeleteOpen, setDeleteOpen] = React.useState<boolean>(false);
    const [isPublishOpen, setPublisOpen] = React.useState<boolean>(false);
    const { logo, name } = useAppSelector(
      (state: RootState) => state.partner.companyInfo
    );
    const [categories, setCategories] = React.useState<any>();
    const handleClose = () => {
      onClose(false);
    
    };
    const { mutate } = useMutation(({ id, data }: any) => putCoupon(id, data));
  
 
    // const _ = useFetchCategories(setCategories, currentCoupon.categoryIds);
  
    const handleRePublish = () => {
      if (currentNews) {
        history.push("/proposals/create_republishcoupon");
      } else {
        history.push("/proposals/create_republishcertificate");
      }
    };
  
    const onDelete = async () => {
      await deleteCoupon(currentNews.id);
    
     
      setDeleteOpen(false);
      onClose(false);
    };
  
    const handleCheck = () => {
      if (currentNews) {
        history.push("check_coupon");
      } else {
        history.push("/proposals/check_certificate");
      }
    };
    return (
      <Wrapper>
        <Header>
          <h6>{currentNews.title}</h6>
          <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
        </Header>
        <Preview>
          <img className="currentNews" src={currentNews.image} alt="" />
          <img className="iphoneImg" width="300" src={iphone} />
          <PreviewContent>
            <img src={logo} />
            <span>{name}</span>
            
          </PreviewContent>
        </Preview>
        <Content>
          <h5>Информация</h5>
         
          <h6>{currentNews.title}</h6>
          <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
        </Content>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {currentNews ? (
            <Button
              onClick={() => setDeleteOpen(true)}
              buttonStyle={{ color: "#ffffff", bgcolor: "#FF5E68" }}
              startIcon={<DeleteIcon />}
            >
              Удалить купон
            </Button>
          )  : (
            <>
              <Button
                onClick={currentNews}
                startIcon={<PenIcon />}
                buttonStyle={{
                  color: "#606EEA",
                  bgcolor: "rgba(96, 110, 234, 0.1)",
                }}
              >
                Редактировать Купон
              </Button>
              <Button
                startIcon={<PublishIcon />}
                onClick={() => setPublisOpen(true)}
                margin={{ laptop: "25px 0" }}
              >
                Опубликовать
              </Button>
              <Button
                onClick={() => setDeleteOpen(true)}
                buttonStyle={{ color: "#ffffff", bgcolor: "#FF5E68" }}
                startIcon={<DeleteIcon />}
              >
                Удалить купон
              </Button>
            </>
          )}
        </div>
        <Modal open={isDeleteOpen}>
          <DeleteModal>
            <h5>Вы действительно хотите удалить Купон?</h5>
            <p>{currentNews.title}</p>
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
              onClick={onDelete}
              startIcon={<DeleteIcon />}
            >
              Удалить
            </Button>
          </DeleteModal>
        </Modal>
        {/* <Modal open={isPublishOpen}>
          <SetDate
            handleClose={() => setPublisOpen(false)}
            coupon={currentCoupon}
            mutation={mutate}
            shouldPublish
            handlePost={mutate}
          />
        </Modal> */}
      </Wrapper>
    );
  };
  