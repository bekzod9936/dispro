import Button from "components/Custom/Buttons/Button";
import Popover from "components/Custom/Popover";
import Modal from "components/Custom/Modal";
import MultiSelect from "components/Custom/MultiSelect";
import Input from "components/Custom/Input";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WrapList } from "../../style";
import { CancelButton } from "components/Custom/Buttons/Cancel";
import { SaveButton } from "components/Custom/Buttons/Save";
import { IconButton } from "@material-ui/core";
import { useAppSelector } from "services/redux/hooks";
import { Controller, useForm } from "react-hook-form";
import useQrcode from "../../useQrcode";
import {
  SquarePlusIcon,
  DownIcon,
  CloseIcon,
  StoreIcon,
} from "newassets/icons/icons";
import {
  ModalText,
  ModalWrap,
  ModalHeader,
  ModalButtons,
  ModalTitle,
} from "../../style";

interface IStore {
  lable: string;
  value: number;
}

interface IForm {
  branch?: IStore;
  source?: string;
}

const CreateQrCode = () => {
  const { t } = useTranslation();
  const [closeFun, setCloseFun] = useState<any>(null);
  const [openSubscribe, setOpenSubscribe] = useState<boolean>(false);
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [stores, setStores] = useState<IStore[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const { putBranches, postRef } = useQrcode();

  const data = useAppSelector((state) => state.newsetting.branchQrcodes);

  useEffect(() => {
    const newarr: any = data
      ?.filter((v: any) => !v.active)
      .map((a: any) => {
        return { value: a.id, label: a.name };
      });
    setStores(newarr);
  }, [data]);

  const handleSaveBranches = (e: any) => {
    putBranches.mutate(
      { storeId: e.branch.value, activeQr: true },
      {
        onSuccess: () => {
          setOpenPayment(false);
          reset();
        },
      }
    );
  };

  const handleSaveRef = (e: any) => {
    if (e.source.match(/\S/) !== null) {
      clearErrors("source");
      postRef.mutate(
        { id: "", source: e.source },
        {
          onSuccess: () => {
            setOpenSubscribe(false);
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
            <li
              onClick={() => {
                closeFun.close();
                setOpenPayment(true);
              }}
            >
              {t("forP2p")}
            </li>
          </ul>
        </WrapList>
      </Popover>
      <Modal open={openSubscribe}>
        <form onSubmit={handleSubmit(handleSaveRef)}>
          <ModalWrap>
            <ModalHeader>
              <ModalTitle>{t("createqrforcompany")}</ModalTitle>
              <IconButton
                onClick={() => {
                  setOpenSubscribe(false);
                  reset();
                }}
              >
                <CloseIcon />
              </IconButton>
            </ModalHeader>
            <ModalText>{t("forcomfortqrcodeplace")}</ModalText>
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
                  setOpenSubscribe(false);
                  reset();
                }}
                margin={{ laptop: "0 15px 0 0" }}
              />
              <SaveButton disabled={postRef.isLoading} />
            </ModalButtons>
          </ModalWrap>
        </form>
      </Modal>
      <Modal open={openPayment}>
        <form onSubmit={handleSubmit(handleSaveBranches)}>
          <ModalWrap>
            <ModalHeader>
              <ModalTitle>{t("qrforpaymentplace")}</ModalTitle>
              <IconButton
                onClick={() => {
                  setOpenPayment(false);
                  reset();
                }}
              >
                <CloseIcon />
              </IconButton>
            </ModalHeader>
            <ModalText>{t("choosefilialqrcodesetting")}</ModalText>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="branch"
              render={({ field }) => {
                return (
                  <MultiSelect
                    isMulti={false}
                    field={field}
                    margin={{ laptop: "30px 0" }}
                    icon={<StoreIcon />}
                    selectStyle={{
                      bgcolor: stores.length === 0 ? "#d3d3d3" : "#eff0fd",
                      border: "none",
                      placeholdercolor: "#223367",
                      inpadding: "2px 10px 2px 60px",
                      placewieght: "500",
                    }}
                    isDisabled={stores.length === 0}
                    options={stores}
                    iconleft={"20px"}
                    icondowncolor="#C4C4C4"
                    placeholder={t("choose_branch")}
                    isClearable={false}
                    menuPortalTarget={document.body}
                    error={errors.branch || stores.length === 0 ? true : false}
                    message={
                      stores.length === 0
                        ? t("cannotchoosebranch")
                        : t("requiredField")
                    }
                  />
                );
              }}
            />
            <ModalButtons>
              <CancelButton
                onClick={() => {
                  setOpenPayment(false);
                  reset();
                }}
                margin={{ laptop: "0 15px 0 0" }}
              />
              <SaveButton disabled={putBranches.isLoading} />
            </ModalButtons>
          </ModalWrap>
        </form>
      </Modal>
    </>
  );
};

export default CreateQrCode;
