import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import {
    DangerIcon,
    DeleteIcon,
    GoBackIcon,
    PhoneIcon,
    PlusIcon,
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
    RightSide,
    UploadButton,
    UpSide,
    Wrapper
} from './style'
import CropCustomModal from 'components/Custom/CropImageModal/index'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { updateCoupon } from 'services/queries/ProposalsQueries'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { RootState } from 'services/redux/store'
import { resetCurrentCoupon } from 'services/redux/Slices/proposals/proposals'
import { categories, days } from '../Coupons/constants'
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad'
import moment from 'moment'
import { useUploadImage } from '../Coupons/useUploadIMage'
import { PreviewModal } from '../../components/PreviewModal'
import { PreviewMessage } from '../Coupons/style'

const UpdateCoupon = () => {
    const { currentCoupon } = useAppSelector((state: RootState) => state.proposals)
    const { t } = useTranslation()
    const [file, setFile] = React.useState<string>("")
    const [isCoupon, setIsCoupon] = React.useState<boolean>(true)
    const [image, setImage] = React.useState<string>(currentCoupon.image)
    const dispatch = useAppDispatch()
    const [isCropVisible, setIsCropVisible] = React.useState<boolean>(false)
    const history = useHistory()
    const { handleUpload, deleteImage } = useUploadImage(setImage)
    const { handleSubmit, register, watch, formState: { errors, isValid }, control } = useForm({
        mode: "onChange",
        shouldFocusError: true,
        reValidateMode: "onChange",
    })
    const [previewModal, setPreviewModal] = React.useState<boolean>(false)
    const [optionalFields, setOptionalFields] = React.useState(
        {
            age: !currentCoupon.ageUnlimited,
            days: false,
            time: false
        }
    )
    const handleBack = () => {
        dispatch(resetCurrentCoupon())
        history.goBack()
    }

    const handleOpenBlock = (e: any, payload: string) => {
        setOptionalFields((prev: any) => ({
            ...prev,
            [payload]: e.target.checked
        }))
    }

    const { mutate } = useMutation(({ id, data }: any) => updateCoupon(id, data))

    React.useEffect(() => {
        const res = history.location.pathname.includes("coupon")
        setIsCoupon(res)
    }, [])

    const onSave = (data: any) => {
        const validData = {
            title: data.name,
            price: data.cost,
            description: data.description,
            count: data.amount,
            value: data.percent,
            currencyId: 1,
            startDate: moment(currentCoupon.startDate).format("YYYY-MM-DD"),
            endDate: moment(currentCoupon.endDate).format("YYYY-MM-DD"),
            ageFrom: data.ageLimit,
            ageUnlimited: !!!data.ageLimit,
            categoryIds: [],
            companyId: 18,
            id: currentCoupon.id,
            image: image,
            type: currentCoupon.type,
        }
        mutate({
            id: currentCoupon.id,
            data: validData
        })
        dispatch(resetCurrentCoupon())
        setTimeout(() => history.goBack(), 1000)
    }


    console.log(errors, isValid);

    const handleUploadImg = (data: any) => {
        setFile(data.target.files[0])
        setIsCropVisible(true)
    }

    const handleDelete = () => {
        deleteImage(image)
        setImage("")
    }
    return (
        <Wrapper>
            <div
                style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
                <GoBackIcon onClick={handleBack} style={{ marginRight: "25px", cursor: "pointer" }} />
                <Title>
                    Редактирование {isCoupon ? "купона" : "сертификата"}
                </Title>
            </div>
            <PreviewModal
                price={watch("cost")}
                isCoupon={isCoupon}
                value={watch("percent")}
                image={image}
                open={previewModal}
                handleClose={() => setPreviewModal(false)}
                ageFrom={watch("ageLimit")} />
            <Form onSubmit={handleSubmit(onSave)}>
                <UpSide>
                    <Container>
                        <LeftSide>
                            <Title>Фотографии</Title>
                            {!image &&
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
                                </div>}
                            {image &&
                                <ImageBlock>
                                    <ImageLazyLoad objectFit="contain" src={image} alt="logo" />
                                    <DeleteIcon onClick={handleDelete} />
                                </ImageBlock>}
                            {file &&
                                <CropCustomModal
                                    isCoupon={isCoupon}
                                    handleUpload={handleUpload}
                                    setFile={setFile}
                                    setIsCropVisible={setIsCropVisible}
                                    open={isCropVisible}
                                    src={file} />}

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
                                        label="Название" />
                                )}
                            />
                            <Controller
                                name="percent"
                                control={control}
                                defaultValue={currentCoupon.value}
                                rules={{
                                    required: true
                                }}
                                render={({ field }) => (
                                    <Input
                                        error={!!errors.percent}
                                        message={t("requiredField")}
                                        field={field}
                                        defaultValue={currentCoupon.value}
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
                                defaultValue={currentCoupon.count}
                                render={({ field }) => (
                                    <Input
                                        error={!!errors.amount}
                                        message={t("requiredField")}
                                        field={field}
                                        defaultValue={currentCoupon.count}
                                        label="Количество" />
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                defaultValue={currentCoupon.description}
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
                                        defaultValue={currentCoupon.description}
                                        inputStyle={{ height: { desktop: 120, laptop: 90, mobile: 60 } }}
                                    />
                                )}
                            />
                            <Controller
                                name="categories"
                                control={control}
                                defaultValue={currentCoupon?.categories}
                                rules={{
                                    required: false
                                }}
                                render={({ field }) => (
                                    <MultiSelect
                                        isMulti={true}
                                        error={!!errors.categories}
                                        message={t("requiredField")}
                                        field={field}
                                        defaultValue={currentCoupon?.categories}
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
                                defaultValue={currentCoupon.price}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={!!errors.cost}
                                        defaultValue={currentCoupon.price}
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
                                        checked={optionalFields.age}
                                        onChange={(e: any) => handleOpenBlock(e, "age")} />
                                </AgeBlock>
                                {optionalFields.age &&
                                    <Controller
                                        name="ageLimit"
                                        control={control}
                                        defaultValue={currentCoupon.ageFrom}
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
                                    <MultiSelect
                                        isMulti={true}
                                        options={days}
                                        label="Укажите дни" />}
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
                            {isValid ? <Button
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
                        type="submit"
                        buttonStyle={{ color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }}
                        startIcon={<SaveIcon />}
                    >
                        Сохранить
                    </Button>
                </DownSide>
            </Form>
        </Wrapper>
    )
}
export default UpdateCoupon