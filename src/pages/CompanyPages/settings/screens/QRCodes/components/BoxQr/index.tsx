import { useState } from "react";
import {
  DotsIcon,
  DownLoadIcon,
  ChainIcon,
  CloseIcon,
} from "newassets/icons/icons";
import Popover from "components/Custom/Popover";
import { useTranslation } from "react-i18next";
import { IconButton } from "@material-ui/core";
import QRCode from "qrcode.react";
import { downloadQR } from "./canvas";
import { copyToClipboard } from "services/utils";
import Modal from "components/Custom/Modal";
import Input from "components/Custom/Input";
import { CancelButton } from "components/Custom/Buttons/Cancel";
import { SaveButton } from "components/Custom/Buttons/Save";
import { DeleteButton } from "components/Custom/Buttons/Delete";
import Button from "components/Custom/Buttons/Button";
import SnackBar from "components/Custom/NewSnack";
import {
  ModalText,
  ModalWrap,
  ModalHeader,
  ModalButtons,
  ModalTitle,
} from "../../style";
import {
  Box,
  BoxTitle,
  BoxHeader,
  BoxBody,
  WrapButtonsDelete,
  WrapList,
  WrapButtons,
} from "./style";
import useQrcode from "../../useQrcode";
import { Controller, useForm } from "react-hook-form";

interface Props {
  link?: string;
  name?: string;
  id?: number;
  branch?: boolean;
}

interface IForm {
  source?: string;
}

const BoxQr = ({ link, name, id, branch }: Props) => {
  const { t } = useTranslation();
  const [closeFun, setCloseFun] = useState<any>(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty },
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const { putBranches, deleteRef, putRef } = useQrcode();

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openSnack, setOpenSnack] = useState<boolean>(false);

  const downloadQrCode = () => {
    const canvas = document.getElementById(
      `referral-qr-code-${id}`
    ) as HTMLCanvasElement;
    downloadQR(canvas);
  };

  const handleDelete = () => {
    if (branch) {
      putBranches.mutate(
        { storeId: id, activeQr: false },
        {
          onSuccess: () => {
            setOpenDelete(false);
          },
        }
      );
    } else {
      deleteRef.mutate(id, {
        onSuccess: () => {
          setOpenDelete(false);
        },
      });
    }
  };

  const handleEditRef = (e: any) => {
    if (e.source.match(/\S/) !== null) {
      clearErrors("source");
      putRef.mutate(
        { id, source: e.source },
        {
          onSuccess: () => {
            setOpenEdit(false);
            reset();
          },
        }
      );
    } else {
      setError("source", { type: "required" }, { shouldFocus: true });
    }
  };

  return (
    <>
      <Box>
        <BoxHeader>
          <BoxTitle>
            <span>{name}</span>
            {branch ? <span>{t("qrcodeforpayment")}</span> : null}
          </BoxTitle>
          <Popover
            click={
              <IconButton>
                <DotsIcon />
              </IconButton>
            }
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            radius={14}
            onClose={(e: any) => setCloseFun(e)}
          >
            <WrapList>
              <ul>
                {branch === true ? null : (
                  <li
                    onClick={() => {
                      setOpenEdit(true);
                      closeFun.close();
                      setValue("source", name);
                    }}
                  >
                    {t("edit")}
                  </li>
                )}
                <li
                  onClick={() => {
                    setOpenDelete(true);
                    closeFun.close();
                  }}
                  className="delete"
                >
                  {t("delete")}
                </li>
              </ul>
            </WrapList>
          </Popover>
        </BoxHeader>
        <BoxBody>
          <QRCode
            id={`referral-qr-code-${id}`}
            value={link!}
            size={120}
            fgColor={"#223367"}
            level={"L"}
          />
          <WrapButtons>
            <Button
              startIcon={<DownLoadIcon />}
              buttonStyle={{ shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)" }}
              onClick={downloadQrCode}
            >
              {t("downloadPNG")}
            </Button>
            <Button
              endIcon={<ChainIcon />}
              onClick={async () => {
                await copyToClipboard(link!);
                await setOpenSnack(true);
                await setTimeout(() => {
                  setOpenSnack(false);
                }, 500);
              }}
              buttonStyle={{ bgcolor: "#eff0fd", color: " #606EEA" }}
              margin={{ laptop: "0 30px 0 0" }}
            >
              {t("copyLink")}
            </Button>
            <SnackBar
              message={t("copylinksuccess")}
              status="success"
              open={openSnack}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              iconclose={false}
            />
          </WrapButtons>
        </BoxBody>
      </Box>
      <Modal open={openEdit}>
        <form onSubmit={handleSubmit(handleEditRef)}>
          <ModalWrap>
            <ModalHeader>
              <ModalTitle>{t("editqrcode")}</ModalTitle>
              <IconButton
                onClick={() => {
                  setOpenEdit(false);
                  reset();
                }}
              >
                <CloseIcon />
              </IconButton>
            </ModalHeader>
            <ModalText>{t("changenameqrcode")}</ModalText>
            <Controller
              rules={{ required: true, maxLength: 30 }}
              control={control}
              name="source"
              render={({ field }) => {
                return (
                  <Input
                    label={t("enterNewName")}
                    field={field}
                    error={errors.source ? true : false}
                    message={
                      errors.source?.type === "maxLength"
                        ? t("maxcharacters", { value: 30 })
                        : t("requiredField")
                    }
                    margin={{ laptop: "30px 0" }}
                  />
                );
              }}
            />

            <ModalButtons>
              <CancelButton
                onClick={() => {
                  setOpenEdit(false);
                  reset();
                }}
                margin={{ laptop: "0 15px 0 0" }}
              />
              <SaveButton disabled={putRef.isLoading || !isDirty} />
            </ModalButtons>
          </ModalWrap>
        </form>
      </Modal>
      <Modal open={openDelete}>
        <ModalWrap>
          <ModalHeader>
            <ModalTitle>{t("wantdeleteqrcode")}</ModalTitle>
          </ModalHeader>
          <WrapButtonsDelete>
            <CancelButton
              onClick={() => {
                setOpenDelete(false);
                reset();
              }}
              margin={{ laptop: "30px 15px 0 0" }}
            />
            <DeleteButton
              onClick={handleDelete}
              disabled={putBranches.isLoading || deleteRef.isLoading}
              margin={{ laptop: "30px 0 0 0" }}
            />
          </WrapButtonsDelete>
        </ModalWrap>
      </Modal>
    </>
  );
};

export default BoxQr;
