import { Container, Row, Col, Title, Text, EText } from "./style";
import { Break, SpinnerDiv } from "pages/CompanyPages/settings/styles";
//actions
import {
  handleClick,
  setChangeToggle,
} from "services/redux/Slices/settingsSlice";
//components
import SettingButton from "pages/CompanyPages/settings/components/SettingButton";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import Spinner from "components/Helpers/Spinner";
import ChangeLoyality from "./change_loyality";
import Modal from "components/Custom/Modal";
import FullModal from "components/Custom/FullModal";
import CashbackModel from "./main_model";
//hooks
import useMobileContent from "./useMobileContent";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { useTranslation } from "react-i18next";

interface IProps {
  isLoading: boolean;
}

const MobileContent = ({ isLoading }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { handleCheck } = useMobileContent();
  const openCashback = useAppSelector((state) => state.settings.openState);
  const cashbackCheck = useAppSelector((state) => state.settings.cashbackCheck);
  const saleCheck = useAppSelector((state) => state.settings.saleCheck);
  const ballCheck = useAppSelector((state) => state.settings.ballCheck);
  const openModal = useAppSelector((state) => state.settings.openModal);
  const emptySale = useAppSelector((state) => state.settings.emptySale);
  const emptyBall = useAppSelector((state) => state.settings.emptyBall);
  const emptyCashback = useAppSelector((state) => state.settings.emptyCashback);

  if (isLoading) {
    <SpinnerDiv>
      <Spinner />
    </SpinnerDiv>;
  }
  return (
    <Container>
      <Row>
        <Col>
          <Title>Предоставление скидки</Title>
          <Break height={5} />
          <Text>
            Клиент получает скидку при каждой покупке в размере определенного %
          </Text>
        </Col>
        <CustomToggle
          disabled={saleCheck}
          checked={saleCheck}
          onChange={(e: any) => {
            handleCheck({
              checked: e.target.checked,
              type: "discount",
            });
            dispatch(setChangeToggle({ name: "discount" }));
          }}
        />
      </Row>
      <Break height={10} />
      {emptySale && saleCheck && <EText>{t("configure_setting_error")}</EText>}

      <Break height={10} />
      {saleCheck && (
        <SettingButton
          text={"Настроить"}
          onClick={() =>
            dispatch(handleClick({ type: "discount", open: true }))
          }
        />
      )}
      <Break height={25} />
      <Row>
        <Col>
          <Title>Предоставление кешбэка</Title>
          <Break height={5} />
          <Text>
            Клиент получает кешбэк в виде реальных денег после каждой покупки
          </Text>
        </Col>
        <CustomToggle
          disabled={cashbackCheck}
          checked={cashbackCheck}
          onChange={(e: any) => {
            handleCheck({
              checked: e.target.checked,
              type: "cashback",
            });
            dispatch(setChangeToggle({ name: "cashback" }));
          }}
        />
      </Row>
      <Break height={10} />
      {emptyCashback && cashbackCheck && (
        <EText>{t("configure_setting_error")}</EText>
      )}
      <Break height={10} />
      {cashbackCheck && (
        <SettingButton
          text={"Настроить"}
          onClick={() =>
            dispatch(handleClick({ type: "cashback", open: true }))
          }
        />
      )}
      <Break height={25} />
      <Row>
        <Col>
          <Title>Предоставление баллов</Title>
          <Break height={5} />
          <Text>
            Клиент получает баллы после каждой покупки которые может потратить
            только у вас в компании
          </Text>
        </Col>
        <CustomToggle
          disabled={ballCheck}
          checked={ballCheck}
          onChange={(e: any) => {
            handleCheck({
              checked: e.target.checked,
              type: "bonuspoint",
            });
            dispatch(setChangeToggle({ name: "bonuspoint" }));
          }}
        />
      </Row>
      <Break height={10} />
      {emptyBall && ballCheck && <EText>{t("configure_setting_error")}</EText>}
      <Break height={10} />
      {ballCheck && (
        <SettingButton
          text={"Настроить"}
          onClick={() =>
            dispatch(handleClick({ type: "bonuspoint", open: true }))
          }
        />
      )}

      {/* add requirement modal */}
      <FullModal open={openCashback.open}>
        <CashbackModel />
      </FullModal>
      {/* change loayality action  */}
      <Modal open={openModal}>
        <ChangeLoyality />
      </Modal>
    </Container>
  );
};

export default MobileContent;
