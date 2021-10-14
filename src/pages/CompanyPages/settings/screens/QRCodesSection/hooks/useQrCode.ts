import { useState, useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchQRCodes } from "services/queries/PartnerQueries";
import {
  createQrCode,
  deleteQrCode,
  editQrCode,
} from "services/queries/QrSettingsQueries";

const useQrCode = () => {
  const [searchQR, setSearchQR] = useState("");
  const [optionsOpen, setOptionsOpen] = useState<string | number>("");
  const [optionsListOpen, setOptionsListOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentName, setCurrentName] = useState<string>("");
  const [state, setState] = useState("");

  const { refetch, isLoading, data } = useQuery(["qrcodes"], fetchQRCodes, {
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const createQr = useMutation((data: any) => createQrCode(data), {
    onSuccess: () => {
      refetch();
    },
  });
  const editQr = useMutation((data: any) => editQrCode(data), {
    onSuccess: () => {
      refetch();
    },
  });
  const deleteQr = useMutation((data: any) => deleteQrCode(data), {
    onSuccess: () => {
      refetch();
    },
  });

  const handleCreateQRCode = () => {
    setState("create");
    setOptionsListOpen(!optionsListOpen);
    // setModalVisible(true)
  };
  const handleDeleteClick = () => {
    setState("delete");
    setOptionsOpen("");
    setModalVisible(true);
  };
  const handleEditClick = () => {
    setState("edit");
    setOptionsOpen("");
    setModalVisible(true);
  };

  const handleSavePromocode = async () => {
    if (!currentName) {
      return;
    } else if (!optionsOpen) {
      await createQr.mutate({
        id: "",
        source: currentName,
      });
      setCurrentName("");
      setModalVisible(false);
    } else if (optionsOpen) {
      await editQr.mutate({
        id: optionsOpen,
        source: currentName,
      });
      setCurrentName("");
      setModalVisible(false);
      setOptionsOpen("");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQr.mutate({
        data: {
          id: optionsOpen,
        },
      });

      setModalVisible(false);
      setOptionsOpen("");
    } catch (err) {}
  };

  const handleSearchQR = (e: any) => {
    setSearchQR(e.target.value);
  };

  const handleOption = useCallback(
    (id: any) => {
      if (!optionsOpen) {
        setOptionsOpen(id);
      } else {
        setOptionsOpen("");
      }
    },
    [optionsOpen]
  );

  return {
    isLoading,
    data,
    state,
    searchQR,
    handleSearchQR,
    optionsOpen,
    modalVisible,
    handleOption,
    handleDelete,
    optionsListOpen,
    handleCreateQRCode,
    handleDeleteClick,
    handleEditClick,
    handleSavePromocode,
    setModalVisible,
    setOptionsListOpen,
    setCurrentName,
  };
};

export default useQrCode;
