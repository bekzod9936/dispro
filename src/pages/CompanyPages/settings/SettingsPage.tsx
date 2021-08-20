import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HorizontalMenu from '../../../components/Custom/HorizontalMenu';
import { Flex } from '../../../styles/BuildingBlocks';
import { PageWrapper, PageWrapperFlex } from '../../../styles/CustomStyles';
import AwardingSection from './AwardingSection';
import LoyaltyProgramSection from './LoyaltyProgramSection';
import QRCodesSection from './QRCodesSection';
import ReferalProgrammSection from './ReferalProgrammSection';
import SecuritySection from './SecuritySection';

const SettingsPage = () => {
    const [section, setSection] = useState("loyaltyProgram");


    const { t } = useTranslation();
    const menuItems = [
        {
            key: "loyaltyProgram",
            title: t("loyaltyProgram"),
        },
        {
            key: "referalProgram",
            title: t("referalProgram"),
        },
        {
            key: "awarding",
            title: t("awarding"),
        },
        {
            key: "security",
            title: t("security"),
        },
        {
            key: "qrcodes",
            title: t("qrcodes"),
        },
    ]

    const renderSection = () => {
        switch (section) {
            case "referalProgram":
                return <ReferalProgrammSection />
            case "loyaltyProgram":
                return <LoyaltyProgramSection />
            case "awarding":
                return <AwardingSection />
            case "security":
                return <SecuritySection />
            case "qrcodes":
                return <QRCodesSection />
        }
    }
    return (
        <PageWrapperFlex>
            <Flex width="80%" alignItems="center" margin="0px">
                <HorizontalMenu menuItems={menuItems} section={section} menuItemClickHandler={(key: string) => setSection(key)} />
            </Flex>
            {renderSection()}
        </PageWrapperFlex>
    );
}

export default SettingsPage;
