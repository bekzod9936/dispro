import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import {
    DangerIcon,
    DeleteIcon,
    GoBackIcon,
    PhoneIcon,
    PlusIcon,
    PublishIcon,
    SaveIcon,
    UploadImage
} from 'assets/icons/proposals/ProposalsIcons'
import Button from 'components/Custom/Button'
import CustomToggle from 'components/Custom/CustomToggleSwitch'
import Input from 'components/Custom/Input'
import MultiSelect from 'components/Custom/MultiSelect'
import Title from 'components/Custom/Title'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
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
    PreviewMessage,
    RightSide,
    UploadButton,
    UpSide,
    Wrapper
} from './style'
import { useUploadImage } from './hooks/useUploadIMage'
import CropCustomModal from 'components/Custom/CropImageModal/index'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { postCoupon } from 'services/queries/ProposalsQueries'
import Modal from 'components/Custom/Modal'
import { SetDate } from './components/SetDate'
import { categories, days } from './constants'
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad'
import MFormatInput from 'components/Custom/MoneyInput'
import { useAppDispatch } from 'services/redux/hooks'
import { setSaving } from 'services/redux/Slices/proposals/proposals'
import { PreviewModal } from '../../components/PreviewModal'
import Spinner from 'components/Helpers/Spinner'
import { fetchCategories } from 'services/queries/InfoQueries'
import { useFetchCategories } from './hooks/useFetchCategories'

interface IOptionFields {
    age: boolean,
    days: boolean,
    time: boolean
}

export interface ICoupon {
    ageFrom: string | null,
    ageTo: string | null,
    ageUnlimited: boolean,
    categoryIds: number[],
    companyId: number,
    count: string,
    currencyId: number,
    description: string,
    image: string,
    price: string,
    title: string,
    type: string,
    value: string
}

const initialData: ICoupon = {
    ageFrom: null,
    ageTo: null,
    ageUnlimited: true,
    categoryIds: [],
    companyId: 18,
    count: "",
    currencyId: 1,
    description: "",
    image: "",
    price: "",
    title: "",
    type: "1",
    value: ""
}

