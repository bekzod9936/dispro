import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import Input from "components/Custom/Input";
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

import CropCustomModal from "components/Custom/CropImageModal/index";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import InputFormat from "components/Custom/InputFormat";

import dayjs from "dayjs";
import { fetchUpdateNews } from "services/queries/newPageQuery";
import useAddress from "../../../info/screens/Address/useAddress";
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
  const { dataAddress,} = useAddress({
    id: companyId,
  });

  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  const newsById = selectedNews?.fullData;
  const startDate = dayjs(newsById?.data?.startLifeTime).format("YYYY-MM-DD");
  const endDate = dayjs(newsById?.data?.endLifeTime).format("YYYY-MM-DD");
  const [filter, setFilter] = React.useState<any>({});
  const { branches } = useStaff();
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
  const [leave, setLeave] = React.useState<boolean>(false);
  const handleBack = () => {
    history.goBack();
  };
  const { handleUpload, deleteImage, setLoading, isLoading } =
    useUploadImage(setImage);

  const { mutate } = useMutation((data:any)=>fetchUpdateNews(data));
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
    setFile(data.target.files[0]);
    setIsCropVisible(true);
  };
  console.log("file", file);

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
  
  const newsId=newsById?.data?.id
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
      startLifeTime: filter?.regDate?.regDateFrom ? filter?.regDate?.regDateFrom:startDate,
      endLifeTime: filter?.regDate?.regDateTo ? filter?.regDate?.regDateTo:endDate,
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
          optionalFields.push && data?.days?.length>0
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
 
   
    let newsInfo={newsBody,newsId}

    mutate(newsInfo);
    setTimeout(() => history.push('/news/waiting'), 1000);
  };
  console.log("filters datse", filter);

  const genderType = [
    {
      label:
        newsById?.data?.genderType === 1
          ? "Для мужчин"
          : newsById?.data?.genderType === 2
          ? "Для женщин"
          :newsById?.data?.genderType === 0 ?"Для всех":'',
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
          id:el==0 ? 0:el==1 ? 1:el==2? 2:el==3?3 :el==4 ? 4:el==5 ? 5 :el==6? 6:[]
    };
  });
  const mergedBranches=filteredArray?.map((item:any)=>{
    return {
        value:item.id,
        label:item.name
    }
  })

  React.useEffect(() => {
    setValue("filialID", mergedBranches);
  }, [mergedBranches]);


  return (
    <Wrapper>
      <div style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
        <GoBackIcon
          onClick={handleBack}
          style={{ marginRight: "25px", cursor: "pointer" }}
        />
        <Title>Добавление новости</Title>
      </div>

      <Form onSubmit={handleSubmit(submitNews)}>
        <UpSide>
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
                defaultValue={newsById?.data?.title}
                render={({ field }) => (
                  <Input
                    error={!!errors.name}
                    message={t("requiredField")}
                    field={field}
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
                  <Input
                    field={field}
                    margin={{ laptop: "35px 0" }}
                    label="Описание"
                    type="textarea"
                    message={t("requiredField")}
                    error={!!errors.description}
                    defaultValue={newsById?.data?.description}
                    multiline={true}
                    inputStyle={{
                      height: { desktop: 120, laptop: 90, mobile: 60 },
                    }}
                    IconEnd={
                      <WrapArea>
                        <TextAreaIcon />
                      </WrapArea>
                    }
                  />
                )}
              />
              <WrapInputs>
                <Label>{t("chose_date")}</Label>
                <div>
                  <Input
                    type="date"
                    width={{
                      maxwidth: 200,
                    }}
                    min={todayDate}
                    required={true}
                    IconStart={<WrapDate>{t("from")}</WrapDate>}
                    inputStyle={{
                      inpadding: "0 10px 0 0",
                    }}
                    defaultValue={startDate}
                    value={filter?.regDate?.regDateFrom}
                    onChange={(e) =>
                      setFilter((prev: any) => ({
                        ...prev,
                        regDate: {
                          ...prev["regDate"],
                          regDateFrom: e.target.value,
                        },
                      }))
                    }
                  />
                  <Input
                    type="date"
                    defaultValue={endDate}
                    min={filter?.regDate?.regDateFrom}
                    width={{
                      maxwidth: 200,
                    }}
                    required={true}
                    margin={{ laptop: "0 0 0 15px" }}
                    IconStart={<WrapDate>{t("to")}</WrapDate>}
                    inputStyle={{
                      inpadding: "0 10px 0 0",
                    }}
                    value={filter?.regDate?.regDateTo}
                    onChange={(e) =>
                      setFilter((prev: any) => ({
                        ...prev,
                        regDate: {
                          ...prev["regDate"],
                          regDateTo: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </WrapInputs>
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
                    message={
                      parseInt(watch('ageLimit'))
                       
                    }
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
                        defaultValue={newsById?.data?.pushUpTitle}
                        inputStyle={{
                          height: { desktop: 120, laptop: 90, mobile: 60 },
                        }}
                        IconEnd={
                          <WrapArea>
                            <TextAreaIcon />
                          </WrapArea>
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
                  label={"Круглосуточна"}
                  onChange={(e: any) => setChecked(e)}
                />
              )}

              {optionalFields.push && (
                <FormRow>
                  <Controller
                    control={control}
                    name="filialID"
                    defaultValue={mergedBranches? mergedBranches:''}
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
        <DownSide>
          <Button
            onClick={() => setLeave(true)}
            startIcon={<CancelIcon />}
            buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
          >
            Отменить
          </Button>
          <Button
            type="submit"
            margin={{ laptop: "0 25px" }}
            startIcon={<SaveIcon />}
          >
            Сохранить
          </Button>
        </DownSide>
      </Form>
    </Wrapper>
  );
};

export default EditNews;
