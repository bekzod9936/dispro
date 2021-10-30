import moment from "moment";
import useManagers from "pages/CompanyPages/staff/hooks/useManagers";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import {
  ManagerRow,
  ManagerCol,
  ManagerCard,
  UpSide,
  DownSide,
  BarText,
  BarContainer,
  BarNormalText,
  BarTitle,
  Break,
  Img,
  ImgDiv,
  CommentText,
  CommentContent,
  ButtonKeyWord,
  ManagerCollection,
  DeleteIc,
} from "./style";
import { IconButton } from "@material-ui/core";

//components
import { ReactComponent as Logo } from "assets/icons/cashier_logo_placeholder.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit_cashier.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/delete_setting.svg";
import { ReactComponent as DeleteWhiteIcon } from "assets/icons/trash_white.svg";
import { ReactComponent as ExitIcon } from "assets/icons/exit.svg";
import { ReactComponent as RoleIcon } from "assets/icons/role_icon.svg";

import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import RippleEffect from "components/Custom/RippleEffect";
import {
  setOpenEditManager,
  setOpenManager,
  setSelectedManagers,
  setStepManager,
  setUserId,
} from "services/redux/Slices/staffs";
import {
  ModalAction,
  ModalBody,
  ModalContent,
} from "../../../CashierScreen/style";

