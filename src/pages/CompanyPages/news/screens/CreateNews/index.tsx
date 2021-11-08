import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import Input from "components/Custom/Input";
import MultiSelect from "components/Custom/MultiSelect";
import Title from "components/Custom/Title";
import CheckBox from 'components/Custom/CheckBox';
import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useHistory } from "react-router-dom";
// import { useUploadImage } from './hooks/useUploadIMage'

import CropCustomModal from "components/Custom/CropImageModal/index";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import InputFormat from "components/Custom/InputFormat"
import Radio from "components/Custom/Radio";
import { Label, WrapDate, WrapInputs,WrapSelect } from "../../components/Header/style";
import {
  DangerIcon,
  DeleteIcon,
  GoBackIcon,
  PhoneIcon,
  PlusIcon,
  PublishIcon,
  SaveIcon,
  UploadImage,
} from "assets/icons/proposals/ProposalsIcons";
import { days } from './constants'
import {
  AgeBlock,
  AgeWrapper,
  Container,
  DownSide,
  ErrorMessage,
  Form,
  Header,
  ImageBlock,
  LeaveModal,
  LeftSide,
  PreviewMessage,
  RightSide,
  UploadButton,
  WrapCheck,
  UpSide,
  Wrapper,
} from "./style";
import { useUploadImage } from "../../hooks/useUploadIMage";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";


interface IOptionFields {
    push: boolean,
  
}


const CreateNews = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.clients);
  const [filter, setFilter] = React.useState<any>({});
  const [everyTime,seteveryTime]=React.useState<any>();
  const [optionalFields, setOptionalFields] = React.useState<IOptionFields>({
    push: false,
  
})
  React.useEffect(() => {
   
    setFilter(filters);
  }, [filters]);

  const [file, setFile] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [isCropVisible, setIsCropVisible] = React.useState(false);
  const [image, setImage] = React.useState("");
  const handleBack = () => {
    history.goBack();
  };
  const { handleUpload, deleteImage, setLoading, isLoading } =
    useUploadImage(setImage);

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

  const genders=[
      {
          id:1,
          label:'Мужской',
          value:'Мужской'
      },
      {
          id:2,
          label:'Женский',
          value:'Женский'
      }
    ]

    const handleOpenBlock = (e: any, action: "push") => {
        setOptionalFields((prev: IOptionFields) => ({
            ...prev,
            [action]: e.target.checked
        }))
    }
console.log("checked",checked)
console.log("options",genders)
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
              {!isLoading && !image && (
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
                    width={{
                      maxwidth: 200,
                    }}
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
                                name="categories"
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field }) => (
                                    <MultiSelect
                                        isMulti={false}
                                        error={!!errors.genders}
                                        message={t("requiredField")}
                                        field={field}
                                        label="Выберите пол"
                                        options={genders}
                                        margin={{ laptop: "0 0 35px 0" }} />
                                )}
                            />
                      </WrapSelect>
                      <Controller
                                        name="ageLimit"
                                        control={control}
                                        render={({ field }) => (
                                            <InputFormat
                                                field={field}
                                                defaultValue={0}
                                                max="100"
                                                IconStart={<PlusIcon style={{ marginLeft: "20px" }} />}
                                                label="Текст Push-уведомления" />
                                        )}
                                    />
            </LeftSide>
            <RightSide>
                            <AgeWrapper>
                                <AgeBlock>
                                    <h6>Использовать новость в формате Push-уведомления</h6>
                                    <CustomToggle
                                        onChange={(e: any) => handleOpenBlock(e, "push")} />
                                </AgeBlock>
                                {optionalFields.push &&
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
                                       label="Текст Push-уведомления"
                                       type="textarea"
                                       message={t("requiredField")}
                                       error={!!errors.description}
                                       multiline={true}
                                       inputStyle={{
                                         height: { desktop: 120, laptop: 90, mobile: 60 },
                                       }}
                                     />
                                   )}
                                 />
                                    }
                            </AgeWrapper>
                            <AgeWrapper>
                                {optionalFields.push &&
                                    <Controller
                                        name="days"
                                        control={control}
                                        render={({ field }) => (
                                            <MultiSelect
                                                field={field}
                                                isMulti={true}
                                                options={days}
                                                label="Укажите дни" />
                                        )}
                                    />}
                            </AgeWrapper>
                            <AgeWrapper>
                                {optionalFields.push &&
                                    <div style={{ display: "flex" }}>
                                        <Controller
                                            control={control}
                                            name="timeFrom"
                                            render={({ field }) => (
                                                <Input margin={{ laptop: "0 25px 0 0" }} type="time" field={field} />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="timeTo"
                                            render={({ field }) => (
                                                <Input type="time" field={field} />
                                            )}
                                        />
                                    </div>}
                            </AgeWrapper>
                        
                            {optionalFields.push &&
                         <div style={{ display: "flex", justifyItems:'center',alignItems:'center'}}>
              <CheckBox
                checked={checked}
                name={'checked'}
                onChange={(e: any) => setChecked(e)}
              />
              <div >Круглосуточна</div>
       </div>}
                              
            </RightSide>
          </Container>
        </UpSide>
      </Form>
    </Wrapper>
  );
};

export default CreateNews;
