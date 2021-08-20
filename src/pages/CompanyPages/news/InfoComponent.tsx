import React from 'react';
import { useTranslation } from 'react-i18next';
import { FONT_SIZE, FONT_WEIGHT } from '../../../services/Types/enums';
import { Text } from "../../../styles/CustomStyles"
interface IProps {
    gender: string,
    publishDate: string,
    ageLimit: string,
}
const InfoComponent: React.FC<IProps> = ({ gender, publishDate, ageLimit }) => {
    const { t } = useTranslation();

    return (
        <div>
            <div style={{ marginTop: "35px" }}>
                <Text color="#c4c4c4" fontWeight={FONT_WEIGHT.bold} fontSize={FONT_SIZE.meduim}>{t("info")}</Text>
            </div>
            <div style={{ marginTop: "18px" }}>
                <Text fontWeight={400} fontSize={FONT_SIZE.smallPlus}>{t("onlyFor") + ": " + t(gender)}</Text>

            </div>
            <div style={{ marginTop: "18px" }}>
                <Text fontWeight={400} fontSize={FONT_SIZE.smallPlus}>
                    {t("publishDate") + ": " + publishDate}</Text>

            </div>
            <div style={{ marginTop: "18px" }}>
                <Text lineHeight="25px" fontWeight={400} fontSize={FONT_SIZE.smallPlus}>
                    {t("ageLimit") + ": " + ageLimit + "+"}</Text>

            </div>
        </div>
    );
}

export default InfoComponent;
