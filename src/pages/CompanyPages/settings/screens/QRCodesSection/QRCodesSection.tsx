import { Grid } from "@material-ui/core";
import Input from "components/Custom/Input";
import Popover from "components/Custom/Popover";
import Button from "components/Custom/Button";
import { useTranslation } from "react-i18next";
import useQrCode from "./hooks/useQrCode";
import useBranch from "./hooks/useBranch";
import { Break } from "../../styles";
import { SearchIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { FilledAddIcon } from "assets/icons/SettingsIcons/SettingsPageIcon";
import CustomSelectPopoverComponent from "components/Custom/CustomSelectPopoverComponent";
import {
  CreateBtn,
  IconDiv,
  QRPageWrapper,
  MyHeadAction,
  HeadInput,
} from "./styles";
import QrCodeCard from "./components/QrCodeCard";
import { useState } from "react";
import QrActionModal from "./components/QrActionModal";
import QrForBranch from "./components/QrForBranch";

const QRCodesSection = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    data,
    searchQR,
    handleSearchQR,
    optionsOpen,
    handleOption,
    optionsListOpen,
    handleCreateQRCode,
    handleDeleteClick,
    handleEditClick,
    setModalVisible,
    setOptionsListOpen,
    setId,
    modalVisible,
    state,
    handleDelete,
    setCurrentName,
    handleSavePromocode,
  } = useQrCode();

  const { closeQr, onSave, qrVisible, openQr } = useBranch();

  const [closeFun, setCloseFun] = useState<any>();
  const handleClose = (e: any) => {
    setCloseFun(e);
  };

  const options = [
    {
      key: "forDownload",
      content: "forDownload",
      handler: () => {
        openQr();
        setOptionsListOpen(false);
        closeFun.close();
      },
    },

    {
      key: "forP2p",
      content: "forP2p",
      handler: () => {
        setModalVisible(true);
        setOptionsListOpen(false);
        closeFun.close();
      },
    },
  ];

  return (
    <div style={{ flexGrow: 1 }}>
      <QRPageWrapper>
        <MyHeadAction>
          <CreateBtn>
            <Popover
              click={
                <Button
                  startIcon={<FilledAddIcon />}
                  width={{
                    minwidth: 170,
                  }}
                  buttonStyle={{
                    bgcolor: "white",
                    color: "#223367",
                    height: {
                      desktop: 60,
                      laptop: 60,
                    },
                  }}
                  // style={{ width: "170px" }}
                  onClick={handleCreateQRCode}
                >
                  {t("create")}
                </Button>
              }
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              popoverStyle={{ marginTop: "20px" }}
              onClose={handleClose}
            >
              {optionsListOpen && (
                <CustomSelectPopoverComponent
                  options={options}
                  width="fit-content"
                />
              )}
            </Popover>
          </CreateBtn>
          {/* <HBreak width={25} /> */}
          <HeadInput>
            <Input
              IconStart={
                <IconDiv>
                  <SearchIcon />
                </IconDiv>
              }
              inputStyle={{
                border: "none",
              }}
              placeholder="Поиск по QR"
              onChange={handleSearchQR}
            />
          </HeadInput>
        </MyHeadAction>
        <Break height={25} />

        {/* QR Code cards  */}
        <Grid container xs={12} sm={12} md={10} lg={10}>
          {!isLoading &&
            data?.data &&
            data?.data?.data
              ?.filter((value: any) => {
                if (searchQR === "") {
                  return true;
                } else {
                  return value.source.match(searchQR);
                }
              })
              .map((item: any, index: number) => {
                return (
                  <Grid key={item?.id} item xs={12} sm={12} md={6} lg={6}>
                    <QrCodeCard
                      item={item}
                      index={index}
                      handleOption={() => handleOption(item?.id)}
                      optionsOpen={optionsOpen}
                      handleDeleteClick={handleDeleteClick}
                      handleEditClick={handleEditClick}
                      setId={setId}
                    />
                  </Grid>
                );
              })}
        </Grid>

        {/* Modal side  */}

        <QrActionModal
          modalVisible={modalVisible}
          state={state}
          setModalVisible={setModalVisible}
          setCurrentName={setCurrentName}
          handleDelete={handleDelete}
          handleSavePromocode={handleSavePromocode}
        />

        <QrForBranch qrVisible={qrVisible} onSave={onSave} closeQr={closeQr} />
      </QRPageWrapper>
    </div>
  );
};

export default QRCodesSection;
