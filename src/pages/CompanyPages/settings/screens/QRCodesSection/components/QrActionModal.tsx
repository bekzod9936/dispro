import Modal from "components/Custom/Modal";
import Input from "components/Custom/Input";
import { useTranslation } from "react-i18next";
import { BtnAction } from "../styles/index";
//icons

import { MContent, ModalTitle, ModalCText, Break, ActMaxDiv } from "./style";
import CancelButton from "pages/CompanyPages/settings/components/CancelButton";
import DeleteButton from "pages/CompanyPages/settings/components/DeleteButton";
import SaveButton from "pages/CompanyPages/settings/components/SaveButton";

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
      <MContent>
        {state === "edit" || state === "create" ? (
          <>
            <ModalTitle>QR для подписки на компанию</ModalTitle>
            <Break mHeight={10} />
            <ActMaxDiv>
              <ModalCText>
                Для удобства, назовите QR, местом где вы собираетесь его
                использовать.
              </ModalCText>
            </ActMaxDiv>
            <Break mHeight={20} />
            <div style={{ width: "100%" }}>
              <Input
                width={{ minwidth: 350 }}
                label={t("enterNewName")}
                onChange={(e: any) => setCurrentName(e.target.value)}
              />
            </div>
            <BtnAction>
              <CancelButton
                onClick={() => {
                  setModalVisible(false);
                  setCurrentName("");
                }}
                text={t("cancel")}
              />
              <SaveButton text={t("save")} onClick={handleSavePromocode} />
            </BtnAction>
          </>
        ) : (
          <>
            <div style={{ maxWidth: "300px" }}>
              <ModalTitle>{t("sure_want_delete?")}</ModalTitle>
            </div>
            <BtnAction>
              <CancelButton
                text={t("cancel")}
                onClick={() => setModalVisible(false)}
              />
              <DeleteButton onClick={handleDelete} text={t("delete")} />
            </BtnAction>
          </>
        )}
      </MContent>
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
