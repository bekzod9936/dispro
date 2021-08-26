import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CustomModal from '../../../components/Custom/CustomModal';
import { FONT_SIZE, FONT_WEIGHT } from '../../../services/Types/enums';
import { Flex } from '../../../styles/BuildingBlocks';
import { CustomButton, ModalComponent } from '../../../styles/CustomStyles';
import { Text } from "../../../styles/CustomStyles"
import ReactCrop from "react-image-crop"
import { SaveIcon } from '../../../assets/icons/InfoPageIcons/InfoPageIcons';
import { useTranslation } from 'react-i18next';
import "react-image-crop/dist/ReactCrop.css"
import { setFilterIsOpen } from '../../../services/redux/Slices/clientStatistics';
import NewsCard from './NewsCard';
import cropbackground from '../../../assets/images/CropRename.png'
import { CancelIcon } from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import { resolve } from 'dns';
import partnerApi from '../../../services/interceptors/companyInterceptor';
import axios from 'axios';
import { STORAGE_URL } from '../../../services/constants/config';

interface IProps {
    isCropModalVisible: boolean,
    src: any,
    setOuterLink?: any,
    setIsCropModalVisible: Dispatch<SetStateAction<boolean>>

}

const CropImageModal: React.FC<IProps> = ({ isCropModalVisible, src, setOuterLink, setIsCropModalVisible }) => {
    const { t } = useTranslation();
    const [image, setImage] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<any>(null);
    const [complete, setComplete] = useState(0);
    let companyToken = localStorage.getItem("companyToken");
    const [srcUrl, setSrcUrl] = useState<any>(null);
    const [link, setLink] = useState<string>('')
    const [file, setFile] = useState<any>(null);
    const [onCompleteState, setOnComplete] = useState<boolean>(false);
    // console.log(src);
    const [crop, setCrop] = useState<any>({
        unit: '%', width: 30, aspect: 16 / 9

    })


    useEffect(() => {
        setSrcUrl(URL.createObjectURL(src))
        //console.log("complete");
    }, [src])

    const [blob, setBlob] = useState<any>(null);

    const handleSave = async (e: any) => {
        console.log(imageUrl);
        e.preventDefault();
        if (imageUrl) {

            fetch(imageUrl).then((res: any) => res.blob())
                .then((blob) => new File([blob], "news_image.png", { type: "image/png" }))
                .then(async (file) => {
                    let formData = new FormData()
                    formData.append("file", file);
                    try {
                        let response = await axios.post(`${STORAGE_URL}/news/upload`, formData, {
                            headers: {
                                "authorization": "Bearer " + companyToken,
                                langId: 1
                            }
                        })
                        setOuterLink(response.data.data.link);
                        setIsCropModalVisible(false);
                        URL.revokeObjectURL(imageUrl);
                    }
                    catch (err) {
                        console.log(err);

                    }
                })



        }


        // try {
        //     let response = await axios.post(`${STORAGE_URL}/news/upload`, formData, {
        //         headers: {
        //             "authorization": "Bearer " + companyToken,
        //             langId: 1
        //         }
        //     })
        //     console.log(response);

        //     //     setOuterLink(response.data.data.link);
        // } catch (err) {
        //     console.log(err);

        // }

        ;

    }


    const getCroppedImage = async (type: string) => {
        console.log("onComplete");

        if (image) {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");

            const pixelRatio = window.devicePixelRatio;
            canvas.width = crop.width * pixelRatio;
            canvas.height = crop.height * pixelRatio;
            ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            if (ctx) {
                ctx.imageSmoothingQuality = "high";
            }


            ctx?.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height,

            )

            if (type === "complete") {
                let base64 = canvas.toDataURL("image/png", "high");
                setImageUrl(base64)

            }

        }
    }


    return (
        <CustomModal open={isCropModalVisible}>
            <ModalComponent>
                <div style={{}}>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <Text fontSize={FONT_SIZE.large} fontWeight={FONT_WEIGHT.bold}>
                            Выберите нужную область
                            {/* <input type="file" onChange={(e: any) => setFile()} /> */}
                        </Text>
                    </div>
                    <Flex margin="0px" justifyContent="start" alignItems="flex-start">
                        <div>

                            <div style={{ width: "550px", height: "375px", objectFit: "contain", background: `url(${cropbackground})`, borderRadius: "14px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>

                                <div style={{ width: "400px", height: "auto" }}>
                                    {(src) && <ReactCrop

                                        src={srcUrl}
                                        crop={crop}
                                        onImageLoaded={setImage}
                                        onComplete={() => getCroppedImage("complete")}
                                        //  onDragEnd={}
                                        onChange={setCrop}
                                    />}
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "300px", height: "100%" }}>
                            {imageUrl &&
                                <div style={{ marginLeft: "20px" }}>
                                    <div style={{ marginBottom: "15px" }}><Text fontSize={FONT_SIZE.mediumPlus} color="#c4c4c4">{t("newsPreview")}</Text></div>
                                    <NewsCard src={imageUrl} text="newsCardSampleText" title="newsCardSampleTitle" />

                                </div>
                            }
                        </div>

                    </Flex>

                </div>
                <div style={{ marginTop: "20px", display: "flex" }}>
                    <CustomButton background="white">
                        <CancelIcon />
                        <Text marginLeft="10px">{t("cancel")}</Text>
                    </CustomButton>
                    <CustomButton onClick={(e) => { handleSave(e) }}    >
                        <SaveIcon />
                        <Text color="white" marginLeft="10px">{t("save")}</Text>
                    </CustomButton>
                </div>

            </ModalComponent>
        </CustomModal>
    );
}

export default CropImageModal;
