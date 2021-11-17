import { useTranslation } from "react-i18next";
import { useState } from "react";
//actions
import { handleModal } from "services/redux/Slices/settingsSlice";
//styles
import { ModalContent, Row, ModalTitle, Text, Footer } from "./style";
//components
import Radio from "components/Custom/Radio";
import CancelButton from "pages/CompanyPages/settings/components/CancelButton";
import ApplyButton from "pages/CompanyPages/settings/components/ApplyButton";
//hooks
import { useAppDispatch } from "services/redux/hooks";

const ChangeLoyality = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const handleChange = () => {};
  const [modified, setModified] = useState("0");
  return (
    <ModalContent gap={25}>
      <Row>
        <ModalTitle>Выберите тип замены программы лояльности</ModalTitle>
      </Row>
      <Row>
        <Text>
          При изменении программы лояльности вы можетелибо обнулить статусы
          ваших клиентов, либо заменить программу лояльности, сохранив статусы
          клиентов.
        </Text>
      </Row>
      <Row>
        <Radio
          flexDirection="column"
          list={[
            {
              value: "1",
              label: `Обнулить статусы клиентов при замене лояльности`,
            },
            {
              value: "2",
              label: `Сохранить статусы клиентов при замене лояльности`,
            },
          ]}
          title={""}
          onChange={(v: any) => setModified(v)}
          value={modified}
        />
      </Row>
      <Footer>
        <CancelButton
          onClick={() => {
            dispatch(handleModal(false));
          }}
          text={t("cancel")}
        />
        <ApplyButton
          disabled={modified === "0"}
          onClick={handleChange}
          text={t("apply")}
        />
      </Footer>
    </ModalContent>
  );
};

export default ChangeLoyality;
