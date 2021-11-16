import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import {
  DangerIcon,
  DeleteIcon,
  GoBackIcon,
  MobileCancelIcon,
  PhoneIcon,
  PlusIcon,
  PublishIcon,
  SaveIcon,
  UploadImage,
} from "assets/icons/proposals/ProposalsIcons";
import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import Input from "components/Custom/Input";
import MultiSelect from "components/Custom/MultiSelect";
import Title from "components/Custom/Title";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  AgeBlock,
  AgeWrapper,
  Container,
  DownSide,
  ErrorMessage,
  Form,
  Header,
  ImageBlock,
  LeftSide,
  MobileHeader,
  RightSide,
  UploadButton,
  UpSide,
  Wrapper,
} from "./style";
import CropCustomModal from "components/Custom/CropImageModal/index";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { updateCoupon, postCoupon } from "services/queries/proposalQuery";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { RootState } from "services/redux/store";
import { resetCurrentCoupon } from "services/redux/Slices/proposals/proposals";
import { days } from "../Coupons/constants";
import ImageLazyLoad from "components/Custom/ImageLazyLoad/ImageLazyLoad";
import { useUploadImage } from "../Coupons/hooks/useUploadIMage";
import { PreviewModal } from "../../components/PreviewModal";
import { Buttons, IconWrapper, LeaveModal, PreviewMessage } from "../Coupons/style";
import { SetDate } from "../Coupons/components/SetDate";
import Modal from "components/Custom/Modal";
import { useFetchCategories } from "./useFetchCategories";
import { getWeekDays } from "../../utils/getValidDate";
import InputFormat from "components/Custom/InputFormat";
import useWindowWidth from "services/hooks/useWindowWidth";
import FullModal from "components/Layout/Header/FullModal";
const UpdateCoupon = () => {
  const { currentCoupon } = useAppSelector(
    (state: RootState) => state.proposals
  );
  const { t } = useTranslation();
  const [file, setFile] = React.useState<string>("");
  const [isCoupon, setIsCoupon] = React.useState<boolean>(true);
  const [image, setImage] = React.useState<string>(currentCoupon.image);
  const [coupon, setCoupon] = React.useState<any>();
  const [chooseDate, setChooseDate] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isCropVisible, setIsCropVisible] = React.useState<boolean>(false);
  const history = useHistory();
  const { width } = useWindowWidth()
  const [categories, setCategories] = React.useState<any>({
    categories: [],
    defaults: [],
  });
  const [leave, setLeave] = React.useState(false);
  const [valid, setValid] = React.useState<boolean>(true);
  const [publish, setPublish] = React.useState<boolean>(false);
  const { handleUpload, deleteImage } = useUploadImage(setImage);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
    control,
    setValue,
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });
  const [previewModal, setPreviewModal] = React.useState<boolean>(false);
  const [optionalFields, setOptionalFields] = React.useState({
    age: !currentCoupon.ageUnlimited,
    days: currentCoupon?.settings?.weekDays?.length !== 7,
    time: !(
      currentCoupon?.settings?.time?.from === "00:00" &&
      currentCoupon?.settings?.time?.to === "23:59"
    ),
  });
  const handleBack = () => {
    dispatch(resetCurrentCoupon());
    history.goBack();
  };
  useEffect(() => {
    if (currentCoupon.title === "") {
      handleBack()
    }
  }, [])
  const _ = useFetchCategories(setCategories, currentCoupon.categoryIds);

  const handleOpenBlock = (e: any, payload: string) => {
    setOptionalFields((prev: any) => ({
      ...prev,
      [payload]: e.target.checked,
    }));
  };

  const { mutate } = useMutation(({ id, data }: any) => updateCoupon(id, data));

  React.useEffect(() => {
    const res = history.location.pathname.includes("coupon");
    setIsCoupon(res);
  }, []);

  const onSave = async (data: any) => {
    const validData = {
      title: data.name,
      price: data.cost,
      description: data.description,
      count: data.amount,
      value: data.percent.toString().split(" ").join(""),
      currencyId: 1,
      ageFrom: optionalFields.age ? data.ageLimit : null,
      ageUnlimited: !!!data.ageLimit || !optionalFields.age,
      categoryIds: data.categories.map((el: any) => el.id),
      companyId: 18,
      id: currentCoupon.id,
      image: image,
      type: currentCoupon.type,
      settings: {
        weekDays:
          optionalFields.days && data?.days?.length
            ? data.days.map((el: any) => el.id)
            : [0, 1, 2, 3, 4, 5, 6],
        time: {
          from: optionalFields.time && data?.timeFrom ? data.timeFrom : "00:00",
          to: optionalFields.time && data?.timeTo ? data.timeTo : "23:59",
        },
      },
    };
    mutate({
      id: currentCoupon.id,
      data: validData,
    });
    setTimeout(() => history.goBack(), 1000);
    dispatch(resetCurrentCoupon());
  };

  const onPublish = (data: any) => {
    setChooseDate(true);
    setCoupon({
      ...currentCoupon,
      title: data.name,
      count: data.amount,
      ageUnlimited: !optionalFields.age || !!!data.ageLimit,
      price: data.cost,
      value: data.percent.toString().split(" ").join(""),
      type: isCoupon ? "2" : "1",
      currencyId: 1,
      categoryIds: data.categories.map((el: any) => el.id),
      companyId: 18,
      image: image,
      ageFrom: optionalFields.age ? data.ageLimit || null : null,
      ageTo: null,
      description: data.description,
      settings: {
        weekDays:
          optionalFields.days && data?.days?.length
            ? data.days.map((el: any) => el.id)
            : [0, 1, 2, 3, 4, 5, 6],
        time: {
          from: optionalFields.time && data?.timeFrom ? data.timeFrom : "00:00",
          to: optionalFields.time && data?.timeTo ? data.timeTo : "23:59",
        },
      },
    });
  };

  const handleUploadImg = (data: any) => {
    setFile(data.target.files[0]);
    setIsCropVisible(true);
  };

  const handleDelete = () => {
    deleteImage(image);
    setImage("");
  };
  React.useEffect(() => {
    let res = Object.keys(errors)?.length;
    setValid(!!!res);
  }, [isValid]);

  React.useEffect(() => {
    setValue("categories", categories.defaults);
  }, [categories.defaults]);

  React.useEffect(() => {
    setValue("percent", currentCoupon.value?.toString());
  }, [currentCoupon.value]);

 
  return (
    <Wrapper>
      {width > 600 && <div style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
        <GoBackIcon
          onClick={handleBack}
          style={{ marginRight: "25px", cursor: "pointer" }}
        />
        <Title>Редактирование {isCoupon ? "купона" : "сертификата"}</Title>
      </div>}
      {width > 600 ?
        <Modal open={chooseDate}>
          <SetDate
            coupon={coupon}
            handleClose={() => setChooseDate(false)}
            shouldUpdate
            handleUpdate={mutate}
          />
        </Modal> :
        <FullModal open={chooseDate}>
          <SetDate
            coupon={coupon}
            handleClose={() => setChooseDate(false)}
            shouldUpdate
            handleUpdate={mutate}
          />
        </FullModal>}
      <Modal open={leave}>
        <LeaveModal>
          <p>
            Вы действительно хотите отменить редактирование спецпредложения?
          </p>
          <div className="buttons">
            <Button
              buttonStyle={{ bgcolor: "white", color: "#223367" }}
              margin={{ laptop: "0 15px 0 0" }}
              onClick={() => setLeave(false)}
            >
              Нет
            </Button>
            <Button onClick={handleBack}>Да</Button>
          </div>
        </LeaveModal>
      </Modal>
      <PreviewModal
        price={watch("cost")}
        isCoupon={isCoupon}
        value={watch("percent")}
        image={image}
        open={previewModal}
        handleClose={() => setPreviewModal(false)}
        ageFrom={watch("ageLimit")}
      />
      <Form onSubmit={publish ? handleSubmit(onPublish) : handleSubmit(onSave)}>
        {width <= 600 &&
          <MobileHeader>
            <GoBackIcon
              onClick={handleBack}
              style={{ cursor: "pointer" }}
            />
            <Title>Редактирование {isCoupon ? "купона" : "сертификата"}</Title>
          </MobileHeader>}
        <UpSide>
          <Container>
            <LeftSide>
              <Title>Фотографии</Title>
              {!image && (
                <div style={{ marginBottom: 30 }}>
                  <Header>
                    <p>
                      Можно загрузить фотографию JPG или PNG, минимальное
                      разрешение 400*400рх, размер не более 3Мбайт.
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
              {image && (
                <ImageBlock>
                  <ImageLazyLoad objectFit="contain" src={image} alt="logo" />
                  <DeleteIcon onClick={handleDelete} />
                </ImageBlock>
              )}
              {file && (
                <CropCustomModal
                  isCoupon={isCoupon}
                  coupon
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
                defaultValue={currentCoupon.title}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    error={!!errors.name}
                    message={t("requiredField")}
                    field={field}
                    defaultValue={currentCoupon.title}
                    label="Название"
                  />
                )}
              />
              <Controller
                name="percent"
                control={control}
                defaultValue={currentCoupon.value}
                rules={{
                  required: true,
                  min: isCoupon ? 1 : 1000,
                }}
                render={({ field }) => {
                  if (!isCoupon)
                    return (
                      <InputFormat
                        field={field}
                        type="string"
                        max="10000000"
                        defaultValue={currentCoupon.value?.toString()}
                        error={!!errors.percent}
                        message={
                          parseInt(watch("percent")) < 1000
                            ? "Минимальная сумма: 1000"
                            : t("requiredField")
                        }
                        label={"Укажите сумму сертификата"}
                        margin={{ laptop: "35px 0" }}
                      />
                    );
                  else
                    return (
                      <InputFormat
                        field={field}
                        defaultValue={currentCoupon.value?.toString()}
                        type="string"
                        label={"Укажите % купона"}
                        error={!!errors.percent}
                        max="100"
                        margin={{ laptop: "35px 0" }}
                        message={
                          parseInt(watch("percent")) < 1
                            ? "Минимальный процент: 1"
                            : t("requiredField")
                        }
                      />
                    );
                }}
              />
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: true,
                  min: 5,
                }}
                defaultValue={currentCoupon.count}
                render={({ field }) => (
                  <InputFormat
                    max="5000"
                    error={!!errors.amount}
                    message={
                      parseInt(watch("amount")) < 5
                        ? "Минимальное количество: 5"
                        : t("requiredField")
                    }
                    field={field}
                    defaultValue={currentCoupon.count}
                    label="Количество"
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                defaultValue={currentCoupon.description}
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
                    defaultValue={currentCoupon.description}
                    inputStyle={{
                      height: { desktop: 120, laptop: 90, mobile: 60 },
                    }}
                  />
                )}
              />
              <Controller
                name="categories"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue={categories.defaults}
                render={({ field }) => (
                  <MultiSelect
                    isMulti={true}
                    error={!!errors.categories}
                    message={t("requiredField")}
                    field={field}
                    defaultValue={categories.defaults}
                    label="Выберите категорию"
                    options={categories.categories}
                    margin={{ laptop: "0 0 35px 0" }}
                  />
                )}
              />
              <Controller
                name="cost"
                control={control}
                rules={{
                  required: true,
                  min: 1000,
                }}
                defaultValue={currentCoupon.price}
                render={({ field }) => (
                  <InputFormat
                    field={field}
                    error={!!errors.cost}
                    defaultValue={currentCoupon.price}
                    message={
                      parseInt(watch("cost")) < 1000
                        ? "Минимальная цена: 1000"
                        : t("requiredField")
                    }
                    label={isCoupon ? "Цена купона" : "Цена сертификата"}
                    max="10000000"
                    margin={{ laptop: "25px 0 35px 0" }}
                  />
                )}
              />
            </LeftSide>
            <RightSide>
              <AgeWrapper>
                <AgeBlock>
                  <h6>Добавить возрастное ограничение</h6>
                  <CustomToggle
                    checked={optionalFields.age}
                    onChange={(e: any) => handleOpenBlock(e, "age")}
                  />
                </AgeBlock>
                {optionalFields.age && (
                  <Controller
                    name="ageLimit"
                    control={control}
                    defaultValue={currentCoupon.ageFrom}
                    render={({ field }) => (
                      <InputFormat
                        field={field}
                        max="100"
                        defaultValue={0}
                        IconStart={<PlusIcon style={{ marginLeft: "20px" }} />}
                        label="Возрастное ограничение"
                      />
                    )}
                  />
                )}
              </AgeWrapper>
              <AgeWrapper>
                <AgeBlock>
                  <h6>Дни действия {isCoupon ? "купона" : "сертификата"}</h6>
                  <CustomToggle
                    checked={optionalFields.days}
                    onChange={(e: any) => handleOpenBlock(e, "days")}
                  />
                </AgeBlock>
                {optionalFields.days && (
                  <Controller
                    name="days"
                    control={control}
                    defaultValue={getWeekDays(
                      currentCoupon?.settings?.weekDays
                    )}
                    render={({ field }) => (
                      <MultiSelect
                        options={days}
                        field={field}
                        isMulti
                        defaultValue={getWeekDays(
                          currentCoupon?.settings?.weekDays
                        )}
                        label="Укажите дни"
                      />
                    )}
                  />
                )}
              </AgeWrapper>
              <AgeWrapper>
                <AgeBlock>
                  <h6>Время действия {isCoupon ? "купона" : "сертификата"}</h6>
                  <CustomToggle
                    checked={optionalFields.time}
                    onChange={(e: any) => handleOpenBlock(e, "time")}
                  />
                </AgeBlock>
                {optionalFields.time && (
                  <div style={{ display: "flex" }}>
                    <Controller
                      control={control}
                      name="timeFrom"
                      defaultValue={currentCoupon?.settings?.time?.from}
                      render={({ field }) => (
                        <Input
                          defaultValue={currentCoupon?.settings?.time?.from}
                          margin={{ laptop: "0 25px 0 0", mobile: "0 12px 0 0" }}
                          type="time"
                          field={field}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="timeTo"
                      defaultValue={currentCoupon?.settings?.time?.to}
                      render={({ field }) => (
                        <Input
                          defaultValue={currentCoupon?.settings?.time?.to}
                          type="time"
                          field={field}
                        />
                      )}
                    />
                  </div>
                )}
              </AgeWrapper>
              {width > 600 &&
                <>
                  {valid ? (
                    <Button
                      onClick={() => setPreviewModal(true)}
                      buttonStyle={{ bgcolor: "#ffffff", color: "#606EEA" }}
                      endIcon={<PhoneIcon />}
                    >
                      Показать превью
                    </Button>
                  ) : (
                    <PreviewMessage>
                      <DangerIcon />
                      <p>
                        Заполните все обязательные поля чтобы посмотреть как купон
                        будет отображаться в приложениии
                      </p>
                    </PreviewMessage>
                  )}
                </>}
              {width <= 600 &&
                <Buttons>
                  <div className="upside">
                    <Button
                      onClick={() => setLeave(true)}
                      endIcon={<MobileCancelIcon />}
                      buttonStyle={{ bgcolor: "rgba(96, 110, 234, 0.1)", color: "#606EEA" }}
                      margin={{ mobile: "0 8px 8px 0" }}>
                      {t("cancel")}
                    </Button>
                    <Button
                      onClick={() => setPublish(true)}
                      type="submit"
                      endIcon={
                        <IconWrapper>
                          <PublishIcon />
                        </IconWrapper>}
                    >
                      {t("publish")}
                    </Button>
                  </div>
                  <Button
                    onClick={() => setPublish(false)}
                    type="submit"
                    endIcon={<SaveIcon />}
                    buttonStyle={{ bgcolor: "rgba(96, 110, 234, 0.1)", color: "#606EEA" }}
                    margin={{ mobile: "8px 0 0 0" }}>
                    {t("saveToDrafts")}
                  </Button>
                </Buttons>}
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
            onClick={() => setPublish(true)}
            type="submit"
            margin={{ laptop: "0 25px" }}
            startIcon={<PublishIcon />}
          >
            Опубликовать
          </Button>
          <Button
            onClick={() => setPublish(false)}
            type="submit"
            buttonStyle={{
              color: "#606EEA",
              bgcolor: "rgba(96, 110, 234, 0.1)",
            }}
            startIcon={<SaveIcon />}
          >
            Сохранить
          </Button>
        </DownSide>
      </Form>
    </Wrapper>
  );
};
export default UpdateCoupon;
