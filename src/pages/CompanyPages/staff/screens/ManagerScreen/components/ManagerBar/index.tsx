import moment from "moment";
import useCashiers from "pages/CompanyPages/staff/hooks/useCashiers";
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
} from "./style";
import { IconButton } from "@material-ui/core";

//components
import { ReactComponent as Logo } from "assets/icons/cashier_logo_placeholder.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit_cashier.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/delete_setting.svg";
import { ReactComponent as DeleteWhiteIcon } from "assets/icons/trash_white.svg";
import { ReactComponent as ExitIcon } from "assets/icons/exit.svg";
import { ReactComponent as TrashWhite } from "assets/icons/trash_white.svg";
import { ReactComponent as RoleIcon } from "assets/icons/role_icon.svg";
import { ReactComponent as Delete } from "assets/icons/IconsInfo/delete.svg";

import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import RippleEffect from "components/Custom/RippleEffect";
import { setSelectedManagers } from "services/redux/Slices/staffs";
import {
  ModalAction,
  ModalBody,
  ModalContent,
} from "../../../CashierScreen/style";

const ManagerBar = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { deleteCashier, open, setOpen } = useCashiers({
    page: 1,
    query: "",
    period: "",
  });
  const allManager = useAppSelector((state) => state.staffs.allManagers);
  const selectedManagers = useAppSelector(
    (state) => state.staffs.selectedManagers
  );

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
                onClick={() => {}}
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
                <BarNormalText>Выбрано {selectedManagers.length}</BarNormalText>
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

            <ManagerRow justifyContent="space-between">
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
                      <Delete color="#C4C4C4" />
                    </IconButton>
                  </ButtonKeyWord>
                );
              })}
            </ManagerRow>

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
                      bgcolor: "#FF5E68",
                      color: "#fff",
                    }}
                    onClick={() => {
                      setOpen(true);
                    }}
                    startIcon={<TrashWhite />}
                  >
                    Удалить кассиров
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
            {selectedManagers.map((item: any) => {
              return <BarText>{item?.firstName}</BarText>;
            })}
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
              disabled={deleteCashier.isLoading}
              onClick={() => {
                deleteCashier.mutate(
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
