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
    LeftSide, 
    RightSide, 
    UploadButton, 
    UpSide, 
    Wrapper } from './style'
import { useUploadImage } from './useUploadIMage'
import CropCustomModal from 'components/Custom/CropImageModal/index'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

interface IOptionFields {
    age: {
        isOpen: boolean,
        value: number | string
    },
    days: {
        isOpen: boolean,
        value: string[]
    },
    time: {
        isOpen: boolean,
        value: {
            from: string | number,
            to: string | number
        }
    }
}

const Coupons = () => {
    const history = useHistory()
    const { t } = useTranslation()
    const [image, setImage] = React.useState('')
    const { handleUpload, deleteImage } = useUploadImage(setImage)
    const [file, setFile] = React.useState('')
    const [isCropVisible, setIsCropVisible] = React.useState(false)
    const [optionalFields, setOptionalFields] = React.useState<IOptionFields>({
        age: {
            isOpen: false,
            value: 0
        },
        days: {
            isOpen: false,
            value: []
        },
        time: {
            isOpen: false,
            value: {
                from: 0,
                to: 0
            }
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


    const handleAgeBlock = (e: any, action: "age" | "time" | "days") => {
        setOptionalFields((prev: IOptionFields) => ({
            ...prev,
            [action]: {
                ...prev[action],
                isOpen: e.target.checked
            }
        }))
        
    }


    const handleUploadImg = (data: any) => {
        setFile(data.target.files[0])
        setIsCropVisible(true)
    }
    
    const handleDelete = () => {
        setFile("");
        setImage("")
        deleteImage(image)
    }
    
    
    const handleBack = () => {
        history.goBack()
    }

    
    const onSubmit = (data: any) => {
        console.log(data);
    }
    console.log(errors);
    

    return (
        <Wrapper onSubmit={handleSubmit(onSubmit)}>
            <div 
                style={{display: "flex", marginBottom: 30, alignItems: "center"}}>
                <GoBackIcon onClick={handleBack} style={{marginRight: "25px", cursor: "pointer"}}/>
                <Title>
                    Создание купона
                </Title>
            </div>
            <Form>
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
                                <input {...register("image", { required: true})} onChange={handleUploadImg} type="file" id="uploadImg" />
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
                                    required: true
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
                                    required: true
                                }}
                                render={({field}) => (
                                    <Input 
                                        error={!!errors.percent}
                                        message={t("requiredField")}
                                        field={field} 
                                        label="Укажите % купона" 
                                        margin={{laptop: "35px 0"}}/>
                                )}
                            />
                            <Controller
                                name="amount"
                                control={control}
                                rules={{
                                    required: true
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
                                    required: true
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
                                    required: true
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
                                    required: true
                                }}
                                render={({field}) => (
                                    <Input 
                                        field={field}
                                        error={!!errors.cost}
                                        message={t("requiredField")}
                                        label="Цена купона" 
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
                                        onChange={(e: any) => handleAgeBlock(e, "age")} />
                                </AgeBlock>
                                {optionalFields.age.isOpen && 
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
                                    <h6>Дни действия купона</h6>
                                    <CustomToggle 
                                        onChange={(e: any) => handleAgeBlock(e, "days")} />
                                </AgeBlock>
                                {optionalFields.days.isOpen && 
                                <MultiSelect 
                                    label="Возрастное ограничение"/>}
                            </AgeWrapper>
                            <AgeWrapper>
                                <AgeBlock>
                                    <h6>Время действия купона</h6>
                                    <CustomToggle 
                                        onChange={(e: any) => handleAgeBlock(e, "time")} />
                                </AgeBlock>
                                {optionalFields.time.isOpen && 
                                    <MultiSelect 
                                        label="Возрастное ограничение"/>}
                            </AgeWrapper>
                            <Button buttonStyle={{bgcolor: "#ffffff", color: "#606EEA"}} endIcon={<PhoneIcon />}>Показать превью</Button>
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
                        margin={{laptop: "0 25px"}}
                        startIcon={<PublishIcon />}>
                        Опубликовать
                    </Button>
                    <Button
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





const ImageBlock = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    img {
        margin-bottom: 25px;
        border-radius: 14px;
        width: 250px;
        margin-top: 15px;
    }
    svg {
        position: absolute;
        cursor: pointer;
        z-index: 20;
        opacity: 0;
       
    }
    &:hover{
        svg {
            opacity: 1;
        }
        &::before{
            opacity: 0.25;
        }
    }
    &::before{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        opacity: 0;
        transition: 200ms all;
}
`