const ManagerBar = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { roleManager, deleteManager, open, setOpen } = useManagers({
    page: 1,
    query: "",
    period: "",
  });
  const allManager = useAppSelector((state) => state.staffs.allManagers);
  const selectedManagers = useAppSelector(
    (state) => state.staffs.selectedManagers
  );

  console.log(selectedManagers, "selected manager");

  //   Комментарий
  const staffsDiv = () => {
    if (selectedManagers?.length === 1) {
      return (
        <ManagerCard>
          <UpSide>
            <ManagerRow justifyContent="center">
              <ManagerCol>
                {selectedManagers[0].logo !== "" ? (
                  <ImgDiv>
                    <Img
                      src={selectedManagers[0].logo}
                      effect="blur"
                      height="100%"
                      width="100%"
                    />
                  </ImgDiv>
                ) : (
                  <Logo />
                )}
              </ManagerCol>
              <div style={{ width: "10px" }} />
              <ManagerCol>
                <BarTitle>{selectedManagers[0].firstName}</BarTitle>
                <BarText>
                  {moment(selectedManagers[0].createdAt).format("DD.MM.YYYY")}
                </BarText>
              </ManagerCol>
            </ManagerRow>
            <Break />
            <ManagerRow justifyContent="flex-start">
              <ManagerCol>
                <CommentText>{t("comment")}</CommentText>
              </ManagerCol>
            </ManagerRow>
            <Break height={10} />
            <ManagerRow justifyContent="flex-start">
              <CommentContent>{selectedManagers[0].comment}</CommentContent>
            </ManagerRow>
            <Break />
            <ManagerRow justifyContent="center">
              <ManagerCol>
                <Button
                  endIcon={<EditIcon />}
                  buttonStyle={{
                    bgcolor: "rgba(96, 110, 234, 0.1)",
                    color: "#606EEA",
                  }}
                  onClick={() => {
                    dispatch(setOpenEditManager(true));
                  }}
                >
                  {t("edit")}
                </Button>
              </ManagerCol>
            </ManagerRow>
            <Break height={21} />
            <ManagerRow justifyContent="center">
              <Button
                buttonStyle={{
                  color: "#606EEA",
                  bgcolor: "#fff",
                }}
                onClick={() => {
                  dispatch(setOpenManager(true));
                  dispatch(setStepManager(3));
                  roleManager.mutate(selectedManagers[0].userId);
                  dispatch(setUserId(selectedManagers[0].userId));
                }}
                endIcon={<RoleIcon />}
              >
                {t("change_access")}
              </Button>
            </ManagerRow>
          </UpSide>

          <DownSide>
            <ManagerRow justifyContent="space-between">
              <Button
                buttonStyle={{
                  bgcolor: "#fff",
                  color: "#FF5E68",
                }}
                onClick={() => {
                  setOpen(true);
                }}
                startIcon={<DeleteIcon />}
              >
                Удалить менеджера
              </Button>
            </ManagerRow>
          </DownSide>
        </ManagerCard>
      );
    } else if (selectedManagers?.length > 1) {
      return (
        <ManagerCard>
          <UpSide>
            <ManagerRow>
              <ManagerCol>
                <BarNormalText>
                  Выбрано {selectedManagers?.length}
                </BarNormalText>
              </ManagerCol>
              <ManagerCol>
                <RippleEffect
                  onClick={() => {
                    dispatch(setSelectedManagers([]));
                  }}
                >
                  <ExitIcon />
                </RippleEffect>
              </ManagerCol>
            </ManagerRow>

            <ManagerCollection>
              {selectedManagers.map((item: any, index: number) => {
                return (
                  <ButtonKeyWord>
                    {item?.firstName}
                    <IconButton
                      onClick={() => {
                        let filteredItem = selectedManagers?.filter(
                          (it: any) => it.id !== item.id
                        );
                        dispatch(setSelectedManagers(filteredItem));
                      }}
                    >
                      <DeleteIc color="#C4C4C4" />
                    </IconButton>
                  </ButtonKeyWord>
                );
              })}
            </ManagerCollection>

            <Break height={20} />

            <ManagerRow justifyContent="center">
              <ManagerCol>
                <Button
                  buttonStyle={{
                    bgcolor: "#fff",
                    color: "#3492FF",
                  }}
                  onClick={() => {
                    dispatch(setSelectedManagers(allManager));
                  }}
                >
                  Выбрать всех кассиров
                </Button>
              </ManagerCol>
            </ManagerRow>
            <Break height={10} />

            <ManagerRow justifyContent="center">
              <ManagerCol>
                <Button
                  buttonStyle={{
                    bgcolor: "#fff",
                    color: "#3492FF",
                  }}
                  onClick={() => {
                    dispatch(setSelectedManagers([]));
                  }}
                >
                  Снять выделение
                </Button>
              </ManagerCol>
            </ManagerRow>
          </UpSide>
          <DownSide>
            <ManagerRow>
              <ManagerCol>
                <ManagerRow justifyContent="space-between">
                  <Button
                    buttonStyle={{
                      bgcolor: "#fff",
                      color: "#FF5E68",
                    }}
                    onClick={() => {
                      setOpen(true);
                    }}
                    startIcon={<DeleteIcon />}
                  >
                    Удалить менеджеров
                  </Button>
                </ManagerRow>
              </ManagerCol>
            </ManagerRow>
          </DownSide>
        </ManagerCard>
      );
    }
  };
  return (
    <BarContainer>
      {staffsDiv()}

      {/* delete cashier */}
      <Modal open={open}>
        <ModalContent>
          <ModalBody>
            <BarTitle>Вы уверены что хотите удалить кассира?</BarTitle>
            <Break height={15} />
            {/* {selectedManagers.map((item: any) => {
              return <BarText>{item?.firstName}</BarText>;
            })} */}
            <ManagerCollection>
              {selectedManagers.map((item: any, index: number) => {
                return (
                  <ButtonKeyWord key={index}>
                    {item?.firstName}
                    <IconButton
                      onClick={() => {
                        let filteredItem = selectedManagers?.filter(
                          (it: any) => it.id !== item.id
                        );
                        dispatch(setSelectedManagers(filteredItem));
                      }}
                    >
                      <DeleteIc color="#C4C4C4" />
                    </IconButton>
                  </ButtonKeyWord>
                );
              })}
            </ManagerCollection>
          </ModalBody>
          <Break height={35} />
          <ModalAction>
            <Button
              buttonStyle={{
                bgcolor: "#fff",
                color: "#223367",
              }}
              onClick={() => {
                setOpen(false);
              }}
              startIcon={<CancelIcon />}
            >
              {t("cancel")}
            </Button>
            <Button
              buttonStyle={{
                bgcolor: "#FF5E68",
                color: "#fff",
              }}
              disabled={deleteManager.isLoading}
              onClick={() => {
                deleteManager.mutate(
                  selectedManagers.map((item: any) => item.id)
                );
              }}
              startIcon={<DeleteWhiteIcon />}
            >
              {t("delete")}
            </Button>
          </ModalAction>
        </ModalContent>
      </Modal>
    </BarContainer>
  );
};

export default ManagerBar;
