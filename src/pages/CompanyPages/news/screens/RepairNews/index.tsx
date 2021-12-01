import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import Input from "components/Custom/Input";
import MultiSelect from "components/Custom/MultiSelect";
import Title from "components/Custom/Title";
import { TextArea } from "components/Custom/TextArea";
import CheckBox from "components/Custom/CheckBox";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import Spinner from "components/Helpers/Spinner";
import ImageLazyLoad from "components/Custom/ImageLazyLoad/ImageLazyLoad";
import useStaff from "../../hooks/useStaff";
import { WatchIcons,WatchIconsWhite,PublishIcon,WhitePublishIcon,RepairNewsIcon } from "assets/icons/news/newsIcons";
import CropCustomModal from "components/Custom/CropImageModal/index";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import InputFormat from "components/Custom/InputFormat";
import useWindowWidth from "services/hooks/useWindowWidth";
import { MobileCancelIcon } from "assets/icons/proposals/ProposalsIcons";
import dayjs from "dayjs";
import { fetchCreateNews } from "services/queries/newPageQuery";
import useAddress from "../../../info/screens/Address/useAddress";
import {
  Label,
  WrapDate,
  WrapInputsMobile,
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
import { SaveIcon } from "assets/icons/news/newsIcons";
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
  WrapArea,
  TextAreaIcon,
  UpSide,
  Wrapper,
  FormRow,
  Buttons,
  Message,
} from "./style";
import { useUploadImage } from "../../hooks/useUploadIMage";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { ReactComponent as MarketIcon } from "assets/icons/SideBar/ilmarket.svg";
import { UploadModal } from "../CreateNews/components/UploadModal";
interface IOptionFields {
  push: boolean;
}

