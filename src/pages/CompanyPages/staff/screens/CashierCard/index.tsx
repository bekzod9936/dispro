import NavBar from "components/Custom/NavBar";
import IconButton from "@material-ui/core/IconButton";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import { useLocation } from "react-router-dom";
import { Flex, SpinnerDiv } from "pages/CompanyPages/staff/style";
import useStaffRoute from "../../routes";
import { ReactComponent as Laptop } from "assets/icons/StatistisPage/laptop.svg";
import { ReactComponent as Money } from "assets/icons/StatistisPage/money.svg";
import { ReactComponent as Rating } from "assets/icons/StatistisPage/rating.svg";
import { ReactComponent as Score } from "assets/icons/StatistisPage/score.svg";
import { ReactComponent as Sertificate } from "assets/icons/StatistisPage/cashnew.svg";
import { ReactComponent as Users } from "assets/icons/StatistisPage/users.svg";
import { ReactComponent as QRStaff } from "assets/icons/qr_staff.svg";
import {
  CardContainer,
  StaticDiv,
  StatisticCol,
  Content,
  Title,
  Value,
  StaticIcon,
  CashierInfo,
  StaffImg,
  StaffCol,
  StaffName,
  StaffText,
  Break,
  StaffSecondText,
  StaffAction,
} from "./style";
import useCashierCard from "./hooks/useCashierCard";
import Spinner from "components/Helpers/Spinner";
import { numberWith } from "services/utils";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect } from "react";
import { setCashierId } from "services/redux/Slices/staffs";
import defaultImg from "assets/images/staff_default.png";
import useStaff from "../../hooks/useStaff";
import Button from "components/Custom/Button";
import { ThreeDotsIcon } from "assets/icons/SettingsIcons/SettingsPageIcon";
import { SideBar } from "pages/CompanyPages/staff/components/SideBar";
import QrBar from "./components/QrBar";

const CashierCard = () => {
  const { branches } = useStaff();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { pathname, state }: any = useLocation();
  const { menuItems } = useStaffRoute();
  const { isLoading, openQr, setOpenQr } = useCashierCard();
  const staffData = useAppSelector((state) => state.staffs.staffData);
  const cashierId = useAppSelector((state) => state.staffs.cashierId);

  useEffect(() => {
    if (cashierId === "") {
      dispatch(setCashierId(state?.id));
    }
  }, [cashierId]);

  const getStoreName = (storeId: any) => {
    let branch: any = "";
    if (branches?.length) {
      branch = branches.find((item: any) => item.value === storeId)?.label;
    } else {
      branch = "";
    }

    return branch;
  };

  const renderData = () => {
    if (isLoading) {
      return (
        <SpinnerDiv>
          <Spinner />
        </SpinnerDiv>
      );
    } else if (pathname === "/staff/cashier/statistic") {
      const statistic = staffData;
      return (
        <StaticDiv>
          <StatisticCol>
            <StaticIcon>
              <Money />
            </StaticIcon>
            <Content>
              <Title>{t("purchuase_cost")}</Title>
              <Value>{numberWith(statistic?.avgCheque, " ")}</Value>
            </Content>
          </StatisticCol>
          <StatisticCol>
            <StaticIcon>
              <Laptop />
            </StaticIcon>
            <Content>
              <Title>Оплаченно в UZS</Title>
              <Value>{numberWith(statistic?.amountOperation, " ")}</Value>
            </Content>
          </StatisticCol>
          <StatisticCol>
            <StaticIcon>
              <Rating />
            </StaticIcon>
            <Content>
              <Title>Оплатили баллами</Title>
              <Value>{numberWith(statistic?.avgRating, " ")}</Value>
            </Content>
          </StatisticCol>
          <StatisticCol>
            <StaticIcon>
              <Score />
            </StaticIcon>
            <Content>
              <Title>Баллов клиентам</Title>
              <Value>{numberWith(statistic?.countClient, " ")}</Value>
            </Content>
          </StatisticCol>
          <StatisticCol>
            <StaticIcon>
              <Sertificate />
            </StaticIcon>
            <Content>
              <Title>Всего клиентов</Title>
              <Value>{numberWith(statistic?.countOperation, " ")}</Value>
            </Content>
          </StatisticCol>
          <StatisticCol>
            <StaticIcon>
              <Users />
            </StaticIcon>
            <Content>
              <Title>Совершено покупок</Title>
              <Value>{numberWith(statistic?.countRefer, " ")}</Value>
            </Content>
          </StatisticCol>
        </StaticDiv>
      );
    }
  };
  return (
    <CardContainer>
      {!isLoading && (
        <CashierInfo>
          <StaffCol>
            <StaffImg>
              <LazyLoadImage
                src={defaultImg}
                alt="image"
                style={{
                  objectFit: "cover",
                }}
                height="100%"
                width="100%"
              />
            </StaffImg>
          </StaffCol>
          <StaffCol>
            <StaffName>
              {staffData?.firstName} {staffData?.lastName}
            </StaffName>
            <Break height={5} />
            <StaffText>{staffData?.telNumber}</StaffText>
          </StaffCol>
          <StaffCol>
            <StaffSecondText>Филиал</StaffSecondText>
            <Break height={5} />
            <StaffText>{getStoreName(staffData?.storeId)}</StaffText>
          </StaffCol>
          <StaffCol>
            <StaffSecondText>Комментарий</StaffSecondText>
            <Break height={5} />
            <StaffText>{staffData?.comment}</StaffText>
          </StaffCol>
          <StaffCol>
            <Button
              buttonStyle={{
                bgcolor: "rgba(96, 110, 234, 0.1)",
                color: "#606EEA",
              }}
              endIcon={<QRStaff />}
              onClick={() => {
                setOpenQr(true);
              }}
            >
              QR код кассира
            </Button>
          </StaffCol>
          <StaffAction>
            <IconButton>
              <ThreeDotsIcon />
            </IconButton>
          </StaffAction>
        </CashierInfo>
      )}
      <Flex width="90%" height="85px" alignItems="flex-start" margin="0">
        <NavBar
          list={menuItems.filter((item) =>
            item.path.includes("/staff/cashier")
          )}
          margin="20px 0"
          padding="0 10px 10px 0"
        />
      </Flex>
      {renderData()}

      <SideBar isOpen={openQr}>
        <QrBar
          closeQr={() => {
            setOpenQr(false);
          }}
          qrLink={staffData?.cashierRefLink || ""}
        />
      </SideBar>
    </CardContainer>
  );
};

export default CashierCard;
