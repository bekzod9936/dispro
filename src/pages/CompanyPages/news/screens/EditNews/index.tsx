import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import Input from "components/Custom/Input";
import { TextArea } from "components/Custom/TextArea";
import MultiSelect from "components/Custom/MultiSelect";
import Title from "components/Custom/Title";
import CheckBox from "components/Custom/CheckBox";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import Spinner from "components/Helpers/Spinner";
import ImageLazyLoad from "components/Custom/ImageLazyLoad/ImageLazyLoad";
import useStaff from "../../hooks/useStaff";
import Modal from "components/Custom/Modal";
import CropCustomModal from "components/Custom/CropImageModal/index";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import InputFormat from "components/Custom/InputFormat";
import useWindowWidth from "services/hooks/useWindowWidth";
import dayjs from "dayjs";
import { fetchUpdateNews } from "services/queries/newPageQuery";
import { UploadModal } from "../CreateNews/components/UploadModal";
import useAddress from "../../../info/screens/Address/useAddress";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import { MobileCancelIcon } from "assets/icons/proposals/ProposalsIcons";
import {
  Label,
  WrapDate,
  WrapInputs,
  WrapSelect,
} from "../../components/Header/style";
import {
  DangerIcon,
  DeleteIcon,
  GoBackIcon,
  PhoneIcon,
  PlusIcon,
  UploadImage,
} from "assets/icons/proposals/ProposalsIcons";
import { UpSide } from "../CreateNews/style";
import { SaveIcon, SaveIconMobile } from "assets/icons/news/newsIcons";
import { days, genders, todayDate } from "../CreateNews/constants";
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
  Wrapper,
  MobileHeader,
  FormRow,
  Buttons,
} from "./style";
import { useUploadImage } from "../../hooks/useUploadIMage";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { ReactComponent as MarketIcon } from "assets/icons/SideBar/ilmarket.svg";

interface IOptionFields {
  push: boolean;
}

