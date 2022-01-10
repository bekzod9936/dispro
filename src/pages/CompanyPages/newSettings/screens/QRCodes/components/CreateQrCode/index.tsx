import Button from "components/Custom/Buttons/Button";
import Popover from "components/Custom/Popover";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { WrapList } from "../../style";
import { useAppSelector } from "services/redux/hooks";
import ModalSubscribe from "./ModalSubscribe";
import ModalBranches from "./ModalBranches";
import { SquarePlusIcon, DownIcon } from "newassets/icons/icons";

const CreateQrCode = () => {
  const { t } = useTranslation();
  const [closeFun, setCloseFun] = useState<any>(null);
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [openSubscribe, setOpenSubscribe] = useState<boolean>(false);

  const type = useAppSelector((state) => state.info.data?.type);

  return (
    <>
      <Popover
        click={
          <Button
            startIcon={<SquarePlusIcon />}
            endIcon={<DownIcon style={{ marginLeft: "40px" }} />}
            buttonStyle={{
              bgcolor: "white",
              color: "#223367",
              weight: 500,
              shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
              height: {
                desktop: 50,
                laptop: 45,
              },
            }}
            margin={{ laptop: "0 20px 0 0" }}
          >
            {t("create")}
          </Button>
        }
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        radius={14}
        popoverStyle={{ marginTop: "20px" }}
        onClose={(e: any) => setCloseFun(e)}
      >
        <WrapList>
          <ul>
            <li
              onClick={() => {
                closeFun.close();
                setOpenSubscribe(true);
              }}
            >
              {t("forDownload")}
            </li>
            {type === 1 && (
              <li
                onClick={() => {
                  closeFun.close();
                  setOpenPayment(true);
                }}
              >
                {t("forP2p")}
              </li>
            )}
          </ul>
        </WrapList>
      </Popover>
      <ModalSubscribe open={[openSubscribe, setOpenSubscribe]} />
      <ModalBranches open={[openPayment, setOpenPayment]} />
    </>
  );
};

export default CreateQrCode;
