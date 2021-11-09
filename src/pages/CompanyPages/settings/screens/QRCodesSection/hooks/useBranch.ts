import { useState } from "react";
import { useMutation } from "react-query";
import { generateBranchQr } from "services/queries/qrSetttingQuery";
import useQrCode from "./useQrCode";
import { FormProps } from "../types";

const useBranch = () => {
  const [qrVisible, setQrVisible] = useState(false);
  const { refetch } = useQrCode();
  const generateQrBranch = useMutation((data: any) => generateBranchQr(data), {
    onSuccess: () => {
      refetch();
      setQrVisible(false);
    },
  });

  const closeQr = () => {
    setQrVisible(false);
  };

  const openQr = () => {
    setQrVisible(true);
  };

  const onSave = (data: FormProps) => {
    console.log(data.branch, "data branch");
    generateQrBranch.mutate({
      storeId: data.branch?.value,
    });
  };

  return {
    generateQrBranch,
    closeQr,
    onSave,
    qrVisible,
    openQr,
  };
};

export default useBranch;
