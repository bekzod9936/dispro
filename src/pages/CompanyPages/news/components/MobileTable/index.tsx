import { ReactComponent as LeftBack } from "assets/icons/FinanceIcons/leftback.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useState } from "react";
import Button from "components/Custom/Button";
import { PenIcon } from "assets/icons/news/newsIcons";
import { CancelIcon } from "assets/icons/news/newsIcons";
import { WatchIcons,WatchIconsWhite, PublishIcon,WhitePublishIcon,BluePenIcon,RepairNewsIcon } from "assets/icons/news/newsIcons";
import { IconButton } from "@material-ui/core";
import { useAppDispatch, } from 'services/redux/hooks';
import { deleteNews } from "services/queries/newPageQuery";
import {  setSelectedNews } from "services/redux/Slices/news";
import useWindowWidth from "services/hooks/useWindowWidth";
import { DeleteIcon } from "assets/icons/proposals/ProposalsIcons";
import { useLocation } from "react-router-dom";
import FullModal from 'components/Custom/FullModal';
import { useTranslation } from "react-i18next";
import Modal from "components/Custom/Modal";
import {PublicModal} from "../NewsBar/components/PublicModal";
import { useHistory } from "react-router-dom";
import {
  Container,
  Data,
  FullName,
  Title,
  Amount,
  Wrapper,
  Header,
  ModalContent,
  WrapBox,
  Box,
  BoxTitle,
  WrapBoxDetail,
  BoxinfoDetail,
  BoxInfo,
  WrapMain,
  WrapIcon,
  PinkIcon,
  WrapAvatar,
  DeleteModal,
  Buttons,
} from "./style";
import {
WrapperModal,
CloseButton,
} from "../NewsBar/style";
import {

  CloseIcon,
} from "assets/icons/news/newsIcons";
interface Props {
  data?: any;
  refetch: any;
}

