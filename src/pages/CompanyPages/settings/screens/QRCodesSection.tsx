import { valueScaleCorrection } from "framer-motion/types/render/dom/projection/scale-correction";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import { useQuery } from "react-query";
import { CancelIcon } from "../../../../assets/icons/ClientsPageIcons/ClientIcons";
import { BucketIcon } from "../../../../assets/icons/FeedBackIcons.tsx/FeedbackIcons";
import { SaveIcon } from "../../../../assets/icons/InfoPageIcons/InfoPageIcons";
import {
  DeleteIcon,
  DeleteIconWhite,
  DownloadIcon,
  FilledAddIcon,
  ScrapperIcon,
  ThreeDotsIcon,
} from "../../../../assets/icons/SettingsIcons/SettingsPageIcon";
import CustomInput from "../../../../components/Custom/CustomInput";
import CustomSearchFlexible from "../../../../components/Custom/CustomLargeFlexible";
import CustomModal from "../../../../components/Custom/CustomModal";
import CustomSelectPopoverComponent from "../../../../components/Custom/CustomSelectPopoverComponent";
import partnerApi from "../../../../services/interceptors/companyInterceptor";
import { fetchQRCodes } from "../../../../services/queries/PartnerQueries";
import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
} from "../../../../services/Types/enums";
import { Flex } from "../../../../styles/BuildingBlocks";
import {
  CustomButton,
  ModalComponent,
  OptionsList,
  OptionsListItem,
  PageWrapper,
  UnderSectionButton,
} from "../../../../styles/CustomStyles";
import { Text } from "../../../../styles/CustomStyles";
const QRCodesSection = () => {
  const { t } = useTranslation();
  const [qrcodes, setQrcodes] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentName, setCurrentName] = useState<string>("");
  const [refetch, setRefetch] = useState(0);
  const [state, setState] = useState("");
  const companyId = localStorage.getItem("companyId");
  const [optionsOpen, setOptionsOpen] = useState<string | number>("");
  const [searchQR, setSearchQR] = useState("");
  const [optionsListOpen, setOptionsListOpen] = useState(false);
  const response = useQuery(["qrcodes", refetch], fetchQRCodes, {
    retry: 0,
    refetchOnWindowFocus: false,
  });
  const options = [
    {
      key: "forDownload",
      content: "forDownload",
      handler: () => {
        setModalVisible(true);
        setOptionsListOpen(false);
      },
    },

    {
      key: "forP2p",
      content: "forP2p",
      handler: () => {
        setModalVisible(true);
        setOptionsListOpen(false);
      },
    },
  ];
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
      setRefetch(refetch + 1);
    } else if (optionsOpen) {
      await partnerApi.put("/core/ref", {
        id: optionsOpen,
        source: currentName,
      });
      setCurrentName("");
      setModalVisible(false);
      setRefetch(refetch + 1);
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
      setRefetch(refetch + 1);
      setModalVisible(false);
      setOptionsOpen("");
    } catch (err) {}
  };
  const handleSearchQR = (e: any) => {
    setSearchQR(e.target.value);
  };
  return (
    <div style={{ flexGrow: 1 }}>
      <PageWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "57%",
          }}
        >
          <div>
            <UnderSectionButton
              style={{ width: "170px" }}
              onClick={handleCreateQRCode}
            >
              <FilledAddIcon />
              <Text fontSize="18px" fontWeight={500}>
                {t("create")}
              </Text>
            </UnderSectionButton>
            {optionsListOpen && (
              <CustomSelectPopoverComponent
                options={options}
                width="fit-content"
              />
            )}
          </div>
          <CustomSearchFlexible
            placeholder="Поиск по QR"
            onChange={handleSearchQR}
            width="70%"
            padding="15.6px 25px"
            margin="0px"
          />
        </div>

        <Flex
          flexWrap="wrap"
          width="77%"
          margin="0px"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {!response.isLoading &&
            response?.data?.data &&
            response?.data?.data?.data
              ?.filter((value: any) => {
                if (searchQR === "") {
                  return true;
                } else {
                  return value.source.match(searchQR);
                }
              })
              .map((item: any) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      boxSizing: "border-box",
                      padding: "19px 22px",
                      width: "47%",
                      margin: "10px 10px 10px 0px",
                      borderRadius: "14px",
                      background: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div>
                        <Text fontSize="18px">{item.source}</Text>
                      </div>
                      <div
                        onClick={() => {
                          if (!optionsOpen) {
                            setOptionsOpen(item?.id);
                          } else {
                            setOptionsOpen("");
                          }
                        }}
                      >
                        <ThreeDotsIcon />
                      </div>
                      {optionsOpen === item.id && (
                        <div
                          style={{
                            position: "absolute",
                            top: 25,
                            right: -25,
                            zIndex: 2,
                            width: "250px",
                          }}
                        >
                          <OptionsList style={{ width: "100%" }}>
                            <OptionsListItem
                              style={{ width: "100%" }}
                              onClick={handleEditClick}
                            >
                              <Text
                                marginLeft="0px"
                                marginRight="0px"
                                fontSize="16px"
                                fontWeight={400}
                              >
                                {t("edit")}
                              </Text>
                            </OptionsListItem>
                            <OptionsListItem
                              onClick={handleDeleteClick}
                              style={{ width: "100%" }}
                            >
                              <Text
                                marginLeft="0px"
                                marginRight="0px"
                                fontSize="16px"
                                fontWeight={400}
                                color={COLORS.red}
                              >
                                {t("delete")}
                              </Text>
                            </OptionsListItem>
                          </OptionsList>
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        margin: "10px 10px 10px 0px",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div>
                        <QRCode value={item.dynLinkToken} size={150} />
                      </div>

                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          marginLeft: "15px",
                        }}
                      >
                        <div
                          style={{
                            width: "90%",
                            height: "55px",
                            boxSizing: "border-box",
                            padding: "10px 15px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "rgba(96, 110, 234, 1)",
                            borderRadius: "14px",
                          }}
                          className="downloadButton"
                        >
                          <DownloadIcon />
                          <Text marginLeft="15px" fontSize="17px" color="white">
                            {t("downloadPNG")}
                          </Text>
                        </div>
                        <div
                          style={{
                            width: "95%",
                            marginTop: "10px",
                            height: "55px",
                            boxSizing: "border-box",
                            padding: "10px 15px",
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            background: " rgba(96, 110, 234, 0.1)",
                            borderRadius: "14px",
                          }}
                          className="downloadButton"
                        >
                          <div>
                            <Text
                              fontSize={FONT_SIZE.mediumPlus}
                              color={COLORS.purple}
                            >
                              {t("copyLink")}
                            </Text>
                          </div>

                          <ScrapperIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </Flex>
        <CustomModal open={modalVisible}>
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
                  <CustomInput
                    style={{ width: "350px" }}
                    label="enterNewName"
                    onChange={(e: any) => setCurrentName(e.target.value)}
                  />
                </div>
                <Flex
                  width="100%"
                  margin="25px 0px 0px 100px"
                  justifyContent="end"
                >
                  <CustomButton
                    background="white"
                    onClick={() => {
                      setModalVisible(false);
                      setCurrentName("");
                    }}
                  >
                    <CancelIcon />
                    <Text color="#223367" fontSize="16px" fontWeight={500}>
                      {t("cancel")}
                    </Text>
                  </CustomButton>
                  <CustomButton onClick={handleSavePromocode}>
                    <SaveIcon />
                    <Text
                      color="white"
                      fontSize="16px"
                      marginLeft="15px"
                      fontWeight={500}
                    >
                      {t("save")}
                    </Text>
                  </CustomButton>
                </Flex>
              </>
            ) : (
              <>
                <div style={{ maxWidth: "300px" }}>
                  <Text fontSize={FONT_SIZE.mediumPlus}>
                    {t("sure_want_delete?")}
                  </Text>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <CustomButton
                    background="white"
                    onClick={() => setModalVisible(false)}
                  >
                    <CancelIcon />
                    <Text fontSize={FONT_SIZE.meduim}>{t("cancel")}</Text>
                  </CustomButton>
                  <CustomButton background={COLORS.red} onClick={handleDelete}>
                    <Text color="white" marginRight="15px">
                      {t("delete")}
                    </Text>
                    <DeleteIconWhite />
                  </CustomButton>
                </div>
              </>
            )}
          </ModalComponent>
        </CustomModal>
      </PageWrapper>
    </div>
  );
};

export default QRCodesSection;
