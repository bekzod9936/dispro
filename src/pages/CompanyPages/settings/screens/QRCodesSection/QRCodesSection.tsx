import { Grid } from "@material-ui/core";
import { Text } from "styles/CustomStyles";
import Input from "components/Custom/Input";
import Popover from "components/Custom/Popover";
import Button from "components/Custom/Button";
import { useTranslation } from "react-i18next";
import useQrCode from "./hooks/useQrCode";
import { Break } from "../../styles";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { SearchIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import {
  DeleteIconWhite,
  FilledAddIcon,
} from "assets/icons/SettingsIcons/SettingsPageIcon";
import CustomSelectPopoverComponent from "components/Custom/CustomSelectPopoverComponent";
import { FONT_SIZE, FONT_WEIGHT } from "services/Types/enums";
import { Flex } from "styles/BuildingBlocks";
import { CreateBtn, IconDiv, QRPageWrapper, BtnAction } from "./styles";
import { ModalComponent } from "styles/CustomStyles";
import QrCodeCard from "./components/QrCodeCard";
import { useState } from "react";
import Modal from "components/Custom/Modal";

const QRCodesSection = () => {
  const {
    isLoading,
    data,
    searchQR,
    handleSearchQR,
    optionsOpen,
    handleOption,
    handleDelete,
    optionsListOpen,
    modalVisible,
    state,
    handleCreateQRCode,
    handleDeleteClick,
    handleEditClick,
    handleSavePromocode,
    setModalVisible,
    setOptionsListOpen,
    setCurrentName,
    setId,
  } = useQrCode();
  const [closeFun, setCloseFun] = useState<any>();
  const handleClose = (e: any) => {
    setCloseFun(e);
  };
  const { t } = useTranslation();

  const options = [
    {
      key: "forDownload",
      content: "forDownload",
      handler: () => {
        setModalVisible(true);
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
        <Grid alignItems="center" container spacing={3} xs={6}>
          <Popover
            click={
              <CreateBtn item xs={12} sm={4}>
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
              </CreateBtn>
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
          {/* <HBreak width={25} /> */}
          <Grid item xs={12} sm={7}>
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
          </Grid>
        </Grid>
        <Break height={25} />

        {/* QR Code cards  */}
        <Grid container xs={10}>
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
        <Modal open={modalVisible}>
          <ModalComponent>
            {state === "edit" || state === "create" ? (
              <>
                <div>
                  <Text fontSize="21px" fontWeight={700}>
                    {t("create_promocode")}
                  </Text>
                </div>
                <div style={{ margin: "10px 0px 0px 0px", maxWidth: "380px" }}>
                  <Text
                    fontSize={FONT_SIZE.mediumPlus}
                    fontWeight={FONT_WEIGHT.modalText}
                  >
                    Для удобства, назовите QR, местом где вы собираетесь его
                    использовать.
                  </Text>
                </div>
                <div style={{ width: "100%" }}>
                  <Input
                    width={{ minwidth: 350 }}
                    label={t("enterNewName")}
                    onChange={(e: any) => setCurrentName(e.target.value)}
                  />
                </div>
                <Flex
                  width="100%"
                  margin="25px 0px 0px 100px"
                  justifyContent="end"
                >
                  <Button
                    startIcon={<CancelIcon />}
                    buttonStyle={{ bgcolor: "#fff" }}
                    onClick={() => {
                      setModalVisible(false);
                      setCurrentName("");
                    }}
                  >
                    <Text color="#223367">{t("cancel")}</Text>
                  </Button>
                  <Button
                    startIcon={<SaveIcon />}
                    onClick={handleSavePromocode}
                    buttonStyle={{
                      color: "#fff",
                    }}
                  >
                    {t("save")}
                  </Button>
                </Flex>
              </>
            ) : (
              <>
                <div style={{ maxWidth: "300px" }}>
                  <Text fontSize={FONT_SIZE.mediumPlus}>
                    {t("sure_want_delete?")}
                  </Text>
                </div>
                <BtnAction>
                  <Button
                    startIcon={<CancelIcon />}
                    buttonStyle={{ bgcolor: "white", color: "#223367" }}
                    onClick={() => setModalVisible(false)}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    buttonStyle={{
                      bgcolor: "rgba(255, 94, 104, 1)",
                      color: "#fff",
                    }}
                    onClick={handleDelete}
                    endIcon={<DeleteIconWhite />}
                  >
                    {t("delete")}
                  </Button>
                </BtnAction>
              </>
            )}
          </ModalComponent>
        </Modal>
      </QRPageWrapper>
    </div>
  );
};

export default QRCodesSection;
