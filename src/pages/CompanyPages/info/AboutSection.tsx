import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SaveIcon } from '../../../assets/icons/InfoPageIcons/InfoPageIcons';
import { CustomButton, SectionWrapper } from '../../../styles/CustomStyles';
import { AboutSectionWrapper, CustomStatic, ScrolableWrapper } from './InfoPageStyes';
import { Text } from '../../../styles/CustomStyles';
import { Flex } from '../../../styles/BuildingBlocks';
import { type } from 'os';
import CustomFileUpload from './CustomFileUpload';
import CustomInput from '../../../components/Custom/CustomInput';
import { appendErrors, Controller, useForm } from 'react-hook-form';
import CustomTextArea from './CustomTextArea';
import CustomMulitpleSelect from './CustomMulitpleSelect';
import { Avatar, Input, InputAdornment, InputLabel } from '@material-ui/core';
import partnerApi from '../../../services/interceptors/companyInterceptor';
import axios from 'axios';
import { STORAGE_URL, URL } from '../../../services/constants/config';
import { VKIcon, FacebookIcon, InstagramIcon, TelegramIcon, TwitterIcon, ViberIcon, WhatsAppIcon, ArrowIcon, ChumBucketIcon } from "../../../assets/icons/InfoPageIcons/AboutIcons"
import { useQuery } from 'react-query';
import { classicNameResolver } from 'typescript';
import { makeStyles } from "@material-ui/core"
import { COLORS } from '../../../services/Types/enums';
import InlineFilters from '../statistics/InlineFilters';
import { useAppDispatch } from '../../../services/redux/hooks';
import { setCompanyState } from '../../../services/redux/Slices/authSlice';
import Resizer from "react-image-file-resizer";



const useStyles = makeStyles({
    avatar: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        position: 'relative',
        '&:hover': {
            filter: 'brightness(0.8)',
            cursor: 'pointer',
            '& $delete': {
                visibility: 'visible',
            }
        },

    },

    delete: {
        visibility: 'visible',
        position: 'absolute',
        top: '40%',
        left: '12%',
        '&:hover': {
            transform: 'scale(1.4)',
            cursor: 'pointer',
            '& $avatar': {
                filter: 'brightness(0.8)'
            }
        }
    }
})
interface IInputArray {
    type: "file" | "text" | "textarea" | "multipleselect" | "text_withbutton" | "static",
    label: string,
    aboveLabel: string,
    aboveInput: string,
    name: string
}
const inputsArray: IInputArray[] = [
    {
        type: "file",
        label: "upload_photo",
        aboveLabel: "logo_text",
        aboveInput: "logo",
        name: "logo"
    },
    {
        type: "text",
        label: "title",
        aboveLabel: "",
        aboveInput: "",
        name: "title"
    },
    {
        type: "text",
        label: "company_direction",
        aboveLabel: "",
        aboveInput: "",
        name: "company_direction"
    },
    {
        type: "textarea",
        label: "description",
        aboveLabel: "",
        aboveInput: "",
        name: "description"
    },
    {
        type: "static",
        label: "currency",
        aboveLabel: "",
        aboveInput: "",
        name: "currency"
    },
    {
        type: "multipleselect",
        label: "chose_categories",
        aboveLabel: "",
        aboveInput: "",
        name: "categories"
    },
    {
        type: "text_withbutton",
        label: "keywords",
        aboveLabel: "",
        aboveInput: "",
        name: "keywords"
    },


];

const secondColumn: IInputArray[] = [
    {
        type: "text",
        label: "phoneNumber",
        aboveLabel: "phone_above_label_text",
        aboveInput: "phone",
        name: "phoneNumber"
    },
    {
        type: "text",
        label: "linkName",
        aboveLabel: "companyLink_text",
        aboveInput: "companyLink",
        name: "linkName"
    },
    {
        type: "text",
        label: "link",
        aboveLabel: "",
        aboveInput: "",
        name: "link"
    },

]
interface IProps {
    currentFilial: any,
    setSection: any
}

