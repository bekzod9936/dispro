import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import partnerApi from "services/interceptors/companyInterceptor";
import { fetchQRCodes } from "services/queries/PartnerQueries";

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

  const handleCreateQRCode = () => {
    setState("create");
    setOptionsListOpen(!optionsListOpen);
    // setModalVisible(true)
  };
  const handleDeleteClick = () => {
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
    } else if (!optionsOpen) {
      await partnerApi.post("/core/ref", {
        id: "",
        source: currentName,
      });
      setCurrentName("");
      setModalVisible(false);
    } else if (optionsOpen) {
      await partnerApi.put("/core/ref", {
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
      await partnerApi.delete("/core/ref", {
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

  const handleOption = useCallback((id: any) => {
    if (!optionsOpen) {
      setOptionsOpen(id);
    } else {
      setOptionsOpen("");
    }
  }, []);

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