const Coupons = () => {
    const history = useHistory()
    const { t } = useTranslation()
    const [isCoupon, setIsCoupon] = React.useState<boolean>(false)
    const [coupon, setCoupon] = React.useState<ICoupon>(initialData)
    const [period, setPeriod] = React.useState<boolean>(false)
    const [image, setImage] = React.useState('')
    const [publish, setPublish] = React.useState(false)
    const [categories, setCategories] = React.useState<any>()
    const { handleUpload, deleteImage, loading, setLoading, isLoading } = useUploadImage(setImage)
    const [file, setFile] = React.useState('')
    const [previewModal, setPreviewModal] = React.useState<boolean>(false)
    const [isCropVisible, setIsCropVisible] = React.useState(false)
    const [optionalFields, setOptionalFields] = React.useState<IOptionFields>({
        age: false,
        days: false,
        time: false
    })
    const { mutate } = useMutation((data: any) => postCoupon(data))
    const { control, handleSubmit, register, watch, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        shouldFocusError: true,
        reValidateMode: "onChange",
    })
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        const isCoupon = history.location.pathname.includes("coupon")
        setIsCoupon(isCoupon)
    }, [])


    const handleOpenBlock = (e: any, action: "age" | "time" | "days") => {
        setOptionalFields((prev: IOptionFields) => ({
            ...prev,
            [action]: e.target.checked
        }))
    }

    const _ = useFetchCategories(setCategories)

    const handleUploadImg = (data: any) => {
        setFile(data.target.files[0])
        setIsCropVisible(true)
    }

    const onPublish = (data: any) => {
        setPeriod(true)
        setCoupon((prev: ICoupon) => ({
            ...prev,
            ageFrom: data.ageLimit || null,
            ageTo: null,
            ageUnlimited: !!!data.ageLimit,
            categoryIds: data.categories.map((el: any) => el.id),
            companyId: 18,
            count: data.amount,
            currencyId: 1,
            description: data.description,
            image: image,
            price: data.cost,
            title: data.name,
            type: isCoupon ? "1" : "2",
            value: data.percent.toString().split(" ").join(''),
            settings: {
                weekDays: optionalFields.days ? data.days.map((el: any) => el.id) : [0, 1, 2, 3, 4, 5, 6],
                time: {
                    from: !optionalFields.time ? "00:00" : data.timeFrom,
                    to: !optionalFields.time ? "23:59" : data.timeTo
                }
            }
        }))
    }

    const handleDelete = () => {
        setFile("");
        setImage("")
        deleteImage(image)
    }

    const handleBack = () => {
        history.goBack()
    }

    const onSave = async (data: any) => {
        const validData = {
            title: data.name,
            price: data.cost,
            description: data.description,
            count: data.amount,
            value: data.percent.toString().split(" ").join(''),
            currencyId: 1,
            ageFrom: optionalFields.age ? data.ageLimit : null,
            ageUnlimited: !!!data.ageLimit || !optionalFields.age,
            categoryIds: data.categories.map((el: any) => el.id),
            companyId: 18,
            image: image,
            type: isCoupon ? "1" : "2",
            settings: {
                weekDays: optionalFields.days ? data.days.map((el: any) => el.id) : [0, 1, 2, 3, 4, 5, 6],
                time: {
                    from: !optionalFields.time ? "00:00" : data.timeFrom,
                    to: !optionalFields.time ? "23:59" : data.timeTo
                }
            }
        }

        mutate(validData)
        setTimeout(() => history.goBack(), 1000)
        dispatch(setSaving(true))
    }



    return (
        <Wrapper>
            <div
                style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
                <GoBackIcon onClick={handleBack} style={{ marginRight: "25px", cursor: "pointer" }} />
                <Title>
                    Создание {isCoupon ? "купона" : "сертификата"}
                </Title>
            </div>
            <Modal open={period}>
                <SetDate
                    handlePost={mutate}
                    handleClose={() => setPeriod(false)}
                    coupon={coupon} />
            </Modal>
            <PreviewModal
                price={watch("cost")}
                ageFrom={watch("ageLimit")}
                open={previewModal}
                isCoupon={isCoupon}
                description={watch("description")}
                value={watch("percent")}
                image={image}
                handleClose={() => setPreviewModal(false)}
            />
            <Form onSubmit={publish ? handleSubmit(onPublish) : handleSubmit(onSave)}>
                <UpSide>
                    <Container>
                        <LeftSide>
                            <Title>Фотографии</Title>
                            {!isLoading && (!image &&
                                <div style={{ marginBottom: 30 }}>
                                    <Header>
                                        <p>Можно загрузить фотографию JPG или PNG, минимальное разрешение 400*400рх, размер не более 3Мбайт.</p>
                                    </Header>
                                    <UploadButton>
                                        <label htmlFor="uploadImg">Загрузить фото</label>
                                        <input {...register("image", { required: true })} onChange={handleUploadImg} type="file" id="uploadImg" />
                                        <UploadImage />
                                    </UploadButton>
                                    {errors.image && <ErrorMessage>{t("requiredField")}</ErrorMessage>}
                                </div>)}
                            {isLoading &&
                                <div style={{ width: "100%", height: 140 }}>
                                    <Spinner size={30} />
                                </div>}
                            {image &&
                                <ImageBlock>
                                    <ImageLazyLoad objectFit="contain" src={image} alt="logo" />
                                    <DeleteIcon onClick={handleDelete} />
                                </ImageBlock>}
                            {file &&
                                <CropCustomModal
                                    setIsLoading={setLoading}
                                    isCoupon={isCoupon}
                                    handleUpload={handleUpload}
                                    setFile={setFile}
                                    setIsCropVisible={setIsCropVisible}
                                    open={isCropVisible}
                                    src={file} />}

                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field }) => (
                                    <Input
                                        error={!!errors.name}
                                        message={t("requiredField")}
                                        field={field}
                                        label="Название" />
                                )}
                            />
                            <Controller
                                name="percent"
                                control={control}
                                rules={{
                                    required: true,
                                    max: 100
                                }}
                                render={({ field }) => (
                                    <MFormatInput
                                        max="100"
                                        {...field}
                                        onChange={(e: any) => field.onChange(e)}
                                        error={!!errors.percent}
                                        message={t("requiredField")}
                                        label={isCoupon ? `Укажите % купона` : "Укажите сумму сертификата"}
                                        margin={{ laptop: "35px 0" }} />
                                )}
                            />
                            <Controller
                                name="amount"
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field }) => (
                                    <Input
                                        error={!!errors.amount}
                                        message={t("requiredField")}
                                        field={field}
                                        label="Количество" />
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                rules={{
                                    required: true
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
                                        inputStyle={{ height: { desktop: 120, laptop: 90, mobile: 60 } }}
                                    />
                                )}
                            />
                            <Controller
                                name="categories"
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field }) => (
                                    <MultiSelect
                                        isMulti={true}
                                        error={!!errors.categories}
                                        message={t("requiredField")}
                                        field={field}
                                        label="Выберите категорию"
                                        options={categories}
                                        margin={{ laptop: "0 0 35px 0" }} />
                                )}
                            />
                            <Controller
                                name="cost"
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={!!errors.cost}
                                        message={t("requiredField")}
                                        label={isCoupon ? "Цена купона" : "Цена сертификата"}
                                        type="number"
                                        margin={{ laptop: "25px 0 35px 0" }} />
                                )}
                            />
                        </LeftSide>
                        <RightSide>
                            <AgeWrapper>
                                <AgeBlock>
                                    <h6>Добавить возрастное ограничение</h6>
                                    <CustomToggle
                                        onChange={(e: any) => handleOpenBlock(e, "age")} />
                                </AgeBlock>
                                {optionalFields.age &&
                                    <Controller
                                        name="ageLimit"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                field={field}
                                                defaultValue={0}
                                                IconStart={<PlusIcon style={{ marginLeft: "20px" }} />}
                                                label="Возрастное ограничение" />
                                        )}
                                    />}
                            </AgeWrapper>
                            <AgeWrapper>
                                <AgeBlock>
                                    <h6>Дни действия {isCoupon ? "купона" : "сертификата"}</h6>
                                    <CustomToggle
                                        onChange={(e: any) => handleOpenBlock(e, "days")} />
                                </AgeBlock>
                                {optionalFields.days &&
                                    <Controller
                                        name="days"
                                        control={control}
                                        rules={{
                                            required: optionalFields.days
                                        }}
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
                                <AgeBlock>
                                    <h6>Время действия {isCoupon ? "купона" : "сертификата"}</h6>
                                    <CustomToggle
                                        onChange={(e: any) => handleOpenBlock(e, "time")} />
                                </AgeBlock>
                                {optionalFields.time &&
                                    <div style={{ display: "flex" }}>
                                        <Controller
                                            control={control}
                                            name="timeFrom"
                                            rules={{
                                                required: optionalFields.time
                                            }}
                                            render={({ field }) => (
                                                <Input margin={{ laptop: "0 25px 0 0" }} type="time" field={field} />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="timeTo"
                                            rules={{
                                                required: optionalFields.time
                                            }}
                                            render={({ field }) => (
                                                <Input type="time" field={field} />
                                            )}
                                        />
                                    </div>}
                            </AgeWrapper>
                            {isValid ?
                                <Button
                                    onClick={() => setPreviewModal(true)}
                                    buttonStyle={{ bgcolor: "#ffffff", color: "#606EEA" }}
                                    endIcon={<PhoneIcon />}>
                                    Показать превью
                                </Button> :
                                <PreviewMessage>
                                    <DangerIcon />
                                    <p>Заполните все обязательные поля чтобы посмотреть как купон будет отображаться в приложениии</p>
                                </PreviewMessage>}
                        </RightSide>
                    </Container>
                </UpSide>
                <DownSide>
                    <Button
                        onClick={handleBack}
                        startIcon={<CancelIcon />}
                        buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}>
                        Отменить
                    </Button>
                    <Button
                        onClick={() => setPublish(true)}
                        type="submit"
                        margin={{ laptop: "0 25px" }}
                        startIcon={<PublishIcon />}>
                        Опубликовать
                    </Button>
                    <Button
                        onClick={() => setPublish(false)}
                        type="submit"
                        buttonStyle={{ color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }}
                        startIcon={<SaveIcon />}
                    >
                        Сохранить в черновик
                    </Button>
                </DownSide>
            </Form>
        </Wrapper>
    )
}

export default Coupons