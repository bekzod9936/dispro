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
import { MobileCancelIcon } from "assets/icons/proposals/ProposalsIcons";
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
import { SaveIcon } from "assets/icons/news/newsIcons";
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

interface IOptionFields {
  push: boolean;
}

const CreateNews = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [filter, setFilter] = React.useState<any>({});
  const { width } = useWindowWidth();
  const { branches } = useStaff();
  const [optionalFields, setOptionalFields] = React.useState<IOptionFields>({
    push: false,
  });

  const [file, setFile] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [isCropVisible, setIsCropVisible] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [cancel, setCancel] = React.useState(false);
  const handleBack = () => {
    history.goBack();
  };
  const { handleUpload, deleteImage, setLoading, isLoading } =
    useUploadImage(setImage);

  const { mutate } = useMutation((data: any) => fetchCreateNews(data));

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
  const cancelNews = () => {
    setCancel(false);
    history.goBack();
  };

  const submitNews = (data: any) => {
    let newsData = {
      title: data.name,
      startLifeTime: filter?.regDate?.regDateFrom,
      endLifeTime: filter?.regDate?.regDateTo,
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
      pushUpTitle: data.descriptionPush,
    };

    setSubmit(true);
    setFormData(newsData);
  };

  const submitData = () => {
    console.log(formData);
    mutate(formData);
    setTimeout(() => history.goBack(), 1000);
  };
  // console.log(watch("ageLimit"));

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
          <Title>Добавление новости</Title>
        </div>
      )}

      <Modal modalStyle={{ bgcolor: "#fff" }} open={submit}>
        <WrapperModal>
          {width > 600 &&   <CloseButton onClick={() => setSubmit(false)}>
            <CloseIcon />
          </CloseButton>}
        
          <h3>
            {filter?.regDate?.regDateFrom > todayDate
              ? t("Новость будет добавлена в раздел В ожидании ")
              : t("Новость будет опубликована сразу")}
          </h3>
          <p>
            {filter?.regDate?.regDateFrom > todayDate
              ? t(`Новость будет опубликована ${dayjs(filter?.regDate?.regDateFrom).format("DD.MM.YYYY")} `)
              : t(
                  "Новость будет попадает сразу в разделе актуалные, и будет доступна вашим клиентам"
                )}
          </p>
          {width > 600 ? (
            <>
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
            </>
          ) : (
            <Buttons>
              <div className="upside">
                <Button
                  onClick={() => setSubmit(false)}
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
                onClick={submitData}
                type="submit"
                endIcon={<SaveIcon />}
                buttonStyle={{
                  bgcolor: "#606EEA",
                  color: "#fff",
                }}
                margin={{ mobile: "0px 8px  8px  0" }}
              >
                {"Сохранить"}
              </Button>
            </Buttons>
          )}
        </WrapperModal>
      </Modal>

      <Modal modalStyle={{ bgcolor: "#fff" }} open={cancel}>
        <WrapperModal>
          <p style={{ color: "black" }}>
            {t("Вы действительно хотите отменить создание новости")}
          </p>
          {width > 600 ? (
            <>
              <Button
                buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
                margin={{ laptop: "0 22px 0 0" }}
                onClick={() => setCancel(false)}
              >
                Нет
              </Button>
              <Button
                type="submit"
                margin={{ laptop: "0 22px 0 0" }}
                onClick={cancelNews}
              >
                Да
              </Button>
            </>
          ) : (
            <Buttons>
              <div className="upside">
                <Button
                  onClick={() => setCancel(false)}
                  endIcon={<MobileCancelIcon />}
                  buttonStyle={{
                    bgcolor: "rgba(96, 110, 234, 0.1)",
                    color: "#606EEA",
                  }}
                  margin={{ mobile: "0 8px 8px 0" }}
                >
                  {" Нет"}
                </Button>
              </div>
              <Button
                onClick={cancelNews}
                type="submit"
                endIcon={<SaveIcon />}
                buttonStyle={{
                  bgcolor: "#606EEA",
                  color: "#fff",
                }}
                margin={{ mobile: "0px 8px  8px  0" }}
              >
                {"  Да"}
              </Button>
            </Buttons>
          )}
        </WrapperModal>
      </Modal>

      <Form onSubmit={handleSubmit(submitNews)}>
        <UpSide>
          {width <= 600 && (
            <MobileHeader>
              <GoBackIcon onClick={handleBack} style={{ cursor: "pointer" }} />
              <Title> Добавление новости</Title>
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
                    multiline={true}
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
                      height: { desktop: 120, laptop: 90, mobile: 150 },
                    }}
                    IconEnd={
                      <WrapArea>
                        <TextAreaIcon />
                      </WrapArea>
                    }
                  />
                )}
              />
              {width > 600 ? (
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
                      min={
                        filter?.regDate?.regDateFrom
                          ? filter?.regDate?.regDateFrom
                          : nextDay
                      }
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
              ) : (
                <WrapInputs>
                  <Label>{t("chose_date")}</Label>
                  <div>
                    <Input
                      type="date"
                      width={{
                        maxwidth: 180,
                        minwidth:130
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
                      min={
                        filter?.regDate?.regDateFrom
                          ? filter?.regDate?.regDateFrom
                          : nextDay
                      }
                      width={{
                        maxwidth: 180,
                        minwidth:130
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
                        multiline={true}
                        inputStyle={{
                          height: { desktop: 120, laptop: 90, mobile: 120 },
                        }}
                        IconEnd={width>600 ? 
                          <WrapArea>
                            <TextAreaIcon />
                          </WrapArea>:''
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
                    type="submit"
                    endIcon={<SaveIcon />}
                    buttonStyle={{
                      bgcolor: "#606EEA",
                      color: "#fff",
                    }}
                    margin={{ mobile: "0px 8px  8px  0" }}
                  >
                    {"Сохранить"}
                  </Button>
                </Buttons>
              )}
            </RightSide>
          </Container>
        </UpSide>
        {width > 600 && (
          <DownSide>
            <Button
              onClick={() => setCancel(true)}
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
        )}
      </Form>
    </Wrapper>
  );
};

export default CreateNews;
