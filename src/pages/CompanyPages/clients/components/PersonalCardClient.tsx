import { Avatar, Grid } from "@material-ui/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CoinsIcon,
  CrownIcon,
  DisCountIcon,
  HandStarIcon,
  MoneyIcon,
  RedLock,
  ThreeHeadIcon,
} from "../../../../assets/icons/ClientsPageIcons/ClientIcons";
import {
  BagIcon,
  CartIcon,
  CashbackIcon,
  PaidIcon,
} from "../../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons";
import HorizontalMenu from "../../../../components/Custom/HorizontalMenu";
import { useAppSelector } from "../../../../services/redux/hooks";
import { Flex } from "../../../../styles/BuildingBlocks";
import { IconWrapper, Text } from "../../../../styles/CustomStyles";
import { PageWrapper, Panel } from "../../../../styles/CustomStyles";
import BlockModal from "./BlockModal";
import CustomModalClients from "./CustomModalClients";
import Operations from "./Operations";
import PointsSection from "./PointsSection";
import RecomendationsSection from "./RecomendationsSection";

const PersonalCardClient = () => {
  const persCardClient: any = useAppSelector(
    (state) => state.clients.persCardClient
  );
  const { t } = useTranslation();
  const [statisticsArray, setStatisticsArray] = useState<any>(null);
  const [section, setSection] = useState("operations");
  const arrayOfStats = [
    "paidWithUZS",
    "purchuase_amount",
    "purchuase_cost",
    "pointsLeft",
    "receivedCashback",
    "receivedDiscount",
    "paid_with_points",
  ];
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [proceed, setProceed] = useState<boolean>(false);
  const [process, setProcess] = useState<string>("accure");
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const icons: (() => JSX.Element)[] = [
    MoneyIcon,
    CartIcon,
    BagIcon,
    HandStarIcon,
    CashbackIcon,
    DisCountIcon,
    PaidIcon,
  ];

  const menuItems = [
    {
      key: "operations",
      title: t("operations"),
    },
    {
      key: "points",
      title: t("points"),
    },
    {
      key: "recomendations",
      title: t("recomendations"),
    },
  ];
  const handleMenuItemClick = (key: string) => {
    setSection(key);
  };

  const renderSection = () => {
    switch (section) {
      case "operations":
        return <Operations />;
      case "points":
        return <PointsSection />;
      case "recomendations":
        return <RecomendationsSection />;
    }
  };
  const handleAccure = () => {
    setProcess("accure");
    setModalVisible(true);
  };
  const handleSubstract = () => {
    setProcess("substract");
    setModalVisible(true);
  };
  const handleVip = () => {
    setProcess("VIP");
    setModalVisible(true);
  };
  const handleBlock = () => {
    setProcess("block");
    setBlockModalVisible(true);
  };
  useEffect(() => {
    let formated = [
      {
        Icon: icons[0],
        title: arrayOfStats[0],
        number: persCardClient.addInfo.amountOperation,
      },
      {
        Icon: icons[1],
        title: arrayOfStats[1],
        number: persCardClient.addInfo.countOperation,
      },
      {
        Icon: icons[2],
        title: arrayOfStats[2],
        number: persCardClient.addInfo.amountOperation,
      },
      {
        Icon: icons[3],
        title: arrayOfStats[3],
        number: persCardClient.addInfo.pointSum,
      },
      {
        Icon: icons[4],
        title: arrayOfStats[4],
        number: persCardClient.addInfo.cashbackSum,
      },
      {
        Icon: icons[5],
        title: arrayOfStats[5],
        number: persCardClient.addInfo.discountSum,
      },
      {
        Icon: icons[6],
        title: arrayOfStats[6],
        number: persCardClient.addInfo.discountSum,
      },
    ];
    setStatisticsArray(formated);
  }, [persCardClient]);
  return (
    <PageWrapper>
      <Flex justifyContent="stretch">
        <Panel>
          <Flex
            flexDirection="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar
              src={persCardClient?.image}
              style={{ width: "97px", borderRadius: "12px", height: "97px" }}
            />
            <IconWrapper onClick={handleAccure}>
              <CoinsIcon />
            </IconWrapper>
            <IconWrapper onClick={handleSubstract}>
              <CoinsIcon />
            </IconWrapper>
            <IconWrapper onClick={handleVip}>
              <CrownIcon />
            </IconWrapper>
            <IconWrapper onClick={handleBlock}>
              <RedLock />
            </IconWrapper>
          </Flex>
          <div style={{ width: "100%", margin: "14px 0px 0px 0px" }}>
            <Text
              marginLeft="0px"
              marginRight="0px"
              fontSize="21px"
              fontWeight={700}
            >{`${persCardClient?.firstName} ${persCardClient?.lastName}`}</Text>
          </div>
          <Flex
            margin="10xp 0px 0px 0px"
            width="50%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              fontSize="15px"
              fontWeight={300}
              marginLeft="0px"
              marginRight="0px"
            >
              {persCardClient?.addInfo?.genderStr}
            </Text>
            <Text
              fontSize="15px"
              fontWeight={300}
              marginLeft="0px"
              marginRight="0px"
            >
              {persCardClient?.addInfo?.status}
            </Text>
          </Flex>
        </Panel>
        <Panel>
          <Flex justifyContent="space-between">
            <div>
              <Text
                marginLeft="0px"
                color="#C7C7C7"
                fontSize="15x"
                fontWeight={700}
              >
                {t("info")}
              </Text>
            </div>
            <div>
              <Text
                marginRight="0px"
                color="#3492FF"
                fontWeight={300}
                fontSize="15px"
              >
                {t("addMark")}
              </Text>
            </div>
          </Flex>
          <div style={{ marginTop: "10px" }}>
            <Text marginLeft="0px" fontSize="15px" fontWeight={300}>
              {t("recomendedBy")} :
            </Text>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Text marginLeft="0px" fontSize="15px" fontWeight={300}>
              {`${t("last_purchase")} ${moment(
                persCardClient.addInfo.lastPurchaseDate
              ).format("DD.MM.YYYY")}`}
            </Text>
          </div>
        </Panel>
        <Panel>
          <Flex justifyContent="stretch">
            <ThreeHeadIcon />
            <Text fontSize="17px" fontWeight={500}>
              {t("levelRecomendation")}
            </Text>
          </Flex>
        </Panel>
      </Flex>
      {statisticsArray && (
        <Grid container style={{ marginTop: "28px" }}>
          {statisticsArray.map(({ Icon, title, number }: any) => {
            return (
              <Grid item lg={3} style={{ marginBottom: "30px" }}>
                <Flex justifyContent="stretch" alignItems="flex-start">
                  <div>
                    <Icon />
                  </div>
                  <Flex
                    justifyContent="space-between"
                    margin="0px"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <div>
                      <Text
                        marginLeft="15px"
                        fontWeight={500}
                        fontSize="17px"
                        marginRight="0px"
                      >
                        {t(title)}
                      </Text>
                    </div>
                    <div>
                      <Text
                        marginLeft="15px"
                        fontSize="27px"
                        fontWeight={700}
                        color="#606EEA"
                        marginRight="0px"
                      >
                        {t(number)}
                      </Text>
                    </div>
                  </Flex>
                </Flex>
              </Grid>
            );
          })}
        </Grid>
      )}
      <Grid container>
        <Grid lg={4}>
          <HorizontalMenu
            menuItems={menuItems}
            section={section}
            menuItemClickHandler={handleMenuItemClick}
          />
        </Grid>
      </Grid>
      {renderSection()}

      {modalVisible && (
        <CustomModalClients
          open={modalVisible}
          client={persCardClient}
          setModalVisible={setModalVisible}
          setProceed={setProceed}
          process={process}
          proceed={proceed}
        ></CustomModalClients>
      )}

      {blockModalVisible && (
        <BlockModal
          open={blockModalVisible}
          setModalVisible={setBlockModalVisible}
        />
      )}
    </PageWrapper>
  );
};

export default PersonalCardClient;
