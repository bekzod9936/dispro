import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { 
    DeleteIcon, 
    GoBackIcon, 
    PhoneIcon, 
    PlusIcon, 
    PublishIcon, 
    SaveIcon,
    UploadImage } from 'assets/icons/proposals/ProposalsIcons'
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
    Wrapper } from './style'
import { useUploadImage } from './useUploadIMage'
import CropCustomModal from 'components/Custom/CropImageModal/index'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { postCoupon, putCoupon } from 'services/queries/ProposalsQueries'
import Modal from 'components/Custom/Modal'
import { SetDate } from './components/SetDate'

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
    endDate: string,
    image: string,
    price: string,
    startDate: string,
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
    endDate: "2021-10-30",
    image: "",
    price: "",
    startDate: "2021-10-22",
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
    const [publishDate, setPublishDate] = React.useState<string>("")
    const [publish, setPublish] = React.useState(false)
    const { handleUpload, deleteImage } = useUploadImage(setImage)
    const [file, setFile] = React.useState('')
    const [isCropVisible, setIsCropVisible] = React.useState(false)
    const [optionalFields, setOptionalFields] = React.useState<IOptionFields>({
        age: false,
        days: false,
        time: false
    })
    const mutation = useMutation((data: ICoupon) => postCoupon(data), {
        onSuccess: (data) => {
            putCoupon(data.data.data.id, {
                addDay: false,
                publishDate: publishDate
            })
            
        }
    })
    const { control, handleSubmit, register, formState: {errors}} = useForm()
    const options = [
        {
            value: "pharmacy",
            label: "Аптека"
        }, 
        {
            value: "carwash",
            label: "Автомойка"
        }
    ]

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

    const handleUploadImg = (data: any) => {
        setFile(data.target.files[0])
        setIsCropVisible(true)
    }
    
    const onUpdateData = (data: any) => {
        setPeriod(true)
        setCoupon((prev: ICoupon) => ({
            ...prev,
            ageFrom: data.ageLimit || null,
            ageTo: null,
            ageUnlimited: !!!data.ageLimit,
            categoryIds: [],
            companyId: 18,
            count: data.amount,
            currencyId: 1,
            description: data.description,
            image: image,
            price: data.cost,
            title: data.name,
            type: isCoupon ? "1" : "2",
            value: data.percent,
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
    
    const onSave = (data: any) => {
        console.log(data);
        history.goBack()
    }
 
    const handleClose = () => {
        setPeriod(false)
    }

    return (
        <Wrapper >
            <div 
                style={{display: "flex", marginBottom: 30, alignItems: "center"}}>
                <GoBackIcon onClick={handleBack} style={{marginRight: "25px", cursor: "pointer"}}/>
                <Title>
                    Создание {isCoupon ? "купона" : "сертификата"}
                </Title>
            </div>
                <Modal open={period}>
                    <SetDate
                        setDate={setPublishDate} 
                        setPeriod={setPeriod} 
                        mutation={mutation} 
                        handleClose={handleClose} 
                        coupon={coupon}/>
                </Modal>
            <Form onSubmit={publish ? handleSubmit(onUpdateData) : handleSubmit(onSave)}>
                <UpSide>
                    <Container>
                        <LeftSide>
                            <Title>Фотографии</Title>
                            {!image && 
                            <div style={{marginBottom: 30}}>
                            <Header>
                                <p>Можно загрузить фотографию JPG или PNG, минимальное разрешение 400*400рх, размер не более 3Мбайт.</p>
                            </Header>
                            <UploadButton>
                                <label htmlFor="uploadImg">Загрузить фото</label>
                                <input {...register("image", { required: publish})} onChange={handleUploadImg} type="file" id="uploadImg" />
                                <UploadImage />
                            </UploadButton>
                            {errors.image && <ErrorMessage>{t("requiredField")}</ErrorMessage>}
                            </div>}
                            {image && 
                                <ImageBlock>
                                    <img src={image} alt="logo"/>  
                                    <DeleteIcon onClick={handleDelete} />
                                </ImageBlock>}
                            {file && 
                            <CropCustomModal
                                handleUpload={handleUpload}
                                setFile={setFile}
                                setIsCropVisible={setIsCropVisible}
                                open={isCropVisible} 
                                src={file}/>}
                               
                            <Controller 
                                name="name"
                                control={control}
                                rules={{
                                    required: publish
                                }}
                                render={({field}) => (
                                    <Input 
                                        error={!!errors.name}
                                        message={t("requiredField")}
                                        field={field} 
                                        label="Название"/>
                                )}
                            />
                            <Controller 
                                name="percent"
                                control={control}
                                rules={{
                                    required: publish
                                }}
                                render={({field}) => (
                                    <Input 
                                        error={!!errors.percent}
                                        message={t("requiredField")}
                                        field={field} 
                                        label={isCoupon ? `Укажите % купона` : "Укажите сумму сертификата"} 
                                        margin={{laptop: "35px 0"}}/>
                                )}
                            />
                            <Controller
                                name="amount"
                                control={control}
                                rules={{
                                    required: publish
                                }}
                                render={({field}) => (
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
                                    required: publish
                                }}
                                render={({field}) => (
                                    <Input
                                        field={field} 
                                        margin={{laptop: "35px 0"}}
                                        label="Описание" 
                                        type="textarea"
                                        message={t("requiredField")}
                                        error={!!errors.description}
                                        multiline={true}
                                        inputStyle={{height: {desktop: 120, laptop: 90, mobile: 60}}}
                                        />
                                )}
                            />
                            <Controller 
                                name="categories"
                                control={control}
                                rules={{
                                    required: publish
                                }}
                                render={({field}) => (
                                    <MultiSelect 
                                        error={!!errors.categories}
                                        message={t("requiredField")}
                                        field={field}
                                        label="Выберите категорию" 
                                        options={options} 
                                        margin={{laptop: "0 0 35px 0"}}/>
                                )}
                            />
                            <Controller
                                name="cost"
                                control={control}
                                rules={{
                                    required: publish
                                }}
                                render={({field}) => (
                                    <Input 
                                        field={field}
                                        error={!!errors.cost}
                                        message={t("requiredField")}
                                        label={isCoupon ? "Цена купона" : "Цена сертификата"} 
                                        type="number" 
                                        margin={{laptop: "25px 0 35px 0"}}/>
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
                                    render={({field}) => (
                                        <Input 
                                            field={field}
                                            defaultValue={0}
                                            IconStart={<PlusIcon style={{marginLeft: "20px"}}/>} 
                                            label="Возрастное ограничение"/>
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
                                    label="Укажите дни"/>}
                            </AgeWrapper>
                            <AgeWrapper>
                                <AgeBlock>
                                    <h6>Время действия {isCoupon ? "купона" : "сертификата"}</h6>
                                    <CustomToggle 
                                        onChange={(e: any) => handleOpenBlock(e, "time")} />
                                </AgeBlock>
                                {optionalFields.time && 
                                    <div style={{display: "flex"}}>
                                        <Controller
                                            control={control}
                                            name="timeFrom"
                                            render={({field}) => (
                                                <Input margin={{laptop: "0 25px 0 0"}} type="time" field={field}/> 
                                            )}
                                        />   
                                        <Controller
                                            control={control}
                                            name="timeTo"
                                            render={({field}) => (
                                                <Input type="time" field={field} /> 
                                            )}
                                        />   
                                    </div>}
                            </AgeWrapper>
                            <Button 
                                buttonStyle={{bgcolor: "#ffffff", color: "#606EEA"}} 
                                endIcon={<PhoneIcon />}>
                                Показать превью
                            </Button>
                        </RightSide>
                    </Container>
                </UpSide>
                <DownSide>
                    <Button
                        onClick={handleBack} 
                        startIcon={<CancelIcon />} 
                        buttonStyle={{color: "#223367", bgcolor: "#ffffff"}}>
                        Отменить
                    </Button>
                    <Button 
                        onClick={() => setPublish(true)}
                        type="submit"
                        margin={{laptop: "0 25px"}}
                        startIcon={<PublishIcon />}>
                        Опубликовать
                    </Button>
                    <Button
                        onClick={() => setPublish(false)}                        
                        type="submit"
                        buttonStyle={{color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)"}}
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





