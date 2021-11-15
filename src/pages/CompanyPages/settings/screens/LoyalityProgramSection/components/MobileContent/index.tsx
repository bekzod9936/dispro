import { Container, Row, Col, Title, Text } from "./style";
import { Break } from "pages/CompanyPages/settings/styles";
//components
import SettingButton from "pages/CompanyPages/settings/components/SettingButton";
import CustomToggle from "components/Custom/CustomToggleSwitch";
//hooks
import useMobileContent from "./useMobileContent";
import FullModal from "components/Custom/FullModal";
import CashbackModel from "./cashback_model";
import LoyalityModel from "./loyality_model";

const MobileContent = () => {
  const {
    handleCheck,
    cashbackCheck,
    saleCheck,
    ballCheck,
    handleClick,
    openCashback,
  } = useMobileContent();

  const handleLoyal = () => {
    if (openCashback.type === "cashback") {
      return <CashbackModel />;
    } else {
      return <LoyalityModel />;
    }
  };

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
          }}
        />
      </Row>
      <Break height={10} />
      {saleCheck && (
        <SettingButton
          text={"Настроить"}
          onClick={() => handleClick("other", false)}
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
          }}
        />
      </Row>
      <Break height={10} />
      {cashbackCheck && (
        <SettingButton
          text={"Настроить"}
          onClick={() => handleClick("cashback", false)}
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
          }}
        />
      </Row>
      <Break height={10} />
      {ballCheck && (
        <SettingButton
          text={"Настроить"}
          onClick={() => handleClick("other", false)}
        />
      )}
      <FullModal open={openCashback.open}>{handleLoyal()}</FullModal>
    </Container>
  );
};

export default MobileContent;