const fetchCategories = () => {
    const res = partnerApi.get("/directory/category");
    return res;
}

const dataURIToBlob = (dataURI: any) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
        splitDataURI[0].indexOf("base64") >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
};

const resizeFile = (file: any) => (new Promise((resolve) => {
    Resizer.imageFileResizer(
        file,
        400,
        400,
        "png",
        100,
        0,
        (uri: any) => {
            resolve(uri);
        },
        "base64",
        400,
        400
    );
})

)


const AboutSection: React.FC<IProps> = ({ currentFilial, setSection }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const response = useQuery(["categories"], fetchCategories, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data: any) => {
            setOptions(data.data.data);

        }
    })

    const [options, setOptions] = useState<any>([]);
    const socialLinks = [
        { name: "Telegram", Icon: <TelegramIcon /> },
        { name: "Twitter", Icon: <TwitterIcon /> },
        { name: "Instagram", Icon: <InstagramIcon /> },
        { name: "Facebook", Icon: <FacebookIcon /> },
        { name: "WhatsApp", Icon: <WhatsAppIcon /> },
        { name: "Viber", Icon: <ViberIcon /> },
        { name: "Vkontakte", Icon: <VKIcon /> },
    ]
    const [logo, setLogo] = useState<any>("");
    let companyId: any = localStorage.getItem("companyId");
    let companyToken = localStorage.getItem("companyToken")
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const [socialLinksState, setSociaLinksState] = useState<any>([]);
    const [values, setValues] = useState<any>([]);
    const [keywords, setKeywords] = useState<any>([]);
    const [keywordField, setKeywordField] = useState("");
    const formData = new FormData();
    const onFormSubmit = async (data: any) => {
        console.log(data);
        await partnerApi.put("/directory/company", {
            annotation: data.company_direction,
            categories: data.categories || values,
            companyId: +companyId,
            currencyId: 1,
            description: data.description,
            isHalol: true,
            isKosher: false,
            keyWords: keywords?.join(","),
            linkEnable: false,
            links: [{ name: data.linkName, address: data.link, enable: true, id: 0 }],
            logo: logo || "",
            name: data.title,
            // socialLinks: [
            //     { name: "Telegram", value: "" },
            //     { name: "Twitter", value: "" },
            //     { name: "Instagram", value: "" },
            //     { name: "Facebook", value: "" },
            //     { name: "WhatsApp", value: "" },
            //     { name: "Viber", value: "" },
            //     { name: "Vkontakte", value: "" },
            // ],
            socialLinks: socialLinksState,
            telNumber: data.phoneNumber,
        })
        setSection("address")

    }




    const handleKeywordsClose = (item: any) => {
        let copy = [...keywords];
        console.log(copy);

        console.log(item);


        let filtered = copy.filter((value: any, index: number) => {
            console.log(index, "from check1");
            console.log(item, "from check 2");
            return index != item
        });
        console.log(copy);

        setKeywords(filtered);
    }
    const handleDeleteLogo = () => {
        setLogo('');
    }
    useEffect(() => {
        console.log(currentFilial);
        if (currentFilial.currencyId) {
            setLogo(currentFilial.logo)

            setValue("title", currentFilial?.name, { shouldValidate: true, shouldDirty: true })
            setValue("description", currentFilial?.description, { shouldValidate: true, shouldDirty: true })
            setValue("link", currentFilial?.links[0]?.address, { shouldValidate: true, shouldDirty: true })
            setValue("linkName", currentFilial?.links[0]?.name, { shouldValidate: true, shouldDirty: true })
            setValue("phoneNumber", currentFilial?.telNumber, { shouldValidate: true, shouldDirty: true })
            setValue("company_direction", currentFilial?.annotation, { shouldValidate: true, shouldDirty: true })
            setValue("keywords", currentFilial?.keywords, { shouldValidate: true, shouldDirty: true });
            // setValue("categories", currentFilial.categories, { shouldValidate: true, shouldDirty: true })
            setSociaLinksState(currentFilial.socialLinks);
            setValues(currentFilial.categories);


        }
    },
        [currentFilial]
    )


    const handleFileUploadChange = async (e: any) => {

        const file = e.target.files[0];
        const image = await resizeFile(file);
        console.log(image);
        const newFile = dataURIToBlob(image);
        formData.append('itemId', companyId);
        formData.append('fileType', 'companyLogo');
        formData.append('file', newFile, 'logo.png');

        const response = await axios.post(`${STORAGE_URL}/company/upload`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                'authorization': 'Bearer ' + companyToken,
                'langId': 1
            }
        })
        setLogo(response.data.data.link)

    }
    const handleAddKeywordClick = () => {
        console.log('Addd');
        setKeywords([...keywords, keywordField]);
        setKeywordField("");

    }
    const handleConnect = (name: any) => {
        if (name === "Telegram") {
            console.log(name);

        }
        else if (name === "Twitter") {
            console.log(name);

        }
        else if (name === "Instagram") {
            console.log(name);

        }
        else if (name === "Facebook") {
            console.log(name);

        }
        else if (name === "Vkontakte") {
            console.log(name);

        }
        else if (name === "Whatsapp") {
            console.log(name);

        }
        else if (name === "Viber") {
            console.log(name);

        }

    }
    return (


        <>

            <AboutSectionWrapper>
                {(response?.data?.data && currentFilial && options.length) &&
                    <form onSubmit={handleSubmit(onFormSubmit)} style={{ width: "100%" }}>
                        <ScrolableWrapper style={{ padding: "50px 40px", height: "1200px" }}>



                            <div style={{ display: "flex", height: '65vh', justifyContent: 'start', alignItems: "flex-start", overflowY: "scroll", flexDirection: "row" }}>
                                <Flex flexDirection="column" alignItems="center" width="50%" margin="0px 0px 200px 0px">
                                    {inputsArray.map((item: any) => {
                                        if (item.type === "file") {
                                            if (!logo) {
                                                return <CustomFileUpload aboveInput={item.aboveInput} aboveLabel={item.aboveLabel} label={item.label} onChange={handleFileUploadChange} />
                                            }
                                            else {
                                                return <div style={{ width: '85%' }}>
                                                    <div style={{ position: 'relative' }}>
                                                        <Avatar className={classes.avatar} src={logo} style={{ borderRadius: "14px", width: "150px", height: "150px" }}>


                                                        </Avatar>
                                                        <div className={classes.delete} onClick={handleDeleteLogo} >
                                                            <ChumBucketIcon />
                                                        </div>

                                                    </div>



                                                </div>
                                            }
                                        }
                                        else if (item.type === "text") {
                                            return (<>
                                                <Controller
                                                    control={control}
                                                    name={item?.name}
                                                    rules={{ required: true }}
                                                    render={({ field }) => {

                                                        return <CustomInput flexStyle={{ width: "85%" }} style={{ width: "100%" }} field={field} label={item.label} aboveInput={item.aboveInput} aboveLabel={item.aboveLabel} />


                                                    }
                                                    } />
                                                {errors[item.name]?.type === "required" && <div style={{ width: "80%", alignSelf: "start" }}>
                                                    <Text marginLeft="10%" fontSize="12px" fontWeight={300} color="red">
                                                        {t("requiredField")}
                                                    </Text>
                                                </div>}

                                            </>)
                                        }
                                        else if (item.type === "textarea") {
                                            return <Controller
                                                control={control}
                                                name={item.name}
                                                render={({ field }) => {
                                                    return <CustomTextArea field={field} label={item.label} />
                                                }
                                                } />
                                        }
                                        else if (item.type === "multipleselect") {

                                            return <Controller
                                                control={control}
                                                name={item.name}
                                                render={({ field }) => {
                                                    return <CustomMulitpleSelect field={field} values={values} setValues={setValues} options={options} label={item.label} />
                                                }
                                                } />


                                        }


                                        else if (item.type === "static") {
                                            return <div style={{ width: "85%", marginTop: "25px" }}>
                                                <label htmlFor="static"><Text fontSize="16px" fontWeight={700} color="#c7c7c7">
                                                    {t(item.label)}
                                                </Text></label>
                                                <CustomStatic id="static">
                                                    {t("Uzbkeistan(UZS)")}
                                                </CustomStatic>
                                            </div>
                                        }
                                        else if (item.type === "text_withbutton") {
                                            return (
                                                <Controller
                                                    name={item.name}
                                                    control={control}
                                                    render={({ field }) => {

                                                        return (
                                                            <div style={{ width: "85%", marginTop: "25px" }}>
                                                                <InputLabel style={{ marginBottom: "10px" }} htmlFor="text_withbutton">
                                                                    <Text fontSize='16px' fontWeight={700} color="#C2C2C2">{t(item.label)}</Text>
                                                                </InputLabel>
                                                                <Input
                                                                    disableUnderline
                                                                    onChange={(e) => setKeywordField(e.target.value)}
                                                                    value={keywordField}
                                                                    style={{
                                                                        padding: "15px 0px 15px 20px",
                                                                        boxSizing: "border-box",
                                                                        width: "100%",
                                                                        border: "1px solid #c4c4c4",
                                                                        borderRadius: "14px",
                                                                        overflow: 'hidden'
                                                                    }}
                                                                    endAdornment={<InputAdornment position="end" style={{ height: "100%", margin: "0px" }}>

                                                                        <div onClick={handleAddKeywordClick} style={{ background: COLORS.purple, cursor: "pointer", width: "80px", height: "62px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                            <ArrowIcon />
                                                                        </div>

                                                                    </InputAdornment>}

                                                                />
                                                                {keywords.length ? <InlineFilters filterItems={keywords} handleClose={handleKeywordsClose} /> : null}

                                                            </div>


                                                        )
                                                    }}


                                                />


                                            )
                                        }
                                    }
                                    )}

                                </Flex>
                                <Flex flexDirection="column" alignItems="center" width="50%" margin="0px">
                                    {secondColumn.map((item: any) => {
                                        if (item.type === "text") {
                                            return (<Controller
                                                control={control}
                                                name={item.name}
                                                render={({ field }) => {
                                                    return <CustomInput flexStyle={{ width: "85%" }} field={field} label={item.label} aboveInput={item.aboveInput} aboveLabel={item.aboveLabel} />
                                                }
                                                } />)
                                        }
                                    })}
                                    <div style={{ width: "85%", marginTop: "25px" }}>
                                        <Text>{t("socialLinks")}</Text>
                                    </div>
                                    <div style={{ width: "85%", justifyContent: "space-between", marginTop: "20px", display: "flex", flexDirection: "column" }}>
                                        {socialLinks.map(({ Icon, name }) => {
                                            return (
                                                <Flex justifyContent="space-between" width="100%" alignItems="center">
                                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}> <div style={{ background: "#606EEA", display: "flex", justifyContent: "center", alignItems: "center", width: "45px", height: "50px", borderRadius: "14px", margin: "10px" }}> {Icon}</div> <Text marginLeft="10px">{name}</Text></div>
                                                    <div onClick={() => handleConnect(name)}><Text fontSize="16px" fontWeight={300} color="#3492FF">{t("connect")}</Text></div>
                                                </Flex>
                                            )
                                        })}

                                    </div>
                                </Flex>
                            </div>

                        </ScrolableWrapper>
                        <div className="areaforsavebutton" style={{
                            position: "fixed",
                            bottom: "-0px",
                            background: "white",
                            width: "80%",
                            display: 'flex',
                            justifyContent: "center"
                        }}>
                            <div style={{ width: "90%", borderTop: "1px solid #c4c4c4", padding: "20px 0px", }}>
                                <CustomButton>
                                    <SaveIcon />
                                    <Text marginLeft="15px" color="white">{t("save")} </Text>
                                </CustomButton>
                            </div>

                        </div>
                    </form>
                }
            </AboutSectionWrapper>


        </>

    );
}

export default AboutSection;
