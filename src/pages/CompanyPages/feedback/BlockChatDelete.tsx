import React from 'react';
import { useTranslation } from 'react-i18next';
import { CancelIcon } from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import { BucketIcon } from '../../../assets/icons/FeedBackIcons.tsx/FeedbackIcons';
import CustomModal from '../../../components/Custom/CustomModal';
import { Flex } from '../../../styles/BuildingBlocks';
import { CustomButton, ModalComponent } from '../../../styles/CustomStyles';
import { Text } from "../../../styles/CustomStyles"
import BlockProceed from './BlockProceed';
import DeleteSuccess from './DeleteSuccess';
interface IBlockChatDelete {
    open: boolean,
    setModalVisible: any,
    process: string,
    setProcess: any
}



const BlockChatDelete: React.FC<IBlockChatDelete> = ({ open, setModalVisible, process, setProcess }) => {
    const { t } = useTranslation();
    const handleCancel = () => {
        console.log("cancel");
        setModalVisible(false);

    }
    const handleContinue = () => {
        setProcess("block")
    }

    return (
        <CustomModal open={open}>
            {process === "assert" ? <ModalComponent>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>

                    <div>
                        <Text marginLeft="0px" marginRight="0px" fontSize="18px" fontWeight={500}>
                            Вы действительно хотите удалить  чат?
                        </Text>
                    </div>
                    <div style={{ marginTop: "20px" }} >
                        <Text marginLeft="0px" marginRight="0px" fontWeight={300} fontSize="14px">
                            После удаления чата, переписка на стороне
                            клиента сохранится
                        </Text>
                    </div>
                    <Flex width="100%" margin="25px 0px 0px 15%" justifyContent="end">
                        <CustomButton background="white" onClick={handleCancel}>
                            <CancelIcon />
                            <Text color="#223367" fontSize="16px" fontWeight={500}>
                                {t("cancel")}
                            </Text>
                        </CustomButton>
                        <CustomButton background="#FF5E68" onClick={handleContinue}>
                            <BucketIcon />
                            <Text color="white" fontSize="16px" fontWeight={500}>
                                {t("Удалить")}
                            </Text>
                        </CustomButton>

                    </Flex>

                </div>


            </ModalComponent> : process === "block" ? <BlockProceed setProcess={setProcess} process={process} />
                : process === "success" ? <DeleteSuccess setModalVisible={setModalVisible} /> : null}
        </CustomModal>
    );
}

export default BlockChatDelete;
