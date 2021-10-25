import moment from "moment";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "services/redux/hooks";
import useCashiers from "../../../../hooks/useCashiers";
import { ModalContent, ModalBody, ModalAction } from "../../style";
import {
  BarContainer,
  CashierCard,
  CashierRow,
  CashierCol,
  Img,
  ImgDiv,
  BarTitle,
  BarText,
  BarSecondText,
  CountText,
  Break,
  BreakH,
  UpSide,
  DownSide,
} from "./style";
import { ReactComponent as Logo } from "assets/icons/cashier_logo_placeholder.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit_cashier.svg";
import { ReactComponent as UserIcon } from "assets/icons/user_setting.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/delete_setting.svg";
import { ReactComponent as DeleteWhiteIcon } from "assets/icons/trash_white.svg";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import CashierAvg from "assets/icons/cashier_avg.png";
import CashierRecommend from "assets/icons/cashier_recommend.png";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";

const CashierBar = () => {
  const { t } = useTranslation();
  const { deleteCashier, open, setOpen } = useCashiers({
    page: 1,
    query: "",
    period: "",
  });
  const selectedCashiers = useAppSelector(
    (state) => state.staffs.selectedCashiers
  );

  const staffsDiv = () => {
    if (selectedCashiers?.length === 1) {
      return (
        <CashierCard>
          <UpSide>
            <CashierRow justifyContent="center">
              <CashierCol>
                {selectedCashiers[0].logo !== "" ? (
                  <ImgDiv>
                    <Img
                      src={selectedCashiers[0].logo}
                      effect="blur"
                      height="100%"
                      width="100%"
                    />
                  </ImgDiv>
                ) : (
                  <Logo />
                )}
              </CashierCol>
              <div style={{ width: "10px" }} />
              <CashierCol>
                <BarTitle>{selectedCashiers[0].firstName}</BarTitle>
                <BarText>
                  {moment(selectedCashiers[0].createdAt).format("DD.MM.YYYY")}
                </BarText>
              </CashierCol>
            </CashierRow>
            <Break />
            <CashierRow justifyContent="center">
              <CashierCol>
                <Img src={CashierAvg} effect="blur" />
              </CashierCol>
              <BreakH width={16} />
              <CashierCol>
                <BarSecondText>Средний чек</BarSecondText>
                <CountText>{selectedCashiers[0].avgCheque}</CountText>
              </CashierCol>
            </CashierRow>
            <Break />
            <CashierRow justifyContent="center">
              <CashierCol>
                <Img src={CashierRecommend} effect="blur" />
              </CashierCol>
              <BreakH width={16} />
              <CashierCol>
                <BarSecondText>Рекомендации</BarSecondText>
                <CountText>{selectedCashiers[0].countRefer}</CountText>
              </CashierCol>
            </CashierRow>
            <Break />
            <CashierRow justifyContent="center">
              <Button
                buttonStyle={{
                  color: "#606EEA",
                  bgcolor: "#fff",
                }}
                onClick={() => {}}
                endIcon={<EditIcon />}
              >
                Редактировать
              </Button>
            </CashierRow>
          </UpSide>

          <DownSide>
            <CashierRow justifyContent="space-between">
              <Button onClick={() => {}} startIcon={<UserIcon />}>
                Карточка кассира
              </Button>
            </CashierRow>
            <CashierRow justifyContent="space-between">
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
                Удалить кассира
              </Button>
            </CashierRow>
          </DownSide>

          {/* delete cashier */}
          <Modal open={open}>
            <ModalContent>
              <ModalBody>
                <BarTitle>Вы уверены что хотите удалить кассира?</BarTitle>
                <Break height={15} />
                <BarText>{selectedCashiers[0].firstName}</BarText>
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
                    deleteCashier.mutate(selectedCashiers[0].id);
                  }}
                  startIcon={<DeleteWhiteIcon />}
                >
                  {t("delete")}
                </Button>
              </ModalAction>
            </ModalContent>
          </Modal>
        </CashierCard>
      );
    } else if (selectedCashiers?.length > 1) {
      return <div>There two or more</div>;
    }
  };
  return <BarContainer>{staffsDiv()}</BarContainer>;
};

export default CashierBar;
