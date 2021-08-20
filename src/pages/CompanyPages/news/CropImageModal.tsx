import React, { useEffect, useState } from 'react';
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


interface IProps {
    isCropModalVisible: boolean,
    src: any,

}

const CropImageModal: React.FC<IProps> = ({ isCropModalVisible, src }) => {
    const { t } = useTranslation();
    const [image, setImage] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [file, setFile] = useState<any>(null);
    // console.log(src);
    const [crop, setCrop] = useState<any>({
        unit: '%', width: 30, aspect: 16 / 9

    })



    const [blob, setBlob] = useState<any>(null);
    console.log(image, "IMage");


    const getCroppedImage = () => {
        if (image) {
            const canvas = document.createElement("canvas");
            const scaleX = image.natiralWidth / image.width;
            const scaleY = image.natiralHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(
                image,
                crop.x = scaleX,
                crop.y = scaleY,
                crop.width = scaleX,
                crop.height = scaleY,
                0,
                0,
                crop.width,
                crop.height,

            )

            return canvas.toBlob((blob) => {
                setBlob(blob);
                //  setImageUrl(URL.createObjectURL(blob));
            }, "image/jpeg", 1)

        }
    }


    return (
        <CustomModal open={isCropModalVisible}>
            <ModalComponent>
                <div style={{}}>
                    <Flex margin="0px">
                        <div>
                            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                                <Text fontSize={FONT_SIZE.large} fontWeight={FONT_WEIGHT.bold}>
                                    Выберите нужную область
                                    {/* <input type="file" onChange={(e: any) => setFile()} /> */}
                                </Text>
                            </div>
                            <div style={{ width: "450px", height: "375px", objectFit: "contain" }}>
                                {(src) && <ReactCrop

                                    src={URL.createObjectURL(src)}
                                    crop={crop}
                                    onImageLoaded={setImage}
                                    // onComplete={getCroppedImage}
                                    onChange={setCrop}
                                />}
                            </div>
                        </div>
                        <div>
                            {blob &&
                                <NewsCard src={URL.createObjectURL(blob)} text="sampleText" title="sampleTitle" />}
                        </div>

                    </Flex>

                </div>
                <div>
                    <CustomButton>
                        <SaveIcon />
                        <Text color="white">{t("save")}</Text>
                    </CustomButton>
                </div>

            </ModalComponent>
        </CustomModal>
    );
}

export default CropImageModal;
