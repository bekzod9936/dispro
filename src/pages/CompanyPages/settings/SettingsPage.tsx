import { useState, Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { Switch, Route } from "react-router-dom";
import NavBar from "src/components/Custom/NavBar";
import Title from "src/components/Custom/Title";
import { Flex } from "../../../styles/BuildingBlocks";
import { PageWrapperFlex } from "../../../styles/CustomStyles";
import AwardingSection from "./screens/AwardingSection";
import LoyaltyProgramSection from "./screens/LoyaltyProgramSection";
import QRCodesSection from "./screens/QRCodesSection";
import ReferalProgrammSection from "./screens/ReferalProgrammSection";
import SecuritySection from "./screens/SecuritySection";

export interface ISettingsRow {
  path: string;
  text: string;
  component: any;
}

const SettingsPage = () => {
  const [section, setSection] = useState("loyaltyProgram");

  const { t } = useTranslation();
  const menuItems: ISettingsRow[] = [
    {
      path: "/settings",
      text: t("loyaltyProgram"),
      component: LoyaltyProgramSection,
    },
    {
      path: "/settings/referalProgram",
      text: t("referalProgram"),
      component: ReferalProgrammSection,
    },
    {
      path: "/settings/awarding",
      text: t("awarding"),
      component: AwardingSection,
    },
    {
      path: "/settings/security",
      text: t("security"),
      component: SecuritySection,
    },
    {
      path: "/settings/qrcodes",
      text: t("qrcodes"),
      component: QRCodesSection,
    },
  ];

  // const renderSection = () => {
  //   switch (section) {
  //     case 'referalProgram':
  //       return <ReferalProgrammSection />;
  //     case 'loyaltyProgram':
  //       return <LoyaltyProgramSection />;
  //     case 'awarding':
  //       return <AwardingSection />;
  //     case 'security':
  //       return <SecuritySection />;
  //     case 'qrcodes':
  //       return <QRCodesSection />;
  //   }
  // };

  return (
    <PageWrapperFlex>
      <Title>{t("settings")}</Title>
      <Flex width="80%" alignItems="center" margin="0px">
        <NavBar list={menuItems} margin="20px 0" padding="0 0 10px 0" />
      </Flex>

      <Switch>
        <Suspense fallback={<div>loading..</div>}>
          {menuItems.map((item) => {
            return <Route exact path={item.path} component={item.component} />;
          })}
        </Suspense>
      </Switch>
    </PageWrapperFlex>
  );
};

export default SettingsPage;
