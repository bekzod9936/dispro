import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
//components
import Modal from "components/Custom/Modal";
import Button from "components/Custom/Button";
//atoms
import {
  openModal,
  permissionList,
  setOpenMenu,
  setOpenModal,
  setPermissions,
} from "services/atoms/permissions";
//styles
import { ModalContent, Text, ModalAction } from "./style";
import { setCompanyInfo } from "services/redux/Slices/partnerSlice";
import { setInfoData, initialState } from "services/redux/Slices/info/info";

const RestrictModal = () => {
  const userType = localStorage.getItem("userType");
  const { t } = useTranslation();
  const { permissions } = useRecoilValue(permissionList);
  const setOpen = useSetRecoilState(setOpenMenu);
  const setOpenM = useSetRecoilState(setOpenModal);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state) => state.feedbackPost.socket);
  const open = useRecoilValue(openModal);
  const setPermission = useSetRecoilState(setPermissions);
  //   const open = !permissions && userType === "4";
  useEffect(() => {
    if (!permissions && userType === "4") {
      setOpen(false);
      setOpenM(true);
      setPermission({ permissions: [] });
    }
  }, [permissions]);

  const handleLogout = () => {
    setOpen(false);
    setOpenM(false);
    localStorage.removeItem("companyId");
    localStorage.removeItem("companyToken");
    // localStorage.removeItem('userType');
    history.push("/partner/company");
    dispatch(setCompanyInfo({}));
    socket.disconnect();
    dispatch(setInfoData({ ...initialState?.data }));
  };

  return (
    <Modal open={open}>
      <ModalContent>
        <Text>У вас нет доступ, обратитесь к администратору</Text>
        <ModalAction>
          <Button onClick={handleLogout}>{t("quit")}</Button>
        </ModalAction>
      </ModalContent>
    </Modal>
  );
};

export default RestrictModal;