const MobileTable = ({refetch, data }: Props) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<any>(null);
  const dispatch=useAppDispatch();
  const history = useHistory();
  const {t} =useTranslation();
  const [selectedId,setSelectedId]=useState<number>();
  const [isDeleteOpen, setDeleteOpen] =useState<boolean>(false);
  const [isPublishOpen, setPublisOpen] = useState<boolean>(false);
  const { width } = useWindowWidth();
  console.log("datamobile", data);
  const location = useLocation();

  const onDeleteOpen = async () => {
    setDeleteOpen(true)
  };
  const onDeleteAction=async (id:number)=>{
      await deleteNews(id);
      await refetch.refetch();
      setDeleteOpen(false)
  }
  const handlePublic=async (id:any)=>{
    await dispatch(setSelectedNews(id));
    setPublisOpen(true);
  }
  const handleEdit= async (id:any)=>{
    await dispatch(setSelectedNews(id));
    if(id){
      setTimeout(() => history.push('/news/edit'), 500);
    }
  }

  const handleRepair=async (id:any)=>{
    await dispatch(setSelectedNews(id));
    if(id){
    setTimeout(() =>  history.push("/news/repair"),500);
    }
  }

  return (
    <Container>
      {data?.map((a: any, i: number) => {
        const info = a.fullData?.data;
        return (
          <>
            <Data
              onClick={() => {
                setOpen(true);
                setId(i);
              }}
            >
              {a ? (
                info.image ? (
                  <WrapIcon>
                    <LazyLoadImage
                      alt="avatar"
                      height="40px"
                      src={info.image}
                      width="40px"
                      effect="blur"
                      style={{ objectFit: "cover", borderRadius: "14px" }}
                    />
                  </WrapIcon>
                ) : (
                  <PinkIcon />
                )
              ) : null}
              <WrapMain isAvatar={info?.image}>
                <FullName>{info?.title?.length>20 ? info?.title?.slice(0,20)+'...': info?.title}</FullName>
                <Wrapper>
                  <Title>
                    {info?.description?.length > 20
                      ? info?.description.slice(0, 20) + ".."
                      : info?.description}
                    :
                  </Title>
                </Wrapper>
              </WrapMain>
            </Data>
            {id === i ? (
              
              <FullModal open={open}>
                
                <ModalContent
                  style={{ display: "flex", flex: 1, flexDirection: "column" }}
                >
                 
                  <div>
                    <Header>
                      <IconButton
                        onClick={() => {
                          setOpen(false);
                          setId(null);
                        }}
                      >
                        <LeftBack />
                      </IconButton>
                      <WrapAvatar>
                        <>
                          <WrapIcon>
                            <LazyLoadImage
                              alt="avatar"
                              height="50px"
                              src={info?.image}
                              width="50px"
                              effect="blur"
                              style={{
                                objectFit: "cover",
                                borderRadius: "14px",
                              }}
                            />
                          </WrapIcon>
                          <div style={{ display: "block" }}>
                            <p
                              style={{
                                fontSize: "16px",
                                color: "#223367",
                                fontWeight: 500,
                              }}
                            >
                              {info?.title?.length>20 ? info?.title?.slice(0,20)+'...': info?.title}
                            </p>
                            <span
                              style={{ fontSize: "14px", color: "#223367" }}
                            >
                                {info?.description?.length > 15
                              ? info?.description?.slice(0, 15) + "..."
                              : info?.description}
                            </span>
                          </div>
                        </>
                      </WrapAvatar>
                    </Header>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <WrapBox>
                        <p style={{ color: "#C7C7C7" }}>Описание</p>
                        <Box>
                          <BoxInfo>
                            {info?.description?.length > 150
                              ? <p style={{whiteSpace: "pre-wrap",wordBreak: 'break-all'}}>{info?.description?.slice(0, 150) + "..."}</p>
                              : <p style={{whiteSpace: "pre-wrap",wordBreak: 'break-all'}}>{info?.description}</p>}
                          </BoxInfo>
                        </Box>
                      </WrapBox>
                      <WrapBoxDetail>
                        <p style={{ color: "#C7C7C7" }}>Информация</p>
                        <Box>
                          <BoxinfoDetail>{`${a.fullData?.genderType}`}</BoxinfoDetail>
                          <BoxinfoDetail>{`Срок публикции: ${a.fullData?.date}`}</BoxinfoDetail>
                          <BoxinfoDetail>{`Возрастное ограничение: ${
                            info?.ageFrom + "+"
                          }`}</BoxinfoDetail>

                          <BoxinfoDetail>{`Дни оповещания Push: ПН, СР, ПТ, СБ`}</BoxinfoDetail>
                          <BoxinfoDetail>{`Часы оповещения Push: ${
                            info?.settings?.time?.from +
                            "-" +
                            info?.settings?.time?.to
                          }`}</BoxinfoDetail>
                        </Box>
                      </WrapBoxDetail>

                      <WrapBoxDetail>
                        <p style={{ color: "#C7C7C7" }}>Push up статистика</p>
                        <Box>
                          <BoxinfoDetail>{`Уведомлений получили: ${info?.stat?.get?.total} чел`}</BoxinfoDetail>
                          <BoxinfoDetail>
                            {`Уведомлений просмотрели:${info?.stat?.view?.total} чел`}
                            <br />
                            <span
                              style={{ fontSize: "14px", color: "#606EEA" }}
                            >{`${info?.stat?.view?.male} Муж`}</span>
                            <span
                              style={{ fontSize: "14px", color: "#FF56BB" }}
                            >
                              {" " + `${info?.stat?.view?.female} Жен`}
                            </span>
                          </BoxinfoDetail>
                          <BoxinfoDetail>
                            {`Произвели оплату: ${info?.stat?.paid?.total} чел`}
                            <br />
                            <span
                              style={{ fontSize: "14px", color: "#606EEA" }}
                            >{`${info?.stat?.paid?.male} Муж`}</span>
                            <span
                              style={{ fontSize: "14px", color: "#FF56BB" }}
                            >
                              {" " + `${info?.stat?.paid?.female} Жен`}
                            </span>
                          </BoxinfoDetail>
                        </Box>
                      </WrapBoxDetail>
                    </div>
                    <div>
                      {location.pathname === "/news/active" &&
                      <Buttons>
                        <Button
                          onClick={() =>  onDeleteOpen()}
                          margin={{ mobile: "0 8px 0 0" }}
                          buttonStyle={{
                            bgcolor: "#FF5E68",
                            color: "#fff",
                            weight: "700",
                          }}
                          // startIcon={<DeleteIcon />}

                          endIcon={
                            width > 325 && (
                              <DeleteIcon style={{ height: 15, width: 13.5 }} />
                            )
                          }
                        >
                          Удалить
                        </Button>
                        <Button
                         onClick={()=>handleEdit(a)}
                          margin={{ desktop: "0 20px 0 20px" }}
                          buttonStyle={{
                            bgcolor: "#606EEA",
                            color: "#fff",
                            weight: "500",
                          }}
                          endIcon={
                            width > 325 && (
                              <PenIcon style={{ height: 15, width: 13.5 }} />
                            )
                          }
                        >
                          {"Редактировать"}
                        </Button>
                      </Buttons>
                      }

                      {location.pathname === "/news/waiting" &&<>
                      <Buttons>
                       <Button
                         onClick={()=>handleEdit(a)}
                         margin={{ desktop: "0 20px 0 20px",mobile:"0px 10px 10px 10px " }}
                         buttonStyle={{
                           bgcolor: "rgba(96, 110, 234, 0.1)",
                           color: "#606EEA",
                           
                           weight: "500",
                         }}
                         endIcon={
                           width > 325 && (
                             <BluePenIcon style={{ height: 15, width: 13.5 }} />
                           )
                         }
                       >
                         {"Редактировать"}
                       </Button>
                     </Buttons>
                       <Buttons>
                       <Button
                         // onClick={''}
                         margin={{ mobile: "0 8px 0 0" }}
                         onClick={() =>  onDeleteOpen()}
                         buttonStyle={{
                           bgcolor: "#FF5E68",
                           color: "#fff",
                           weight: "700",
                         }}
                         // startIcon={<DeleteIcon />}

                         endIcon={
                           width > 325 && (
                             <DeleteIcon style={{ height: 15, width: 13.5 }} />
                           )
                         }
                       >
                         Удалить
                       </Button>
                       <Button
                     
                         onClick={() => handlePublic(a)}
                         margin={{ desktop: "0 20px 0 20px" }}
                         buttonStyle={{
                           bgcolor: "#606EEA",
                           color: "#fff",
                           weight: "500",
                         }}
                         endIcon={
                           width > 325 && (
                             <WhitePublishIcon style={{ height: 15, width: 13.5 ,}} />
                           )
                         }
                       >
                         {"Опубликовать"}
                       </Button>
                     </Buttons>
                     </>
                      }
                    </div>
                  </div>
                  {location.pathname === "/news/archive" && <Buttons>
                     
                        <Button
                          onClick={()=>handleRepair(a)}
                          margin={{ desktop: "0 20px 0 20px" }}
                          buttonStyle={{
                            bgcolor: "#606EEA",
                            color: "#fff",
                            weight: "500",
                          }}
                          endIcon={
                            width > 325 && (
                              <RepairNewsIcon style={{ height: 15, width: 13.5 }} />
                            )
                          }
                        >
                          {"Восстановить"}
                        </Button>
                      </Buttons>}
                </ModalContent>
                <Modal open={isDeleteOpen}>
        <DeleteModal>
          <h5>Вы действительно хотите удалить Новость?</h5>
          <p>{'После удаления новости , данные будет утеряны'}</p>
          <Buttons>
          <Button
                        
                          margin={{ desktop: "0 20px 0 20px" }}
                          onClick={()=> setDeleteOpen(false)}
                          buttonStyle={{
                            bgcolor: "# rgba(96, 110, 234, 0.1);",
                            
                            color: "#606EEA",
                            weight: "500",
                          }}
                          endIcon={
                            width > 325 && (
                              <CancelIcon style={{ height: 15, width: 13.5 }} />
                              
                            )
                          }
                        >
                          {"Отменить"}
                        </Button>
                        <Button
                          onClick={()=>onDeleteAction(info?.id)}
                          margin={{ mobile: "0 8px 0 0" }}
                          buttonStyle={{
                            bgcolor: "#FF5E68",
                            color: "#fff",
                            weight: "700",
                          }}
                          // startIcon={<DeleteIcon />}

                          endIcon={
                            width > 325 && (
                              <DeleteIcon style={{ height: 15, width: 13.5 }} />
                            )
                          }
                        >
                          Удалить
                        </Button>
                   
                      </Buttons>
        </DeleteModal>
      </Modal>
      {width>600 &&<Modal modalStyle={{ bgcolor: "#fff" }}  open={isPublishOpen}>
        <WrapperModal>
          <CloseButton onClick={() => setPublisOpen(false)}>
            <CloseIcon />
          </CloseButton>
          <h3>
           {t('Выберите дату публикации')}
          </h3>
          <PublicModal  setPublisOpen={setPublisOpen} />
      
        </WrapperModal>
      </Modal> }
      
      {width<=600 &&
      <FullModal open={isPublishOpen}>
        
        {/* <WrapperModal>
          <CloseButton onClick={() => setPublisOpen(false)}>
            <CloseIcon />
          </CloseButton> */}
        
          <PublicModal setPublisOpen={setPublisOpen} />
{/*       
        </WrapperModal> */}
      </FullModal> }
              </FullModal>
            ) : null}
          </>
        );
      })}
    </Container>
  );
};

export default MobileTable;
