import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrashIcon } from '../../../assets/icons/FeedBackIcons.tsx/FeedbackIcons';
import { CustomButton, ModalComponent } from '../../../styles/CustomStyles';
import { Text } from '../../../styles/CustomStyles';
const DeleteSuccess = ({ setModalVisible }: any) => {
    const { t } = useTranslation()
    return (
        <ModalComponent height="280px">
            <div style={{
                position: "relative",
                top: -100,
                alignSelf: "center",
                objectFit: "contain",
                display: "flex",
                justifyContent: "center",
                maxWidth: "300px",
                maxHeight: "200px"
            }}>
                <TrashIcon />
            </div>
            <div style={{ padding: "0px 50px", margin: "30px 0px", position: "relative", top: -100, textAlign: "center", marginBottom: "20px", }}>
                <Text marginLeft="0px" marginRight="0px" fontSize="18px" fontWeight={500}>
                    Чат успешно удален
                </Text>
            </div>
            <div style={{ textAlign: "center", position: "relative", top: -100, width: "100%", display: "flex", justifyContent: "center" }}>
                <CustomButton onClick={() => { setModalVisible(false) }}>
                    <Text fontSize="17px" fontWeight={500} color="white">
                        {t("continue")}
                    </Text>

                </CustomButton>

            </div>

        </ModalComponent>
    );
}

export default DeleteSuccess;
