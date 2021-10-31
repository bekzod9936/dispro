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
    RightSide,
    UploadButton,
    UpSide,
    Wrapper
} from './style'
import CropCustomModal from 'components/Custom/CropImageModal/index'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { updateCoupon, postCoupon } from 'services/queries/ProposalsQueries'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { RootState } from 'services/redux/store'
import { resetCurrentCoupon } from 'services/redux/Slices/proposals/proposals'
import { days } from '../Coupons/constants'
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad'
import { useUploadImage } from '../Coupons/hooks/useUploadIMage'
import { PreviewModal } from '../../components/PreviewModal'
import { PreviewMessage } from '../Coupons/style'
import { SetDate } from '../Coupons/components/SetDate'
import Modal from 'components/Custom/Modal'
import { useFetchCategories } from '../UpdateCoupon/useFetchCategories'
import { getWeekDays } from '../../utils/getValidDate'
import MFormatInput from 'components/Custom/MoneyInput'

const RePublish = () => {
    const { currentCoupon } = useAppSelector((state: RootState) => state.proposals)
    const { t } = useTranslation()
    const [file, setFile] = React.useState<string>("")
    const [isCoupon, setIsCoupon] = React.useState<boolean>(true)
    const [image, setImage] = React.useState<string>(currentCoupon.image)
    const [coupon, setCoupon] = React.useState<any>()
    const [chooseDate, setChooseDate] = React.useState<boolean>(false)
    const dispatch = useAppDispatch()
    const [isCropVisible, setIsCropVisible] = React.useState<boolean>(false)
    const history = useHistory()
    const [categories, setCategories] = React.useState<any>({
        defaults: [],
        categories: []
    })
    const [publish, setPublish] = React.useState<boolean>(false)
    const { handleUpload, deleteImage } = useUploadImage(setImage)
    const {
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors, isValid },
        control } = useForm({
            mode: "onChange",
            shouldFocusError: true,
            reValidateMode: "onChange",
        })
    const [previewModal, setPreviewModal] = React.useState<boolean>(false)
    const [optionalFields, setOptionalFields] = React.useState(
        {
            age: !currentCoupon.ageUnlimited,
            days: !!currentCoupon.settings && currentCoupon?.settings?.weekDays?.length !== 7,
            time: !!currentCoupon.settings && !(currentCoupon?.settings?.time?.from === "00:00" && currentCoupon?.settings?.time?.to === "23:59")
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

    const _ = useFetchCategories(setCategories, currentCoupon.categoryIds)

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
            id: currentCoupon.id,
            image: image,
            type: currentCoupon.type,
            ageTo: null,
            settings: {
                weekDays: optionalFields.days ? data.days.map((el: any) => el.id) : [0, 1, 2, 3, 4, 5, 6],
                time: {
                    from: !optionalFields.time ? "00:00" : data.timeFrom,
                    to: !optionalFields.time ? "23:59" : data.timeTo
                }
            }
        }
        await postCoupon(validData)
        setTimeout(() => history.goBack(), 1000)
        dispatch(resetCurrentCoupon())
    }

    const onPublish = (data: any) => {
        setChooseDate(true)
        setCoupon({
            title: data.name,
            count: data.amount,
            ageUnlimited: !!!data.ageLimit || !optionalFields.age,
            price: data.cost,
            value: data.percent.toString().split(" ").join(''),
            type: isCoupon ? "1" : "2",
            currencyId: 1,
            categoryIds: data.categories.map((el: any) => el.id),
            companyId: 18,
            image: image,
            ageFrom: optionalFields.age ? (data.ageLimit || null) : null,
            ageTo: null,
            description: data.description,
            settings: {
                weekDays: optionalFields.days ? data.days.map((el: any) => el.id) : [0, 1, 2, 3, 4, 5, 6],
                time: {
                    from: !optionalFields.time ? "00:00" : data.timeFrom,
                    to: !optionalFields.time ? "23:59" : data.timeTo
                }
            }
        })
    }


    const handleUploadImg = (data: any) => {
        setFile(data.target.files[0])
        setIsCropVisible(true)
    }

    console.log(optionalFields.time);

    const handleDelete = () => {
        deleteImage(image)
        setImage("")
    }
    React.useEffect(() => {
        setValue("categories", categories.defaults)
    }, [categories.defaults])
    return (
        <Wrapper>
            <div
                style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
                <GoBackIcon onClick={handleBack} style={{ marginRight: "25px", cursor: "pointer" }} />
                <Title>
                    Восстановление {isCoupon ? "купона" : "сертификата"}
                </Title>
            </div>
            <Modal open={chooseDate}>
                <SetDate
                    coupon={coupon}
                    handleClose={() => setChooseDate(false)}
                    handleUpdate={mutate}
                />
            </Modal>
            <PreviewModal
                price={watch("cost")}
                isCoupon={isCoupon}
                value={watch("percent")}
                image={image}
                open={previewModal}
                handleClose={() => setPreviewModal(false)}
                ageFrom={watch("ageLimit")} />
            <Form onSubmit={publish ? handleSubmit(onPublish) : handleSubmit(onSave)}>
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
                                    <MFormatInput
                                        {...field}
                                        defaultValue={currentCoupon.value}
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
                                defaultValue={categories.defaults}
                                rules={{
                                    required: true
                                }}
                                render={({ field }) => (
                                    <MultiSelect
                                        isMulti={true}
                                        error={!!errors.categories}
                                        message={t("requiredField")}
                                        field={field}
                                        defaultValue={categories.defaults}
                                        label="Выберите категорию"
                                        options={categories.categories}
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
                                        checked={optionalFields.days}
                                        onChange={(e: any) => handleOpenBlock(e, "days")} />
                                </AgeBlock>
                                {optionalFields.days &&
                                    <Controller
                                        name="days"
                                        control={control}
                                        rules={{
                                            required: optionalFields.days
                                        }}
                                        defaultValue={getWeekDays(currentCoupon?.settings?.weekDays) || days}
                                        render={({ field }) => (
                                            <MultiSelect
                                                error={errors.days}
                                                message={t("requiredField")}
                                                defaultValue={getWeekDays(currentCoupon?.settings?.weekDays) || days}
                                                isMulti
                                                field={field}
                                                options={days}
                                                label="Укажите дни" />
                                        )}
                                    />}
                            </AgeWrapper>
                            <AgeWrapper>
                                <AgeBlock>
                                    <h6>Время действия {isCoupon ? "купона" : "сертификата"}</h6>
                                    <CustomToggle
                                        checked={optionalFields.time}
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
                                            defaultValue={currentCoupon?.settings?.time?.from}
                                            render={({ field }) => (
                                                <Input
                                                    error={errors.timeFrom}
                                                    message={t("requiredField")}
                                                    margin={{ laptop: "0 25px 0 0" }}
                                                    type="time"
                                                    defaultValue={currentCoupon?.settings?.time?.from}
                                                    field={field} />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="timeTo"
                                            defaultValue={currentCoupon?.settings?.time?.to}
                                            rules={{
                                                required: optionalFields.time
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    error={errors.timeTo}
                                                    message={t("requiredField")}
                                                    defaultValue={currentCoupon?.settings?.time?.to}
                                                    type="time"
                                                    field={field} />
                                            )}
                                        />
                                    </div>}
                            </AgeWrapper>
                            {isValid ? <Button
                                margin={{ laptop: "40px 0 0 0" }}
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
                        Сохранить
                    </Button>
                </DownSide>
            </Form>
        </Wrapper>
    )
}
export default RePublish