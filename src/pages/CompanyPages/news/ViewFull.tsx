import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditIcon } from '../../../assets/icons/NewsIcons/NewsIcons';
import { Flex } from '../../../styles/BuildingBlocks';
import { CustomButton } from '../../../styles/CustomStyles';
import { AboutSectionWrapper } from '../info/InfoPageStyes';
import { SettingsWrapper } from '../settings/SettingStyles';
import InfoComponent from './InfoComponent';
import Iphone from './Iphone';
import { Text } from "../../../styles/CustomStyles"
import { DeleteIconWhite } from '../../../assets/icons/SettingsIcons/SettingsPageIcon';
import { colors } from '@material-ui/core';
import { COLORS } from '../../../services/Types/enums';
import CropImageModal from './CropImageModal';
import SingleMenuItem from '../../../components/Layout/SingleMenuItem';
import { setRegCompanyId } from '../../../services/redux/Slices/authSlice';
import { stat } from 'fs';
import CustomFileUpload from '../info/CustomFileUpload';
interface IProps {
    selectedSingleNews: any,
    setModalIsVisible: any,
    setStatus: any,
    status: string
}

const ViewFull: React.FC<IProps> = ({ selectedSingleNews, setModalIsVisible, setStatus, status }) => {
    const { t } = useTranslation();
    const [isCropModalVisible, setIsModalVisible] = useState(false);
    const [file, setFile] = useState<any>(null);
    return (
        <div style={{ flexGrow: 1 }}>
            <SettingsWrapper style={{ width: "95%", height: "95%", boxSizing: "border-box" }}>
                {status === "edit_news" ? (
                    <>
                        <CustomFileUpload label="upload_photo" aboveInput={t("photo")} aboveLabel={t("uploadPhotoInfo")} onChange={(e: any) => {
                            setFile(e.target.files[0])
                            setIsModalVisible(true)
                        }} />

                    </>
                ) : (
                    <>
                        <Flex margin="0px" width="100%" height="100%" justifyContent="start" alignItems="flex-start">
                            <Flex width="35%" height="100%" margin="0px" alignItems="center" justifyContent="center">
                                <Iphone image={selectedSingleNews.image} title={selectedSingleNews.title}
                                    description={selectedSingleNews.description}
                                />
                            </Flex>
                            <Flex margin="0px" padding="40px 10px" justifyContent="start" alignItems="flex-start" flexDirection="column">
                                <InfoComponent ageLimit={selectedSingleNews.ageFrom}
                                    gender={selectedSingleNews.genderType === 0 ? "forMales" : "forFemale"}
                                    publishDate={`${moment(selectedSingleNews.createdAt).locale("ru").format("DD MMM")} - ${moment(selectedSingleNews.endLifeTime).locale("ru").format("DD  MMM YYYY")}`}
                                />
                                <div style={{ marginTop: "15px" }}>
                                    <CustomButton
                                        onClick={() => { setStatus("edit_news") }}
                                    >
                                        <EditIcon />
                                        <Text color="white" marginLeft="10px">{t("edit")}</Text>
                                    </CustomButton>
                                </div>
                                <div style={{ marginTop: "15px" }}>
                                    <CustomButton background={COLORS.red} onClick={() => setModalIsVisible(true)}>
                                        <DeleteIconWhite />
                                        <Text color="white" marginLeft="10px">{t("delete")}</Text>
                                    </CustomButton>
                                </div>
                            </Flex>
                        </Flex>
                    </>)
                }
                {file && <CropImageModal isCropModalVisible={isCropModalVisible} src={file} />}
            </SettingsWrapper>

        </div>
    );
}

export default ViewFull;
