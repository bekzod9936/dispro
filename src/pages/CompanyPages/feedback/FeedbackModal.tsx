import { Avatar } from '@material-ui/core';
import moment from 'moment';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import { LighterRatingStarIcon, MessageIcon, MoneyHorizontalIcon, PickedRatingStarIcon } from '../../../assets/icons/FeedBackIcons.tsx/FeedbackIcons';
import CustomModal from '../../../components/Custom/CustomModal';
import { Flex } from '../../../styles/BuildingBlocks';
import { CustomButton, FeedbackPanel, IconWrapper, ModalComponent } from '../../../styles/CustomStyles';
import { Text } from "../../../styles/CustomStyles"
interface Iprops {
    open: boolean,
    pickedReview?: any,
    setModalVisible?: any
}


export const FeedbackModal: React.FC<Iprops> = ({ open, pickedReview, setModalVisible }) => {
    const { t } = useTranslation();



    return (
        <CustomModal open={open}>
            <ModalComponent>
                <Flex margin="0px" width='100%' justifyContent="space-between">
                    <Flex margin="0px">
                        <Avatar style={{ height: "50px", width: "50px", borderRadius: "14px" }}
                            src={pickedReview.clientImage}
                        />
                        <div>
                            <Text>
                                {`${pickedReview.clientFirstName} ${pickedReview.clientLastName}`}
                            </Text>
                            <Flex justifyContent="start" margin="0px 0px 0px 25px">
                                {new Array(pickedReview.rating).fill(1).map((item) => {
                                    return <PickedRatingStarIcon />
                                })} {new Array(5 - pickedReview.rating).fill(1).map((item) => {
                                    return <LighterRatingStarIcon />
                                })}   </Flex>
                        </div>
                    </Flex>

                    <div>
                        <Text color="#8F8F8F" marginRight="16px" marginLeft="0px" fontWeight={400} fontSize="16px">
                            {moment(pickedReview.createdAt).format('YYYY.DD.MM    HH:MM')}
                        </Text>
                        <span onClick={() => setModalVisible(false)}>
                            <CloseIcon />
                        </span>
                    </div>

                </Flex>
                <div style={{ marginTop: "20px" }}>
                    <Text marginLeft="0" marginRight="0" fontSize="14px" fontWeight={500}>{t("review")}:</Text>
                </div>
                <div style={{ marginTop: "4x" }}>
                    <Text marginLeft="0" marginRight="0" fontSize="14px" fontWeight={300}>
                        {pickedReview.review}
                    </Text>
                </div>
                <div style={{ marginTop: "27px", display: "flex" }}>
                    <div style={{ width: "112px" }}>
                        <Text marginLeft="0" marginRight="0" fontSize="14px" fontWeight={500}>{t("cashier")}:</Text>
                    </div>
                    <div>
                        <Text marginLeft="0" marginRight="0" fontSize="14px" fontWeight={500}>{t("branch")}:</Text>
                    </div>

                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "112px" }}>
                        <Text marginLeft="0" marginRight="0" fontSize="14px" fontWeight={300} color="#3492FF">
                            Эльпадро
                        </Text>
                    </div>
                    <div>
                        <Text marginLeft="0" marginRight="0" fontSize="14px" fontWeight={300} >
                            Rademakerstraat 14, 3769 BD Soesterberg, Нидерланды
                        </Text>
                    </div>
                </div>
                <Flex justifyContent="space-between" margin="25px 0px 0px 0px">
                    <Flex justifyContent="start" alignItems="center" >
                        <IconWrapper>
                            <MoneyHorizontalIcon />
                        </IconWrapper>
                        <div>
                            <div>
                                <Text marginLeft="12px" fontSize="14px" fontWeight={300}>
                                    Операция от {moment(pickedReview.createdAt).format("DD.MM.YYYY")}

                                </Text>
                            </div>
                            <div >
                                <Text marginLeft="12px" fontSize="14px" fontWeight={300}>
                                    350 000 сум
                                </Text>
                            </div>

                        </div>
                    </Flex>
                    <CustomButton>
                        <MessageIcon />
                        <Text fontSize="16px" fontWeight={500} color="white">
                            Написать сообщение
                        </Text>
                    </CustomButton>
                </Flex>
            </ModalComponent>
        </CustomModal>
    )
}