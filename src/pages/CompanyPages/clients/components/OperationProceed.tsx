import React from "react";
import {
  CustomButton,
  ModalComponent,
  Text,
} from "../../../../styles/CustomStyles";
import coins from "../../../../assets/images/coinsImage.png";
import laptop from "../../../../assets/images/laptopImage.png";
import { useTranslation } from "react-i18next";
interface IProps {
  process: "accure" | "substract" | "VIP" | " ";
  handleContinueButton: () => void;
}
//{process === "accure" ? }
const OperationProceed: React.FC<IProps> = ({
  process,
  handleContinueButton,
}) => {
  const { t } = useTranslation();
  return (
    <ModalComponent
      justifyContent="stretch"
      position="relative"
      height="314px"
      padding="30px 70px"
    >
      <div
        style={{
          position: "relative",
          top: process === "accure" ? -90 : -180,
          objectFit: "contain",
          maxWidth: "300px",
          maxHeight: "200px",
        }}
      >
        <img src={process === "accure" ? coins : laptop} alt="asdf" />
      </div>
      <div
        style={{
          width: "100%",
          position: "relative",
          top: "-100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{ width: "280px", marginTop: "25px", textAlign: "center" }}
          >
            <Text
              fontSize="17px"
              fontWeight={500}
              marginLeft="0px"
              marginRight="0px"
            >
              {process === "accure"
                ? t("accureProceed")
                : t("substractProceed")}
            </Text>
          </div>
        </div>
        <div
          onClick={handleContinueButton}
          style={{
            width: "280px",
            display: "flex",
            marginTop: "40px",
            justifyContent: "center",
          }}
        >
          <CustomButton color="white">
            <Text fontSize="16px" fontWeight={500} color="white">
              {" "}
              {t("continue")}{" "}
            </Text>
          </CustomButton>
        </div>
      </div>
    </ModalComponent>
  );
};

export default OperationProceed;
