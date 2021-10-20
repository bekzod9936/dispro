import { Radio, Switch } from '@material-ui/core'
import { CancelIcon, CoinsIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { DeleteIcon, GoBackIcon, PhoneIcon, PlusIcon, PublishIcon, SaveIcon, UploadImage } from 'assets/icons/proposals/ProposalsIcons'
import Button from 'components/Custom/Button'
import CustomToggle from 'components/Custom/CustomToggleSwitch'
import Input from 'components/Custom/Input'
import MultiSelect from 'components/Custom/MultiSelect'
import { TextArea } from 'components/Custom/TextArea'
import Title from 'components/Custom/Title'
import CropImageModal from 'components/Custom/CropImageModal'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import { uploadImg } from 'services/queries/ProposalsQueries'
import { AgeBlock, AgeWrapper, Container, DownSide, Form, Header, LeftSide, RightSide, UploadButton, UpSide, Wrapper } from './style'
import { useUploadImage } from './useUploadIMage'
import CropCustomModal from 'components/Custom/CropImageModal/index'
import styled from 'styled-components'

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
    const { control, handleSubmit, watch, formState: {errors}} = useForm()
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

    // const mutation = useMutation((data: any) => uploadImg(data))

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
                            {!image && <>
                            <Header>
                                <p>Можно загрузить фотографию JPG или PNG, минимальное разрешение 400*400рх, размер не более 3Мбайт.</p>
                            </Header>
                            <UploadButton>
                                <label htmlFor="uploadImg">Загрузить фото</label>
                                <input onChange={handleUploadImg} type="file" id="uploadImg" />
                                <UploadImage />
                            </UploadButton></>}
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
                                    <Input field={field} label="Название"/>
                                )}
                            />
                            <Input label="Укажите % купона" margin={{laptop: "25px 0"}}/>
                            <Input label="Количество" />
                            <TextArea 
                                container={{maxWidth: "none", width: "100%"}}
                                title="Описание" 
                                textarea={{maxWidth: "none", width: "100%", minHeight: "124px"}}/>
                            <MultiSelect label="Выберите категорию" options={options} margin={{laptop: "0 0 20px 0"}}/>
                            <Input label="Цена купона" type="number" margin={{laptop: "25px 0"}}/>
                        </LeftSide>
                        <RightSide>
                            <AgeWrapper>
                                <AgeBlock>
                                    <h6>Добавить возрастное ограничение</h6>
                                    <CustomToggle 
                                        onChange={(e: any) => handleAgeBlock(e, "age")} />
                                </AgeBlock>
                                {optionalFields.age.isOpen && 
                                <Input 
                                    IconStart={<PlusIcon style={{marginLeft: "20px"}}/>} 
                                    label="Возрастное ограничение"/>}
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