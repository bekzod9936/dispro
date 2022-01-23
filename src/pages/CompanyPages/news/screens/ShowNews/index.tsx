import CustomToggle from "components/Custom/CustomToggleSwitch";
import Input from "components/Custom/Input";
import MultiSelect from "components/Custom/MultiSelect";
import Title from "components/Custom/Title";
import CheckBox from "components/Custom/CheckBox";
import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Spinner from "components/Helpers/Spinner";
import ImageLazyLoad from "components/Custom/ImageLazyLoad/ImageLazyLoad";
import useStaff from "../../hooks/useStaff";

import CropCustomModal from "components/Custom/CropImageModal/index";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import useAddress from "../../../info/screens/Address/useAddress";
import InputFormat from "components/Custom/InputFormat";

import {
  Label,
  WrapDate,
  WrapInputs,
  WrapSelect,
} from "../../components/Header/style";
import { GoBackIcon, PlusIcon } from "assets/icons/proposals/ProposalsIcons";

import {
  PushBlock,
  PushWrapper,
  Container,
  Form,
  ImageBlock,
  LeftSide,
  RightSide,
  WrapArea,
  TextAreaIcon,
  UpSide,
  Wrapper,
  FormRow,
} from "../CreateNews/style";

import { useAppSelector } from "services/redux/hooks";
import { ReactComponent as MarketIcon } from "assets/icons/SideBar/ilmarket.svg";

interface IOptionFields {
  push: boolean;
}

const CreateNews = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  console.log("selectedNews", selectedNews);
  const newsData = selectedNews?.fullData?.data;

  const startDate = dayjs(newsData?.startLifeTime).format("YYYY-MM-DD");
  const endDate = dayjs(newsData?.endLifeTime).format("YYYY-MM-DD");

  const { branches } = useStaff();
  const [optionalFields, setOptionalFields] = React.useState<IOptionFields>({
    push: newsData?.pushUp,
  });

  const [checked, setChecked] = React.useState(
    newsData?.settings?.aroundTheClock
  );

  const genderType = [
    {
      label:
        newsData?.genderType === 1
          ? "Для мужчин"
          : newsData?.genderType === 2
          ? "Для женщин"
          : "Для всех",
    },
  ];

  const weekDays = newsData?.settings?.weekDays.map((el: any) => {
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
    };
  });

  const companyId: any = localStorage.getItem("companyId");
  const { dataAddress } = useAddress({
    id: companyId,
  });

  const handleBack = () => {
    history.goBack();
  };

  const {
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  const handleOpenBlock = (e: any, action: "push") => {
    setOptionalFields((prev: IOptionFields) => ({
      ...prev,
      [action]: e.target.checked,
    }));
  };

  const allFilials = dataAddress;
  const filials = newsData?.settings?.stores;

  let filteredArray = allFilials?.filter(function (array_el: any) {
    return (
      filials?.filter(function (item: any) {
        return item == array_el.id;
      }).length == 1
    );
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

  return (
    <Wrapper>
      <div style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
        <GoBackIcon
          onClick={handleBack}
          style={{ marginRight: "25px", cursor: "pointer" }}
        />
        <Title>Добавление новости</Title>
      </div>
      <Form>
        <UpSide>
          <Container>
            <LeftSide>
              <Title>Фотографии</Title>
              <ImageBlock>
                <ImageLazyLoad
                  objectFit="contain"
                  src={newsData?.image}
                  alt="logo"
                />
              </ImageBlock>
              <Input value={newsData?.title} label="Название" />
              <Input
                margin={{ laptop: "35px 0" }}
                label="Описание"
                type="textarea"
                multiline={true}
                value={newsData?.description}
                inputStyle={{
                  height: { desktop: 150, laptop: 90, mobile: 60 },
                }}
                IconEnd={
                  <WrapArea>
                    <TextAreaIcon />
                  </WrapArea>
                }
              />

              <WrapInputs>
                <Label>{t("chose_date")}</Label>
                <div>
                  <Input
                    type="date"
                    width={{
                      maxwidth: 200,
                    }}
                    value={startDate}
                    IconStart={<WrapDate>{t("from")}</WrapDate>}
                    inputStyle={{
                      inpadding: "0 10px 0 0",
                    }}
                    defaultValue={startDate}
                  />
                  <Input
                    type="date"
                    defaultValue={endDate}
                    width={{
                      maxwidth: 200,
                    }}
                    value={startDate}
                    margin={{ laptop: "0 0 0 15px" }}
                    IconStart={<WrapDate>{t("to")}</WrapDate>}
                    inputStyle={{
                      inpadding: "0 10px 0 0",
                    }}
                  />
                </div>
              </WrapInputs>
              <WrapSelect>
                <MultiSelect
                  isMulti={false}
                  isDisabled={true}
                  value={genderType}
                  label="Выберите пол"
                  margin={{ laptop: "0 0 35px 0" }}
                />
              </WrapSelect>
              <InputFormat
                defaultValue={newsData?.ageFrom}
                IconStart={<PlusIcon style={{ marginLeft: "20px" }} />}
                label="Возрастное ограничение"
              />
            </LeftSide>
            <RightSide>
              <PushWrapper>
                <PushBlock>
                  <h6 style={{ width: "80%" }}>
                    {t("Использовать новость в формате Push-уведомления")}
                  </h6>
                  <CustomToggle
                    disabled={true}
                    defaultChecked={newsData?.pushUp}
                    onChange={(e: any) => handleOpenBlock(e, "push")}
                  />
                </PushBlock>
                {optionalFields.push && (
                  <Input
                    value={newsData?.pushUpTitle}
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
              </PushWrapper>
              <PushWrapper>
                {optionalFields.push && (
                  <MultiSelect
                    isDisabled={true}
                    isMulti={true}
                    value={weekDays}
                    label="Укажите дни"
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
                    <Input
                      margin={{ laptop: "0 25px 0 0" }}
                      type="time"
                      value={newsData?.settings?.time?.from}
                    />

                    <Input
                      type="time"
                      margin={{ laptop: "0 25px 0 0" }}
                      value={newsData?.settings?.time?.to}
                    />
                  </div>
                )}
              </PushWrapper>

              {optionalFields.push && (
                <CheckBox
                  checked={checked}
                  name={"checked"}
                  disabled={true}
                  label={"Круглосуточна"}
                  onChange={(e: any) => setChecked(e)}
                />
              )}

              {optionalFields.push && (
                <FormRow>
                  <Controller
                    control={control}
                    name="filialID"
                    defaultValue={mergedBranches}
                    render={({ field }) => {
                      return (
                        <MultiSelect
                          options={branches}
                          defaultValue={mergedBranches}
                          isMulti={true}
                          isDisabled={true}
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
      </Form>
    </Wrapper>
  );
};

export default CreateNews;
