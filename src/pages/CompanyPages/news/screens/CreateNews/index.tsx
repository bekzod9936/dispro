import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import Input from "components/Custom/Input";
import MultiSelect from "components/Custom/MultiSelect";
import Title from "components/Custom/Title";
import CheckBox from "components/Custom/CheckBox";
import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import Modal from "components/Custom/Modal";
import Spinner from "components/Helpers/Spinner";
import ImageLazyLoad from "components/Custom/ImageLazyLoad/ImageLazyLoad";
import useStaff from "../../hooks/useStaff";
import { CloseIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import CropCustomModal from "components/Custom/CropImageModal/index";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import InputFormat from "components/Custom/InputFormat";
import Radio from "components/Custom/Radio";
import {fetchCreateNews} from "services/queries/newPageQuery";
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
import { days, genders,todayDate,nextDay } from "./constants";
import {
  PushBlock,
  PushWrapper,
  Container,
  DownSide,
  ErrorMessage,
  Form,
  Header,
  ImageBlock,
  LeaveModal,
  SubmitModal,
  LeftSide,
  PreviewMessage,
  RightSide,
  UploadButton,
  WrapCheck,
  WrapArea,
  TextAreaIcon,
  UpSide,
  Wrapper,
  WrapperModal,
  CloseButton,
  FormRow,
} from "./style";
import { useUploadImage } from "../../hooks/useUploadIMage";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { ReactComponent as MarketIcon } from "assets/icons/SideBar/ilmarket.svg";


interface IOptionFields {
  push: boolean;
}

console.log('nextDay',nextDay)

const CreateNews = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isCoupon, setIsCoupon] = React.useState<boolean>(false);
  const { filters } = useAppSelector((state) => state.clients);
  const [filter, setFilter] = React.useState<any>({});
  const { branches } = useStaff();
  const [optionalFields, setOptionalFields] = React.useState<IOptionFields>({
    push: false,
  });

  
 

  const [period, setPeriod] = React.useState<boolean>(false);
  const [file, setFile] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [isCropVisible, setIsCropVisible] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [leave, setLeave] = React.useState<boolean>(false);
  const [submit, setSubmit] = React.useState(false);
  const [sureSubmit,setSureSubmit]=React.useState(false);
  const [formData,setFormData]=React.useState({})
  const handleBack = () => {
    history.goBack();
  };
  const { handleUpload, deleteImage, setLoading, isLoading } =
    useUploadImage(setImage);



  const {mutate}=useMutation((data:any)=>fetchCreateNews(data))

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

  const submitNews = (data: any) => {
    let newsData={
      title:data.name,
      startLifeTime:filter?.regDate?.regDateFrom,
      endLifeTime:filter?.regDate?.regDateTo,
      description:data.description,
      ageFrom: parseInt(data.ageLimit),
      ageTo: 100,
      ageUnlimited:parseInt(data.ageLimit) ? false:true,
      couponIds:[],
      image:image,
      genderType:data.gender?.id,
      pushUp:optionalFields.push,
      settings:{
        weekDays:
        optionalFields.push && data?.days?.length
          ? data.days.map((el: any) => el.id)
          : [0, 1, 2, 3, 4, 5, 6],
        aroundTheClock:checked ? true:false,
      time: {
        from: optionalFields.push && data?.timeFrom ? data.timeFrom : "00:00",
        to: optionalFields.push && data?.timeTo ? data.timeTo : "23:59",
      },
        stores:optionalFields.push&&data?.filialID?.length ? data.filialID.map((el:any)=>el.value):[]
      },
      pushUpTitle: data.descriptionPush
      
    }

    setSubmit(true)
    setFormData(newsData)
  };
 
 const submitData=()=>{
   console.log(formData)
       mutate(formData);
    setTimeout(() => history.goBack(), 1000);
 }


  return (
    <Wrapper>
      <div style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
        <GoBackIcon
          onClick={handleBack}
          style={{ marginRight: "25px", cursor: "pointer" }}
        />
        <Title>Добавление новости</Title>
      </div>
      <Modal modalStyle={{ bgcolor: "#fff" }} open={submit}>
            <WrapperModal>
                <CloseButton  onClick={() => setSubmit(false)}>
                    <CloseIcon />
                </CloseButton>
                <h3>{filter?.regDate?.regDateFrom>todayDate ? t('Новость будет добавлена в раздел В ожидании ') :t('Новость будет опубликована сразу')}</h3>
                <p>{filter?.regDate?.regDateFrom>todayDate ? t(`Новость будет опубликована ${filter?.regDate?.regDateFrom} `) :t('Новость будет попадает сразу в разделе актуалные, и будет доступна вашим клиентам')}</p>
                <Button
            buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
            margin={{ laptop: "0 22px 0 0" }}
            onClick={() => setSubmit(false)}
            startIcon={<CancelIcon />}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            margin={{ laptop: "0 22px 0 0" }}
            onClick={submitData}
            startIcon={<SaveIcon />}
          >
            Сохранить
          </Button>
            </WrapperModal>
        </Modal>


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
                render={({ field }) => (
                  <Input
                    error={!!errors.name}
                    message={t("requiredField")}
                    field={field}
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
                  <Input
                    field={field}
                    margin={{ laptop: "35px 0" }}
                    label="Описание"
                    type="textarea"
                    message={t("requiredField")}
                    error={!!errors.description}
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
                    min={nextDay}
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
                    defaultValue={''}
                    max="100"
                   
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
                    {t('Использовать новость в формате Push-уведомления')}
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
                )}
              </PushWrapper>
              <PushWrapper>
                {optionalFields.push && (
                  <Controller
                    name="days"
                    control={control}
                    render={({ field }) => (
                      <MultiSelect
                        field={field}
                        isMulti={true}
                        options={days}
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
                  label={"Круглосуточна"}
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
            // onClick={() => setSubmit(true)}
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

export default CreateNews;
