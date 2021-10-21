import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { GoBackIcon, PhoneIcon, PlusIcon, PublishIcon, SaveIcon, UploadImage } from 'assets/icons/proposals/ProposalsIcons'
import Button from 'components/Custom/Button'
import CustomToggle from 'components/Custom/CustomToggleSwitch'
import Input from 'components/Custom/Input'
import MultiSelect from 'components/Custom/MultiSelect'
import { TextArea } from 'components/Custom/TextArea'
import Title from 'components/Custom/Title'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { AgeBlock, AgeWrapper, Container, DownSide, Form, Header, LeftSide, RightSide, UpSide, Wrapper } from './style'

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
const Certificates = () => {
    const history = useHistory()
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
    const { register, handleSubmit, watch, formState: {errors}} = useForm()
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
    
    const handleBack = () => {
        history.goBack()
    }

    const onSubmit = (data: any) => {
        console.log(data);
        
    }

    return (
        <Wrapper>
            <div 
                style={{display: "flex", marginBottom: 30, alignItems: "center"}}>
                <GoBackIcon onClick={handleBack} style={{marginRight: "25px", cursor: "pointer"}}/>
                <Title>
                    Создание Сертификата
                </Title>
            </div>
            <Form>
                <UpSide>
                    <Container>
                        <LeftSide>
                            <Header>
                                <h5>Фотографии</h5>
                                <p>Можно загрузить фотографию JPG или PNG, минимальное разрешение 400*400рх, размер не более 3Мбайт.</p>
                            </Header>
                            <Button 
                                buttonStyle={{color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)"}} 
                                endIcon={<UploadImage />}
                                margin={{laptop: "0 0 25px 0"}}>
                                Загрузить фото
                            </Button>
                            <Input label="Название"/>
                            <Input label="Укажите % Сертификата" margin={{laptop: "25px 0"}}/>
                            <Input label="Количество" />
                            <TextArea 
                                container={{maxWidth: "none", width: "100%"}}
                                title="Описание" 
                                textarea={{maxWidth: "none", width: "100%", minHeight: "124px"}}/>
                            <MultiSelect label="Выберите категорию" options={options} margin={{laptop: "0 0 20px 0"}}/>
                            <Input label="Цена Сертификата" type="number" margin={{laptop: "25px 0"}}/>
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
                                    <h6>Дни действия Сертификата</h6>
                                    <CustomToggle 
                                        onChange={(e: any) => handleAgeBlock(e, "days")} />
                                </AgeBlock>
                                {optionalFields.days.isOpen && 
                                <MultiSelect 
                                    label="Укажите дни"/>}
                            </AgeWrapper>
                            <AgeWrapper>
                                <AgeBlock>
                                    <h6>Время действия Сертификата</h6>
                                    <CustomToggle 
                                        onChange={(e: any) => handleAgeBlock(e, "time")} />
                                </AgeBlock>
                                {optionalFields.time.isOpen && 
                                    <MultiSelect 
                                        label="Укажите временной промежуток"/>}
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
                        margin={{laptop: "0 25px"}}
                        startIcon={<PublishIcon />}>
                        Опубликовать
                    </Button>
                    <Button
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


export default Certificates