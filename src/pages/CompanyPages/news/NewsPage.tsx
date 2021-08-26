import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FONT_SIZE, FONT_WEIGHT } from '../../../services/Types/enums';
import { PageWrapper, SectionHead, UnderSectionButton } from '../../../styles/CustomStyles';
import { Text } from '../../../styles/CustomStyles';
import { Flex } from '../../../styles/BuildingBlocks';
import { PlusIcon } from '../../../assets/icons/LoginPage/LoginPageIcons';
import { FilledAddIcon } from '../../../assets/icons/SettingsIcons/SettingsPageIcon';
import CustomSearchFlexible from '../../../components/Custom/CustomLargeFlexible';
import HorizontalMenu from '../../../components/Custom/HorizontalMenu';
import InPendingSection from './InPendingSection';

import CreateNews from './CreateNews';
import { BackIcon } from '../../../assets/icons/NewsIcons/NewsIcons';
import ViewFull from './ViewFull';
import { title } from 'process';


const NewsPage = () => {
    const { t } = useTranslation();
    const [section, setSection] = useState<"pending" | "actives" | "archives">("pending");
    const [status, setStatus] = useState<string>("");
    const [selectedSingleNews, setSelectedSingleNews] = useState<any>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const menuItems = [{
        key: "pending",
        title: t("in_pending")
    },
    {
        key: "actives",
        title: t("active_news")
    },
    {
        key: "archives",
        title: t("news_archive")
    },

    ]
    // const renderSection = () => {
    //     switch (section) {
    //         case "in_pending":
    //             return <InPendingSection setStatus={setStatus} section={section} />
    //         case "active_news":
    //             return <ActiveNews />
    //         case "news_archive":
    //             return <Archive />


    //     }

    //}

    return (
        <PageWrapper
            style={{ display: status === "view_full" ? "flex" : undefined, flexDirection: status === "view_full" ? "column" : undefined }}
        >
            <SectionHead>
                {(status !== "create_news" && status !== "view_full" && status !== "edit_news" && status !== "reset_news") ? t("News") : (selectedSingleNews && status === "view_full") ? (
                    <span>
                        <span onClick={() => { setStatus("") }}> <BackIcon /> </span> <span style={{ marginLeft: "12px" }}> {selectedSingleNews.title}</span>
                    </span>
                ) : (status === "edit_news") ? (
                    <span>
                        <span onClick={() => { setStatus("view_full") }}> <BackIcon /> </span> <span style={{ marginLeft: "12px" }}> {t("editingNews")}</span>
                    </span>
                ) : (status === "reset_news") ? (<span>
                    <span onClick={() => { setStatus("") }}> <BackIcon /> </span> <span style={{ marginLeft: "12px" }}> {t("resetingNews")}</span>
                </span>) :
                    <span>
                        <span onClick={() => { setStatus("") }}> <BackIcon /> </span> <span style={{ marginLeft: "12px" }}> {t("addingNews")}</span>
                    </span>}
            </SectionHead>
            {(status === "create_news") ?
                (
                    <>
                        <CreateNews setStatus={setStatus} />
                    </>
                )
                : (selectedSingleNews && status === "view_full" || status === "edit_news" || status === "reset_news") ? (
                    <ViewFull selectedSingleNews={selectedSingleNews}
                        setModalIsVisible={setIsModalVisible}
                        setStatus={setStatus}
                        status={status}
                        setSelect={setSelectedSingleNews}
                    />
                )
                    :
                    (<>
                        <Flex width="50%" justifyContent="space-between" margin="0px" alignItems="flex-start">
                            <UnderSectionButton onClick={() => setStatus("create_news")}>
                                <FilledAddIcon />
                                <Text marginLeft="10px">{t("createNews")}</Text>
                            </UnderSectionButton>
                            <CustomSearchFlexible placeholder={t("searchFromNews")} padding="15.5px 20px" margin="0px" width="60%" />
                        </Flex>
                        <Flex width="40%" alignItems="flex-start" justifyContent="space-between" margin="0px" >
                            <HorizontalMenu menuItems={menuItems} section={section} menuItemClickHandler={(key: any) => { setSection(key); setSelectedSingleNews(null) }} />

                        </Flex>
                        <Flex flexGrow="1">
                            <InPendingSection
                                setStatus={setStatus}
                                section={section}
                                setSelectedSingleNews={setSelectedSingleNews}
                                selectedSingleNews={selectedSingleNews}
                                setIsModalVisible={setIsModalVisible}
                                isModalVisible={isModalVisible}
                            />
                        </Flex>

                    </>)


            }

        </PageWrapper>
    );
}

export default NewsPage;
