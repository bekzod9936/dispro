import { Dialog, Grid, Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { io } from 'socket.io-client';
import { FilterIcon } from '../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons';
import { MediumStartIcon } from '../../../assets/icons/FeedBackIcons.tsx/FeedbackIcons';
import CustomInputLarge from '../../../components/Custom/CustomInputLarge';
import CustomSearchFlexible from '../../../components/Custom/CustomLargeFlexible';
import CustomModal from '../../../components/Custom/CustomModal';
import Filter from '../../../components/Custom/Filter';
import HorizontalMenu from '../../../components/Custom/HorizontalMenu';
import { fetchRatings } from '../../../services/queries/PartnerQueries';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import { setSocket } from '../../../services/redux/Slices/FeedbackSlice';
import { Flex } from '../../../styles/BuildingBlocks';
import { PageWrapper, SectionHead, UnderSectionButton, Text, FlexiblePanel } from '../../../styles/CustomStyles';
import RightSide from '../clients/RightSide';
import { FeedbackModal } from './FeedbackModal';
import FeedbackSection from './FeedbackSection';

import MessagesSection from './MessagesSection';

const FeedbackPage = () => {
    const { t } = useTranslation();
    const [section, setSection] = useState("feedbacks");
    const [modalVisble, setModalVisible] = useState<boolean>(false);
    const [pickedReview, setPickedReview] = useState<any>({});
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [apply, setApply] = useState<boolean>(false);
    const [backdropVisible, setBackdropVisible] = useState<boolean>(false);
    const socketObj: any = useAppSelector(state => state.feedback.socket);
    const dispatch = useAppDispatch();
    const token = localStorage.getItem("companyId");
    const noRatings = [{ rating: 5, percentage: 0, amount: 0 },
    { rating: 4, percentage: 0, amount: 0 },
    { rating: 3, percentage: 0, amount: 0 },
    { rating: 2, percentage: 0, amount: 0 },
    { rating: 1, percentage: 0, amount: 0 },];
    const response = useQuery(["fetchRatings"], fetchRatings, {
        enabled: section === "feedbacks",
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const menuItems = [
        {
            key: 'feedbacks',
            title: t("feedbacks")
        },
        {
            key: 'messages',
            title: t("messages")
        },
    ]
    const dialog: any = document.getElementsByTagName("dialog");
    // useEffect(() => {
    //     if (section !== "messages") {
    //         socketObj?.close();
    //     }
    //     else {

    // }, [section])
    const filters: any = [

        {
            title: "byCashiers",
            inputType: "select",
            request: "chose_cashier",
            numOfInputs: ["cashiers"],
            //   inputHandler: (value: any) => { dispatch(setGender(value)) },
            // checked: statisticsState.gender
        },
        {
            title: "byRating",
            inputType: "star",
            request: "pick_rating",
            numOfInputs: ["one"],
            //   inputHandler: (value: any) => { dispatch(setGender(value)) },
            // checked: statisticsState.gender
        },

    ]


    // useEffect(() => {
    //     if (dialog) {
    //         dialog[0].showModal();
    //     }

    // }, [dialog])

    const renderSection = () => {
        switch (section) {
            case "feedbacks":

                return <FeedbackSection setModalVisible={setModalVisible} setPickedReview={setPickedReview} />;
            case "messages":
                return <MessagesSection />;
        }
    }

    return (
        <>
            <PageWrapper>
                <Flex margin="0px" flexDirection="row" width="100%" justifyContent="start" height={section === "messages" ? "100%" : "calc(100vh - 120px)"}>


                    <div style={{ display: "flex", margin: "0px", padding: "0px", width: "100%", height: "100%", flexDirection: "column", justifyContent: "start" }}>



                        <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>

                            <SectionHead>
                                {t("feedbackPage")}
                            </SectionHead>
                            {section === "feedbacks" && (<Flex margin="0px" width="100%" justifyContent="start" alignItems="center">

                                <CustomSearchFlexible margin="0px" width="auto" adornmentMargin="0px 20px 0px 0px" padding="14px 30px" />

                                <div >
                                    <UnderSectionButton zIndex={filterOpen ? 1302 : 10} margin="0px 0px 0px 10px" onClick={() => { setFilterOpen(!filterOpen); setBackdropVisible(!backdropVisible) }}>
                                        <span style={{ maxHeight: "30px", maxWidth: "28px" }}>
                                            <FilterIcon />
                                        </span>
                                        <Text>{t("filters")}</Text>

                                    </UnderSectionButton>
                                    {filterOpen && <Filter zIndex={1301} filters={filters} onApply={() => setApply(true)} />}
                                </div>





                            </Flex>)}
                            <Flex width="100%" margin="0px">


                                <Flex margin="0px" justifyContent="stretch" flexDirection="row" width="220px" >
                                    <HorizontalMenu menuItems={menuItems} section={section} menuItemClickHandler={(key) => setSection(key)} />

                                </Flex>
                            </Flex>
                        </div>

                        <div style={{ flexGrow: section === "messages" ? 1 : 0, boxSizing: "border-box" }}>
                            {renderSection()}
                        </div>

                    </div>
                    {(section === "feedbacks" && !response.isLoading) &&
                        <div style={{ height: "100%", width: "40%", margin: "20px 0px", borderLeft: "1px solid grey" }}>
                            <Flex height="100%" flexDirection="column" justifyContent="start" alignItems="center">
                                <FlexiblePanel width={response.data?.data?.data ? 'fit-content' : '80%'}
                                    padding={!response.data?.data?.data ? "20px 5px" : "20px 30px"}
                                >
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Text marginRight="15px" marginLeft="15px" fontSize="16px" fontWeight={700} color="#C7C7C7">
                                            Общая оценка компании
                                        </Text>
                                    </div>
                                    {response.data?.data?.data ? <Flex width="80%" justifyContent="space-between" margin="27px 0px 0px 0px">
                                        <div>
                                            <Text marginRight="0px" marginLeft="0px" fontWeight={700} fontSize="40px" color="#606EEA">{response?.data?.data?.data?.averageRating}</Text>
                                            <Text marginRight="0px" marginLeft="0px" fontWeight={700} fontSize="18px" color="#C4C4C4">/5 </Text>

                                        </div>
                                        <div style={{ width: "110px", padding: "10px", boxSizing: "border-box", borderRadius: "14px", background: "#38E25D" }}>
                                            <Text fontSize="15px" fontWeight={700} color="white" >+0.5%</Text>
                                        </div>
                                    </Flex> : <div style={{ width: "85%", textAlign: "center", marginTop: "15px" }}>
                                        <Text fontSize="16px" fontWeight={300}>Вашу компанию еще никто
                                            не оценивал</Text>
                                    </div>
                                    }
                                </FlexiblePanel>
                                <FlexiblePanel width={response.data?.data?.data ? 'fit-content' : '80%'}
                                    padding={!response.data?.data?.data ? "20px 5px" : "20px 30px"}
                                >
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Text marginRight="15px" marginLeft="15px" fontSize="16px" fontWeight={700} color="#C7C7C7">
                                            Общее количество оценок
                                        </Text>
                                    </div>
                                    {response.data?.data?.data ? <Flex width="90%" justifyContent="space-between" margin="27px 0px 0px 0px">
                                        <div>
                                            <Text marginRight="0px" marginLeft="0px" fontWeight={700} fontSize="40px" color="#606EEA">{response.data?.data.data.totalRating}</Text>

                                        </div>
                                        <div style={{ width: "110px", padding: "10px", boxSizing: "border-box", borderRadius: "14px", background: "#38E25D" }}>
                                            <Text fontSize="15px" fontWeight={700} color="white" >+0.5%</Text>
                                        </div>
                                    </Flex> :
                                        <div style={{ width: "85%", textAlign: 'center', marginTop: "15px" }}>
                                            <Text fontSize="16px" fontWeight={300}>Вашу компанию еще никто
                                                не оценивал</Text>

                                        </div>}

                                </FlexiblePanel>
                                <Flex width="100%" justifyContent="center" margin="40px 0px 0px 0px ">
                                    <Text>
                                        Оценки:
                                    </Text>
                                </Flex>

                                <Flex flexDirection="column" width="100%" margin="30px 0px 0px 0px" >
                                    {(response?.data?.data?.data ? response?.data?.data?.data?.ratings : noRatings).map((item: any) => {
                                        return (
                                            <Flex justifyContent="space-evenly" width="100%" alignItems="center" margin="10px 0px 0px 0px">
                                                <Flex justifyContent="start" flexDirection="row-reverse" width="40%" margin="0px">
                                                    {new Array(item.rating).fill(1).map(item => {
                                                        return <span style={{ marginLeft: "5px" }}>
                                                            <MediumStartIcon />
                                                        </span>
                                                    })}
                                                </Flex>
                                                <Flex margin="0px 20px 0px 0px" justifyContent="space-around" width="50%"  >
                                                    <div>
                                                        <Text marginRight="0px" marginLeft="0px" fontSize="18px" fontWeight={400}>
                                                            {item.percentage}% </Text>
                                                    </div>
                                                    <div>
                                                        <Text marginRight="0px" marginLeft="0px" fontSize="18px" fontWeight={400}>
                                                            {item.amount}  оценок </Text>
                                                    </div>

                                                </Flex>


                                            </Flex>
                                        )
                                    })

                                    }


                                </Flex>
                            </Flex>


                        </div>}
                </Flex>
                {modalVisble && <FeedbackModal setModalVisible={setModalVisible} open={modalVisble} pickedReview={pickedReview} />}
                {backdropVisible && <Modal open={backdropVisible}>
                    <div>

                    </div>
                </Modal>}
            </PageWrapper>
        </>
    );
}

export default FeedbackPage;
