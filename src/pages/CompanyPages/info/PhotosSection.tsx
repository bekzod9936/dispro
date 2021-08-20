import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageIcon, ImageIconPurple, SaveIcon } from '../../../assets/icons/InfoPageIcons/InfoPageIcons';
import { Flex } from '../../../styles/BuildingBlocks';
import { CustomButton, Text } from '../../../styles/CustomStyles'
import { ButtonLabel, ImageLabel } from './InfoPageStyes';
import NoPhotos from '../../../assets/images/NoPhotos.png'
import partnerApi from '../../../services/interceptors/companyInterceptor';
import { STORAGE_URL } from '../../../services/constants/config';
const PhotosSection = ({ imgs }: any) => {
    const [images, setImages] = useState<any>(imgs);
    let companyToken = localStorage.getItem("companyToken")
    let companyId = localStorage.getItem("companyId")
    const { t } = useTranslation();
    const formData = new FormData()

    const handleFileUpload = async (e: any) => {
        formData.append('itemId', companyId || "");
        formData.append('fileType', 'companyImage');
        formData.append('file', e.target.files[0]);
        const response = await axios.post(`${STORAGE_URL}/company/upload`, formData, {
            headers: {
                authorization: 'Bearer ' + companyToken,
                langId: 1
            }
        })
        setImages([...images, response.data.data.link]);
    }

    const handleSaveButton = async () => {
        await partnerApi.put("/directory/company/images", {
            images: images
        });
    }

    return (
        <>
            <Flex flexDirection="column" flexGrow="1" width="100%" alignItems="center">
                {(images.length > 0) ? (<>
                    <div style={{ width: "70%", alignSelf: "start", marginLeft: "3%" }}>
                        <div>
                            <Text fontSize="16px" fontWeight={300}>
                                Можно загрузить еще {10 - images.length} фотографий JPG или PNG, минимальное разрешение 540*480рх, размер не более 3Мбайт.
                            </Text>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <Text fontSize="16px" fontWeight={300}>
                                Вы можете изменить порядок фотографий перетаскивая их: первая фотография будет использована как фон для
                                карточки вашего заведения в мобильном приложении.
                            </Text>

                        </div>


                    </div>
                    <div style={{ flexGrow: 1, width: "100%" }} >
                        <Flex margin="20px 0px 0px 0px" width="90%" flexWrap="wrap" justifyContent="start">
                            {images.map((item: any) => {
                                return <div style={{ marginRight: "20px", marginTop: "20px", borderRadius: "14px", overflow: "hidden", width: "230px", height: "160px", objectFit: 'cover' }}>
                                    <img src={item} alt="" style={{ width: '100%', height: "100%" }} />

                                </div>
                            })}
                            {images.length < 10 && (<form encType="multipart/data">
                                <ImageLabel htmlFor="image">
                                    <ImageIcon />
                                    <div style={{ marginTop: "10px" }}>
                                        <Text fontSize="16px" fontWeight={500} color="#c4c4c4">
                                            Добавить фото +
                                        </Text>

                                    </div>

                                </ImageLabel>
                                <input onChange={(e) => handleFileUpload(e)} type="file" id="image" style={{ opacity: 0, position: "absolute", zIndex: -1 }} />
                            </form>)}
                        </Flex>
                        <div style={{ marginTop: "30px", width: "100%" }}>
                            <CustomButton type="button" onClick={handleSaveButton}>
                                <SaveIcon />
                                <Text marginLeft="18px" color="white">{t("save")}</Text>
                            </CustomButton>

                        </div>


                    </div>
                </>
                ) : (
                    <>
                        <Flex justifyContent="center" alignItems="center" flexDirection="column" height="100%" width="100%">
                            <div>
                                <img src={NoPhotos} alt="" />
                            </div>
                            <div style={{ marginTop: "30px", textAlign: "center", maxWidth: "450px" }}>
                                <Text fontSize="16px" fontWeight={400}>
                                    Можно загрузить 10 фотографий JPG или PNG, минимальное
                                    разрешение 540*480рх, размер не более 3Мбайт.
                                </Text>
                            </div>
                            <div style={{ marginTop: "35px" }}>
                                <form encType="multipart/form-data">
                                    <ButtonLabel htmlFor="firstPhoto">
                                        <Text marginRight='5px' fontSize="18px" fontWeight={500} color="#606EEA">
                                            Загрузить фото
                                        </Text>
                                        <ImageIconPurple />
                                    </ButtonLabel>
                                    <input onChange={(e) => handleFileUpload(e)} type="file" id="firstPhoto" style={{ opacity: 0, position: "absolute", zIndex: -1 }} />
                                </form>
                            </div>

                        </Flex>

                    </>
                )}

            </Flex>

        </>
    );
}

export default PhotosSection;