const EditNews = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const companyId: any = localStorage.getItem("companyId");
  // const { dataAddress,} = useAddress({
  //   id: companyId,
  // });
  const { dataAddress } = useAddress({
    id: companyId,
  });

  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  const newsById = selectedNews?.fullData;
  const startDate = dayjs(newsById?.data?.startLifeTime).format("YYYY-MM-DD");
  const endDate = dayjs(newsById?.data?.endLifeTime).format("YYYY-MM-DD");
  const [filter, setFilter] = React.useState<any>({
    regDate: {
      regDateFrom: startDate,
      regDateTo: endDate,
    },
  });
  const [validation, setValidation] = React.useState<any>(false);
  const { branches } = useStaff();

  const { width } = useWindowWidth();
  console.log("filter", filter);
  const [optionalFields, setOptionalFields] = React.useState<IOptionFields>({
    push: newsById?.data?.pushUp,
  });

  const [file, setFile] = React.useState("");
  const [checked, setChecked] = React.useState(
    newsById?.data?.settings?.aroundTheClock
  );
  const [isCropVisible, setIsCropVisible] = React.useState(false);
  const [image, setImage] = React.useState(newsById?.data?.image);
  const [errorFileType, setErrorFileType] = React.useState<any>(false);
  const [leave, setLeave] = React.useState<boolean>(false);
  const handleBack = () => {
    history.goBack();
  };
  const { handleUpload, deleteImage, setLoading, isLoading } =
    useUploadImage(setImage);

  const { mutate } = useMutation((data: any) => fetchUpdateNews(data));
  console.log("newsById", newsById?.data);
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
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

  const newsId = newsById?.data?.id;
  const allFilials = dataAddress;
  const filials = newsById?.data?.settings?.stores;
  console.log("newsId id", newsId);
  let filteredArray = allFilials?.filter(function (array_el: any) {
    return (
      filials?.filter(function (item: any) {
        return item == array_el.id;
      }).length == 1
    );
  });


  const submitNews = (data: any) => {

    let newsBody = {
      title: data.name,
      startLifeTime:
        width > 1000 ? data.startDate : filter?.regDate?.regDateFrom,
      endLifeTime: width > 1000 ? data.endDate : filter?.regDate?.regDateTo,
      description: data.description,
      ageFrom: parseInt(data.ageLimit),
      ageTo: 100,
      ageUnlimited: false,
      couponIds: [],
      image: image,
      genderType: data?.gender?.id===0 ||data?.gender?.id===1 ||data?.gender?.id===2 ? data?.gender?.id: newsById?.data?.genderType,
      pushUp: optionalFields.push,
      settings: {
        weekDays:
          optionalFields.push && data?.days?.length > 0
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
      pushUpTitle: data.descriptionPush,
    };

    let newsInfo = { newsBody, newsId };
    if (width > 1000) {
      mutate(newsInfo);
      setTimeout(() => history.push("/news/active"), 1000);
    }
    if (width <= 1000) {
      if (
        validation &&
        filter?.regDate?.regDateFrom &&
        filter?.regDate?.regDateTo
      ) {
        mutate(newsInfo);
        setTimeout(() => history.push("/news/active"), 1000);
      }
    }
  };
  

  const genderType = [
    {
      label:
        newsById?.data?.genderType === 1
          ? "Для мужчин"
          : newsById?.data?.genderType === 2
          ? "Для женщин"
          : newsById?.data?.genderType === 0
          ? "Для всех"
          : "",
        id:   newsById?.data?.genderType === 1
        ? 1
        : newsById?.data?.genderType === 2
        ? 2
        : newsById?.data?.genderType === 0
        ? 0
        : 0,
    },
  ];
  console.log('genderType',genderType)
  

  const weekDays = newsById?.data?.settings?.weekDays?.map((el: any) => {
    return {
      label:
        el == 0
          ? "Воскресенье"
          : el == 1
          ? "Понедельник"
          : el == 2
          ? "Вторник"
          : el == 3
          ? "Среда"
          : el == 4
          ? "Четверг"
          : el == 5
          ? "Пятница"
          : "Суббота",
      id:
        el == 0
          ? 0
          : el == 1
          ? 1
          : el == 2
          ? 2
          : el == 3
          ? 3
          : el == 4
          ? 4
          : el == 5
          ? 5
          : el == 6
          ? 6
          : [],
    };
  });
  const mergedBranches = filteredArray?.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  React.useEffect(() => {
    setValue("filialID", mergedBranches);
  }, [mergedBranches, newsById?.data?.pushUp]);

  React.useEffect(() => {
    if (newsId === undefined) {
      handleBack();
    }
  }, []);
  
  React.useEffect(() => {
    if (checked) {
      setValue("timeFrom",  "00:00");
      setValue("timeTo",  "23:59");
    }
 
}, [checked]);

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
          <Title>{t("editingNews")}</Title>
        </div>
      )}

      <UploadModal
        errorFileType={errorFileType}
        handleUploadImg={handleUploadImg}
        cancelFormat={cancelFormat}
      />

      <Form onSubmit={handleSubmit(submitNews)}>
        <UpSide>
          {width <= 1000 && (
            <MobileHeader>
              <GoBackIcon onClick={handleBack} style={{ cursor: "pointer" }} />
              <Title>{t("editingNews")}</Title>
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
                        "logo_text"
                      )}
                    </p>
                  </Header>
                  <UploadButton>
                    <label htmlFor="uploadImg">{t("uploadPhoto")}</label>
                    <input
                      {...register("image", { required: true })}
                      onChange={handleUploadImg}
                      value={image}
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
                  <div style={{ filter: "brightness(50%)" }}>
                    <ImageLazyLoad objectFit="contain" src={image} alt="logo" />
                  </div>
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
                defaultValue={newsById?.data?.title}
                render={({ field }) => (
                  <Input
                    type="textarea"
                    error={!!errors.name}
                    message={t("requiredField")}
                    field={field}
                    maxLength={80}
                    label={t("title")}
                    defaultValue={newsById?.data?.title}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue={newsById?.data?.description}
                render={({ field }) => (
                  <TextArea
                    maxLength={800}
                    {...field}
                    defaultValue={newsById?.data?.description}
                    message={t("requiredField")}
                    error={!!errors.description}
                    minHeight={"150px"}
                    fontSize={width > 1000 ? "18px" : "14px"}
                    maxHeight={"300px"}
                    resize={"vertical"}
                    title={t("description")}
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
                      defaultValue={startDate}
                      render={({ field }) => (
                        <Input
                          field={field}
                          type="date"
                          width={{ maxwidth: 600, minwidth: 10 }}
                          min={todayDate}
                          defaultValue={startDate}
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
                      defaultValue={endDate}
                      render={({ field }) => (
                        <Input
                          type="date"
                          field={field}
                          error={!!errors.endDate}
                          defaultValue={endDate}
                          min={watch("startDate")}
                          width={{ maxwidth: 600, minwidth: 10 }}
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
                  defaultValue={genderType}
                  render={({ field }) => (
                    <MultiSelect
                      isMulti={false}
                      error={!!errors.gender}
                      message={t("requiredField")}
                      field={field}
                      label={t("chose_gender")}
                      defaultValue={genderType}
                      options={genders}
                      margin={{ laptop: "0 0 35px 0" }}
                    />
                  )}
                />
              </WrapSelect>
              <Controller
                name="ageLimit"
                control={control}
                defaultValue={newsById?.data?.ageFrom}
                render={({ field }) => (
                  <InputFormat
                    field={field}
                    defaultValue={newsById?.data?.ageFrom}
                    max="100"
                    type="tel"
                    onlyNumber={true}
                    message={parseInt(watch("ageLimit"))}
                    error={!!errors.ageLimit}
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
                    defaultChecked={newsById?.data?.pushUp}
                    onChange={(e: any) => handleOpenBlock(e, "push")}
                  />
                </PushBlock>
                {optionalFields.push && (
                    <Controller
                    name="descriptionPush"
                    control={control}
                    defaultValue={newsById?.data?.pushUpTitle}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextArea
                        maxLength={100}
                        {...field}
                        defaultValue={newsById?.data?.pushUpTitle}
                        fontSize={width > 1000 ? "15px" : "14px"}
                        required={optionalFields.push ? true : false}
                        minHeight={"100px"}
                        maxHeight={"150px"}
                        resize={"vertical"}
                        title={t("text_push")}
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
                    defaultValue={weekDays}
                    render={({ field }) => (
                      <MultiSelect
                        field={field}
                        isClearable={false}
                        isMulti={true}
                        options={days}
                        label={t("point_out_days")}
                        defaultValue={weekDays}
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
                {optionalFields.push && (
                  <div style={{ display: "flex" }}>
                    <Controller
                      control={control}
                      name="timeFrom"
                      defaultValue={newsById?.data?.settings?.time?.from}
                      render={({ field }) => (
                        <Input
                          margin={{ laptop: "0 25px 0 0" }}
                          type="time"
                          disabled={checked ?true:false}
                          defaultValue={newsById?.data?.settings?.time?.from}
                          field={field}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="timeTo"
                      defaultValue={newsById?.data?.settings?.time?.to}
                      render={({ field }) => (
                        <Input
                          type="time"
                          field={field}
                          disabled={checked ?true:false}
                          defaultValue={newsById?.data?.settings?.time?.to}
                        />
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
                    defaultValue={mergedBranches ? mergedBranches : ""}
                    render={({ field }) => {
                      return (
                        <MultiSelect
                          options={branches}
                          isMulti={true}
                          isBranchHeight={width<600 ? true:false}
                          selectStyle={{
                            bgcolor: "#eff0fd",
                            border: "none",
                            placeholdercolor: "#223367",
                            inpadding: "2px 10px 2px 60px",
                            placewieght: "500",
                          }}
                          placeholder={t("choose_branch")}
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
            </RightSide>
          </Container>
        </UpSide>
        {width > 600 && width <= 1000 && (
          <DownSide>
            <Button
              onClick={handleBack}
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
              onClick={handleBack}
              startIcon={<CancelIcon />}
              buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              margin={{ laptop: "0 25px" }}
              startIcon={<SaveIcon />}
              buttonStyle={{ shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)" }}
            >
              {t("save")}
            </Button>
          </DownSide>
        )}

        {width <= 600 && (
          <Buttons>
            <div className="upside">
              <Button
                onClick={handleBack}
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
      </Form>
    </Wrapper>
  );
};

export default EditNews;
