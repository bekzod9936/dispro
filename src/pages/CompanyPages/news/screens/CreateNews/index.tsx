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
  const [filter, setFilter] = React.useState<any>({});
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

  const submitNews = (data: any) => {
    let newsData = {
      title: data.name,
      startLifeTime:
        width > 600 ? data.startDate : filter?.regDate?.regDateFrom,
      endLifeTime: width > 600 ? data.endDate : filter?.regDate?.regDateTo,
      description: data.description,
      ageFrom: parseInt(data.ageLimit),
      ageTo: 100,
      ageUnlimited: parseInt(data.ageLimit) ? false : true,
      couponIds: [],
      image: image,
      genderType: data.gender?.id,
      pushUp: optionalFields.push && data.descriptionPush,
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
    setStartDate(width > 600 ? data.startDate : filter?.regDate?.regDateFrom);
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
          <Title>{t("Добавление новости")}</Title>
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
              <Title> {t("Добавление новости")}</Title>
            </MobileHeader>
          )}
          <Container>
            <LeftSide>
              <Title>Фотографии</Title>
              {!isLoading && !image && (
                <div style={{ marginBottom: 30 }}>
                  <Header>
                    <p>
                      {t(
                        " Можно загрузить фотографию JPG или PNG, минимальное разрешение 400*400рх, размер не более 3Мбайт."
                      )}
                    </p>
                  </Header>
                  <UploadButton>
                    <label htmlFor="uploadImg">Загрузить фото</label>
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
                    label="Название"
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
                    fontSize={width > 1000 ? "18px" : "14px"}
                    message={t("requiredField")}
                    error={!!errors.description}
                    minHeight={"150px"}
                    maxHeight={"300px"}
                    resize={"vertical"}
                    title={"Описание"}
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
              ) : width > 600 && width <= 1000 ? (
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
                          width={{ maxwidth: 400, minwidth: 100 }}
                          error={!!errors.startDate}
                          IconStart={<WrapDate>{t("from")}</WrapDate>}
                          inputStyle={{
                            inpadding: "0 2px 0 0",
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
                          width={{ maxwidth: 400, minwidth: 100 }}
                          error={!!errors.endDate}
                          min={watch("startDate")}
                          margin={{ laptop: "0 0 0 15px" }}
                          IconStart={<WrapDate>{t("to")}</WrapDate>}
                          inputStyle={{
                            inpadding: "0 2px 0 0",
                          }}
                        />
                      )}
                    />
                  </div>
                </WrapInputs>
              ) : (
                <WrapInputs>
                  <Label>{t("chose_date")}</Label>
                  <div>
                    <CustomDatePicker
                      margin="0 15px 0 0"
                      isFilter
                      text={t("from")}
                      error={
                        validation && !filter?.regDate?.regDateFrom
                          ? true
                          : false
                      }
                      minDate={todayDate}
                      maxDate={filter?.regDate?.regDateTo}
                      onChange={(e) => {
                        let date =
                          "" + e.year + "-" + e.month.number + "-" + e.day;
                        setFilter((prev: any) => ({
                          ...prev,
                          regDate: {
                            ...prev["regDate"],
                            regDateFrom: date,
                          },
                        }));
                      }}
                      value={filter?.regDate?.regDateFrom}
                    />
                    <CustomDatePicker
                      isFilter
                      error={
                        validation && !filter?.regDate?.regDateTo ? true : false
                      }
                      text={t("to")}
                      minDate={filter?.regDate?.regDateFrom}
                      onChange={(e) => {
                        let date =
                          "" + e.year + "-" + e.month.number + "-" + e.day;
                        setFilter((prev: any) => ({
                          ...prev,
                          regDate: {
                            ...prev["regDate"],
                            regDateTo: date,
                          },
                        }));
                      }}
                      value={filter?.regDate?.regDateTo}
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
                      label="Выберите пол"
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
                    defaultValue={""}
                    max="100"
                    message={
                      parseInt(watch("ageLimit")) > 100
                        ? "ageLimit: 100"
                        : t("requiredField")
                    }
                    IconStart={<PlusIcon style={{ marginLeft: "20px" }} />}
                    label="Возрастное ограничение"
                  />
                )}
              />
            </LeftSide>
            <RightSide>
              <PushWrapper>
                <PushBlock>
                  <h6 style={{ width: "80%" }}>
                    {t("Использовать новость в формате Push-уведомления")}
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
                        label="Текст Push-уведомления"
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
                        // IconEnd={width>600 ?
                        //   <WrapArea>
                        //     <TextAreaIcon />
                        //   </WrapArea>:''
                        // }
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
                        label="Укажите дни"
                      />
                    )}
                  />
                )}
               
              </PushWrapper>
              <PushWrapper>
                <div style={{ marginBottom: "10px" }}>
                  {optionalFields.push && (
                    <Label>
                      <div>{t("Укажите временной промежуток")}</div>
                    </Label>
                  )}
                </div>
                {optionalFields.push && (
                  <div style={{ display: "flex" }}>
                    <Controller
                      control={control}
                      name="timeFrom"
                      render={({ field }) => (
                        <Input
                          margin={{ laptop: "0 25px 0 0" }}
                          type="time"
                          field={field}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="timeTo"
                      render={({ field }) => (
                        <Input type="time" field={field} />
                      )}
                    />
                  </div>
                )}
              </PushWrapper>

              {optionalFields.push && (
                <CheckBox
                  checked={checked}
                  name={"checked"}
                  label={"Круглосуточно"}
                  onChange={(e: any) => setChecked(e)}
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
                          selectStyle={{
                            bgcolor: "#eff0fd",
                            border: "none",
                            placeholdercolor: "#223367",
                            inpadding: "2px 10px 2px 60px",
                            placewieght: "500",
                          }}
                         
                          placeholder={t("Выберите филиалы")}
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
                    {t("Сохранить")}
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
              {t("Отмена")}
            </Button>
            <Button
              type="submit"
              margin={{ laptop: "0 25px" }}
              endIcon={<SaveIconMobile />}
              buttonStyle={{
                bgcolor: "#606EEA",
                color: "#fff",
                shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)",
              }}
            >
              {t("Сохранить")}
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
              {t("Отменить")}
            </Button>
            <Button
              type="submit"
              margin={{ laptop: "0 25px" }}
              startIcon={<SaveIcon />}
              buttonStyle={{
                shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)",
              }}
            >
              {t("Сохранить")}
            </Button>
          </DownSide>
        )}
      </Form>
    </Wrapper>
  );
};

export default CreateNews;
