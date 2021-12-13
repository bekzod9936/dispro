import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import Input from "components/Custom/Input";
import { TextArea } from "components/Custom/TextArea";
import MultiSelect from "components/Custom/MultiSelect";
import Title from "components/Custom/Title";
import CheckBox from "components/Custom/CheckBox";
import React from "react";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import Modal from "components/Custom/Modal";
import Spinner from "components/Helpers/Spinner";
import ImageLazyLoad from "components/Custom/ImageLazyLoad/ImageLazyLoad";
import useStaff from "../../hooks/useStaff";
import { CloseIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import CropCustomModal from "components/Custom/CropImageModal/index";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import InputFormat from "components/Custom/InputFormat";
import dayjs from "dayjs";
import { fetchCreateNews } from "services/queries/newPageQuery";
import { setErrorMessage } from "services/redux/Slices/news";
import { MobileCancelIcon } from "assets/icons/proposals/ProposalsIcons";
import { UploadModal } from "./components/UploadModal";
import { ConfirmModal } from "./components/ConfirmModal";
import { CancelNewsModal } from "./components/CancelNewsModal";
import {
  Label,
  WrapDate,
  WrapInputs,
  WrapSelect,
} from "../../components/Header/style";
import {
  DeleteIcon,
  GoBackIcon,
  PlusIcon,
  UploadImage,
} from "assets/icons/proposals/ProposalsIcons";
import { SaveIcon, SaveIconMobile } from "assets/icons/news/newsIcons";
import { days, genders, todayDate, nextDay } from "./constants";
import useWindowWidth from "services/hooks/useWindowWidth";
import {
  PushBlock,
  PushWrapper,
  Container,
  DownSide,
  ErrorMessage,
  Form,
  Header,
  ImageBlock,
  LeftSide,
  RightSide,
  UploadButton,
  WrapArea,
  TextAreaIcon,
  UpSide,
  Wrapper,
  WrapperModal,
  CloseButton,
  FormRow,
  Buttons,
  MobileHeader,
} from "./style";
import { useUploadImage } from "../../hooks/useUploadIMage";

import { ReactComponent as MarketIcon } from "assets/icons/SideBar/ilmarket.svg";

import { useDispatch } from "react-redux";

interface IOptionFields {
  push: boolean;
}

const CreateNews = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { width } = useWindowWidth();
  const { branches } = useStaff();
  const [optionalFields, setOptionalFields] = React.useState<IOptionFields>({
    push: false,
  });

  const [file, setFile] = React.useState<any>("");
  const [checked, setChecked] = React.useState(false);
  const [isCropVisible, setIsCropVisible] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [cancel, setCancel] = React.useState(false);
  const [startDate, setStartDate] = React.useState<any>();
  const [validation, setValidation] = React.useState<any>(false);
  const [errorFileType, setErrorFileType] = React.useState<any>(false);
  const handleBack = () => {
    history.goBack();
  };
  const { handleUpload, deleteImage, setLoading, isLoading } =
    useUploadImage(setImage);
  const { mutate } = useMutation(fetchCreateNews, {
    onError: () => {
      dispatch(setErrorMessage(true));
    },
  });

  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  const handleUploadImg = (data: any) => {
    if (data.target.files[0].type == "image/jpeg") {
      setFile(data.target.files[0]);
      setIsCropVisible(true);
      setErrorFileType(false);
    } else if (data.target.files[0].type == "image/png") {
      setFile(data.target.files[0]);
      setIsCropVisible(true);
      setErrorFileType(false);
    } else {
      setErrorFileType(true);
      setIsCropVisible(false);
    }
  };

  const cancelFormat = () => {
    setErrorFileType(false);
  };

  const handleOpenBlock = (e: any, action: "push") => {
    setOptionalFields((prev: IOptionFields) => ({
      ...prev,
      [action]: e.target.checked,
    }));
  };

  const handleDelete = () => {
    setFile("");
    setImage("");
    deleteImage(image);
  };
  const cancelNews = () => {
    setCancel(false);
    history.goBack();
  };
  function getValidDate(obj: any) {
    return "" + obj.year + "-" + obj.month.number + "-" + obj.day
  }

  const submitNews = (data: any) => {
    let newsData = {
      title: data.name,
      startLifeTime:width>1000 ? data.startDate: getValidDate(data.startDate) ,
      endLifeTime:width>1000 ?data.endDate: getValidDate(data.endDate ),
      description: data.description,
      ageFrom: parseInt(data.ageLimit),
      ageTo: 100,
      ageUnlimited: parseInt(data.ageLimit) ? false : true,
      couponIds: [],
      image: image,
      genderType: data.gender?.id,
      pushUp: optionalFields.push,
      settings: {
        weekDays:
          optionalFields.push && data?.days?.length
            ? data.days.map((el: any) => el.id)
            : [0, 1, 2, 3, 4, 5, 6],
        aroundTheClock: checked ? true : false,
        time: {
          from: optionalFields.push && data?.timeFrom ? data.timeFrom : "00:00",
          to: optionalFields.push && data?.timeTo ? data.timeTo : "23:59",
        },
        stores:
          optionalFields.push && data?.filialID?.length
            ? data.filialID.map((el: any) => el.value)
            : [],
      },
      pushUpTitle: optionalFields.push ? data.descriptionPush : "",
    };
    setStartDate(data.startDate);
    setSubmit(true);
    setFormData(newsData);
  };

  const cancelSubmit = () => {
    setSubmit(false);
  };
  const notCancel = () => {
    setCancel(false);
  };
  const submitData = () => {
    mutate(formData);

    setTimeout(() => history.goBack(), 1000);
  };
  React.useEffect(() => {
    if (checked) {
      setValue("timeFrom",  "00:00");
      setValue("timeTo",  "23:59");
    }
 
}, [checked]);
console.log('checked',checked)
  return (
    <Wrapper>
      {width > 1000 && (
        <div
          style={{ display: "flex", marginBottom: 30, alignItems: "center" }}
        >
          <GoBackIcon
            onClick={handleBack}
            style={{ marginRight: "25px", cursor: "pointer" }}
          />
          <Title>{t('Добавление новости')}</Title>
        </div>
      )}
      <UploadModal
        errorFileType={errorFileType}
        handleUploadImg={handleUploadImg}
        cancelFormat={cancelFormat}
      />
      <ConfirmModal
        startDate={startDate}
        todayDate={todayDate}
        submit={submit}
        cancelSubmit={cancelSubmit}
        submitData={submitData}
      />
      <CancelNewsModal
        cancel={cancel}
        cancelNews={cancelNews}
        notCancel={notCancel}
      />

      <Form onSubmit={handleSubmit(submitNews)}>
        <UpSide>
          {width <= 1000 && (
            <MobileHeader>
              <GoBackIcon onClick={handleBack} style={{ cursor: "pointer" }} />
              <Title> {t("addingNews")}</Title>
            </MobileHeader>
          )}

          <Container>
            <LeftSide>
              <Title>{t("photos")}</Title>
              {!isLoading && !image && (
                <div style={{ marginBottom: 30 }}>
                  <Header>
                    <p>
                      {t(
                        "uploadPhotoInfo"
                      )}
                    </p>
                  </Header>
                  <UploadButton>
                    <label htmlFor="uploadImg">{t("uploadPhoto")}</label>
                    <input
                      {...register("image", { required: true })}
                      value={image}
                      onChange={handleUploadImg}
                      type="file"
                      id="uploadImg"
                    />
                    <UploadImage />
                  </UploadButton>
                  {errors.image && (
                    <ErrorMessage>{t("requiredField")}</ErrorMessage>
                  )}
                </div>
              )}
              {isLoading && (
                <div style={{ width: "100%", height: 140 }}>
                  <Spinner size={30} />
                </div>
              )}
              {image && (
                <ImageBlock>
                  <ImageLazyLoad objectFit="contain" src={image} alt="logo" />
                  <DeleteIcon onClick={handleDelete} />
                </ImageBlock>
              )}
              {file && (
                <CropCustomModal
                  setIsLoading={setLoading}
                  handleUpload={handleUpload}
                  setFile={setFile}
                  setIsCropVisible={setIsCropVisible}
                  open={isCropVisible}
                  src={file}
                />
              )}
              <Controller
                name="name"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    error={!!errors.name}
                    message={t("requiredField")}
                    field={field}
                    maxLength={80}
                    label={t("Название")}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextArea
                    maxLength={800}
                    {...field}
                    fontSize={width > 1000 ? "15px" : "14px"}
                    message={t("requiredField")}
                    error={!!errors.description}
                    minHeight={"150px"}
                    maxHeight={"300px"}
                    resize={"vertical"}
                    title={t("Описание")}
                  />
                )}
              />
              {width > 1000 ? (
                <WrapInputs>
                  <Label>{t("chose_date")}</Label>
                  <div>
                    <Controller
                      name="startDate"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Input
                          field={field}
                          type="date"
                          min={todayDate}
                          width={{ maxwidth: 600, minwidth: 10 }}
                          error={!!errors.startDate}
                          IconStart={<WrapDate>{t("from")}</WrapDate>}
                          inputStyle={{
                            inpadding: "0 10px 0 0",
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="endDate"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Input
                          type="date"
                          field={field}
                          width={{ maxwidth: 600, minwidth: 10 }}
                          error={!!errors.endDate}
                          min={watch("startDate")}
                          margin={{ laptop: "0 0 0 15px" }}
                          IconStart={<WrapDate>{t("to")}</WrapDate>}
                          inputStyle={{
                            inpadding: "0 10px 0 0",
                          }}
                        />
                      )}
                    />
                  </div>
                </WrapInputs>
              ) : (
                <WrapInputs>
                        <div className="startAndEndDate">
                <Controller
                  name="startDate"
                  rules={{
                    required: true,
                  }}
                  control={control}
                  render={({ field }) => (
                    <CustomDatePicker
                      text={t("from")}
                      margin={width > 430 ? "0 10px 0 0" : "0 12px 0 0"}
                      error={errors.startDate}
                      minDate={new Date()}
                      onChange={field.onChange}
                      value={field.value} 
                      />
                  )}
                />
                <Controller
                  rules={{
                    required: true,
                  }}
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <CustomDatePicker
                      text={t("to")}
                      error={errors.endDate}
                      minDate={watch("startDate")}
                      onChange={field.onChange}
                      value={field.value} />
                  )}
                />
          </div>
         
              </WrapInputs>
              )}

              <WrapSelect>
                <Controller
                  name="gender"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <MultiSelect
                      isMulti={false}
                      error={!!errors.gender}
                      message={t("requiredField")}
                      field={field}
                      label={t("chose_gender")}
                      options={genders}
                      margin={{ laptop: "0 0 35px 0" }}
                    />
                  )}
                />
              </WrapSelect>
              <Controller
                name="ageLimit"
                control={control}
                render={({ field }) => (
                  <InputFormat
                    field={field}
                    type="tel"
                    defaultValue={""}
                    onlyNumber={true}
                    max="100"
                    message={
                      parseInt(watch("ageLimit")) > 100
                        ? "ageLimit: 100"
                        : t("requiredField")
                    }
                    IconStart={<PlusIcon style={{ marginLeft: "20px" }} />}
                    label={t("ageLimit")}
                  />
                )}
              />
            </LeftSide>
            <RightSide>
              <PushWrapper>
                <PushBlock>
                  <h6 style={{ width: "80%" }}>
                    {t("withPushNotification")}
                  </h6>
                  <CustomToggle
                    onChange={(e: any) => handleOpenBlock(e, "push")}
                  />
                </PushBlock>
                {optionalFields.push && (
                  <Controller
                    name="descriptionPush"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        margin={{ laptop: "35px 0" }}
                        label={t("text_push")}
                        type="textarea"
                        required={optionalFields.push ? true : false}
                        multiline={true}
                        maxLength={100}
                        inputStyle={{
                          height: {
                            desktop: 120,
                            planshet: 90,
                            laptop: 90,
                            mobile: 120,
                          },
                        }}
                      />
                    )}
                  />
                )}
              </PushWrapper>
              <PushWrapper>
                {optionalFields.push && (
                  <Controller
                    name="days"
                    control={control}
                    render={({ field }) => (
                      <MultiSelect
                        isClearable={false}
                        field={field}
                        isMulti={true}
                        options={days}
                        selectStyle={{
                          weight: 300,
                          fontSize: { desktop: 14 },
                        }}
                        label={t("point_out_days")}
                      />
                    )}
                  />
                )}
              </PushWrapper>
              <PushWrapper>
                <div style={{ marginBottom: "10px" }}>
                  {optionalFields.push && (
                    <Label>
                      <div>{t("point_out_time")}</div>
                    </Label>
                  )}
                </div>
                {optionalFields.push &&  (
                  <div style={{ display: "flex" }}>
                    <Controller
                      control={control}
                      name="timeFrom"
                      render={({ field }) => (
                        <Input
                          margin={{ laptop: "0 25px 0 0" }}
                          type="time"  
                          field={field}
                          disabled={checked ?true:false}
                       
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="timeTo"
                      render={({ field }) => (
                        <Input type="time"      disabled={checked ?true:false} field={field} />
                      )}
                    />
                  </div>
                )}
              </PushWrapper>

              {optionalFields.push && (
                <CheckBox
                  checked={checked}
                  name={"checked"}
                  label={t("24/7")}
                  onChange={(e: any) => setChecked(e.target.checked)}
                />
              )}
              {optionalFields.push && (
                <FormRow>
                  <Controller
                    control={control}
                    name="filialID"
                    render={({ field }) => {
                      return (
                        <MultiSelect
                          options={branches}
                          isMulti={true}
                          isBranchHeight={width < 600 ? true : false}
                          selectStyle={{
                            bgcolor: "#eff0fd",
                            border: "none",
                            placeholdercolor: "#223367",
                            inpadding: "2px 10px 2px 60px",
                            placewieght: "500",
                          }}
                          placeholder={t("chose_filial")}
                          margin={{
                            laptop: "20px 0 25px",

                          }}

                          field={field}
                          isClearable={false}
                          icon={<MarketIcon />}
                          iconleft={"20px"}
                          icondowncolor="#C4C4C4"
                        />
                      );
                    }}
                  />
                </FormRow>
              )}
              {width <= 600 && (
                <Buttons>
                  <div className="upside">
                    <Button
                      onClick={() => setCancel(true)}
                      endIcon={<MobileCancelIcon />}
                      buttonStyle={{
                        bgcolor: "rgba(96, 110, 234, 0.1)",
                        color: "#606EEA",
                      }}
                      margin={{ mobile: "0 8px 8px 0" }}
                    >
                      {t("cancel")}
                    </Button>
                  </div>
                  <Button
                    onClick={() => setValidation(true)}
                    type="submit"
                    endIcon={<SaveIconMobile />}
                    buttonStyle={{
                      bgcolor: "#606EEA",
                      color: "#fff",
                      shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)",
                    }}
                    margin={{ mobile: "0px 8px  8px  0" }}
                  >
                    {t("save")}
                  </Button>
                </Buttons>
              )}
            </RightSide>
          </Container>
        </UpSide>
        {width > 600 && width <= 1000 && (
          <DownSide>
            <Button
              onClick={() => setCancel(true)}
              endIcon={<MobileCancelIcon />}
              buttonStyle={{
                bgcolor: "rgba(96, 110, 234, 0.1)",
                color: "#606EEA",
              }}
            >
              {t("cancellation")}
            </Button>
            <Button
              onClick={() => setValidation(true)}
              type="submit"
              margin={{ laptop: "0 25px" }}
              endIcon={<SaveIconMobile />}
              buttonStyle={{
                bgcolor: "#606EEA",
                color: "#fff",
                shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)",
              }}
            >
              {t("save")}
            </Button>
          </DownSide>
        )}
        {width > 1000 && (
          <DownSide>
            <Button
              onClick={() => setCancel(true)}
              startIcon={<CancelIcon />}
              buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              margin={{ laptop: "0 25px" }}
              startIcon={<SaveIcon />}
              buttonStyle={{
                shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)",
              }}
            >
              {t("save")}
            </Button>
          </DownSide>
        )}
      </Form>
    </Wrapper>
  );
};

export default CreateNews;
