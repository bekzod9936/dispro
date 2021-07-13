import { Avatar, Grid } from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import NoFeedBack from '../../../assets/images/NoFeedBack';
import { FeedbackPanel } from '../../../styles/CustomStyles';
import { fetchFeedbacks } from '../../../services/queries/PartnerQueries';
import { Flex } from '../../../styles/BuildingBlocks';
import { Text } from '../../../styles/CustomStyles';
import moment from 'moment';
const FeedbackSection = () => {
    const response = useQuery(["feedbacks"], fetchFeedbacks, {
        retry: 0,
    });
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "start", alignItems: "start" }}>

            {1 > 2 && <NoFeedBack />}
            <Grid container lg={11} spacing={2}>

                {response.data?.data.data.ratingAndReviews.map((item: any) => {
                    return (
                        <Grid item lg={6} spacing={1}>
                            <FeedbackPanel>
                                <Flex margin="0px" width='100%' justifyContent="space-between">
                                    <Avatar style={{ height: "50px", width: "50px", borderRadius: "14px" }}
                                        src={item.clientImage}
                                    />
                                    <div>
                                        <Text color="#8F8F8F" marginRight="0px" marginLeft="0px" fontWeight={400} fontSize="16px">
                                            {moment(item.createdAt).format('YYYY.DD.MM    HH:MM')}
                                        </Text>
                                    </div>

                                </Flex>
                            </FeedbackPanel>
                        </Grid>
                    )
                })}



            </Grid>
        </div>
    );
}

export default FeedbackSection;


