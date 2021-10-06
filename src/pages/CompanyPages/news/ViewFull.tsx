import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditIcon, ResetIcon } from "../../../assets/icons/NewsIcons/NewsIcons";
import { Flex } from "../../../styles/BuildingBlocks";
import { CustomButton } from "../../../styles/CustomStyles";
import { AboutSectionWrapper } from "../info/InfoPageStyes";
import { SettingsWrapper } from "../settings/styles/SettingStyles";
import InfoComponent from "./InfoComponent";
import Iphone from "./Iphone";
import { Text } from "../../../styles/CustomStyles";
import { DeleteIconWhite } from "../../../assets/icons/SettingsIcons/SettingsPageIcon";
import { colors } from "@material-ui/core";
import { COLORS, FONT_SIZE, FONT_WEIGHT } from "../../../services/Types/enums";
import CropImageModal from "./CropImageModal";
import { setRegCompanyId } from "../../../services/redux/Slices/authSlice";
import { stat } from "fs";
import CustomFileUpload from "../info/CustomFileUpload";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../../components/Custom/CustomInput";
import CustomTextArea from "../info/CustomTextArea";
import { toDate } from "date-fns";
import CustomDatePicker from "../../../components/Custom/CustomDatePicker";
import CustomReusableSelect from "../../../components/Custom/CustomReusableSelect";
import { CancelIcon } from "../../../assets/icons/ClientsPageIcons/ClientIcons";
import { SaveIcon } from "../../../assets/icons/InfoPageIcons/InfoPageIcons";
import partnerApi from "../../../services/interceptors/companyInterceptor";
import axios from "axios";
import { STORAGE_URL } from "../../../services/constants/config";
interface IProps {
  selectedSingleNews: any;
  setModalIsVisible: any;
  setStatus: any;
  status: string;
  setSelect: any;
}

