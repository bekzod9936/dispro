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
  const [id, setId] = useState<number | string>();

  const { refetch, isLoading, data } = useQuery(["qrcodes"], fetchQRCodes, {
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const createQr = useMutation((data: any) => createQrCode(data), {
    onSuccess: () => {
      refetch();
      setId("");
    },
  });
  const editQr = useMutation((data: any) => editQrCode(data), {
    onSuccess: () => {
      refetch();
      setId("");
    },
  });
  const deleteQr = useMutation((data: any) => deleteQrCode(data), {
    onSuccess: () => {
      refetch();
      setId("");
    },
  });

  const handleCreateQRCode = () => {
    setState("create");
    setOptionsListOpen(!optionsListOpen);
    // setModalVisible(true)
  };

  const handleDeleteClick = () => {
    console.log(optionsOpen, "options open");
    setState("delete");
    setModalVisible(true);
  };

  const handleEditClick = () => {
    setState("edit");
    setModalVisible(true);
  };

  const handleSavePromocode = async () => {
    if (!currentName) {
      return;
    } else if (!id) {
      await createQr.mutate({
        id: "",
        source: currentName,
      });
      setCurrentName("");
      setModalVisible(false);
    } else if (id) {
      await editQr.mutate({
        id: id,
        source: currentName,
      });
      setCurrentName("");
      setModalVisible(false);
      setOptionsOpen("");
    }
  };

  const handleDelete = async () => {
    console.log(optionsOpen, "options open");
    try {
      await deleteQr.mutate({
        data: {
          id: id,
        },
      });

      setModalVisible(false);
      setOptionsOpen("");
    } catch (err) {}
  };

  const handleSearchQR = (e: any) => {
    setSearchQR(e.target.value);
  };

  const handleOption = (id: any) => {
    if (!optionsOpen) {
      setOptionsOpen(id);
    } else {
      setOptionsOpen("");
    }
  };

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
    setId,
  };
};

export default useQrCode;
