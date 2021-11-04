import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import Input from "components/Custom/Input";
import { useTranslation } from "react-i18next";

//styles
import { ModalComponent, Text } from "styles/CustomStyles";
import { FONT_SIZE, FONT_WEIGHT } from "services/Types/enums";
import { Flex } from "styles/BuildingBlocks";
import { BtnAction } from "../styles/index";
//icons
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import { DeleteIconWhite } from "assets/icons/SettingsIcons/SettingsPageIcon";

const QrActionModal = ({
  modalVisible,
  state,
  setModalVisible,
  setCurrentName,
  handleSavePromocode,
  handleDelete,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={modalVisible}>
      <ModalComponent>
        {state === "edit" || state === "create" ? (
          <>
            <div>
              <Text fontSize="21px" fontWeight={700}>
                {t("create_promocode")}
              </Text>
            </div>
            <div style={{ margin: "10px 0px 0px 0px", maxWidth: "380px" }}>
              <Text
                fontSize={FONT_SIZE.mediumPlus}
                fontWeight={FONT_WEIGHT.modalText}
              >
                Для удобства, назовите QR, местом где вы собираетесь его
                использовать.
              </Text>
            </div>
            <div style={{ width: "100%" }}>
              <Input
                width={{ minwidth: 350 }}
                label={t("enterNewName")}
                onChange={(e: any) => setCurrentName(e.target.value)}
              />
            </div>
            <Flex width="100%" margin="25px 0px 0px 100px" justifyContent="end">
              <Button
                startIcon={<CancelIcon />}
                buttonStyle={{ bgcolor: "#fff" }}
                onClick={() => {
                  setModalVisible(false);
                  setCurrentName("");
                }}
              >
                <Text color="#223367">{t("cancel")}</Text>
              </Button>
              <Button
                startIcon={<SaveIcon />}
                onClick={handleSavePromocode}
                buttonStyle={{
                  color: "#fff",
                }}
              >
                {t("save")}
              </Button>
            </Flex>
          </>
        ) : (
          <>
            <div style={{ maxWidth: "300px" }}>
              <Text fontSize={FONT_SIZE.mediumPlus}>
                {t("sure_want_delete?")}
              </Text>
            </div>
            <BtnAction>
              <Button
                startIcon={<CancelIcon />}
                buttonStyle={{ bgcolor: "white", color: "#223367" }}
                onClick={() => setModalVisible(false)}
              >
                {t("cancel")}
              </Button>
              <Button
                buttonStyle={{
                  bgcolor: "rgba(255, 94, 104, 1)",
                  color: "#fff",
                }}
                onClick={handleDelete}
                endIcon={<DeleteIconWhite />}
              >
                {t("delete")}
              </Button>
            </BtnAction>
          </>
        )}
      </ModalComponent>
    </Modal>
  );
};

export default QrActionModal;

interface IProps {
  modalVisible: boolean;
  state: any;
  setModalVisible: any;
  setCurrentName: any;
  handleSavePromocode: any;
  handleDelete: any;
}