const ViewFull: React.FC<IProps> = ({
  selectedSingleNews,
  setSelect,
  setModalIsVisible,
  setStatus,
  status,
}) => {
  const { t } = useTranslation();
  const [isCropModalVisible, setIsModalVisible] = useState(false);
  const companyToken = localStorage.getItem("companyToken");
  const [file, setFile] = useState<any>(null);
  const { control, handleSubmit, setValue } = useForm();
  const [hover, setHover] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<any>(
    moment(Date.now()).format("MM/DD/YYYY")
  );
  const [dateTo, setDateTo] = useState<any>(
    moment(Date.now()).format("MM/DD/YYYY")
  );
  const [dateError, setDateError] = useState<boolean>(false);
  const options = [
    {
      key: t("all"),
      value: 0,
    },
    {
      key: t("male"),
      value: 1,
    },
    {
      key: t("female"),
      value: 2,
    },
  ];
  useEffect(() => {
    setValue("title", selectedSingleNews.title);
    setValue("description", selectedSingleNews.description);
    setValue("ageLimit", selectedSingleNews.ageFrom);
    setValue("gender", selectedSingleNews.genderType);
    setDateFrom(moment(selectedSingleNews.startLifeTime));
    setDateTo(moment(selectedSingleNews.endLifeTime));
  }, [selectedSingleNews]);
  const onFormSubmit = async (data: any) => {
    if (!dateFrom || !dateTo) {
      setDateError(true);
      return;
    } else {
      setDateError(false);
      if (status === "reset_news") {
        await partnerApi.post(`/core/news/`, {
          title: data.title,
          startLifeTime: moment(dateFrom).format("DD-MM-YYYY"),
          endLifeTime: moment(dateTo).format("DD-MM-YYYY"),
          description: data.description,
          ageFrom: data.ageLimit,
          id: selectedSingleNews.id,
          ageUnlimited: false,
          image: selectedSingleNews.image,
          genderType: data.gender,
          couponIds: [1, 2],
          pushUp: selectedSingleNews.pushUp,
          settings: selectedSingleNews.settings,
        });
      } else {
        await partnerApi.put(`/core/news/${selectedSingleNews.id}`, {
          title: data.title,
          startLifeTime: moment(dateFrom).format("DD-MM-YYYY"),
          endLifeTime: moment(dateTo).format("DD-MM-YYYY"),
          description: data.description,
          ageFrom: data.ageLimit,

          ageUnlimited: false,
          image: selectedSingleNews.image,
          genderType: data.gender,
          couponIds: [1, 2],
          pushUp: selectedSingleNews.pushUp,
          settings: selectedSingleNews.settings,
        });
      }

      setStatus("");
      setSelect(null);
    }
  };

  const deleteImage = async () => {
    await axios.delete(`${STORAGE_URL}/news`, {
      data: {
        links: [selectedSingleNews.image],
      },
      headers: {
        authorization: "Bearer " + companyToken,
        langId: 1,
      },
    });
    setSelect({ ...selectedSingleNews, image: "" });
    setHover(false);
  };
  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      <SettingsWrapper
        style={{
          width: "95%",
          height: "95%",
          boxSizing: "border-box",
          padding: "30px 40px",
        }}
      >
        {status === "edit_news" || status === "reset_news" ? (
          <>
            <div>
              <form onSubmit={handleSubmit(onFormSubmit)}>
                {selectedSingleNews.image ? (
                  <div style={{ position: "relative", width: "50%" }}>
                    <div>
                      <Text
                        fontSize={FONT_SIZE.mediumPlus}
                        fontWeight={FONT_WEIGHT.bold}
                      >
                        {t("photo")}
                      </Text>
                    </div>
                    <div style={{ position: "relative", width: "fit-content" }}>
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          opacity: hover ? 1 : 0,
                          zIndex: 200,
                          width: "60px",
                          height: "60px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          background: "rgba(0,0,0, 0.4)",
                          // filter: "brightness(1.2)"
                        }}
                        onClick={deleteImage}
                        onMouseOver={() => setHover(true)}
                      >
                        <DeleteIconWhite />
                      </div>
                      <div
                        onMouseOver={() => setHover(true)}
                        onMouseOutCapture={() => setHover(false)}
                        style={{
                          width: "280px",
                          marginTop: "15px  ",
                          height: "170px",
                          borderRadius: "14px",
                          filter: hover ? "brightness(0.7)" : "brightness(1)",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={selectedSingleNews.image}
                          style={{ width: "100%", height: "100%" }}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ width: "55%" }}>
                    <CustomFileUpload
                      label="upload_photo"
                      aboveInput={t("photo")}
                      aboveLabel={t("uploadPhotoInfo")}
                      onChange={(e: any) => {
                        setFile(e.target.files[0]);
                        setIsModalVisible(true);
                      }}
                    />
                  </div>
                )}

                <Flex
                  margin="0px"
                  flexGrow="1"
                  justifyContent="start"
                  alignItems="flex-start"
                >
                  <Flex
                    flexDirection="column"
                    width="50%"
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <Controller
                      control={control}
                      name="title"
                      render={({ field }) => {
                        return <CustomInput field={field} label={t("title")} />;
                      }}
                    />
                    <Controller
                      control={control}
                      name="description"
                      render={({ field }) => {
                        return (
                          <CustomTextArea
                            field={field}
                            label={t("description")}
                          />
                        );
                      }}
                    />
                  </Flex>
                  <Flex
                    margin="0px"
                    flexDirection="column"
                    width="50%"
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <div style={{ marginTop: "20px" }}>
                      <Text color="#c4c4c4" fontWeight={700}>
                        {t("chose_date")}
                      </Text>
                    </div>
                    <Flex width="86%" justifyContent="start" margin="0px">
                      <CustomDatePicker
                        date={dateFrom}
                        prefix={t("from")}
                        handleDateChange={(date: any) => {
                          setDateFrom(date);
                        }}
                      />
                      <CustomDatePicker
                        prefix={t("to")}
                        date={dateTo}
                        handleDateChange={(date: any) => {
                          setDateTo(date);
                        }}
                      />
                    </Flex>
                    <div>
                      {dateError && (
                        <Text fontSize="13px" fontWeight={400} color="red">
                          {t("requiredField")}
                        </Text>
                      )}
                    </div>
                    <div style={{ width: "100%" }}>
                      <Controller
                        control={control}
                        name="gender"
                        render={({ field }) => {
                          return (
                            <CustomReusableSelect
                              field={field}
                              label="chose_gender"
                              options={options}
                            />
                          );
                        }}
                      />
                    </div>
                    <Controller
                      control={control}
                      name="ageLimit"
                      render={({ field }) => {
                        return <CustomInput field={field} label="ageLimit" />;
                      }}
                    />
                  </Flex>
                </Flex>
                <Flex margin="20px 0px 0px 0px" justifyContent="start">
                  <CustomButton
                    background="white"
                    onClick={() => setStatus("")}
                  >
                    <CancelIcon />
                    <Text marginLeft="10px">{t("cancel")}</Text>
                  </CustomButton>
                  {status === "reset_news" ? (
                    <CustomButton type="submit">
                      <ResetIcon />
                      <Text marginLeft="10px" color="white">
                        {t("resetNews")}
                      </Text>
                    </CustomButton>
                  ) : (
                    <CustomButton type="submit">
                      <SaveIcon />
                      <Text marginLeft="10px" color="white">
                        {t("save")}
                      </Text>
                    </CustomButton>
                  )}
                </Flex>
              </form>
            </div>
          </>
        ) : (
          <>
            <Flex
              margin="0px"
              width="100%"
              height="100%"
              justifyContent="start"
              alignItems="flex-start"
            >
              <Flex
                width="35%"
                height="100%"
                margin="0px"
                alignItems="center"
                justifyContent="center"
              >
                <Iphone
                  image={selectedSingleNews.image}
                  title={selectedSingleNews.title}
                  description={selectedSingleNews.description}
                />
              </Flex>
              <Flex
                margin="0px"
                padding="40px 10px"
                justifyContent="start"
                alignItems="flex-start"
                flexDirection="column"
              >
                <InfoComponent
                  ageLimit={selectedSingleNews.ageFrom}
                  gender={
                    selectedSingleNews.genderType === 0
                      ? "forMales"
                      : "forFemale"
                  }
                  publishDate={`${moment(selectedSingleNews.createdAt)
                    .locale("ru")
                    .format("DD MMM")} - ${moment(
                    selectedSingleNews.endLifeTime
                  )
                    .locale("ru")
                    .format("DD  MMM YYYY")}`}
                />
                <div style={{ marginTop: "15px" }}>
                  <CustomButton
                    onClick={() => {
                      setStatus("edit_news");
                    }}
                  >
                    <EditIcon />
                    <Text color="white" marginLeft="10px">
                      {t("edit")}
                    </Text>
                  </CustomButton>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <CustomButton
                    background={COLORS.red}
                    onClick={() => setModalIsVisible(true)}
                  >
                    <DeleteIconWhite />
                    <Text color="white" marginLeft="10px">
                      {t("delete")}
                    </Text>
                  </CustomButton>
                </div>
              </Flex>
            </Flex>
          </>
        )}
        {file && (
          <CropImageModal
            setIsCropModalVisible={setIsModalVisible}
            isCropModalVisible={isCropModalVisible}
            src={file}
          />
        )}
      </SettingsWrapper>
    </div>
  );
};

export default ViewFull;
