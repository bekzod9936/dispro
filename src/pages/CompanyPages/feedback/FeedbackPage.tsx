import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterIcon } from '../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons';
import CustomInputLarge from '../../../components/Custom/CustomInputLarge';
import CustomSearchFlexible from '../../../components/Custom/CustomLargeFlexible';
import HorizontalMenu from '../../../components/Custom/HorizontalMenu';
import { Flex } from '../../../styles/BuildingBlocks';
import { PageWrapper, SectionHead, UnderSectionButton, Text } from '../../../styles/CustomStyles';
import RightSide from '../clients/RightSide';
import FeedbackSection from './FeedbackSection';

import MessagesSection from './MessagesSection';

const FeedbackPage = () => {
    const { t } = useTranslation();
    const [section, setSection] = useState("feedbacks");
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



    const renderSection = () => {
        switch (section) {
            case "feedbacks":
                return <FeedbackSection />;
            case "messages":
                return <MessagesSection />;
        }
    }

    return (
        <>
            <PageWrapper>
                <Flex margin="0px" width="100%" justifyContent="start" height="calc(100vh - 120px)">


                    <div style={{ display: "flex", margin: "0px", padding: "0px", width: "100%", height: "100%", flexDirection: "column", justifyContent: "start" }}>



                        <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                            <SectionHead>
                                {t("feedbackPage")}
                            </SectionHead>
                            {section === "feedbacks" && (<Flex margin="0px" width="100%" justifyContent="start" alignItems="center">

                                <CustomSearchFlexible margin="0px" width="auto" adornmentMargin="0px 20px 0px 0px" padding="14px 30px" />


                                <UnderSectionButton margin="0px 0px 0px 10px">
                                    <span style={{ minHeight: "30px", minWidth: "28px" }}>
                                        <FilterIcon />
                                    </span>
                                    <Text>{t("filters")}</Text>
                                </UnderSectionButton>




                            </Flex>)}
                            <Flex width="100%" margin="0px">


                                <Flex margin="0px" justifyContent="stretch" flexDirection="row" >
                                    <HorizontalMenu menuItems={menuItems} section={section} menuItemClickHandler={(key) => setSection(key)} />

                                </Flex>
                            </Flex>
                        </div>

                        <div >
                            {renderSection()}
                        </div>

                    </div>
                    {section === "feedbacks" && <div style={{ height: "100%", width: "35%", margin: "20px 0px", borderLeft: "1px solid grey" }}>

                    </div>}
                </Flex>
            </PageWrapper>
        </>
    );
}

export default FeedbackPage;
