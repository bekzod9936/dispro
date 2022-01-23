import { IconButton } from "@material-ui/core";
import { CancelButton } from "components/Custom/Buttons/Cancel";
import { SaveButton } from "components/Custom/Buttons/Save";
import Modal from "components/Custom/Modal";
import MultiSelect from "components/Custom/MultiSelect";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CloseIcon, StoreIcon } from "newassets/icons/icons";
import {
  ModalText,
  ModalWrap,
  ModalHeader,
  ModalButtons,
  ModalTitle,
} from "../../../style";
import useQrcode from "../../../useQrcode";
import { useAppSelector } from "services/redux/hooks";

interface IStore {
  lable: string;
  value: number;
}

interface IForm {
  branch?: IStore;
}
const MBranches = ({ open }: any) => {
  const { t } = useTranslation();
  const [openPayment, setOpenPayment] = open;
  const [stores, setStores] = useState<IStore[]>([]);

  const { putBranches } = useQrcode();

  const data = useAppSelector((state) => state.newsetting.branchQrcodes);

  useEffect(() => {
    const newarr: any = data
      ?.filter((v: any) => !v.active)
      .map((a: any) => {
        return { value: a.id, label: a.name };
      });
    setStores(newarr);
  }, [data]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<IForm>({
    mode: "onChange",
  });

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

  return (
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
            <SaveButton disabled={putBranches.isLoading || !isDirty} />
          </ModalButtons>
        </ModalWrap>
      </form>
    </Modal>
  );
};

export default MBranches;
