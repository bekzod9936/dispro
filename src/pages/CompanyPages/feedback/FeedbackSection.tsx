import { Avatar, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import NoFeedBack from '../../../assets/images/NoFeedBack';
import { FeedbackPanel } from '../../../styles/CustomStyles';
import { fetchFeedbacks } from '../../../services/queries/PartnerQueries';
import { Flex } from '../../../styles/BuildingBlocks';
import { Text } from '../../../styles/CustomStyles';
import moment from 'moment';
import { LighterRatingStarIcon, PickedRatingStarIcon } from '../../../assets/icons/FeedBackIcons.tsx/FeedbackIcons';
import { useTranslation } from 'react-i18next';
import { StyledPagination } from '../../../styles/Elements';

interface Iprops {
    setModalVisible: any,
    setPickedReview: any
}

const FeedbackSection: React.FC<Iprops> = ({ setModalVisible, setPickedReview }) => {
    const [page, setPage] = useState<number>(1);
    const response = useQuery([page, "feedbacks"], () => fetchFeedbacks(page), {
        retry: 0,
        refetchOnWindowFocus: false,
    });

    const { t } = useTranslation();
    return (
        <div style={{ display: "flex", justifyContent: "start", alignItems: "start" }}>

            {1 > 2 && <NoFeedBack />}
            <div style={{ width: "100%" }}>
                <Grid container lg={11} spacing={2} >

                    {response.data?.data.data.ratingAndReviews.map((item: any) => {
                        return (
                            <Grid item lg={6} spacing={1}>
                                <FeedbackPanel onClick={() => { setModalVisible(true); setPickedReview(item) }}>
                                    <Flex margin="0px" width='100%' justifyContent="space-between">
                                        <Flex margin="0px">
                                            <Avatar style={{ height: "50px", width: "50px", borderRadius: "14px" }}
                                                src={item.clientImage}
                                            />
                                            <div>
                                                <Text>
                                                    {`${item.clientFirstName} ${item.clientLastName}`}
                                                </Text>
                                                <Flex justifyContent="start" margin="0px 0px 0px 25px">
                                                    {new Array(item.rating).fill(1).map((item) => {
                                                        return <PickedRatingStarIcon />
                                                    })} {new Array(5 - item.rating).fill(1).map((item) => {
                                                        return <LighterRatingStarIcon />
                                                    })}   </Flex>
                                            </div>
                                        </Flex>

                                        <div>
                                            <Text color="#8F8F8F" marginRight="0px" marginLeft="0px" fontWeight={400} fontSize="16px">
                                                {moment(item.createdAt).format('YYYY.DD.MM    HH:MM')}
                                            </Text>
                                        </div>

                                    </Flex>
                                    <div style={{ marginTop: "20px" }}>
                                        <Text marginLeft="0" marginRight="0" fontSize="14px" fontWeight={500}>{t("review")}:</Text>
                                    </div>
                                    <div style={{ marginTop: "4x" }}>
                                        <Text marginLeft="0" marginRight="0" fontSize="14px" fontWeight={300}>
                                            {item.review}
                                        </Text>
                                    </div>
                                    <div style={{ marginTop: "27px" }}>
                                        <Text marginLeft="0" marginRight="0" fontSize="14px" fontWeight={500}>{t("cashier")}:</Text>
                                    </div>
                                    <Text marginLeft="0" marginRight="0" fontSize="14px" fontWeight={300} color="#3492FF">
                                        Эльпадро
                                    </Text>
                                </FeedbackPanel>
                            </Grid>
                        )
                    })}



                </Grid>
                <div >
                    <StyledPagination onChange={(event, page: any) => {
                        setPage(page)
                    }} page={page} count={Math.ceil(response.data?.data.data.totalCount / 4)} />
                </div>
            </div>

        </div>
    );
}

export default FeedbackSection;