const RepairNews = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const companyId: any = localStorage.getItem("companyId");
  const { dataAddress } = useAddress({
    id: companyId,
  });

  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  const newsById = selectedNews?.fullData;
  const [filter, setFilter] = React.useState<any>({})
  const [validation,setValidation]=React.useState<any>(false);
  const { branches } = useStaff();
 
  const [optionalFields, setOptionalFields] = React.useState<IOptionFields>({
    push: newsById?.data?.pushUp,
  });

  const [file, setFile] = React.useState("");
  const [checked, setChecked] = React.useState(
    newsById?.data?.settings?.aroundTheClock
  );
  const [isCropVisible, setIsCropVisible] = React.useState(false);
  const [image, setImage] = React.useState(newsById?.data?.image);
  const [errorFileType,setErrorFileType]=React.useState<any>(false);
  const { width } = useWindowWidth();
  const handleBack = () => {
    history.goBack();
  };
  const { handleUpload, deleteImage, setLoading, isLoading } =
    useUploadImage(setImage);

  const { mutate } = useMutation((data: any) => fetchCreateNews(data));
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

    if (data.target.files[0].type =="image/jpeg") {
      setFile(data.target.files[0]);
      setIsCropVisible(true);
      setErrorFileType(false)
   }
   else if (data.target.files[0].type =="image/png"){
    setFile(data.target.files[0]);
    setIsCropVisible(true);
    setErrorFileType(false)
   }
   else {
    setErrorFileType(true)
    setIsCropVisible(false);
   }
     
  };

  const cancelFormat=()=>{
    setErrorFileType(false)
  }

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
      startLifeTime:width>600 ? data.startDate :filter?.regDate?.regDateFrom,
      endLifeTime: width>600 ? data.endDate:filter?.regDate?.regDateTo,
      description: data.description,
      ageFrom: parseInt(data.ageLimit),
      ageTo: 100,
      ageUnlimited: false,
      couponIds: [],
      image: image,
      genderType: data.gender?.id,
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

    if(width>600){
      mutate(newsBody);
      setTimeout(() => history.push('/news/active'), 1000); 
    }
    if(width<=600){
      if(validation  && filter?.regDate?.regDateFrom && filter?.regDate?.regDateTo){
        mutate(newsBody);
        setTimeout(() => history.push('/news/active'), 1000);
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
    },
  ];

  const weekDays = newsById?.data?.settings?.weekDays.map((el: any) => {
    return {
      label:
        el == 0
          ? "Воскресенье"
          : el == 1
          ? "Вторник"
          : el == 2
          ? "tuesday"
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
  }, [mergedBranches]);
  React.useEffect(()=>{
    if(newsId ===undefined){
     handleBack();
    }
     },[])

  return (
    <Wrapper>
      {width > 600 && (
        <div
          style={{ display: "flex", marginBottom: 30, alignItems: "center" }}
        >
          <GoBackIcon
            onClick={handleBack}
            style={{ marginRight: "25px", cursor: "pointer" }}
          />
          <Title>Восстановить новости</Title>
        </div>
      )}

      
  <UploadModal
        errorFileType={errorFileType}
        handleUploadImg={handleUploadImg}
        cancelFormat={cancelFormat}
      />
      <Form onSubmit={handleSubmit(submitNews)}>
        <UpSide>
          {width <= 600 && (
            <div
              style={{
                display: "flex",
                marginBottom: 30,
                alignItems: "center",
              }}
            >
              <GoBackIcon
                onClick={handleBack}
                style={{ marginRight: "25px", cursor: "pointer" }}
              />
              <Title>Восстановить новости</Title>
            </div>
          )}
          <Container>
            <LeftSide>
              <Title>Фотографии</Title>
              {!isLoading && !image &&(
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
                          <div style={{filter: 'brightness(50%)'}}>
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
                    error={!!errors.name}
                    message={t("requiredField")}
                    field={field}
                    maxLength={80}
                    label="Название"
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
                    minHeight={'150px'}
                    maxHeight={'300px'}
                    resize={'vertical'}
                    title={"Описание"}
                  />
                )}
              />
              {width > 600 ? (
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
                <WrapInputsMobile>
                <Label>{t("chose_date")}</Label>
                <div >
                <CustomDatePicker
            margin="0 15px 0 0"
            isFilter
            text={t("from")}
            error={validation && !filter?.regDate?.regDateFrom ? true:false}
            minDate={todayDate}
            maxDate={filter?.regDate?.regDateTo}
            onChange={(e) => {
              let date = "" + e.year + "-" + e.month.number + "-" + e.day;
              setFilter((prev: any) => ({
                ...prev, regDate: {
                  ...prev["regDate"],
                  regDateFrom: date
                }
              }))
            }}
            value={filter?.regDate?.regDateFrom} />

          <CustomDatePicker
            isFilter
            error={validation && !filter?.regDate?.regDateTo ? true:false}
            text={t("to")}
            minDate={filter?.regDate?.regDateFrom}
            
            onChange={(e) => {
              let date = "" + e.year + "-" + e.month.number + "-" + e.day;
              setFilter((prev: any) => ({
                ...prev, regDate: {
                  ...prev["regDate"],
                  regDateTo: date
                }
              }))
            }}
            value={filter?.regDate?.regDateTo} />
            </div>
{validation && !filter?.regDate?.regDateTo && !filter?.regDate?.regDateFrom &&<Message>{t('Укажите период публикации новости')}</Message>}
            
              </WrapInputsMobile>

              )}
              <br/>
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
                      label="Выберите пол"
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
                // rules={{
                //   required: true,
                // }}
                defaultValue={newsById?.data?.ageFrom}
                render={({ field }) => (
                  <InputFormat
                    field={field}
                    defaultValue={newsById?.data?.ageFrom}
                    max="100"
                    message={parseInt(watch("ageLimit"))}
                    error={!!errors.ageLimit}
                    // message={t("requiredField")}
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
                    defaultChecked={newsById?.data?.pushUp}
                    onChange={(e: any) => handleOpenBlock(e, "push")}
                  />
                </PushBlock>
                {optionalFields.push && (
                  <Controller
                    name="descriptionPush"
                    control={control}
                    defaultValue={newsById?.data?.pushUpTitle}
                    render={({ field }) => (
                      <Input
                        field={field}
                        margin={{ laptop: "35px 0" }}
                        label="Текст Push-уведомления"
                        type="textarea"
                        multiline={true}
                        
                        maxLength={100}
                        defaultValue={newsById?.data?.pushUpTitle}
                        inputStyle={{
                          height: { desktop: 120, laptop: 90, mobile: 120 },
                        }}
                        IconEnd={
                          width > 600 && (
                            <WrapArea>
                              <TextAreaIcon />
                            </WrapArea>
                          )
                        }
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
                        label="Укажите дни"
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
                      <div>{t("Укажите временной промежуток")}</div>
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
                  label={"Круглосуточно"}
                  onChange={(e: any) => setChecked(e)}
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
        {width>600 &&  <DownSide>
          <Button
            onClick={handleBack}
            startIcon={<CancelIcon />}
            buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
          >
            Отменить
          </Button>
          <Button
            type="submit"
            margin={{ laptop: "0 25px",mobile:"0 10px"}}
            endIcon={<RepairNewsIcon />}
                    buttonStyle={{ shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)'}}
          >
            Восстановить
          </Button>
        </DownSide>}
       
        {width <=600 && 
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
                    endIcon={<SaveIcon />}
                    buttonStyle={{
                      bgcolor: "#606EEA",
                      color: "#fff",
                      shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)",
                    }}
                    margin={{ mobile: "0px 8px  8px  0" }}
                  >
                    {"Сохранить"}
                  </Button>
                </Buttons>}
        
      </Form>
    </Wrapper>
  );
};

export default RepairNews;
