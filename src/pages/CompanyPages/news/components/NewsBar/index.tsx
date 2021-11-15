import {
  CancelIcon,
  CloseIcon,
} from "assets/icons/ClientsPageIcons/ClientIcons";
import {
  DeleteIcon,
  EyeIcon,
  PenIcon,
  ReUseIcon,
} from "assets/icons/proposals/ProposalsIcons";
import { WatchIcons, PublishIcon,RepairNewsIcon } from "assets/icons/news/newsIcons";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { deleteCoupon, putCoupon } from "services/queries/proposalQuery";
import { deleteNews } from "services/queries/newPageQuery";
import { IDeferred } from "services/redux/Slices/news/types";
import moment from "moment";
//   import { SetDate } from "../../screens/Coupons/components/SetDate";

import {
  Wrapper,
  Header,
  DeleteModal,
  ContentInfo,
  Preview,
  ContentSideBar,
  PreviewDivNews,
  PreviewContent,
  ContentButton,
  LeftRound,
  PreviewBgNews,
} from "./style";
import iphone from "assets/images/iphone.png";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import { setSelectedNews } from "services/redux/Slices/news";
import { RootState } from "services/redux/store";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
//   import { useFetchCategories } from "../../screens/UpdateCoupon/useFetchCategories";
interface IProps {
  onClose: (arg: boolean) => void;
  currentNews: IDeferred;
  refetch: any;
}
export const NewsBar = ({ refetch, onClose, currentNews }: IProps) => {
  console.log("currentNews", currentNews);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
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

  const handleRePublish = () => {
    if (currentNews) {
      history.push("/proposals/create_republishcoupon");
    } else {
      history.push("/proposals/create_republishcertificate");
    }
  };

  const showNew = () => {
    if (currentNews) {
       history.push("/news/showwaiting");
    
      // history.push("/news/detail");
    }
  };
  const showNewsDetail = () => {
    if (currentNews) {    
      history.push("/news/detail");
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


  return (
    <Wrapper>
      <Header>
        <h6>{currentNews?.data?.title}</h6>
        <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
      </Header>
      {/* <Preview> */}
      <LeftRound>
        <PreviewDivNews>
          {currentNews?.data?.image?.length > 6 && (
            <PreviewBgNews src={currentNews?.data?.image} alt="" />
          )}
          <img
            style={{ zIndex: 20, position: "relative" }}
            width="320"
            height="180"
            alt=""
          />
        </PreviewDivNews>
        <h5>{currentNews?.data?.title}</h5>
        <p>{currentNews?.data?.description}</p>
      </LeftRound>
      <ContentSideBar>
        <ContentInfo>
          <h5>Информация</h5>
          <p>Только для {currentNews?.genderType}</p>
          <p>Срок публикации: {currentNews?.date}</p>
          <p>Возрастное ограничения: {currentNews?.data?.ageFrom}+</p>
        </ContentInfo>
        <ContentButton>
          {location.pathname !== "/news/archive" &&location.pathname !== "/news" &&(
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
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
             {location.pathname !== "/news/archive" && location.pathname !== "/news/waiting" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => showNewsDetail()}
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
          {location.pathname === "/news/waiting" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingTop: "5%",
              }}
            >
              <Button
                onClick={() => showNew()}
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
                buttonStyle={{ color: "#ffffff", bgcolor: "#FF5E68" }}
                startIcon={<DeleteIcon />}
              >
                Удалить
              </Button>
            )}
            {location.pathname === "/news/archive" && (
              <Button
                onClick={() => restoreNews()}
                buttonStyle={{ color: "#ffffff", bgcolor: "#606EEA" }}
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
          <h5>Вы действительно хотите удалить Новость?</h5>
          <p>{currentNews?.data?.title}</p>
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
    </Wrapper>
  );
};
